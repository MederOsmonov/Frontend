import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white py-16 text-center relative overflow-hidden">
    {/* Анимированный фон с частицами */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Плавающие градиентные сферы */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/30 to-pink-600/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-cyan-600/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-to-r from-violet-600/20 to-purple-600/30 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow animation-delay-4000"></div>
      
      {/* Анимированные частицы */}
      <div className="particles-container absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Светящиеся линии */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-glow"></div>
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse-glow animation-delay-1500"></div>
      </div>
    </div>
    
    <div className="relative z-10 max-w-6xl mx-auto px-4">
      {/* Основной контент */}
      <div className="grid lg:grid-cols-3 gap-12 mb-12">
        {/* Блок о компании */}
        <div className="text-left">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl transform rotate-45 flex items-center justify-center shadow-2xl">
              <span className="text-white text-xl font-bold transform -rotate-45">📖</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MyBlog
            </h3>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6 font-medium">
            Платформа для творческих людей, где можно делиться мыслями, 
            находить вдохновение и общаться с единомышленниками.
          </p>
          <div className="flex items-center space-x-2 text-purple-300">
            <span>✨</span>
            <span className="font-semibold">Присоединяйтесь к нашему сообществу</span>
          </div>
        </div>

        {/* Быстрые ссылки */}
        <div className="text-left">
          <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Быстрые ссылки
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Главная", emoji: "🏠" },
              { name: "Все посты", emoji: "📚" },
              { name: "Создать пост", emoji: "✨" },
              { name: "О проекте", emoji: "ℹ️" },
              { name: "Контакты", emoji: "📞" },
              { name: "Помощь", emoji: "❓" }
            ].map((link, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group hover:translate-x-1 font-medium"
              >
                <span className="text-lg transform group-hover:scale-110 transition-transform">
                  {link.emoji}
                </span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Контактная информация */}
        <div className="text-left">
          <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Свяжитесь с нами
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                <span className="text-lg">📧</span>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm">hello@myblog.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                <span className="text-lg">🌐</span>
              </div>
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-sm">www.myblog.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300 group hover:text-white transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <p className="font-semibold">Адрес</p>
                <p className="text-sm">Москва, Россия</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Социальные сети */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Подписывайтесь на нас
        </h4>
        <div className="flex justify-center space-x-6">
          {[
            {
              name: "Twitter",
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              ),
              gradient: "from-blue-400 to-blue-600",
              hoverGradient: "from-blue-500 to-blue-700"
            },
            {
              name: "Instagram",
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 12.014 0 12.017 0z"/>
                </svg>
              ),
              gradient: "from-pink-500 to-purple-600",
              hoverGradient: "from-pink-600 to-purple-700"
            },
            {
              name: "LinkedIn",
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ),
              gradient: "from-blue-600 to-blue-800",
              hoverGradient: "from-blue-700 to-blue-900"
            },
            {
              name: "GitHub",
              icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              ),
              gradient: "from-gray-700 to-gray-900",
              hoverGradient: "from-gray-800 to-black"
            }
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              className="group relative transform hover:scale-110 transition-all duration-500"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:${social.hoverGradient} relative overflow-hidden`}>
                {social.icon}
                {/* Эффект блеска */}
                <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                  {social.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Разделитель */}
      <div className="relative mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Копирайт и дополнительная информация */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-gray-300 font-medium">
            &copy; {new Date().getFullYear()} MyBlog. Все права защищены.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Сделано с <span className="text-red-500 animate-pulse">❤️</span> для творческих людей
          </p>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
            Политика конфиденциальности
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
            Условия использования
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 font-medium">
            Cookies
          </a>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
        50% { transform: translateY(-15px) scale(1.1); opacity: 0.6; }
      }
      
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      .animate-float-slow {
        animation: float-slow 15s ease-in-out infinite;
      }
      
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      
      .animation-delay-1500 {
        animation-delay: 1.5s;
      }
      
      .particles-container {
        pointer-events: none;
      }
    `}</style>
  </footer>
);

export default Footer;