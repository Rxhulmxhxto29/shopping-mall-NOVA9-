@echo off
cd /d C:\shopping-mall-website
echo Starting NOVA9 website server...
echo.
echo Server will run at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8080
pause
