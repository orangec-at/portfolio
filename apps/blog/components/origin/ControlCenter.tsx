'use client'

import React, { useState } from 'react'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import {
  Search,
  Sun,
  Moon,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Home,
  FileText,
  Briefcase,
  User,
  MoreHorizontal,
  X,
} from 'lucide-react'
import Link from '@/components/origin/Link'
import { ControlButton } from '@/components/custom/control-center/control-button'
import { useControlCenter } from '@/components/custom/control-center/use-control-center'

// Header Nav Link type
interface HeaderNavLink {
  title: string
  href: string
  icon: React.ReactNode
}

export default function ControlCenter() {
  const {
    theme,
    mounted,
    controlCenterRef,
    handleSearch,
    toggleTheme,
    isFullscreen,
    toggleFullscreen,
  } = useControlCenter()
  const [mobileControlOpen, setMobileControlOpen] = useState(false)

  // 모바일에서 control center 열기
  const openMobileControl = () => {
    setMobileControlOpen(true)
    // 직접 함수 대신 상태 업데이트만 진행
    setTimeout(() => {
      toggleFullscreen(true)
    }, 10)
  }

  // 모바일에서 control center 닫기
  const closeMobileControl = () => {
    setMobileControlOpen(false)
    // 직접 함수 대신 상태 업데이트만 진행
    setTimeout(() => {
      toggleFullscreen(false)
    }, 10)
  }

  // 컨트롤 목록 준비
  const linkControls = headerNavLinks.map((link: HeaderNavLink) => (
    <Link
      key={link.title}
      href={link.href}
      className="flex flex-col items-center justify-center rounded-xl bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => setMobileControlOpen(false)}
    >
      <div className="h-6 w-6">{link.icon}</div>
      <span className="mt-1 text-xs font-medium md:inline-block">{link.title}</span>
    </Link>
  ))

  const functionControls = [
    <ControlButton
      key="search"
      icon={<Search className="h-6 w-6" />}
      label="검색"
      onClick={handleSearch}
      category="function"
    />,
    <ControlButton
      key="theme"
      icon={theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      label="테마"
      onClick={toggleTheme}
      category="function"
    />,
  ]

  const snsControls = [
    <ControlButton
      key="email"
      href={`mailto:${siteMetadata.email}`}
      icon={<Mail className="h-6 w-6" />}
      label="이메일"
      category="sns"
    />,
    <ControlButton
      key="github"
      href={siteMetadata.github}
      icon={<Github className="h-6 w-6" />}
      label="깃허브"
      category="sns"
    />,
    <ControlButton
      key="linkedin"
      href={siteMetadata.linkedin}
      icon={<Linkedin className="h-6 w-6" />}
      label="링크드인"
      category="sns"
    />,
    <ControlButton
      key="twitter"
      href={siteMetadata.x}
      icon={<Twitter className="h-6 w-6" />}
      label="트위터"
      category="sns"
    />,
  ]

  if (!mounted) return null

  // 모바일 전체화면 컨트롤 센터
  const MobileFullscreenControlCenter = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-md dark:bg-gray-900/95">
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-gray-100/80 p-4 dark:bg-gray-800/80">
        <div className="flex items-center">
          <Logo className="h-6 w-6" />
          <span className="font-bungee ml-2 text-sm">{siteMetadata.headerTitle}</span>
        </div>
        <button
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
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

  return (
    <>
      {/* 데스크탑 & 태블릿 버전 */}
      <div
        ref={controlCenterRef}
        className={`absolute top-24 right-4 hidden rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:block md:w-56 xl:w-72 dark:border-gray-800 dark:bg-gray-900/95 ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
        }`}
        role="navigation"
        aria-label="컨트롤 센터"
      >
        {/* 헤더 */}
        <div className="flex items-center bg-gray-100/80 p-3 dark:bg-gray-800/80">
          <div className="flex items-center">
            <Logo className="h-6 w-6" />
            <span className="font-bungee ml-2 text-sm">{siteMetadata.headerTitle}</span>
          </div>
        </div>

        {/* 컨트롤 영역 */}
        <div className="p-4">
          {/* 링크 섹션 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">링크</h3>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{linkControls}</div>
          </div>

          {/* 기능 섹션 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">기능</h3>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{functionControls}</div>
          </div>

          {/* SNS 섹션 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">SNS</h3>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{snsControls}</div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 p-3 dark:border-gray-800">
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <div>
              {siteMetadata.author} © {2025}
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 버전 - 하단 내비게이션 바 */}
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden dark:border-gray-800 dark:bg-gray-900/95">
        <div className="flex items-center justify-around p-2">
          {/* 새로운 모바일 네비게이션 메뉴 */}
          <Link href="/" className="flex flex-col items-center p-2">
            <Home className="h-6 w-6" />
            <span className="mt-1 text-xs">홈</span>
          </Link>

          <Link href="/posts" className="flex flex-col items-center p-2">
            <FileText className="h-6 w-6" />
            <span className="mt-1 text-xs">글</span>
          </Link>

          <Link href="/projects" className="flex flex-col items-center p-2">
            <Briefcase className="h-6 w-6" />
            <span className="mt-1 text-xs">프로젝트</span>
          </Link>

          <Link href="/about" className="flex flex-col items-center p-2">
            <User className="h-6 w-6" />
            <span className="mt-1 text-xs">소개</span>
          </Link>

          <button onClick={openMobileControl} className="flex flex-col items-center p-2">
            <MoreHorizontal className="h-6 w-6" />
            <span className="mt-1 text-xs">더보기</span>
          </button>
        </div>
      </div>

      {/* 모바일 전체화면 컨트롤 센터 */}
      {mobileControlOpen && <MobileFullscreenControlCenter />}
    </>
  )
}
