Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   NOVA9 SHOPPING MALL - SYSTEM TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$allPassed = $true

# Test 1: Backend Health
Write-Host "[1/8] Testing Backend Health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri 'http://localhost:5000/api/health' -ErrorAction Stop
    Write-Host "      ✅ Backend Server: RUNNING" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Backend Server: FAILED" -ForegroundColor Red
    $allPassed = $false
}

# Test 2: Frontend Server
Write-Host "`n[2/8] Testing Frontend Server..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri 'http://localhost:8080' -UseBasicParsing -ErrorAction Stop
    Write-Host "      ✅ Frontend Server: RUNNING (Status $($frontend.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Frontend Server: NOT RUNNING" -ForegroundColor Red
    $allPassed = $false
}

# Test 3: User Registration
Write-Host "`n[3/8] Testing User Registration..." -ForegroundColor Yellow
try {
    $registerData = @{
        firstName = 'Test'
        lastName = 'User'
        email = "test$(Get-Random)@example.com"
        password = 'Test123!'
        phone = '1234567890'
    } | ConvertTo-Json
    $regResult = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method POST -Body $registerData -ContentType 'application/json' -ErrorAction Stop
    Write-Host "      ✅ Registration: WORKING" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Registration: FAILED - $($_.Exception.Message)" -ForegroundColor Red
    $allPassed = $false
}

# Test 4: User Login
Write-Host "`n[4/8] Testing User Login..." -ForegroundColor Yellow
try {
    $loginData = @{
        email = 'admin@nova9.com'
        password = 'Admin123!'
    } | ConvertTo-Json
    $loginResult = Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/login' -Method POST -Body $loginData -ContentType 'application/json' -ErrorAction Stop
    $token = $loginResult.token
    Write-Host "      ✅ Login: WORKING (User: $($loginResult.user.firstName) $($loginResult.user.lastName))" -ForegroundColor Green
} catch {
    Write-Host "      ❌ Login: FAILED" -ForegroundColor Red
    $allPassed = $false
}

# Test 5: Admin Customers API
Write-Host "`n[5/8] Testing Admin Customers API..." -ForegroundColor Yellow
try {
    $customers = Invoke-RestMethod -Uri 'http://localhost:5000/api/admin/customers' -Headers @{Authorization="Bearer $token"} -ErrorAction Stop
    Write-Host "      ✅ GET /admin/customers: WORKING ($($customers.count) customers)" -ForegroundColor Green
    $customerCount = $customers.count
} catch {
    Write-Host "      ❌ Admin Customers API: FAILED" -ForegroundColor Red
    $allPassed = $false
}

# Test 6: Admin Stats API
Write-Host "`n[6/8] Testing Admin Stats API..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri 'http://localhost:5000/api/admin/stats' -Headers @{Authorization="Bearer $token"} -ErrorAction Stop
    Write-Host "      ✅ GET /admin/stats: WORKING" -ForegroundColor Green
    Write-Host "         - Total Customers: $($stats.stats.totalCustomers)" -ForegroundColor Gray
    Write-Host "         - Total Orders: $($stats.stats.totalOrders)" -ForegroundColor Gray
    Write-Host "         - Total Revenue: `$$($stats.stats.totalRevenue)" -ForegroundColor Gray
} catch {
    Write-Host "      ❌ Admin Stats API: FAILED" -ForegroundColor Red
    $allPassed = $false
}

# Test 7: Database Integrity
Write-Host "`n[7/8] Testing Database Integrity..." -ForegroundColor Yellow
try {
    $dbPath = "C:\shopping-mall-website\backend\nova9_mall.db"
    if (Test-Path $dbPath) {
        $dbSize = (Get-Item $dbPath).Length
        Write-Host "      ✅ Database File: EXISTS ($('{0:N0}' -f $dbSize) bytes)" -ForegroundColor Green
        
        # Check if all customers have loyalty points
        $customersWithLoyalty = ($customers.customers | Where-Object { $_.total_points -ne $null }).Count
        if ($customersWithLoyalty -eq $customerCount) {
            Write-Host "      ✅ Loyalty Points: ALL INITIALIZED ($customersWithLoyalty/$customerCount)" -ForegroundColor Green
        } else {
            Write-Host "      ⚠️  Loyalty Points: SOME MISSING ($customersWithLoyalty/$customerCount)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "      ❌ Database File: NOT FOUND" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "      ❌ Database Check: FAILED" -ForegroundColor Red
    $allPassed = $false
}

# Test 8: Critical Files
Write-Host "`n[8/8] Testing Critical Files..." -ForegroundColor Yellow
$files = @(
    "index.html",
    "script.js", 
    "auth.js",
    "styles.css",
    "backend\server.js",
    "backend\package.json",
    "backend\.env",
    "backend\nova9_mall.db"
)
$missingFiles = @()
foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}
if ($missingFiles.Count -eq 0) {
    Write-Host "      ✅ All Critical Files: PRESENT ($($files.Count)/$($files.Count))" -ForegroundColor Green
} else {
    Write-Host "      ❌ Missing Files: $($missingFiles -join ', ')" -ForegroundColor Red
    $allPassed = $false
}

# Final Report
Write-Host "`n========================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "   ✅ ALL TESTS PASSED - READY FOR GITHUB!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  SOME TESTS FAILED - CHECK ABOVE" -ForegroundColor Yellow
}
Write-Host "========================================`n" -ForegroundColor Cyan
