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

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy only build output
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080

CMD sh -c "sed -i 's/listen 80;/listen ${PORT};/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
