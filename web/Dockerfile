# --- Stage 1: Builder Stage ---
# Use a lightweight base for preparation
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the core HTML file
COPY index.html /app/

# Recursively copy the entire assets folder structure (css, js, img)
COPY assets /app/assets 

# --- Stage 2: Production Stage ---
# Use a tiny, stable Nginx image to serve the files
FROM nginx:stable-alpine AS production

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files from the builder stage into the Nginx serving directory
COPY --from=builder /app /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 by default
EXPOSE 80

# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]