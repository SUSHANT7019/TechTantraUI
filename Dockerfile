# ---------- Stage 1: Build React ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:stable-alpine

ENV PORT=8080

# Copy the pre-built static site (this dist folder) into nginx html directory
COPY . /usr/share/nginx/html

# Ensure container starts on the configured port (defaults to 8080)
EXPOSE 8080

# Update default nginx listen port at runtime and run nginx
CMD sh -c "sed -i 's/listen 80;/listen ${PORT};/' /etc/nginx/conf.d/default.conf || true && nginx -g 'daemon off;'"
