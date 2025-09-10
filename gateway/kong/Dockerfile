FROM kong:3.0-alpine

# Copy configuration files
COPY kong.conf /etc/kong/kong.conf
COPY kong.yml /etc/kong/kong.yml

# Switch back to kong user
USER kong

# Expose ports
EXPOSE 8000 8001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD kong health || exit 1
