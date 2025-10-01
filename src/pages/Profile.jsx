import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

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
                  <button className="absolute bottom-0 left-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-gray-700 transition-colors shadow-lg">
                    ✎
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

            {/* Недавняя активность */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/30 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3 text-3xl">📊</span>
                Недавняя активность
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
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed -bottom-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="fixed -top-20 -right-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

export default Profile;
