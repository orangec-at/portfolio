'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AnimatedCatProps {
  currentSlide: number
}

export default function AnimatedCat({ currentSlide }: AnimatedCatProps) {
  const [isBlinking, setIsBlinking] = useState(false)
  const [mood, setMood] = useState<'happy' | 'focused' | 'excited'>('happy')

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Change mood based on current slide
  useEffect(() => {
    const moods: ('happy' | 'focused' | 'excited')[] = ['happy', 'focused', 'excited']
    setMood(moods[currentSlide] || 'happy')
  }, [currentSlide])

  const getCatExpression = () => {
    switch (mood) {
      case 'focused':
        return isBlinking ? '😑' : '🤔'
      case 'excited':
        return isBlinking ? '😊' : '🤩'
      default:
        return isBlinking ? '😊' : '😸'
    }
  }

  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Cat Body */}
      <motion.div
        className="relative"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Cat */}
        <motion.div
          className="text-6xl cursor-pointer select-none"
          animate={{
            scale: currentSlide === 0 ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {getCatExpression()}
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          className="absolute -right-8 -top-4 whitespace-nowrap rounded-lg bg-white/90 px-2 py-1 text-xs text-gray-800 shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: currentSlide === 0 ? 1 : 0,
            scale: currentSlide === 0 ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          안녕하세요! 👋
          <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-white/90"></div>
        </motion.div>

        {/* Sparkles effect */}
        {mood === 'excited' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300"
                style={{
                  left: `${20 + i * 15}px`,
                  top: `${10 + i * 8}px`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}

        {/* Thinking bubbles for focused mood */}
        {mood === 'focused' && (
          <motion.div
            className="absolute -right-6 -top-2 text-white/70"
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            💭
          </motion.div>
        )}
      </motion.div>

      {/* Cat paws animation */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-lg"
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        🐾
      </motion.div>
    </motion.div>
  )
}