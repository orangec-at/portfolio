import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center py-4">
        <div className="mb-2 flex space-x-3">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
          <SocialIcon kind="x" href={siteMetadata.x} size={5} />
        </div>
        <div className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="mb-1">{siteMetadata.author}</div>
          <div className="flex items-center">
            <span>{`© ${2025}`}</span>
            <span className="mx-1">{` • `}</span>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
