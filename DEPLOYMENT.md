# 🚀 NOVA9 Shopping Mall - Deployment Guide

## ✅ Pre-Deployment Checklist

All systems tested and verified:
- ✅ Backend Server: RUNNING
- ✅ Frontend Server: RUNNING  
- ✅ User Registration: WORKING
- ✅ User Login: WORKING
- ✅ Admin API Endpoints: WORKING
- ✅ Database Integrity: VERIFIED
- ✅ All Critical Files: PRESENT
- ✅ Loyalty Points: INITIALIZED

## 📦 What's Included

### Frontend Files
- `index.html` - Main page with embedded admin dashboard (2500+ lines)
- `script.js` - All frontend JavaScript logic (2500+ lines)
- `auth.js` - Authentication API client
- `styles.css` - Complete styling (4100+ lines)

### Backend Files
- `backend/server.js` - Express server
- `backend/config/database.js` - SQLite database configuration
- `backend/routes/` - 7 route files (auth, user, orders, events, reservations, loyalty, admin)
- `backend/middleware/auth.js` - JWT authentication middleware
- `backend/nova9_mall.db` - SQLite database with 10 tables

### Configuration
- `backend/package.json` - Node.js dependencies
- `backend/.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

## 🔧 Local Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Rxhulmxhxto29/shopping-mall-NOVA9-.git
cd shopping-mall-NOVA9-
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
DB_PATH=./nova9_mall.db
```

### 3. Start Backend
```bash
node server.js
```
✅ Backend running on: `http://localhost:5000`

### 4. Start Frontend (New Terminal)
```bash
# From project root
python -m http.server 8080
```
✅ Frontend running on: `http://localhost:8080`

## 🌐 Production Deployment

### Option 1: Deploy to Heroku (Backend)

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
cd backend
heroku create nova9-shopping-mall-api
```

4. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
heroku config:set DB_PATH=./nova9_mall.db
```

5. **Add Procfile**
Create `backend/Procfile`:
```
web: node server.js
```

6. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 2: Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Create vercel.json** in project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

3. **Update API URLs**
In `auth.js` and `script.js`, replace:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```
with:
```javascript
const API_BASE_URL = 'https://your-heroku-app.herokuapp.com/api';
```

4. **Deploy**
```bash
vercel
```

### Option 3: Deploy to AWS

#### Backend (EC2)
1. Launch EC2 instance (Ubuntu)
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
3. Clone and setup:
```bash
git clone https://github.com/Rxhulmxhxto29/shopping-mall-NOVA9-.git
cd shopping-mall-NOVA9-/backend
npm install
```
4. Install PM2:
```bash
sudo npm install -g pm2
pm2 start server.js --name nova9-api
pm2 startup
pm2 save
```

#### Frontend (S3 + CloudFront)
1. Create S3 bucket
2. Enable static website hosting
3. Upload: `index.html`, `script.js`, `auth.js`, `styles.css`
4. Set bucket policy for public access
5. Create CloudFront distribution

### Option 4: DigitalOcean Droplet

1. **Create Droplet** (Ubuntu 22.04)

2. **SSH into Droplet**
```bash
ssh root@your-droplet-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install Git & Clone**
```bash
apt-get install git
git clone https://github.com/Rxhulmxhxto29/shopping-mall-NOVA9-.git
cd shopping-mall-NOVA9-
```

5. **Setup Backend**
```bash
cd backend
npm install
```

6. **Install Nginx**
```bash
apt-get install nginx
```

7. **Configure Nginx** (`/etc/nginx/sites-available/nova9`)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /root/shopping-mall-NOVA9-;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Enable Site**
```bash
ln -s /etc/nginx/sites-available/nova9 /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

9. **Run Backend with PM2**
```bash
npm install -g pm2
cd /root/shopping-mall-NOVA9-/backend
pm2 start server.js --name nova9-api
pm2 startup
pm2 save
```

10. **SSL with Let's Encrypt**
```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## 🔒 Security Checklist (Production)

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set secure CORS origins (remove `*`)
- [ ] Add rate limiting
- [ ] Enable helmet.js for security headers
- [ ] Use environment variables for all secrets
- [ ] Set up database backups
- [ ] Add logging (Winston/Morgan)
- [ ] Enable CSP (Content Security Policy)
- [ ] Add input sanitization

### Quick Security Updates

1. **Add Helmet.js** (backend)
```bash
npm install helmet
```

In `server.js`:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

2. **Add Rate Limiting**
```bash
npm install express-rate-limit
```

In `server.js`:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

## 📊 Monitoring & Maintenance

### Health Check Endpoint
✅ Already included: `GET /api/health`

### Database Backup
```bash
# Backup
cp backend/nova9_mall.db backend/backups/nova9_mall_$(date +%Y%m%d).db

# Automated daily backup (cron)
0 2 * * * cd /path/to/backend && cp nova9_mall.db backups/nova9_mall_$(date +\%Y\%m\%d).db
```

### Logs
```bash
# View PM2 logs
pm2 logs nova9-api

# View last 100 lines
pm2 logs nova9-api --lines 100
```

## 🧪 Testing After Deployment

1. **Test Backend Health**
```bash
curl https://your-domain.com/api/health
```

2. **Test Registration**
```bash
curl -X POST https://your-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com","password":"Test123!","phone":"1234567890"}'
```

3. **Test Login**
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

## 📱 Features to Update for Production

### Update API URLs
In `auth.js` and `script.js`, replace all instances of:
```javascript
'http://localhost:5000/api'
```
with:
```javascript
'https://your-production-domain.com/api'
```

### Update CORS Origins
In `backend/server.js`:
```javascript
const allowedOrigins = [
  'https://your-frontend-domain.com',
  'https://www.your-frontend-domain.com'
];
```

## 🎉 Post-Deployment

1. ✅ Create first admin account
2. ✅ Test all 9 feature modals
3. ✅ Test admin dashboard (add/edit/delete customers)
4. ✅ Test reports generation
5. ✅ Verify loyalty points calculation
6. ✅ Test CSV export
7. ✅ Monitor error logs for 24 hours

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review logs: `pm2 logs nova9-api`

---

**Repository**: https://github.com/Rxhulmxhxto29/shopping-mall-NOVA9-

Made with ❤️ by Rahul Mahato
