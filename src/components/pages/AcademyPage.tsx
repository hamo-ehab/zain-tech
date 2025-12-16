import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Courses } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';

export default function AcademyPage() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { items } = await BaseCrudService.getAll<Courses>('courses');
    setCourses(items.filter(c => c.isPublished));
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
            Zain Tech <span className="text-neon-cyan">Academy</span>
          </h1>
          <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
            Master cutting-edge technologies with our comprehensive courses. Learn from industry experts and advance your career.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: BookOpen,
              title: 'Expert-Led Courses',
              description: 'Learn from industry professionals with real-world experience'
            },
            {
              icon: Clock,
              title: 'Learn at Your Pace',
              description: 'Access courses anytime, anywhere, and progress at your own speed'
            },
            {
              icon: Award,
              title: 'Certification',
              description: 'Earn recognized certificates upon course completion'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black/50 border border-neon-cyan/50 rounded-xl backdrop-blur-lg p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <feature.icon className="w-10 h-10 text-neon-cyan mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="font-paragraph text-sm text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-paragraph text-lg text-white/70">
              No courses available at the moment. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:border-neon-green transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {course.courseImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.courseImage}
                      alt={course.courseName || 'Course'}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {course.courseName}
                  </h3>
                  {course.courseDescription && (
                    <p className="font-paragraph text-sm text-white/70 mb-4 line-clamp-3">
                      {course.courseDescription}
                    </p>
                  )}
                  {course.courseDuration && (
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-neon-cyan" />
                      <span className="font-paragraph text-sm text-white/60">
                        {course.courseDuration}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    <span className="font-heading text-2xl font-bold text-neon-cyan">
                      ${course.price}
                    </span>
                    <Link
                      to="/dashboard"
                      className="bg-neon-cyan text-black font-paragraph text-sm px-6 py-2 rounded-lg hover:bg-neon-cyan/80 transition-all duration-300"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="font-paragraph text-base text-white/70 mb-6 max-w-2xl mx-auto">
            Join thousands of students already advancing their careers with Zain Tech Academy.
          </p>
          <Link
            to="/register"
            className="bg-neon-green text-black font-heading px-8 py-3 rounded-lg hover:bg-neon-green/80 transition-all duration-300 inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
