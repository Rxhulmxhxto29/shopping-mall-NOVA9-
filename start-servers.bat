@echo off
echo ========================================
echo   NOVA9 Shopping Mall - Backend Setup
echo ========================================
echo.

echo Step 1: Checking PostgreSQL...
echo Please make sure PostgreSQL is installed and running!
echo.

echo Step 2: Starting Backend Server...
cd backend
start cmd /k "npm start"

echo.
echo Step 3: Starting Frontend Server...
cd ..
start cmd /k "python -m http.server 8080"

echo.
echo ========================================
echo   Servers Starting!
echo ========================================
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:8080/index.html
echo Dashboard: http://localhost:8080/dashboard.html
echo.
echo IMPORTANT: 
echo 1. Make sure PostgreSQL is running
echo 2. Update backend\.env with your PostgreSQL password
echo 3. Create database: CREATE DATABASE nova9_mall;
echo.
pause
