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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Video, Hash, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreatePage() {
  const [postType, setPostType] = useState<"text" | "image" | "video">("text");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ postType, content, tags, location, file });
    // Reset form
    setContent("");
    setTags("");
    setLocation("");
    setFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h1 className="text-2xl font-bold">Create New Post</h1>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={postType === "text" ? "default" : "outline"}
                  onClick={() => setPostType("text")}
                >
                  Text
                </Button>
                <Button
                  type="button"
                  variant={postType === "image" ? "default" : "outline"}
                  onClick={() => setPostType("image")}
                >
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Image
                </Button>
                <Button
                  type="button"
                  variant={postType === "video" ? "default" : "outline"}
                  onClick={() => setPostType("video")}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={postType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {postType === "text" && (
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[200px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  )}

                  {postType === "image" && (
                    <div className="space-y-2">
                      <Label htmlFor="image-upload">Upload Image</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  )}

                  {postType === "video" && (
                    <div className="space-y-2">
                      <Label htmlFor="video-upload">Upload Video</Label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Add a caption..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-gray-500" />
                  <Input
                    id="tags"
                    placeholder="Add tags..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="Add location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
