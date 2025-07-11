import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Archive' })

export default function ArchivePage() {
  return (
    <div>
      <h1>Archive</h1>
      <p>This is the archive page.</p>
    </div>
  )
}
