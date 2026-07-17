import React from 'react'
import CoffeeNavbar from './components/CoffeeNavbar';
import CoffeeHero from './components/CoffeeHero';
import CoffeeFeaturedSection from './components/CoffeeFeaturedSection';
import BrewingMethodsSection from './components/BrewingMethodsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
const App = () => {
  return (
    <main >
      <CoffeeNavbar />
      <CoffeeHero />
      <CoffeeFeaturedSection />
      <BrewingMethodsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};

export default App;