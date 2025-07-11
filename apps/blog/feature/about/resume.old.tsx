'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/custom/tabs'
import { useIsMobile } from '@/components/shadcn/hooks/use-mobile'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useResume } from './use-resume'

// 섹션 컴포넌트 import
import ContactSection from './section/contact-section'
import EducationSection from './section/education-section'
import ExperienceSection from './section/experience-section'
import ProfileSection from './section/profile-section'
import ProjectsSection from './section/project-section'

// 통합된 탭 데이터 구조
const tabs = [
  { id: 'profile', label: 'Profile', component: ProfileSection, order: 0 },
  { id: 'experience', label: 'Experience', component: ExperienceSection, order: 1 },
  { id: 'projects', label: 'Projects', component: ProjectsSection, order: 2 },
  { id: 'activities', label: 'Activities', component: EducationSection, order: 3 },
  { id: 'interests', label: 'Interests', component: EducationSection, order: 4 },
  { id: 'contact', label: 'Contact', component: ContactSection, order: 5 },
]

export default function Resume() {
  const isMobile = useIsMobile() // 기존에 제공된 모바일 감지 훅 사용
  const containerRef = React.useRef(null)

  const {
    activeTab,
    tabOrder,
    currentTabIndex,
    contentRef,
    handleTabChange,
    isTabAfterActive,
    containerStyle,
  } = useResume(tabs)

  // 모바일에서 vh 단위 문제를 해결하기 위한 이펙트
  React.useEffect(() => {
    if (isMobile && containerRef.current) {
      const setViewHeight = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }

      setViewHeight()
      window.addEventListener('resize', setViewHeight)

      return () => {
        window.removeEventListener('resize', setViewHeight)
      }
    }
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'flex h-screen flex-col' : 'h-full'}`}
    >
      {/* 파일철 본체 */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className={`flex ${isMobile ? 'h-full flex-col' : 'h-full min-h-screen'} w-full overflow-hidden rounded-md shadow-xl`}
        position={isMobile ? 'horizontal' : 'vertical-right'} // 모바일에서는 수평 탭으로 전환
        style={containerStyle}
      >
        {/* 모바일 화면일 때는 상단에 모든 탭 표시 */}
        {isMobile && (
          <TabsList className="scrollbar-hide mb-2 flex w-full flex-shrink-0 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={`mobile-${tab.id}`}
                value={tab.id}
                className="flex-shrink-0 px-3 py-2 text-sm whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {/* 데스크탑 화면일 때 왼쪽 탭 리스트 */}
        {!isMobile && (
          <TabsList position="vertical-left" className="rounded-r-md border-gray-300 px-0 py-8">
            <div className="flex w-full flex-col space-y-1">
              {[...tabs]
                .filter((tab) => tab.id !== activeTab && tab.order < currentTabIndex)
                .sort((a, b) => b.order - a.order) // 내림차순 정렬 (역순)
                .map((tab) => (
                  <TabsTrigger
                    key={`left-${tab.id}`}
                    value={tab.id}
                    position="vertical-left"
                    className="w-full py-3"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
            </div>
          </TabsList>
        )}

        <div className={`flex ${isMobile ? 'h-full flex-1 flex-col' : 'h-full w-full'}`}>
          <div
            ref={contentRef}
            className={`relative ${isMobile ? 'h-full flex-1 overflow-hidden' : 'w-full flex-1'}`}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                position={isMobile ? 'horizontal' : 'vertical-right'}
                value={tab.id}
                className={`m-0 ${isMobile ? 'h-full' : 'h-full w-full'} `}
              >
                <div
                  className={` ${isMobile ? 'h-full overflow-y-auto px-4 pb-16' : 'h-full overflow-y-auto px-4 py-6'} `}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid h-full w-full max-w-full"
                  >
                    {/* 동적으로 해당 탭에 맞는 컴포넌트 렌더링 */}
                    {React.createElement(tab.component)}
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </div>

          {/* 데스크탑 화면일 때 오른쪽 탭 리스트 */}
          {!isMobile && (
            <TabsList
              position="vertical-right"
              className="rounded-r-md border-l border-gray-300 px-0 py-8"
            >
              <div className="flex w-full flex-col space-y-1">
                {tabs.map((tab) => {
                  // 현재 탭보다 순서가 느린 탭만 오른쪽에 표시
                  if (tab.order >= currentTabIndex) {
                    return (
                      <TabsTrigger
                        key={`right-${tab.id}`}
                        value={tab.id}
                        position="vertical-right"
                        className="w-full py-3"
                      >
                        {tab.label}
                      </TabsTrigger>
                    )
                  }
                  return null
                })}
              </div>
            </TabsList>
          )}
        </div>
      </Tabs>
    </div>
  )
}
