'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

interface Video {
  id: number
  width: number
  height: number
  url: string
  image: string
  duration: number
  user: {
    name: string
    url: string
  }
  video_files: {
    link: string
    quality: string
  }[]
}

export default function ReelsPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        'https://api.pexels.com/videos/search?query=nature&per_page=30&orientation=portrait',
        {
          headers: {
            Authorization: 'R0KRzmpHJddXK5aVDVLZTx7Qtt0McUYVYFBMtG7naW99MkSz4OG6yBWm',
          },
        }
      )
      const data = await response.json()
      setVideos(data.videos)
      setLoading(false)
      const initialLikes = data.videos.reduce((acc: { [key: number]: number }, video: Video) => {
        acc[video.id] = Math.floor(Math.random() * 1000)
        return acc
      }, {})
      setLikes(initialLikes)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setLoading(false)
      toast({
        title: "Error",
        description: "Failed to fetch videos. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleLike = (id: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }))
  }

  const handleVideoNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    } else if (direction === 'prev' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex]!.muted = !isMuted
    }
  }

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.muted = isMuted
      currentVideo.play().catch(() => {
        // Auto-play was prevented, handle this if needed
      })
    }

    return () => {
      if (currentVideo) {
        currentVideo.pause()
      }
    }
  }, [currentVideoIndex, isMuted])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        handleVideoNavigation('prev')
      } else if (event.key === 'ArrowDown') {
        handleVideoNavigation('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentVideoIndex])

  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]">Loading...</div>
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden relative bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full flex items-center justify-center"
        >
          <video
            ref={(el) => (videoRefs.current[currentVideoIndex] = el)}
            src={videos[currentVideoIndex]?.video_files[0]?.link}
            poster={videos[currentVideoIndex]?.image}
            className="h-full w-full object-contain"
            loop
            playsInline
            muted={isMuted}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${videos[currentVideoIndex]?.user.name}`} alt={videos[currentVideoIndex]?.user.name} />
                  <AvatarFallback>{videos[currentVideoIndex]?.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="font-semibold text-white">{videos[currentVideoIndex]?.user.name}</p>
                  <p className="text-sm text-gray-300">@{videos[currentVideoIndex]?.user.name.toLowerCase().replace(' ', '')}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Follow
              </Button>
            </div>
          </div>
          <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
            <Button variant="ghost" size="icon" onClick={() => handleLike(videos[currentVideoIndex].id)}>
              <Heart className="h-6 w-6 text-white" />
            </Button>
            <span className="text-white text-sm">{likes[videos[currentVideoIndex].id]}</span>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-6 w-6 text-white" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-white" />
              ) : (
                <Volume2 className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVideoNavigation('prev')}
          disabled={currentVideoIndex === 0}
          className="bg-black/50 hover:bg-black/70"
        >
          <ChevronUp className="h-8 w-8 text-white" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVideoNavigation('next')}
          disabled={currentVideoIndex === videos.length - 1}
          className="bg-black/50 hover:bg-black/70"
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  )
}

