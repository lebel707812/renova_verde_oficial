import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeaturedArticles from '@/components/landing/FeaturedArticles';
import NewsletterSection from '@/components/landing/NewsletterSection';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Articles Section */}
      <FeaturedArticles />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </MainLayout>
  );
}
