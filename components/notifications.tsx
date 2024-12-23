'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: number
  content: string
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulating fetching notifications
    const fetchedNotifications: Notification[] = [
      { id: 1, content: "John Doe liked your post", read: false },
      { id: 2, content: "You have a new follower", read: false },
      { id: 3, content: "Your post has reached 100 likes!", read: true },
    ]
    setNotifications(fetchedNotifications)
    setUnreadCount(fetchedNotifications.filter(n => !n.read).length)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(prev - 1, 0))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem 
                className={`flex items-center p-4 ${notification.read ? 'opacity-50' : ''}`}
                onSelect={() => markAsRead(notification.id)}
              >
                <div className="flex-1">{notification.content}</div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                )}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
        {notifications.length === 0 && (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

