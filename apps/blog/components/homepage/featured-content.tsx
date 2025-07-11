'use client'

import { motion } from 'framer-motion'
import Link from '@/components/origin/Link'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { ArrowRight, Calendar, Clock, MessageCircle, ExternalLink, Github } from 'lucide-react'
import peeksData from '@/data/peeks.json'

// This will be dynamic in real implementation
const featuredPosts = [
  {
    slug: 'understanding-react-performance',
    title: 'React 성능 최적화 완전 가이드',
    summary: 'React 애플리케이션의 성능을 극대화하는 다양한 기법들을 살펴봅니다.',
    date: '2024-12-15',
    tags: ['React', 'Performance', 'Optimization'],
    readTime: '8 min'
  },
  {
    slug: 'modern-css-techniques',
    title: '모던 CSS 기법으로 인터랙티브 UI 만들기',
    summary: 'CSS Grid, Flexbox, CSS Variables를 활용한 반응형 레이아웃 구성법을 알아봅니다.',
    date: '2024-12-10',
    tags: ['CSS', 'UI/UX', 'Frontend'],
    readTime: '6 min'
  }
]

const featuredProjects = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: '대규모 쇼핑몰 플랫폼 구축',
    image: '🛒',
    technologies: ['React', 'TypeScript', 'Next.js'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://ecommerce-demo.com'
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: '실시간 데이터 시각화 대시보드',
    image: '📊',
    technologies: ['React', 'D3.js', 'Chart.js'],
    githubUrl: 'https://github.com/example/dashboard',
    liveUrl: 'https://dashboard-demo.com'
  }
]

interface FeaturedContentProps {
  posts?: any[]
}

export default function FeaturedContent({ posts = [] }: FeaturedContentProps) {
  // Get recent peeks
  const recentPeeks = peeksData.slice(0, 3)
  
  // Use provided posts or fallback to featured posts
  const displayPosts = posts.length > 0 ? posts.slice(0, 2) : featuredPosts

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
            Latest Content
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            최근 작성한 글과 프로젝트들을 확인해보세요
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Recent Blog Posts */}
          <div>
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                📝 Recent Posts
              </h3>
              <Link href="/posts">
                <motion.button
                  className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  whileHover={{ x: 5 }}
                >
                  <span>모든 포스트 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {displayPosts.map((post, index) => (
                <PostCard key={post.slug || post.title} post={post} index={index} />
              ))}
            </div>
          </div>

          {/* Recent Peeks */}
          <div>
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                💭 Recent Peeks
              </h3>
              <Link href="/peeks">
                <motion.button
                  className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  whileHover={{ x: 5 }}
                >
                  <span>모든 Peeks 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recentPeeks.map((peek, index) => (
                <PeekCard key={peek.id} peek={peek} index={index} />
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                🚀 Featured Projects
              </h3>
              <Link href="/about">
                <motion.button
                  className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  whileHover={{ x: 5 }}
                >
                  <span>모든 프로젝트 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PostCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.article
      className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
    >
      <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <time>{formatDate(post.date, siteMetadata.locale)}</time>
        </div>
        {post.readTime && (
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        )}
      </div>

      <h4 className="mb-3 text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
        <Link href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      </h4>

      <p className="mb-4 text-gray-600 dark:text-gray-400 line-clamp-3">
        {post.summary}
      </p>

      {post.tags && (
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

function PeekCard({ peek, index }: { peek: any; index: number }) {
  return (
    <motion.div
      className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
    >
      <div className="mb-2 flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
          JL
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3" />
          <time>{formatDate(peek.timestamp, siteMetadata.locale)}</time>
        </div>
      </div>

      <p className="text-gray-900 dark:text-gray-100 text-sm mb-3 line-clamp-3">
        {peek.content}
      </p>

      {peek.tags && peek.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {peek.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 flex items-center space-x-4">
        <span className="text-4xl">{project.image}</span>
        <div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex space-x-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Github className="h-4 w-4" />
            <span className="text-sm">Code</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Live</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}