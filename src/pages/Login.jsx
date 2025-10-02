import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, error } = useContext(AuthContext);
  const { success, error: showError } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(formData);
      success('Вы успешно вошли в систему!');
      navigate('/'); // Перенаправляем на главную после успешного входа
    } catch (error) {
      showError(error.message || 'Ошибка входа');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-soft-light filter blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-md w-full space-y-8 transform hover:scale-105 transition-transform duration-500">
        {/* Карточка логина */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-500">
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-white">С возвращением!</h2>
            <p className="text-white/70 mt-2">Войдите в свой аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Показываем ошибки */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            {/* Поле username */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">Имя пользователя</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Поле пароля */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">Пароль</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Дополнительные опции */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-white/50" />
                <span className="ml-2 text-sm text-white/70">Запомнить меня</span>
              </label>
              <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Забыли пароль?
              </a>
            </div>

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-white transition-all duration-500 transform hover:scale-105 ${
                loading 
                  ? 'bg-white/30 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30 shadow-lg hover:shadow-xl'
              } relative overflow-hidden group`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Вход...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Войти в аккаунт</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
              
              {/* Эффект блеска */}
              <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            {/* Ссылка на регистрацию */}
            <div className="text-center">
              <p className="text-white/70">
                Нет аккаунта?{' '}
                <Link to="/register" className="text-white font-semibold hover:underline transition-all">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Декоративные элементы */}
        <div className="text-center">
          <div className="inline-flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 200}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;