import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <div className="border p-4 rounded shadow-md mb-4">
    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
    <p className="mb-2">{post.content.slice(0, 100)}...</p>
    <Link to={`/posts/${post.id}`} className="text-blue-500">Read more</Link>
  </div>
);

export default PostCard;
