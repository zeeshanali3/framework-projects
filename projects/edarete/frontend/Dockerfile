# --- STAGE 1: Build ---
FROM node:20-slim AS builder

WORKDIR /app

# 1. Copy package.json and yarn.lock (Yarn projects use yarn.lock)
COPY package.json yarn.lock ./

# 2. Install Yarn and dependencies
# --frozen-lockfile is the Yarn equivalent of 'npm ci'
RUN npm install -g yarn && yarn install --frozen-lockfile

# 3. Declare build arguments (These must be passed during 'docker build')
ARG VITE_SECRET_KEY
ARG VITE_PLATFORM_KEY
ARG VITE_PLATFORM_VERSION
ARG VITE_PLATFORM_NAME
ARG VITE_BASE_URL
ARG VITE_SOCKET_URL

# 4. Set ENV variables so Vite can see them during 'yarn build'
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY \
    VITE_PLATFORM_KEY=$VITE_PLATFORM_KEY \
    VITE_PLATFORM_VERSION=$VITE_PLATFORM_VERSION \
    VITE_PLATFORM_NAME=$VITE_PLATFORM_NAME \
    VITE_BASE_URL=$VITE_BASE_URL \
    VITE_SOCKET_URL=$VITE_SOCKET_URL \
    NODE_OPTIONS="--max-old-space-size=4096" \
    CI=false

# 5. Copy code and build
COPY . .
RUN yarn build

# --- STAGE 2: Production (Nginx) ---
FROM nginx:stable-alpine

# Vite usually outputs to 'dist', but check if your project outputs to 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

# EXPOSE is mainly for documentation, but ensures clarity for port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
