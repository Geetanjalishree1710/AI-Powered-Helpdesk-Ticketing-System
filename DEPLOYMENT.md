# Deployment Checklist

Use this checklist when deploying to production (GitHub/Hosting platforms).

## Pre-Deployment Steps

- [ ] **Environment Variables**
  - [ ] Create `.env` file (copy from `.env.example`)
  - [ ] Replace all placeholder values with actual credentials
  - [ ] Verify `JWT_SECRET` is at least 32 characters
  - [ ] Verify `MONGO_URI` is correct and has proper access

- [ ] **Security**
  - [ ] Confirm `.env` is in `.gitignore` (NOT committed)
  - [ ] Confirm no sensitive data in any committed files
  - [ ] Run `git status` and verify no .env files are staged
  - [ ] Check all credentials are environment-based, not hardcoded

- [ ] **Dependencies**
  - [ ] Run `npm install` to install all dependencies
  - [ ] Remove any unused packages
  - [ ] Verify all dependencies are in `package.json`
  - [ ] Confirm `nodemon` is in `devDependencies` (not `dependencies`)

- [ ] **Code Quality**
  - [ ] Run syntax check: `node -c app.js`
  - [ ] All route imports are correct
  - [ ] All middleware imports are correct
  - [ ] All model imports are correct

## GitHub Setup

- [ ] Initialize git repository (if not done): `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial commit: AI Helpdesk Ticketing System"`
- [ ] Add remote: `git remote add origin <github-url>`
- [ ] Push to GitHub: `git push -u origin main`

## Hosting Deployment

### For Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set JWT_SECRET="your-secret"
heroku config:set MONGO_URI="your-mongodb-uri"
```

### For Railway/Render/Vercel
1. Connect GitHub repository
2. Set environment variables in dashboard:
   - `JWT_SECRET`
   - `MONGO_URI`
   - `PORT` (optional, defaults to 3000)
3. Deploy

### For AWS/GCP/Azure
1. Create VM/App Service instance
2. SSH into instance
3. Clone repository
4. Run `npm install`
5. Set environment variables
6. Run `npm start`
7. Set up reverse proxy (nginx/Apache)

## Post-Deployment Testing

- [ ] Login page loads: `https://your-domain/login`
- [ ] Register page loads: `https://your-domain/register`
- [ ] Can create new user account
- [ ] Can login with created account
- [ ] Dashboard loads and shows stats
- [ ] Can create new ticket
- [ ] Can view all tickets
- [ ] Admin can resolve tickets
- [ ] Database connection works

## Monitoring

- [ ] Set up error logging (optional: Sentry, LogRocket)
- [ ] Monitor disk space
- [ ] Monitor CPU/Memory usage
- [ ] Set up automated backups for MongoDB
- [ ] Configure email alerts for errors

## File Structure Verification

Ensure your deployment includes:
```
.
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── views/
├── public/
├── .env (NOT IN GIT, created on server)
├── .env.example
├── app.js
├── package.json
└── README.md
```

## Environment Variables Template

```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your-very-secure-secret-key-min-32-chars-long
```

## Common Deployment Issues

| Issue | Solution |
|-------|----------|
| Cannot connect to MongoDB | Verify MONGO_URI in .env, check IP whitelist in MongoDB Atlas |
| Module not found errors | Run `npm install`, verify all dependencies in package.json |
| Port 3000 already in use | Change PORT in .env or kill process using port |
| .env file not found | Create .env file on server with proper environment variables |
| JWT token errors | Ensure JWT_SECRET matches between server instances |

## Rollback Plan

If deployment fails:
1. Check error logs: `pm2 logs` or platform-specific logs
2. Revert to last working commit: `git revert <commit-hash>`
3. Fix issue locally
4. Test thoroughly before re-deploying

## Documentation

- [ ] Keep README.md updated
- [ ] Document any customizations made
- [ ] Keep API endpoint documentation current
- [ ] Document deployment architecture
