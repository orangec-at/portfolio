'use client'

import { motion } from 'framer-motion'
import Link from '@/components/origin/Link'
import Image from 'next/image'
import { ArrowRight, Code, Zap, Users, Target } from 'lucide-react'

const skills = [
  { name: 'Frontend', icon: '🎨', level: 95 },
  { name: 'React', icon: '⚛️', level: 90 },
  { name: 'TypeScript', icon: '📘', level: 88 },
  { name: 'Performance', icon: '⚡', level: 85 },
]

const highlights = [
  {
    icon: <Code className="h-6 w-6" />,
    title: '깔끔한 코드',
    description: '유지보수가 쉬운 클린 코드를 작성합니다',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '성능 최적화',
    description: '사용자 경험 향상을 위한 최적화에 집중합니다',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '팀워크',
    description: '동료들과의 협업을 통해 더 나은 결과를 만듭니다',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: '문제 해결',
    description: '복잡한 문제를 단순하고 효율적으로 해결합니다',
  },
]

export default function AboutPreview() {
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
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            저에 대해 조금 더 알아보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side - Profile & Bio */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-6">
              <motion.div
                className="overflow-hidden rounded-full border-4 border-gray-200 shadow-lg dark:border-gray-700"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/static/images/profile.jpeg"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="h-30 w-30 object-cover"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  이재일 (Jay Lee)
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400">
                  Frontend Developer
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  5+ years experience
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다. 
                React와 TypeScript를 주력으로 사용하며, 성능 최적화와 접근성을 고려한 
                웹 애플리케이션을 개발합니다.
              </p>
              <p>
                5년간 다양한 프로젝트를 통해 팀워크와 문제 해결 능력을 기르며, 
                항상 새로운 기술을 학습하고 성장하려 노력합니다.
              </p>
            </div>

            {/* Skills Progress */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Core Skills
              </h4>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <motion.button
                className="group flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition-all hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>전체 포트폴리오 보기</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Side - Highlights */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              What I Bring
            </h4>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {item.icon}
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              className="mt-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-lg font-semibold">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm text-white/80">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-sm text-white/80">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-white/80">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Passion</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}