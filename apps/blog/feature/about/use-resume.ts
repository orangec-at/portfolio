import * as React from 'react'

export function useResume(tabs: { id: string; order: number }[]) {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id)
  const [previousTab, setPreviousTab] = React.useState('')
  const [direction, setDirection] = React.useState('next') // 'next' 또는 'prev'
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  // 탭 순서 배열
  const tabOrder = tabs.map((tab) => tab.id)

  // 현재 탭의 인덱스 찾기
  const currentTabIndex = tabOrder.indexOf(activeTab)

  // 컨테이너 스타일
  const containerStyle = {
    perspective: '1000px',
    transformStyle: 'preserve-3d' as const,
  }

  // 탭 변경 시 처리
  const handleTabChange = (value: string) => {
    if (value === activeTab) return

    // 이전 탭 상태 저장
    setPreviousTab(activeTab)

    // 애니메이션 방향 결정
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(value)
    const newDirection = newIndex > currentIndex ? 'next' : 'prev'
    setDirection(newDirection)

    // 실제 탭 변경
    setActiveTab(value)

    // 탭 변경 후 스크롤 위치 초기화
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  React.useEffect(() => {
    // 탭 변경 시 focus 처리 및 스크롤 초기화
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeTab])

  // 탭이 현재 활성화된 탭보다 순서가 느린지 확인하는 함수
  const isTabAfterActive = (tabId: string) => {
    const tabIndex = tabOrder.indexOf(tabId)
    return tabIndex >= currentTabIndex // 현재 탭도 포함
  }

  return {
    activeTab,
    tabOrder,
    currentTabIndex,
    contentRef,
    handleTabChange,
    isTabAfterActive,
    containerStyle,
  }
}
