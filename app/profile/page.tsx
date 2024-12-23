'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'

const posts = [
  { id: 1, content: "Just launched my new project! 🚀 #WebDev", likes: 15, comments: 5 },
  { id: 2, content: "Beautiful sunset today 🌅 #Photography", likes: 32, comments: 8 },
  { id: 3, content: "Learning Next.js and loving it! 💻 #Coding", likes: 24, comments: 3 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage src="/avatars/01.png" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">@johndoe</p>
        <p className="text-center mb-4 max-w-md">
          Web developer, coffee enthusiast, and amateur photographer. Always learning, always creating.
        </p>
        <div className="flex space-x-4 mb-4">
          <div className="text-center">
            <p className="font-bold">523</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">1.4K</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">487</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" onClick={() => setActiveTab('posts')}>Posts</TabsTrigger>
          <TabsTrigger value="reels" onClick={() => setActiveTab('reels')}>Reels</TabsTrigger>
          <TabsTrigger value="tagged" onClick={() => setActiveTab('tagged')}>Tagged</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <p>{post.content}</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reels">
          <p className="text-center text-gray-600 dark:text-gray-400">No reels yet.</p>
        </TabsContent>
        <TabsContent value="tagged">
          <p className="text-center text-gray-600 dark:text-gray-400">No tagged posts yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

