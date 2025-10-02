import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import AuthForm from "./features/auth/AuthForm"
import Posts from "./pages/Posts"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <AuthProvider>
          <Router>
          <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Навигация */}
            <Navbar />

            {/* Основной контент */}
            <main className="flex-1 container mx-auto px-4 py-6 pt-32">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:slug" element={<Posts />} />
                <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/edit-post/:slug" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
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
      </AuthProvider>
    </NotificationProvider>
    </Provider>
  )
}

export default App