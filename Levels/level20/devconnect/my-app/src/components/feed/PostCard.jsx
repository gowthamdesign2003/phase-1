import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { MessageCircle, Share2, Heart } from "lucide-react";

export default function PostCard({ post }) {
  // Check if post.user is available
  const user = post?.user || {};
  const username = user.username || "Varsha";
  const avatar = user.avatar || "https://i.pravatar.cc/40";

  return (
    <Card className="post-card">
      <CardContent className="p-4 space-y-3">
        {/* Card header */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{username}</h2>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        {/* Post content */}
        <p className="text-sm">{post.content}</p>

        {/* Post actions */}
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1 cursor-pointer">
            <Heart size={18} />
            <span>100 Likes</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <MessageCircle size={18} />
            <span>10 Comments</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <Share2 size={18} />
            <span>Share</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
