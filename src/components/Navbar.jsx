import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="text-2xl font-bold">
          📖 MyBlog
        </Link>

        {/* Навигация */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Главная</Link>
          <Link to="/posts" className="hover:text-yellow-300 transition">Посты</Link>
          <Link to="/create" className="hover:text-yellow-300 transition">Создать пост</Link>
          <Link to="/profile" className="hover:text-yellow-300 transition">Профиль</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar