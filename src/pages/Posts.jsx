import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostBySlugAction, likePost, savePost } from "../features/posts/postSlice";
import { getComments, createComment } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../context/NotificationContext";
import PostCard from "../features/posts/PostCard";

const Posts = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { success: showSuccess, error: showError, warning: showWarning } = useNotification();
  const { posts, currentPost, loading, error } = useSelector((state) => state.posts);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [newComment, setNewComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPostBySlugAction(slug));
    } else {
      dispatch(fetchPosts({ 
        search: searchQuery, 
        category: selectedCategory, 
        ordering: sortBy 
      }));
    }
  }, [dispatch, slug, searchQuery, selectedCategory, sortBy]);

  // Загружаем комментарии для поста
  useEffect(() => {
    const loadComments = async () => {
      if (slug && currentPost) {
        try {
          setCommentsLoading(true);
          console.log('Загружаем комментарии для поста ID:', currentPost.id); // Отладка
          const commentsData = await getComments({ post: currentPost.id });
          console.log('Загруженные комментарии:', commentsData); // Отладка
          setComments(commentsData.results || commentsData);
        } catch (error) {
          console.error('Ошибка загрузки комментариев:', error);
        } finally {
          setCommentsLoading(false);
        }
      }
    };

    loadComments();
  }, [slug, currentPost]);

  // Функции для интерактивности
  const handleLike = async () => {
    if (!user) {
      showWarning('Для постановки лайка необходимо авторизоваться');
      return;
    }

    try {
      setIsLiking(true);
      await dispatch(likePost(currentPost.slug)).unwrap();
      // Перезагружаем пост чтобы обновить счетчик лайков
      dispatch(fetchPostBySlugAction(slug));
      showSuccess('Лайк поставлен!');
    } catch (error) {
      showError(error.message || 'Ошибка при постановке лайка');
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      showWarning('Для сохранения поста необходимо авторизоваться');
      return;
    }

    try {
      setIsSaving(true);
      await dispatch(savePost(currentPost.slug)).unwrap();
      showSuccess('Пост сохранен!');
    } catch (error) {
      showError(error.message || 'Ошибка при сохранении поста');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showWarning('Для добавления комментария необходимо авторизоваться');
      return;
    }

    if (!newComment.trim()) {
      showWarning('Введите текст комментария');
      return;
    }

    try {
      setIsSubmittingComment(true);
      const commentData = {
        text: newComment.trim(),
        post: currentPost.id
      };
      
      // Создаем комментарий и получаем полный ответ от API
      const newCommentResponse = await createComment(commentData);
      console.log('Ответ API после создания комментария:', newCommentResponse);
      
      setNewComment("");
      showSuccess('Комментарий добавлен!');
      
      // Добавляем новый комментарий в начало списка (используя ответ от API)
      setComments(prevComments => [newCommentResponse, ...prevComments]);
      
      // Обновляем пост чтобы обновить счетчик комментариев
      dispatch(fetchPostBySlugAction(slug));
    } catch (error) {
      console.error('Ошибка создания комментария:', error);
      showError(error.message || 'Ошибка при добавлении комментария');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (slug) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        {loading ? (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Ошибка загрузки</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Link to="/posts" className="text-blue-600 hover:underline">
                ← Вернуться к списку постов
              </Link>
            </div>
          </div>
        ) : currentPost ? (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentPost.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>Автор: {currentPost.author?.first_name || currentPost.author?.username}</span>
                <span className="mx-2">•</span>
                <span>{new Date(currentPost.created_at).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="prose max-w-none mb-6">
                {currentPost.content}
              </div>
              
              {/* Теги */}
              {currentPost.tags && currentPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentPost.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Интерактивные кнопки */}
              <div className="flex items-center justify-between border-t pt-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPost.is_liked 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>{currentPost.is_liked ? '❤️' : '🤍'}</span>
                    <span>{isLiking ? 'Загрузка...' : `${currentPost.likes_count || 0} лайков`}</span>
                  </button>
                  
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPost.is_saved
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>{currentPost.is_saved ? '🔖' : '📑'}</span>
                    <span>{isSaving ? 'Сохранение...' : (currentPost.is_saved ? 'Сохранено' : 'Сохранить')}</span>
                  </button>
                </div>
                
                <Link 
                  to="/posts" 
                  className="text-blue-600 hover:underline"
                >
                  ← Назад к постам
                </Link>
              </div>

              {/* Форма комментариев */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Комментарии ({currentPost.comments_count || 0})
                </h3>
                
                {user ? (
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Напишите комментарий..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        disabled={!newComment.trim() || isSubmittingComment}
                      >
                        {isSubmittingComment ? 'Отправка...' : 'Отправить комментарий'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
                    <p className="text-gray-600 mb-3">Войдите в систему, чтобы оставить комментарий</p>
                    <Link 
                      to="/login" 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Войти
                    </Link>
                  </div>
                )}

                {/* Список комментариев */}
                <div className="space-y-4">
                  {commentsLoading ? (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <span className="text-gray-500">Загрузка комментариев...</span>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => {
                      // Отладочная информация для каждого комментария
                      console.log('Отображаем комментарий:', comment);
                      console.log('Пользователь комментария:', comment.user);
                      
                      return (
                        <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {(comment.user?.first_name?.[0] || comment.user?.username?.[0] || 'U').toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {comment.user?.first_name && comment.user?.last_name 
                                    ? `${comment.user.first_name} ${comment.user.last_name}`
                                    : comment.user?.username || 'Аноним'
                                  }
                                </div>
                                <div className="text-sm text-gray-500">
                                  {new Date(comment.created_at).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </div>
                            </div>
                            
                            {comment.likes_count > 0 && (
                              <div className="flex items-center text-gray-500">
                                <span className="text-sm">❤️ {comment.likes_count}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-gray-800 leading-relaxed">
                            {comment.text || comment.content}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                      {currentPost?.comments_count > 0 
                        ? 'Комментарии загружаются...'
                        : 'Пока нет комментариев. Станьте первым!'
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Пост не найден</h2>
              <Link to="/posts" className="text-blue-600 hover:underline">
                ← Вернуться к списку постов
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Все посты</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Поиск постов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все категории</option>
              <option value="tech">Технологии</option>
              <option value="design">Дизайн</option>
              <option value="travel">Путешествия</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="-created_at">Сначала новые</option>
              <option value="created_at">Сначала старые</option>
              <option value="-likes_count">По популярности</option>
            </select>
          </div>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ошибка загрузки</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => dispatch(fetchPosts())}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {posts.length === 0 && (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Постов не найдено</h2>
                <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
