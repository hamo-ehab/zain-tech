import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { UserProfiles, Courses, Services, BookingRequests } from '@/entities';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Settings, User, Calendar, TrendingUp } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DashboardPage() {
  const { member } = useMember();
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [bookings, setBookings] = useState<BookingRequests[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [member]);

  const loadDashboardData = async () => {
    if (!member?.loginEmail) {
      setLoading(false);
      return;
    }

    // Load or create user profile
    const { items: profiles } = await BaseCrudService.getAll<UserProfiles>('userprofiles');
    let profile = profiles.find(p => p.email === member.loginEmail);
    
    if (!profile) {
      profile = {
        _id: crypto.randomUUID(),
        userId: crypto.randomUUID(),
        email: member.loginEmail,
        fullName: member.contact?.firstName && member.contact?.lastName 
          ? `${member.contact.firstName} ${member.contact.lastName}`
          : member.profile?.nickname || 'User',
        phoneNumber: member.contact?.phones?.[0] || '',
        languagePreference: 'en',
        hasPaidAccess: false
      };
      await BaseCrudService.create('userprofiles', profile);
    }
    
    setUserProfile(profile);

    // Load courses and services
    const { items: allCourses } = await BaseCrudService.getAll<Courses>('courses');
    const { items: allServices } = await BaseCrudService.getAll<Services>('services');
    const { items: allBookings } = await BaseCrudService.getAll<BookingRequests>('bookings');
    
    setCourses(allCourses.filter(c => c.isPublished));
    setServices(allServices.filter(s => s.isAvailable));
    setBookings(allBookings.filter(b => b.userId === profile.userId));
    
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
        {/* Welcome Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome back, <span className="text-neon-cyan">{userProfile?.fullName || member?.profile?.nickname}</span>
          </h1>
          <p className="font-paragraph text-lg text-white/70">
            {userProfile?.hasPaidAccess 
              ? `Your User ID: ${userProfile.userId?.substring(0, 9)}`
              : 'Complete your payment to unlock full access to courses and services'
            }
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, label: 'Available Courses', value: courses.length, color: 'neon-cyan' },
            { icon: Briefcase, label: 'Services', value: services.length, color: 'neon-green' },
            { icon: Calendar, label: 'My Bookings', value: bookings.length, color: 'neon-cyan' },
            { icon: TrendingUp, label: 'Progress', value: userProfile?.hasPaidAccess ? '0%' : 'N/A', color: 'neon-green' }
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2 bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/academy"
                className="bg-black/50 border border-neon-cyan/50 rounded-lg p-6 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                <BookOpen className="w-8 h-8 text-neon-cyan mb-3" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">Browse Courses</h3>
                <p className="font-paragraph text-sm text-white/70">
                  Explore our comprehensive course catalog
                </p>
              </Link>

              <Link
                to="/services"
                className="bg-black/50 border border-neon-green/50 rounded-lg p-6 hover:border-neon-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300"
              >
                <Briefcase className="w-8 h-8 text-neon-green mb-3" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">Book a Service</h3>
                <p className="font-paragraph text-sm text-white/70">
                  Get professional tech services
                </p>
              </Link>

              <Link
                to="/dashboard/bookings"
                className="bg-black/50 border border-neon-cyan/50 rounded-lg p-6 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                <Calendar className="w-8 h-8 text-neon-cyan mb-3" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">My Bookings</h3>
                <p className="font-paragraph text-sm text-white/70">
                  Track your service requests
                </p>
              </Link>

              <Link
                to="/dashboard/settings"
                className="bg-black/50 border border-neon-green/50 rounded-lg p-6 hover:border-neon-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300"
              >
                <Settings className="w-8 h-8 text-neon-green mb-3" />
                <h3 className="font-heading text-xl font-bold text-white mb-2">Settings</h3>
                <p className="font-paragraph text-sm text-white/70">
                  Manage your account preferences
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-neon-cyan rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">Profile</h3>
                <p className="font-paragraph text-sm text-white/70">
                  {userProfile?.hasPaidAccess ? 'Premium Member' : 'Free Member'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-paragraph text-sm text-white/60 mb-1">Email</p>
                <p className="font-paragraph text-base text-white">{userProfile?.email}</p>
              </div>
              
              {userProfile?.phoneNumber && (
                <div>
                  <p className="font-paragraph text-sm text-white/60 mb-1">Phone</p>
                  <p className="font-paragraph text-base text-white">{userProfile.phoneNumber}</p>
                </div>
              )}

              {!userProfile?.hasPaidAccess && (
                <div className="pt-4 border-t border-neon-cyan/30">
                  <p className="font-paragraph text-sm text-white/70 mb-4">
                    Upgrade to premium to unlock all features
                  </p>
                  <button className="w-full bg-neon-green text-black font-heading text-sm py-3 rounded-lg hover:bg-neon-green/80 transition-all duration-300">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Bookings */}
        {bookings.length > 0 && (
          <motion.div
            className="mt-8 bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-3xl font-bold text-white mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => (
                <div
                  key={booking._id}
                  className="bg-black/50 border border-neon-cyan/50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-heading text-lg font-bold text-white mb-1">
                      {booking.bookedItemName}
                    </h4>
                    <p className="font-paragraph text-sm text-white/70">
                      {booking.bookedItemType} • {booking.status}
                    </p>
                  </div>
                  <Link
                    to="/dashboard/bookings"
                    className="text-neon-cyan font-paragraph text-sm hover:text-neon-cyan/80 transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
