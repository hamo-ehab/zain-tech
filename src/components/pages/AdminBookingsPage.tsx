import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { BookingRequests } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRequests[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in progress' | 'completed'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { items } = await BaseCrudService.getAll<BookingRequests>('bookings');
    setBookings(items.sort((a, b) => {
      const dateA = a.requestDate ? new Date(a.requestDate).getTime() : 0;
      const dateB = b.requestDate ? new Date(b.requestDate).getTime() : 0;
      return dateB - dateA;
    }));
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await BaseCrudService.update<BookingRequests>('bookings', {
      _id: id,
      status,
      adminOwnerId: 'current-admin-id'
    });
    await loadBookings();
  };

  const filteredBookings = bookings.filter(b => 
    filter === 'all' || b.status?.toLowerCase() === filter
  );

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-neon-green" />;
      case 'in progress':
        return <Clock className="w-5 h-5 text-neon-cyan" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
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
            Manage <span className="text-neon-cyan">Bookings</span>
          </h1>
          <p className="font-paragraph text-lg text-white/70">
            View and manage all booking requests
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex gap-4 mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(['all', 'pending', 'in progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-lg font-paragraph text-sm whitespace-nowrap transition-all duration-300 ${
                filter === status
                  ? 'bg-neon-cyan text-black'
                  : 'bg-black/50 border border-neon-cyan/50 text-white hover:border-neon-cyan'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-white mb-2">No Bookings Found</h2>
            <p className="font-paragraph text-base text-white/70">
              No bookings match the selected filter.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusIcon(booking.status)}
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {booking.bookedItemName}
                      </h3>
                    </div>
                    <div className="space-y-2 font-paragraph text-sm text-white/70">
                      <p>Type: <span className="text-white">{booking.bookedItemType}</span></p>
                      <p>User ID: <span className="text-white font-mono">{booking.userId}</span></p>
                      {booking.userContactPhone && (
                        <p>Contact: <span className="text-white">{booking.userContactPhone}</span></p>
                      )}
                      {booking.requestDate && (
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(booking.requestDate), 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                      {booking.adminOwnerId && (
                        <p>Assigned to: <span className="text-neon-cyan">{booking.adminOwnerId}</span></p>
                      )}
                    </div>
                    {booking.taskHistory && (
                      <div className="mt-4 pt-4 border-t border-neon-cyan/30">
                        <p className="font-paragraph text-sm text-white/70">
                          <span className="text-white font-bold">History:</span> {booking.taskHistory}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className={`px-4 py-2 rounded-lg border font-paragraph text-sm text-center ${
                      booking.status?.toLowerCase() === 'completed' ? 'border-neon-green text-neon-green' :
                      booking.status?.toLowerCase() === 'in progress' ? 'border-neon-cyan text-neon-cyan' :
                      'border-yellow-500 text-yellow-500'
                    }`}>
                      {booking.status || 'Pending'}
                    </span>
                    <div className="flex flex-col gap-2">
                      {booking.status !== 'in progress' && (
                        <Button
                          onClick={() => updateStatus(booking._id, 'in progress')}
                          size="sm"
                          className="bg-neon-cyan text-black hover:bg-neon-cyan/80"
                        >
                          Start
                        </Button>
                      )}
                      {booking.status !== 'completed' && (
                        <Button
                          onClick={() => updateStatus(booking._id, 'completed')}
                          size="sm"
                          className="bg-neon-green text-black hover:bg-neon-green/80"
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
