const jwt = require('jsonwebtoken');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const {projectDB} = require('../../Integrations/Database/projectDb');
const sendResponse = require('../response');

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Handle Google OAuth login
const handleGoogleLogin = async (req, res) => {
  try {
    const { tokenId, osName, osVersion, deviceUUID } = req.body;
    
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    // Check if user exists in database
    const connection = await projectDB();
    
    connection.connect(async (dbErr) => {
      if (dbErr) {
        sendResponse(res, 500, 'Database Connection Error');
        return;
      }
      
      // Check if user exists
      const getUserQuery = "SELECT * FROM users WHERE email = ?";
      
      connection.query(getUserQuery, [email], async (err, results) => {
        if (err) {
          connection.release();
          sendResponse(res, 500, 'Database Query Error');
          return;
        }
        
        let userId;
        
        // If user doesn't exist, create one
        if (results.length === 0) {
          const createUserQuery = "INSERT INTO users (email, name, profile_pic, auth_provider) VALUES (?, ?, ?, 'google')";
          
          connection.query(createUserQuery, [email, name, picture], (createErr, createResults) => {
            if (createErr) {
              connection.release();
              sendResponse(res, 500, 'Failed to create user');
              return;
            }
            
            userId = createResults.insertId;
            finishAuthentication(userId);
          });
        } else {
          userId = results[0].user_id;
          finishAuthentication(userId);
        }
        
        // Create JWT token and finish authentication
        function finishAuthentication(userId) {
          // Log device info
          const deviceQuery = "INSERT INTO user_devices (user_id, os_name, os_version, device_uuid) VALUES (?, ?, ?, ?)";
          
          connection.query(deviceQuery, [userId, osName, osVersion, deviceUUID], (deviceErr) => {
            if (deviceErr) {
              console.error('Error logging device info:', deviceErr);
            }
            
            // Create JWT token
            const token = jwt.sign(
              { userId, email },
              process.env.JWT_SECRET || 'your-secret-key',
              { expiresIn: '7d' }
            );
            
            connection.release();
            
            // Send response
            sendResponse(res, 200, 'Login successful', {
              token,
              user: {
                id: userId,
                email,
                name,
                profilePic: picture
              }
            });
          });
        }
      });
    });
    
  } catch (error) {
    console.error('Google authentication error:', error);
    sendResponse(res, 401, 'Google authentication failed');
  }
};

// Handle Facebook OAuth login
const handleFacebookLogin = async (req, res) => {
  try {
    const { accessToken, userId, osName, osVersion, deviceUUID } = req.body;
    
    // Verify Facebook token
    const fbResponse = await axios.get(
      `https://graph.facebook.com/v16.0/me?access_token=${accessToken}&fields=id,name,email,picture.type(large)`
    );
    
    if (fbResponse.data.id !== userId) {
      sendResponse(res, 401, 'Invalid Facebook credentials');
      return;
    }
    
    const { name, email, picture } = fbResponse.data;
    const profilePic = picture?.data?.url;
    
    // Check if user exists in database
    const connection = await projectDB();
    
    connection.connect(async (dbErr) => {
      if (dbErr) {
        sendResponse(res, 500, 'Database Connection Error');
        return;
      }
      
      // Check if user exists
      const getUserQuery = "SELECT * FROM users WHERE email = ?";
      
      connection.query(getUserQuery, [email], async (err, results) => {
        if (err) {
          connection.release();
          sendResponse(res, 500, 'Database Query Error');
          return;
        }
        
        let userId;
        
        // If user doesn't exist, create one
        if (results.length === 0) {
          const createUserQuery = "INSERT INTO users (email, name, profile_pic, auth_provider) VALUES (?, ?, ?, 'facebook')";
          
          connection.query(createUserQuery, [email, name, profilePic], (createErr, createResults) => {
            if (createErr) {
              connection.release();
              sendResponse(res, 500, 'Failed to create user');
              return;
            }
            
            userId = createResults.insertId;
            finishAuthentication(userId);
          });
        } else {
          userId = results[0].user_id;
          finishAuthentication(userId);
        }
        
        // Create JWT token and finish authentication
        function finishAuthentication(userId) {
          // Log device info
          const deviceQuery = "INSERT INTO user_devices (user_id, os_name, os_version, device_uuid) VALUES (?, ?, ?, ?)";
          
          connection.query(deviceQuery, [userId, osName, osVersion, deviceUUID], (deviceErr) => {
            if (deviceErr) {
              console.error('Error logging device info:', deviceErr);
            }
            
            // Create JWT token
            const token = jwt.sign(
              { userId, email },
              process.env.JWT_SECRET || 'your-secret-key',
              { expiresIn: '7d' }
            );
            
            connection.release();
            
            // Send response
            sendResponse(res, 200, 'Login successful', {
              token,
              user: {
                id: userId,
                email,
                name,
                profilePic
              }
            });
          });
        }
      });
    });
    
  } catch (error) {
    console.error('Facebook authentication error:', error);
    sendResponse(res, 401, 'Facebook authentication failed');
  }
};

module.exports = {
  handleGoogleLogin,
  handleFacebookLogin
}; 