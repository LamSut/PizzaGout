#!/bin/bash

# WARNING: THIS SCRIPT WILL REMOVE ALL RESOURCES
# Usage: chmod 755 rm.sh && ./rm.sh

echo "Stopping all running containers..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No running containers to stop."

echo "Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove."

echo "Removing all images..."
docker rmi -f $(docker images -q) 2>/dev/null || echo "No images to remove."

echo "Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || echo "No volumes to remove."

echo "Removing all unused networks (excluding default ones)..."
docker network rm $(docker network ls -q | grep -v 'bridge\|host\|none') 2>/dev/null || echo "No networks to remove."

echo "Running system prune to clean up everything..."
docker system prune -a --volumes -f

echo "Docker cleanup complete!"
