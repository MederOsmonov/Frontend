// src/services/api.js
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1";

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем interceptor для автоматического добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем interceptor для обработки ошибок авторизации
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await api.post('/accounts/auth/token/refresh/', {
            refresh: refreshToken
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Токен рефреша недействителен, перенаправляем на логин
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// ==================== AUTHENTICATION ====================

// Регистрация
export const register = async (userData) => {
  const response = await api.post('/accounts/auth/register/', userData);
  return response.data;
};

// Логин
export const login = async (credentials) => {
  const response = await api.post('/accounts/auth/login/', credentials);
  const { access, refresh, user } = response.data;
  
  // Сохраняем токены в localStorage
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('user', JSON.stringify(user));
  
  return response.data;
};

// Выход
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// Обновление токена
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('No refresh token');
  
  const response = await api.post('/accounts/auth/token/refresh/', {
    refresh: refresh
  });
  
  const { access } = response.data;
  localStorage.setItem('access_token', access);
  
  return response.data;
};

// ==================== USER PROFILE ====================

// Получить профиль текущего пользователя
export const getCurrentUser = async () => {
  const response = await api.get('/accounts/users/me/');
  return response.data;
};

// Обновить профиль пользователя
export const updateUserProfile = async (userData) => {
  const response = await api.put('/accounts/users/me/', userData);
  return response.data;
};

// Получить профиль пользователя по username
export const getUserProfile = async (username) => {
  const response = await api.get(`/accounts/users/${username}/`);
  return response.data;
};

// Получить список всех пользователей
export const getUsers = async (params = {}) => {
  const response = await api.get('/accounts/users/', { params });
  return response.data;
};

// ==================== POSTS ====================

// Получить все посты
export const fetchPosts = async (params = {}) => {
  const response = await api.get('/blog/posts/', { params });
  return response.data;
};

// Получить один пост по slug
export const fetchPostBySlug = async (slug) => {
  const response = await api.get(`/blog/posts/${slug}/`);
  return response.data;
};

// Получить один пост по ID (для совместимости)
export const fetchPostById = async (id) => {
  const response = await api.get(`/blog/posts/${id}/`);
  return response.data;
};

// Создать новый пост
export const createPost = async (postData) => {
  const response = await api.post('/blog/posts/', postData);
  return response.data;
};

// Получить пост по slug
export const getPost = async (slug) => {
  const response = await api.get(`/blog/posts/${slug}/`);
  return response.data;
};

// Обновить пост
export const updatePost = async (slug, postData) => {
  const response = await api.put(`/blog/posts/${slug}/`, postData);
  return response.data;
};

// Удалить пост
export const deletePost = async (slug) => {
  const response = await api.delete(`/blog/posts/${slug}/`);
  return response.data;
};

// Получить мои посты
export const getMyPosts = async (params = {}) => {
  const response = await api.get('/blog/posts/my_posts/', { params });
  return response.data;
};

// Получить популярные посты
export const getPopularPosts = async (params = {}) => {
  const response = await api.get('/blog/posts/popular/', { params });
  return response.data;
};

// Получить сохраненные посты
export const getSavedPosts = async (params = {}) => {
  const response = await api.get('/blog/posts/saved/', { params });
  return response.data;
};

// ==================== LIKES ====================

// Лайкнуть/анлайкнуть пост
export const togglePostLike = async (slug) => {
  const response = await api.post(`/blog/posts/${slug}/like/`);
  return response.data;
};

// Лайкнуть/анлайкнуть комментарий
export const toggleCommentLike = async (commentId) => {
  const response = await api.post(`/blog/comments/${commentId}/like/`);
  return response.data;
};

// ==================== SAVED POSTS ====================

// Сохранить/убрать из сохраненных пост
export const toggleSavePost = async (slug) => {
  const response = await api.post(`/blog/posts/${slug}/save/`);
  return response.data;
};

// Получить список сохраненных постов
export const getSavedPostsList = async (params = {}) => {
  const response = await api.get('/blog/saved-posts/', { params });
  return response.data;
};

// Удалить из сохраненных
export const removeSavedPost = async (savedPostId) => {
  const response = await api.delete(`/blog/saved-posts/${savedPostId}/`);
  return response.data;
};

// ==================== COMMENTS ====================

// Получить комментарии
export const getComments = async (params = {}) => {
  const response = await api.get('/blog/comments/', { params });
  return response.data;
};

// Создать комментарий
export const createComment = async (commentData) => {
  const response = await api.post('/blog/comments/', commentData);
  return response.data;
};

// Получить комментарий по ID
export const getComment = async (commentId) => {
  const response = await api.get(`/blog/comments/${commentId}/`);
  return response.data;
};

// Обновить комментарий
export const updateComment = async (commentId, commentData) => {
  const response = await api.put(`/blog/comments/${commentId}/`, commentData);
  return response.data;
};

// Удалить комментарий
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/blog/comments/${commentId}/`);
  return response.data;
};

// ==================== CATEGORIES ====================

// Получить категории
export const getCategories = async () => {
  const response = await api.get('/blog/categories/');
  return response.data;
};

// Создать категорию
export const createCategory = async (categoryData) => {
  const response = await api.post('/blog/categories/', categoryData);
  return response.data;
};

// Получить категорию по slug
export const getCategory = async (slug) => {
  const response = await api.get(`/blog/categories/${slug}/`);
  return response.data;
};

// ==================== TAGS ====================

// Получить теги
export const getTags = async () => {
  const response = await api.get('/blog/tags/');
  return response.data;
};

// Создать тег
export const createTag = async (tagData) => {
  const response = await api.post('/blog/tags/', tagData);
  return response.data;
};

// Получить тег по slug
export const getTag = async (slug) => {
  const response = await api.get(`/blog/tags/${slug}/`);
  return response.data;
};

export default api;
