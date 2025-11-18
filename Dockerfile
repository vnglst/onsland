# Use official Deno image
FROM denoland/deno:2.5.6

# Set working directory
WORKDIR /app

# Copy dependency files
COPY deno.json deno.lock* ./

# Copy application files (needed for manifest generation)
COPY . .

# Build the Fresh project (generates fresh.gen.ts and caches dependencies)
RUN deno task build

# Expose port
EXPOSE 8000

# Run the application
CMD ["deno", "run", "-A", "main.ts"]
