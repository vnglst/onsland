FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY server.js ./
COPY views ./views
COPY public ./public

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]
