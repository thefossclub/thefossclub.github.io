# The FOSS Club - Backend API

This is the NestJS backend for The FOSS Club website, providing a modular content delivery system.

## Overview

The backend provides RESTful APIs for managing website content in a modular and easily modifiable way. It's designed to support future features and maintain clean separation between content types.

## Features

- **Modular Architecture**: Built with NestJS for scalability and maintainability
- **Content Management**: RESTful APIs for CRUD operations on website content
- **Type-based Content**: Support for different content types (about, team, events, projects)
- **CORS Support**: Configured for frontend integration
- **Testing**: Comprehensive unit tests with Jest

## API Endpoints

### Content Management

- `GET /api/content` - Get all content
- `GET /api/content?type=<type>` - Get content by type
- `GET /api/content/:id` - Get specific content by ID
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Type-specific Endpoints

- `GET /api/content/type/about` - Get about content
- `GET /api/content/type/team` - Get team content  
- `GET /api/content/type/events` - Get events content

## Content Structure

```json
{
  "id": "uuid",
  "title": "string",
  "type": "string",
  "content": "object",
  "metadata": "object",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Development

```bash
# Start development server
npm run start:dev

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

The server will start on `http://localhost:3001` by default.

## Project Structure

```
src/
├── app.controller.ts       # Main app controller
├── app.module.ts          # Main app module
├── app.service.ts         # Main app service
├── main.ts                # Application entry point
└── content/               # Content management module
    ├── dto/               # Data transfer objects
    │   └── content.dto.ts
    ├── content.controller.ts
    ├── content.module.ts
    └── content.service.ts
```

## Future Enhancements

The modular design supports easy addition of:
- Database integration
- User authentication and authorization
- File upload management
- Real-time features with WebSockets
- Caching strategies
- API documentation with Swagger

## Configuration

The backend is configured with:
- CORS enabled for frontend integration
- Global API prefix `/api`
- Development server on port 3001
- TypeScript strict mode enabled