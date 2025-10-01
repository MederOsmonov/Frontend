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
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Навигация */}
        <Navbar />

        {/* Основной контент */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/auth" element={<AuthForm />} />
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