'use client'

import React, { useState, useEffect } from 'react'

// Circle 컴포넌트의 props 타입 정의
interface CircleProps {
  initialSize?: number
  initialPosition?: { x: number; y: number }
  color?: string
}

// 위치 타입 정의
interface Position {
  x: number
  y: number
}

// 핸들 정보 타입 정의
interface HandleInfo {
  dir: string
  top: number
  left: number
  cursor: string
}

// 원 컴포넌트 - 피그마 스타일 선택 및 리사이징 기능 포함
const Circle: React.FC<CircleProps> = ({
  initialSize = 200,
  initialPosition = { x: 0, y: 0 },
  color = '#ffb6c1', // 기본 핑크색
}) => {
  const [circleSize, setCircleSize] = useState<number>(initialSize)
  const [position, setPosition] = useState<Position>(initialPosition)
  const [selected, setSelected] = useState<boolean>(false)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })

  // 원 선택
  const handleCircleClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setSelected(true)
  }

  // 배경 클릭 시 선택 해제
  const handleBackgroundClick: React.MouseEventHandler = (e): void => {
    if (!dragging) {
      setSelected(false)
    }
  }

  // 원 이동 시작
  const handleMoveStart = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setDragging('move')
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // 크기 조절 시작
  const handleResizeStart = (e: React.MouseEvent, handle: string): void => {
    e.stopPropagation()
    setDragging(handle)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // 마우스 이동 및 마우스 업 이벤트 처리
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!dragging) return

      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y

      if (dragging === 'move') {
        // 원 이동
        setPosition((prev) => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }))
      } else {
        // 원 크기 조절
        if (dragging.includes('e')) {
          // 오른쪽으로 드래그
          setCircleSize((prev) => Math.max(50, prev + dx))
        } else if (dragging.includes('w')) {
          // 왼쪽으로 드래그
          setCircleSize((prev) => Math.max(50, prev - dx))
          setPosition((prev) => ({ x: prev.x + dx, y: prev.y }))
        }

        if (dragging.includes('s')) {
          // 아래로 드래그
          setCircleSize((prev) => Math.max(50, prev + dy))
        } else if (dragging.includes('n')) {
          // 위로 드래그
          setCircleSize((prev) => Math.max(50, prev - dy))
          setPosition((prev) => ({ x: prev.x, y: prev.y + dy }))
        }
      }

      setDragStart({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = (): void => {
      setDragging(null)
    }

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, dragStart])

  // 핸들 정보 계산
  const getHandles = (): HandleInfo[] => [
    { dir: 'n', top: position.y - 4, left: position.x + circleSize / 2 - 4, cursor: 'n-resize' },
    { dir: 'ne', top: position.y - 4, left: position.x + circleSize - 4, cursor: 'ne-resize' },
    {
      dir: 'e',
      top: position.y + circleSize / 2 - 4,
      left: position.x + circleSize - 4,
      cursor: 'e-resize',
    },
    {
      dir: 'se',
      top: position.y + circleSize - 4,
      left: position.x + circleSize - 4,
      cursor: 'se-resize',
    },
    {
      dir: 's',
      top: position.y + circleSize - 4,
      left: position.x + circleSize / 2 - 4,
      cursor: 's-resize',
    },
    { dir: 'sw', top: position.y + circleSize - 4, left: position.x - 4, cursor: 'sw-resize' },
    { dir: 'w', top: position.y + circleSize / 2 - 4, left: position.x - 4, cursor: 'w-resize' },
    { dir: 'nw', top: position.y - 4, left: position.x - 4, cursor: 'nw-resize' },
  ]

  return (
    <button className="h-full w-full" tabIndex={0} onClick={handleBackgroundClick}>
      {/* 핑크색 원 */}
      <button
        className={`absolute rounded-full ${selected ? 'cursor-move' : 'cursor-pointer'}`}
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: color,
          zIndex: 10,
        }}
        onClick={handleCircleClick}
        onMouseDown={selected ? handleMoveStart : undefined}
      />

      {/* 피그마 스타일 선택 UI */}
      {selected && (
        <>
          {/* 선택 테두리 */}
          <div
            className="pointer-events-none absolute rounded-full border border-dashed border-blue-400"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 20,
            }}
          />

          {/* 리사이징 핸들 - 8개 방향 */}
          {getHandles().map((handle) => (
            <button
              key={handle.dir}
              className="absolute z-30 h-2 w-2 rounded-full border border-blue-400 bg-white"
              style={{
                position: 'absolute',
                top: `${handle.top}px`,
                left: `${handle.left}px`,
                cursor: handle.cursor,
              }}
              onMouseDown={(e) => handleResizeStart(e, handle.dir)}
            />
          ))}
        </>
      )}
    </button>
  )
}

export default Circle
