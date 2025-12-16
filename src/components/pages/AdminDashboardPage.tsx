import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { AdminAccounts, Courses, Services, BookingRequests } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Calendar, Users, TrendingUp, Settings } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    courses: 0,
    services: 0,
    bookings: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { items: courses } = await BaseCrudService.getAll<Courses>('courses');
    const { items: services } = await BaseCrudService.getAll<Services>('services');
    const { items: bookings } = await BaseCrudService.getAll<BookingRequests>('bookings');
    
    setStats({
      courses: courses.length,
      services: services.length,
      bookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length
    });
    
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
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            Admin <span className="text-neon-cyan">Dashboard</span>
          </h1>
          <p className="font-paragraph text-lg text-white/70">
            Manage courses, services, and bookings
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, label: 'Total Courses', value: stats.courses, color: 'neon-cyan' },
            { icon: Briefcase, label: 'Total Services', value: stats.services, color: 'neon-green' },
            { icon: Calendar, label: 'Total Bookings', value: stats.bookings, color: 'neon-cyan' },
            { icon: TrendingUp, label: 'Pending Bookings', value: stats.pendingBookings, color: 'neon-green' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-black/50 border border-neon-cyan/50 rounded-xl backdrop-blur-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <stat.icon className={`w-8 h-8 text-${stat.color} mb-3`} />
              <p className="font-paragraph text-sm text-white/70 mb-1">{stat.label}</p>
              <p className="font-heading text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-heading text-3xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/courses"
              className="bg-black/50 border border-neon-cyan/50 rounded-lg p-6 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              <BookOpen className="w-8 h-8 text-neon-cyan mb-3" />
              <h3 className="font-heading text-xl font-bold text-white mb-2">Manage Courses</h3>
              <p className="font-paragraph text-sm text-white/70">
                Create, edit, and publish courses
              </p>
            </Link>

            <Link
              to="/admin/services"
              className="bg-black/50 border border-neon-green/50 rounded-lg p-6 hover:border-neon-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300"
            >
              <Briefcase className="w-8 h-8 text-neon-green mb-3" />
              <h3 className="font-heading text-xl font-bold text-white mb-2">Manage Services</h3>
              <p className="font-paragraph text-sm text-white/70">
                Add and update service offerings
              </p>
            </Link>

            <Link
              to="/admin/bookings"
              className="bg-black/50 border border-neon-cyan/50 rounded-lg p-6 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              <Calendar className="w-8 h-8 text-neon-cyan mb-3" />
              <h3 className="font-heading text-xl font-bold text-white mb-2">View Bookings</h3>
              <p className="font-paragraph text-sm text-white/70">
                Manage booking requests
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-heading text-2xl font-bold text-white mb-4">Admin Guidelines</h3>
          <ul className="space-y-2 font-paragraph text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2"></span>
              <span>Courses must be published before they appear to users</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2"></span>
              <span>Services can be marked as available/unavailable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2"></span>
              <span>First admin to open a booking request becomes the owner</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2"></span>
              <span>Update booking status to keep users informed</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
