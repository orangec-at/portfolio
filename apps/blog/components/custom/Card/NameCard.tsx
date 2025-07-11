import { useState, useRef } from 'react'

// Circle 컴포넌트
const Circle = ({ initialSize, initialPosition }) => {
  return (
    <div
      className="absolute rounded-full bg-pink-500"
      style={{
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        left: `${initialPosition.x}px`,
        top: `${initialPosition.y}px`,
        filter: 'blur(8px)',
        opacity: 0.8,
      }}
    />
  )
}

const NameCard3DHoverFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef(null)

  // 클릭 이벤트 처리
  const handleClick = () => {
    setIsFlipped(!isFlipped)
    setRotation({ x: 0, y: 0 }) // 뒤집을 때 회전 초기화
  }

  // 마우스 움직임에 따른 3D 호버 효과
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // 카드 중앙 기준 위치 계산
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 마우스 위치와 중앙 간의 차이를 이용해 회전 계산
    // 뒤집혔을 때는 Y축 회전 방향 반대로 적용 (자연스러운 움직임을 위해)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15 * (isFlipped ? -1 : 1)
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15

    setRotation({ x: rotateX, y: rotateY })

    // 빛 반사 효과를 위한 위치 계산
    const mouseXpercentage = ((e.clientX - rect.left) / rect.width) * 100
    const mouseYpercentage = ((e.clientY - rect.top) / rect.height) * 100
    setGlare({
      x: mouseXpercentage,
      y: mouseYpercentage,
      opacity: 0.15,
    })
  }

  // 마우스가 떠나면 원래 상태로 복귀
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  // 명함 데이터
  const name = '홍길동'
  const title = '개발자'
  const description = '프론트엔드 개발자로 React와 웹 디자인에 관심이 많습니다.'
  const contact = {
    email: 'hong@example.com',
    phone: '010-1234-5678',
    website: 'hong-portfolio.com',
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-800">
      <div style={{ perspective: '1000px', width: '320px', height: '400px' }}>
        <div
          ref={cardRef}
          className="relative h-full w-full cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 앞면 */}
          <div
            className="absolute h-full w-full overflow-hidden rounded-lg bg-black text-white"
            style={{
              backfaceVisibility: 'hidden',
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3), ${-rotation.y / 3}px ${rotation.x / 3}px 15px rgba(0, 0, 0, 0.2)`,
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
            }}
          >
            {/* 빛 반사 효과 */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-lg"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* 상단 영역 - 핑크색 원 */}
            <div className="relative h-64 overflow-hidden">
              <Circle initialSize={200} initialPosition={{ x: 0, y: 0 }} />
            </div>

            {/* 제목과 부제목 섹션 */}
            <div className="px-4 py-4">
              <div className="mb-3 flex items-center space-x-2">
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="text-gray-400">|</span>
                <h3 className="text-xl">{title}</h3>
              </div>

              {/* 설명 섹션 */}
              <div className="mb-3">
                <p className="text-white">{description}</p>
              </div>
            </div>

            {/* 클릭 힌트 */}
            <div className="absolute right-3 bottom-3 flex items-center text-xs text-gray-300">
              <span>클릭하여 연락처 보기</span>
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className="absolute h-full w-full overflow-hidden rounded-lg text-white"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${180 + rotation.y}deg)`,
              boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3), ${rotation.y / 3}px ${rotation.x / 3}px 15px rgba(0, 0, 0, 0.2)`,
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
            }}
          >
            {/* 빛 반사 효과 */}
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-lg"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-pink-500 opacity-20"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-blue-500 opacity-20"></div>

            <div className="flex h-full flex-col items-center justify-center p-6">
              <h2 className="mb-8 text-xl font-bold">연락처 정보</h2>

              <div className="space-y-4 text-center">
                {contact.email && (
                  <div className="hover:bg-opacity-10 flex items-center justify-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-pink-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{contact.email}</span>
                  </div>
                )}

                {contact.phone && (
                  <div className="hover:bg-opacity-10 flex items-center justify-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-pink-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{contact.phone}</span>
                  </div>
                )}

                {contact.website && (
                  <div className="hover:bg-opacity-10 flex items-center justify-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-pink-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 4c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{contact.website}</span>
                  </div>
                )}
              </div>

              {/* 클릭 힌트 */}
              <div className="absolute right-3 bottom-3 flex items-center text-xs text-gray-300">
                <span>클릭하여 돌아가기</span>
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameCard3DHoverFlip
