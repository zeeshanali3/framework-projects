# --- STAGE 1: Build ---
FROM node:20-slim AS builder

WORKDIR /app

# 1. Copy everything. This ensures package.json and any lockfiles are present.
COPY . .

# 2. Force install dependencies using standard install
# We use --legacy-peer-deps to ignore version conflicts which often cause Exit Code 1
RUN npm install --legacy-peer-deps

# 3. Build Arguments
ARG VITE_SECRET_KEY
ARG VITE_PLATFORM_KEY
ARG VITE_PLATFORM_VERSION
ARG VITE_PLATFORM_NAME
ARG VITE_BASE_URL
ARG VITE_SOCKET_URL

ENV VITE_SECRET_KEY=$VITE_SECRET_KEY \
    VITE_PLATFORM_KEY=$VITE_PLATFORM_KEY \
    VITE_PLATFORM_VERSION=$VITE_PLATFORM_VERSION \
    VITE_PLATFORM_NAME=$VITE_PLATFORM_NAME \
    VITE_BASE_URL=$VITE_BASE_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    NODE_OPTIONS="--max-old-space-size=4096" \
    CI=false

# 4. Build the frontend
RUN npm run build

# --- STAGE 2: Production (Nginx) ---
FROM nginx:stable-alpine
# Verify if your folder is 'dist' or 'build' - Vite usually uses 'dist'
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
