// Global Variables
let map;
let markers = [];
let infoWindow;
let currentCafes = [...cafesData];
let selectedCafe = null;
let userLocation = null;

// Initialize Map
function initMap() {
    // Center of Pakistan
    const pakistanCenter = { lat: 30.3753, lng: 69.3451 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: pakistanCenter,
        zoom: 6,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    infoWindow = new google.maps.InfoWindow();

    // Initialize app
    initializeApp();
}

// Initialize Application
function initializeApp() {
    // Hide loading overlay
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1000);

    // Display all cafes
    displayCafes(currentCafes);
    createMarkers(currentCafes);
    updateStats();

    // Setup event listeners
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // City filter
    document.getElementById('cityFilter').addEventListener('change', handleCityFilter);

    // Find me button
    document.getElementById('findMeBtn').addEventListener('click', findNearby);

    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('cafeModal').addEventListener('click', (e) => {
        if (e.target.id === 'cafeModal') {
            closeModal();
        }
    });

    // Modal buttons
    document.getElementById('modalDirections').addEventListener('click', getDirections);
    document.getElementById('modalViewOnMap').addEventListener('click', viewOnMap);
}

// Display Cafes in Sidebar
function displayCafes(cafes) {
    const cafeList = document.getElementById('cafeList');
    cafeList.innerHTML = '';

    if (cafes.length === 0) {
        cafeList.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 20px;">No cafes found</p>';
        return;
    }

    cafes.forEach(cafe => {
        const cafeItem = document.createElement('div');
        cafeItem.className = 'cafe-item';
        cafeItem.innerHTML = `
            <div class="cafe-name">${cafe.name}</div>
            <div class="cafe-address">${cafe.address}</div>
            <span class="cafe-city">${cafe.city}</span>
        `;
        cafeItem.addEventListener('click', () => selectCafe(cafe));
        cafeList.appendChild(cafeItem);
    });
}

// Create Map Markers
function createMarkers(cafes) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    cafes.forEach(cafe => {
        const marker = new google.maps.Marker({
            position: { lat: cafe.lat, lng: cafe.lng },
            map: map,
            title: cafe.name,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
        });

        marker.addListener('click', () => {
            selectCafe(cafe);
            showInfoWindow(cafe, marker);
        });

        markers.push({ marker, cafe });
    });

    // Adjust map bounds to show all markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ marker }) => {
            bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
        
        // Prevent too much zoom for single markers
        google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
            if (map.getZoom() > 15) {
                map.setZoom(15);
            }
        });
    }
}

// Show Info Window on Map
function showInfoWindow(cafe, marker) {
    const stars = '⭐'.repeat(Math.floor(cafe.rating));
    const content = `
        <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #2c3e50;">${cafe.name}</h3>
            <div style="color: #f39c12; margin-bottom: 8px;">${stars} ${cafe.rating}</div>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Address:</strong> ${cafe.address}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>City:</strong> ${cafe.city}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Phone:</strong> ${cafe.phone}</p>
            <button onclick="showCafeDetails(${cafe.id})" style="margin-top: 10px; padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
                View Details
            </button>
        </div>
    `;
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
}

// Select Cafe
function selectCafe(cafe) {
    selectedCafe = cafe;

    // Update active state in list
    document.querySelectorAll('.cafe-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget?.classList.add('active');

    // Pan to cafe on map
    map.panTo({ lat: cafe.lat, lng: cafe.lng });
    map.setZoom(14);

    // Find and animate marker
    const markerData = markers.find(m => m.cafe.id === cafe.id);
    if (markerData) {
        markerData.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            markerData.marker.setAnimation(null);
        }, 2000);
    }
}

// Show Cafe Details Modal
function showCafeDetails(cafeId) {
    const cafe = cafesData.find(c => c.id === cafeId);
    if (!cafe) return;

    selectedCafe = cafe;

    // Populate modal
    document.getElementById('modalCafeName').textContent = cafe.name;
    document.getElementById('modalAddress').textContent = cafe.address;
    document.getElementById('modalCity').textContent = cafe.city;
    document.getElementById('modalPhone').textContent = cafe.phone;
    
    // Rating stars
    const ratingDiv = document.getElementById('modalRating');
    const stars = '⭐'.repeat(Math.floor(cafe.rating));
    ratingDiv.innerHTML = `${stars} <span style="color: #7f8c8d;">${cafe.rating}/5</span>`;

    // Description
    if (cafe.description) {
        document.getElementById('modalDescription').textContent = cafe.description;
        document.getElementById('modalDescriptionContainer').style.display = 'flex';
    } else {
        document.getElementById('modalDescriptionContainer').style.display = 'none';
    }

    // Show modal
    document.getElementById('cafeModal').classList.add('show');
}

// Make showCafeDetails globally accessible
window.showCafeDetails = showCafeDetails;

// Close Modal
function closeModal() {
    document.getElementById('cafeModal').classList.remove('show');
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cityFilter = document.getElementById('cityFilter').value;

    currentCafes = cafesData.filter(cafe => {
        const matchesSearch = cafe.name.toLowerCase().includes(searchTerm) ||
                            cafe.address.toLowerCase().includes(searchTerm);
        const matchesCity = !cityFilter || cafe.city === cityFilter;
        return matchesSearch && matchesCity;
    });

    displayCafes(currentCafes);
    createMarkers(currentCafes);
    updateStats();
}

// Handle City Filter
function handleCityFilter(e) {
    const city = e.target.value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    currentCafes = cafesData.filter(cafe => {
        const matchesCity = !city || cafe.city === city;
        const matchesSearch = cafe.name.toLowerCase().includes(searchTerm) ||
                            cafe.address.toLowerCase().includes(searchTerm);
        return matchesCity && matchesSearch;
    });

    displayCafes(currentCafes);
    createMarkers(currentCafes);
    updateStats();
}

// Update Statistics
function updateStats() {
    document.getElementById('totalCafes').textContent = currentCafes.length;
    
    const uniqueCities = [...new Set(currentCafes.map(cafe => cafe.city))];
    document.getElementById('totalCities').textContent = uniqueCities.length;
}

// Find Nearby Cafes
function findNearby() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('hidden');
    loadingOverlay.querySelector('p').textContent = 'Finding your location...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Add user location marker
            new google.maps.Marker({
                position: userLocation,
                map: map,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                },
                title: 'Your Location'
            });

            // Calculate distances and sort
            const cafesWithDistance = cafesData.map(cafe => {
                const distance = calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    cafe.lat,
                    cafe.lng
                );
                return { ...cafe, distance };
            });

            cafesWithDistance.sort((a, b) => a.distance - b.distance);
            currentCafes = cafesWithDistance.slice(0, 10); // Show nearest 10

            displayCafes(currentCafes);
            createMarkers(currentCafes);
            updateStats();

            // Pan to user location
            map.panTo(userLocation);
            map.setZoom(12);

            loadingOverlay.classList.add('hidden');
            loadingOverlay.querySelector('p').textContent = 'Loading Map...';

            alert(`Found ${currentCafes.length} nearby cafes!`);
        },
        (error) => {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.querySelector('p').textContent = 'Loading Map...';
            alert('Unable to retrieve your location. Please enable location services.');
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

// Handle API Key Error
window.gm_authFailure = function() {
    document.getElementById('loadingOverlay').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 15px;"></i>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">Google Maps API Key Required</h2>
            <p style="color: #7f8c8d; max-width: 500px; margin: 0 auto;">
                To use this application, you need to add your Google Maps API key in the index.html file.
                Replace "YOUR_API_KEY" with your actual API key from Google Cloud Console.
            </p>
            <p style="color: #7f8c8d; margin-top: 15px;">
                <strong>Note:</strong> The cafe data and markers are ready to display once a valid API key is added.
            </p>
        </div>
    `;
};
