import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../features/posts/PostCard";
import { fetchPosts } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      // Имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 1200));
      const postsData = await fetchPosts();
      setPosts(postsData);
      
      // Выбираем первый пост как featured
      if (postsData.length > 0) {
        setFeaturedPost(postsData[0]);
      }
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const stats = [
    { number: "2.5K+", label: "Активных пользователей", icon: "👥" },
    { number: "15K+", label: "Опубликованных постов", icon: "📝" },
    { number: "45K+", label: "Полученных лайков", icon: "❤️" },
    { number: "8K+", label: "Комментариев", icon: "💬" }
  ];

  const categories = [
    { name: "Технологии", icon: "💻", count: 156, color: "from-blue-500 to-cyan-500" },
    { name: "Дизайн", icon: "🎨", count: 89, color: "from-purple-500 to-pink-500" },
    { name: "Путешествия", icon: "✈️", count: 67, color: "from-green-500 to-emerald-500" },
    { name: "Кулинария", icon: "🍳", count: 124, color: "from-orange-500 to-red-500" },
    { name: "Спорт", icon: "⚽️", count: 78, color: "from-yellow-500 to-orange-500" },
    { name: "Музыка", icon: "🎵", count: 45, color: "from-indigo-500 to-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent drop-shadow-sm leading-tight">
                  Добро пожаловать в{" "}
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    MyBlog
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl">
                  Платформа для творческих людей, где можно делиться мыслями, находить вдохновение и общаться с единомышленниками
                </p>
              </div>
{/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/create" 
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>🚀 Начать писать</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  to="/posts" 
                  className="group px-8 py-4 bg-white/90 backdrop-blur-xl border-2 border-gray-300 text-gray-800 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>📚 Исследовать</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-gray-600 font-medium flex items-center justify-center lg:justify-start space-x-2">
                      <span>{stat.icon}</span>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
{/* Right Content - Featured Image/Post */}
            <div className="relative">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8 transform hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-1 mb-6">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <span className="text-white text-lg font-bold">🌟 Пост дня</span>
                  </div>
                </div>
                
                {featuredPost ? (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed line-clamp-3">
                      {featuredPost.content}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {featuredPost.author?.charAt(0) + " Автор"}
                        </div>
                        <div className="text-sm text-gray-600">Сегодня</div>
                      </div>
                      <Link 
                        to={`/posts/${featuredPost.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Читать →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      📝
                    </div>
                    <p className="text-gray-600 font-medium">Скоро здесь появится featured пост</p>
                  </div>
                )}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce animation-delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Популярные категории
            </h2>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Исследуйте посты по интересующим вас темам
            </p>
          </div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <div 
                  className="group bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-white/30 p-6 text-center transform hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-600 font-semibold">{category.count} постов</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent mb-4">
              Последние посты
            </h2>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Самые свежие публикации от нашего сообщества
            </p>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-6 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-400 rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded w-full"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <div className="h-6 bg-gray-400 rounded w-16"></div>
                    <div className="h-6 bg-gray-400 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Posts Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post, index) => (
                <div 
                  key={post.id}
                  className="transform hover:scale-105 transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
{/* View All Button */}
          {!isLoading && posts.length > 0 && (
            <div className="text-center mt-12">
              <Link 
                to="/posts" 
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <span>📚 Смотреть все посты</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && posts.length === 0 && (
            <div className="text-center py-16 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Пока нет постов</h3>
              <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto font-medium">
                Будьте первым, кто поделится своей историей с сообществом!
              </p>
              <Link 
                to="/create" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Создать первый пост
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы поделиться своей историей?
          </h2>
          <p className="text-xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
            Присоединяйтесь к тысячам авторов, которые уже делятся своими знаниями и вдохновением
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              🎉 Начать бесплатно
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white/20 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30"
            >
              📖 Узнать больше
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
