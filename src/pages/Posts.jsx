import React, { useEffect, useState } from "react";
import PostCard from "../features/posts/PostCard";
import { fetchPosts } from "../services/api";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Все посты</h1>
      {posts.length === 0 ? (
        <p>Нет постов.</p>
      ) : (
        posts.map(post => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
