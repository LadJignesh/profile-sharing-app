# Profile Sharing App - Production Ready

A modern Angular 19 application for sharing profiles with QR codes, built with server-side rendering (SSR) and optimized for production deployment.

## 🚀 Features

- **Angular 19** - Latest Angular version with standalone components
- **Server-Side Rendering (SSR)** - Fast initial page loads and SEO optimization
- **QR Code Generation & Scanning** - Share profiles via QR codes
- **User Authentication** - Secure login and registration system
- **Profile Management** - Create and manage user profiles
- **Production Ready** - Optimized build configuration, Docker support, and monitoring

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional, for containerized deployment)

## 🛠️ Development Setup

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd profiles-sharing-app

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## 🏗️ Production Build

### Build for Production
```bash
# Build the application
npm run build:prod

# Start production server
npm run start:prod
```

### Deployment Script
```bash
# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
npm run docker:build
```

### Run with Docker
```bash
npm run docker:run
```

### Docker Compose
```bash
docker-compose up -d
```

## 📊 Process Management with PM2

### Start with PM2
```bash
npm run pm2:start
```

### Monitor
```bash
npm run pm2:logs
```

### Stop
```bash
npm run pm2:stop
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build:prod` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:ci` | Run tests in CI mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run analyze` | Analyze bundle size |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |
| `npm run pm2:start` | Start with PM2 |
| `npm run pm2:stop` | Stop PM2 processes |
| `npm run pm2:restart` | Restart PM2 processes |
| `npm run pm2:logs` | View PM2 logs |

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── components/           # Angular components
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── profile-create/
│   │   ├── profile-detail/
│   │   ├── profile-list/
│   │   └── qr-scanner/
│   ├── services/            # Angular services
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   └── qr-scanner.service.ts
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts
│   ├── models/              # TypeScript interfaces
│   │   ├── profile.interface.ts
│   │   └── user.interface.ts
│   └── app.config.ts        # App configuration
├── environments/            # Environment configurations
├── server.ts               # Express server for SSR
└── main.server.ts          # Server bootstrap
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Simple health check |
| GET | `/api/health` | Detailed health information |
| GET | `/api/info` | Application information |

## 🔒 Security Features

- **Content Security Policy (CSP)** headers
- **HTTPS enforcement** (Strict-Transport-Security)
- **XSS protection** headers
- **Input validation** and sanitization
- **Secure session management**

## 📈 Performance Optimizations

- **Tree-shaking** for minimal bundle size
- **Code splitting** with lazy loading
- **Server-side rendering** for fast initial loads
- **Gzip compression** enabled
- **Asset caching** strategies
- **Bundle size monitoring** with warnings

## 🐛 Monitoring & Logging

- **Health check endpoints** for load balancers
- **Request logging** middleware
- **Error handling** with proper HTTP status codes
- **Graceful shutdown** handling
- **PM2 process monitoring**

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
PORT=4000
SESSION_SECRET=your-secret-key
ENABLE_SWAGGER=false
ENABLE_METRICS=true
LOG_LEVEL=error
```

### Angular Configuration
- **Production builds** with optimization enabled
- **Source maps** disabled in production
- **License extraction** enabled
- **Bundle size budgets** configured

## 🚦 Health Checks

The application provides multiple health check endpoints:

- `GET /health` - Simple OK response for load balancers
- `GET /api/health` - Detailed health information with timestamps
- `GET /api/info` - Application metadata and uptime

## 📱 Features

### QR Code Integration
- Generate QR codes for profile sharing
- Scan QR codes to view profiles
- Mobile-optimized scanner interface

### User Management
- Secure registration and login
- Profile creation and editing
- Dashboard for managing profiles

### Responsive Design
- Mobile-first approach
- Modern SCSS styling
- Optimized for all device sizes

## 🔄 CI/CD Ready

The application is configured for continuous integration with:
- Automated testing pipeline
- Docker containerization
- Environment-specific builds
- Health check integration

## 📚 Dependencies

### Core Dependencies
- **Angular 19** - Framework
- **Express** - Server framework
- **QRCode** - QR code generation
- **jsQR** - QR code scanning

### Development Dependencies
- **TypeScript** - Type safety
- **Angular CLI** - Build tools
- **Karma/Jasmine** - Testing

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure Node.js version is 20+
2. **Port Conflicts**: Change PORT environment variable
3. **Memory Issues**: Increase Node.js memory with `--max-old-space-size`

### Debug Mode
```bash
NODE_ENV=development npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Build for production: `npm run build:prod`
6. Submit a pull request

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review application logs: `npm run pm2:logs`
- Check health endpoints: `curl http://localhost:4000/health`

---

**Built with ❤️ using Angular 19 and modern web technologies**
