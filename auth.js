// API Configuration
const API_URL = 'http://localhost:5000/api';

// Authentication Functions
async function handleLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            showNotification('Login successful! Loading admin dashboard...', 'success');

            // Update UI to show admin button
            updateUIForAuth();

            // Close auth modal and show admin dashboard
            document.getElementById('authModal').classList.remove('active');
            setTimeout(() => {
                showAdminDashboard();
            }, 500);
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function handleRegister(formData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // Store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            showNotification('Account created successfully! Loading admin dashboard...', 'success');

            // Update UI to show admin button
            updateUIForAuth();

            // Close auth modal and show admin dashboard
            document.getElementById('authModal').classList.remove('active');
            setTimeout(() => {
                showAdminDashboard();
            }, 500);
        } else {
            const errorMsg = data.errors ? data.errors.map(e => e.msg).join(', ') : data.message;
            showNotification(errorMsg || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function placeOrderWithBackend(orderData) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showNotification('Please login to place an order', 'error');
        // Open login modal
        document.getElementById('authModal').classList.add('active');
        document.getElementById('loginTab').click();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification(`Order placed! You earned ${data.pointsEarned} loyalty points!`, 'success');
            return data.order;
        } else {
            showNotification(data.message || 'Order failed', 'error');
        }
    } catch (error) {
        console.error('Order error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function bookEvent(eventData) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showNotification('Please login to book events', 'error');
        document.getElementById('authModal').classList.add('active');
        document.getElementById('loginTab').click();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/events/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Event booked successfully!', 'success');
            return data.booking;
        } else {
            showNotification(data.message || 'Booking failed', 'error');
        }
    } catch (error) {
        console.error('Booking error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function makeReservation(reservationData) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showNotification('Please login to make reservations', 'error');
        document.getElementById('authModal').classList.add('active');
        document.getElementById('loginTab').click();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservationData)
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Reservation confirmed!', 'success');
            return data.reservation;
        } else {
            showNotification(data.message || 'Reservation failed', 'error');
        }
    } catch (error) {
        console.error('Reservation error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

async function redeemReward(points, rewardName) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showNotification('Please login to redeem rewards', 'error');
        document.getElementById('authModal').classList.add('active');
        document.getElementById('loginTab').click();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/loyalty/redeem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ points, rewardName })
        });

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, 'success');
            return true;
        } else {
            showNotification(data.message || 'Redemption failed', 'error');
            return false;
        }
    } catch (error) {
        console.error('Redemption error:', error);
        showNotification('Network error. Please try again.', 'error');
        return false;
    }
}

// Update the UI based on login status
function updateUIForAuth() {
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminBtn');

    if (token && userData.firstName) {
        // User is logged in
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (adminBtn) {
            adminBtn.style.display = 'inline-block';
        }
    } else {
        // User is not logged in
        if (loginBtn) {
            loginBtn.style.display = 'inline-block';
        }
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
}// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateUIForAuth();
});

// Export functions for global use
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.placeOrderWithBackend = placeOrderWithBackend;
window.bookEvent = bookEvent;
window.makeReservation = makeReservation;
window.redeemReward = redeemReward;
