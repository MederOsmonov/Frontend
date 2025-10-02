import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const authorName = post.author?.first_name 
    ? `${post.author.first_name} ${post.author.last_name || ''}`.trim()
    : post.author?.username || 'Аноним';

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
      {/* Author Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          {post.author?.first_name?.[0] || post.author?.username?.[0] || 'U'}
        </div>
        <div>
          <div className="font-bold text-gray-800">{authorName}</div>
          <div className="text-sm text-gray-600">
            {new Date(post.created_at).toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content?.substring(0, 150)}...
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag.id} 
              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
            >
              #{tag.name}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
              +{post.tags.length - 3} еще
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <span>❤️</span>
            <span>{post.likes_count || 0}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>💬</span>
            <span>{post.comments_count || 0}</span>
          </span>
          {post.is_saved && (
            <span className="flex items-center space-x-1 text-yellow-600">
              <span>🔖</span>
              <span>Сохранено</span>
            </span>
          )}
        </div>
        
        <Link
          to={`/posts/${post.slug}`}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-sm font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Читать →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
