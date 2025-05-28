import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header 
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Write, Share, Inspire</h2>
            <p className="text-xl mb-8 opacity-90">The simplest way to share your thoughts with the world</p>
            <button className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Start Writing Now
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white bg-opacity-20 rounded-xl h-80 md:h-96 w-full" 
                 style={{backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)', 
                         backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-600 mb-16">Why Choose Blogify?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">✍️</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Easy Writing</h4>
              <p className="text-gray-600">Beautiful editor with markdown support</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Mobile Friendly</h4>
              <p className="text-gray-600">Write and read on any device</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Analytics</h4>
              <p className="text-gray-600">Track your readers and growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-600 mb-16">What Our Users Say</h3>
          <div className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg">
            <p className="text-xl italic mb-6 text-gray-700">"Blogify helped me grow my audience by 300% in just 3 months!"</p>
            <div className="font-bold text-blue-600">- Sarah, Travel Blogger</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Ready to Start Your Blogging Journey?</h3>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button 
              type="submit" 
              className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2023 Blogify. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-cyan-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-cyan-300 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;