# Stage 1: Build
FROM node:20-slim AS build
WORKDIR /app

# Accept build arguments for VITE variables
ARG VITE_BASE_URL
ARG VITE_SECRET_KEY
# (Add other ARGs as needed)

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_SECRET_KEY=$VITE_SECRET_KEY
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN CI=false yarn build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy the build output from the build stage (adjust 'dist' or 'build' folder)
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
