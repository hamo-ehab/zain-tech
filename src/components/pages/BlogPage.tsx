import { useState } from 'react';
import { motion } from 'framer-motion';
// Removed BaseCrudService
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPage() {
  // Static Mock Data for Blog Posts
  const posts = [
    {
      _id: '1',
      title: 'The Future of AI in Education',
      author: 'Zain Admin',
      publicationDate: new Date().toISOString(),
      content: 'Artificial Intelligence is reshaping how we learn and teach. From personalized learning paths to automated grading...',
      thumbnailImage: 'https://static.wixstatic.com/media/9e0878_c7f4d149e322450fb044673a43eca177~mv2.png',
      isPublished: true,
      slug: 'future-of-ai'
    },
    {
      _id: '2',
      title: 'Why Cybersecurity Matters',
      author: 'Security Team',
      publicationDate: new Date(Date.now() - 86400000).toISOString(),
      content: 'In an era of increasing digital threats, securing your infrastructure is not just an option, it is a necessity...',
      thumbnailImage: 'https://static.wixstatic.com/media/9e0878_8e438bd835f24dfd9247e6d2b1ad4fd8~mv2.png',
      isPublished: true,
      slug: 'cybersecurity-matters'
    },
    {
      _id: '3',
      title: 'Top Web Dev Frameworks 2025',
      author: 'Dev Team',
      publicationDate: new Date(Date.now() - 172800000).toISOString(),
      content: 'A comprehensive look at the most popular frameworks defining the modern web, from Astro to React 19...',
      thumbnailImage: 'https://static.wixstatic.com/media/9e0878_951163f626434b1e8fb2fab421df5b17~mv2.png',
      isPublished: true,
      slug: 'web-dev-frameworks'
    }
  ];

  const loading = false; // No loading needed

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-[100rem] mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-white mb-6">
            Tech <span className="text-neon-cyan">Blog</span>
          </h1>
          <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and innovations in technology and education.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-paragraph text-lg text-white/70">
              No blog posts available at the moment. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:border-neon-green transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {post.thumbnailImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.thumbnailImage}
                      alt={post.title || 'Blog post'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span className="font-paragraph">{post.author}</span>
                      </div>
                    )}
                    {post.publicationDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-paragraph">
                          {format(new Date(post.publicationDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {post.title}
                  </h3>
                  {post.content && (
                    <p className="font-paragraph text-sm text-white/70 mb-4 line-clamp-3">
                      {post.content.substring(0, 150)}...
                    </p>
                  )}
                  <Link
                    to="#"
                    className="text-neon-cyan font-paragraph text-sm hover:text-neon-cyan/80 transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
