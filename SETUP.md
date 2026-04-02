# Production Setup Guide

This document describes the complete production-ready structure and setup process for the AI-Powered Helpdesk Ticketing System.

## Project Structure Overview

```
ai-powered-helpdesk-ticketing-system/
│
├── src/                          # Main source directory
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── constants.js         # App-wide constants
│   │
│   ├── controllers/             # Business logic layer
│   │   ├── authController.js
│   │   └── ticketController.js
│   │
│   ├── middleware/              # Express middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── roleMiddleware.js    # Role-based access
│   │
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js
│   │   └── Ticket.js
│   │
│   ├── routes/                  # API endpoints
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   │
│   ├── utils/                   # Utility functions
│   │   ├── aiHelper.js         # AI ticket analysis
│   │   ├── errorHandler.js     # Error handling
│   │   └── logger.js           # Logging utility
│   │
│   └── app.js                   # Express app configuration
│
├── views/                        # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── tickets.ejs
│   └── createTicket.ejs
│
├── public/                       # Static files
│   └── css/
│       └── style.css
│
├── index.js                      # Application entry point
├── package.json
├── .env                         # Local environment (not in git)
├── .env.example                 # Template for .env
├── .env.production.example      # Production template
├── .gitignore
├── README.md
├── DEPLOYMENT.md
└── SETUP.md                     # This file
```

## Environment Configuration

### Development Setup

1. **Create Local Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Configure Development Variables**
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/helpdesk-dev?retryWrites=true&w=majority
   PORT=3000
   JWT_SECRET=dev-secret-key-just-for-testing-not-production
   NODE_ENV=development
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Production Setup

1. **Create Production Environment File**
   ```bash
   cp .env.production.example .env
   ```

2. **Generate Strong JWT Secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Configure Production Variables**
   - `MONGO_URI`: Production MongoDB Atlas connection
   - `PORT`: Production port (usually passed by hosting platform)
   - `JWT_SECRET`: Strong 32+ character key (use generated key above)
   - `NODE_ENV`: Set to `production`

4. **Install Production Dependencies**
   ```bash
   npm ci --only=production
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## File Organization Rationale

### `src/` Directory Structure
- **Separation of Concerns**: Each folder has a single responsibility
- **Scalability**: Easy to add new controllers, models, routes
- **Testability**: Well-organized code is easier to unit test
- **Maintainability**: Clear file structure helps new developers

### Entry Point Pattern
- **`index.js`**: Thin entry point that imports and starts the app
- **`src/app.js`**: Contains all Express configuration
- **Benefit**: Allows easy middleware testing without server startup

### Utilities Pattern
- **`errorHandler.js`**: Centralized error handling
- **`logger.js`**: Consistent logging across app
- **`aiHelper.js`**: Business logic utilities
- **Benefit**: Reusable, tested, easy to maintain

## Key Files Explained

### `src/config/constants.js`
Centralized constants for:
- HTTP status codes
- User roles
- Ticket statuses
- Error messages
- Validation rules

**Usage:**
```javascript
const CONSTANTS = require('../config/constants');
console.log(CONSTANTS.ROLES.ADMIN);
```

### `src/utils/errorHandler.js`
Provides:
- `AppError` class for consistent errors
- `catchAsync` wrapper for async route handlers
- `globalErrorHandler` middleware for all errors

**Usage:**
```javascript
const { AppError, catchAsync } = require('../utils/errorHandler');

router.get('/tickets', catchAsync(async (req, res) => {
    // Error thrown here will be caught automatically
}));
```

### `src/utils/logger.js`
Provides methods:
- `logger.error()` - Always logs
- `logger.warn()` - Dev only
- `logger.info()` - Dev only
- `logger.debug()` - Dev only
- `logger.success()` - Dev only

**Usage:**
```javascript
const { logger } = require('../utils/logger');
logger.success('Ticket created', { ticketId: 123 });
```

## Deployment Platforms

### Docker (Recommended)
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Heroku
```bash
git push heroku main
heroku config:set JWT_SECRET="your-secret"
```

### Railway/Render
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy

### AWS EC2
```bash
# On server:
git clone <repo>
npm install
npm start

# Use PM2 for process management:
npm install -g pm2
pm2 start index.js
```

## Development Workflow

### 1. Feature Development
```bash
npm run dev
# Code and test changes
git add .
git commit -m "feat: description"
git push origin feature-branch
```

### 2. Testing Locally
- Start dev server: `npm run dev`
- Access http://localhost:3000
- Test all features locally

### 3. Before Production Push
- Ensure `.env` is in `.gitignore`
- Test with production environment variables locally
- Run through deployment checklist in `DEPLOYMENT.md`

## Common Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found | Run `npm install`, check import paths |
| Port in use | Change PORT in .env or kill process |
| MongoDB connection error | Verify MONGO_URI, check IP whitelist |
| Token errors | Ensure JWT_SECRET is consistent |
| View not found | Check view name matches file in `views/` |

## Performance Optimization Tips

1. **Database Indexing**: Add indexes on frequently queried fields
2. **Connection Pooling**: Configure via `MONGO_POOL_SIZE`
3. **Compression**: Add gzip middleware in production
4. **Caching**: Use Redis for frequently accessed data
5. **Monitoring**: Set up error tracking (Sentry, etc.)

## Security Checklist

- [ ] Never commit `.env` file
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable MongoDB IP whitelist
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Rate limit API endpoints
- [ ] Use environment-based secrets only
- [ ] Regular dependency updates: `npm audit`
- [ ] Implement request logging

## Monitoring (Production)

### Logs
- Standard output: Application logs
- Error logs: Errors and exceptions
- Access logs: HTTP requests

### Metrics to Track
- Response times
- Error rates
- Database connection pool
- Memory usage
- CPU usage
- Request throughput

### Recommended Tools
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Datadog**: Application monitoring
- **New Relic**: Performance monitoring
- **Sentry**: Error tracking

## Scaling Strategy

### Phase 1: Single Instance
- Current setup
- Suitable for < 1000 daily users

### Phase 2: Load Balancing
- Multiple Node instances
- Nginx/HAProxy for routing
- Session storage in Redis

### Phase 3: Microservices
- Split controllers into services
- API gateway
- Message queue (RabbitMQ/Redis)

## Next Steps

1. Review `.env.example` and create `.env`
2. Run `npm install`
3. Test with `npm run dev`
4. Check DEPLOYMENT.md for production setup
5. Configure your hosting platform
6. Deploy with confidence!

For more information, see:
- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment guide
- `DEPLOYMENT.md` - Deployment checklist
