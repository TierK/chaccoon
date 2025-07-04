

# Chaccoon

Chaccoon is a social network built with Angular 20. The project features a modern frontend, a mock API server, OpenAPI client code generation, and a convenient infrastructure for local development and testing.

## Project Overview
Chaccoon provides core social network functionality: registration, authentication, profile viewing and editing, user search, and REST API demonstration. For development and testing, it uses a mock server based on json-server with support for custom routes and authentication middleware.

**Planned features:**
- Chat window and real-time messaging
- Message history
- Loading and displaying followers/subscribers

## Project Structure
- **angular.json** — Angular CLI configuration
- **auth-middleware.js** — middleware for json-server (authentication)
- **deploy.sh** — deployment script
- **generate-db.js** — mock database generation
- **ng-openapi-gen.json** — OpenAPI client generation config
- **package.json** — dependencies and npm scripts
- **tsconfig*.json** — TypeScript configs
- **public/assets/** — assets, mock database (`db.json`), routes (`routes.json`), images, icons
- **src/** — Angular application source code
  - **app/** — main module, routing, services, components, pages (login, profile, search), UI components (layout, sidebar, profile-card)
  - **api/** — generated and helper files for API
  - **auth/** — authentication services and guards
  - **environment/** — environment files


## Main Features
- Modern Angular 20 frontend
- Mock REST API using json-server
- OpenAPI client code generation
- Simple authentication via middleware
- Pages: login, profile, search
- Reusable UI components
- Chat window and messaging (planned)
- Message history (planned)
- Followers/subscribers loading (planned)

## Quick Start

## Requirements
- Node.js (v18 or newer)
- npm

## Install Dependencies
```
npm install
```

## Start the Application
Start the Angular dev server:
```
npm start
```
The app will be available at `http://localhost:4200/`.

## Mock API Server
Start the mock server with authentication:
```
npm run start:server
```
The API will be available at `http://localhost:3000/`.

## Generate OpenAPI Client
If you update the OpenAPI spec (`src/api/openapi.json`), regenerate the client:
```
npm run generate-api
```

## Generate Mock Database
To generate the mock database:
```
npm run generate:db
```

## Testing
Run unit tests:
```
npm test
```

## Build
Build the production version:
```
npm run build
```

## Deploy
Deploy (you can customize the `deploy.sh` script):
```
npm run deploy
```

## Scripts
See all available scripts in `package.json`.

## License
This project is private. Contact the author for usage permissions.
