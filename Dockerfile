FROM nginx:alpine

# Copy the React build folder
COPY dist /usr/share/nginx/html

# Copy the custom Nginx configuration file (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
