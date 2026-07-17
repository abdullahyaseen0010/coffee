import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Coffee, Clock, Thermometer, Droplets, ChefHat, Play, Pause, RotateCcw, Zap, Filter, Beaker } from 'lucide-react';

const brewingMethods = [
  {
    id: 1,
    name: "Pour Over",
    icon: Filter,
    difficulty: "Beginner",
    time: "3-4 min",
    ratio: "1:15",
    temperature: "195-205°F",
    grind: "Medium",
    description: "The most popular method for coffee enthusiasts. Offers complete control over brewing variables.",
    detailedDescription: "Pour over brewing allows you to control every aspect of the extraction process. The circular pouring motion ensures even saturation, while the paper filter removes oils and sediment for a clean, bright cup.",
    steps: [
      "Heat water to 195-205°F",
      "Place filter in dripper and rinse",
      "Add 25g coffee (medium grind)",
      "Pour 50ml water, let bloom 30s",
      "Pour remaining water in circles",
      "Total brew time: 3-4 minutes"
    ],
    tips: [
      "Use a gooseneck kettle for precision",
      "Maintain consistent pouring speed",
      "Grind just before brewing"
    ],
    flavor: "Clean, bright, nuanced",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    color: "from-blue-400 to-cyan-500",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    name: "French Press",
    icon: Coffee,
    difficulty: "Beginner",
    time: "4 min",
    ratio: "1:12",
    temperature: "200°F",
    grind: "Coarse",
    description: "Full immersion brewing that produces a rich, full-bodied cup with natural oils intact.",
    detailedDescription: "French press uses full immersion brewing, where coffee grounds steep in hot water for several minutes. The metal mesh filter allows oils and fine particles through, creating a fuller body and more intense flavor.",
    steps: [
      "Heat water to 200°F",
      "Add 30g coarse ground coffee",
      "Pour hot water, stir gently",
      "Place plunger, don't press",
      "Steep for 4 minutes",
      "Press down slowly and serve"
    ],
    tips: [
      "Use coarse grind to prevent over-extraction",
      "Don't leave coffee in press after brewing",
      "Preheat the press with hot water"
    ],
    flavor: "Full-bodied, rich, intense",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    color: "from-amber-500 to-orange-500",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 3,
    name: "Espresso",
    icon: Zap,
    difficulty: "Expert",
    time: "25-30 sec",
    ratio: "1:2",
    temperature: "190-196°F",
    grind: "Fine",
    description: "High-pressure extraction that creates a concentrated, intense shot with crema.",
    detailedDescription: "Espresso is the foundation of many coffee drinks. Using 9 bars of pressure, hot water is forced through finely ground coffee in 25-30 seconds, creating a concentrated shot topped with golden crema.",
    steps: [
      "Preheat machine and cup",
      "Grind 18-20g coffee fine",
      "Distribute and tamp evenly",
      "Lock portafilter in machine",
      "Extract for 25-30 seconds",
      "Aim for 36-40ml output"
    ],
    tips: [
      "Consistent tamping pressure is crucial",
      "Fresh beans are essential",
      "Watch the flow rate carefully"
    ],
    flavor: "Intense, concentrated, creamy",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80",
    color: "from-red-500 to-pink-500",
    gradient: "from-red-500/20 to-pink-500/20"
  },
  {
    id: 4,
    name: "Aeropress",
    icon: Beaker,
    difficulty: "Intermediate",
    time: "2-3 min",
    ratio: "1:14",
    temperature: "185-195°F",
    grind: "Medium-Fine",
    description: "Unique pressure-driven method that combines immersion and filtration.",
    detailedDescription: "The Aeropress uses air pressure to push water through coffee grounds and a paper filter. This method produces a clean, smooth cup with lower acidity and is incredibly forgiving.",
    steps: [
      "Insert filter and rinse",
      "Add 17g medium-fine coffee",
      "Pour water to fill chamber",
      "Stir for 10 seconds",
      "Insert plunger, wait 1 minute",
      "Press down in 20-30 seconds"
    ],
    tips: [
      "Experiment with inverted method",
      "Try different grind sizes",
      "Water temperature affects extraction"
    ],
    flavor: "Clean, smooth, low acidity",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80",
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 5,
    name: "Cold Brew",
    icon: Droplets,
    difficulty: "Beginner",
    time: "12-24 hrs",
    ratio: "1:8",
    temperature: "Room Temp",
    grind: "Coarse",
    description: "Slow extraction using cold water for a smooth, less acidic concentrate.",
    detailedDescription: "Cold brew uses time instead of heat to extract coffee flavors. The long steeping process creates a smooth, naturally sweet concentrate that's perfect for hot days or those sensitive to acidity.",
    steps: [
      "Combine coffee and cold water",
      "Stir to ensure saturation",
      "Steep 12-24 hours",
      "Strain through fine mesh",
      "Dilute concentrate to taste",
      "Serve over ice"
    ],
    tips: [
      "Use filtered water for best taste",
      "Store concentrate up to 2 weeks",
      "Experiment with steeping time"
    ],
    flavor: "Smooth, sweet, low acidity",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    color: "from-purple-500 to-indigo-500",
    gradient: "from-purple-500/20 to-indigo-500/20"
  },
  {
    id: 6,
    name: "Chemex",
    icon: ChefHat,
    difficulty: "Intermediate",
    time: "4-5 min",
    ratio: "1:16",
    temperature: "195-205°F",
    grind: "Medium-Coarse",
    description: "Elegant pour-over method using thick filters for exceptionally clean coffee.",
    detailedDescription: "The Chemex uses proprietary thick paper filters that remove more oils and sediment than standard filters. This creates an exceptionally clean, tea-like cup that highlights the coffee's origin characteristics.",
    steps: [
      "Place filter with 3-layer side",
      "Rinse filter thoroughly",
      "Add 42g medium-coarse coffee",
      "Pour twice the water weight",
      "Let bloom for 45 seconds",
      "Continue pouring in slow circles"
    ],
    tips: [
      "Use Chemex-specific filters",
      "Pour slowly and steadily",
      "Keep water temperature consistent"
    ],
    flavor: "Clean, bright, tea-like",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
    color: "from-yellow-500 to-amber-500",
    gradient: "from-yellow-500/20 to-amber-500/20"
  }
];

const BrewingMethodsSection = () => {
  const [selectedMethod, setSelectedMethod] = useState(brewingMethods[0]);
  const [animationState, setAnimationState] = useState('idle'); // idle, brewing, complete
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isAutoPlaying && animationState === 'brewing') {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < selectedMethod.steps.length - 1) {
            return prev + 1;
          } else {
            setAnimationState('complete');
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, animationState, selectedMethod.steps.length]);

  const startBrewingAnimation = () => {
    setAnimationState('brewing');
    setCurrentStep(0);
    setIsAutoPlaying(true);
  };

  const resetAnimation = () => {
    setAnimationState('idle');
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  const toggleAnimation = () => {
    if (animationState === 'idle') {
      startBrewingAnimation();
    } else {
      setIsAutoPlaying(!isAutoPlaying);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Beginner": "from-green-500 to-emerald-500",
      "Intermediate": "from-yellow-500 to-orange-500",
      "Expert": "from-red-500 to-pink-500"
    };
    return colors[difficulty] || "from-gray-500 to-gray-600";
  };

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Steam Animation */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-t from-white/10 to-transparent rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -40, -80],
              opacity: [0, 0.3, 0],
              scale: [1, 1.5, 2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Floating Coffee Drops */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-3 bg-gradient-to-b from-amber-400/20 to-amber-600/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 100, 200],
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 0.8]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Background Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
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
              <Coffee className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="text-amber-400 font-medium">Master the Art</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Brewing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Methods
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Discover the perfect brewing technique for your taste preferences. Each method brings out unique characteristics in your coffee beans.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Method Selection Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Method</h3>
            {brewingMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  setSelectedMethod(method);
                  resetAnimation();
                }}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${
                  selectedMethod.id === method.id
                    ? `bg-gradient-to-r ${method.gradient} border-amber-500/50`
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={selectedMethod.id === method.id ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}
                  >
                    <method.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{method.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(method.difficulty)} text-white`}>
                        {method.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm">{method.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Brewing Animation */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              {/* Method Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: animationState === 'brewing' ? 360 : 0 }}
                    transition={{ duration: 2, repeat: animationState === 'brewing' ? Infinity : 0 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedMethod.color} flex items-center justify-center`}
                  >
                    <selectedMethod.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedMethod.name}</h3>
                    <p className="text-gray-300">{selectedMethod.description}</p>
                  </div>
                </div>
                
                {/* Animation Controls */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={toggleAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-black hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
                  >
                    {isAutoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </motion.button>
                  <motion.button
                    onClick={resetAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-all duration-300"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Brewing Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Time</div>
                  <div className="text-white font-bold">{selectedMethod.time}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Thermometer className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Temperature</div>
                  <div className="text-white font-bold">{selectedMethod.temperature}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Ratio</div>
                  <div className="text-white font-bold">{selectedMethod.ratio}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <Coffee className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Grind</div>
                  <div className="text-white font-bold">{selectedMethod.grind}</div>
                </div>
              </div>

              {/* Brewing Steps */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-4">Brewing Steps</h4>
                {selectedMethod.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      animationState === 'brewing' && index === currentStep
                        ? `bg-gradient-to-r ${selectedMethod.gradient} border-l-4 border-amber-500 scale-105`
                        : animationState === 'brewing' && index < currentStep
                        ? 'bg-green-500/20 border-l-4 border-green-500'
                        : 'bg-gray-800/30'
                    }`}
                  >
                    <motion.div
                      animate={
                        animationState === 'brewing' && index === currentStep
                          ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5, repeat: animationState === 'brewing' && index === currentStep ? Infinity : 0 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        animationState === 'brewing' && index <= currentStep
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="text-gray-300">{step}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pro Tips */}
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                <h4 className="text-lg font-bold text-amber-400 mb-3">Pro Tips</h4>
                <ul className="space-y-2">
                  {selectedMethod.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-amber-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Flavor Profile */}
              <div className="mt-6 text-center">
                <span className="text-gray-400">Flavor Profile: </span>
                <span className="text-white font-semibold">{selectedMethod.flavor}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrewingMethodsSection;
