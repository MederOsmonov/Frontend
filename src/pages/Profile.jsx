import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Mock данные пользователя
  const userData = {
    name: user?.name || "Osmonov Meder",
    email: user?.email || "meder.osmonov@example.com",
    bio: "Фронтенд разработчик с страстью к созданию красивых и функциональных интерфейсов. Люблю React, TypeScript и современный CSS.",
    location: "Bishkek, Kyrgyzstan",
    website: "https://osmonov.dev",
    joinDate: "Январь 2023",
    posts: 24,
    likes: 156,
    comments: 89,
    followers: 1247
  };

  const [formData, setFormData] = useState(userData);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-12 max-w-md w-full">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Требуется авторизация</h2>
          <p className="text-gray-600 mb-6 font-medium">Пожалуйста, войдите в систему чтобы просмотреть профиль</p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Войти в аккаунт
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    // Здесь будет логика сохранения данных
  };

  const handleEditPost = (postTitle) => {
    console.log('Редактирование поста:', postTitle);
    alert(`🔧 Редактирование поста: "${postTitle}"\n\nЗдесь откроется редактор поста...`);
  };

  const handleDeletePost = (postTitle) => {
    console.log('Удаление поста:', postTitle);
    if (confirm(`❌ Удалить пост "${postTitle}"?\n\nЭто действие нельзя отменить!`)) {
      alert(`✅ Пост "${postTitle}" успешно удален!`);
      // Здесь будет логика удаления из базы данных
    }
  };

  const handleViewPost = (postTitle) => {
    console.log('Просмотр поста:', postTitle);
    alert(`👀 Открытие поста: "${postTitle}"\n\nЗдесь откроется полная версия поста...`);
    // Здесь будет переход на страницу поста
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleToggle2FA = () => {
    setShow2FAModal(true);
  };

  const handleNotificationChange = (type, value) => {
    if (type === 'email') {
      setEmailNotifications(value);
      alert(`Email уведомления ${value ? 'включены' : 'отключены'}`);
    } else if (type === 'push') {
      setPushNotifications(value);
      alert(`Push уведомления ${value ? 'включены' : 'отключены'}`);
    }
  };

  const handleThemeChange = (type, value) => {
    if (type === 'dark') {
      setDarkTheme(value);
      alert(`Темная тема ${value ? 'включена' : 'отключена'}`);
    } else if (type === 'compact') {
      setCompactMode(value);
      alert(`Компактный режим ${value ? 'включен' : 'отключен'}`);
    }
  };

  const handleAvatarClick = () => {
    setShowAvatarModal(true);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleAvatarSave = () => {
    if (selectedAvatar || avatarFile) {
      alert('✅ Аватар успешно обновлен!');
      setShowAvatarModal(false);
      setSelectedAvatar(null);
      setAvatarFile(null);
    } else {
      alert('❌ Пожалуйста, выберите аватар');
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <>
            {/* Основная информация */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="mr-3 text-3xl">👤</span>
                  Личная информация
                </h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{isEditing ? '❌' : '✎'}</span>
                  <span>{isEditing ? 'Отменить' : 'Редактировать'}</span>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-lg font-bold text-gray-800 mb-3">👤 Полное имя</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-lg"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 border-2 border-transparent rounded-2xl font-semibold text-gray-800 text-lg">
                      {userData.name}
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-lg font-bold text-gray-800 mb-3">📧 Email адрес</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition-all duration-300 font-medium text-gray-800 shadow-lg"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 border-2 border-transparent rounded-2xl font-semibold text-gray-800 text-lg">
                      {userData.email}
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-lg font-bold text-gray-800 mb-3">📍 Местоположение</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-green-500 transition-all duration-300 font-medium text-gray-800 shadow-lg"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 border-2 border-transparent rounded-2xl font-semibold text-gray-800 text-lg">
                      {userData.location}
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-lg font-bold text-gray-800 mb-3">🌐 Веб-сайт</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-cyan-600 focus:border-cyan-500 transition-all duration-300 font-medium text-gray-800 shadow-lg"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50/80 border-2 border-transparent rounded-2xl font-semibold text-gray-800 text-lg">
                      {userData.website}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-lg font-bold text-gray-800 mb-3">📖 О себе</label>
                {isEditing ? (
                  <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-white/80 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-lg resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50/80 border-2 border-transparent rounded-2xl font-medium text-gray-800 text-lg leading-relaxed">
                    {userData.bio}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 border-2 border-gray-400 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    💾 Сохранить изменения
                  </button>
                </div>
              )}
            </div>
          </>
        );

      case 'posts':
        return (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-3 text-3xl">📝</span>
                Мои посты
              </h3>
              <button 
                onClick={() => window.location.href = '/create'}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ✨ Создать пост
              </button>
            </div>

            {/* Тестовая кнопка */}
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-2xl">
              <p className="text-yellow-800 mb-3 font-medium">🧪 Тест функциональности кнопок:</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => alert('✅ Кнопки работают! Функции вызываются правильно.')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300"
                >
                  🧪 Тест алерта
                </button>
                <button 
                  onClick={() => handleEditPost('Тестовый пост')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all duration-300"
                >
                  ✏️ Тест редактирования
                </button>
                <button 
                  onClick={() => handleDeletePost('Тестовый пост')}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-300"
                >
                  🗑️ Тест удаления
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  title: "Как я изучал React за 30 дней",
                  date: "2 дня назад",
                  likes: 24,
                  comments: 8,
                  status: "Опубликован"
                },
                {
                  title: "Лучшие практики TypeScript",
                  date: "1 неделю назад",
                  likes: 18,
                  comments: 5,
                  status: "Опубликован"
                },
                {
                  title: "Черновик: Async/Await в JavaScript",
                  date: "3 дня назад",
                  likes: 0,
                  comments: 0,
                  status: "Черновик"
                }
              ].map((post, index) => (
                <div key={index} className="p-6 bg-gray-50/80 rounded-2xl border-2 border-gray-200/50 hover:bg-gray-100/80 transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-gray-800">{post.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      post.status === 'Опубликован' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{post.date}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <span className="flex items-center space-x-1 text-gray-600">
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          console.log('Кнопка редактирования нажата');
                          handleEditPost(post.title);
                        }}
                        className="px-4 py-2 text-purple-600 hover:text-white hover:bg-purple-600 rounded-xl font-medium transition-all duration-300 border-2 border-purple-600 hover:shadow-lg transform hover:scale-105"
                        title="Редактировать пост"
                      >
                        ✏️ Редактировать
                      </button>
                      <button 
                        onClick={() => {
                          console.log('Кнопка удаления нажата');
                          handleDeletePost(post.title);
                        }}
                        className="px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 rounded-xl font-medium transition-all duration-300 border-2 border-red-600 hover:shadow-lg transform hover:scale-105"
                        title="Удалить пост"
                      >
                        🗑️ Удалить
                      </button>
                      <button 
                        onClick={() => {
                          console.log('Кнопка просмотра нажата');
                          handleViewPost(post.title);
                        }}
                        className="px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-xl font-medium transition-all duration-300 border-2 border-blue-600 hover:shadow-lg transform hover:scale-105"
                        title="Просмотреть пост"
                      >
                        👀 Просмотр
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl">📊</span>
              Активность
            </h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-6 bg-white/50 rounded-2xl border-2 border-white/20 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">{activity.action}</p>
                    <p className="text-gray-700 font-medium">{activity.description}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl">⚙️</span>
              Настройки
            </h3>
            
            <div className="space-y-6">
              <div className="p-6 bg-gray-50/80 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🔐</span>
                  Безопасность
                </h4>
                <div className="space-y-3">
                  <button 
                    onClick={handleChangePassword}
                    className="w-full text-left p-4 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-between bg-white/50 border border-gray-200"
                  >
                    <span className="flex items-center space-x-3">
                      <span>🔑</span>
                      <span className="font-medium">Изменить пароль</span>
                    </span>
                    <span>→</span>
                  </button>
                  <button 
                    onClick={handleToggle2FA}
                    className="w-full text-left p-4 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-between bg-white/50 border border-gray-200"
                  >
                    <span className="flex items-center space-x-3">
                      <span>🛡️</span>
                      <span className="font-medium">Двухфакторная аутентификация</span>
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50/80 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🔔</span>
                  Уведомления
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-200">
                    <span className="flex items-center space-x-3">
                      <span>📧</span>
                      <span className="font-medium">Email уведомления</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailNotifications}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-200">
                    <span className="flex items-center space-x-3">
                      <span>📱</span>
                      <span className="font-medium">Push уведомления</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={pushNotifications}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </label>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50/80 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🎨</span>
                  Внешний вид
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-200">
                    <span className="flex items-center space-x-3">
                      <span>🌙</span>
                      <span className="font-medium">Темная тема</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={darkTheme}
                        onChange={(e) => handleThemeChange('dark', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-200">
                    <span className="flex items-center space-x-3">
                      <span>📐</span>
                      <span className="font-medium">Компактный режим</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={compactMode}
                        onChange={(e) => handleThemeChange('compact', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </label>
                </div>
              </div>

              <div className="p-6 bg-red-50/80 rounded-2xl border-2 border-red-200">
                <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Опасная зона
                </h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      if (confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо!')) {
                        alert('Аккаунт будет удален (это демо)');
                      }
                    }}
                    className="w-full p-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                  >
                    🗑️ Удалить аккаунт
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: "profile", label: "👤 Профиль", icon: "👤" },
    { id: "posts", label: "📝 Мои посты", icon: "📝" },
    { id: "activity", label: "📊 Активность", icon: "📊" },
    { id: "settings", label: "⚙️ Настройки", icon: "⚙️" }
  ];

  const recentActivity = [
    { action: "Опубликовал новый пост", description: "Как я изучал React за 30 дней", time: "2 часа назад", icon: "📝" },
    { action: "Прокомментировал", description: "Отличная статья про TypeScript!", time: "5 часов назад", icon: "💬" },
    { action: "Поставил лайк", description: "Посту о веб-разработке", time: "Вчера", icon: "❤️" },
    { action: "Обновил аватар", description: "Новое фото профиля", time: "2 дня назад", icon: "🖼" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            Мой Профиль
          </h1>
          <p className="text-gray-700 text-xl font-medium max-w-2xl mx-auto">
            Управляйте вашей учетной записью и отслеживайте активность
          </p>
        </div>

<div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Карточка пользователя */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-6 sticky top-8">
              {/* Аватар */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl mx-auto">
                    {userData.name.charAt(0)}
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  <button 
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 left-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    title="Изменить аватар"
                  >
                    📷
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{userData.name}</h2>
                <p className="text-gray-600 font-medium">{userData.email}</p>
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium mt-2">
                  <span>⭐️</span>
                  <span>Pro аккаунт</span>
                </div>
              </div>

              {/* Статистика */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Дата регистрации:</span>
                  <span className="text-gray-800 font-semibold">{userData.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Местоположение:</span>
                  <span className="text-gray-800 font-semibold">{userData.location}</span>
                </div>
              </div>

              {/* Кнопка выхода */}
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>🚪</span>
                <span>Выйти</span>
              </button>
            </div>

            {/* Навигация */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Навигация</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-left ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

{/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Посты', value: userData.posts, icon: '📝', color: 'from-purple-600 to-pink-600' },
                { label: 'Лайки', value: userData.likes, icon: '❤️', color: 'from-red-500 to-pink-600' },
                { label: 'Комментарии', value: userData.comments, icon: '💬', color: 'from-blue-600 to-cyan-600' },
                { label: 'Подписчики', value: userData.followers, icon: '👥', color: 'from-green-600 to-emerald-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/30 p-6 text-center transform hover:scale-105 transition-all duration-300 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Динамический контент в зависимости от выбранной вкладки */}
            <div className="mb-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-blue-800 font-medium">
                🔍 Активная вкладка: <span className="font-bold">{activeTab}</span>
              </p>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed -bottom-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="fixed -top-20 -right-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow animation-delay-2000"></div>

      {/* Модальное окно изменения аватара */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">📷</span>
              Изменить аватар
            </h3>
            
            {/* Загрузка собственного изображения */}
            <div className="mb-8 p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
              <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-2">📁</span>
                Загрузить свое фото
              </h4>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold cursor-pointer hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  🎯 Выбрать файл
                </label>
                {avatarFile && (
                  <div className="flex items-center space-x-3">
                    <img
                      src={avatarFile}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-4 border-purple-300"
                    />
                    <span className="text-green-600 font-medium">✅ Фото загружено</span>
                  </div>
                )}
              </div>
            </div>

            {/* Предустановленные аватары */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🎨</span>
                Готовые аватары
              </h4>
              <div className="grid grid-cols-6 gap-4">
                {[
                  { emoji: '👤', color: 'from-gray-500 to-gray-700' },
                  { emoji: '🧑‍💻', color: 'from-blue-500 to-cyan-600' },
                  { emoji: '👨‍💼', color: 'from-green-500 to-emerald-600' },
                  { emoji: '👩‍💼', color: 'from-pink-500 to-rose-600' },
                  { emoji: '🧑‍🎨', color: 'from-purple-500 to-indigo-600' },
                  { emoji: '👨‍🔬', color: 'from-orange-500 to-red-600' },
                  { emoji: '👩‍🔬', color: 'from-teal-500 to-green-600' },
                  { emoji: '🧑‍🚀', color: 'from-indigo-500 to-purple-600' },
                  { emoji: '👨‍🎓', color: 'from-yellow-500 to-orange-600' },
                  { emoji: '👩‍🎓', color: 'from-cyan-500 to-blue-600' },
                  { emoji: '🧑‍💻', color: 'from-red-500 to-pink-600' },
                  { emoji: '👨‍🎮', color: 'from-emerald-500 to-teal-600' }
                ].map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`w-20 h-20 bg-gradient-to-br ${avatar.color} rounded-2xl flex items-center justify-center text-white text-2xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                      selectedAvatar?.emoji === avatar.emoji ? 'ring-4 ring-purple-500 scale-110' : ''
                    }`}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Инициалы */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🔤</span>
                Аватар с инициалами
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { color: 'from-purple-600 to-blue-700' },
                  { color: 'from-green-600 to-emerald-700' },
                  { color: 'from-red-600 to-pink-700' },
                  { color: 'from-orange-600 to-yellow-700' },
                  { color: 'from-indigo-600 to-purple-700' },
                  { color: 'from-cyan-600 to-blue-700' },
                  { color: 'from-pink-600 to-rose-700' },
                  { color: 'from-teal-600 to-green-700' }
                ].map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect({...avatar, initials: true})}
                    className={`w-20 h-20 bg-gradient-to-br ${avatar.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                      selectedAvatar?.color === avatar.color && selectedAvatar?.initials ? 'ring-4 ring-purple-500 scale-110' : ''
                    }`}
                  >
                    {userData.name.charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex space-x-4 pt-4 border-t-2 border-gray-100">
              <button
                onClick={() => {
                  setShowAvatarModal(false);
                  setSelectedAvatar(null);
                  setAvatarFile(null);
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                ❌ Отмена
              </button>
              <button
                onClick={handleAvatarSave}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ✅ Сохранить аватар
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно смены пароля */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">🔑</span>
              Изменить пароль
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Текущий пароль</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Введите текущий пароль"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Новый пароль</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Введите новый пароль"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Подтвердите пароль</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Повторите новый пароль"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  alert('Пароль изменен!');
                  setShowPasswordModal(false);
                }}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно 2FA */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">🛡️</span>
              Двухфакторная аутентификация
            </h3>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <p className="text-gray-600 mb-6">
                Сканируйте QR-код с помощью приложения аутентификатора
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Код из приложения</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center"
                    placeholder="000000"
                    maxLength="6"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShow2FAModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  alert('2FA включена!');
                  setShow2FAModal(false);
                }}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700"
              >
                Включить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
