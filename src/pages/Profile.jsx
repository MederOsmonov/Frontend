import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUserProfile, getMyPosts, deletePost } from "../services/api";
import { useNotification } from "../context/NotificationContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { success: showSuccess, error: showError, warning: showWarning } = useNotification();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userStats, setUserStats] = useState({
    totalLikes: 0,
    totalComments: 0,
    totalFollowers: 0
  });
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    bio: '',
    date_joined: ''
  });
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const profileData = await getCurrentUser();
        setUserData(profileData);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  // Загружаем посты пользователя
  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        setPostsLoading(true);
        const posts = await getMyPosts();
        const postsData = posts.results || posts;
        setUserPosts(postsData);
        
        // Подсчитываем статистику из постов
        const totalLikes = postsData.reduce((sum, post) => sum + (post.likes_count || 0), 0);
        const totalComments = postsData.reduce((sum, post) => sum + (post.comments_count || 0), 0);
        
        setUserStats({
          totalLikes,
          totalComments,
          totalFollowers: 0 // Пока оставляем 0, если нет API для подписчиков
        });
      } catch (error) {
        console.error('Ошибка загрузки постов:', error);
      } finally {
        setPostsLoading(false);
      }
    };

    if (user) {
      loadUserPosts();
    }
  }, [user]);

  // Обновляем статистику при фокусе на окне (например, после возврата из редактирования)
  useEffect(() => {
    const handleFocus = () => {
      if (user && userPosts.length > 0) {
        // Перезагружаем посты для обновления статистики
        const reloadPosts = async () => {
          try {
            const posts = await getMyPosts();
            const postsData = posts.results || posts;
            setUserPosts(postsData);
            
            const totalLikes = postsData.reduce((sum, post) => sum + (post.likes_count || 0), 0);
            const totalComments = postsData.reduce((sum, post) => sum + (post.comments_count || 0), 0);
            
            setUserStats({
              totalLikes,
              totalComments,
              totalFollowers: 0
            });
          } catch (error) {
            console.error('Ошибка обновления статистики:', error);
          }
        };
        
        reloadPosts();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user, userPosts.length]);

  // Функции для редактирования
  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData = await updateUserProfile(editData);
      setUserData(updatedData);
      setIsEditing(false);
      setEditData({});
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      alert('Ошибка при сохранении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Функция для удаления поста
  const handleDeletePost = async (post) => {
    const confirmDelete = window.confirm(
      `Вы уверены, что хотите удалить пост "${post.title}"? Это действие нельзя отменить.`
    );
    
    if (!confirmDelete) return;

    try {
      setPostsLoading(true);
      await deletePost(post.slug);
      
      // Обновляем список постов
      const updatedPosts = userPosts.filter(p => p.id !== post.id);
      setUserPosts(updatedPosts);
      
      // Пересчитываем статистику
      const totalLikes = updatedPosts.reduce((sum, p) => sum + (p.likes_count || 0), 0);
      const totalComments = updatedPosts.reduce((sum, p) => sum + (p.comments_count || 0), 0);
      
      setUserStats(prev => ({
        ...prev,
        totalLikes,
        totalComments
      }));
      
      showSuccess('Пост успешно удален');
    } catch (error) {
      console.error('Ошибка удаления поста:', error);
      showError(error.message || 'Ошибка при удалении поста');
    } finally {
      setPostsLoading(false);
    }
  };

  // Функция для редактирования поста
  const handleEditPost = (post) => {
    // Переходим на страницу редактирования поста
    navigate(`/edit-post/${post.slug}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-6">Пожалуйста, войдите в систему</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  const displayName = userData.first_name && userData.last_name 
    ? `${userData.first_name} ${userData.last_name}`
    : userData.username;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
              {(userData.first_name?.[0] || userData.username?.[0] || 'U').toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayName}</h1>
              <p className="text-gray-600 mb-1">{userData.email}</p>
              <p className="text-sm text-gray-500">
                Зарегистрирован: {new Date(userData.date_joined).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>

          {/* Биография или форма редактирования */}
          {isEditing ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Редактирование профиля</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                    <input
                      type="text"
                      value={editData.first_name || ''}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                    <input
                      type="text"
                      value={editData.last_name || ''}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">О себе</label>
                  <textarea
                    value={editData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Расскажите о себе..."
                  />
                </div>
              </div>
            </div>
          ) : (
            userData.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">О себе</h3>
                <p className="text-gray-600">{userData.bio}</p>
              </div>
            )
          )}

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </>
            ) : (
              <button 
                onClick={handleEdit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Редактировать профиль
              </button>
            )}
            <button 
              onClick={logout}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{userPosts.length}</div>
            <div className="text-gray-600">Постов</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">{userStats.totalLikes}</div>
            <div className="text-gray-600">Лайков</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{userStats.totalComments}</div>
            <div className="text-gray-600">Комментариев</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">{userStats.totalFollowers}</div>
            <div className="text-gray-600">Подписчиков</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Мои посты</h2>
          
          {postsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка постов...</p>
            </div>
          ) : userPosts.length > 0 ? (
            <div className="grid gap-6">
              {userPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-3">
                        {post.content ? post.content.substring(0, 150) : ''}...
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>📅 {new Date(post.created_at).toLocaleDateString('ru-RU')}</span>
                        <span>❤️ {post.likes_count || 0}</span>
                        <span>💬 {post.comments_count || 0}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? 'Опубликован' : 'Черновик'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button 
                        onClick={() => window.open(`/posts/${post.slug}`, '_blank')}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Просмотр"
                      >
                        👁️
                      </button>
                      <button 
                        onClick={() => handleEditPost(post)}
                        className="px-3 py-1 text-green-600 hover:bg-green-50 rounded"
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag.id} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">У вас пока нет постов</p>
              <button 
                onClick={() => window.location.href = '/create-post'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Создать первый пост
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
