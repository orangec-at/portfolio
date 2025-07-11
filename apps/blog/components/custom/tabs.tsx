import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/components/shadcn/lib/utils'

// TabPosition 타입 정의 - 방향과 위치를 함께 관리
type TabPosition = 'horizontal' | 'vertical-left' | 'vertical-right'

// TabsProps에 위치 속성 업데이트
interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  position?: TabPosition
}

function Tabs({ className, position = 'horizontal', ...props }: TabsProps) {
  // position에서 방향 추출 (vertical-left, vertical-right -> vertical)
  const orientation = position.startsWith('vertical') ? 'vertical' : 'horizontal'

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      data-position={position}
      className={cn(
        'overflow-hidden',
        orientation === 'vertical'
          ? 'flex flex-row' // 세로 방향
          : 'flex flex-col', // 가로 방향
        className
      )}
      {...props}
    />
  )
}

// TabsListProps에 위치 속성 업데이트
interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  position?: TabPosition
}

function TabsList({ className, position = 'horizontal', ...props }: TabsListProps) {
  // position에서 방향 추출
  const orientation = position.startsWith('vertical') ? 'vertical' : 'horizontal'

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-orientation={orientation}
      data-position={position}
      className={cn(
        'relative z-10',
        orientation === 'vertical'
          ? 'inline-flex h-full flex-col items-stretch py-2' // 세로 방향
          : 'inline-flex h-12 w-full items-end', // 가로 방향
        className
      )}
      {...props}
    />
  )
}

// 탭 닫기 버튼 컴포넌트 타입 정의 (먼저 선언)
function TabsClose({ className, onClick, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'ml-auto flex h-5 w-5 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300/30',
        className
      )}
      onClick={onClick}
      {...props}
    >
      ✕
    </button>
  )
}

// TabsTriggerProps에 위치 속성 업데이트
interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  index?: number
  position?: TabPosition
}

function TabsTrigger({
  className,
  index = 0,
  position = 'horizontal',
  children,
  ...props
}: TabsTriggerProps) {
  // position에서 방향 추출
  const orientation = position.startsWith('vertical') ? 'vertical' : 'horizontal'
  // vertical-right인지 확인
  const isVerticalRight = position === 'vertical-right'

  // 세로 방향일 때 아이콘과 텍스트 구분하기
  const childrenArray = React.Children.toArray(children)
  let iconElement: React.ReactNode = null
  const textElements: React.ReactNode[] = []
  let closeButton: React.ReactNode = null

  if (orientation === 'vertical') {
    // 아이콘, 텍스트, 닫기 버튼 구분
    childrenArray.forEach((child) => {
      if (React.isValidElement(child)) {
        // TabsClose 타입 체크를 위한 수정
        if (child.type === TabsClose) {
          closeButton = child
        } else if (
          child.props &&
          typeof child.props === 'object' &&
          child.props !== null &&
          'className' in child.props &&
          typeof child.props.className === 'string' &&
          child.props.className.includes('mr-2')
        ) {
          // 아이콘으로 추정되는 요소 (mr-2 클래스를 가진 요소)
          iconElement = child
        } else if (child.type === 'span') {
          // span 요소
          textElements.push(child)
        } else {
          // 기타 요소
          textElements.push(child)
        }
      } else if (typeof child === 'string') {
        // 텍스트
        textElements.push(child)
      } else {
        // 기타 요소
        textElements.push(child)
      }
    })
  }

  // data-state 타입을 위한 상태 변수
  const isActive = props['data-state'] === 'active'
  const stateZIndex = isActive ? 30 : 5 - (index || 0)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-orientation={orientation}
      data-position={position}
      className={cn(
        // 공통 스타일
        'font-bungee relative flex items-center font-medium',

        // 가로/세로 방향 특정 스타일
        orientation === 'vertical'
          ? [
              'mx-1 h-auto min-h-24 w-12 flex-col justify-between px-1 py-3',
              index > 0 ? '-mt-1' : '', // 탭 겹침을 위한 마진
              'font-serif', // 세로 방향에서 세리프 폰트 적용

              // 활성/비활성 탭의 스타일 구분
              'data-[state=active]:bg-orange-400 data-[state=active]:text-gray-800',
              'data-[state=inactive]:bg-gray-200/90 data-[state=inactive]:text-gray-700',

              // 활성 탭일 때 좌/우측 경계 제거 및 추가 너비
              'data-[state=active]:w-14',
              isVerticalRight
                ? 'data-[state=active]:ml-0 data-[state=active]:border-l-0' // vertical-right
                : 'data-[state=active]:mr-0 data-[state=active]:border-r-0', // vertical-left

              // 활성 탭일 때 그림자 효과
              isVerticalRight
                ? 'data-[state=active]:shadow-[4px_0px_8px_-2px_rgba(0,0,0,0.1)]' // vertical-right
                : 'data-[state=active]:shadow-[-4px_0px_8px_-2px_rgba(0,0,0,0.1)]', // vertical-left
            ]
          : [
              'h-10 px-4 text-sm',
              index > 0 ? '-ml-5' : '', // 가로 탭 겹침

              // 활성/비활성 탭의 스타일 구분
              'data-[state=active]:bg-orange-400 data-[state=active]:text-gray-800 dark:bg-black',
              'data-[state=inactive]:bg-gray-200/90 data-[state=inactive]:text-gray-700',

              // 활성 탭일 때 하단 경계 제거 및 추가 높이
              'data-[state=active]:h-12',
              'data-[state=active]:mb-0',
              'data-[state=active]:border-b-0',

              // 활성 탭일 때 그림자 효과
              'data-[state=active]:shadow-[0_-4px_8px_-2px_rgba(0,0,0,0.1)]',
            ],
        'focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        className
      )}
      style={{
        // 가로/세로에 따른 사다리꼴 모양 조정
        clipPath:
          orientation === 'vertical'
            ? isActive
              ? isVerticalRight
                ? 'polygon(0 0, 100% 10px, 100% calc(100% - 10px), calc(0% - 2px) 100%)' // 활성 오른쪽 세로 사다리꼴 (왼쪽으로 확장)
                : 'polygon(0 10px, 100% 0, calc(100% + 2px) 100%, 0 calc(100% - 10px))' // 활성 왼쪽 세로 사다리꼴 (오른쪽으로 확장)
              : isVerticalRight
                ? 'polygon(0 0, 100% 10px, 100% calc(100% - 10px), 0 100%)' // 비활성 오른쪽 세로 사다리꼴
                : 'polygon(0 10px, 100% 0, 100% 100%, 0 calc(100% - 10px))' // 비활성 왼쪽 세로 사다리꼴
            : isActive
              ? 'polygon(10px 0, calc(100% - 10px) 0, 100% calc(100% + 2px), 0 calc(100% + 2px))' // 활성 가로 사다리꼴 (아래로 확장)
              : 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)', // 비활성 가로 사다리꼴

        // 가로/세로에 따른 패딩 조정
        paddingLeft: orientation === 'vertical' ? undefined : index > 0 ? '24px' : '16px',

        // 활성화 상태에 따른 위치 조정
        ...(orientation === 'vertical' && isActive
          ? isVerticalRight
            ? {
                left: '-2px', // 왼쪽으로 밀어서 콘텐츠와 겹치게 함 (vertical-right)
                position: 'relative',
              }
            : {
                right: '-2px', // 오른쪽으로 밀어서 콘텐츠와 겹치게 함 (vertical-left)
                position: 'relative',
              }
          : {}),

        ...(orientation === 'horizontal' && isActive
          ? {
              bottom: '-2px', // 아래로 밀어서 콘텐츠와 겹치게 함
              position: 'relative',
            }
          : {}),

        // z-index 설정
        zIndex: stateZIndex,
      }}
      {...props}
    >
      {orientation === 'vertical' ? (
        <>
          {/* 세로 방향일 때 요소 재배치 */}
          {iconElement && <div className="mb-2">{iconElement}</div>}

          {/* 텍스트를 writing-mode로 세로 표시 - 개선된 스타일 */}
          <div className="flex flex-1 items-center justify-center">
            {textElements.map((text, i) => {
              if (typeof text === 'string') {
                // 문자열을 writing-mode로 세로 표시 - 이탤릭체 및 세련된 스타일 적용
                return (
                  <div
                    key={i}
                    className="font-bungee text-center font-medium"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'upright',
                      fontStyle: 'italic',
                      letterSpacing: '0.05em',
                      fontSize: '0.95rem',
                      textShadow: isActive ? '0 0 0.5px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {text}
                  </div>
                )
              } else if (
                React.isValidElement<React.HTMLProps<HTMLSpanElement>>(text) &&
                typeof text.type === 'string' &&
                text.type === 'span'
              ) {
                // span 요소를 writing-mode로 세로 표시 - 이탤릭체 및 세련된 스타일 적용
                return React.cloneElement(text, {
                  className: cn(
                    typeof text.props.className === 'string' ? text.props.className : '',
                    'font-medium'
                  ),
                  style: {
                    ...(typeof text.props.style === 'object' && text.props.style !== null
                      ? text.props.style
                      : {}),
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                    fontSize: '0.95rem',
                    textShadow: isActive ? '0 0 0.5px rgba(0,0,0,0.1)' : 'none',
                  },
                } as React.HTMLAttributes<HTMLSpanElement>)
              }

              return <div key={i}>{text}</div>
            })}
          </div>

          {/* 닫기 버튼 */}
          {closeButton && <div className="mt-2">{closeButton}</div>}
        </>
      ) : (
        // 가로 방향은 그대로 유지
        children
      )}
    </TabsPrimitive.Trigger>
  )
}

// TabsContentProps에 위치 속성 업데이트
interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  position?: TabPosition
}

function TabsContent({ className, children, position = 'horizontal', ...props }: TabsContentProps) {
  // position에서 방향 추출
  const orientation = position.startsWith('vertical') ? 'vertical' : 'horizontal'
  // vertical-right인지 확인
  const isVerticalRight = position === 'vertical-right'

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      data-orientation={orientation}
      data-position={position}
      className={cn(
        'relative z-20 overflow-scroll bg-white shadow-md dark:bg-gray-800',
        orientation === 'vertical'
          ? isVerticalRight
            ? '-mr-2 flex-1 rounded-l p-4 pr-6' // 세로 오른쪽 방향 - 오른쪽으로 살짝 겹치게 함
            : '-ml-2 flex-1 rounded-r p-4 pl-6' // 세로 왼쪽 방향 - 왼쪽으로 살짝 겹치게 함
          : '-mt-2 w-full rounded-b pt-6', // 가로 방향 - 위쪽으로 살짝 겹치게 함
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  )
}

// 새 탭 버튼 - 가로/세로 방향 지원
interface TabsAddProps extends React.HTMLAttributes<HTMLButtonElement> {
  position?: TabPosition
}

function TabsAdd({ className, onClick, position = 'horizontal', ...props }: TabsAddProps) {
  // position에서 방향 추출
  const orientation = position.startsWith('vertical') ? 'vertical' : 'horizontal'

  return (
    <button
      data-orientation={orientation}
      data-position={position}
      className={cn(
        'flex items-center justify-center rounded bg-green-400 text-white hover:bg-green-300',
        orientation === 'vertical'
          ? 'mx-auto my-2 h-8 w-8' // 세로 방향
          : 'ml-2 h-8 w-8', // 가로 방향
        className
      )}
      onClick={onClick}
      {...props}
    >
      +
    </button>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsClose, TabsAdd }
