'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Calendar, Users, Star } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  year: string
  teamSize: number
  featured: boolean
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: '대규모 쇼핑몰 플랫폼 구축',
    longDescription: '100만+ 사용자를 대상으로 하는 쇼핑몰 플랫폼을 React와 TypeScript로 구축했습니다. 성능 최적화를 통해 로딩 속도를 40% 개선했습니다.',
    image: '🛒',
    technologies: ['React', 'TypeScript', 'Next.js', 'Redux', 'Styled Components'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    year: '2024',
    teamSize: 5,
    featured: true,
  },
  {
    id: '2',
    title: 'Dashboard Analytics',
    description: '실시간 데이터 시각화 대시보드',
    longDescription: '실시간 데이터 처리와 시각화를 위한 대시보드를 개발했습니다. Chart.js와 D3.js를 활용하여 인터랙티브한 차트를 구현했습니다.',
    image: '📊',
    technologies: ['React', 'D3.js', 'Chart.js', 'WebSocket', 'Material-UI'],
    githubUrl: 'https://github.com/example/dashboard',
    liveUrl: 'https://dashboard-demo.com',
    year: '2023',
    teamSize: 3,
    featured: true,
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    description: '모바일 뱅킹 애플리케이션',
    longDescription: 'React Native를 사용하여 크로스 플랫폼 모바일 뱅킹 앱을 개발했습니다. 보안과 사용성을 모두 고려한 설계로 높은 만족도를 얻었습니다.',
    image: '🏦',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    githubUrl: 'https://github.com/example/banking',
    year: '2023',
    teamSize: 4,
    featured: false,
  },
  {
    id: '4',
    title: 'Social Media Platform',
    description: '소셜 미디어 플랫폼',
    longDescription: '실시간 채팅과 미디어 공유 기능을 갖춘 소셜 미디어 플랫폼을 구축했습니다. Socket.io를 활용한 실시간 통신과 이미지 최적화를 구현했습니다.',
    image: '💬',
    technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/example/social',
    liveUrl: 'https://social-demo.com',
    year: '2022',
    teamSize: 6,
    featured: false,
  },
]

export default function ProjectsSlide() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.featured)

  return (
    <div className="flex h-full flex-col text-white">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-4xl font-bold">프로젝트</h1>
        <p className="text-lg text-white/80">
          다양한 도메인에서 경험한 프로젝트들입니다
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div
        className="mb-6 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex space-x-2 rounded-full bg-white/10 p-2 backdrop-blur-sm">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            전체 ({projects.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === 'featured'
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            주요 프로젝트 ({projects.filter(p => p.featured).length})
          </button>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-auto">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

function ProjectCard({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project
  index: number
  onClick: () => void 
}) {
  return (
    <motion.div
      className="cursor-pointer rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      layout
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-4xl">{project.image}</span>
        {project.featured && (
          <div className="flex items-center space-x-1 rounded-full bg-yellow-500/20 px-2 py-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>주요</span>
          </div>
        )}
      </div>
      
      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
      <p className="mb-4 text-white/80">{project.description}</p>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/20 px-2 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm text-white/70">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{project.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{project.teamSize}명</span>
          </div>
        </div>
        <span className="text-white/50">더보기 →</span>
      </div>
    </motion.div>
  )
}

function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: Project
  onClose: () => void 
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="mx-4 max-w-2xl rounded-2xl bg-white/10 p-8 backdrop-blur-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{project.image}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <div className="flex items-center space-x-4 text-white/70">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{project.teamSize}명 팀</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <p className="mb-6 text-white/90 leading-relaxed">
          {project.longDescription}
        </p>
        
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-white">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/20 px-3 py-1 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:bg-white/30"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:bg-white/30"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}