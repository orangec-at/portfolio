import { EyeClosed, FileText, Home, Info } from 'lucide-react'
import { ReactNode } from 'react'

interface NavLink {
  href: string
  title: string
  icon: ReactNode
}

const headerNavLinks: NavLink[] = [
  {
    href: '/',
    title: 'Home',
    icon: <Home className="h-6 w-6" />,
  },
  {
    href: '/about',
    title: 'About',
    icon: <Info className="h-6 w-6" />,
  },
  {
    href: '/posts',
    title: 'Posts',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    href: '/peeks',
    title: 'Peeks', // 링크나 글 같은거 붙여넣고, 내 생각글 남기기. 마이크로 블로깅
    icon: <EyeClosed className="h-6 w-6" />,
  },
]

export default headerNavLinks
