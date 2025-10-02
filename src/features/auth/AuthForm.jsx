import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout, clearError } from "./authSlice";
import { AuthContext } from "../../context/AuthContext";

function AuthForm({ isLogin = true }) {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { logout: contextLogout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [isLoginForm, setIsLoginForm] = useState(isLogin);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      if (isLoginForm) {
        await dispatch(loginUser({
          username: formData.username,
          password: formData.password,
        })).unwrap();
      } else {
        await dispatch(registerUser(formData)).unwrap();
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    contextLogout();
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    dispatch(clearError());
    setFormData({
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    });
  };

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Профиль</h2>
        <div className="text-center">
          <p className="mb-2">Привет, {user.first_name || user.username} 👋</p>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isLoginForm ? "Вход" : "Регистрация"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Имя пользователя"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {!isLoginForm && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="first_name"
              placeholder="Имя"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="last_name"
              placeholder="Фамилия"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Загрузка..." : (isLoginForm ? "Войти" : "Зарегистрироваться")}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={toggleForm}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {isLoginForm 
            ? "Нет аккаунта? Зарегистрироваться" 
            : "Уже есть аккаунт? Войти"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;