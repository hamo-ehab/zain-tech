import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { items } = await BaseCrudService.getAll<Services>('services');
    setServices(items.filter(s => s.isAvailable));
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
            Our <span className="text-neon-cyan">Services</span>
          </h1>
          <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
            Professional technology solutions tailored to your needs. Book a service and let our experts handle the rest.
          </p>
        </motion.div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-paragraph text-lg text-white/70">
              No services available at the moment. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:border-neon-green transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {service.thumbnail && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.thumbnail}
                      alt={service.serviceName || 'Service'}
                      className="w-full h-full object-cover"
                      width={400}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {service.serviceName}
                  </h3>
                  {service.shortDescription && (
                    <p className="font-paragraph text-sm text-white/70 mb-4">
                      {service.shortDescription}
                    </p>
                  )}
                  {service.description && (
                    <p className="font-paragraph text-sm text-white/60 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    <span className="font-heading text-2xl font-bold text-neon-cyan">
                      ${service.price}
                    </span>
                    <Link
                      to="/dashboard"
                      className="bg-neon-cyan text-black font-paragraph text-sm px-6 py-2 rounded-lg hover:bg-neon-cyan/80 transition-all duration-300"
                    >
                      Book Now
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
            Need a Custom Solution?
          </h2>
          <p className="font-paragraph text-base text-white/70 mb-6 max-w-2xl mx-auto">
            Contact us to discuss your specific requirements and get a tailored solution.
          </p>
          <Link
            to="/contact"
            className="bg-neon-green text-black font-heading px-8 py-3 rounded-lg hover:bg-neon-green/80 transition-all duration-300 inline-block"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
