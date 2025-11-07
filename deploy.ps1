# NOVA9 Shopping Mall - Automated Deployment Script
# This script will help you deploy your frontend to Vercel

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     NOVA9 Shopping Mall - Automated Deployment           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Check if Vercel CLI is installed
Write-Host "[1/5] Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "      Installing Vercel CLI..." -ForegroundColor Gray
    npm install -g vercel
    Write-Host "      ✅ Vercel CLI installed!" -ForegroundColor Green
} else {
    Write-Host "      ✅ Vercel CLI already installed!" -ForegroundColor Green
}

# Step 2: Ask for backend URL
Write-Host "`n[2/5] Backend Configuration" -ForegroundColor Yellow
Write-Host "      Have you deployed your backend to Render yet?" -ForegroundColor White
Write-Host "      (If not, follow DEPLOY_NOW.md Step 1 first)" -ForegroundColor Gray
$backendDeployed = Read-Host "`n      Has backend been deployed? (y/n)"

if ($backendDeployed -eq 'y') {
    $backendURL = Read-Host "`n      Enter your Render backend URL (e.g., https://nova9-backend.onrender.com)"
    
    # Remove trailing slash if present
    $backendURL = $backendURL.TrimEnd('/')
    
    Write-Host "`n[3/5] Updating API URLs in code..." -ForegroundColor Yellow
    
    # Update auth.js
    (Get-Content auth.js) -replace "http://localhost:5000", "$backendURL" | Set-Content auth.js
    Write-Host "      ✅ Updated auth.js" -ForegroundColor Green
    
    # Update script.js
    (Get-Content script.js) -replace "http://localhost:5000", "$backendURL" | Set-Content script.js
    Write-Host "      ✅ Updated script.js" -ForegroundColor Green
    
    # Commit changes
    Write-Host "`n[4/5] Committing changes to Git..." -ForegroundColor Yellow
    git add auth.js script.js vercel.json backend/render.yaml DEPLOY_NOW.md
    git commit -m "Configure for production deployment with $backendURL"
    git push
    Write-Host "      ✅ Changes pushed to GitHub!" -ForegroundColor Green
    
    # Deploy to Vercel
    Write-Host "`n[5/5] Deploying to Vercel..." -ForegroundColor Yellow
    Write-Host "      You'll be asked to log in to Vercel in your browser..." -ForegroundColor Gray
    Write-Host "      Press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    
    vercel --prod
    
    Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║              🎉 DEPLOYMENT COMPLETE! 🎉                   ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host "`nYour app is now live! Check the URL above. ⬆️" -ForegroundColor Cyan
    
} else {
    Write-Host "`n⚠️  Please deploy your backend first!" -ForegroundColor Yellow
    Write-Host "`n📖 Follow these steps:" -ForegroundColor White
    Write-Host "   1. Open DEPLOY_NOW.md" -ForegroundColor Gray
    Write-Host "   2. Complete STEP 1 (Deploy Backend to Render)" -ForegroundColor Gray
    Write-Host "   3. Run this script again" -ForegroundColor Gray
    Write-Host "`n   Or visit: https://render.com to get started`n" -ForegroundColor Cyan
}
