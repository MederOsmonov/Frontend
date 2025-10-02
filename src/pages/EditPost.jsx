import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../context/NotificationContext";
import { getPost, updatePost } from "../services/api";

const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success: showSuccess, error: showError, warning: showWarning } = useNotification();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        const post = await getPost(slug);
        
        // Проверяем, что пользователь является автором поста
        if (post.author?.id !== user.id) {
          showError('У вас нет прав для редактирования этого поста');
          navigate('/profile');
          return;
        }

        setPostData({
          title: post.title || '',
          content: post.content || '',
          category: post.category?.id || '',
          tags: post.tags || [],
          status: post.status || 'draft'
        });
      } catch (error) {
        console.error('Ошибка загрузки поста:', error);
        showError('Ошибка при загрузке поста');
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug, user, navigate, showError]);

  const handleInputChange = (field, value) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postData.title.trim()) {
      showWarning('Введите заголовок поста');
      return;
    }

    if (!postData.content.trim()) {
      showWarning('Введите содержание поста');
      return;
    }

    try {
      setSubmitting(true);
      
      const updateData = {
        title: postData.title.trim(),
        content: postData.content.trim(),
        status: postData.status
      };

      if (postData.category) {
        updateData.category = postData.category;
      }

      await updatePost(slug, updateData);
      showSuccess('Пост успешно обновлен!');
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка обновления поста:', error);
      showError(error.message || 'Ошибка при обновлении поста');
    } finally {
      setSubmitting(false);
    }
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
          <p className="text-gray-600">Загрузка поста...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Редактировать пост</h1>
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Назад к профилю
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Заголовок */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок поста
              </label>
              <input
                type="text"
                value={postData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Введите заголовок поста..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Содержание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Содержание
              </label>
              <textarea
                value={postData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Напишите содержание поста..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {/* Статус */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={postData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликовано</option>
              </select>
            </div>

            {/* Кнопки */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;