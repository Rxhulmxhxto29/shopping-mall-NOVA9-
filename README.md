# 🛍️ NOVA9 Shopping Mall# 🛍️ NOVA9 - A New Universe of Style



A fully interactive shopping mall website with complete admin dashboard and backend integration.A fully interactive, modern, and aesthetically pleasing frontend website for a luxury shopping mall, designed to provide an exceptional customer experience.



![NOVA9 Shopping Mall](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)## ✨ Features

![License](https://img.shields.io/badge/License-MIT-blue)

### 🏠 Home Page

## ✨ Features- **Stunning Hero Section**: Video background with elegant overlay and call-to-action buttons

- **Live Statistics**: Dynamic cards showing mall metrics (200+ stores, 50+ dining options, etc.)

### Frontend Features- **Smooth Animations**: Eye-catching entrance animations and transitions

- **🎨 Modern UI/UX**: Beautiful light blue theme with smooth animations- **Responsive Navigation**: Sticky header with mobile hamburger menu

- **🛒 Shopping Cart**: Full shopping cart functionality with real-time updates

- **💬 Live Chat**: Interactive chatbot for customer support### 🏬 Shop Directory

- **🎫 9 Feature Modals**:- **Interactive Store Grid**: 200+ premium brand listings with images and details

  - Events & Workshops- **Advanced Filtering**: Filter by categories (Fashion, Electronics, Beauty, Food, Entertainment, Lifestyle)

  - Restaurant Reservations- **Real-time Search**: Instant search across store names and categories

  - Lost & Found- **Store Details**: Floor locations, categories, and quick actions

  - Personal Shopper- **Favorite Stores**: Save your preferred stores to your profile

  - Gift Cards- **Get Directions**: Navigate to any store within the mall

  - Loyalty Program

  - Parking Information### 🎁 Offers & Events

  - Cinema Bookings- **Featured Deals**: Highlighted promotional offers with countdown timers

  - Customer Feedback- **Event Calendar**: Upcoming mall events with RSVP functionality

- **👤 User Authentication**: Login/Register with tab switching- **Validity Tracking**: Clear display of offer expiration dates

- **📊 User Profile**: View and edit profile information- **Visual Cards**: Attractive card-based layout with images and badges

- **🎯 Responsive Design**: Works on all devices

### 🎯 Customer Identity Features

### Admin Dashboard Features- **User Authentication**: 

- **📈 Statistics Overview**: Total customers, orders, revenue, events & reservations  - Sign Up / Sign In modal system

- **👥 Customer Management**:  - Social login options (Google, Facebook)

  - View all customers with detailed information  - Password validation and security

  - **Editable table** - Click any cell to edit (name, email, phone, loyalty points)  

  - Search by name or email- **Customer Profile**:

  - Filter by loyalty tier (Bronze, Silver, Gold, Platinum)  - Personal information management

  - Sort by 7 different criteria  - Favorite stores collection

  - Add new customers manually  - Active offers tracking

  - Delete customers with confirmation  - Event RSVPs

  - Export customer data to CSV  - Loyalty points system

- **📊 Reports Section**:  - Shopping preferences

  - Sales reports (daily, weekly, monthly, yearly, custom)

  - Analytics overview- **Personalization**:

  - Top customers by spending  - Save favorite stores

  - Growth metrics  - Get personalized recommendations

  - Track your activity statistics

### Backend Features  - Manage notification preferences

- **🔐 JWT Authentication**: Secure token-based authentication

- **🗄️ SQLite Database**: Lightweight, file-based database### 🏢 Mall Facilities

- **📡 RESTful API**: Complete REST API with all CRUD operations- **Comprehensive Amenities**:

- **🔒 Password Hashing**: Bcrypt for secure password storage  - Valet Parking (1000+ spaces with EV charging)

  - Food Court (50+ dining options)

## 🚀 Tech Stack  - Kids Zone (supervised play area)

  - IMAX Cinema (4DX screens)

**Frontend**: HTML5, CSS3, Vanilla JavaScript    - Free WiFi throughout

**Backend**: Node.js, Express.js, SQLite (sql.js), JWT, bcryptjs  - Accessibility features

  - Concierge service

## 📋 Prerequisites  - 24/7 Security



- Node.js (v14 or higher)### 📸 Gallery & Virtual Tour

- Python 3.x (for running local server)- **Photo Gallery**: High-quality images of mall interiors and attractions

- **Lightbox Viewer**: Full-screen image viewing experience

## 🛠️ Installation- **Virtual Tour**: 360° mall exploration (placeholder for future integration)

- **Category Tabs**: Switch between photos and virtual tour

### 1. Clone the Repository

```bash### 📞 Contact & Feedback

git clone https://github.com/Rxhulmxhxto29/shopping-mall-NOVA9-.git- **Contact Form**: Easy-to-use form with validation

cd shopping-mall-NOVA9-- **Mall Information**: Address, phone, email, and hours

```- **Google Maps Integration**: Interactive map showing mall location

- **Social Media Links**: Connect on all major platforms

### 2. Install Backend Dependencies- **Newsletter Signup**: Subscribe for exclusive offers

```bash

cd backend## 🎨 Design Features

npm install

```### Color Palette

- **Primary Gold**: #c9a55a (Luxury accent color)

### 3. Configure Environment Variables- **Dark Navy**: #1a1a2e (Premium dark theme)

Create a `.env` file in the `backend` directory:- **Light Cream**: #f8f5f0 (Soft background)

```env- **Gradients**: Elegant gold and dark gradients throughout

PORT=5000

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production### Typography

DB_PATH=./nova9_mall.db- **Headings**: Playfair Display (Elegant serif font)

```- **Body**: Poppins (Modern sans-serif font)



## 🎯 Running the Application### UI/UX Elements

- **Smooth Transitions**: 0.3s ease transitions on all interactive elements

### Start Backend Server- **Hover Effects**: Transform and shadow effects for depth

```bash- **Responsive Design**: Fully optimized for desktop, tablet, and mobile

cd backend- **Scroll Animations**: Fade-in effects as content enters viewport

node server.js- **Custom Scrollbar**: Branded scrollbar with gold accent

```- **Modal System**: Elegant overlays for auth and profile

Backend runs on: `http://localhost:5000`

## 🚀 Technologies Used

### Start Frontend Server (New Terminal)

```bash- **HTML5**: Semantic markup and accessibility

python -m http.server 8080- **CSS3**: 

```  - CSS Grid & Flexbox for layouts

Frontend runs on: `http://localhost:8080`  - Custom properties (CSS variables)

  - Animations and transitions

### Access the Application  - Media queries for responsiveness

1. Open browser: `http://localhost:8080`  

2. Click **"Admin Dashboard"** button- **JavaScript**: 

3. **Sign Up** to create an account or **Login**  - Vanilla JS (no frameworks required)

  - DOM manipulation

## 🔌 API Endpoints  - Event handling

  - Intersection Observer API

### Authentication  - Form validation

- `POST /api/auth/register` - Register new user

- `POST /api/auth/login` - User login- **Font Awesome**: Icon library for UI elements

- **Google Fonts**: Premium typography (Playfair Display, Poppins)

### User Profile

- `GET /api/user/profile` - Get user profile## 📱 Responsive Breakpoints

- `PUT /api/user/profile` - Update user profile

- **Desktop**: 1200px and above

### Admin (Protected)- **Laptop**: 968px - 1199px

- `GET /api/admin/customers` - Get all customers- **Tablet**: 768px - 967px

- `GET /api/admin/stats` - Get dashboard statistics- **Mobile**: Below 768px

- `PUT /api/admin/update-customer/:userId` - Update customer details

- `PUT /api/admin/update-points/:userId` - Update loyalty points## 🎯 Customer-Focused Features

- `DELETE /api/admin/delete-customer/:userId` - Delete customer

- `GET /api/admin/report?from=&to=` - Generate sales report### Account Management

- `GET /api/admin/analytics` - Get analytics data1. **Sign Up**: Create account with email or social login

2. **Sign In**: Secure authentication with remember me option

### Orders, Events, Reservations, Loyalty3. **Profile**: Manage personal information and preferences

- Full CRUD operations for all features4. **Favorites**: Save and organize favorite stores

5. **Offers**: Track active promotions and discounts

## 🎨 Admin Dashboard Usage6. **Events**: RSVP to mall events and activities

7. **Loyalty**: Earn and track loyalty points

### Customer Management

1. **View Customers**: All customers in a table### Shopping Experience

2. **Edit Inline**: Click any cell to edit- **Store Locator**: Find stores by name or category

3. **Search**: Filter by name/email- **Floor Maps**: Visual representation of store locations

4. **Filter**: Select loyalty tier- **Directions**: Get directions to specific stores

5. **Sort**: Choose sorting criteria- **Wish Lists**: Save favorite stores for quick access

6. **Add Customer**: Click "Add Customer" button- **Notifications**: Get alerts for new offers and events

7. **Delete**: Click delete icon

8. **Export**: Download as CSV### Engagement Features

- **Newsletter**: Subscribe for exclusive updates

### Reports- **Feedback**: Submit reviews and suggestions

1. Switch to "Reports" tab- **Social Media**: Follow mall on all platforms

2. Select report type- **Events**: RSVP for fashion shows, carnivals, and more

3. Choose date range (for custom)

4. Click "Generate Report"## 📂 File Structure



## 🧪 Testing```

shopping-mall-website/

Run the test suite (Windows PowerShell):│

```powershell├── index.html          # Main HTML file

.\test_all.ps1├── styles.css          # Complete CSS styling

```├── script.js           # JavaScript functionality

└── README.md          # Documentation

## 🔒 Security Features```



- JWT token authentication (7-day expiry)## 🌟 Key Highlights

- Password hashing with bcrypt

- Protected admin routes1. **Fully Interactive**: Every element is clickable and provides feedback

- SQL injection prevention2. **Modern Aesthetic**: Luxury gold and dark theme with elegant animations

- CORS configuration3. **Customer-Centric**: Built specifically for customer needs and journey

4. **Performance Optimized**: Lazy loading, debouncing, and efficient code

## 🎯 Loyalty Tiers5. **Accessible**: Semantic HTML and ARIA labels for screen readers

6. **SEO Friendly**: Proper heading hierarchy and meta tags

- **Bronze**: 0-999 points7. **Cross-Browser Compatible**: Works on all modern browsers

- **Silver**: 1000-4999 points

- **Gold**: 5000-9999 points## 🎨 Customization

- **Platinum**: 10000+ points

### Colors

## 📁 Project StructureUpdate CSS variables in `styles.css`:

```css

```:root {

shopping-mall-NOVA9-/    --primary-gold: #c9a55a;

├── index.html              # Main HTML with admin dashboard    --primary-dark: #1a1a2e;

├── script.js               # Frontend JavaScript (2500+ lines)    --primary-light: #f8f5f0;

├── auth.js                 # Authentication client    /* ... more colors */

├── styles.css              # Stylesheet (4100+ lines)}

├── backend/```

│   ├── server.js           # Express server

│   ├── package.json        # Dependencies### Content

│   ├── nova9_mall.db       # SQLite database- Edit store listings in the HTML

│   ├── config/- Update images by changing `src` attributes

│   │   └── database.js     # DB configuration- Modify text content directly in HTML

│   └── routes/- Add/remove sections as needed

│       ├── auth.js

│       ├── user.js### Functionality

│       ├── orders.js- Customize JavaScript behaviors in `script.js`

│       ├── events.js- Add API integrations for real data

│       ├── reservations.js- Connect to backend services

│       ├── loyalty.js- Implement payment gateways

│       └── admin.js

└── README.md## 🔧 Future Enhancements

```

- [ ] Backend API integration

## 🐛 Known Issues- [ ] Real-time inventory updates

- [ ] Online shopping cart

None! All features tested and working ✅- [ ] Payment processing

- [ ] Push notifications

## 📝 License- [ ] Mobile app version

- [ ] AR/VR virtual tour

MIT License- [ ] AI-powered recommendations

- [ ] Multi-language support

## 👨‍💻 Author- [ ] Dark mode toggle



Rahul Mahato - [@Rxhulmxhxto29](https://github.com/Rxhulmxhxto29)## 📄 Browser Support



---- ✅ Chrome (latest)

- ✅ Firefox (latest)

Made with ❤️ for NOVA9 Shopping Mall- ✅ Safari (latest)

- ✅ Edge (latest)
- ✅ Opera (latest)

## 📝 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Developer Notes

- All images are placeholders from Unsplash
- Video is from Mixkit (free stock footage)
- Forms are client-side only (add backend for production)
- No dependencies required (pure HTML/CSS/JS)
- Optimized for performance and accessibility

## 🎉 Credits

- **Design**: Luxury shopping mall aesthetic
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Playfair Display, Poppins)
- **Images**: Unsplash (placeholder images)
- **Video**: Mixkit (free stock video)

---

**NOVA9** - A New Universe of Style ✨

For support or inquiries, contact: info@nova9.com
