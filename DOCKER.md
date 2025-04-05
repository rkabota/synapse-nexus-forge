
# Docker Deployment for Synapse Core

This document explains how to deploy Synapse Core using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional but recommended)

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository and navigate to the project directory
2. Create a `.env` file based on the template in `src/assets/env_template.txt`
3. Run the following command:

```bash
docker-compose up -d
```

This will start both the frontend UI and the backend API (if uncommented in the docker-compose.yml).

### Using Docker Directly

#### Frontend UI

```bash
# Build the Docker image
docker build -t synapse-core-ui .

# Run the container
docker run -p 8080:80 synapse-core-ui
```

#### Backend API (Optional)

```bash
# Navigate to the API directory
cd api

# Build the Docker image
docker build -t synapse-core-api .

# Run the container
docker run -p 8000:8000 --env-file ../.env synapse-core-api
```

## Accessing the Application

- Frontend UI: http://localhost:8080
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Environment Variables

Make sure to set up the required environment variables in your `.env` file:

```
SYNAPSE_API_KEY=your-api-key-here
OPENAI_API_KEY=your-openai-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here
# ... additional variables as needed
```

## Production Deployment

For production deployment, consider the following:

1. Use a proper container orchestration system like Kubernetes or Docker Swarm
2. Set up proper SSL certificates
3. Use a reverse proxy like Traefik or Nginx for handling multiple services
4. Implement proper monitoring and logging

## Troubleshooting

### Common Issues

- **Container won't start**: Check logs with `docker logs <container_id>`
- **API connection issues**: Ensure your `.env` file is properly configured
- **Permission issues**: Check file permissions on mounted volumes

For more assistance, please refer to the main README or open an issue on GitHub.
