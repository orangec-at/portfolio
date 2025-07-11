'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Calendar, Mail, Github, Linkedin } from 'lucide-react'

export default function AboutMeSlide() {
  return (
    <div className="flex h-full items-center justify-center text-white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Profile Section */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 overflow-hidden rounded-full border-4 border-white/20 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/static/images/profile.jpeg"
              alt="Profile"
              width={200}
              height={200}
              className="h-48 w-48 object-cover"
            />
          </motion.div>

          <motion.h1
            className="mb-4 text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            이재일 (Jay Lee)
          </motion.h1>

          <motion.h2
            className="mb-6 text-xl text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            5년차 프론트엔드 개발자
          </motion.h2>

          {/* Contact Info */}
          <motion.div
            className="space-y-3 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Seoul, South Korea</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>5+ years experience</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>jay.lee@example.com</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mt-6 flex space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* About Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h3
            className="mb-6 text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            안녕하세요! 👋
          </motion.h3>

          <motion.div
            className="space-y-4 text-lg leading-relaxed text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p>
              사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
              React와 TypeScript를 주력으로 사용하며, 
              성능 최적화와 접근성을 고려한 웹 애플리케이션을 개발합니다.
            </p>
            
            <p>
              5년간 다양한 프로젝트를 통해 팀워크와 문제 해결 능력을 기르며,
              항상 새로운 기술을 학습하고 성장하려 노력합니다.
            </p>

            <p>
              깔끔한 코드와 효율적인 개발 프로세스를 추구하며,
              동료들과의 협업을 통해 더 나은 제품을 만들어가는 것을 즐깁니다.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm text-white/80">Projects Completed</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm text-white/80">Technologies</div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-white/80">Passion</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}