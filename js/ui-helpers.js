// UI Helper Functions and Toast Notifications
class UIHelpers {
    // Toast notification system
    static showToast(message, type = 'info', duration = 3000) {
        // Remove existing toasts
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    static getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Loading overlay
    static showLoading(message = 'Loading...') {
        let overlay = document.getElementById('loadingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loadingOverlay';
            overlay.className = 'loading-overlay';
            document.body.appendChild(overlay);
        }
        
        overlay.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;
        overlay.classList.remove('hidden');
    }

    static hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    // Confirmation dialog
    static confirm(message, callback) {
        if (window.confirm(message)) {
            callback();
        }
    }

    // Generate star rating HTML
    static generateStarRating(rating, interactive = false, size = 'medium') {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let html = '<div class="star-rating ' + (interactive ? 'interactive ' : '') + 'size-' + size + '">';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            html += '<i class="fas fa-star" data-rating="' + (i + 1) + '"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            html += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            html += '<i class="far fa-star" data-rating="' + (fullStars + (hasHalfStar ? 1 : 0) + i + 1) + '"></i>';
        }
        
        html += '</div>';
        return html;
    }

    // Format distance
    static formatDistance(km) {
        if (km < 1) {
            return (km * 1000).toFixed(0) + ' m';
        }
        return km.toFixed(1) + ' km';
    }

    // Format time
    static formatTime(minutes) {
        if (minutes < 60) {
            return minutes + ' min';
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours + ' hr ' + (mins > 0 ? mins + ' min' : '');
    }

    // Animate element
    static animateElement(element, animation) {
        element.classList.add('animate__animated', animation);
        element.addEventListener('animationend', () => {
            element.classList.remove('animate__animated', animation);
        }, { once: true });
    }

    // Debounce function for search
    static debounce(func, wait) {
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

    // Create badge element
    static createBadge(text, type = 'default') {
        return `<span class="badge badge-${type}">${text}</span>`;
    }

    // Create amenity icon
    static getAmenityIcon(amenity) {
        const icons = {
            'WiFi': 'fa-wifi',
            'Parking': 'fa-parking',
            'AC': 'fa-snowflake',
            'Outdoor Seating': 'fa-umbrella-beach',
            'Delivery': 'fa-truck',
            'Bookstore': 'fa-book',
            'Events': 'fa-calendar-alt',
            'Art Gallery': 'fa-palette',
            'Live Music': 'fa-music',
            'Multiple Outlets': 'fa-plug',
            'Study-Friendly': 'fa-book-reader',
            'Family-Friendly': 'fa-users',
            'Indoor Seating': 'fa-couch',
            'Rooftop': 'fa-building',
            'Historic View': 'fa-landmark',
            'Traditional Decor': 'fa-mosque',
            'Valet Parking': 'fa-car',
            'Fine Dining': 'fa-utensils',
            'Mall Location': 'fa-shopping-cart',
            'Instagrammable': 'fa-camera',
            'Italian Cuisine': 'fa-pizza-slice',
            'Scenic View': 'fa-mountain',
            'Photography': 'fa-camera-retro',
            'Dessert Paradise': 'fa-ice-cream',
            'Homemade Food': 'fa-home',
            'Cozy': 'fa-mug-hot',
            'Traditional Tea': 'fa-mug-hot',
            'Budget-Friendly': 'fa-dollar-sign',
            'Fast Food': 'fa-hamburger',
            'Takeaway': 'fa-shopping-bag',
            'Themed Decor': 'fa-theater-masks',
            'Poetry Nights': 'fa-feather',
            'Central Location': 'fa-map-marker-alt',
            'Tea Selection': 'fa-mug-hot',
            'Fast Service': 'fa-bolt',
            'Casual': 'fa-smile',
            'Quick Service': 'fa-stopwatch',
            'Chinese Food': 'fa-dragon',
            'Premium Coffee': 'fa-coffee',
            'Traditional & Modern': 'fa-balance-scale',
            'Modern Decor': 'fa-paint-roller',
            'Good Service': 'fa-concierge-bell',
            'Diverse Menu': 'fa-list'
        };
        return icons[amenity] || 'fa-check';
    }

    // Create price range indicator
    static createPriceIndicator(priceRange) {
        const levels = { '$': 1, '$$': 2, '$$$': 3 };
        const level = levels[priceRange] || 2;
        
        let html = '<div class="price-indicator">';
        for (let i = 0; i < 3; i++) {
            html += `<span class="${i < level ? 'active' : ''}">$</span>`;
        }
        html += '</div>';
        return html;
    }

    // Smooth scroll to element
    static scrollToElement(element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Copy to clipboard
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            this.showToast('Failed to copy', 'error');
        });
    }
}

// Convenience global function
function showToast(message, type, duration) {
    UIHelpers.showToast(message, type, duration);
}
