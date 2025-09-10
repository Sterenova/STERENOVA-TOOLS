#!/usr/bin/env bash

# Script to create a new frontend microservice
# Usage: ./scripts/new:service:frontend.sh <service-name> <framework>

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check arguments
if [ $# -lt 1 ]; then
    print_error "Usage: $0 <service-name> [framework]"
    print_error "Frameworks: nextjs (default), vue, angular"
    exit 1
fi

SERVICE_NAME=$1
FRAMEWORK=${2:-nextjs}
SERVICE_DIR="web/${SERVICE_NAME}"
COMPOSE_FILE="docker-compose.yml"

# Validate service name
if [[ ! "$SERVICE_NAME" =~ ^[a-z][a-z0-9-]*[a-z0-9]$ ]]; then
    print_error "Service name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens"
    exit 1
fi

# Check if service already exists
if [ -d "$SERVICE_DIR" ]; then
    print_error "Service '$SERVICE_NAME' already exists in $SERVICE_DIR"
    exit 1
fi

print_status "Creating new frontend service: $SERVICE_NAME (framework: $FRAMEWORK)"

# Create service directory
mkdir -p "$SERVICE_DIR"

# Copy template based on framework
case "$FRAMEWORK" in
    nextjs)
        print_status "Using nextjs template"
        cp -r '[TEMPLATES]/nextjs'/* "$SERVICE_DIR/"
        ;;
    vue)
        print_error "Vue template not implemented yet"
        exit 1
        ;;
    angular)
        print_error "Angular template not implemented yet"
        exit 1
        ;;
    *)
        print_error "Unsupported framework: $FRAMEWORK"
        print_error "Supported frameworks: nextjs, vue, angular"
        exit 1
        ;;
esac

# Replace placeholders in files
print_status "Replacing placeholders in service files..."

find "$SERVICE_DIR" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.html" \) -exec sed -i.bak "s/nextjs-microfrontend-template/${SERVICE_NAME}/g" {} \;

# Clean up backup files
find "$SERVICE_DIR" -name "*.bak" -delete

# Generate random port for the service
SERVICE_PORT=$((3000 + RANDOM % 1000))

print_status "Generated port: $SERVICE_PORT"

# Add service to docker-compose.yml
print_status "Adding service to docker-compose.yml..."

# Create a temporary file with the service definition
TEMP_SERVICE=$(mktemp)
cat > "$TEMP_SERVICE" << EOF

  # ${SERVICE_NAME} frontend
  ${SERVICE_NAME}-web:
    build:
      context: ./web/${SERVICE_NAME}
      dockerfile: Dockerfile
    container_name: ${SERVICE_NAME}-web
    ports:
      - "${SERVICE_PORT}:80"
    depends_on:
      - kong
      - keycloak
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - microservices-network
EOF

# Use awk to insert the service before the volumes section
awk -v service_file="$TEMP_SERVICE" '
/^volumes:/ {
    # Print the service content before volumes
    while ((getline line < service_file) > 0) {
        print line
    }
    close(service_file)
    print ""
}
{ print }
' "$COMPOSE_FILE" > "$COMPOSE_FILE.tmp" && mv "$COMPOSE_FILE.tmp" "$COMPOSE_FILE"

# Clean up temporary files
rm -f "$TEMP_SERVICE"

# Update Kong configuration for frontend
print_status "Adding frontend route to Kong configuration..."

KONG_CONFIG="gateway/kong/kong.yml"
cat >> "$KONG_CONFIG" << EOF

# ${SERVICE_NAME} frontend
- name: ${SERVICE_NAME}-web
  url: http://${SERVICE_NAME}-web:80
  routes:
  - name: ${SERVICE_NAME}-web-route
    paths: ["/${SERVICE_NAME}"]
    strip_path: true
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  plugins:
  - name: cors
    config:
      origins: ["*"]
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      headers: ["Authorization", "Content-Type", "X-Requested-With"]
      credentials: true
      max_age: 3600
      preflight_continue: false
EOF

print_success "Frontend service '$SERVICE_NAME' created successfully!"
print_success "Service directory: $SERVICE_DIR"
print_success "Service port: $SERVICE_PORT"
print_success "Frontend URL: http://localhost:${SERVICE_PORT}"
print_success "Gateway URL: http://localhost:8000/${SERVICE_NAME}"

print_warning "Next steps:"
echo "1. Update Keycloak realm to add client for '${SERVICE_NAME}'"
echo "2. Update the frontend client configuration in src/services/keycloak.ts"
echo "3. Run: docker compose up -d ${SERVICE_NAME}-web"
echo "4. Test the frontend: curl http://localhost:${SERVICE_PORT}"
echo "5. Test via gateway: curl http://localhost:8000/${SERVICE_NAME}"

print_status "Frontend service creation completed!"
