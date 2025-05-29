import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProfilePage from './components/ProfilePage';
import BlogsSection from './components/BlogsSection';
import ContactSection from './components/ContactSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CodeAssistantChat from './components/CodeAssistantChat';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (!token) {
      setIsLoggedIn(false);
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header
          onOpenLogin={openLoginModal}
          onOpenRegister={openRegisterModal}
        />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <WhyChooseUs />
              <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Coding Problems</h2>
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                      <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            post.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {post.difficulty}
                          </span>
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <BlogsSection />
              <Testimonials />
              <ContactSection />
              <Footer />
            </>
          } />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {/* Code Assistant Chat */}
        <CodeAssistantChat isLoggedIn={isLoggedIn} />

        {/* Modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeModals}
          onSwitchToRegister={openRegisterModal}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeModals}
          onSwitchToLogin={openLoginModal}
        />
      </div>
    </Router>
  );
}

export default App;