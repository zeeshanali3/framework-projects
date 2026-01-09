# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# ... (ARG and ENV setup from previous step) ...

COPY package*.json ./
RUN npm install
COPY . .

# Run build
RUN npm run build

# DEBUG: Check if dist was created and show index.html
RUN ls -la dist
RUN test -f dist/index.html && echo "index.html found!" || echo "index.html MISSING!"

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
