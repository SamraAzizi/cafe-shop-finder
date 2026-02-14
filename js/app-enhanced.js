// Enhanced Pakistan Cafe Finder Application
// Global Variables
let map;
let markers = [];
let infoWindow;
let currentCafes = [...cafesData];
let filteredCafes = [...cafesData];
let selectedCafe = null;
let userLocation = null;
let directionsService;
let directionsRenderer;

// Initialize Map
function initMap() {
    const { defaultCenter, defaultZoom, styles } = AppConfig.MAP_SETTINGS;
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultCenter,
        zoom: defaultZoom,
        styles: styles,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
    });

    infoWindow = new google.maps.InfoWindow();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false
    });

    // Initialize app
    initializeApp();
}

// Initialize Application
function initializeApp() {
    UIHelpers.showLoading('Initializing...');
    
    setTimeout(() => {
        // Display cafes
        displayCafes(currentCafes);
        createMarkers(currentCafes);
        updateStats();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup advanced filters UI
        setupAdvancedFilters();
        
        // Load user data
        loadUserData();
        
        UIHelpers.hideLoading();
        showToast('Cafe Finder ready! 🎉', 'success');
    }, 1000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', UIHelpers.debounce(handleSearch, 300));

    // City filter
    document.getElementById('cityFilter').addEventListener('change', handleFilters);

    // Find nearby
    document.getElementById('findMeBtn').addEventListener('click', findNearby);

    // Advanced filter buttons
    document.getElementById('applyFiltersBtn')?.addEventListener('click', handleFilters);
    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);

    // Sort
    document.getElementById('sortSelect')?.addEventListener('change', handleSort);

    // Rating filter
    document.getElementById('ratingFilter')?.addEventListener('change', handleFilters);

    // Modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('cafeModal').addEventListener('click', (e) => {
        if (e.target.id === 'cafeModal') closeModal();
    });

    // Modal actions
    document.getElementById('modalDirections').addEventListener('click', getDirections);
    document.getElementById('modalViewOnMap').addEventListener('click', viewOnMap);
    document.getElementById('modalFavorite')?.addEventListener('click', toggleFavorite);
    document.getElementById('modalAddRoute')?.addEventListener('click', addToRoute);
    
    // Review form
    document.getElementById('submitReviewBtn')?.addEventListener('click', submitReview);
    
    // Route panel
    document.getElementById('openRoutePanel')?.addEventListener('click', toggleRoutePanel);
    document.getElementById('closeRoutePanel')?.addEventListener('click', toggleRoutePanel);
    document.getElementById('optimizeRouteBtn')?.addEventListener('click', optimizeAndShowRoute);
    document.getElementById('clearRouteBtn')?.addEventListener('click', clearRoute);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });
}

// Setup Advanced Filters
function setupAdvancedFilters() {
    // Populate amenities
    const amenitiesList = document.getElementById('amenitiesList');
    if (amenitiesList) {
        const allAmenities = FilterManager.getAllAmenities(cafesData);
        amenitiesList.innerHTML = allAmenities.map(amenity => `
            <label class="checkbox-label">
                <input type="checkbox" value="${amenity}" class="amenity-checkbox">
                <i class="fas ${UIHelpers.getAmenityIcon(amenity)}"></i>
                ${amenity}
            </label>
        `).join('');
        
        // Add event listeners to amenity checkboxes
        amenitiesList.querySelectorAll('.amenity-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleFilters);
        });
    }
    
    // Price range checkboxes
    document.querySelectorAll('.price-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilters);
    });
}

// Load User Data
function loadUserData() {
    // Load favorites and update UI
    updateFavoritesDisplay();
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value.trim();
    filterManager.setFilter('searchQuery', query);
    applyFiltersAndUpdate();
}

// Handle All Filters
function handleFilters() {
    // City
    const city = document.getElementById('cityFilter').value;
    filterManager.setFilter('city', city);
    
    // Rating
    const minRating = parseFloat(document.getElementById('ratingFilter')?.value || 0);
    filterManager.setFilter('minRating', minRating);
    
    // Price Range
    const priceCheckboxes = document.querySelectorAll('.price-checkbox:checked');
    const priceRanges = Array.from(priceCheckboxes).map(cb => cb.value);
    filterManager.setFilter('priceRange', priceRanges);
    
    // Amenities
    const amenityCheckboxes = document.querySelectorAll('.amenity-checkbox:checked');
    const amenities = Array.from(amenityCheckboxes).map(cb => cb.value);
    filterManager.setFilter('amenities', amenities);
    
    applyFiltersAndUpdate();
}

// Handle Sort
function handleSort(e) {
    filterManager.setFilter('sortBy', e.target.value);
    applyFiltersAndUpdate();
}

// Reset Filters
function resetFilters() {
    // Reset filter manager
    filterManager.reset();
    
    // Reset UI
    document.getElementById('searchInput').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('ratingFilter').value = '0';
    document.querySelectorAll('.price-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.amenity-checkbox').forEach(cb => cb.checked = false);
    
    applyFiltersAndUpdate();
    showToast('Filters reset', 'info');
}

// Apply Filters and Update Display
function applyFiltersAndUpdate() {
    filteredCafes = filterManager.applyFilters(currentCafes);
    displayCafes(filteredCafes);
    createMarkers(filteredCafes);
    updateStats();
}

// Display Cafes in Sidebar
function displayCafes(cafes) {
    const cafeList = document.getElementById('cafeList');
    cafeList.innerHTML = '';

    if (cafes.length === 0) {
        cafeList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No cafes found</p>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    cafes.forEach(cafe => {
        const isFavorite = storageManager.isFavorite(cafe.id);
        const isInRoute = routeOptimizer.isInRoute(cafe.id);
        const userRating = storageManager.getAverageRating(cafe.id);
        const displayRating = userRating || cafe.rating;
        const reviews = storageManager.getReviews(cafe.id);
        
        const cafeItem = document.createElement('div');
        cafeItem.className = 'cafe-item';
        cafeItem.innerHTML = `
            <div class="cafe-item-header">
                <h3>${cafe.name}</h3>
                <div class="cafe-actions">
                    <button class="btn-icon ${isFavorite ? 'active' : ''}" 
                            onclick="toggleFavoriteCafe(${cafe.id})" 
                            title="Add to favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="btn-icon ${isInRoute ? 'active' : ''}" 
                            onclick="toggleRouteCafe(${cafe.id})" 
                            title="Add to route">
                        <i class="fas fa-route"></i>
                    </button>
                </div>
            </div>
            <div class="rating-row">
                ${UIHelpers.generateStarRating(displayRating, false, 'small')}
                <span class="rating-value">${displayRating}</span>
                ${userRating ? `<span class="review-count">(${reviews.length} reviews)</span>` : ''}
                ${UIHelpers.createPriceIndicator(cafe.priceRange || '$$')}
            </div>
            <div class="cafe-info">
                <p><i class="fas fa-map-marker-alt"></i> ${cafe.city}</p>
                ${userLocation ? `<p><i class="fas fa-road"></i> ${UIHelpers.formatDistance(calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng))}</p>` : ''}
            </div>
            ${cafe.specialties ? `
                <div class="specialties">
                    ${cafe.specialties.slice(0, 3).map(s => UIHelpers.createBadge(s, 'primary')).join('')}
                </div>
            ` : ''}
            ${cafe.amenities ? `
                <div class="amenities-preview">
                    ${cafe.amenities.slice(0, 4).map(a => `<i class="fas ${UIHelpers.getAmenityIcon(a)}" title="${a}"></i>`).join('')}
                    ${cafe.amenities.length > 4 ? `<span>+${cafe.amenities.length - 4}</span>` : ''}
                </div>
            ` : ''}
        `;
        
        cafeItem.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-icon')) {
                openCafeModal(cafe);
            }
        });
        
        cafeList.appendChild(cafeItem);
    });
}

// Create Map Markers
function createMarkers(cafes) {
    // Clear existing markers
    markers.forEach(m => m.marker.setMap(null));
    markers = [];

    // Create new markers
    cafes.forEach(cafe => {
        const isFavorite = storageManager.isFavorite(cafe.id);
        
        const marker = new google.maps.Marker({
            position: { lat: cafe.lat, lng: cafe.lng },
            map: map,
            title: cafe.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: isFavorite ? '#e74c3c' : '#3498db',
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 2
            },
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
            selectCafe(cafe);
            showInfoWindow(cafe, marker);
        });

        markers.push({ cafe: cafe, marker: marker });
    });

    // Fit bounds if there are cafes
    if (cafes.length > 0 && cafes.length < 50) {
        const bounds = new google.maps.LatLngBounds();
        cafes.forEach(cafe => bounds.extend({ lat: cafe.lat, lng: cafe.lng }));
        map.fitBounds(bounds);
    }
}

// Show Info Window
function showInfoWindow(cafe, marker) {
    const userRating = storageManager.getAverageRating(cafe.id);
    const displayRating = userRating || cafe.rating;
    
    const content = `
        <div class="info-window">
            <h3>${cafe.name}</h3>
            ${UIHelpers.generateStarRating(displayRating, false, 'small')}
            <p><strong>${cafe.city}</strong></p>
            <p class="info-description">${cafe.description}</p>
            <button class="btn-primary btn-sm" onclick="openCafeModal({id: ${cafe.id}})">
                View Details
            </button>
        </div>
    `;
    
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
}

// Open Cafe Modal
function openCafeModal(cafe) {
    // Find full cafe data
    selectedCafe = cafesData.find(c => c.id === cafe.id);
    if (!selectedCafe) return;
    
    const isFavorite = storageManager.isFavorite(selectedCafe.id);
    const isInRoute = routeOptimizer.isInRoute(selectedCafe.id);
    const userRating = storageManager.getAverageRating(selectedCafe.id);
    const displayRating = userRating || selectedCafe.rating;
    const reviews = storageManager.getReviews(selectedCafe.id);
    
    // Update modal content
    document.getElementById('modalCafeName').textContent = selectedCafe.name;
    document.getElementById('modalRating').innerHTML = UIHelpers.generateStarRating(displayRating);
    document.getElementById('modalAddress').textContent = selectedCafe.address;
    document.getElementById('modalCity').textContent = selectedCafe.city;
    document.getElementById('modalPhone').textContent = selectedCafe.phone;
    
    // Price range
    document.getElementById('modalPrice').innerHTML = UIHelpers.createPriceIndicator(selectedCafe.priceRange || '$$');
    
    // Opening hours
    if (selectedCafe.openingHours) {
        document.getElementById('modalHours').textContent = selectedCafe.openingHours;
    }
    
    // Description
    if (selectedCafe.description) {
        document.getElementById('modalDescription').textContent = selectedCafe.description;
    }
    
    // Specialties
    const specialtiesContainer = document.getElementById('modalSpecialties');
    if (selectedCafe.specialties && selectedCafe.specialties.length > 0) {
        specialtiesContainer.innerHTML = selectedCafe.specialties
            .map(s => UIHelpers.createBadge(s, 'secondary'))
            .join('');
        specialtiesContainer.parentElement.style.display = 'block';
    } else {
        specialtiesContainer.parentElement.style.display = 'none';
    }
    
    // Amenities
    const amenitiesContainer = document.getElementById('modalAmenities');
    if (selectedCafe.amenities && selectedCafe.amenities.length > 0) {
        amenitiesContainer.innerHTML = selectedCafe.amenities
            .map(a => `
                <div class="amenity-badge">
                    <i class="fas ${UIHelpers.getAmenityIcon(a)}"></i>
                    <span>${a}</span>
                </div>
            `)
            .join('');
        amenitiesContainer.parentElement.style.display = 'block';
    } else {
        amenitiesContainer.parentElement.style.display = 'none';
    }
    
    // Images
    const imagesContainer = document.getElementById('modalImages');
    if (selectedCafe.images && selectedCafe.images.length > 0) {
        imagesContainer.innerHTML = selectedCafe.images
            .map(img => `<img src="${img}" alt="${selectedCafe.name}" class="cafe-image" loading="lazy">`)
            .join('');
        imagesContainer.parentElement.style.display = 'block';
    } else {
        imagesContainer.parentElement.style.display = 'none';
    }
    
    // Update action buttons
    const favoriteBtn = document.getElementById('modalFavorite');
    favoriteBtn.innerHTML = `<i class="fas fa-heart${isFavorite ? '' : '-o'}"></i> ${isFavorite ? 'Remove from' : 'Add to'} Favorites`;
    favoriteBtn.className = isFavorite ? 'btn-danger' : 'btn-secondary';
    
    const routeBtn = document.getElementById('modalAddRoute');
    routeBtn.innerHTML = `<i class="fas fa-route"></i> ${isInRoute ? 'Remove from' : 'Add to'} Route`;
    routeBtn.className = isInRoute ? 'btn-warning' : 'btn-secondary';
    
    // Reviews
    displayReviews(reviews);
    
    // Add to visit history
    storageManager.addToHistory(selectedCafe.id);
    
    // Show modal
    document.getElementById('cafeModal').classList.add('show');
}

// Display Reviews
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviewsList');
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <p class="text-muted">No reviews yet. Be the first to review!</p>
        `;
    } else {
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <strong>${review.userName}</strong>
                    ${UIHelpers.generateStarRating(review.rating, false, 'small')}
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `).join('');
    }
}

// Submit Review
function submitReview() {
    if (!selectedCafe) return;
    
    const rating = parseInt(document.querySelector('input[name="review-rating"]:checked')?.value);
    const comment = document.getElementById('reviewComment').value.trim();
    const userName = document.getElementById('reviewerName').value.trim() || 'Anonymous';
    
    if (!rating) {
        showToast('Please select a rating', 'warning');
        return;
    }
    
    if (!comment) {
        showToast('Please write a comment', 'warning');
        return;
    }
    
    // Add review
    storageManager.addReview(selectedCafe.id, {
        rating: rating,
        comment: comment,
        userName: userName
    });
    
    // Clear form
    document.querySelectorAll('input[name="review-rating"]').forEach(input => input.checked = false);
    document.getElementById('reviewComment').value = '';
    document.getElementById('reviewerName').value = '';
    
    // Update display
    const reviews = storageManager.getReviews(selectedCafe.id);
    displayReviews(reviews);
    
    // Update modal rating
    const userRating = storageManager.getAverageRating(selectedCafe.id);
    document.getElementById('modalRating').innerHTML = UIHelpers.generateStarRating(parseFloat(userRating));
    
    // Update cafe list
    displayCafes(filteredCafes);
    
    showToast('Review submitted successfully!', 'success');
}

// Close Modal
function closeModal() {
    document.getElementById('cafeModal').classList.remove('show');
    selectedCafe = null;
}

// Toggle Favorite
function toggleFavorite() {
    if (!selectedCafe) return;
    
    const isFavorite = storageManager.isFavorite(selectedCafe.id);
    
    if (isFavorite) {
        storageManager.removeFavorite(selectedCafe.id);
        showToast('Removed from favorites', 'info');
    } else {
        storageManager.addFavorite(selectedCafe.id);
        showToast('Added to favorites', 'success');
    }
    
    // Update modal button
    const favoriteBtn = document.getElementById('modalFavorite');
    favoriteBtn.innerHTML = `<i class="fas fa-heart${isFavorite ? '-o' : ''}"></i> ${isFavorite ? 'Add to' : 'Remove from'} Favorites`;
    favoriteBtn.className = isFavorite ? 'btn-secondary' : 'btn-danger';
    
    // Update displays
    displayCafes(filteredCafes);
    createMarkers(filteredCafes);
    updateFavoritesDisplay();
}

// Toggle Favorite from Cafe List
function toggleFavoriteCafe(cafeId) {
    const cafe = cafesData.find(c => c.id === cafeId);
    if (!cafe) return;
    
    const isFavorite = storageManager.isFavorite(cafeId);
    
    if (isFavorite) {
        storageManager.removeFavorite(cafeId);
        showToast(`${cafe.name} removed from favorites`, 'info');
    } else {
        storageManager.addFavorite(cafeId);
        showToast(`${cafe.name} added to favorites`, 'success');
    }
    
    displayCafes(filteredCafes);
    createMarkers(filteredCafes);
    updateFavoritesDisplay();
}

// Add/Remove from Route
function addToRoute() {
    if (!selectedCafe) return;
    
    const isInRoute = routeOptimizer.isInRoute(selectedCafe.id);
    
    if (isInRoute) {
        routeOptimizer.removeCafe(selectedCafe.id);
        showToast('Removed from route', 'info');
    } else {
        if (routeOptimizer.addCafe(selectedCafe)) {
            showToast('Added to route', 'success');
        } else {
            showToast('Already in route', 'warning');
        }
    }
    
    // Update modal button
    const routeBtn = document.getElementById('modalAddRoute');
    routeBtn.innerHTML = `<i class="fas fa-route"></i> ${isInRoute ? 'Add to' : 'Remove from'} Route`;
    routeBtn.className = isInRoute ? 'btn-secondary' : 'btn-warning';
    
    // Update displays
    displayCafes(filteredCafes);
    updateRouteDisplay();
}

// Toggle Route Cafe from List
function toggleRouteCafe(cafeId) {
    const cafe = cafesData.find(c => c.id === cafeId);
    if (!cafe) return;
    
    const isInRoute = routeOptimizer.isInRoute(cafeId);
    
    if (isInRoute) {
        routeOptimizer.removeCafe(cafeId);
        showToast(`${cafe.name} removed from route`, 'info');
    } else {
        if (routeOptimizer.addCafe(cafe)) {
            showToast(`${cafe.name} added to route`, 'success');
        }
    }
    
    displayCafes(filteredCafes);
    updateRouteDisplay();
}

// Update Favorites Display
function updateFavoritesDisplay() {
    const favoriteIds = storageManager.getFavorites();
    const favoriteCount = document.getElementById('favoriteCount');
    if (favoriteCount) {
        favoriteCount.textContent = favoriteIds.length;
    }
}

// Toggle Route Panel
function toggleRoutePanel() {
    const panel = document.getElementById('routePanel');
    panel.classList.toggle('open');
    
    if (panel.classList.contains('open')) {
        updateRouteDisplay();
    }
}

// Update Route Display
function updateRouteDisplay() {
    const selectedCafes = routeOptimizer.getSelectedCafes();
    const routeList = document.getElementById('routeList');
    const routeCount = document.getElementById('routeCount');
    
    if (routeCount) {
        routeCount.textContent = selectedCafes.length;
    }
    
    if (!routeList) return;
    
    if (selectedCafes.length === 0) {
        routeList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-route"></i>
                <p>No cafes in route</p>
                <p class="text-muted">Click the route icon on cafes to add them</p>
            </div>
        `;
        return;
    }
    
    routeList.innerHTML = selectedCafes.map((cafe, index) => `
        <div class="route-item">
            <span class="route-number">${index + 1}</span>
            <div class="route-info">
                <strong>${cafe.name}</strong>
                <small>${cafe.city}</small>
            </div>
            <button class="btn-icon" onclick="toggleRouteCafe(${cafe.id})" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Optimize and Show Route
function optimizeAndShowRoute() {
    const selectedCafes = routeOptimizer.getSelectedCafes();
    
    if (selectedCafes.length === 0) {
        showToast('Please add at least one cafe to the route', 'warning');
        return;
    }
    
    if (selectedCafes.length === 1) {
        showToast('Add more cafes for route optimization', 'info');
        const cafe = selectedCafes[0];
        map.setCenter({ lat: cafe.lat, lng: cafe.lng });
        map.setZoom(15);
        return;
    }
    
    UIHelpers.showLoading('Optimizing route...');
    
    setTimeout(() => {
        // Open in Google Maps for navigation
        routeOptimizer.openInGoogleMaps(userLocation);
        
        // Show summary
        const summary = routeOptimizer.getRouteSummary(userLocation);
        showToast(`Route: ${summary.totalCafes} cafes, ${summary.totalDistance} km, ~${summary.estimatedTime} min`, 'success', 5000);
        
        UIHelpers.hideLoading();
    }, 500);
}

// Clear Route
function clearRoute() {
    UIHelpers.confirm('Clear all cafes from route?', () => {
        routeOptimizer.clear();
        updateRouteDisplay();
        displayCafes(filteredCafes);
        showToast('Route cleared', 'info');
    });
}

// Select Cafe on Map
function selectCafe(cafe) {
    selectedCafe = cafe;
    map.setCenter({ lat: cafe.lat, lng: cafe.lng });
    map.setZoom(15);
}

// Find Nearby Cafes
function findNearby() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }

    UIHelpers.showLoading('Finding your location...');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center map on user location
            map.setCenter(userLocation);
            map.setZoom(12);

            // Add user location marker
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location',
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: '#27ae60',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 3
                }
            });

            // Filter nearby cafes
            const nearbyCafes = currentCafes
                .map(cafe => ({
                    ...cafe,
                    distance: calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
                }))
                .filter(cafe => cafe.distance <= AppConfig.MAP_SETTINGS.nearbyRadius)
                .sort((a, b) => a.distance - b.distance);

            if (nearbyCafes.length > 0) {
                currentCafes = nearbyCafes;
                applyFiltersAndUpdate();
                showToast(`Found ${nearbyCafes.length} nearby cafes!`, 'success');
            } else {
                showToast('No cafes found nearby. Showing all cafes.', 'info');
            }

            UIHelpers.hideLoading();
        },
        (error) => {
            UIHelpers.hideLoading();
            showToast('Unable to retrieve your location', 'error');
        }
    );
}

// Calculate Distance (Haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Get Directions
function getDirections() {
    if (!selectedCafe) return;

    const destination = `${selectedCafe.lat},${selectedCafe.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
}

// View on Map
function viewOnMap() {
    if (!selectedCafe) return;

    closeModal();
    selectCafe(selectedCafe);

    // Find marker and show info window
    const markerData = markers.find(m => m.cafe.id === selectedCafe.id);
    if (markerData) {
        showInfoWindow(selectedCafe, markerData.marker);
    }
}

// Update Stats
function updateStats() {
    const totalCafes = filteredCafes.length;
    const cities = new Set(filteredCafes.map(c => c.city)).size;
    const avgRating = (filteredCafes.reduce((sum, c) => sum + parseFloat(c.rating), 0) / totalCafes).toFixed(1);

    document.getElementById('totalCafes').textContent = totalCafes;
    document.getElementById('totalCities').textContent = cities;
    document.getElementById('avgRating').textContent = avgRating;
}

// Switch Tab
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
    
    // Load tab-specific content
    if (tabName === 'favorites') {
        displayFavorites();
    } else if (tabName === 'history') {
        displayHistory();
    }
}

// Display Favorites
function displayFavorites() {
    const favoriteIds = storageManager.getFavorites();
    const favoriteCafes = cafesData.filter(cafe => favoriteIds.includes(cafe.id));
    
    const container = document.getElementById('favoritesList');
    if (!container) return;
    
    if (favoriteCafes.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-heart"></i>
                <p>No favorites yet</p>
                <p class="text-muted">Click the heart icon on cafes to add them</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = favoriteCafes.map(cafe => `
        <div class="cafe-item" onclick="openCafeModal({id: ${cafe.id}})">
            <h3>${cafe.name}</h3>
            <div class="rating-row">
                ${UIHelpers.generateStarRating(cafe.rating, false, 'small')}
                <span class="rating-value">${cafe.rating}</span>
            </div>
            <p><i class="fas fa-map-marker-alt"></i> ${cafe.city}</p>
        </div>
    `).join('');
}

// Display History
function displayHistory() {
    const history = storageManager.getVisitHistory();
    
    const container = document.getElementById('historyList');
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-history"></i>
                <p>No history yet</p>
                <p class="text-muted">Cafes you view will appear here</p>
            </div>
        `;
        return;
    }
    
    const historyCafes = history.map(item => {
        const cafe = cafesData.find(c => c.id === item.cafeId);
        return { ...cafe, visitedAt: item.visitedAt };
    }).filter(c => c.id);
    
    container.innerHTML = historyCafes.map(cafe => `
        <div class="cafe-item" onclick="openCafeModal({id: ${cafe.id}})">
            <h3>${cafe.name}</h3>
            <div class="rating-row">
                ${UIHelpers.generateStarRating(cafe.rating, false, 'small')}
                <span class="rating-value">${cafe.rating}</span>
            </div>
            <p><i class="fas fa-map-marker-alt"></i> ${cafe.city}</p>
            <p class="text-muted"><i class="fas fa-clock"></i> ${new Date(cafe.visitedAt).toLocaleDateString()}</p>
        </div>
    `).join('');
}

// Handle API Key Error
window.gm_authFailure = function() {
    UIHelpers.showLoading(`
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 15px;"></i>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">Google Maps API Key Required</h2>
            <p style="color: #7f8c8d; max-width: 500px; margin: 0 auto;">
                To use this application, you need to add your Google Maps API key in the config.js file.
            </p>
        </div>
    `);
};
