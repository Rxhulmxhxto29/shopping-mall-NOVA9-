# 🚀 NOVA9 Backend Setup Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Install PostgreSQL
1. Download PostgreSQL: https://www.postgresql.org/download/windows/
2. Run installer
3. **Remember the password you set for 'postgres' user!**
4. Keep default port: **5432**

### Step 2: Create Database
Open **pgAdmin** (comes with PostgreSQL) or **SQL Shell**:

```sql
CREATE DATABASE nova9_mall;
```

### Step 3: Configure Backend
1. Open `backend\.env` file
2. Change this line:
   ```
   DB_PASSWORD=your_password_here
   ```
   To your actual PostgreSQL password:
   ```
   DB_PASSWORD=YourActualPassword
   ```

### Step 4: Start Everything
Double-click: **`start-servers.bat`**

This will:
- ✅ Start Backend API (port 5000)
- ✅ Start Frontend (port 8080)
- ✅ Create all database tables automatically

### Step 5: Test It!
1. Open browser: **http://localhost:8080/index.html**
2. Click **"Sign In"**
3. Register a new account
4. You'll be redirected to your dashboard!

## 📊 What's Created in Database

When you start the backend, it automatically creates these tables:
- `users` - Customer accounts
- `loyalty_points` - Loyalty rewards
- `orders` - Purchase history
- `order_items` - Order details
- `event_bookings` - Event reservations
- `restaurant_reservations` - Dining bookings
- `lost_found_items` - Lost & found
- `personal_shopper_bookings` - Stylist appointments
- `customer_feedback` - Reviews
- `gift_cards` - Gift cards

## 🎯 Features Now Working

### 1. Customer Registration & Login
- Real database storage
- Password encryption (bcrypt)
- JWT authentication
- Persistent sessions

### 2. Customer Dashboard
- View profile
- See loyalty points
- Check order history
- Upcoming events
- Restaurant reservations
- Update personal info

### 3. Shopping Cart
- Add items
- Checkout
- **Orders saved to database**
- **Automatic loyalty points** (1 point per $1)

### 4. Event Booking
- Book events
- **Saved to database**
- View in dashboard

### 5. Restaurant Reservations
- Make reservations
- **Saved to database**
- Manage bookings

## 🔧 Testing the System

### Test User Registration:
1. Go to http://localhost:8080/index.html
2. Click "Sign In"
3. Click "Sign Up" tab
4. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 1234567890
   - Password: password123
5. Click "Create Account"
6. ✅ You'll be redirected to dashboard
7. ✅ Check PostgreSQL - new user in `users` table!

### Test Shopping:
1. Add items to cart
2. Checkout
3. Fill shipping info
4. Place order
5. ✅ Check dashboard - order appears
6. ✅ Check PostgreSQL - order in `orders` table!
7. ✅ Loyalty points added!

### Test Event Booking:
1. Click feature hub (orange button)
2. Click "Events"
3. Click "Register" on an event
4. ✅ Booking saved
5. ✅ Appears in dashboard

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running (Services → postgresql-x64-15)
- Verify password in `backend\.env`
- Make sure database `nova9_mall` exists

### "Port already in use"
- Close other servers
- Or change ports in `.env` and `start-servers.bat`

### "npm not found"
- Install Node.js from nodejs.org
- Restart computer
- Run: `npm install` in backend folder

## 📱 Access Points

- **Main Website**: http://localhost:8080/index.html
- **Customer Dashboard**: http://localhost:8080/dashboard.html
- **API Health**: http://localhost:5000/api/health
- **pgAdmin** (view database): http://localhost:5050 (if installed)

## 🎉 You're Done!

Your NOVA9 shopping mall now has:
- ✅ Working customer login/registration
- ✅ Database storage for all features
- ✅ Customer dashboard
- ✅ Order history
- ✅ Loyalty points system
- ✅ Event bookings
- ✅ Restaurant reservations
- ✅ Secure authentication

Start shopping! 🛍️
