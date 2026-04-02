# Quick Start Guide

Get the AI-Powered Helpdesk Ticketing System running in 5 minutes.

## Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- MongoDB Atlas account ([Free tier available](https://www.mongodb.com/cloud/atlas))
- Git

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/helpdesk?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your-secret-key-here
```

### 3. Run Development Server
```bash
npm run dev
```

Server starts at: **http://localhost:3000**

## First Steps

1. **Register** → Create a new account
2. **Login** → Access your account
3. **Create Ticket** → Create a support ticket
4. **View Dashboard** → See ticket statistics
5. **Admin Panel** → Login as admin to manage all tickets

## Available Scripts

```bash
npm start      # Run production server
npm run dev    # Run with auto-reload (development)
npm test       # Run tests
```

## Project Structure

```
src/
├── config/         # Database & constants
├── controllers/    # Business logic
├── middleware/     # Auth & roles
├── models/        # MongoDB schemas
├── routes/        # API endpoints
├── utils/         # Helpers & utilities
└── app.js         # Express config

views/            # EJS templates
public/           # Static files (CSS, etc)
index.js          # Entry point
```

## Need Help?

- **Setup Issues?** → See [`SETUP.md`](./SETUP.md)
- **Deployment Help?** → See [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- **Full Documentation** → See [`README.md`](./README.md)

## User Roles

| Role | Permissions |
|------|-------------|
| **User** | Create & view own tickets |
| **Admin** | View all, resolve, manage |

## Environment Variables

| Variable | Example | Required |
|----------|---------|----------|
| `MONGO_URI` | `mongodb+srv://...` | ✓ |
| `PORT` | `3000` | ✗ |
| `JWT_SECRET` | `long-random-string` | ✓ |

## Common Issues

**Port 3000 already in use?**
```bash
# Change in .env
PORT=5000
```

**MongoDB connection error?**
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure user has proper permissions

**Need to reset data?**
- Delete collections in MongoDB Atlas
- Restart application

## Next Steps

1. ✅ [Follow full setup guide](./SETUP.md)
2. ✅ [Prepare for deployment](./DEPLOYMENT.md)
3. ✅ [Read project overview](./README.md)

---

**Built with** Node.js • Express • MongoDB • EJS

**Ready to deploy?** Push to GitHub and follow [deployment guide](./DEPLOYMENT.md).
