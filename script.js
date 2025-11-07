// =============================================
// NAVIGATION
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// AUTHENTICATION MODALS
// =============================================
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// Open login modal
if (loginBtn && authModal) {
    loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeModal && authModal) {
    closeModal.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Switch between login and signup
if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Call backend login function from auth.js
        await handleLogin(email, password);
    });
}

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Call backend register function from auth.js
        const formData = {
            firstName,
            lastName,
            email,
            phone,
            password
        };
        
        await handleRegister(formData);
        
        // Show success message
        showNotification('Account created successfully! Welcome to NOVA9.', 'success');
        
        // Close modal
        if (authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Update UI
        if (loginBtn) {
            loginBtn.textContent = 'My Account';
        }
    });
}

// =============================================
// PROFILE MODAL
// =============================================
const profileModal = document.getElementById('profileModal');
const profileBtn = document.getElementById('profileBtn');
const closeProfileModal = document.getElementById('closeProfileModal');

// Open profile modal
profileBtn.addEventListener('click', openProfileModal);

function openProfileModal() {
    profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close profile modal
closeProfileModal.addEventListener('click', () => {
    profileModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle profile form submission
document.querySelector('.profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Profile updated successfully!', 'success');
});

// =============================================
// SHOP DIRECTORY
// =============================================
const shopSearch = document.getElementById('shopSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const shopCards = document.querySelectorAll('.shop-card');

// Filter shops by category
if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter shop cards
            shopCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search shops
if (shopSearch) {
    shopSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        shopCards.forEach(card => {
            const shopName = card.querySelector('h3')?.textContent.toLowerCase();
            const shopCategory = card.querySelector('.shop-category')?.textContent.toLowerCase();
            
            if (shopName?.includes(searchTerm) || shopCategory?.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Add to favorites
document.querySelectorAll('.shop-card .btn-icon-small:first-child').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('fas')) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Removed from favorites', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Added to favorites!', 'success');
        }
    });
});

// Get directions
document.querySelectorAll('.shop-card .btn-icon-small:last-child').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const shopName = btn.closest('.shop-card').querySelector('h3').textContent;
        showNotification(`Getting directions to ${shopName}...`, 'info');
    });
});

// =============================================
// OFFERS & EVENTS
// =============================================
// Handle offer button clicks
document.querySelectorAll('.offer-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        const offerTitle = btn.closest('.offer-card').querySelector('h3').textContent;
        showNotification(`Offer "${offerTitle}" activated! Check your account.`, 'success');
    });
});

// Handle RSVP buttons
document.querySelectorAll('.event-card .btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
        const eventTitle = btn.closest('.event-card').querySelector('h4').textContent;
        
        if (btn.textContent === 'RSVP') {
            btn.textContent = 'Registered';
            btn.style.background = '#4CAF50';
            showNotification(`You're registered for ${eventTitle}!`, 'success');
        } else {
            btn.textContent = 'RSVP';
            btn.style.background = '';
            showNotification('Registration cancelled', 'info');
        }
    });
});

// =============================================
// GALLERY
// =============================================
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryPhotos = document.getElementById('photosTab');
const galleryVirtual = document.getElementById('virtualTab');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update active tab
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        if (tabName === 'photos') {
            galleryPhotos.classList.add('active');
            galleryVirtual.classList.remove('active');
        } else {
            galleryVirtual.classList.add('active');
            galleryPhotos.classList.remove('active');
        }
    });
});

// Gallery image lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h4').textContent;
        
        // Create lightbox (simplified version)
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
                <img src="${imgSrc}" alt="${title}">
                <h3>${title}</h3>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('.lightbox-close')) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
});

// Virtual tour button
const virtualTourBtn = document.querySelector('.virtual-placeholder .btn-primary-large');
if (virtualTourBtn) {
    virtualTourBtn.addEventListener('click', () => {
        showNotification('Virtual tour feature coming soon!', 'info');
    });
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };
        
        // Simulate form submission
        console.log('Contact form submitted:', formData);
        
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// =============================================
// NEWSLETTER SIGNUP
// =============================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        if (email) {
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterForm.querySelector('input').value = '';
        }
    });
}

// =============================================
// NOTIFICATIONS
// =============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification i:first-child {
                font-size: 1.5rem;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-success i:first-child {
                color: #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-error i:first-child {
                color: #f44336;
            }
            
            .notification-info {
                border-left: 4px solid #2196F3;
            }
            
            .notification-info i:first-child {
                color: #2196F3;
            }
            
            .notification-warning {
                border-left: 4px solid #ff9800;
            }
            
            .notification-warning i:first-child {
                color: #ff9800;
            }
            
            .notification span {
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #666;
                font-size: 1rem;
                padding: 0.25rem;
                transition: color 0.2s;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 80vh;
                border-radius: 10px;
            }
            
            .lightbox-content h3 {
                color: white;
                margin-top: 1rem;
                font-size: 1.5rem;
            }
            
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 80px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.shop-card, .offer-card, .facility-card, .event-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// =============================================
// SEARCH FUNCTIONALITY
// =============================================
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    // Scroll to shops section and focus search
    document.getElementById('shops').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        shopSearch.focus();
    }, 500);
});

// =============================================
// HERO BUTTONS
// =============================================
document.querySelector('.hero-buttons .btn-primary-large').addEventListener('click', () => {
    document.getElementById('shops').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.hero-buttons .btn-secondary-large').addEventListener('click', () => {
    document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
});

// =============================================
// INITIALIZE
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Log welcome message
    console.log('%c Welcome to NOVA9! ', 'background: linear-gradient(135deg, #c9a55a 0%, #d4af37 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('Developed with ❤️ for the best shopping experience');
});

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
shopSearch.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    shopCards.forEach(card => {
        const shopName = card.querySelector('h3').textContent.toLowerCase();
        const shopCategory = card.querySelector('.shop-category').textContent.toLowerCase();
        
        if (shopName.includes(searchTerm) || shopCategory.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}, 300));

// =============================================
// AI CHATBOT
// =============================================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const quickBtns = document.querySelectorAll('.quick-btn');

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
}

if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

function addBotMessage(message) {
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatSend && chatInput && chatbotMessages) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.style.textAlign = 'right';
            userDiv.innerHTML = `
                <div class="message-content" style="background: #3b82f6; color: white; margin-left: auto;">
                    <p>${message}</p>
                </div>
            `;
            chatbotMessages.appendChild(userDiv);
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "I can help you find that! Let me search our directory...",
                    "Great question! Here's what I found for you...",
                    "Sure! I'd be happy to assist with that.",
                    "Let me check our latest offers for you! 🎁"
                ];
                addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
}

if (quickBtns.length > 0) {
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            let response = '';
            
            switch(action) {
                case 'stores':
                    response = '🏪 We have 200+ stores! Use our search to find specific brands or browse by category.';
                    break;
                case 'parking':
                    response = '🅿️ Check the Live Parking widget on the right! Level 3 currently has the most spaces available.';
                    break;
                case 'deals':
                    response = '🔥 Today\'s hot deals: 50% off at Fashion Hub, Buy 2 Get 1 at TechZone, and more! Check the ticker below.';
                    break;
                case 'events':
                    response = '🎉 Upcoming: Fashion Show (Nov 15), Kids Carnival (Nov 20), and Holiday Market (Dec 1-24)!';
                    break;
            }
            
            if (response) {
                addBotMessage(response);
            }
        });
    });
}

// =============================================
// FLOATING ACTION BUTTON MENU
// =============================================
const fabMain = document.getElementById('fabMain');
const fabMenu = document.getElementById('fabMenu');
const fabOptions = document.querySelectorAll('.fab-option');

if (fabMain && fabMenu) {
    fabMain.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
    });
}

if (fabOptions.length > 0) {
    fabOptions.forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            
            switch(action) {
                case 'map':
                    showNotification('🗺️ Interactive map coming soon!', 'info');
                    break;
                case 'ar':
                    showNotification('🥽 AR Preview feature launching next month!', 'info');
                    break;
                case 'wishlist':
                    showNotification('❤️ Wishlist feature - Save your favorite stores!', 'success');
                    break;
                case 'rewards':
                    showNotification('🎁 You have 2,450 loyalty points!', 'success');
                    break;
            }
            
            if (fabMenu) fabMenu.classList.remove('active');
        });
    });
}

// =============================================
// PARKING WIDGET - Live Update Simulation
// =============================================
const parkingToggle = document.getElementById('parkingToggle');
const parkingWidget = document.getElementById('parkingWidget');
const parkingClose = document.getElementById('parkingClose');

if (parkingToggle && parkingWidget) {
    parkingToggle.addEventListener('click', () => {
        parkingWidget.classList.toggle('active');
        parkingToggle.style.display = parkingWidget.classList.contains('active') ? 'none' : 'flex';
    });
}

if (parkingClose && parkingWidget && parkingToggle) {
    parkingClose.addEventListener('click', () => {
        parkingWidget.classList.remove('active');
        parkingToggle.style.display = 'flex';
    });
}

function updateParkingSpots() {
    const parkingLevels = document.querySelectorAll('.parking-level');
    
    parkingLevels.forEach(level => {
        const spots = parseInt(level.querySelector('.parking-spots').textContent);
        const variation = Math.floor(Math.random() * 10) - 5; // Random change
        const newSpots = Math.max(0, Math.min(100, spots + variation));
        
        level.querySelector('.parking-spots').textContent = `${newSpots} spots`;
        
        const fillBar = level.querySelector('.parking-fill');
        const percentage = 100 - newSpots;
        fillBar.style.width = `${percentage}%`;
        
        // Update color based on availability
        if (percentage < 50) {
            fillBar.classList.add('green');
        } else {
            fillBar.classList.remove('green');
        }
    });
}

// Update parking every 10 seconds
setInterval(updateParkingSpots, 10000);

// =============================================
// SHOPPING CART & BILLING SYSTEM
// =============================================
let cart = [];
let currentStep = 1;

// Cart Elements
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartFooter = document.getElementById('cartFooter');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

// Billing Elements
const billingModal = document.getElementById('billingModal');
const billingModalClose = document.getElementById('billingModalClose');
const billingOverlay = document.getElementById('billingOverlay');
const billingForm = document.getElementById('billingForm');
const paymentOptions = document.querySelectorAll('.payment-option');
const cardPayment = document.getElementById('cardPayment');

// Add to Cart functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const shopCard = e.target.closest('.shop-card');
        const name = shopCard.dataset.name;
        const price = parseFloat(shopCard.dataset.price);
        const image = shopCard.querySelector('img').src;
        
        addToCart(name, price, image);
    }
});

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    showNotification('Item removed from cart');
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

// Make functions globally accessible
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

function updateCart() {
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    
    // Show empty state or cart items
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.innerHTML = '';
        cartFooter.style.display = 'none';
        checkoutBtn.disabled = true;
    } else {
        emptyCart.style.display = 'none';
        cartFooter.style.display = 'block';
        checkoutBtn.disabled = false;
        renderCartItems();
    }
    
    calculateTotals();
}

function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const discount = subtotal > 500 ? subtotal * 0.1 : 0; // 10% discount on orders over $500
    const total = subtotal + tax - discount;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    discountEl.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Open cart modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

// Close cart modal
cartModalClose.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Close billing modal
billingModalClose.addEventListener('click', () => {
    billingModal.classList.remove('active');
});

billingOverlay.addEventListener('click', () => {
    billingModal.classList.remove('active');
});

// Checkout process
checkoutBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
    billingModal.classList.add('active');
    currentStep = 1;
    updateBillingSteps();
});

// Payment method selection
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const method = option.dataset.method;
        if (method === 'card') {
            cardPayment.style.display = 'block';
        } else {
            cardPayment.style.display = 'none';
        }
    });
});

// Billing form navigation
function nextStep(targetStep) {
    if (targetStep) {
        // Direct navigation to specific step
        currentStep = targetStep;
        updateBillingSteps();
        return;
    }
    
    if (currentStep === 1) {
        // Validate billing information
        const form = billingForm;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    }
    
    if (currentStep === 2) {
        // Check if payment method is selected
        const selectedPayment = document.querySelector('.payment-option.active');
        if (!selectedPayment) {
            showNotification('Please select a payment method');
            return;
        }
        
        // Generate invoice
        generateInvoice();
    }
    
    currentStep++;
    if (currentStep <= 3) {
        updateBillingSteps();
    }
}

function prevStep(targetStep) {
    if (targetStep) {
        currentStep = targetStep;
    } else {
        currentStep--;
    }
    if (currentStep >= 1) {
        updateBillingSteps();
    }
}

// Make functions globally accessible
window.nextStep = nextStep;
window.prevStep = prevStep;

function updateBillingSteps() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
    
    // Show/hide step content
    for (let i = 1; i <= 3; i++) {
        const stepContent = document.getElementById(`step${i}`);
        if (stepContent) {
            if (i === currentStep) {
                stepContent.classList.add('active');
            } else {
                stepContent.classList.remove('active');
            }
        }
    }
}

function generateInvoice() {
    const invoiceNumber = 'INV-' + Date.now();
    const invoiceDate = new Date().toLocaleDateString();
    
    const name = document.getElementById('billName').value;
    const email = document.getElementById('billEmail').value;
    const phone = document.getElementById('billPhone').value;
    const country = document.getElementById('billCountry').value;
    const address = document.getElementById('billAddress').value;
    const city = document.getElementById('billCity').value;
    const zip = document.getElementById('billZip').value;
    
    const paymentMethod = document.querySelector('.payment-option.active').dataset.method.toUpperCase();
    
    document.getElementById('invoiceNumber').textContent = invoiceNumber;
    document.getElementById('invoiceDate').textContent = invoiceDate;
    document.getElementById('invoiceCustomerName').textContent = name;
    document.getElementById('invoiceCustomerEmail').textContent = email;
    document.getElementById('invoiceCustomerPhone').textContent = phone;
    document.getElementById('invoiceCustomerAddress').textContent = `${address}, ${city}, ${zip}, ${country}`;
    document.getElementById('invoicePaymentMethod').textContent = paymentMethod;
    
    // Invoice items
    const invoiceItemsEl = document.getElementById('invoiceItems');
    invoiceItemsEl.innerHTML = cart.map(item => `
        <div class="invoice-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Invoice totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const discount = subtotal > 500 ? subtotal * 0.1 : 0;
    const total = subtotal + tax - discount;
    
    document.getElementById('invoiceSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('invoiceTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('invoiceDiscount').textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
    document.getElementById('invoiceTotal').textContent = `$${total.toFixed(2)}`;
}

function placeOrder() {
    showNotification('Order placed successfully! Thank you for shopping at NOVA9! 🎉');
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Close modals
    setTimeout(() => {
        billingModal.classList.remove('active');
        currentStep = 1;
        billingForm.reset();
        paymentOptions.forEach(opt => opt.classList.remove('active'));
    }, 2000);
}

function downloadInvoice() {
    showNotification('Invoice download started...');
    // In a real application, you would generate a PDF here
    // For now, we'll just show a notification
}

// Make functions globally accessible
window.placeOrder = placeOrder;
window.downloadInvoice = downloadInvoice;

// Initialize
updateCart();
console.log('🛒 Shopping cart initialized');
console.log('Cart button:', cartBtn);
console.log('Cart modal:', cartModal);
console.log('Billing modal:', billingModal);

// =============================================
// NEW CUSTOMER FEATURES JAVASCRIPT
// =============================================

// Feature Hub Toggle
const featureHubToggle = document.querySelector('.feature-hub-toggle');
const featureHubPanel = document.querySelector('.feature-hub-panel');

console.log('Feature Hub Toggle:', featureHubToggle);
console.log('Feature Hub Panel:', featureHubPanel);

if (featureHubToggle && featureHubPanel) {
    featureHubToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Feature Hub button clicked!');
        const isActive = featureHubPanel.classList.toggle('active');
        console.log('Panel is now:', isActive ? 'OPEN ✅' : 'CLOSED ❌');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.feature-hub')) {
            if (featureHubPanel.classList.contains('active')) {
                featureHubPanel.classList.remove('active');
                console.log('Panel closed (clicked outside)');
            }
        }
    });
    
    console.log('✅ Feature Hub initialized successfully');
} else {
    console.error('❌ Feature Hub elements not found!');
}

// Feature Modal Open/Close Functions
const featureModals = {
    map: document.getElementById('mapModal'),
    rewards: document.getElementById('rewardsModal'),
    events: document.getElementById('eventsModal'),
    dining: document.getElementById('diningModal'),
    giftCard: document.getElementById('giftCardModal'),
    lostFound: document.getElementById('lostFoundModal'),
    accessibility: document.getElementById('accessibilityModal'),
    personalShopper: document.getElementById('personalShopperModal'),
    feedback: document.getElementById('feedbackModal')
};

function openFeatureModal(modalName) {
    const modal = featureModals[modalName];
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        featureHubPanel.classList.remove('active');
    }
}

function closeFeatureModal(modalName) {
    const modal = featureModals[modalName];
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking overlay or close button
Object.values(featureModals).forEach(modal => {
    if (modal) {
        // Close button (try both classes)
        const closeBtn = modal.querySelector('.close-modal, .modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Modal closed via close button');
            });
        }
        
        // Overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Modal closed via overlay click');
            }
        });
    }
});

// Feature Hub Button Handlers
const featureButtons = {
    'feature-btn-map': 'map',
    'feature-btn-events': 'events',
    'feature-btn-dining': 'dining',
    'feature-btn-giftcard': 'giftCard',
    'feature-btn-lostfound': 'lostFound',
    'feature-btn-accessibility': 'accessibility',
    'feature-btn-shopper': 'personalShopper',
    'feature-btn-feedback': 'feedback',
    'feature-btn-rewards': 'rewards'
};

Object.entries(featureButtons).forEach(([btnId, modalName]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openFeatureModal(modalName);
        });
    }
});

// Interactive Map - Floor Switching
const floorButtons = document.querySelectorAll('.floor-btn');
const mapFloors = document.querySelectorAll('.map-floor');

floorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const floor = btn.dataset.floor;
        
        // Update active button
        floorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active floor
        mapFloors.forEach(f => f.classList.remove('active'));
        const targetFloor = document.getElementById(`floor${floor}`);
        if (targetFloor) {
            targetFloor.classList.add('active');
        }
    });
});

// Rewards - Redeem Buttons
const redeemButtons = document.querySelectorAll('.btn-redeem');
redeemButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const points = btn.dataset.points;
        showNotification(`Reward redeemed for ${points} points!`);
    });
});

// Events - Book Buttons
const bookEventButtons = document.querySelectorAll('.btn-book-event');
bookEventButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const eventName = btn.closest('.event-card').querySelector('h4').textContent;
        showNotification(`Booking confirmed for ${eventName}!`);
    });
});

// Dining - Reserve Buttons
const reserveButtons = document.querySelectorAll('.btn-reserve');
reserveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const restaurant = btn.closest('.restaurant-card').querySelector('h4').textContent;
        showNotification(`Reservation request sent for ${restaurant}!`);
    });
});

// Gift Cards - Amount Selection
const amountButtons = document.querySelectorAll('.amount-btn');
amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Gift Cards - Design Selection
const cardDesigns = document.querySelectorAll('.card-design');
cardDesigns.forEach(design => {
    design.addEventListener('click', () => {
        cardDesigns.forEach(d => d.classList.remove('active'));
        design.classList.add('active');
    });
});

// Gift Card Purchase
const giftCardForm = document.querySelector('.gift-card-form');
if (giftCardForm) {
    giftCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.querySelector('.amount-btn.active')?.textContent || '$50';
        showNotification(`Gift card of ${amount} purchased successfully!`);
        giftCardForm.reset();
        amountButtons.forEach(b => b.classList.remove('active'));
        cardDesigns.forEach(d => d.classList.remove('active'));
    });
}

// Lost & Found - Tab Switching
const lfTabs = document.querySelectorAll('.lf-tab');
const lfContents = document.querySelectorAll('.lf-content');

lfTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // Update active tab
        lfTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        lfContents.forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(target);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Lost & Found - Report Form
const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Item report submitted successfully!');
        reportForm.reset();
    });
}

// Lost & Found - Claim Buttons
const claimButtons = document.querySelectorAll('.btn-claim');
claimButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const itemName = btn.closest('.found-item').querySelector('h4').textContent;
        showNotification(`Claim request submitted for ${itemName}!`);
    });
});

// Accessibility - Request Service Buttons
const requestServiceButtons = document.querySelectorAll('.btn-request-service');
requestServiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const service = btn.closest('.service-card').querySelector('h4').textContent;
        showNotification(`Request submitted for ${service}!`);
    });
});

// Personal Shopper - Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stylist = bookingForm.querySelector('select').value;
        showNotification(`Booking confirmed with ${stylist}!`);
        bookingForm.reset();
    });
}

// Customer Feedback - Star Rating
const ratingStars = document.querySelectorAll('.rating-stars i');
let selectedRating = 0;

ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = index + 1;
        ratingStars.forEach((s, i) => {
            if (i < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
    
    star.addEventListener('mouseenter', () => {
        ratingStars.forEach((s, i) => {
            if (i <= index) {
                s.style.color = '#fbbf24';
            } else {
                s.style.color = '#e2e8f0';
            }
        });
    });
    
    star.addEventListener('mouseleave', () => {
        ratingStars.forEach((s, i) => {
            if (i < selectedRating) {
                s.style.color = '#fbbf24';
            } else {
                s.style.color = '#e2e8f0';
            }
        });
    });
});

// Customer Feedback - Form Submission
const feedbackFormElement = document.getElementById('feedbackForm');
if (feedbackFormElement) {
    feedbackFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedRating === 0) {
            showNotification('Please select a rating!');
            return;
        }
        showNotification('Thank you for your feedback!');
        feedbackFormElement.reset();
        ratingStars.forEach(s => s.classList.remove('active'));
        selectedRating = 0;
    });
}

// Make modal functions globally accessible
window.openFeatureModal = openFeatureModal;
window.closeFeatureModal = closeFeatureModal;

console.log('✨ All customer features initialized');
console.log('Feature modals:', Object.keys(featureModals));

// =============================================
// PREVENT CONTEXT MENU (Optional - for production)
// =============================================
// Uncomment if you want to prevent right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

console.log('🛍️ Shopping mall website loaded successfully!');



// =============================================
// AUTH MODAL TAB SWITCHING
// =============================================
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and forms
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding form
        if (targetTab === 'login') {
            document.getElementById('loginForm').classList.add('active');
        } else if (targetTab === 'signup') {
            document.getElementById('signupForm').classList.add('active');
        }
    });
});

// Open auth modal function
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

// Close auth modal when clicking outside
document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

window.openAuthModal = openAuthModal;

console.log('?? Auth modal tabs initialized');


// =============================================
// AUTH MODAL TAB SWITCHING
// =============================================
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and forms
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding form
        if (targetTab === 'login') {
            document.getElementById('loginForm').classList.add('active');
        } else if (targetTab === 'signup') {
            document.getElementById('signupForm').classList.add('active');
        }
    });
});

// Open auth modal function
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

// Close auth modal when clicking outside
document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

window.openAuthModal = openAuthModal;

console.log('🔐 Auth modal tabs initialized');


// =============================================
// ADMIN DASHBOARD FUNCTIONS
// =============================================

function showAdminDashboard() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return;
    }
    
    // Hide ALL sections including hero, show only admin dashboard
    document.getElementById('admin-dashboard').style.display = 'block';
    document.querySelectorAll('.hero, .shops-section, .offers-section, .facilities-section, .gallery-section, .contact-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Scroll to admin dashboard
    document.getElementById('admin-dashboard').scrollIntoView({ behavior: 'smooth' });
    
    // Load admin data
    loadAdminStats();
    loadAdminCustomers();
}

function hideAdminDashboard() {
    document.getElementById('admin-dashboard').style.display = 'none';
    document.querySelectorAll('.hero, .shops-section, .offers-section, .facilities-section, .gallery-section, .contact-section').forEach(section => {
        section.style.display = 'block';
    });
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function loadAdminStats() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    try {
        const response = await fetch('http://localhost:5000/api/admin/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.success && data.stats) {
            document.getElementById('totalCustomers').textContent = data.stats.totalCustomers || 0;
            document.getElementById('totalOrders').textContent = data.stats.totalOrders || 0;
            document.getElementById('totalRevenue').textContent = `$${(data.stats.totalRevenue || 0).toFixed(2)}`;
            document.getElementById('totalEvents').textContent = data.stats.totalEvents || 0;
            document.getElementById('totalReservations').textContent = data.stats.totalReservations || 0;
        }
    } catch (error) {
        console.error('Error loading admin stats:', error);
    }
}

async function loadAdminCustomers() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    const loadingContainer = document.getElementById('adminLoadingContainer');
    const tableContainer = document.getElementById('adminTableContainer');
    const errorContainer = document.getElementById('adminErrorContainer');
    
    try {
        const response = await fetch('http://localhost:5000/api/admin/customers', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        loadingContainer.style.display = 'none';
        
        if (!data.success) {
            throw new Error(data.message || 'Failed to load customers');
        }
        
        const customers = data.customers || [];
        const tbody = document.getElementById('customersTableBody');
        tbody.innerHTML = '';
        
        if (customers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 50px; color: #999;">No customers found</td></tr>';
        } else {
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.style.borderBottom = '1px solid #eee';
                row.onmouseover = function() { this.style.background = '#f8f9fa'; };
                row.onmouseout = function() { this.style.background = 'white'; };
                
                const tierColors = {
                    'Bronze': 'background: #cd7f32; color: white;',
                    'Silver': 'background: #c0c0c0; color: #333;',
                    'Gold': 'background: #ffd700; color: #333;',
                    'Platinum': 'background: #e5e4e2; color: #333;'
                };
                const tierStyle = tierColors[customer.current_tier] || tierColors['Bronze'];
                const joinDate = new Date(customer.created_at).toLocaleDateString();
                
                row.innerHTML = `
                    <td style="padding: 15px;">${customer.user_id}</td>
                    <td style="padding: 15px;" contenteditable="true" data-field="name" data-user-id="${customer.user_id}">${customer.first_name || ''} ${customer.last_name || ''}</td>
                    <td style="padding: 15px;" contenteditable="true" data-field="email" data-user-id="${customer.user_id}">${customer.email}</td>
                    <td style="padding: 15px;" contenteditable="true" data-field="phone" data-user-id="${customer.user_id}">${customer.phone || 'N/A'}</td>
                    <td style="padding: 15px;">${joinDate}</td>
                    <td style="padding: 15px;">${customer.total_orders || 0}</td>
                    <td style="padding: 15px;">$${(customer.total_spent || 0).toFixed(2)}</td>
                    <td style="padding: 15px;"><span style="padding: 5px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; ${tierStyle}">${customer.current_tier || 'Bronze'}</span></td>
                    <td style="padding: 15px;" contenteditable="true" data-field="points" data-user-id="${customer.user_id}">${customer.total_points || 0}</td>
                    <td style="padding: 15px;"><button onclick="deleteCustomer(${customer.user_id}, '${(customer.first_name || '') + ' ' + (customer.last_name || '')}')" style="padding: 8px 15px; background: #ff4757; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">🗑️ Delete</button></td>
                `;
                
                // Add double-click to save functionality
                row.querySelectorAll('[contenteditable="true"]').forEach(cell => {
                    cell.addEventListener('blur', async function() {
                        await saveCustomerEdit(this);
                    });
                    cell.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.blur();
                        }
                    });
                    cell.style.cursor = 'text';
                    cell.style.background = '#f8f9fa';
                    cell.title = 'Click to edit, press Enter or click outside to save';
                });
                tbody.appendChild(row);
            });
        }
        
        tableContainer.style.display = 'block';
    } catch (error) {
        console.error('Error loading customers:', error);
        loadingContainer.style.display = 'none';
        errorContainer.innerHTML = `<div style="background: #ff4757; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">Error: ${error.message}</div>`;
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    hideAdminDashboard();
    updateUIForAuth();
    showNotification('Logged out successfully', 'success');
}

// Make functions globally available
window.showAdminDashboard = showAdminDashboard;
window.hideAdminDashboard = hideAdminDashboard;
window.logout = logout;

console.log('👨‍💼 Admin dashboard functions initialized');


// Add close button handlers for all feature modals
document.querySelectorAll('.modal .modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

console.log('✅ Feature modal close handlers added');


// Save customer edit to backend
async function saveCustomerEdit(cell) {
    const userId = cell.getAttribute('data-user-id');
    const field = cell.getAttribute('data-field');
    const newValue = cell.textContent.trim();
    
    if (!userId || !field) return;
    
    const token = localStorage.getItem('authToken');
    if (!token) {
        showNotification('Please login first', 'error');
        return;
    }
    
    try {
        let updateData = {};
        
        if (field === 'name') {
            const nameParts = newValue.split(' ');
            updateData.firstName = nameParts[0] || '';
            updateData.lastName = nameParts.slice(1).join(' ') || '';
        } else if (field === 'email') {
            updateData.email = newValue;
        } else if (field === 'phone') {
            updateData.phone = newValue === 'N/A' ? null : newValue;
        } else if (field === 'points') {
            // Update loyalty points
            const response = await fetch(`http://localhost:5000/api/admin/update-points/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ points: parseInt(newValue) || 0 })
            });
            
            const data = await response.json();
            if (data.success) {
                showNotification('Points updated successfully!', 'success');
                cell.style.background = '#d4edda';
                setTimeout(() => { cell.style.background = '#f8f9fa'; }, 1000);
            } else {
                showNotification(data.message || 'Update failed', 'error');
            }
            return;
        }
        
        // Update user profile for other fields
        const response = await fetch(`http://localhost:5000/api/admin/update-customer/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Customer updated successfully!', 'success');
            cell.style.background = '#d4edda';
            setTimeout(() => { cell.style.background = '#f8f9fa'; }, 1000);
        } else {
            showNotification(data.message || 'Update failed', 'error');
            cell.style.background = '#f8d7da';
            setTimeout(() => { cell.style.background = '#f8f9fa'; }, 1000);
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        showNotification('Network error. Please try again.', 'error');
        cell.style.background = '#f8d7da';
        setTimeout(() => { cell.style.background = '#f8f9fa'; }, 1000);
    }
}

window.saveCustomerEdit = saveCustomerEdit;

console.log('✅ Customer edit functionality added');


// =============================================
// CUSTOMER SEARCH AND FILTER FUNCTIONALITY
// =============================================

let allCustomersData = []; // Store all customer data

// Enhanced loadAdminCustomers to store data



function setupFilterListeners() {
    const searchInput = document.getElementById('customerSearch');
    const tierFilter = document.getElementById('tierFilter');
    const sortBy = document.getElementById('sortBy');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (tierFilter) {
        tierFilter.addEventListener('change', applyFilters);
    }
    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('customerSearch')?.value.toLowerCase() || '';
    const tierFilter = document.getElementById('tierFilter')?.value || '';
    const sortBy = document.getElementById('sortBy')?.value || 'date-desc';
    
    // Filter customers
    let filteredData = allCustomersData.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm) || 
                            customer.email.toLowerCase().includes(searchTerm);
        const matchesTier = !tierFilter || customer.tier === tierFilter;
        
        return matchesSearch && matchesTier;
    });
    
    // Sort customers
    filteredData.sort((a, b) => {
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.joinDate) - new Date(a.joinDate);
            case 'date-asc':
                return new Date(a.joinDate) - new Date(b.joinDate);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'orders-desc':
                return b.orders - a.orders;
            case 'spent-desc':
                return b.spent - a.spent;
            case 'points-desc':
                return b.points - a.points;
            default:
                return 0;
        }
    });
    
    // Update table display
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = '';
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 50px; color: #999;">No customers found matching your filters</td></tr>';
    } else {
        filteredData.forEach(customer => {
            tbody.appendChild(customer.row.cloneNode(true));
        });
        
        // Re-attach edit functionality
        tbody.querySelectorAll('[contenteditable="true"]').forEach(cell => {
            cell.addEventListener('blur', async function() {
                await saveCustomerEdit(this);
            });
            cell.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.blur();
                }
            });
        });
    }
    
    // Update count
    updateCustomerCount(filteredData.length);
}

function clearFilters() {
    document.getElementById('customerSearch').value = '';
    document.getElementById('tierFilter').value = '';
    document.getElementById('sortBy').value = 'date-desc';
    applyFilters();
}

function updateCustomerCount(count) {
    const totalCustomers = document.getElementById('totalCustomers');
    if (totalCustomers) {
        const total = allCustomersData.length;
        totalCustomers.textContent = count === total ? total : `${count}/${total}`;
    }
}

// Export filter function
window.clearFilters = clearFilters;

console.log('✅ Customer search and filter functionality added');


// Export customer data to CSV
function exportToCSV() {
    const rows = document.querySelectorAll('#customersTableBody tr');
    if (rows.length === 0 || rows[0].cells.length === 1) {
        showNotification('No data to export', 'error');
        return;
    }
    
    // CSV Header
    let csv = 'ID,Name,Email,Phone,Join Date,Orders,Total Spent,Tier,Points\n';
    
    // CSV Data
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => {
            let text = cell.textContent.trim();
            // Remove $ from spent
            text = text.replace('$', '');
            // Escape commas and quotes
            if (text.includes(',') || text.includes('"')) {
                text = '"' + text.replace(/"/g, '""') + '"';
            }
            return text;
        });
        csv += rowData.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Customer data exported successfully!', 'success');
}

window.exportToCSV = exportToCSV;

console.log('✅ CSV export functionality added');


// =============================================
// ADD/DELETE CUSTOMER FUNCTIONS
// =============================================

function openAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'flex';
}

function closeAddCustomerModal() {
    document.getElementById('addCustomerModal').style.display = 'none';
    document.getElementById('addCustomerForm').reset();
}

async function addCustomer(event) {
    event.preventDefault();
    
    const customerData = {
        firstName: document.getElementById('newFirstName').value,
        lastName: document.getElementById('newLastName').value,
        email: document.getElementById('newEmail').value,
        phone: document.getElementById('newPhone').value || null,
        password: document.getElementById('newPassword').value
    };
    
    const initialPoints = parseInt(document.getElementById('newPoints').value) || 0;
    
    const token = localStorage.getItem('authToken');
    if (!token) {
        showNotification('Please login first', 'error');
        return;
    }
    
    try {
        // Register new customer
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // If initial points > 0, update them
            if (initialPoints > 0 && data.user) {
                await fetch(`http://localhost:5000/api/admin/update-points/${data.user.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ points: initialPoints })
                });
            }
            
            showNotification('Customer added successfully!', 'success');
            closeAddCustomerModal();
            // Reload customer list
            loadAdminCustomers();
        } else {
            showNotification(data.message || 'Failed to add customer', 'error');
        }
    } catch (error) {
        console.error('Add customer error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function deleteCustomer(userId, customerName) {
    if (!confirm(`Are you sure you want to delete customer: ${customerName}?\n\nThis action cannot be undone!`)) {
        return;
    }
    
    const token = localStorage.getItem('authToken');
    if (!token) {
        showNotification('Please login first', 'error');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:5000/api/admin/delete-customer/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Customer deleted successfully!', 'success');
            // Reload customer list
            loadAdminCustomers();
        } else {
            showNotification(data.message || 'Failed to delete customer', 'error');
        }
    } catch (error) {
        console.error('Delete customer error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

window.openAddCustomerModal = openAddCustomerModal;
window.closeAddCustomerModal = closeAddCustomerModal;
window.addCustomer = addCustomer;
window.deleteCustomer = deleteCustomer;

console.log('✅ Add/Delete customer functions loaded');


// =============================================
// REPORTS AND TAB SWITCHING
// =============================================

function showCustomersTab() {
    document.getElementById('customersSection').style.display = 'block';
    document.getElementById('reportsSection').style.display = 'none';
    document.getElementById('customersTab').style.background = '#4fc3f7';
    document.getElementById('customersTab').style.color = 'white';
    document.getElementById('reportsTab').style.background = '#e0e0e0';
    document.getElementById('reportsTab').style.color = '#666';
}

function showReportsTab() {
    document.getElementById('customersSection').style.display = 'none';
    document.getElementById('reportsSection').style.display = 'block';
    document.getElementById('customersTab').style.background = '#e0e0e0';
    document.getElementById('customersTab').style.color = '#666';
    document.getElementById('reportsTab').style.background = '#4fc3f7';
    document.getElementById('reportsTab').style.color = 'white';
    
    // Load analytics
    loadAnalytics();
}

// Show/hide custom date range
document.addEventListener('DOMContentLoaded', () => {
    const reportType = document.getElementById('reportType');
    if (reportType) {
        reportType.addEventListener('change', function() {
            const showCustom = this.value === 'custom';
            const customRange1 = document.getElementById('customDateRange');
            const customRange2 = document.getElementById('customDateRange2');
            if (customRange1) customRange1.style.display = showCustom ? 'block' : 'none';
            if (customRange2) customRange2.style.display = showCustom ? 'block' : 'none';
        });
    }
});

async function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showNotification('Please login first', 'error');
        return;
    }
    
    try {
        let fromDate, toDate;
        const today = new Date();
        
        if (reportType === 'daily') {
            fromDate = toDate = today.toISOString().split('T')[0];
        } else if (reportType === 'weekly') {
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            fromDate = weekAgo.toISOString().split('T')[0];
            toDate = today.toISOString().split('T')[0];
        } else if (reportType === 'monthly') {
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            fromDate = monthAgo.toISOString().split('T')[0];
            toDate = today.toISOString().split('T')[0];
        } else if (reportType === 'yearly') {
            const yearAgo = new Date(today);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            fromDate = yearAgo.toISOString().split('T')[0];
            toDate = today.toISOString().split('T')[0];
        } else if (reportType === 'custom') {
            fromDate = document.getElementById('fromDate').value;
            toDate = document.getElementById('toDate').value;
            if (!fromDate || !toDate) {
                showNotification('Please select date range', 'error');
                return;
            }
        }
        
        const response = await fetch(`http://localhost:5000/api/admin/report?from=${fromDate}&to=${toDate}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayReportResults(data.report);
        } else {
            showNotification(data.message || 'Failed to generate report', 'error');
        }
    } catch (error) {
        console.error('Report error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

function displayReportResults(report) {
    document.getElementById('reportResults').style.display = 'block';
    document.getElementById('reportRevenue').textContent = `$${(report.totalRevenue || 0).toFixed(2)}`;
    document.getElementById('reportOrders').textContent = report.totalOrders || 0;
    document.getElementById('reportNewCustomers').textContent = report.newCustomers || 0;
    document.getElementById('reportAvgOrder').textContent = `$${(report.avgOrderValue || 0).toFixed(2)}`;
    
    showNotification('Report generated successfully!', 'success');
}

async function loadAnalytics() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    
    try {
        const response = await fetch('http://localhost:5000/api/admin/analytics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayAnalytics(data.analytics);
        }
    } catch (error) {
        console.error('Analytics error:', error);
    }
}

function displayAnalytics(analytics) {
    // Top customers
    const topCustomersDiv = document.getElementById('topCustomers');
    if (topCustomersDiv && analytics.topCustomers) {
        topCustomersDiv.innerHTML = analytics.topCustomers.map((c, i) => 
            `<div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px;">
                ${i + 1}. ${c.name} - $${c.spent.toFixed(2)}
            </div>`
        ).join('');
    }
    
    // Growth metrics
    const growthDiv = document.getElementById('growthMetrics');
    if (growthDiv && analytics.growth) {
        growthDiv.innerHTML = `
            <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px;">
                <strong>This Week:</strong> ${analytics.growth.thisWeek || 0} new customers
            </div>
            <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px;">
                <strong>This Month:</strong> ${analytics.growth.thisMonth || 0} new customers
            </div>
            <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px;">
                <strong>Growth Rate:</strong> ${analytics.growth.rate || 0}%
            </div>
        `;
    }
}

function exportReportPDF() {
    showNotification('PDF export feature coming soon!', 'info');
}

window.showCustomersTab = showCustomersTab;
window.showReportsTab = showReportsTab;
window.generateReport = generateReport;
window.exportReportPDF = exportReportPDF;

console.log('✅ Reports functionality loaded');
