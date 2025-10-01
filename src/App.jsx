import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import AuthForm from "./features/auth/AuthForm"
import Posts from "./pages/Posts"
import CreatePost from "./pages/CreatePost"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Навигация */}
        <Navbar />

        {/* Основной контент */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Футер */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>© 2025 My Blog App</p>
        </footer>
      </div>
    </Router>
  )
}

export default App