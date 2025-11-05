# 🍽️ Recipe Book — v0.2

A modern, full-stack **Recipe Finder App** with secure login and signup powered by **MongoDB + Node.js + TheMealDB API**.  
Search recipes, explore cuisines, and enjoy a beautiful dark-glow user interface.  

---

## ✨ Features

### 🖥️ Frontend
- 🔍 Search any dish using **TheMealDB API**
- 🍛 Filter cuisines (Indian, Italian, Chinese, etc.)
- 💎 Dark-glow modern UI built with HTML, CSS & JavaScript
- 📱 Fully responsive design for all screen sizes
- 📜 Recipe popup with ingredients & instructions

### 🔐 Authentication
- 👤 User **Signup** & **Login** system  
- 🔒 Passwords securely hashed using **bcrypt**
- 🪪 JWT tokens for user sessions  
- 🚫 Protected routes (unauthenticated users are redirected to login)

### ⚙️ Backend
- 🧠 Built using **Node.js + Express.js**
- 🗄️ MongoDB (via Mongoose) for user storage
- 🌐 REST API endpoints for login & signup
- ✅ CORS enabled for frontend-backend communication

---

## 🧰 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| API | [TheMealDB API](https://www.themealdb.com/api.php) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Recipe-Book.git
cd Recipe-Book
```

### 2️⃣ Setup the Backend
```bash
cd backend
npm install
```
### Start MongoDB (if not already running)
```bash
mongod
```
### You should see:
```bash
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
```
### 3️⃣ Open the Frontend
Open index.html directly in your browser (or with Live Server in VS Code).
- 🔑 signup.html → Register new users
- 🔐 login.html → Login existing users
- 🏠 index.html → Main Recipe Search (protected page)
- 🎬 videos.html → Video recipes section
- 👥 about.html → About the creators

Once logged in, your session token allows access to all features.

## 🧾 API Routes
|Method|	Route	|Description|
|-------|-------|------------|
|POST	|/signup	|Registers a new user|
|POST|	/login	|Authenticates an existing user|

#### Example Request 
```bash
POST /signup
{
  "fullname": "Rehan Bawakhan",
  "username": "rehan123",
  "password": "mypassword"
}
```
#### Example Request
```bash
{
  "message": "User registered successfully!"
}
```
---
## 🗃️ View Users in MongoDB Compass

1. Open MongoDB Compass
2. Connect using:
```bash
mongodb://127.0.0.1:27017
```
3. Open the database:
```bash
recipeDB
```
4. Open the users collection
5. You’ll see documents like:
```bash
{
  "_id": "67412a5f2b1f45b14e32a9d1",
  "fullname": "Rehan S. B",
  "username": "admin",
  "password": "$2a$10$xyzHashedValue",
  "__v": 0
}
```

---

## 🧠 Folder Structure
```go
Recipe-Book/
│
├── index.html
├── about.html
├── videos.html
├── login.html
├── signup.html
│
├── style.css
├── auth.css
├── script.js
├── auth.js
│
├── assets/
│   ├── logo.png
│   ├── 1.jpg
│   └── ...
│
└── backend/
    ├── server.js
    ├── package.json
    ├── package-lock.json
```

---

## 🏷️ Versions
|Version	|Changes|
|--------|--------|
|v0.1	|🌐 Added frontend UI + TheMealDB integration|
|v0.2	|🗄️ Added backend with Node.js, Express & MongoDB authentication|

---

## 👨‍💻 Author

**Rehan S. Bawakhan**  
📍 Hubli-Dharwad, Karnataka, India
