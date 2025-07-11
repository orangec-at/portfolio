'use client'

import React from 'react'
import Link from '@/components/origin/Link'

interface ControlButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  href?: string
  category: 'function' | 'sns'
}

export function ControlButton({ icon, label, onClick, href, category }: ControlButtonProps) {
  const className =
    'flex flex-col items-center justify-center rounded-xl bg-gray-100/90 p-3 transition-all duration-200 hover:bg-gray-200/90 active:bg-gray-300/90 active:scale-95 transform dark:bg-gray-800/90 dark:hover:bg-gray-700/90 dark:active:bg-gray-600/90'

  // 링크 버튼
  if (href) {
    return (
      <Link href={href} className={className}>
        <div className="h-6 w-6">{icon}</div>
        <span className="mt-1 text-xs font-medium">{label}</span>
      </Link>
    )
  }

  // 일반 버튼
  return (
    <button onClick={onClick} className={className}>
      <div className="h-6 w-6">{icon}</div>
      <span className="mt-1 text-xs font-medium">{label}</span>
    </button>
  )
}
