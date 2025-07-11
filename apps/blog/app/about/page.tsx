import ResumeClient from '@/app/about/client'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function ResumePage() {
  return (
    <div>
      <ResumeClient />
    </div>
  )
  // const author = allAuthors.find((p) => p.slug === 'default') as Authors
  // const mainContent = coreContent(author)

  // return (
  //   <>
  //     <AuthorLayout content={mainContent}>
  //       <MDXLayoutRenderer code={author.body.code} />
  //     </AuthorLayout>
  //   </>
  // )
}
