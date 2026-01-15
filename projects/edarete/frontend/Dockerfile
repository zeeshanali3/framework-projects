# --- STAGE 1: Build ---
FROM node:20-slim AS builder

WORKDIR /app

# 1. Use a wildcard (*) to copy package.json and WHATEVER lockfile exists (yarn or npm)
# This prevents the "not found" error if yarn.lock is missing
COPY package*.json yarn.lock* ./

# 2. Install dependencies based on what is available
# If yarn.lock exists, it uses yarn. If not, it falls back to npm.
RUN if [ -f yarn.lock ]; then \
      npm install -g yarn && yarn install --frozen-lockfile; \
    else \
      npm ci; \
    fi

# 3. Build Arguments (Baking in your VITE secrets)
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

# 4. Copy the rest of the source code
COPY . .

# 5. Build the frontend
RUN if [ -f yarn.lock ]; then yarn build; else npm run build; fi

# --- STAGE 2: Production (Nginx) ---
FROM nginx:stable-alpine
# Vite usually builds to 'dist'
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
