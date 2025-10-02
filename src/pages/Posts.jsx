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
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

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
          likes: 12,
          isLiked: false,
          replies: [
            {
              id: 11,
              author: "Автор",
              avatar: "А",
              content: "Спасибо за отзыв! Рад, что статья оказалась полезной.",
              time: "1 час назад",
              likes: 3,
              isLiked: false
            }
          ]
        },
        {
          id: 2,
          author: "Иван Сидоров",
          avatar: "ИС",
          content: "Интересный взгляд на проблему. А есть ли у вас дополнительные материалы по этой теме?",
          time: "5 часов назад",
          likes: 8,
          isLiked: false,
          replies: []
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'Интересный пост',
        text: post?.excerpt || 'Посмотрите этот пост в MyBlog',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback - копируем URL в буфер обмена
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Ссылка скопирована в буфер обмена!');
      }).catch(() => {
        alert('Не удалось скопировать ссылку');
      });
    }
  };

  const handleCommentClick = () => {
    const commentSection = document.querySelector('#comments-section');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
      const textarea = commentSection.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }
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
        likes: 0,
        isLiked: false,
        replies: []
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleReplyLike = (commentId, replyId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: "Вы",
        avatar: "В",
        content: replyText,
        time: "Только что",
        likes: 0,
        isLiked: false
      };
      
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      }));
      
      setReplyText("");
      setReplyingTo(null);
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
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{isLiked ? 'Нравится!' : 'Нравится'}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {isLiked ? '1' : '0'}
                </span>
              </button>
              <button 
                onClick={handleCommentClick}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                <span>💬</span>
                <span>Комментировать</span>
                <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                  {comments.length}
                </span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <span>📤</span>
                <span>Поделиться</span>
              </button>
              <button 
                onClick={handleBookmark}
                className={`flex items-center space-x-2 p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold ${
                  isBookmarked
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                }`}
              >
                <span>{isBookmarked ? '⭐️' : '☆'}</span>
                <span>{isBookmarked ? 'Сохранено' : 'Сохранить'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Комментарии */}
        <div id="comments-section" className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
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
              <div key={commentItem.id} className="space-y-4">
                {/* Основной комментарий */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50/80 rounded-2xl border-2 border-gray-200/50 hover:bg-gray-100/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
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
                      <button 
                        onClick={() => handleCommentLike(commentItem.id)}
                        className={`flex items-center space-x-1 transition-all duration-300 font-medium px-3 py-1 rounded-full ${
                          commentItem.isLiked 
                            ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <span>{commentItem.isLiked ? '❤️' : '🤍'}</span>
                        <span>{commentItem.likes}</span>
                      </button>
                      <button 
                        onClick={() => setReplyingTo(replyingTo === commentItem.id ? null : commentItem.id)}
                        className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-1 rounded-full hover:bg-blue-50"
                      >
                        💬 Ответить
                      </button>
                    </div>
                  </div>
                </div>

                {/* Форма ответа */}
                {replyingTo === commentItem.id && (
                  <div className="ml-16 p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-200/50">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        В
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Ответить ${commentItem.author}...`}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none font-medium"
                          rows="3"
                        />
                        <div className="flex justify-end space-x-2 mt-3">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                          >
                            Отмена
                          </button>
                          <button
                            onClick={() => handleReplySubmit(commentItem.id)}
                            disabled={!replyText.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                          >
                            Ответить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ответы на комментарий */}
                {commentItem.replies && commentItem.replies.length > 0 && (
                  <div className="ml-16 space-y-3">
                    {commentItem.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3 p-4 bg-white/80 rounded-xl border-2 border-gray-100 hover:bg-gray-50/80 transition-all duration-300">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                          {reply.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-gray-800">{reply.author}</h5>
                            <span className="text-gray-500 text-xs font-medium">{reply.time}</span>
                          </div>
                          <p className="text-gray-700 font-medium leading-relaxed mb-2">
                            {reply.content}
                          </p>
                          <button 
                            onClick={() => handleReplyLike(commentItem.id, reply.id)}
                            className={`flex items-center space-x-1 transition-all duration-300 font-medium px-2 py-1 rounded-full text-sm ${
                              reply.isLiked 
                                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <span>{reply.isLiked ? '❤️' : '🤍'}</span>
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {comments.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">💬</span>
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  Пока нет комментариев. Станьте первым!
                </p>
              </div>
            )}
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
