import { genPageMetadata } from 'app/seo'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import peeksData from '@/data/peeks.json'
import { ExternalLink, MessageCircle, Heart, Share, Clock } from 'lucide-react'

export const metadata = genPageMetadata({ title: 'Peeks' })

interface Peek {
  id: string
  content: string
  timestamp: string
  type: 'thought' | 'link' | string
  tags: string[]
  link?: {
    url: string
    title: string
    description: string
  }
  comment?: string
}

function PeekCard({ peek }: { peek: Peek }) {
  const formattedDate = formatDate(peek.timestamp, siteMetadata.locale)

  return (
    <div className="border-b border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/50">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-sm font-semibold text-white">JL</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Jay Lee</span>
            <span className="text-gray-500 dark:text-gray-400">@jaylee</span>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <time>{formattedDate}</time>
            </div>
          </div>

          <div className="mt-2">
            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{peek.content}</p>

            {peek.link && (
              <div className="mt-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <a href={peek.link.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex items-start space-x-2">
                    <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0 text-gray-500" />
                    <div>
                      <h4 className="font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
                        {peek.link.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {peek.link.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        {new URL(peek.link.url).hostname}
                      </p>
                    </div>
                  </div>
                </a>

                {peek.comment && (
                  <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{peek.comment}</p>
                  </div>
                )}
              </div>
            )}

            {peek.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {peek.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center space-x-6 text-gray-500 dark:text-gray-400">
            <button className="flex items-center space-x-2 transition-colors hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
            <button className="flex items-center space-x-2 transition-colors hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-2 transition-colors hover:text-green-500">
              <Share className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PeeksPage() {
  const peeks: Peek[] = peeksData.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-0 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-950/80">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Peeks</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Micro thoughts, links, and quick notes
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {peeks.map((peek) => (
          <PeekCard key={peek.id} peek={peek} />
        ))}
      </div>
    </div>
  )
}
