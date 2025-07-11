'use client'

import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { X } from 'lucide-react'
import React from 'react'

// 타입 정의
interface HeaderNavLink {
  title: string
  href: string
  icon: React.ReactNode
}

interface MobileControlCenterProps {
  closeMobileControl: () => void
  controlCenterVisible: boolean
  linkControls: React.ReactNode[]
  functionControls: React.ReactNode[]
  snsControls: React.ReactNode[]
}

export default function MobileControlCenter({
  closeMobileControl,
  controlCenterVisible,
  linkControls,
  functionControls,
  snsControls,
}: MobileControlCenterProps) {
  console.log('MobileControlCenter', controlCenterVisible)
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-md transition-all duration-300 dark:bg-gray-900/95"
      style={{
        opacity: controlCenterVisible ? 1 : 0,
        transform: controlCenterVisible ? 'translateY(0)' : 'translateY(-20px)',
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-gray-100/80 p-4 dark:bg-gray-800/80">
        <div className="flex items-center">
          <Logo className="h-6 w-6" />
          <span className="font-bungee ml-2 text-sm">{siteMetadata.headerTitle}</span>
        </div>
        <button
          className="rounded-full p-2 transition-colors hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          onClick={closeMobileControl}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* 컨트롤 영역 */}
      <div className="p-6">
        {/* 링크 섹션 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">링크</h3>
          <div className="grid grid-cols-3 gap-4">{linkControls}</div>
        </div>

        {/* 기능 섹션 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">기능</h3>
          <div className="grid grid-cols-3 gap-4">{functionControls}</div>
        </div>

        {/* SNS 섹션 */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">SNS</h3>
          <div className="grid grid-cols-3 gap-4">{snsControls}</div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <div>
            {siteMetadata.author} © {2025}
          </div>
        </div>
      </div>
    </div>
  )
}
