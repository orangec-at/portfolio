'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MessageCircle, ArrowRight, MapPin } from 'lucide-react'

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    description: 'jay.lee@example.com',
    href: 'mailto:jay.lee@example.com',
    color: 'from-red-500 to-pink-500',
    hoverColor: 'hover:from-red-600 hover:to-pink-600'
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: 'GitHub',
    description: 'github.com/jaylee',
    href: 'https://github.com/jaylee',
    color: 'from-gray-700 to-gray-900',
    hoverColor: 'hover:from-gray-800 hover:to-black'
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    title: 'LinkedIn',
    description: 'linkedin.com/in/jaylee',
    href: 'https://linkedin.com/in/jaylee',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:from-blue-700 hover:to-blue-900'
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'KakaoTalk',
    description: 'ID: jaylee_dev',
    href: '#',
    color: 'from-yellow-400 to-yellow-600',
    hoverColor: 'hover:from-yellow-500 hover:to-yellow-700'
  }
]

const workInfo = [
  {
    icon: '💼',
    title: '협업 가능',
    description: '프론트엔드 개발, 컨설팅',
  },
  {
    icon: '🌍',
    title: '위치',
    description: '서울, 대한민국 (원격 가능)',
  },
  {
    icon: '⏰',
    title: '응답 시간',
    description: '보통 24시간 이내',
  },
  {
    icon: '💬',
    title: '언어',
    description: '한국어, English',
  }
]

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            프로젝트 협업이나 문의 사항이 있으시면 언제든 연락주세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${method.color} text-white transition-all ${method.hoverColor}`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {method.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Work Info */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Work Information
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {workInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-2 text-2xl">{info.icon}</div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {info.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {info.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - CTA & Cat */}
          <motion.div
            className="flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Cat */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-8xl md:text-9xl">😸</div>
              
              {/* Speech Bubble */}
              <motion.div
                className="absolute -top-4 -right-4 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-200"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                함께 만들어요! 🚀
                <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-white dark:bg-gray-800"></div>
              </motion.div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              className="w-full max-w-md rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-2xl font-bold">Ready to Start?</h3>
              <p className="mb-6 text-white/90">
                새로운 프로젝트를 시작할 준비가 되어있습니다. 
                언제든 연락주세요!
              </p>
              
              <motion.a
                href="mailto:jay.lee@example.com"
                className="inline-flex items-center space-x-2 rounded-full bg-white px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                <span>Send Email</span>
              </motion.a>
            </motion.div>

            {/* Location Info */}
            <motion.div
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <MapPin className="h-5 w-5" />
              <span>Based in Seoul, Available Worldwide</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            지금 바로 시작하고 싶으시다면? 
            <a 
              href="mailto:jay.lee@example.com" 
              className="ml-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              이메일 보내기 →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}