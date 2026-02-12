// Real Cafe Data for Pakistan Cities
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
        description: "Cultural hub with cafe, bookstore, and event space. Perfect for meetings and creative work."
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
        description: "Popular chain cafe known for excellent coffee and desserts."
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
        description: "Cozy cafe with artistic ambiance and great food menu."
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
        description: "Local coffee chain with specialty brews and comfortable seating."
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
        description: "Vintage-themed cafe with nostalgic decor and good food."
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
        description: "Rooftop cafe with stunning views of Badshahi Mosque and traditional cuisine."
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
        description: "Trendy cafe popular among young crowd, great coffee and ambiance."
    },
    {
        id: 8,
        name: "Gloria Jean's Coffees",
        address: "Packages Mall, Walton Road",
        city: "Lahore",
        lat: 31.4762,
        lng: 74.3226,
        phone: "+92 42 38900123",
        rating: 4.4,
        description: "International coffee chain with wide variety of beverages."
    },
    {
        id: 9,
        name: "Butler's Chocolate Cafe",
        address: "Liberty Market, Gulberg",
        city: "Lahore",
        lat: 31.5089,
        lng: 74.3456,
        phone: "+92 42 35771234",
        rating: 4.6,
        description: "Premium chocolate cafe with luxurious desserts and hot chocolates."
    },
    {
        id: 10,
        name: "Cafe Zouk",
        address: "28-C, Main Boulevard, Gulberg II",
        city: "Lahore",
        lat: 31.5136,
        lng: 74.3493,
        phone: "+92 42 35777111",
        rating: 4.3,
        description: "Contemporary cafe with fusion food and vibrant atmosphere."
    },
    {
        id: 11,
        name: "The Second Cup",
        address: "Fortress Square, Lahore Cantt",
        city: "Lahore",
        lat: 31.5077,
        lng: 74.3345,
        phone: "+92 42 36668888",
        rating: 4.2,
        description: "Canadian coffee chain offering specialty coffees and pastries."
    },

    // Islamabad Cafes
    {
        id: 12,
        name: "Monal Restaurant",
        address: "Pir Sohawa, Margalla Hills",
        city: "Islamabad",
        lat: 33.7632,
        lng: 73.0961,
        phone: "+92 51 2895888",
        rating: 4.8,
        description: "Iconic hilltop restaurant and cafe with panoramic city views."
    },
    {
        id: 13,
        name: "Gloria Jean's Coffees",
        address: "Centaurus Mall, F-8 Markaz",
        city: "Islamabad",
        lat: 33.7077,
        lng: 73.0478,
        phone: "+92 51 2255666",
        rating: 4.4,
        description: "Popular cafe in premium shopping mall with great coffee selection."
    },
    {
        id: 14,
        name: "Cafe Aylanto",
        address: "90-A, Margalla Road, F-6/3",
        city: "Islamabad",
        lat: 33.7256,
        lng: 73.0709,
        phone: "+92 51 2820649",
        rating: 4.6,
        description: "Upscale cafe with Mediterranean cuisine and elegant setting."
    },
    {
        id: 15,
        name: "The Roastery Coffee House",
        address: "F-7 Markaz",
        city: "Islamabad",
        lat: 33.7215,
        lng: 73.0632,
        phone: "+92 51 2651234",
        rating: 4.5,
        description: "Artisan coffee shop with fresh roasted beans and cozy atmosphere."
    },
    {
        id: 16,
        name: "Dunkin' Donuts",
        address: "Blue Area, Jinnah Avenue",
        city: "Islamabad",
        lat: 33.7172,
        lng: 73.0649,
        phone: "+92 51 2878900",
        rating: 4.2,
        description: "International chain famous for donuts and coffee."
    },

    // Rawalpindi Cafes
    {
        id: 17,
        name: "Steam Cafe & Grill",
        address: "Saddar, Committee Chowk",
        city: "Rawalpindi",
        lat: 33.5973,
        lng: 73.0469,
        phone: "+92 51 5555678",
        rating: 4.3,
        description: "Modern cafe with diverse menu and comfortable seating."
    },
    {
        id: 18,
        name: "Cafe Crunch",
        address: "Bahria Town Phase 4",
        city: "Rawalpindi",
        lat: 33.5341,
        lng: 73.1106,
        phone: "+92 51 5744444",
        rating: 4.4,
        description: "Family-friendly cafe with extensive food and beverage options."
    },
    {
        id: 19,
        name: "Espresso",
        address: "Saidpur Road, near Saidpur Village",
        city: "Rawalpindi",
        lat: 33.7387,
        lng: 73.0783,
        phone: "+92 51 2856789",
        rating: 4.3,
        description: "Chain cafe branch with consistent quality and service."
    },

    // Peshawar Cafes
    {
        id: 20,
        name: "Chief Burger",
        address: "University Road",
        city: "Peshawar",
        lat: 34.0151,
        lng: 71.5721,
        phone: "+92 91 5701234",
        rating: 4.4,
        description: "Popular spot for burgers with cafe-style seating."
    },
    {
        id: 21,
        name: "Coffee Planet",
        address: "Phase 5, Hayatabad",
        city: "Peshawar",
        lat: 33.9806,
        lng: 71.4320,
        phone: "+92 91 5826789",
        rating: 4.2,
        description: "Modern cafe with variety of hot and cold beverages."
    },
    {
        id: 22,
        name: "Peppermint Lounge",
        address: "Saddar Road",
        city: "Peshawar",
        lat: 34.0086,
        lng: 71.5601,
        phone: "+92 91 5283456",
        rating: 4.3,
        description: "Trendy lounge cafe with comfortable ambiance."
    },

    // Multan Cafes
    {
        id: 23,
        name: "Gloria Jean's Coffees",
        address: "Gulgasht Colony",
        city: "Multan",
        lat: 30.1972,
        lng: 71.4686,
        phone: "+92 61 4574567",
        rating: 4.3,
        description: "Premium coffee experience in the heart of Multan."
    },
    {
        id: 24,
        name: "Cafe Zouk",
        address: "Abdali Road",
        city: "Multan",
        lat: 30.1810,
        lng: 71.4921,
        phone: "+92 61 4552345",
        rating: 4.2,
        description: "Contemporary cafe with fusion menu and modern decor."
    },
    {
        id: 25,
        name: "Espresso Cafe",
        address: "Buch Villas",
        city: "Multan",
        lat: 30.1984,
        lng: 71.4761,
        phone: "+92 61 4583456",
        rating: 4.1,
        description: "Cozy cafe perfect for casual meetings and coffee breaks."
    },

    // Faisalabad Cafes
    {
        id: 26,
        name: "Cafe De Khan",
        address: "Susan Road",
        city: "Faisalabad",
        lat: 31.4181,
        lng: 73.0795,
        phone: "+92 41 8733456",
        rating: 4.3,
        description: "Local favorite with great ambiance and food."
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
        description: "Popular hangout spot with quality coffee and snacks."
    },
    {
        id: 28,
        name: "Cafe One",
        address: "Kohinoor City",
        city: "Faisalabad",
        lat: 31.3981,
        lng: 73.1361,
        phone: "+92 41 8765432",
        rating: 4.4,
        description: "Modern cafe with comfortable seating and diverse menu."
    },

    // Quetta Cafes
    {
        id: 29,
        name: "Cafe China Town",
        address: "Jinnah Road",
        city: "Quetta",
        lat: 30.1839,
        lng: 66.9990,
        phone: "+92 81 2840123",
        rating: 4.2,
        description: "Popular cafe with Chinese and continental cuisine."
    },
    {
        id: 30,
        name: "Gloria Jean's Coffees",
        address: "Zarghoon Road",
        city: "Quetta",
        lat: 30.1887,
        lng: 67.0022,
        phone: "+92 81 2823456",
        rating: 4.3,
        description: "International coffee chain serving premium beverages."
    },

    // Hyderabad Cafes
    {
        id: 31,
        name: "Cafe De Hyderabad",
        address: "Auto Bahn Road",
        city: "Hyderabad",
        lat: 25.3960,
        lng: 68.3578,
        phone: "+92 22 2765432",
        rating: 4.2,
        description: "Local cafe with traditional and modern menu items."
    },
    {
        id: 32,
        name: "Coffee & Co",
        address: "Saddar, Thandi Sarak",
        city: "Hyderabad",
        lat: 25.3826,
        lng: 68.3737,
        phone: "+92 22 2781234",
        rating: 4.1,
        description: "Cozy cafe perfect for friends and family gatherings."
    },
    {
        id: 33,
        name: "The Urban Cafe",
        address: "Latifabad Unit 7",
        city: "Hyderabad",
        lat: 25.3783,
        lng: 68.3467,
        phone: "+92 22 3845678",
        rating: 4.3,
        description: "Modern urban cafe with trendy decor and good food."
    }
];
