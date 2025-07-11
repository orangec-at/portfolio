'use client'

import { motion } from 'framer-motion'
import Link from '@/components/origin/Link'
import { ArrowRight, FileText, User, Mail } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-6xl">
                안녕하세요! 👋
              </h1>
              <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300 md:text-3xl">
                저는{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  이재일
                </span>
                입니다
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              5년차 프론트엔드 개발자로, 사용자 경험을 최우선으로 생각하며
              <br />
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                React, TypeScript, Next.js
              </span>
              를 활용해 웹 애플리케이션을 개발합니다.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-md dark:bg-gray-800/80 dark:text-gray-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/about">
                <motion.button
                  className="group flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-medium shadow-lg transition-all hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5" />
                  <span>포트폴리오 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/posts">
                <motion.button
                  className="group flex items-center justify-center space-x-2 rounded-full border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="h-5 w-5" />
                  <span>블로그 읽기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-400 lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">jay.lee@example.com</span>
              </div>
              <div className="text-sm">📍 Seoul, South Korea</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Cat Mascot */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Cat */}
              <motion.div
                className="text-9xl md:text-[12rem]"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                😸
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-8 -right-4 text-2xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                💻
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-8 text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                ⚛️
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-12 text-xl"
                animate={{
                  y: [0, -8, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                ✨
              </motion.div>

              {/* Code floating animation */}
              <motion.div
                className="absolute top-1/4 -left-6 rounded-lg bg-gray-800 px-2 py-1 text-xs text-green-400 shadow-lg"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                console.log('Hello! 👋')
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-gray-400"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm">Scroll to explore</span>
            <div className="h-6 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}