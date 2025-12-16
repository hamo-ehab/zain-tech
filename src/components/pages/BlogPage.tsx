import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
    const publishedPosts = items.filter(p => p.isPublished).sort((a, b) => {
      const dateA = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
      const dateB = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
      return dateB - dateA;
    });
    setPosts(publishedPosts);
    setLoading(false);
  };

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
                    <Image
                      src={post.thumbnailImage}
                      alt={post.title || 'Blog post'}
                      className="w-full h-full object-cover"
                      width={400}
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
                    to={`/blog/${post.slug || post._id}`}
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
