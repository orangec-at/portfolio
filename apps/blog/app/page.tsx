import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import Homepage from '@/components/homepage/homepage'

export default async function Page() {
  const posts = allCoreContent(sortPosts(allPosts))
  
  return <Homepage posts={posts} />
}
