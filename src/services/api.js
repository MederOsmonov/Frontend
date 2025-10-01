// src/services/api.js

// Фейковые данные
const fakePosts = [
  { id: 1, title: "First Post", content: "This is the content of the first post." },
  { id: 2, title: "Second Post", content: "Content of the second post goes here." },
  { id: 3, title: "Third Post", content: "Here is the third post content." }
];

// Получить все посты
export function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakePosts), 500);
  });
}

// Получить один пост по id
export function fetchPostById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = fakePosts.find((p) => p.id === id);
      // если поста нет → вернём заглушку вместо ошибки
      resolve(post || { id, title: "Post not found", content: "No content available." });
    }, 500);
  });
}
