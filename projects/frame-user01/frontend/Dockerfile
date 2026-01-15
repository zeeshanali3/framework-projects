# --- STAGE 1: Build ---
FROM node:20-slim AS builder

WORKDIR /app

# 1. Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# 2. Use 'npm ci' (Clean Install). 
# It is faster and more reliable for CI/CD because it ignores 
# package.json and installs exactly what is in the lock file.
RUN npm ci --legacy-peer-deps

# 3. Declare build arguments
ARG VITE_SECRET_KEY
ARG VITE_PLATFORM_KEY
ARG VITE_PLATFORM_VERSION
ARG VITE_PLATFORM_NAME
ARG VITE_BASE_URL
ARG VITE_SOCKET_URL

# 4. Set ENV variables for the build process
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY \
    VITE_PLATFORM_KEY=$VITE_PLATFORM_KEY \
    VITE_PLATFORM_VERSION=$VITE_PLATFORM_VERSION \
    VITE_PLATFORM_NAME=$VITE_PLATFORM_NAME \
    VITE_BASE_URL=$VITE_BASE_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    NODE_OPTIONS="--max-old-space-size=4096" \
    CI=false

# 5. Copy the rest of the code and build
COPY . .
RUN npm run build

# --- STAGE 2: Production (Nginx) ---
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
