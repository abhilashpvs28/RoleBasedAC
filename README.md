This is a simple Node.js + PostgreSQL API implementing Role-Based Access Control (RBAC) system. It allows users with different roles (Admin, Manager, User) to perform specific actions like CRUD operations, login, registration, etc.

🚀 Features
User Authentication (JWT-based)
Role-based authorization (Admin, Manager, User)
Password hashing using bcrypt
PostgreSQL database connection
Middleware implementation
Secure API Routes

🏡 Tech Stack
Node.js
Express.js
PostgreSQL
bcryptjs
jsonwebtoken (JWT)
dotenv

📁 Project Structure
src/
 ┓ config/
 ┃ ┗ db.js               # Database connection
 ┓ controllers/
 ┃ ┗ authController.js   # Handles registration, login, etc.
 ┓ middlewares/
 ┃ ┓ authMiddleware.js   # JWT Authentication middleware
 ┃ ┗ roleMiddleware.js   # Role-based authorization middleware
 ┓ routes/
 ┃ ┓ authRoutes.js       # Routes for login/register
 ┃ ┗ userRoutes.js       # Routes for user actions
 ┗ index.js              # Entry point
.env                     # Environment variables


🔑 Environment Variables (.env)

PORT=4500
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key

📝 Installation
# Clone repo
git clone https://github.com/abhilashpvs28/RoleBasedAC.git
cd RoleBasedAC

# Install dependencies
npm install

# Set up .env file (copy from example)

# Run server
npm run dev
