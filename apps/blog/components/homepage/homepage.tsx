import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import HeroSection from './hero-section'
import AboutPreview from './about-preview'
import FeaturedContent from './featured-content'
import StatsSection from './stats-section'
import ContactSection from './contact-section'

interface HomepageProps {
  posts?: any[]
}

export default function Homepage({ posts }: HomepageProps) {
  // Get recent posts for featured content
  const sortedPosts = allCoreContent(sortPosts(allPosts))
  const recentPosts = posts || sortedPosts.slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Preview */}
      <AboutPreview />
      
      {/* Featured Content Hub */}
      <FeaturedContent posts={recentPosts} />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}