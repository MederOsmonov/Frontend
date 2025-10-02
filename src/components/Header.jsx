import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 py-3' 
        : 'bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-800 py-5'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Логотип с анимацией */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3 transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl transform rotate-45 transition-all duration-500 group-hover:rotate-90 shadow-2xl"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                 🌟
              </span>
            </div>
            <span className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' 
                : 'text-white'
            }`}>
              MyBlog
            </span>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {/* Уведомления */}
                <button className={`p-3 rounded-2xl transition-all duration-300 relative group ${
                  isScrolled
                    ? 'bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.5 1 1 0 00-1.14-1.14 5.97 5.97 0 01-7.5 4.66 1 1 0 00-1.14 1.14 5.97 5.97 0 014.66 7.5 1 1 0 001.14 1.14 5.97 5.97 0 017.5-4.66 1 1 0 001.14-1.14z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="relative group">
                  <div className={`flex items-center space-x-3 p-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isScrolled
                      ? 'bg-gray-100 hover:bg-purple-100'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <svg className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 ${
                      isScrolled ? 'text-gray-500' : 'text-white/70'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Выпадающее меню */}
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/20 border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.name} &lt;{user.email}&gt;</p>
                    </div>
                    
                    <div className="p-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Профиль</span>
                      </Link>
                      
                      <Link 
                        to="/settings" 
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Настройки</span>
                      </Link>
                    </div>

<div className="p-2 border-t border-gray-100">
                      <button 
                        onClick={logout}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Выйти</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isScrolled
                      ? 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35'
                      : 'bg-white text-purple-600 shadow-lg hover:shadow-xl hover:scale-105'
                  }`}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </nav>

          {/* Мобильное меню */}
          <button 
            className="md:hidden p-2 rounded-xl transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Анимированная полоска */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"></div>
    </header>
  );
};

export default Header;
