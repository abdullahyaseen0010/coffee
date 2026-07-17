import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Star, ArrowRight, Play, Volume2, Heart, Clock, MapPin } from 'lucide-react';

const heroImages = [
  {
    id: 1,
    title: "Premium Arabica Blend",
    subtitle: "Handcrafted Excellence",
    description: "Experience the rich, complex flavors of our signature blend, carefully roasted to perfection.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    color: "from-amber-600 to-orange-600"
  },
  {
    id: 2,
    title: "Artisan Latte Art",
    subtitle: "Crafted with Passion",
    description: "Our skilled baristas create beautiful latte art that's almost too pretty to drink.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    color: "from-amber-500 to-yellow-600"
  },
  {
    id: 3,
    title: "Cozy Coffee Culture",
    subtitle: "Your Third Place",
    description: "Join our community of coffee lovers in our warm, welcoming atmosphere.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    color: "from-orange-600 to-red-600"
  }
];

const stats = [
  { icon: Coffee, value: "50K+", label: "Cups Served" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Heart, value: "15K+", label: "Happy Customers" },
  { icon: Clock, value: "24/7", label: "Fresh Roasted" }
];

const CoffeeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Coffee Beans */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-3 bg-amber-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Large Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-red-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 270, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentImage.image})`,
                filter: 'brightness(0.3) contrast(1.1) saturate(1.2)'
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${currentImage.color} opacity-20`} />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Coffee className="w-4 h-4 text-amber-400" />
              </motion.div>
              <span className="text-amber-400 text-sm font-medium">Premium Coffee Experience</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold text-white leading-tight"
                >
                  {currentImage.title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={index === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500" : ""}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl text-amber-400 font-medium"
                >
                  {currentImage.subtitle}
                </motion.p>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg text-gray-300 max-w-lg leading-relaxed"
                >
                  {currentImage.description}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-amber-500 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Order Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? <Volume2 className="w-3 h-3 text-black" /> : <Play className="w-3 h-3 text-black ml-0.5" />}
                </motion.div>
                Watch Story
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full mb-2 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-amber-400" />
                  </motion.div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Interactive Coffee Cup */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative"
            >
              {/* Coffee Cup Container */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-80 h-80 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-full backdrop-blur-sm border border-amber-500/30 flex items-center justify-center"
              >
                {/* Inner Cup */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="w-60 h-60 bg-gradient-to-br from-amber-800/30 to-orange-800/30 rounded-full border-2 border-amber-500/40 flex items-center justify-center relative overflow-hidden"
                >
                  {/* Steam Animation */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-8 bg-gradient-to-t from-white/20 to-transparent rounded-full"
                        style={{ left: `${i * 8 - 8}px` }}
                        animate={{
                          y: [0, -20, -40],
                          opacity: [0, 0.6, 0],
                          scale: [1, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Coffee Liquid */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(45deg, #92400e, #d97706)",
                        "linear-gradient(45deg, #d97706, #f59e0b)",
                        "linear-gradient(45deg, #92400e, #d97706)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-48 h-48 rounded-full flex items-center justify-center relative"
                  >
                    <Coffee className="w-16 h-16 text-white/80" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating Elements Around Cup */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"
                  style={{
                    top: `${30 + Math.sin(i * 60 * Math.PI / 180) * 120}px`,
                    left: `${160 + Math.cos(i * 60 * Math.PI / 180) * 120}px`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
      >
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center space-y-2"
      >
        <span className="text-white/60 text-sm rotate-90 origin-center">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default CoffeeHero;