# Lyo Server

Backend API server for the LYO virtual try-on platform built with NestJS.

## Overview

The Lyo Server is a RESTful API that handles:
- User authentication and authorization
- Reference photo and avatar management
- Virtual try-on generation jobs
- Garment storage and management
- Real-time updates via Server-Sent Events (SSE)
- Webhook handling for external services

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **Caching**: Redis
- **API Documentation**: Swagger/OpenAPI
- **Monitoring**: Sentry
- **Security**: Helmet, CORS
- **Validation**: class-validator, class-transformer

## Project Structure

```
src/
├── app/              # Core application setup
├── database/         # Database configuration and entities
│   ├── entities/     # TypeORM entities
│   ├── migrations/   # Database migrations
│   └── redis/        # Redis configuration
├── engine/           # Generation engine and webhooks
│   ├── pubsub/       # Pub/Sub messaging
│   ├── sse/          # Server-Sent Events
│   └── webhook/      # Webhook handlers
├── modules/          # Feature modules
│   ├── api/          # API endpoints
│   ├── auth/         # Authentication module
│   ├── generation/   # Generation management
│   └── storage/      # Storage services
└── utils/            # Utility functions
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: User accounts and authentication
- **ReferencePhoto**: Uploaded reference photos for avatar generation
- **Avatar**: Generated avatar images
- **Garment**: Clothing items from Myntra
- **Generation**: Try-on generation jobs and results

See the ERD diagram in the README for detailed relationships.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx serve lyo-server

# Run database migrations
pnpm nx run lyo-server:migrate

# Build for production
pnpm nx build lyo-server

# Run tests
pnpm nx test lyo-server
```

## Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SERVER_URL`: Server base URL
- `FRONT_URL`: Frontend URL for CORS
- `APP_URL`: Dashboard URL for CORS
- `SENTRY_DSN`: Sentry DSN for error tracking
- `NODE_ENV`: Environment (development/production)

## API Documentation

Once the server is running, API documentation is available at:
- Swagger UI: `http://localhost:3000/v1/swagger`

## Key Features

- **Authentication**: Cookie-based authentication with Google OAuth
- **File Storage**: S3-compatible storage for images
- **Real-time Updates**: SSE for generation job status updates
- **Webhook Support**: Handles webhooks from external generation services
- **Validation**: Request validation using DTOs and class-validator
- **Error Handling**: Centralized error handling with Sentry integration

## Database Migrations

```bash
# Generate migration
pnpm nx run lyo-server:typeorm -- migration:generate

# Run migrations
pnpm nx run lyo-server:typeorm -- migration:run

# Revert migration
pnpm nx run lyo-server:typeorm -- migration:revert
```
