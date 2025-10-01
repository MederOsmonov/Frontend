import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
    {/* Анимированный фон с частицами */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Плавающие градиентные сферы */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-violet-600/15 to-purple-600/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow animation-delay-4000"></div>
      
      {/* Анимированные звезды */}
      <div className="particles-container absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Плавающие анимированные элементы */}
      <div className="absolute top-1/4 left-1/5 w-8 h-8 bg-yellow-400/20 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-cyan-400/20 rounded-full animate-float animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-3/4 w-4 h-4 bg-pink-400/20 rounded-full animate-float animation-delay-5000"></div>
    </div>

    <div className="text-center relative z-10 max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-500">
      {/* Анимированное число 404 */}
      <div className="relative mb-8">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent relative">
          404
          {/* Эффект свечения */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent blur-2xl opacity-50 -z-10 animate-pulse-glow"></div>
        </h1>
        
        {/* Вращающиеся орбитальные элементы */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Орбита 1 */}
            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>
            {/* Орбита 2 */}
            <div className="absolute inset-8 border-2 border-pink-500/30 rounded-full animate-spin-slow reverse">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full"></div>
            </div>
            {/* Орбита 3 */}
            <div className="absolute inset-16 border-2 border-cyan-500/30 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Плавающие эмодзи вокруг числа */}
        <div className="absolute -top-4 -left-4 w-12 h-12 text-3xl animate-bounce">🚀</div>
        <div className="absolute -bottom-4 -right-4 w-10 h-10 text-2xl animate-bounce animation-delay-1000">🌟</div>
        <div className="absolute top-1/2 -right-8 w-8 h-8 text-xl animate-bounce animation-delay-1500">💫</div>
        <div className="absolute top-1/2 -left-8 w-8 h-8 text-xl animate-bounce animation-delay-2000">✨</div>
      </div>

      {/* Текстовая информация */}
      <div className="space-y-6 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Ой! Страница не найдена
        </h2>
        <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed font-medium">
          Кажется, мы не можем найти страницу, которую вы ищете. 
          Возможно, она была перемещена, удалена или никогда не существовала.
        </p>
      </div>

      {/* Анимированная иконка поиска */}
      <div className="w-32 h-32 mx-auto mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl transform rotate-45 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/10 animate-float">
          <span className="text-4xl text-white transform -rotate-45">🔍</span>
        </div>
        <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl transform rotate-45 animate-ping-slow"></div>
      </div>

      {/* Основные кнопки действий */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link 
          to="/" 
          className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden"
        >
          <span>🏠 Вернуться на главную</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {/* Эффект блеска */}
          <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </Link>
        
        <Link 
          to="/posts" 
          className="group px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 hover:bg-white/20"
        >
          <span>📚 Исследовать посты</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </div>

      {/* Дополнительные ссылки */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {[
          { to: "/create", label: "Создать пост", emoji: "✨" },
          { to: "/profile", label: "Профиль", emoji: "👤" },
          { to: "/about", label: "О проекте", emoji: "ℹ️" },
          { to: "/contact", label: "Контакты", emoji: "📞" }
        ].map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 group font-medium"
          >
            <span className="text-lg transform group-hover:scale-110 transition-transform">
              {link.emoji}
            </span>
            <span className="group-hover:underline">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Декоративный разделитель */}
      <div className="relative mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Сообщение поддержки */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <span className="text-2xl">💡</span>
          <h3 className="text-lg font-bold text-white">Нужна помощь?</h3>
        </div>
        <p className="text-gray-300 font-medium">
          Если вы считаете, что это ошибка, пожалуйста, {" "}
          <a href="#" className="text-purple-300 hover:text-purple-200 underline transition-colors">
            свяжитесь с поддержкой
          </a>
        </p>
      </div>
    </div>

    <style jsx>{`
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.05); }
      }
      
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
      }
      
      @keyframes ping-slow {
        0% { transform: scale(1); opacity: 1; }
        75%, 100% { transform: scale(2); opacity: 0; }
      }
      
      .animate-float-slow {
        animation: float-slow 20s ease-in-out infinite;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-twinkle {
        animation: twinkle 2s ease-in-out infinite;
      }
      
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      
      .animate-spin-slow.reverse {
        animation-direction: reverse;
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .animate-ping-slow {
        animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      
      .animation-delay-3000 {
        animation-delay: 3s;
      }
      
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      
      .animation-delay-5000 {
        animation-delay: 5s;
      }
      
      .animation-delay-1500 {
        animation-delay: 1.5s;
      }
      
      .particles-container {
        pointer-events: none;
      }
    `}</style>
  </div>
);

export default NotFound;