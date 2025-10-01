import React from "react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p>Please login</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
