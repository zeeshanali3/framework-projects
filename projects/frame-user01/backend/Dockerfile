# Use a production-ready Node.js image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose the internal port (standard for Node.js)
EXPOSE 3000

# Start the application directly
CMD ["node", "index.js"]
