import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Coffee, Star, Heart, ShoppingCart, Flame, Leaf, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredCoffees = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 847,
    description: "Bright, floral notes with hints of citrus and wine. A truly exceptional single-origin experience.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    tags: ["Single Origin", "Light Roast", "Floral"],
    badge: "Best Seller",
    color: "from-yellow-400 to-orange-500",
    features: ["Organic", "Fair Trade", "Small Batch"]
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    price: 22.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 623,
    description: "Rich, full-bodied with chocolate undertones and a smooth, balanced finish.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80",
    tags: ["Medium Roast", "Balanced", "Chocolate"],
    badge: "Staff Pick",
    color: "from-amber-500 to-orange-600",
    features: ["Rainforest Alliance", "Direct Trade", "Premium"]
  },
  {
    id: 3,
    name: "Blue Mountain Reserve",
    origin: "Jamaica",
    price: 45.99,
    originalPrice: 52.99,
    rating: 5.0,
    reviews: 234,
    description: "The world's most sought-after coffee. Mild, smooth, and incredibly well-balanced.",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80",
    tags: ["Premium", "Mild", "Exclusive"],
    badge: "Limited Edition",
    color: "from-blue-400 to-blue-600",
    features: ["Certified Authentic", "Hand-picked", "Rare"]
  },
  {
    id: 4,
    name: "Italian Dark Roast",
    origin: "Italy",
    price: 19.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 1289,
    description: "Bold, intense flavor with a rich crema. Perfect for espresso lovers.",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=80",
    tags: ["Dark Roast", "Bold", "Espresso"],
    badge: "Classic",
    color: "from-gray-600 to-gray-800",
    features: ["Traditional", "Intense", "Rich Crema"]
  },
  {
    id: 5,
    name: "Hawaiian Kona",
    origin: "Hawaii",
    price: 38.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 456,
    description: "Smooth, rich flavor with low acidity and a unique nutty finish.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    tags: ["Premium", "Smooth", "Nutty"],
    badge: "Island Grown",
    color: "from-green-400 to-teal-500",
    features: ["Volcanic Soil", "100% Kona", "Authentic"]
  },
  {
    id: 6,
    name: "French Vanilla Blend",
    origin: "House Blend",
    price: 17.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 892,
    description: "Smooth medium roast with natural vanilla flavoring. Comfort in every cup.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
    tags: ["Flavored", "Smooth", "Vanilla"],
    badge: "Comfort Blend",
    color: "from-amber-400 to-yellow-500",
    features: ["Natural Flavoring", "Smooth", "Aromatic"]
  }
];

const CoffeeFeaturedSection = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredCoffees.length / 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredCoffees.length / 3));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(featuredCoffees.length / 3)) % Math.ceil(featuredCoffees.length / 3));
    setIsAutoPlaying(false);
  };

  const getBadgeColor = (badge) => {
    const colors = {
      "Best Seller": "from-red-500 to-pink-500",
      "Staff Pick": "from-blue-500 to-cyan-500",
      "Limited Edition": "from-purple-500 to-indigo-500",
      "Classic": "from-gray-500 to-gray-700",
      "Island Grown": "from-green-500 to-emerald-500",
      "Comfort Blend": "from-amber-500 to-orange-500"
    };
    return colors[badge] || "from-gray-500 to-gray-700";
  };

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Coffee Beans */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 bg-amber-400/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="text-amber-400 font-medium">Premium Selection</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Coffee
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Discover our handpicked selection of premium coffee beans from around the world. 
            Each blend tells a story of passion, tradition, and exceptional quality.
          </motion.p>
        </motion.div>

        {/* Coffee Cards Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto -ml-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto -mr-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex"
            >
              {Array.from({ length: Math.ceil(featuredCoffees.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                    {featuredCoffees.slice(slideIndex * 3, slideIndex * 3 + 3).map((coffee, index) => (
                      <motion.div
                        key={coffee.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                        whileHover={{ y: -10 }}
                        className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500"
                      >
                        {/* Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getBadgeColor(coffee.badge)}`}>
                            {coffee.badge}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <motion.button
                          onClick={() => toggleFavorite(coffee.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
                        >
                          <Heart 
                            className={`w-5 h-5 ${favorites.has(coffee.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                          />
                        </motion.button>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={coffee.image}
                            alt={coffee.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            whileHover={{ scale: 1.05 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-400">{coffee.origin}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm text-gray-300">{coffee.rating}</span>
                              <span className="text-sm text-gray-500">({coffee.reviews})</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                            {coffee.name}
                          </h3>

                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                            {coffee.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {coffee.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {coffee.features.map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded"
                              >
                                <Leaf className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Price and Action */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-white">${coffee.price}</span>
                              {coffee.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${coffee.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <motion.button
                              onClick={() => setSelectedCoffee(coffee)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-2 rounded-full font-semibold hover:from-amber-400 hover:to-orange-400 transition-all duration-300 flex items-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(featuredCoffees.length / 3) }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Coffee Details Modal */}
      <AnimatePresence>
        {selectedCoffee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCoffee(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedCoffee.name}</h3>
                <button
                  onClick={() => setSelectedCoffee(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedCoffee.image}
                alt={selectedCoffee.name}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              
              <p className="text-gray-300 mb-6">{selectedCoffee.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Origin</h4>
                  <p className="text-gray-300">{selectedCoffee.origin}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Rating</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-300">{selectedCoffee.rating} ({selectedCoffee.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-white">${selectedCoffee.price}</span>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:from-amber-400 hover:to-orange-400 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoffeeFeaturedSection;