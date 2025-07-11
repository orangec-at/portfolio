'use client'

import React from 'react'
import Link from '@/components/origin/Link'
import { Home, FileText, Briefcase, User, MoreHorizontal } from 'lucide-react'

interface MobileNavigationProps {
  openMobileControl: () => void
}

export default function MobileNavigation({ openMobileControl }: MobileNavigationProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
      <div className="flex items-center justify-around p-2">
        <div className="flex w-full items-center justify-around">
          <Link
            href="/"
            className="flex flex-col items-center rounded-lg p-2 transition-all duration-150 hover:bg-gray-100/70 active:scale-90 active:bg-gray-200/70 dark:hover:bg-gray-800/70 dark:active:bg-gray-700/70"
          >
            <Home className="h-6 w-6" />
            <span className="mt-1 text-xs">홈</span>
          </Link>

          <Link
            href="/posts"
            className="flex flex-col items-center rounded-lg p-2 transition-all duration-150 hover:bg-gray-100/70 active:scale-90 active:bg-gray-200/70 dark:hover:bg-gray-800/70 dark:active:bg-gray-700/70"
          >
            <FileText className="h-6 w-6" />
            <span className="mt-1 text-xs">글</span>
          </Link>

          <Link
            href="/projects"
            className="flex flex-col items-center rounded-lg p-2 transition-all duration-150 hover:bg-gray-100/70 active:scale-90 active:bg-gray-200/70 dark:hover:bg-gray-800/70 dark:active:bg-gray-700/70"
          >
            <Briefcase className="h-6 w-6" />
            <span className="mt-1 text-xs">프로젝트</span>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center rounded-lg p-2 transition-all duration-150 hover:bg-gray-100/70 active:scale-90 active:bg-gray-200/70 dark:hover:bg-gray-800/70 dark:active:bg-gray-700/70"
          >
            <User className="h-6 w-6" />
            <span className="mt-1 text-xs">소개</span>
          </Link>

          <button
            onClick={openMobileControl}
            className="flex flex-col items-center rounded-lg p-2 transition-all duration-150 hover:bg-gray-100/70 active:scale-90 active:bg-gray-200/70 dark:hover:bg-gray-800/70 dark:active:bg-gray-700/70"
          >
            <MoreHorizontal className="h-6 w-6" />
            <span className="mt-1 text-xs">더보기</span>
          </button>
        </div>
      </div>
    </div>
  )
}
