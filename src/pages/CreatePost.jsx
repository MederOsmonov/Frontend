import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должен быть вызов API для создания поста
    setSuccess(true);
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Создать пост</h1>
      {success && <div className="text-green-600 mb-2">Пост успешно создан!</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          className="w-full border p-2 mb-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Содержание"
          className="w-full border p-2 mb-2 rounded"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Создать</button>
      </form>
    </div>
  );
};

export default CreatePost;
