# Profile Sharing App

A modern Angular application that allows users to create, manage, and share profiles with QR codes for easy contact exchange.

## Features

- **Create Profiles**: Create detailed profiles with personal and professional information
- **QR Code Generation**: Automatically generates QR codes for each profile for easy sharing
- **QR Code Scanning**: Scan QR codes from other users to instantly add their profiles
- **Profile Management**: View, edit, and delete profiles
- **Current User**: Set and manage your current active profile
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd profiles-sharing-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4201`

## How to Use

### Creating Your First Profile

1. Click "Create Profile" from the main page
2. Fill in your information (Name and Email are required)
3. Add optional details like phone, company, bio, and social links
4. Click "Create Profile" to generate your QR code
5. Your profile is now ready to share!

### Sharing Your Profile

1. Go to your profile detail page
2. Show your QR code to others
3. They can scan it with the built-in scanner to instantly add your contact

### Scanning Others' Profiles

1. Click "Scan QR Code" from the main navigation
2. Allow camera access when prompted
3. Point your camera at a profile QR code
4. The profile will be automatically detected and added to your contacts

### Managing Profiles

- **View All Profiles**: See all saved profiles in a grid layout
- **Set Current User**: Mark a profile as your active profile
- **Profile Details**: Click any profile to view full details
- **Delete Profiles**: Remove profiles you no longer need

## Technology Stack

- **Frontend**: Angular 19 with TypeScript
- **Styling**: SCSS with modern CSS Grid and Flexbox
- **QR Code Generation**: qrcode library
- **QR Code Scanning**: jsQR library for camera-based scanning
- **Storage**: Browser LocalStorage for data persistence
- **Responsive**: Mobile-first design approach

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Production Deployment

### Option 1: Local Node.js Server

1. **Build the application:**
   ```bash
   npm run build:prod
   ```

2. **Start the production server:**
   ```bash
   npm run serve:ssr
   ```

3. **Access the application:**
   ```
   http://localhost:4000
   ```

### Option 2: Using Deployment Script

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Start the server:**
   ```bash
   npm run serve:ssr
   ```

### Option 3: Docker Deployment

1. **Build the application:**
   ```bash
   npm run build:prod
   ```

2. **Build Docker image:**
   ```bash
   docker build -t profiles-sharing-app .
   ```

3. **Run Docker container:**
   ```bash
   docker run -p 4000:4000 profiles-sharing-app
   ```

## Environment Configuration

### Development
- Port: 4200 (ng serve)
- API URL: http://localhost:4200/api

### Production
- Port: 4000 (configurable via PORT environment variable)
- API URL: /api (relative to server)

## Production Environment Variables

```bash
PORT=4000                    # Server port (default: 4000)
NODE_ENV=production         # Node environment
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
