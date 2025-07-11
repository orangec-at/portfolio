'use client'

import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import { Search, Sun, Moon, Mail, Github, Linkedin, Twitter, X, Languages } from 'lucide-react'
import Link from '@/components/origin/Link'
import { ControlButton } from './control-button'
import { useControlCenter } from './use-control-center'
import ControlCenterHandle from './control-center-handle'
import MobileNavigation from './mobile-navigation'
import MobileControlCenter from './mobile-control-center'

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
    windowWidth,
    showControlCenter,
    mobileControlOpen,
    handlePosition,
    controlCenterVisible,
    openControlCenter,
    closeControlCenter,
    openMobileControl,
    closeMobileControl,
    updateHandlePosition,
  } = useControlCenter()

  // 컨트롤 목록 준비
  const linkControls = headerNavLinks.map((link: HeaderNavLink) => (
    <Link
      key={link.title}
      href={link.href}
      className="flex flex-col items-center justify-center rounded-xl bg-gray-100/90 p-3 transition-all duration-200 hover:bg-gray-200/90 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      onClick={() => {
        closeMobileControl()
        closeControlCenter()
      }}
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
    <ControlButton
      key="languages"
      icon={<Languages className="h-6 w-6" />}
      label="번역"
      onClick={handleSearch}
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

  return (
    <>
      {/* Control Center 핸들 - 태블릿 이상 화면에서만 표시 */}
      {windowWidth >= 768 && (
        <ControlCenterHandle
          onOpen={openControlCenter}
          onGetHandlePosition={updateHandlePosition}
        />
      )}

      {/* 태블릿 & 데스크탑 버전 컨트롤 센터 */}
      {windowWidth >= 768 && showControlCenter && (
        <div
          ref={controlCenterRef}
          className="fixed z-40 w-72 rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95"
          style={{
            top: handlePosition ? `${handlePosition.bottom}px` : '4rem',
            right: handlePosition ? `${window.innerWidth - handlePosition.right}px` : '1rem',
            opacity: controlCenterVisible ? 1 : 0,
            transform: controlCenterVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          role="navigation"
          aria-label="컨트롤 센터"
        >
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
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{snsControls}</div>
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
      )}

      {/* 모바일 버전 - 하단 내비게이션 바 (768px 미만) */}
      {windowWidth < 768 && <MobileNavigation openMobileControl={openMobileControl} />}

      {/* 모바일 전체화면 컨트롤 센터 (768px 미만에서만 표시) */}
      {isFullscreen && (
        <MobileControlCenter
          closeMobileControl={closeMobileControl}
          controlCenterVisible={isFullscreen}
          linkControls={linkControls}
          functionControls={functionControls}
          snsControls={snsControls}
        />
      )}
    </>
  )
}
