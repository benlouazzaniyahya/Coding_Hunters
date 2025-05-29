import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import BlogsSection from './components/BlogsSection';
import ContactSection from './components/ContactSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyChooseUs />
      <BlogsSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;