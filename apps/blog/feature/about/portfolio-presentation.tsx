'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

// Slide data structure
interface Slide {
  id: string
  title: string
  color: string
  component: React.ComponentType
}

// Import slide components
import AboutMeSlide from './slides/about-me-slide'
import SkillsSlide from './slides/skills-slide'
import ProjectsSlide from './slides/projects-slide'
import AnimatedCat from './components/animated-cat'

const slides: Slide[] = [
  {
    id: 'about',
    title: 'About me',
    color: '#29538D', // Blue
    component: AboutMeSlide,
  },
  {
    id: 'skills',
    title: 'Skills',
    color: '#7589EB', // Purple
    component: SkillsSlide,
  },
  {
    id: 'projects',
    title: 'Projects',
    color: '#17BED1', // Teal
    component: ProjectsSlide,
  },
]

export default function PortfolioPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [direction, setDirection] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
        case ' ':
          event.preventDefault()
          goToNext()
          break
        case 'Escape':
          setIsAutoPlay(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const goToNext = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Folder Navigation */}
      <div className="absolute left-1/2 top-8 z-50 -translate-x-1/2">
        <FolderNavigation
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={goToSlide}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: slides[currentSlide].color }}
          >
            <div className="h-full w-full max-w-6xl px-8 py-16">
              <CurrentSlideComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center space-x-4">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Auto-play Button */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        >
          {isAutoPlay ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>

        <button
          onClick={goToNext}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-4 left-1/2 z-50 w-64 -translate-x-1/2">
        <div className="h-1 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-white/70">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-50 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            animate={{
              scale: index === currentSlide ? 1.25 : 1,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

// Folder Navigation Component
function FolderNavigation({
  slides,
  currentSlide,
  onSlideChange,
}: {
  slides: Slide[]
  currentSlide: number
  onSlideChange: (index: number) => void
}) {
  return (
    <div className="relative">
      {/* Cat Mascot */}
      <div className="absolute -top-12 left-8 z-20">
        <AnimatedCat currentSlide={currentSlide} />
      </div>

      {/* Folder Tabs */}
      <div className="relative flex">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`relative cursor-pointer ${index > 0 ? '-ml-4' : ''}`}
            style={{ zIndex: slides.length - index }}
            animate={{
              scale: index === currentSlide ? 1.05 : 1,
              y: index === currentSlide ? -5 : 0,
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSlideChange(index)}
          >
            <motion.div
              className="rounded-t-2xl px-8 py-4 shadow-lg relative overflow-hidden"
              style={{ backgroundColor: slide.color }}
              animate={{
                backgroundColor: slide.color,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Active indicator */}
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <span className="relative text-lg font-semibold text-white">
                {slide.title}
              </span>
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-t-2xl"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0.5, originY: 1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Folder Body */}
      <motion.div
        className="h-16 w-full rounded-b-2xl shadow-xl"
        style={{ backgroundColor: slides[currentSlide].color }}
        animate={{ backgroundColor: slides[currentSlide].color }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

// Slide transition variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
}