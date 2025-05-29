import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navigationItems } from '../data/mockData';
import axios from 'axios';
import { UserCircleIcon, BellIcon, ChatBubbleLeftIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Header = ({ onOpenLogin, onOpenRegister }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications] = useState([
    { id: 1, text: 'John liked your post', time: '2m ago' },
    { id: 2, text: 'New solution to your problem', time: '1h ago' },
    { id: 3, text: 'Your post was featured', time: '2h ago' },
  ]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const [messages] = useState([
    { id: 1, from: 'Alice', text: 'Great solution!', time: '5m ago' },
    { id: 2, from: 'Bob', text: 'Need help with...', time: '30m ago' },
    { id: 3, from: 'Charlie', text: 'Check this out', time: '1h ago' },
  ]);

  // Fetch user profile when logged in
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    
    const handleClickOutside = (event) => {
      if (showProfile && !event.target.closest('.profile-menu')) {
        setShowProfile(false);
      }
      if (showNotifications && !event.target.closest('.notifications-menu')) {
        setShowNotifications(false);
      }
      if (showMessages && !event.target.closest('.messages-menu')) {
        setShowMessages(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfile, showNotifications, showMessages]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isLoggedIn
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-12 transform group-hover:scale-110 transition-transform">
              <img src="/images/logo.png" alt="Coding Hunters Logo" className="h-full w-auto" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl ${isScrolled || isLoggedIn ? 'text-gray-900' : 'text-white'} group-hover:text-blue-600 transition-colors`}>
                Coding Hunters
              </span>
              <span className={`text-xs ${isScrolled || isLoggedIn ? 'text-gray-600' : 'text-gray-300'} group-hover:text-blue-500 transition-colors`}>
                Learn. Code. Grow.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                  isScrolled || isLoggedIn ? 'text-gray-700' : 'text-white hover:text-blue-300'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowNotifications(!showNotifications);
                        setShowMessages(false);
                      }}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors relative ${
                        isScrolled || isLoggedIn ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      <BellIcon className="w-6 h-6" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                        <h3 className="px-4 py-2 text-lg font-semibold border-b border-gray-100">Notifications</h3>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map(notification => (
                            <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                              <p className="text-sm text-gray-800">{notification.text}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Messages */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowMessages(!showMessages);
                        setShowNotifications(false);
                      }}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors relative ${
                        isScrolled || isLoggedIn ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      <ChatBubbleLeftIcon className="w-6 h-6" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                    </button>
                    {showMessages && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                        <h3 className="px-4 py-2 text-lg font-semibold border-b border-gray-100">Messages</h3>
                        <div className="max-h-96 overflow-y-auto">
                          {messages.map(message => (
                            <div key={message.id} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                              <p className="text-sm font-medium text-gray-800">{message.from}</p>
                              <p className="text-sm text-gray-600 truncate">{message.text}</p>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile */}
                  <div className="relative">
                    <Link 
                      to="/profile"
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors relative block"
                      title="View Profile"
                    >
                      {profile?.profilePicture ? (
                        <img 
                          src={`/uploads/${profile.profilePicture}`} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-blue-500">
                          {profile?.username?.charAt(0).toUpperCase() || <img src="/images/logo.png" alt="Coding Hunters Logo" className="w-6 h-6 object-contain" />}
                        </div>
                      )}
                    </Link>
                  </div>
                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 group"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="w-6 h-6 group-hover:text-red-700" />
                    <span className="font-medium group-hover:text-red-700">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenLogin}
                    className={`font-medium transition-colors duration-200 hover:text-blue-600 ${
                      isScrolled || isLoggedIn ? 'text-gray-700' : 'text-white hover:text-blue-300'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={onOpenRegister}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || isLoggedIn ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-b-xl shadow-lg py-4 animate-fadeInUp border-t border-gray-100">
            <nav className="flex flex-col space-y-1 px-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center space-x-3"
                >
                  <span>{item.name}</span>
                </button>
              ))}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center space-x-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img src="/images/logo.png" alt="Coding Hunters Logo" className="w-5 h-5 object-contain" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-3 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                  <button
                    className="py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center space-x-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BellIcon className="w-5 h-5" />
                    <span>Notifications</span>
                    <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">3</span>
                  </button>
                  <button
                    className="py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center space-x-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span>Messages</span>
                    <span className="ml-auto bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">2</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-center font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onOpenRegister();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-center font-medium shadow-md hover:shadow-lg"
                  >
                    Register
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
