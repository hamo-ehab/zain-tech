import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { BookingRequests, UserProfiles, Services, Courses } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingsPage() {
  const { member } = useMember();
  const [bookings, setBookings] = useState<BookingRequests[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [member]);

  const loadBookings = async () => {
    if (!member?.loginEmail) {
      setLoading(false);
      return;
    }

    const { items: profiles } = await BaseCrudService.getAll<UserProfiles>('userprofiles');
    const profile = profiles.find(p => p.email === member.loginEmail);
    
    if (profile) {
      setUserProfile(profile);
      const { items } = await BaseCrudService.getAll<BookingRequests>('bookings');
      const userBookings = items.filter(b => b.userId === profile.userId).sort((a, b) => {
        const dateA = a.requestDate ? new Date(a.requestDate).getTime() : 0;
        const dateB = b.requestDate ? new Date(b.requestDate).getTime() : 0;
        return dateB - dateA;
      });
      setBookings(userBookings);
    }
    
    setLoading(false);
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-neon-green" />;
      case 'in progress':
        return <Clock className="w-5 h-5 text-neon-cyan" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'border-neon-green text-neon-green';
      case 'in progress':
        return 'border-neon-cyan text-neon-cyan';
      case 'pending':
        return 'border-yellow-500 text-yellow-500';
      default:
        return 'border-red-500 text-red-500';
    }
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
            My <span className="text-neon-cyan">Bookings</span>
          </h1>
          <p className="font-paragraph text-lg text-white/70">
            Track and manage your service and course bookings
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <motion.div
            className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-white mb-2">No Bookings Yet</h2>
            <p className="font-paragraph text-base text-white/70">
              You haven't made any bookings. Explore our services and courses to get started!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusIcon(booking.status)}
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {booking.bookedItemName}
                      </h3>
                    </div>
                    <div className="space-y-2 font-paragraph text-sm text-white/70">
                      <p>Type: {booking.bookedItemType}</p>
                      {booking.userContactPhone && (
                        <p>Contact: {booking.userContactPhone}</p>
                      )}
                      {booking.requestDate && (
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Requested: {format(new Date(booking.requestDate), 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-2 rounded-lg border font-paragraph text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status || 'Pending'}
                    </span>
                    {booking.adminOwnerId && (
                      <p className="font-paragraph text-xs text-white/60">
                        Assigned to admin
                      </p>
                    )}
                  </div>
                </div>
                {booking.taskHistory && (
                  <div className="mt-4 pt-4 border-t border-neon-cyan/30">
                    <p className="font-paragraph text-sm text-white/70">
                      <span className="text-white font-bold">History:</span> {booking.taskHistory}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
