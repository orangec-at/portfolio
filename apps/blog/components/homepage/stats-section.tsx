'use client'

import { motion } from 'framer-motion'
import { Code, Briefcase, Users, Award, Coffee, Heart } from 'lucide-react'

const stats = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    number: '5+',
    label: 'Years Experience',
    description: '프론트엔드 개발 경력'
  },
  {
    icon: <Code className="h-8 w-8" />,
    number: '20+',
    label: 'Projects Completed',
    description: '다양한 프로젝트 완료'
  },
  {
    icon: <Users className="h-8 w-8" />,
    number: '10+',
    label: 'Team Collaborations',
    description: '팀 프로젝트 참여'
  },
  {
    icon: <Award className="h-8 w-8" />,
    number: '15+',
    label: 'Technologies',
    description: '사용 가능한 기술들'
  }
]

const achievements = [
  {
    icon: '🚀',
    title: '성능 최적화',
    description: '로딩 속도 40% 개선',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '📱',
    title: '반응형 디자인',
    description: '100+ 모바일 최적화',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🎯',
    title: '사용자 경험',
    description: '95% 만족도 달성',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '⚡',
    title: '빠른 개발',
    description: '개발 속도 30% 향상',
    color: 'from-orange-500 to-red-500'
  }
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
            Numbers Don't Lie
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            5년간의 개발 여정을 숫자로 살펴보세요
          </p>
        </motion.div>

        {/* Main Stats */}
        <motion.div
          className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {stat.icon}
              </div>
              <motion.div
                className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 transition-opacity group-hover:opacity-10`} />
              
              <div className="relative z-10">
                <div className="mb-4 text-4xl">{achievement.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>

              {/* Hover Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 transition-opacity`}
                whileHover={{ opacity: 0.05 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Fun Facts */}
        <motion.div
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-8 text-center text-2xl font-bold">Fun Facts About Me</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Coffee className="mx-auto mb-3 h-10 w-10" />
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-white/80">Cups of Coffee</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mx-auto mb-3 text-5xl">🐱</div>
              <div className="text-3xl font-bold">1</div>
              <div className="text-white/80">Cat Mascot</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="mx-auto mb-3 h-10 w-10 fill-current" />
              <div className="text-3xl font-bold">∞</div>
              <div className="text-white/80">Passion for Code</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}