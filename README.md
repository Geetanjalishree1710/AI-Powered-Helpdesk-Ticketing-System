# AI-Powered Helpdesk Ticketing System

A comprehensive ticket management solution with AI-powered ticket analysis and categorization.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Ticket Management**: Create, view, and manage support tickets
- **Role-Based Access**: Admin and user roles with different permissions
- **Real-Time Stats**: Dashboard with ticket statistics
- **AI-Powered Analysis**: Automatic ticket categorization and priority assignment
- **Responsive UI**: Bootstrap-based responsive design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs
- **Frontend**: EJS Templates, Bootstrap 5
- **AI**: Custom ticket analysis engine

## Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-powered-helpdesk-ticketing-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_secret_key_min_32_chars
   ```

## Running the Application

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

The application will start on `http://localhost:3000`

## Project Structure

```
.
├── src/                 # Source code directory
│   ├── config/         # Configuration files
│   │   └── db.js       # MongoDB connection
│   ├── controllers/    # Route controllers
│   │   ├── authController.js
│   │   └── ticketController.js
│   ├── middleware/    # Express middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/       # MongoDB models
│   │   ├── User.js
│   │   └── Ticket.js
│   ├── routes/      # API routes
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── utils/      # Utility functions
│   │   └── aiHelper.js
│   └── app.js      # Express app configuration
├── views/          # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── tickets.ejs
│   └── createTicket.ejs
├── public/         # Static files
│   └── css/
│       └── style.css
├── index.js        # Application entry point
├── package.json
├── .env           # Environment variables (not in git)
├── .env.example   # Environment variables template
├── README.md
├── DEPLOYMENT.md
└── node_modules/  # Dependencies
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration

### Tickets
- `POST /tickets` - Create a new ticket
- `GET /all-tickets` - Get all tickets
- `GET /stats` - Get ticket statistics (admin only)
- `POST /tickets/resolve/:id` - Resolve a ticket (admin only)

### Pages
- `GET /login` - Login page
- `GET /register` - Registration page
- `GET /dashboard` - Dashboard with stats
- `GET /tickets` - Ticket listing page
- `GET /create-ticket` - Create ticket page

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | `your-32-character-secret-key` |

## User Roles

- **User**: Can create and view their own tickets
- **Admin**: Can view all tickets, resolve tickets, and access statistics

## Deployment

### Deploy to Heroku
```bash
heroku create
git push heroku main
```

### Deploy to AWS/GCP/Azure
1. Ensure `.env` is NOT committed - verify `.gitignore` includes `.env`
2. Set environment variables in your platform's dashboard
3. Push code to your repository
4. Deploy through your platform's CI/CD

## Security Considerations

- Never commit `.env` files to git
- Use strong `JWT_SECRET` in production (minimum 32 characters)
- Always hash passwords with bcryptjs (already implemented)
- Validate all user inputs on both client and server
- Use HTTPS in production

## Common Issues

### MongoDB Connection Error
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes your server IP
- Ensure database user has proper permissions

### JWT Token Errors
- Ensure `JWT_SECRET` is at least 32 characters in production
- Clear browser cookies if getting unexpected token errors

### Port Already in Use
```bash
# Change PORT in .env or
kill -9 $(lsof -ti:3000)  # macOS/Linux
```

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Create a Pull Request

## License

This project is licensed under the ISC License - see the `package.json` file for details.

## Support

For issues and questions, please create an issue in the repository.
