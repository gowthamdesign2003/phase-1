import { Bell, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white py-3 shadow">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">{`</>`}</span>
          DevConnect
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 font-medium">
          <a href="#" className="hover:underline">Feed</a>
          <a href="#" className="hover:underline">Developers</a>
          <a href="#" className="hover:underline">Posts</a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1 rounded-md text-black text-sm outline-none"
            />
          </div>

          <div className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </div>

          <Avatar>
            <AvatarImage src="/varsh.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
