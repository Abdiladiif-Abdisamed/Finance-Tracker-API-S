# 💰 Personal Finance Tracker (Full Stack)

A complete **Personal Finance Tracker** built with **React (Vite + Tailwind)** on the frontend and **Node.js (Express + MongoDB)** on the backend.  
It helps users manage income and expenses, visualize spending patterns, upload profile pictures, and track monthly summaries — all secured with JWT authentication.

---

## 🚀 Features

### 👤 Authentication
- Register and Login with JWT
- Role-based access (`user` / `admin`)
- Passwords hashed using **bcrypt**
- Profile picture upload via **Cloudinary**

### 💸 Transactions
- Add, edit, delete, and list income or expenses
- Organize by category
- Automatic **monthly summary** (income, expenses, net balance)

### 📊 Dashboard
- Interactive charts built with **Recharts**
- Visual overview of spending per category

### 🛡️ Admin Panel
- Overview of total users
- Global income/expense statistics
- Top spending categories

### ⚙️ Backend Security & Performance
- **Zod** validation
- **Helmet**, **CORS**, **Rate Limiting**
- Global error handling and logging with **Morgan**

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Router, Recharts |
| **Backend** | Node.js, Express, Mongoose |
| **Auth** | JWT, bcrypt |
| **Validation** | Zod |
| **Storage** | MongoDB (Atlas or local) |
| **File Upload** | Multer + Cloudinary |
| **Security** | Helmet, CORS, express-rate-limit |

---

## 🗂️ Project Structure

```
finance-tracker-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── main.jsx
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Installation Guide

### 🔧 1. Clone the project
```bash
git clone https://github.com/your-username/finance-tracker-fullstack.git
cd finance-tracker-fullstack
```

---

### 🗄️ 2. Setup the Backend
```bash
cd backend
cp .env.example .env
npm install
```

#### Update `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/finance_tracker
JWT_SECRET=your_secret
JWT_EXPIRES=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Start server
```bash
npm run dev
```
The API runs at **http://localhost:5000**

---

### 💻 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
The React app runs at **http://localhost:5173**

---

## 🔗 API Endpoints (Quick Reference)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/profile` | Get logged-in profile |
| GET | `/transactions` | List all transactions |
| POST | `/transactions` | Add a new transaction |
| PUT | `/transactions/:id` | Update transaction |
| DELETE | `/transactions/:id` | Delete transaction |
| GET | `/transactions/monthly-summary` | Monthly overview |
| POST | `/upload/profile-picture` | Upload profile image |
| GET | `/admin/overview` | Admin stats |

---

## 🧪 Testing with Postman

1. Import the API endpoints manually or via a collection file.
2. Login and copy your token.
3. Add a header:
   ```
   Authorization: Bearer <your_token>
   ```
4. Try endpoints like `/transactions` or `/auth/profile`.

---

## 🖼️ Frontend Highlights

- Responsive UI built with **Tailwind CSS**
- Auth flow (Login/Register)
- Dashboard with summary charts
- CRUD forms for transactions
- Profile picture upload with preview
- Protected routes (using React Context)
- Admin overview dashboard

---

## 📦 Deployment

You can deploy easily using:
- **Backend** → [Render](https://render.com) / [Railway](https://railway.app)
- **Frontend** → [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- Set environment variables in the hosting dashboard.

---

## 👨‍💻 Author

**Yousuf Mire Yousuf**  
📍 Somalia | 💼 Project Manager & AI Enthusiast  
🔗 [LinkedIn](https://linkedin.com/in/your-linkedin)  
🔗 [GitHub](https://github.com/your-username)

---

## 📜 License
This project is licensed under the **MIT License** — free for personal and commercial use.

---

### 🌟 If you like this project
Please **star ⭐ the repo** or fork it to make your own version!
