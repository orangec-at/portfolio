'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// TypeScript interfaces
export interface Position {
  x: number
  y: number
}

export interface DragOffset {
  x: number
  y: number
}

export interface HandlePosition {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

// 로직만 담당하는 커스텀 훅
export function useControlCenter() {
  // 기본 상태 선언
  const [position, setPosition] = useState<Position>({ x: 20, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 })
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [positionChanged, setPositionChanged] = useState(false)

  // 컨트롤 센터 UI 관련 상태
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [showControlCenter, setShowControlCenter] = useState(false)
  const [mobileControlOpen, setMobileControlOpen] = useState(false)
  const [handlePosition, setHandlePosition] = useState<HandlePosition | null>(null)
  const [controlCenterVisible, setControlCenterVisible] = useState(false)

  // refs
  const controlCenterRef = useRef<HTMLDivElement>(null)
  const prevPosRef = useRef<Position>({ x: 0, y: 0 })
  const lastMousePositionRef = useRef<Position>({ x: 0, y: 0 })
  const previousPositionBeforeFullscreen = useRef<Position | null>(null)
  const controlCenterAnimationTimeout = useRef<NodeJS.Timeout | null>(null)

  // 화면 크기 계산 함수
  const getScreenSize = useCallback(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  }, [])

  // 컴포넌트 크기 계산 함수
  const getComponentDimensions = useCallback(() => {
    if (!controlCenterRef.current) {
      return { width: 280, height: 400 } // 예상 크기 반환
    }
    return {
      width: controlCenterRef.current.clientWidth,
      height: controlCenterRef.current.clientHeight,
    }
  }, [])

  // 핸들 위치 정보 업데이트 함수
  const updateHandlePosition = useCallback((position: HandlePosition) => {
    setHandlePosition(position)
  }, [])

  // 전체화면 토글 함수
  const toggleFullscreen = useCallback(
    (forcedState?: boolean) => {
      setIsFullscreen((prev) => {
        const newState = forcedState !== undefined ? forcedState : !prev

        if (newState) {
          // 전체화면으로 전환할 때 현재 위치 저장
          previousPositionBeforeFullscreen.current = { ...position }
        } else if (previousPositionBeforeFullscreen.current) {
          // 전체화면에서 나올 때 이전 위치로 복원
          setTimeout(() => {
            setPosition(previousPositionBeforeFullscreen.current!)
          }, 0)
        }

        return newState
      })
    },
    [position]
  )

  // Control Center 열기
  const openControlCenter = useCallback(() => {
    setShowControlCenter(true)

    // 애니메이션을 위한 가시성 설정
    setTimeout(() => {
      setControlCenterVisible(true)
    }, 10)

    // 모바일에서는 전체화면으로 열기
    if (windowWidth < 768) {
      setMobileControlOpen(true)
      setTimeout(() => {
        toggleFullscreen(true)
      }, 10)
    }
  }, [windowWidth, toggleFullscreen])

  // Control Center 닫기
  const closeControlCenter = useCallback(() => {
    // 먼저 애니메이션으로 숨기기
    setControlCenterVisible(false)

    // 애니메이션 후 실제로 DOM에서 제거
    if (controlCenterAnimationTimeout.current) {
      clearTimeout(controlCenterAnimationTimeout.current)
    }

    controlCenterAnimationTimeout.current = setTimeout(() => {
      setShowControlCenter(false)
      if (windowWidth < 768) {
        setMobileControlOpen(false)
        toggleFullscreen(false)
      }
    }, 300) // 애니메이션 시간과 일치
  }, [windowWidth, toggleFullscreen])

  // 모바일에서 control center 열기
  const openMobileControl = useCallback(() => {
    console.log('Opening mobile control')
    setMobileControlOpen(true)

    // setTimeout 시간을 조금 더 늘려서 상태 업데이트가 완료될 시간을 줍니다
    setTimeout(() => {
      console.log('Opening mobile control - setTimeout')
      toggleFullscreen(true)
    }, 50) // 10ms에서 50ms로 늘림
  }, [toggleFullscreen]) // mobileControlOpen 제거

  // 모바일에서 control center 닫기
  const closeMobileControl = useCallback(() => {
    setMobileControlOpen(false)
    setTimeout(() => {
      toggleFullscreen(false)
    }, 10)
  }, [toggleFullscreen])

  // 검색 핸들러
  const handleSearch = useCallback(() => {
    console.log('Search clicked')
  }, [])

  // 테마 토글
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme)

        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }

      return newTheme
    })
  }, [])

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // 초기 설정
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }

    // 클린업
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // 외부 클릭시 Control Center 닫기
  useEffect(() => {
    if (!showControlCenter || isFullscreen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (controlCenterRef.current && !controlCenterRef.current.contains(event.target as Node)) {
        closeControlCenter()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showControlCenter, isFullscreen, closeControlCenter])

  // Escape 키로 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (showControlCenter || mobileControlOpen)) {
        closeControlCenter()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showControlCenter, mobileControlOpen, closeControlCenter])

  // 컴포넌트 제거 시 타이머 정리
  useEffect(() => {
    return () => {
      if (controlCenterAnimationTimeout.current) {
        clearTimeout(controlCenterAnimationTimeout.current)
      }
    }
  }, [])

  // 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // mounted 상태 설정 (한 번만 실행되어야 함)
      setMounted(true)

      // 테마 로드
      const savedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      setTheme(savedTheme as 'light' | 'dark')
    }
  }, [])

  // 훅에서 반환할 값들
  return {
    // 상태
    theme,
    mounted,
    controlCenterRef,
    isFullscreen,
    windowWidth,
    showControlCenter,
    mobileControlOpen,
    handlePosition,
    controlCenterVisible,

    // 핸들러
    handleSearch,
    toggleTheme,
    toggleFullscreen,
    openControlCenter,
    closeControlCenter,
    openMobileControl,
    closeMobileControl,
    updateHandlePosition,
  }
}
