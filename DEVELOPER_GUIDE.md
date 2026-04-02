# Developer Quick Reference

## Command Reference

```bash
# Setup & Installation
npm install              # Install all dependencies
npm install --save pkg   # Add production dependency
npm install --save-dev pkg # Add dev dependency

# Running the Application
npm start                # Production mode
npm run dev              # Development mode (auto-reload)

# Code Quality
npx eslint src/          # Lint code (if added)
npm test                 # Run tests (when added)

# Package Management
npm list                 # List all packages
npm outdated             # Check for updates
npm audit                # Check for vulnerabilities
npm update               # Update packages

# Git Operations
git status               # Check changes
git add .                # Stage all changes
git commit -m "msg"      # Create commit
git push                 # Push to remote
git pull                 # Pull from remote
```

## File Navigation

### Quick File Locations

```
Authentication Logic     → src/controllers/authController.js
Ticket Logic            → src/controllers/ticketController.js
Auth Middleware         → src/middleware/authMiddleware.js
Role Middleware         → src/middleware/roleMiddleware.js
User Database           → src/models/User.js
Ticket Database         → src/models/Ticket.js
Auth Routes             → src/routes/authRoutes.js
Ticket Routes           → src/routes/ticketRoutes.js
Configuration           → src/config/constants.js
Error Handling          → src/utils/errorHandler.js
Logging                 → src/utils/logger.js
Main App                → src/app.js
Entry Point             → index.js (root)
Environment Setup       → .env
View Templates          → views/
Static Files            → public/css/
```

## Common Tasks

### Add New Route

1. Create route handler in `src/routes/newRoutes.js`:
```javascript
const router = require("express").Router();
const ctrl = require("../controllers/newController");

router.get("/path", ctrl.handler);
module.exports = router;
```

2. Add to `src/app.js`:
```javascript
app.use("/", require("./routes/newRoutes"));
```

### Add New Controller

Create `src/controllers/newController.js`:
```javascript
exports.handler = async(req, res) => {
    try {
        // Logic here
        res.json({ success: true });
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};
```

### Add New Model

Create `src/models/NewModel.js`:
```javascript
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    field: String,
});

module.exports = mongoose.model("Model", schema);
```

### Add Middleware

Create `src/middleware/newMiddleware.js`:
```javascript
module.exports = (req, res, next) => {
    // Middleware logic
    next();
};
```

Then use in routes:
```javascript
router.get("/path", middleware, ctrl.handler);
```

## Environment Setup

### Development `.env`
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dev
PORT=3000
JWT_SECRET=dev-secret-only-for-testing
NODE_ENV=development
```

### Production `.env`
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/prod
PORT=3000
JWT_SECRET=<strong-32-char-secret>
NODE_ENV=production
```

## Debugging Tips

### Enable Verbose Logging
```bash
# Development with detailed logs
DEBUG=* npm run dev
```

### Check Port Usage
```bash
# See what's using port 3000
lsof -i :3000          # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess  # Windows
```

### MongoDB Connection Issues
```javascript
// Add in src/config/db.js for debugging:
const mongoose = require("mongoose");

mongoose.set('debug', true);  // Shows all queries

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ Connection Error:", err);
        process.exit(1);
    }
};
```

### Clear Browser Cache
```bash
# Development: Use browser DevTools
# Or add header to src/app.js:
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});
```

## Terminal Shortcuts

### Useful Aliases (Add to ~/.bashrc or ~/.zshrc)

```bash
alias start="npm start"
alias dev="npm run dev"
alias test="npm test"
alias lint="npx eslint src/"
alias audit="npm audit"
```

Then use:
```bash
dev
start
test
```

## Project Commands

### Full Development Workflow

```bash
# 1. Setup (first time)
npm install
cp .env.example .env
# Edit .env with your values

# 2. Start development
npm run dev

# 3. Make changes
# Edit files in src/

# 4. Test changes
# Visit http://localhost:3000

# 5. Commit changes
git add .
git commit -m "feat: description"
git push

# 6. Deploy (platform dependent)
git push heroku main  # If using Heroku
```

## Code Style Guidelines

### Naming Conventions
```javascript
// Files: camelCase or kebab-case
userController.js
auth-middleware.js

// Exports: camelCase for functions, PascalCase for classes
exports.createUser = async() => {};
class UserError extends Error {}

// Variables: camelCase
const userName = "John";
const MAX_RETRIES = 3;  // Constants: UPPER_SNAKE_CASE
```

### Error Handling
```javascript
// Use try-catch
try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
} catch (err) {
    console.error("ERROR:", err.message);
    throw err;
}
```

### Comments
```javascript
// Use comments for "why", not "what"
// Bad:
i++;  // Increment i

// Good:
i++;  // Move to next user in queue
```

## Performance Optimization

### Check Memory Usage
```bash
node --inspect index.js
# Visit chrome://inspect in Chrome
```

### Check Dependencies
```bash
npm list
npm outdated
npm audit fix
```

### Database Indexing
```javascript
// In models:
schema.index({ email: 1 });
schema.index({ createdAt: -1 });
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found | Check import path, run `npm install` |
| Port in use | Change PORT in .env or kill process |
| MongoDB "ECONNREFUSED" | Check MONGO_URI, is service running? |
| "Cannot find module" | Run `npm install`, check spelling |
| Views not rendering | Check template name, verify views path |
| 404 errors | Check route definitions, restart server |
| CORS errors | Add CORS middleware (if needed) |

## Useful Links

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Intro](https://jwt.io/)
- [EJS Docs](https://ejs.co/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Getting Help

1. Check error message carefully
2. Read relevant documentation
3. Review similar code in project
4. Check project issues/PRs
5. Ask team lead/mentor

---

Last Updated: 2026-04-02
