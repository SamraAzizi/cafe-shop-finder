// Route Optimization for Multiple Cafes
class RouteOptimizer {
    constructor() {
        this.selectedCafes = [];
        this.optimizedRoute = [];
    }

    // Add cafe to route
    addCafe(cafe) {
        if (!this.selectedCafes.find(c => c.id === cafe.id)) {
            this.selectedCafes.push(cafe);
            return true;
        }
        return false;
    }

    // Remove cafe from route
    removeCafe(cafeId) {
        this.selectedCafes = this.selectedCafes.filter(c => c.id !== cafeId);
    }

    // Check if cafe is in route
    isInRoute(cafeId) {
        return this.selectedCafes.some(c => c.id === cafeId);
    }

    // Get selected cafes
    getSelectedCafes() {
        return this.selectedCafes;
    }

    // Clear all selections
    clear() {
        this.selectedCafes = [];
        this.optimizedRoute = [];
    }

    // Calculate optimized route using nearest neighbor algorithm
    optimizeRoute(startLocation = null) {
        if (this.selectedCafes.length === 0) return [];
        
        const unvisited = [...this.selectedCafes];
        const route = [];
        
        // Start from user location or first cafe
        let current = startLocation || { 
            lat: unvisited[0].lat, 
            lng: unvisited[0].lng 
        };
        
        // If starting from user location, find nearest cafe first
        if (startLocation) {
            const nearest = this.findNearest(current, unvisited);
            route.push(nearest);
            unvisited.splice(unvisited.indexOf(nearest), 1);
            current = nearest;
        } else {
            // Start with first cafe
            route.push(unvisited[0]);
            current = unvisited[0];
            unvisited.shift();
        }
        
        // Find nearest neighbor for each step
        while (unvisited.length > 0) {
            const nearest = this.findNearest(current, unvisited);
            route.push(nearest);
            unvisited.splice(unvisited.indexOf(nearest), 1);
            current = nearest;
        }
        
        this.optimizedRoute = route;
        return route;
    }

    // Find nearest cafe from current location
    findNearest(current, cafes) {
        let nearest = cafes[0];
        let minDistance = calculateDistance(
            current.lat, current.lng,
            nearest.lat, nearest.lng
        );
        
        for (let i = 1; i < cafes.length; i++) {
            const distance = calculateDistance(
                current.lat, current.lng,
                cafes[i].lat, cafes[i].lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = cafes[i];
            }
        }
        
        return nearest;
    }

    // Calculate total distance of route
    getTotalDistance(startLocation = null) {
        if (this.optimizedRoute.length === 0) return 0;
        
        let total = 0;
        let current = startLocation || this.optimizedRoute[0];
        
        const route = startLocation ? this.optimizedRoute : this.optimizedRoute.slice(1);
        
        for (const cafe of route) {
            total += calculateDistance(current.lat, current.lng, cafe.lat, cafe.lng);
            current = cafe;
        }
        
        return total.toFixed(2);
    }

    // Get route waypoints for Google Maps
    getWaypoints() {
        if (this.optimizedRoute.length === 0) return [];
        
        // Google Maps waypoints (excluding start and end)
        return this.optimizedRoute.slice(1, -1).map(cafe => ({
            location: { lat: cafe.lat, lng: cafe.lng },
            stopover: true
        }));
    }

    // Open route in Google Maps
    openInGoogleMaps(startLocation = null) {
        if (this.selectedCafes.length === 0) {
            showToast('Please select at least one cafe for the route', 'warning');
            return;
        }
        
        const route = this.optimizeRoute(startLocation);
        
        let url = 'https://www.google.com/maps/dir/?api=1';
        
        // Add origin
        if (startLocation) {
            url += `&origin=${startLocation.lat},${startLocation.lng}`;
        } else {
            url += `&origin=${route[0].lat},${route[0].lng}`;
        }
        
        // Add destination (last cafe)
        const lastCafe = route[route.length - 1];
        url += `&destination=${lastCafe.lat},${lastCafe.lng}`;
        
        // Add waypoints (intermediate cafes)
        if (route.length > 1) {
            const waypoints = route.slice(startLocation ? 0 : 1, -1)
                .map(cafe => `${cafe.lat},${cafe.lng}`)
                .join('|');
            if (waypoints) {
                url += `&waypoints=${waypoints}`;
            }
        }
        
        url += '&travelmode=driving';
        window.open(url, '_blank');
    }

    // Generate route summary
    getRouteSummary(startLocation = null) {
        if (this.selectedCafes.length === 0) return null;
        
        const route = this.optimizeRoute(startLocation);
        const totalDistance = this.getTotalDistance(startLocation);
        const estimatedTime = (parseFloat(totalDistance) / 40 * 60).toFixed(0); // Assuming 40 km/h avg speed
        
        return {
            cafes: route,
            totalCafes: route.length,
            totalDistance: totalDistance,
            estimatedTime: estimatedTime,
            startLocation: startLocation
        };
    }
}

// Create global instance
const routeOptimizer = new RouteOptimizer();
