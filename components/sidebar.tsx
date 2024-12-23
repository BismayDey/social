'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TrendingUp, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 hidden lg:block p-4 bg-white dark:bg-gray-800 min-h-screen">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@johndoe</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Trending Topics
        </h2>
        <ul className="space-y-2">
          {['#NextJS', '#TailwindCSS', '#WebDev', '#JavaScript', '#AI'].map((topic, index) => (
            <motion.li 
              key={topic} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
              className="text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
            >
              {topic}
            </motion.li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Suggested Users
        </h2>
        <ul className="space-y-4">
          {['Alice', 'Bob', 'Charlie'].map((user, index) => (
            <motion.li 
              key={user}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <Avatar>
                <AvatarImage src={`/avatars/0${index + 2}.png`} alt={user} />
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.toLowerCase()}</p>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </motion.li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

