import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import { useNotification } from "../context/NotificationContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success: showSuccess, error: showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      showError('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        status: 'published'
      };

      await dispatch(addPost(postData)).unwrap();
      
      setSuccess(true);
      showSuccess('Пост успешно создан!');
      setTitle("");
      setContent("");
      
      // Перенаправляем на страницу постов через 2 секунды
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
      
    } catch (error) {
      console.error('Ошибка создания поста:', error);
      showError(error.message || 'Ошибка создания поста');
    } finally {
      setIsSubmitting(false);
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-12 px-4 pt-28 relative">
      <div className="max-w-4xl mx-auto">
        {/* Анимированная карточка */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border-2 border-white/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          {/* Декоративный верхний бар */}
          <div className="h-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"></div>
          
          <div className="p-8 md:p-12">
            {/* Заголовок с иконкой */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl transform rotate-45 flex items-center justify-center shadow-2xl">
                  <span className="text-white text-3xl transform -rotate-45">✨</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-white animate-ping"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent drop-shadow-sm">
              Создать Новый Пост
            </h1>
            <p className="text-gray-700 text-xl text-center mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Поделитесь своими мыслями, идеями и историями с сообществом
            </p>

            {/* Успешное сообщение */}
            {success && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl shadow-2xl transform animate-bounce-in border-2 border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-xl">Успешно опубликовано!</p>
                    <p className="text-lg opacity-95 mt-1">Ваш пост теперь доступен для всех пользователей</p>
                  </div>
                </div>
              </div>
)}
<form onSubmit={handleSubmit} className="space-y-8">
  {/* Поле заголовка */}
  <div className="group">
                <label className="block text-lg font-bold text-gray-800 mb-3 ml-2">
                  📝 Заголовок поста
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Введите захватывающий заголовок..."
                    className="w-full px-6 py-5 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-3 focus:ring-purple-600 focus:border-purple-500 transition-all duration-300 group-hover:shadow-2xl group-hover:border-purple-400 placeholder-gray-500 text-lg font-medium text-gray-800 shadow-lg"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2 ml-2 font-medium">
                  Придумайте яркий и привлекательный заголовок
                </p>
              </div>

              {/* Поле содержания */}
              <div className="group">
                <label className="block text-lg font-bold text-gray-800 mb-3 ml-2">
                  📄 Содержание поста
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Расскажите свою историю, поделитесь мыслями или идеями..."
                    rows="12"
                    className="w-full px-6 py-5 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-3 focus:ring-blue-600 focus:border-blue-500 transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-400 placeholder-gray-500 text-lg font-medium text-gray-800 shadow-lg resize-none leading-relaxed"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                  />
                  <div className="absolute right-6 top-6 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2 ml-2 font-medium">
                  Минимум 50 символов. Будьте креативны!
                </p>
              </div>
{/* Дополнительные опции */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50/80 rounded-2xl border-2 border-gray-200">
                <div className="group">
                  <label className="block text-md font-bold text-gray-800 mb-3">🏷 Категория</label>
                  <select className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-300 font-medium text-gray-800">
                    <option>Личный блог</option>
                    <option>Технологии</option>
                    <option>Искусство</option>
                    <option>Наука</option>
                    <option>Путешествия</option>
                  </select>
                </div>
                
                <div className="group">
                  <label className="block text-md font-bold text-gray-800 mb-3">🏞 Обложка</label>
                  <div className="flex items-center space-x-4">
                    <button 
                      type="button"
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-400 transition-all duration-300 font-medium text-gray-700 hover:text-purple-700"
                    >
                      📸 Загрузить фото
                    </button>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="button"
                  className="flex-1 px-8 py-5 border-2 border-gray-400 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📋 Предпросмотр
                </button>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex-1 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800'
                  } text-white relative overflow-hidden group`}
                >
                  {/* Анимация загрузки */}
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 border-3 border-white/40 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <span className={`flex items-center justify-center space-x-3 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="text-xl">🚀 Опубликовать Пост</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </span>
                  
                  {/* Эффект блеска */}
                  <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
  </div>
</form>
{/* Статистика текста */}
<div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{title.length}</div>
                  <div className="text-sm text-gray-700 font-medium">Символов в заголовке</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{content.length}</div>
                  <div className="text-sm text-gray-700 font-medium">Символов в тексте</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">{content.split(/\s+/).filter(word => word.length > 0).length}</div>
                  <div className="text-sm text-gray-700 font-medium">Слов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-700">{Math.ceil(content.length / 1500)}</div>
                  <div className="text-sm text-gray-700 font-medium">Минут чтения</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Декоративные элементы */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-slow"></div>
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default CreatePost;