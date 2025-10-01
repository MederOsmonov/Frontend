import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Register = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация загрузки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login({ email });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/10 rounded-full mix-blend-soft-light filter blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-md w-full space-y-8 transform hover:scale-105 transition-transform duration-500">
        {/* Карточка регистрации */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-500">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Присоединяйтесь!</h2>
            <p className="text-white/70 mt-2">Создайте новый аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Поле email */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
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
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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

            {/* Подтверждение пароля */}
            <div className="group">
              <label className="block text-sm font-medium text-white/80 mb-2">Подтвердите пароль</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Соглашение */}
            <label className="flex items-start space-x-3">
              <input type="checkbox" className="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-white/50 mt-1" />
              <span className="text-sm text-white/70">
                Я соглашаюсь с{' '}
                <a href="#" className="text-white hover:underline">условиями использования</a>
                {' '}и{' '}
                <a href="#" className="text-white hover:underline">политикой конфиденциальности</a>
              </span>
            </label>
{/* Кнопка регистрации */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-white transition-all duration-500 transform hover:scale-105 ${
                isLoading 
                  ? 'bg-white/30 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
              } relative overflow-hidden group`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Регистрация...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Создать аккаунт</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
              
              {/* Эффект блеска */}
              <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            {/* Ссылка на логин */}
            <div className="text-center">
              <p className="text-white/70">
                Уже есть аккаунт?{' '}
                <Link to="/login" className="text-white font-semibold hover:underline transition-all">
                  Войти
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

export default Register;
