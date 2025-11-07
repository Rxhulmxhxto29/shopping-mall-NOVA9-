# NOVA9 Shopping Mall - Full Stack Application

## 🏢 Features
- **Customer Authentication** (Login/Register with JWT)
- **Customer Dashboard** with profile management
- **Shopping Cart & Checkout** with order history
- **Loyalty Points System** with tier tracking
- **Event Bookings** stored in database
- **Restaurant Reservations** management
- **PostgreSQL Database** for all data storage

## 📋 Prerequisites
Before running this application, make sure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)

## 🚀 Setup Instructions

### 1. Install PostgreSQL
1. Download and install PostgreSQL
2. During installation, set a password for the `postgres` user (remember this!)
3. PostgreSQL will run on port `5432` by default

### 2. Create Database
Open PostgreSQL (pgAdmin or command line) and run:
```sql
CREATE DATABASE nova9_mall;
```

### 3. Configure Backend
1. Navigate to backend folder:
   ```powershell
   cd C:\shopping-mall-website\backend
   ```

2. Edit `.env` file and update your PostgreSQL password:
   ```
   DB_PASSWORD=your_actual_postgres_password
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

### 4. Start Backend Server
```powershell
npm start
```

You should see:
```
✅ Connected to PostgreSQL database
✅ All tables created successfully
🚀 Server running on port 5000
```

### 5. Start Frontend
Open a NEW PowerShell window:
```powershell
cd C:\shopping-mall-website
python -m http.server 8080
```

## 🌐 Access the Application

- **Website**: http://localhost:8080/index.html
- **Dashboard**: http://localhost:8080/dashboard.html
- **API**: http://localhost:5000/api

## 📝 How to Use

### Customer Registration
1. Click "Sign In" button in navbar
2. Click "Sign Up" tab
3. Fill in your details
4. Click "Create Account"
5. Auto-redirected to dashboard

### Shopping & Checkout
1. Add items to cart
2. Checkout
3. **Order saved to database**
4. **Earn loyalty points**

## 🔧 Complete Setup Guide in SETUP_GUIDE.md
