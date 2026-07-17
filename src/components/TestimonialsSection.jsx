import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Coffee, Award, Users, Play, Pause } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Coffee Enthusiast",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The pour-over technique I learned here completely transformed my morning routine. The coffee tastes like it came from a high-end café, and the step-by-step guidance made it so easy to master.",
    highlight: "completely transformed my morning routine",
    brewingMethod: "Pour Over",
    timeUsing: "6 months",
    favoriteBean: "Ethiopian Yirgacheffe",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Home Barista",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As someone who's tried every coffee gadget out there, I can confidently say this approach to brewing is game-changing. The attention to detail and scientific approach really shows in the final cup.",
    highlight: "game-changing",
    brewingMethod: "Espresso",
    timeUsing: "2 years",
    favoriteBean: "Colombian Supremo",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Café Owner",
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I've been in the coffee business for 10 years, and these brewing methods have elevated our café's offerings. Our customers constantly ask about our secret - it's all in the technique!",
    highlight: "elevated our café's offerings",
    brewingMethod: "Chemex",
    timeUsing: "1 year",
    favoriteBean: "Guatemala Antigua",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "David Park",
    role: "Software Engineer",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The cold brew method saved my summer! Living in Seattle, I thought I'd never find a refreshing way to enjoy coffee, but this technique creates the smoothest, most refreshing drink I've ever had.",
    highlight: "saved my summer",
    brewingMethod: "Cold Brew",
    timeUsing: "8 months",
    favoriteBean: "Brazilian Santos",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The French press method is perfect for my busy lifestyle. I can prepare it before my morning routine and have perfect coffee waiting for me. It's become an essential part of my day.",
    highlight: "essential part of my day",
    brewingMethod: "French Press",
    timeUsing: "4 months",
    favoriteBean: "Costa Rican Tarrazú",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Photographer",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The Aeropress technique is perfect for my travel photography work. I can make café-quality coffee anywhere, and the consistency is incredible. It's been a game-changer for my remote work setup.",
    highlight: "café-quality coffee anywhere",
    brewingMethod: "Aeropress",
    timeUsing: "1.5 years",
    favoriteBean: "Kenyan AA",
    gradient: "from-yellow-500 to-orange-500"
  }
];

const stats = [
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Perfect Brews", value: "50,000+", icon: Coffee },
  { label: "5-Star Reviews", value: "98%", icon: Star },
  { label: "Awards Won", value: "15+", icon: Award }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredStat, setHoveredStat] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
        ))}
        
        {/* Background Gradient Orbs */}
        <motion.div
          className="absolute top-10 left-20 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
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
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-5 h-5 text-red-400" />
            </motion.div>
            <span className="text-amber-400 font-medium">Loved by Coffee Enthusiasts</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Community
            </span>{' '}
            Says
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Join thousands of coffee lovers who have transformed their brewing experience with our expert guidance and techniques.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
              className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300"
            >
              <motion.div
                animate={hoveredStat === index ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center"
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                animate={hoveredStat === index ? { scale: 1.1 } : {}}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50"
          >
            {/* Autoplay Controls */}
            <div className="absolute top-6 right-6 flex gap-2">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-black hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Testimonial Content */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl text-amber-400/30"
                  >
                    <Quote className="w-16 h-16" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <Star className="w-6 h-6 text-amber-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {currentTestimonial.text.split(currentTestimonial.highlight).map((part, index) => (
                        <span key={index}>
                          {part}
                          {index < currentTestimonial.text.split(currentTestimonial.highlight).length - 1 && (
                            <span className="text-amber-400 font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2 py-1 rounded">
                              {currentTestimonial.highlight}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </motion.div>

                  {/* Customer Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500/50"
                    >
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{currentTestimonial.name}</h4>
                      <p className="text-gray-400">{currentTestimonial.role}</p>
                      <p className="text-gray-500 text-sm">{currentTestimonial.location}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Customer Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-xl bg-gradient-to-br ${currentTestimonial.gradient} bg-opacity-20 border border-white/10`}>
                    <h4 className="text-white font-bold text-lg mb-4">Brewing Profile</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Preferred Method:</span>
                        <span className="text-white font-semibold">{currentTestimonial.brewingMethod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Using for:</span>
                        <span className="text-white font-semibold">{currentTestimonial.timeUsing}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Favorite Bean:</span>
                        <span className="text-white font-semibold text-sm">{currentTestimonial.favoriteBean}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join Our Coffee Community?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey to perfect coffee brewing today and become part of our growing community of coffee enthusiasts.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
          >
            Start Brewing Better Coffee
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;