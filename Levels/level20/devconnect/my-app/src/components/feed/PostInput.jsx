import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PostInput() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="/john.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Textarea placeholder="What's on your mind?" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-gray-500">
            <span>📷</span><span>🔗</span><span>💻</span><span>😊</span>
          </div>
          <Button>Post</Button>
        </div>
      </CardContent>
    </Card>
  );
}
