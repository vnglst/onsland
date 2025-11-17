# Use official Deno image
FROM denoland/deno:2.0.6

# Set working directory
WORKDIR /app

# Copy dependency files
COPY deno.json deno.lock* ./

# Cache dependencies
RUN deno cache --reload deno.json || true

# Copy application files
COPY . .

# Cache all dependencies from imports
RUN deno cache main.ts dev.ts

# Build the Fresh project (generates fresh.gen.ts)
RUN deno task build

# Expose port
EXPOSE 8000

# Run the application
CMD ["deno", "run", "-A", "main.ts"]
