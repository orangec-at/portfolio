'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'other'
  icon: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '📘' },
  { name: 'Next.js', level: 85, category: 'frontend', icon: '▲' },
  { name: 'JavaScript', level: 95, category: 'frontend', icon: '🟨' },
  { name: 'HTML/CSS', level: 90, category: 'frontend', icon: '🎨' },
  { name: 'Tailwind CSS', level: 88, category: 'frontend', icon: '💨' },
  
  // Backend
  { name: 'Node.js', level: 75, category: 'backend', icon: '🟢' },
  { name: 'Express', level: 70, category: 'backend', icon: '🚂' },
  { name: 'Python', level: 65, category: 'backend', icon: '🐍' },
  { name: 'PostgreSQL', level: 70, category: 'backend', icon: '🐘' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools', icon: '📦' },
  { name: 'Docker', level: 75, category: 'tools', icon: '🐳' },
  { name: 'AWS', level: 70, category: 'tools', icon: '☁️' },
  { name: 'Figma', level: 80, category: 'tools', icon: '🎯' },
  
  // Other
  { name: 'Team Leadership', level: 85, category: 'other', icon: '👥' },
  { name: 'Problem Solving', level: 92, category: 'other', icon: '🧩' },
]

const categories = [
  { id: 'all', name: '전체', color: '#FFFFFF' },
  { id: 'frontend', name: '프론트엔드', color: '#61DAFB' },
  { id: 'backend', name: '백엔드', color: '#68D391' },
  { id: 'tools', name: '도구', color: '#F6AD55' },
  { id: 'other', name: '기타', color: '#FC8181' },
]

export default function SkillsSlide() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <div className="flex h-full flex-col text-white">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-4xl font-bold">기술 스택</h1>
        <p className="text-lg text-white/80">
          지속적인 학습으로 쌓아온 기술들입니다
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex space-x-2 rounded-full bg-white/10 p-2 backdrop-blur-sm">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-auto">
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        className="mt-8 grid grid-cols-4 gap-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold">{skills.filter(s => s.category === 'frontend').length}</div>
          <div className="text-sm text-white/80">Frontend</div>
        </div>
        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold">{skills.filter(s => s.category === 'backend').length}</div>
          <div className="text-sm text-white/80">Backend</div>
        </div>
        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold">{skills.filter(s => s.category === 'tools').length}</div>
          <div className="text-sm text-white/80">Tools</div>
        </div>
        <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
          <div className="text-2xl font-bold">{Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}</div>
          <div className="text-sm text-white/80">Avg Level</div>
        </div>
      </motion.div>
    </div>
  )
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      layout
    >
      <div className="mb-3 flex items-center space-x-3">
        <span className="text-2xl">{skill.icon}</span>
        <span className="font-semibold">{skill.name}</span>
      </div>
      
      <div className="mb-2">
        <div className="mb-1 flex justify-between text-sm">
          <span>숙련도</span>
          <span>{skill.level}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{
              duration: 1,
              delay: index * 0.1 + 0.5,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}