#!/usr/bin/env bash

# Script to remove a frontend microservice
# Usage: ./scripts/remove:service:frontend.sh <service-name>

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
    print_error "Usage: $0 <service-name>"
    print_error "Example: $0 flux"
    exit 1
fi

SERVICE_NAME=$1
SERVICE_DIR="web/${SERVICE_NAME}"
COMPOSE_FILE="docker-compose.yml"
KONG_CONFIG="gateway/kong/kong.yml"

# Validate service name
if [[ ! "$SERVICE_NAME" =~ ^[a-z][a-z0-9-]*[a-z0-9]$ ]]; then
    print_error "Service name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens"
    exit 1
fi

# Check if service exists
if [ ! -d "$SERVICE_DIR" ]; then
    print_error "Service '$SERVICE_NAME' does not exist in $SERVICE_DIR"
    exit 1
fi

print_status "Removing frontend service: $SERVICE_NAME"

# Stop and remove Docker container if running
print_status "Stopping and removing Docker container..."
if docker ps -q -f name="${SERVICE_NAME}-web" | grep -q .; then
    docker stop "${SERVICE_NAME}-web" 2>/dev/null || true
    docker rm "${SERVICE_NAME}-web" 2>/dev/null || true
    print_success "Docker container stopped and removed"
else
    print_warning "Docker container not running"
fi

# Remove service directory
print_status "Removing service directory: $SERVICE_DIR"
rm -rf "$SERVICE_DIR"
print_success "Service directory removed"

# Remove service from docker-compose.yml
print_status "Removing service from docker-compose.yml..."
if grep -q "${SERVICE_NAME}-web:" "$COMPOSE_FILE"; then
    # Find the service block and remove it
    sed -i.bak "/^  # ${SERVICE_NAME} frontend$/,/^$/d" "$COMPOSE_FILE"
    rm -f "$COMPOSE_FILE.bak"
    print_success "Service removed from docker-compose.yml"
else
    print_warning "Service not found in docker-compose.yml"
fi

# Remove service from Kong configuration
print_status "Removing service from Kong configuration..."
if grep -q "${SERVICE_NAME}-web" "$KONG_CONFIG"; then
    # Find the service block and remove it
    sed -i.bak "/^# ${SERVICE_NAME} frontend$/,/^$/d" "$KONG_CONFIG"
    rm -f "$KONG_CONFIG.bak"
    print_success "Service removed from Kong configuration"
else
    print_warning "Service not found in Kong configuration"
fi

print_success "Frontend service '$SERVICE_NAME' removed successfully!"

print_warning "Next steps:"
echo "1. Remove client '${SERVICE_NAME}' from Keycloak realm if it exists"
echo "2. Restart Kong gateway: docker compose restart kong"
echo "3. Verify removal: docker compose ps | grep ${SERVICE_NAME}"

print_status "Frontend service removal completed!"
