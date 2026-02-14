// Configuration Management
const AppConfig = {
    // Google Maps API Key - Get your key from: https://console.cloud.google.com/
    GOOGLE_MAPS_API_KEY: 'AIzaSyBnuFRTfQKMmS95O9yG0Uoy0iH-UNx67ts',
    
    // Map Settings
    MAP_SETTINGS: {
        defaultCenter: { lat: 30.3753, lng: 69.3451 },
        defaultZoom: 6,
        nearbyRadius: 50, // km
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#a2daf2' }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            }
        ]
    },
    
    // Feature Flags
    FEATURES: {
        enableReviews: true,
        enableFavorites: true,
        enablePhotos: true,
        enableRouteOptimization: true,
        enableAdvancedFilters: true,
        enableOfflineMode: false
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        favorites: 'cafe_finder_favorites',
        reviews: 'cafe_finder_reviews',
        userPreferences: 'cafe_finder_preferences',
        visitHistory: 'cafe_finder_history'
    },
    
    // UI Settings
    UI: {
        itemsPerPage: 20,
        animationDuration: 300,
        toastDuration: 3000
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}
