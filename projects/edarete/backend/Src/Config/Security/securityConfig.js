const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');
const bodyParser = require('body-parser')
// Function to log requests to a file
const logRequestToFile = (req, res, next) => {
    const logFilePath = path.join(__dirname, 'requests.log');
    const logDetails = `
        Time: ${new Date().toISOString()}
        Method: ${req.method}
        URL: ${req.originalUrl}
        Headers: ${JSON.stringify(req.headers)}
        Body: ${JSON.stringify(req.body)}
        Query: ${JSON.stringify(req.query)}
    `;

    fs.appendFile(logFilePath, logDetails + '\n', (err) => {
        if (err) {
            console.error('Failed to write request log:', err);
        }
    });

    next();
};

// Set up rate limiting using express-rate-limit
const sessionRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // Limit each session to 100 requests per windowMs
    message: 'Too many requests from this session, please try again later.',
    keyGenerator: (req) => req.sessionID || req.ip, // Use session ID or IP as key
});

// Function to log rejected requests (failed logins or rate-limit exceeded)
const logRejectedRequest = async (req, res, eventType, reason) => {
    try {
        const connection = await securityDB(); // Use securityDB to log rejected requests
        const { ip, method, originalUrl, headers, body, query } = req;

        const queryParams = JSON.stringify(query);
        const requestBody = JSON.stringify(body);
        const requestHeaders = JSON.stringify(headers);

        const insertQuery = `
            INSERT INTO security_log (
                event_type, ip_address, user_agent, method, url, headers, request_body, query_params, status_code, reason, additional_info
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await executeQuery(insertQuery, [
            eventType,
            ip,
            req.get('User-Agent'),
            method,
            originalUrl,
            requestHeaders,
            requestBody,
            queryParams,
            res.statusCode,
            reason,
            JSON.stringify({}) // Additional info as empty object or any relevant data
        ], connection);
    } catch (err) {
        console.error('Error logging rejected request:', err);
    }
};

// Function to apply middleware to the Express app
const applyMiddleware = (app) => {
    app.use(express.json()); // Parse JSON bodies
    app.use(sessionRateLimiter); // Apply rate limiter
    app.use(logRequestToFile); // Apply request logging
    app.use(helmet()); // Security headers
    app.use(bodyParser.raw({type: 'application/octet-stream', limit : '50mb'}))
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        })
    );
    app.use(helmet.xContentTypeOptions()); // Prevent MIME type sniffing
    app.use(helmet.xFrameOptions({ action: 'deny' })); // Prevent clickjacking
    app.use(helmet.hsts({ maxAge: 31536000 })); // Enforce HTTPS
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'encryptedrequest', 'encryptedRequest', 'accessToken','reqdata'],
        credentials: true
    }));
    // Uncomment the following block to enforce HTTPS
    // app.use((req, res, next) => {
    //     if (req.headers['x-forwarded-proto'] !== 'https') {
    //         return res.redirect(`https://${req.headers.host}${req.url}`);
    //     }
    //     next();
    // });
    // Apply security log for failed logins or rejected requests
    app.use(async (req, res, next) => {
        if (res.statusCode === 401) {
            await logRejectedRequest(req, res, 'Failed Login', 'Incorrect credentials');
        }
        else if (res.statusCode === 429) {
            await logRejectedRequest(req, res, 'Rejected Request', 'Rate limit exceeded');
        }

        next();
    });
};

module.exports = applyMiddleware;
