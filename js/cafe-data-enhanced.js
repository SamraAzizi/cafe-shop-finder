// Enhanced Cafe Data for Pakistan Cities with Advanced Features
const cafesData = [
    // Karachi Cafes
    {
        id: 1,
        name: "The Second Floor (T2F)",
        address: "Plot 2C, Lane 2, Khayaban-e-Nishat, Phase 6 DHA",
        city: "Karachi",
        lat: 24.8138,
        lng: 67.0703,
        phone: "+92 21 35291528",
        rating: 4.5,
        priceRange: "$$",
        description: "Cultural hub with cafe, bookstore, and event space. Perfect for meetings and creative work.",
        amenities: ["WiFi", "Parking", "Outdoor Seating", "Bookstore", "Events"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800"
        ],
        specialties: ["Coffee", "Books", "Cultural Events"]
    },
    {
        id: 2,
        name: "Espresso",
        address: "Boat Basin, Clifton",
        city: "Karachi",
        lat: 24.8085,
        lng: 67.0299,
        phone: "+92 21 35835584",
        rating: 4.3,
        priceRange: "$$",
        description: "Popular chain cafe known for excellent coffee and desserts.",
        amenities: ["WiFi", "AC", "Delivery", "Outdoor Seating"],
        openingHours: "8:00 AM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
        ],
        specialties: ["Espresso", "Desserts", "Breakfast"]
    },
    {
        id: 3,
        name: "Koel Cafe",
        address: "3-C, 26th Street, Khayaban-e-Badar, Phase 6 DHA",
        city: "Karachi",
        lat: 24.8145,
        lng: 67.0665,
        phone: "+92 21 35291905",
        rating: 4.6,
        priceRange: "$$$",
        description: "Cozy cafe with artistic ambiance and great food menu.",
        amenities: ["WiFi", "Parking", "Art Gallery", "Live Music"],
        openingHours: "11:00 AM - 11:30 PM",
        images: [
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        ],
        specialties: ["Artisan Coffee", "Brunch", "Art"]
    },
    {
        id: 4,
        name: "Mocca Coffee",
        address: "Multiple Locations in Karachi",
        city: "Karachi",
        lat: 24.8607,
        lng: 67.0011,
        phone: "+92 300 8241234",
        rating: 4.4,
        priceRange: "$$",
        description: "Local coffee chain with specialty brews and comfortable seating.",
        amenities: ["WiFi", "AC", "Multiple Outlets", "Study-Friendly"],
        openingHours: "7:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
            "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800"
        ],
        specialties: ["Specialty Coffee", "Pastries", "Cold Brew"]
    },
    {
        id: 5,
        name: "The Vintage Cafe",
        address: "Shaheed-e-Millat Road, Bahadurabad",
        city: "Karachi",
        lat: 24.8873,
        lng: 67.0678,
        phone: "+92 21 34921234",
        rating: 4.2,
        priceRange: "$$",
        description: "Vintage-themed cafe with nostalgic decor and good food.",
        amenities: ["WiFi", "Indoor Seating", "Family-Friendly", "Parking"],
        openingHours: "12:00 PM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
            "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800"
        ],
        specialties: ["Vintage Decor", "Continental Food", "Shakes"]
    },

    // Lahore Cafes
    {
        id: 6,
        name: "The Cuckoo's Den",
        address: "Fort Road, near Lahore Fort",
        city: "Lahore",
        lat: 31.5880,
        lng: 74.3120,
        phone: "+92 42 37636360",
        rating: 4.7,
        priceRange: "$$$",
        description: "Rooftop cafe with stunning views of Badshahi Mosque and traditional cuisine.",
        amenities: ["Rooftop", "Historic View", "Traditional Decor", "Parking"],
        openingHours: "12:00 PM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800"
        ],
        specialties: ["Traditional Food", "Rooftop Dining", "Heritage"]
    },
    {
        id: 7,
        name: "Coffee Wagera",
        address: "MM Alam Road, Gulberg III",
        city: "Lahore",
        lat: 31.5106,
        lng: 74.3502,
        phone: "+92 42 35756789",
        rating: 4.5,
        priceRange: "$$",
        description: "Trendy cafe popular among young crowd, great coffee and ambiance.",
        amenities: ["WiFi", "AC", "Instagrammable", "Outdoor Seating"],
        openingHours: "10:00 AM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
        ],
        specialties: ["Coffee", "Shakes", "Modern Vibe"]
    },
    {
        id: 8,
        name: "Cafe Aylanto",
        address: "46-A, MM Alam Road, Gulberg III",
        city: "Lahore",
        lat: 31.5123,
        lng: 74.3528,
        phone: "+92 42 35756187",
        rating: 4.6,
        priceRange: "$$$",
        description: "Upscale cafe with Mediterranean and continental cuisine.",
        amenities: ["WiFi", "Valet Parking", "Fine Dining", "AC"],
        openingHours: "12:00 PM - 11:30 PM",
        images: [
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
        ],
        specialties: ["Mediterranean", "Fine Dining", "Wine"]
    },
    {
        id: 9,
        name: "Gloria Jean's Coffees",
        address: "Packages Mall, Walton Road",
        city: "Lahore",
        lat: 31.4757,
        lng: 74.2710,
        phone: "+92 42 35840123",
        rating: 4.3,
        priceRange: "$$",
        description: "International coffee chain serving premium beverages.",
        amenities: ["WiFi", "AC", "Mall Location", "Delivery"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800"
        ],
        specialties: ["Coffee", "Smoothies", "Pastries"]
    },
    {
        id: 10,
        name: "Cosa Nostra",
        address: "F-6 Markaz",
        city: "Lahore",
        lat: 31.4967,
        lng: 74.3283,
        phone: "+92 42 35871234",
        rating: 4.4,
        priceRange: "$$",
        description: "Italian cafe with authentic pizzas and pasta.",
        amenities: ["WiFi", "Outdoor Seating", "Italian Cuisine", "Parking"],
        openingHours: "11:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800"
        ],
        specialties: ["Pizza", "Pasta", "Italian Coffee"]
    },

    // Islamabad Cafes
    {
        id: 11,
        name: "The Monal",
        address: "Pir Sohawa Road, Margalla Hills",
        city: "Islamabad",
        lat: 33.7474,
        lng: 73.0911,
        phone: "+92 51 2898888",
        rating: 4.8,
        priceRange: "$$$",
        description: "Iconic hilltop restaurant with panoramic city views and diverse menu.",
        amenities: ["Scenic View", "Valet Parking", "Outdoor Seating", "Photography"],
        openingHours: "12:00 PM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
        ],
        specialties: ["Mountain View", "Pakistani Food", "BBQ"]
    },
    {
        id: 12,
        name: "Burning Brownie",
        address: "F-7 Markaz",
        city: "Islamabad",
        lat: 33.7251,
        lng: 73.0551,
        phone: "+92 51 2650123",
        rating: 4.4,
        priceRange: "$$",
        description: "Popular dessert cafe specializing in brownies and sweet treats.",
        amenities: ["WiFi", "AC", "Dessert Paradise", "Delivery"],
        openingHours: "2:00 PM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
            "https://images.unsplash.com/photo-1586040140378-b5cbf15f6ffd?w=800"
        ],
        specialties: ["Brownies", "Desserts", "Ice Cream"]
    },
    {
        id: 13,
        name: "Gloria Jean's Coffees",
        address: "Centaurus Mall, F-8",
        city: "Islamabad",
        lat: 33.7077,
        lng: 73.0515,
        phone: "+92 51 8739123",
        rating: 4.3,
        priceRange: "$$",
        description: "Premium coffee chain with comfortable seating.",
        amenities: ["WiFi", "AC", "Mall Location", "Study-Friendly"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
        ],
        specialties: ["Coffee", "Beverages", "Bakery"]
    },
    {
        id: 14,
        name: "Jessie's",
        address: "F-6 Super Market",
        city: "Islamabad",
        lat: 33.7177,
        lng: 73.0571,
        phone: "+92 51 2820567",
        rating: 4.5,
        priceRange: "$$",
        description: "Cozy cafe with homemade food and welcoming atmosphere.",
        amenities: ["WiFi", "Homemade Food", "Cozy", "Parking"],
        openingHours: "8:00 AM - 10:00 PM",
        images: [
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800"
        ],
        specialties: ["Breakfast", "Homemade", "Coffee"]
    },
    {
        id: 15,
        name: "Des Pardes",
        address: "Beverly Center, F-7",
        city: "Islamabad",
        lat: 33.7233,
        lng: 73.0543,
        phone: "+92 51 2651234",
        rating: 4.2,
        priceRange: "$$",
        description: "Traditional Pakistani restaurant and cafe with authentic flavors.",
        amenities: ["WiFi", "Traditional Decor", "Family-Friendly", "Parking"],
        openingHours: "11:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
        ],
        specialties: ["Pakistani Cuisine", "Traditional", "Tea"]
    },

    // Rawalpindi Cafes
    {
        id: 16,
        name: "Chaaye Khana",
        address: "Saddar, The Mall",
        city: "Rawalpindi",
        lat: 33.5998,
        lng: 73.0445,
        phone: "+92 51 5562123",
        rating: 4.4,
        priceRange: "$",
        description: "Traditional tea house with modern twist and great ambiance.",
        amenities: ["WiFi", "Traditional Tea", "Snacks", "Budget-Friendly"],
        openingHours: "9:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1542332213-31f87348057f?w=800",
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800"
        ],
        specialties: ["Desi Tea", "Samosas", "Traditional"]
    },
    {
        id: 17,
        name: "Second Cup Coffee Co.",
        address: "Bahria Town Phase 4",
        city: "Rawalpindi",
        lat: 33.5223,
        lng: 73.1146,
        phone: "+92 51 5439876",
        rating: 4.3,
        priceRange: "$$",
        description: "Canadian coffee chain with quality brews and comfortable setting.",
        amenities: ["WiFi", "AC", "Study-Friendly", "Parking"],
        openingHours: "8:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
        ],
        specialties: ["Coffee", "Smoothies", "Sandwiches"]
    },
    {
        id: 18,
        name: "Kitchen Cuisine",
        address: "Saddar, Haider Road",
        city: "Rawalpindi",
        lat: 33.5964,
        lng: 73.0476,
        phone: "+92 51 5512345",
        rating: 4.2,
        priceRange: "$$",
        description: "Local favorite with diverse menu and friendly service.",
        amenities: ["WiFi", "Family-Friendly", "Diverse Menu", "Parking"],
        openingHours: "11:00 AM - 11:30 PM",
        images: [
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800"
        ],
        specialties: ["Pakistani Food", "Continental", "Burgers"]
    },

    // Peshawar Cafes
    {
        id: 19,
        name: "Chief Burger",
        address: "University Road",
        city: "Peshawar",
        lat: 34.0080,
        lng: 71.5787,
        phone: "+92 91 5842123",
        rating: 4.3,
        priceRange: "$",
        description: "Popular fast food spot known for burgers and fries.",
        amenities: ["WiFi", "Fast Food", "Budget-Friendly", "Takeaway"],
        openingHours: "12:00 PM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
            "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"
        ],
        specialties: ["Burgers", "Fries", "Shakes"]
    },
    {
        id: 20,
        name: "Poet Cafe & Restaurant",
        address: "Hayatabad Phase 1",
        city: "Peshawar",
        lat: 33.9716,
        lng: 71.4048,
        phone: "+92 91 5812456",
        rating: 4.4,
        priceRange: "$$",
        description: "Themed cafe with poetic ambiance and quality food.",
        amenities: ["WiFi", "Themed Decor", "Poetry Nights", "Parking"],
        openingHours: "2:00 PM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        ],
        specialties: ["Coffee", "Poetry", "Ambiance"]
    },
    {
        id: 21,
        name: "Gloria Jean's Coffees",
        address: "Saddar Road",
        city: "Peshawar",
        lat: 34.0091,
        lng: 71.5775,
        phone: "+92 91 5873456",
        rating: 4.2,
        priceRange: "$$",
        description: "International coffee chain with consistent quality.",
        amenities: ["WiFi", "AC", "Central Location", "Delivery"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
        ],
        specialties: ["Coffee", "Beverages", "Pastries"]
    },

    // Multan Cafes
    {
        id: 22,
        name: "Cafe Crunch",
        address: "Abdali Road",
        city: "Multan",
        lat: 30.1975,
        lng: 71.4767,
        phone: "+92 61 4567890",
        rating: 4.3,
        priceRange: "$$",
        description: "Modern cafe with great food and vibrant atmosphere.",
        amenities: ["WiFi", "AC", "Modern Decor", "Parking"],
        openingHours: "11:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        ],
        specialties: ["Burgers", "Coffee", "Desserts"]
    },
    {
        id: 23,
        name: "Copper Kettle",
        address: "Gulgasht Colony",
        city: "Multan",
        lat: 30.1870,
        lng: 71.4869,
        phone: "+92 61 4582345",
        rating: 4.4,
        priceRange: "$$",
        description: "Cozy cafe known for excellent tea and snacks.",
        amenities: ["WiFi", "Cozy", "Tea Selection", "Outdoor Seating"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1542332213-31f87348057f?w=800",
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800"
        ],
        specialties: ["Tea", "Snacks", "Atmosphere"]
    },
    {
        id: 24,
        name: "De Licious",
        address: "Bypass Road",
        city: "Multan",
        lat: 30.2158,
        lng: 71.4691,
        phone: "+92 61 4521234",
        rating: 4.2,
        priceRange: "$$",
        description: "Popular spot for fast food and casual dining.",
        amenities: ["WiFi", "Family-Friendly", "Fast Service", "Parking"],
        openingHours: "12:00 PM - 12:00 AM",
        images: [
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800"
        ],
        specialties: ["Fast Food", "Burgers", "Pizzas"]
    },

    // Faisalabad Cafes
    {
        id: 25,
        name: "Cafe One",
        address: "Kohinoor City",
        city: "Faisalabad",
        lat: 31.3981,
        lng: 73.1361,
        phone: "+92 41 8765432",
        rating: 4.4,
        priceRange: "$$",
        description: "Modern cafe with comfortable seating and diverse menu.",
        amenities: ["WiFi", "AC", "Study-Friendly", "Parking"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
        ],
        specialties: ["Coffee", "Food", "Ambiance"]
    },
    {
        id: 26,
        name: "Cafe De Khan",
        address: "Susan Road",
        city: "Faisalabad",
        lat: 31.4181,
        lng: 73.0795,
        phone: "+92 41 8733456",
        rating: 4.3,
        priceRange: "$$",
        description: "Local favorite with great ambiance and food.",
        amenities: ["WiFi", "Indoor Seating", "Good Service", "Parking"],
        openingHours: "11:00 AM - 11:30 PM",
        images: [
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800"
        ],
        specialties: ["Local Cuisine", "Coffee", "Desserts"]
    },
    {
        id: 27,
        name: "Coffee Inn",
        address: "D Ground, Civil Lines",
        city: "Faisalabad",
        lat: 31.4286,
        lng: 73.0751,
        phone: "+92 41 8542345",
        rating: 4.2,
        priceRange: "$",
        description: "Popular hangout spot with quality coffee and snacks.",
        amenities: ["WiFi", "Budget-Friendly", "Casual", "Quick Service"],
        openingHours: "9:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800"
        ],
        specialties: ["Coffee", "Snacks", "Tea"]
    },

    // Quetta Cafes
    {
        id: 28,
        name: "Cafe China Town",
        address: "Jinnah Road",
        city: "Quetta",
        lat: 30.1839,
        lng: 66.9990,
        phone: "+92 81 2840123",
        rating: 4.2,
        priceRange: "$$",
        description: "Popular cafe with Chinese and continental cuisine.",
        amenities: ["WiFi", "Chinese Food", "Family-Friendly", "Parking"],
        openingHours: "12:00 PM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800"
        ],
        specialties: ["Chinese", "Continental", "Tea"]
    },
    {
        id: 29,
        name: "Gloria Jean's Coffees",
        address: "Zarghoon Road",
        city: "Quetta",
        lat: 30.1887,
        lng: 67.0022,
        phone: "+92 81 2823456",
        rating: 4.3,
        priceRange: "$$",
        description: "International coffee chain serving premium beverages.",
        amenities: ["WiFi", "AC", "Premium Coffee", "Delivery"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
        ],
        specialties: ["Coffee", "Smoothies", "Bakery"]
    },

    // Hyderabad Cafes
    {
        id: 30,
        name: "Cafe De Hyderabad",
        address: "Auto Bahn Road",
        city: "Hyderabad",
        lat: 25.3960,
        lng: 68.3578,
        phone: "+92 22 2765432",
        rating: 4.2,
        priceRange: "$$",
        description: "Local cafe with traditional and modern menu items.",
        amenities: ["WiFi", "Traditional & Modern", "Family-Friendly", "Parking"],
        openingHours: "11:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        ],
        specialties: ["Local Cuisine", "Coffee", "Tea"]
    },
    {
        id: 31,
        name: "Coffee & Co",
        address: "Saddar, Thandi Sarak",
        city: "Hyderabad",
        lat: 25.3826,
        lng: 68.3737,
        phone: "+92 22 2781234",
        rating: 4.1,
        priceRange: "$",
        description: "Cozy cafe perfect for friends and family gatherings.",
        amenities: ["WiFi", "Cozy", "Budget-Friendly", "Central Location"],
        openingHours: "10:00 AM - 11:00 PM",
        images: [
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800"
        ],
        specialties: ["Coffee", "Snacks", "Casual"]
    },
    {
        id: 32,
        name: "The Urban Cafe",
        address: "Latifabad Unit 7",
        city: "Hyderabad",
        lat: 25.3783,
        lng: 68.3467,
        phone: "+92 22 3845678",
        rating: 4.3,
        priceRange: "$$",
        description: "Modern urban cafe with trendy decor and good food.",
        amenities: ["WiFi", "Modern Decor", "Instagrammable", "Parking"],
        openingHours: "11:00 AM - 11:30 PM",
        images: [
            "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
        ],
        specialties: ["Modern Cuisine", "Coffee", "Desserts"]
    }
];
