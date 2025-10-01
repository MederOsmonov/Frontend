import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('/')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setActiveTab(location.pathname)
  }, [location])

  const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/posts', label: 'Посты', icon: '📝' },
    { path: '/create', label: 'Создать пост', icon: '✨' },
    { path: '/profile', label: 'Профиль', icon: '👤' }
  ]
return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 py-2' 
        : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Логотип с анимацией */}
        <Link 
          to="/" 
          className="group flex items-center space-x-3"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <div className={`relative transition-all duration-300 ${
            isScrolled ? 'w-10 h-10' : 'w-12 h-12'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl transform rotate-45 transition-all duration-300 group-hover:rotate-90 ${
              isScrolled ? 'shadow-lg' : 'shadow-2xl'
            }`}></div>
            <span className={`absolute inset-0 flex items-center justify-center font-bold transition-all duration-300 ${
              isScrolled ? 'text-gray-800 text-lg' : 'text-white text-xl'
            }`}>
              📖
            </span>
          </div>
          <span className={`font-bold transition-all duration-300 ${
            isScrolled 
              ? 'text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' 
              : 'text-3xl text-white'
          }`}>
            MyBlog
          </span>
        </Link>

        {/* Навигация с анимированными элементами */}
        <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-2xl p-1.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                activeTab === item.path
                  ? isScrolled 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-white/20 text-white backdrop-blur-sm'
                  : isScrolled
                    ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(item.path)}
            >
              {/* Анимированный фон для активного элемента */}
              {activeTab === item.path && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-100"></div>
              )}
              
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-0.5">
                  {item.label}
                </span>
              </span>

              {/* Эффект при наведении */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                activeTab !== item.path && 
                'group-hover:bg-gradient-to-r group-hover:from-purple-400/20 group-hover:to-blue-400/20'
              }`}></div>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-xl transition-all duration-300 ${
            isScrolled
              ? 'bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <div className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            isScrolled 
              ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-blue-100' 
              : 'border-white/30 bg-white/20'
          }`}></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    </nav>
  )
}

export default Navbar