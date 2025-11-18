# Use official Deno image
FROM denoland/deno:2.5.6

# Set working directory
WORKDIR /app

# Copy dependency files
COPY deno.json deno.lock* ./

# Copy application files (needed for manifest generation)
COPY . .

# Build the Fresh project (generates _fresh directory with production assets)
RUN deno task build

# Cache the server dependencies
RUN deno cache _fresh/server.js

# Expose port
EXPOSE 8000

# Run the application
CMD ["serve", "-A", "_fresh/server.js"]
