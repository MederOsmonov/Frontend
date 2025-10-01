import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/api";

const Posts = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      // Имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 1000));
      const postData = await fetchPostById(id);
      setPost(postData);
      
      // Mock комментарии
      setComments([
        {
          id: 1,
          author: "Мария Петрова",
          avatar: "МП",
          content: "Отличная статья! Очень познавательно и хорошо структурировано. Спасибо за полезную информацию!",
          time: "2 часа назад",
          likes: 12
        },
        {
          id: 2,
          author: "Иван Сидоров",
          avatar: "ИС",
          content: "Интересный взгляд на проблему. А есть ли у вас дополнительные материалы по этой теме?",
          time: "5 часов назад",
          likes: 8
        }
      ]);
      
      setIsLoading(false);
    }
    loadPost();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Вы",
        avatar: "В",
        content: comment,
        time: "Только что",
        likes: 0
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Skeleton Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8 mb-6 animate-pulse">
            <div className="h-8 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mb-8"></div>
            <div className="h-6 bg-gray-400 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-400 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-400 rounded w-5/6"></div>
          </div>
          
          {/* Skeleton Content */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-400 rounded w-full"></div>
              <div className="h-4 bg-gray-400 rounded w-full"></div>
              <div className="h-4 bg-gray-400 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-12 max-w-md w-full">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Пост не найден</h2>
          <p className="text-gray-600 mb-6 font-medium">Запрашиваемый пост не существует или был удален</p>
          <Link 
            to="/posts" 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Вернуться к постам
          </Link>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4 pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-6">
          <Link to="/" className="hover:text-purple-600 transition-colors">Главная</Link>
          <span>›</span>
          <Link to="/posts" className="hover:text-purple-600 transition-colors">Посты</Link>
          <span>›</span>
          <span className="text-gray-800 font-semibold">Пост #{id}</span>
        </nav>

        {/* Заголовок поста */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {post.author?.charAt(0) || "А"} {/* Показываем первую букву автора или "А" */}
              </div>
              <div>
                <p className="text-gray-600 font-medium">
                  Опубликовано {post.date} &nbsp;|&nbsp; <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl font-semibold text-sm">{post.category || "Технологии"}</span>
                </p>
              </div>
            </div>
          </div>

<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
  {post.title}
</h1>
<p>
  Это пример содержания поста. Здесь автор делится своими мыслями, идеями и опытом...
</p>
              
              <p>
                Добро пожаловать в увлекательный мир современных технологий! В этой статье мы рассмотрим 
                основные тенденции развития веб-разработки и поделимся полезными советами для начинающих 
                разработчиков.
              </p>
              
              <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">🚀 Основные преимущества</h2>
              
              <p>
                Современные фреймворки и библиотеки предоставляют разработчикам мощные инструменты 
                для создания интерактивных и отзывчивых пользовательских интерфейсов. React, Vue и 
                Angular продолжают доминировать на рынке, предлагая различные подходы к решению 
                common задач.
              </p>
              
              <blockquote className="border-l-4 border-purple-500 pl-6 py-2 bg-purple-50/50 rounded-r-2xl italic text-gray-700 my-8">
                "Программирование — это не только написание кода, но и искусство решения проблем 
                и создания ценности для пользователей."
              </blockquote>
              
              <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">💡 Практические советы</h2>
              
              <p>
                Для успешного старта в веб-разработке рекомендуется начинать с основ HTML, CSS и 
                JavaScript. Постепенно переходите к изучению фреймворков и инструментов сборки. 
                Не забывайте о важности чистого кода и лучших практик разработки.
              </p>

<div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 my-8 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">💎</span>
                  Ключевые выводы
                </h3>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li>• Изучайте основы перед переходом к сложным темам</li>
                  <li>• Практикуйтесь регулярно и работайте над реальными проектами</li>
                  <li>• Следите за современными тенденциями и обновлениями</li>
                  <li>• Участвуйте в сообществе разработчиков</li>
                </ul>
              </div>
              
              <p>
                Развитие в IT требует постоянного обучения и адаптации к новым технологиям. 
                Главное — сохранять любопытство и готовность к экспериментам. Удачи в вашем 
                путешествии в мир программирования!
              </p>
            </div>
          </div>

        {/* Действия с постом */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span>❤️</span>
                <span>Нравится</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300">
                <span>💬</span>
                <span>Комментировать</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                📤 Поделиться
              </button>
              <button className="p-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-300">
                ⭐️ Сохранить
              </button>
            </div>
          </div>
        </div>

        {/* Комментарии */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">💬</span>
            Комментарии ({comments.length})
          </h2>

{/* Форма комментария */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                В
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Напишите ваш комментарий..."
                  rows="3"
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-lg resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-600 text-sm font-medium">
                    {comment.length}/500 символов
                  </span>
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Список комментариев */}
          <div className="space-y-6">
            {comments.map((commentItem) => (
              <div key={commentItem.id} className="flex items-start space-x-4 p-6 bg-gray-50/80 rounded-2xl border-2 border-gray-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {commentItem.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{commentItem.author}</h4>
                    <span className="text-gray-500 text-sm font-medium">{commentItem.time}</span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed mb-3">
                    {commentItem.content}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors font-medium">
                      <span>❤️</span>
                      <span>{commentItem.likes}</span>
                    </button>
                    <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                      Ответить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Floating Elements */}
        <div>
          <div className="fixed -bottom-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="fixed -top-20 -right-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow animation-delay-2000"></div>
        </div>
      </div>
    );
  };

export default Posts;
