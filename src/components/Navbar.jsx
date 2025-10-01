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
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 py-4' 
        : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 py-6'
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
            isScrolled ? 'w-12 h-12' : 'w-14 h-14'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl transform rotate-45 transition-all duration-300 group-hover:rotate-90 ${
              isScrolled ? 'shadow-lg' : 'shadow-2xl'
            }`}></div>
            <span className={`absolute inset-0 flex items-center justify-center font-bold transition-all duration-300 ${
              isScrolled ? 'text-gray-800 text-xl' : 'text-white text-2xl'
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
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-2xl p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group ${
                activeTab === item.path
                  ? isScrolled 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-white/25 text-white backdrop-blur-sm shadow-lg'
                  : isScrolled
                    ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15 hover:shadow-md'
              }`}
              onClick={() => setActiveTab(item.path)}
            >
              {/* Анимированный фон для активного элемента */}
              {activeTab === item.path && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-100"></div>
              )}
              
              <span className="relative z-10 flex items-center space-x-3">
                <span className="text-xl transition-transform duration-300 group-hover:scale-125">
                  {item.icon}
                </span>
                <span className="transition-all duration-300 group-hover:translate-x-1 font-bold tracking-wide">
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

      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    </nav>
  )
}

export default Navbar