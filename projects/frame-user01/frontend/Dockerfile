# --- STAGE 1: Build ---
FROM node:20-slim AS builder

WORKDIR /app

# Copy everything at once to avoid "not found" errors for lockfiles
COPY . .

# Install yarn and dependencies
RUN npm install -g yarn && yarn install

# Declare build arguments (MUST be passed during docker build command)
ARG VITE_SECRET_KEY
ARG VITE_PLATFORM_KEY
ARG VITE_PLATFORM_VERSION
ARG VITE_PLATFORM_NAME
ARG VITE_BASE_URL
ARG VITE_SOCKET_URL

# Set ENV variables so Vite injects them into the JS bundle
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY \
    VITE_PLATFORM_KEY=$VITE_PLATFORM_KEY \
    VITE_PLATFORM_VERSION=$VITE_PLATFORM_VERSION \
    VITE_PLATFORM_NAME=$VITE_PLATFORM_NAME \
    VITE_BASE_URL=$VITE_BASE_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    NODE_OPTIONS="--max-old-space-size=4096" \
    CI=false

# Run the build command
RUN yarn build

# --- STAGE 2: Production (Serving Static Files) ---
FROM nginx:stable-alpine

# Copy the static assets from the builder stage
# NOTE: Vite usually outputs to 'dist'. If yours outputs to 'build', change 'dist' to 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
