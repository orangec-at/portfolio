'use client'

import React, { useRef, useState, useEffect } from 'react'
import Logo from '@/data/logo.svg'
import { HandlePosition } from './use-control-center'
import siteMetadata from '@/data/siteMetadata'

interface ControlCenterHandleProps {
  onOpen: () => void
  onGetHandlePosition: (position: HandlePosition) => void
}

export default function ControlCenterHandle({
  onOpen,
  onGetHandlePosition,
}: ControlCenterHandleProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const handleRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // 핸들의 위치 정보를 부모 컴포넌트에 전달
  useEffect(() => {
    if (!handleRef.current || !onGetHandlePosition) return

    const updatePosition = () => {
      if (handleRef.current) {
        const rect = handleRef.current.getBoundingClientRect()
        onGetHandlePosition({
          bottom: rect.bottom,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        })
      }
    }

    // 초기 위치 설정
    updatePosition()

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [onGetHandlePosition])

  // 스크롤에 따라 핸들 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 스크롤이 아래로 20px 이상 이동했을 때 핸들 숨김
      if (currentScrollY > lastScrollY.current + 20) {
        setIsVisible(false)
      }
      // 스크롤이 위로 이동했을 때 핸들 표시
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 드래그 시작 핸들러
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const touchY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    setIsDragging(true)
    setDragStart(touchY)
    setDragDistance(0)
  }

  // 드래그 중 핸들러
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const touchY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    const distance = touchY - dragStart

    // 아래로 드래그할 때만 거리 계산 (위로는 무시)
    if (distance > 0) {
      setDragDistance(distance)
    }

    // 일정 거리 이상 드래그하면 컨트롤 센터 열기
    if (distance > 50) {
      setIsDragging(false)
      onOpen()
    }
  }

  // 드래그 종료 핸들러
  const handleTouchEnd = () => {
    setIsDragging(false)
    setDragDistance(0)
  }

  // 클릭 핸들러
  const handleClick = () => {
    onOpen()
  }

  return (
    <div
      ref={handleRef}
      className={`fixed top-0 right-4 z-40 cursor-pointer transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{
        transform: isDragging ? `translateY(${dragDistance}px)` : undefined,
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="flex items-center justify-center rounded-b-xl bg-gray-100/80 px-4 py-2 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80">
        <div className="flex items-center">
          <Logo className="h-6 w-6" />
          <span className="font-bungee ml-2 text-sm">{siteMetadata.headerTitle}</span>
        </div>
      </div>
    </div>
  )
}
