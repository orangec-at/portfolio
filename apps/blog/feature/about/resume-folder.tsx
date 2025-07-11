const CARD_COLOR_1 = '#29538D'
const CARD_COLOR_2 = '#7589EB'
const CARD_COLOR_3 = '#17BED1'

export default function ResumeFolder() {
  return (
    <div className="relative aspect-[4/3] h-100">
      {/* Top folder tabs */}
      <div className="absolute top-0 left-0 z-10 h-8 w-20 rounded-t-md bg-[#7589EB]" />
      <div className="absolute top-0 left-16 z-10 h-8 w-20 rounded-t-md bg-[#17BED1]" />

      {/* Main folder body */}
      <div className="absolute top-4 h-full w-full rounded-md bg-[#29538D] p-10 text-white shadow-lg">
        <span>Hello</span>
      </div>
    </div>
  )
}
