import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../features/posts/postSlice";
import PostCard from "../features/posts/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Загружаем последние 6 постов для главной страницы
    dispatch(fetchPosts({ ordering: "-created_at", page_size: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Hero секция */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Добро пожаловать в блог!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Читайте, пишите и делитесь идеями
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/posts" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Все посты
            </Link>
            <Link 
              to="/create" 
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Создать пост
            </Link>
          </div>
        </div>

        {/* Последние посты */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Последние посты</h2>
            <Link 
              to="/posts" 
              className="text-blue-600 hover:underline"
            >
              Смотреть все →
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ошибка загрузки постов</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => dispatch(fetchPosts({ ordering: "-created_at", page_size: 6 }))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Попробовать снова
              </button>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Пока нет постов</h3>
              <p className="text-gray-600 mb-4">Станьте первым, кто создаст пост!</p>
              <Link 
                to="/create-post" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Создать первый пост
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
