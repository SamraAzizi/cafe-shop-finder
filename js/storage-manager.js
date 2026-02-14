// Local Storage Manager for Persistence
class StorageManager {
    constructor() {
        this.keys = AppConfig.STORAGE_KEYS;
    }

    // Generic Methods
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    // Favorites Management
    getFavorites() {
        return this.get(this.keys.favorites) || [];
    }

    addFavorite(cafeId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(cafeId)) {
            favorites.push(cafeId);
            this.set(this.keys.favorites, favorites);
        }
        return favorites;
    }

    removeFavorite(cafeId) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(id => id !== cafeId);
        this.set(this.keys.favorites, favorites);
        return favorites;
    }

    isFavorite(cafeId) {
        return this.getFavorites().includes(cafeId);
    }

    // Reviews Management
    getReviews(cafeId = null) {
        const allReviews = this.get(this.keys.reviews) || {};
        return cafeId ? (allReviews[cafeId] || []) : allReviews;
    }

    addReview(cafeId, review) {
        const reviews = this.get(this.keys.reviews) || {};
        if (!reviews[cafeId]) {
            reviews[cafeId] = [];
        }
        
        const newReview = {
            id: Date.now(),
            cafeId: cafeId,
            rating: review.rating,
            comment: review.comment,
            userName: review.userName || 'Anonymous',
            date: new Date().toISOString(),
            ...review
        };
        
        reviews[cafeId].unshift(newReview);
        this.set(this.keys.reviews, reviews);
        return newReview;
    }

    getAverageRating(cafeId) {
        const reviews = this.getReviews(cafeId);
        if (reviews.length === 0) return null;
        
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }

    // User Preferences
    getPreferences() {
        return this.get(this.keys.userPreferences) || {
            theme: 'light',
            defaultCity: '',
            sortBy: 'rating',
            mapZoom: 6
        };
    }

    setPreference(key, value) {
        const prefs = this.getPreferences();
        prefs[key] = value;
        this.set(this.keys.userPreferences, prefs);
        return prefs;
    }

    // Visit History
    getVisitHistory() {
        return this.get(this.keys.visitHistory) || [];
    }

    addToHistory(cafeId) {
        let history = this.getVisitHistory();
        
        // Remove if already exists
        history = history.filter(item => item.cafeId !== cafeId);
        
        // Add to beginning
        history.unshift({
            cafeId: cafeId,
            visitedAt: new Date().toISOString()
        });
        
        // Keep only last 50
        history = history.slice(0, 50);
        
        this.set(this.keys.visitHistory, history);
        return history;
    }

    clearHistory() {
        return this.remove(this.keys.visitHistory);
    }

    // Clear All Data
    clearAll() {
        Object.values(this.keys).forEach(key => {
            this.remove(key);
        });
    }
}

// Create global instance
const storageManager = new StorageManager();
