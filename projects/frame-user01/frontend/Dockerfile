# Stage 1: Build
FROM node:20-alpine AS builder

# Set memory limit as per your pipeline
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package.json yarn.lock ./

# Install yarn and dependencies
RUN npm install -g yarn && yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Pass environment variables needed for Vite build
ARG VITE_SECRET_KEY
ARG VITE_PLATFORM_KEY
ARG VITE_PLATFORM_VERSION
ARG VITE_PLATFORM_NAME
ARG VITE_BASE_URL
ARG VITE_SOCKET_URL

# Build the project (CI=false prevents warnings from being treated as errors)
RUN CI=false yarn build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy the build output from the builder stage
# Note: Vite usually builds to 'dist/', while your pipeline used 'build/'
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
