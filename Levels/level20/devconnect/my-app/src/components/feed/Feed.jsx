import { useState } from "react";
import PostCard from "./PostCard";
import PostInput from "./PostInput";

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: "John Doe", avatar: "/john.jpg" },
      date: "May 10, 2023",
      content:
        "Just launched my new portfolio website! Check it out and let me know what you think. #webdev #portfolio",
      likes: 1,
      comments: 1,
    },
    {
      id: 2,
      user: { name: "Jane Smith", avatar: "/jane.jpg" },
      date: "May 11, 2023",
      content:
        "Has anyone used the new React 19 features in production? Looking for feedback!",
      likes: 3,
      comments: 2,
    },
  ]);

  return (
    <div className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
      <h1 className="text-2xl font-semibold">Feed</h1>
      <PostInput />
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
