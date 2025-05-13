import React from "react";
import PostInput from "../components/feed/PostInput";
import PostCard from "../components/feed/PostCard";

// Dummy post for demo
const samplePost = {
  id: 1,
  username: "Varsha",
  avatar: "https://i.pravatar.cc/40",
  content: "Just deployed my new full-stack app 🚀 #DevLife"
};

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-container">
        <PostInput />
        <PostCard post={samplePost} />
      </div>
    </div>
  );
}
