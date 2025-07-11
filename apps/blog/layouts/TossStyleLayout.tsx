'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Posts } from 'contentlayer/generated'
import Link from '@/components/origin/Link'
import Tag from '@/components/origin/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface TossStyleLayoutProps {
  posts: CoreContent<Posts>[]
  title: string
  initialDisplayPosts?: CoreContent<Posts>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+$/, '')
  
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-16 flex justify-center">
      <nav className="flex items-center space-x-4">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="flex items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Previous
          </Link>
        ) : (
          <button 
            className="flex items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700"
            disabled
          >
            Previous
          </button>
        )}
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <Link
                key={pageNum}
                href={pageNum === 1 ? `/${basePath}/` : `/${basePath}/page/${pageNum}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  pageNum === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>

        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="flex items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Next
          </Link>
        ) : (
          <button 
            className="flex items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-700"
            disabled
          >
            Next
          </button>
        )}
      </nav>
    </div>
  )
}

function PostCard({ post }: { post: CoreContent<Posts> }) {
  const { path, date, title, summary, tags } = post
  
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <time dateTime={date} suppressHydrationWarning>
            {formatDate(date, siteMetadata.locale)}
          </time>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            <Link href={`/${path}`} className="static">
              {title}
            </Link>
          </h2>
          
          {summary && (
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {summary}
            </p>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
            {tags.length > 3 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TossStyleLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: TossStyleLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thoughts, tutorials, and insights on development
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h3>
            
            <nav className="space-y-2">
              <Link
                href="/posts"
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/posts'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                All Posts ({posts.length})
              </Link>
              
              {sortedTags.slice(0, 8).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slug(tag)}`}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    decodeURI(pathname.split('/tags/')[1]) === slug(tag)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {tag} ({tagCounts[tag]})
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {displayPosts.map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </div>
          
          {pagination && pagination.totalPages > 1 && (
            <Pagination 
              currentPage={pagination.currentPage} 
              totalPages={pagination.totalPages} 
            />
          )}
        </main>
      </div>
    </div>
  )
}