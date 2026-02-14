// Advanced Filter Manager
class FilterManager {
    constructor() {
        this.filters = {
            searchQuery: '',
            city: '',
            minRating: 0,
            priceRange: [],
            amenities: [],
            sortBy: 'rating'
        };
    }

    // Apply all active filters to cafes
    applyFilters(cafes) {
        let filtered = [...cafes];

        // Search query filter
        if (this.filters.searchQuery) {
            const query = this.filters.searchQuery.toLowerCase();
            filtered = filtered.filter(cafe => 
                cafe.name.toLowerCase().includes(query) ||
                cafe.description.toLowerCase().includes(query) ||
                cafe.city.toLowerCase().includes(query) ||
                (cafe.specialties && cafe.specialties.some(s => s.toLowerCase().includes(query)))
            );
        }

        // City filter
        if (this.filters.city) {
            filtered = filtered.filter(cafe => cafe.city === this.filters.city);
        }

        // Rating filter
        if (this.filters.minRating > 0) {
            filtered = filtered.filter(cafe => {
                const userRating = storageManager.getAverageRating(cafe.id);
                const rating = userRating ? parseFloat(userRating) : cafe.rating;
                return rating >= this.filters.minRating;
            });
        }

        // Price range filter
        if (this.filters.priceRange.length > 0) {
            filtered = filtered.filter(cafe => 
                this.filters.priceRange.includes(cafe.priceRange)
            );
        }

        // Amenities filter
        if (this.filters.amenities.length > 0) {
            filtered = filtered.filter(cafe => {
                if (!cafe.amenities) return false;
                return this.filters.amenities.every(amenity => 
                    cafe.amenities.includes(amenity)
                );
            });
        }

        // Sort
        filtered = this.sortCafes(filtered);

        return filtered;
    }

    // Sort cafes by selected criteria
    sortCafes(cafes) {
        const sorted = [...cafes];
        
        switch (this.filters.sortBy) {
            case 'rating':
                return sorted.sort((a, b) => {
                    const ratingA = storageManager.getAverageRating(a.id) || a.rating;
                    const ratingB = storageManager.getAverageRating(b.id) || b.rating;
                    return parseFloat(ratingB) - parseFloat(ratingA);
                });
            
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            
            case 'price-low':
                return sorted.sort((a, b) => {
                    const priceOrder = { '$': 1, '$$': 2, '$$$': 3 };
                    return priceOrder[a.priceRange] - priceOrder[b.priceRange];
                });
            
            case 'price-high':
                return sorted.sort((a, b) => {
                    const priceOrder = { '$': 1, '$$': 2, '$$$': 3 };
                    return priceOrder[b.priceRange] - priceOrder[a.priceRange];
                });
            
            case 'distance':
                if (userLocation) {
                    return sorted.sort((a, b) => {
                        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
                        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
                        return distA - distB;
                    });
                }
                return sorted;
            
            default:
                return sorted;
        }
    }

    // Update specific filter
    setFilter(key, value) {
        this.filters[key] = value;
    }

    // Get current filter value
    getFilter(key) {
        return this.filters[key];
    }

    // Toggle array-based filters (amenities, priceRange)
    toggleFilter(key, value) {
        const index = this.filters[key].indexOf(value);
        if (index > -1) {
            this.filters[key].splice(index, 1);
        } else {
            this.filters[key].push(value);
        }
    }

    // Reset all filters
    reset() {
        this.filters = {
            searchQuery: '',
            city: '',
            minRating: 0,
            priceRange: [],
            amenities: [],
            sortBy: 'rating'
        };
    }

    // Get all unique amenities from cafes
    static getAllAmenities(cafes) {
        const amenitiesSet = new Set();
        cafes.forEach(cafe => {
            if (cafe.amenities) {
                cafe.amenities.forEach(amenity => amenitiesSet.add(amenity));
            }
        });
        return Array.from(amenitiesSet).sort();
    }

    // Get all unique cities
    static getAllCities(cafes) {
        const citiesSet = new Set(cafes.map(cafe => cafe.city));
        return Array.from(citiesSet).sort();
    }
}

// Create global instance
const filterManager = new FilterManager();
