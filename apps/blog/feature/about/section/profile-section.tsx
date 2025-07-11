import Image from 'next/image'

export default function ProfileSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Item index={1} rowSpan={2}>
        {/* OnePiece 캐릭터를 표현해볼까? */}
        <Image
          src="/static/images/profile.jpeg"
          alt="Profile"
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </Item>
      <Item index={2}></Item>
      <Item index={3}></Item>
      <Item index={4}></Item>
      <Item index={5}></Item>
      <Item index={6}></Item>
      <Item index={7}></Item>
      <Item index={8}></Item>
      <Item index={9}></Item>
      <Item index={10}></Item>
      <Item index={11}></Item>
    </div>
  )
}

const Item = ({
  index,
  className,
  children,
  rowSpan = 1,
  colSpan = 1,
}: {
  index: number
  className?: string
  children?: React.ReactNode
  rowSpan?: number
  colSpan?: number
}) => {
  return (
    <div
      className={`aspect-[3/2] overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:aspect-auto row-span-${rowSpan} col-span-${colSpan} ${className}`}
      key={index}
    >
      <div className="flex h-full items-center justify-center md:min-h-[200px]">{children}</div>
    </div>
  )
}
