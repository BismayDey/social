"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  Sparkles,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock useToast implementation
export function useToast() {
  const toast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    alert(`${title}\n${description}`);
  };
  return { toast };
}

export default function Page() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "Just launched my new project with Next.js and Tailwind CSS! 🚀 #WebDev",
      likes: 15,
      comments: 5,
      reposts: 2,
    },
    {
      id: 2,
      content:
        "The future of AI is looking bright! What are your thoughts on recent advancements? 🤖 #AI #TechTrends",
      likes: 32,
      comments: 12,
      reposts: 8,
    },
    {
      id: 3,
      content:
        "Beautiful sunset at the beach today. Nature never fails to amaze me. 🌅 #NaturePhotography",
      likes: 45,
      comments: 7,
      reposts: 3,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        content: newPost,
        likes: 0,
        comments: 0,
        reposts: 0,
      };
      setPosts([newPostObj, ...posts]);
      setNewPost("");
      toast({
        title: "Post created",
        description: "Your post has been successfully created!",
      });
    }
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Reels highlight */}
      <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Check out Reels!</h2>
            <p className="text-sm opacity-90">
              Watch and share short, entertaining videos
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/reels">
              <Video className="w-5 h-5 mr-2" />
              Watch Reels
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Create post */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Create a post
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit}>
            <Textarea
              placeholder="What's on your mind?"
              className="mb-4"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>

      {/* Feed */}
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="mb-4">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`/avatars/0${post.id}.png`}
                      alt={`User ${post.id}`}
                    />
                    <AvatarFallback>U{post.id}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">User {post.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @user{post.id}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                >
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    className="flex items-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes}
                  </motion.div>
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Repeat2 className="w-4 h-4 mr-2" />
                  {post.reposts}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
