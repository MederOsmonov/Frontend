import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, logout } from "./authSlice"

function AuthForm() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        {user ? "Профиль" : "Войти"}
      </h2>

      {user ? (
        <div className="text-center">
          <p className="mb-4">Привет, {user.name} 👋</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Выйти
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      )}
    </div>
  )
}

export default AuthForm