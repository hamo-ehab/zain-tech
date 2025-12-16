import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
            About <span className="text-neon-cyan">Zain Tech</span>
          </h1>
          <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
            We are a forward-thinking technology company dedicated to empowering businesses and individuals through innovative solutions and advanced learning platforms.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Target className="w-12 h-12 text-neon-cyan mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="font-paragraph text-base text-white/70">
              To deliver cutting-edge technology solutions that transform businesses and empower individuals to achieve their full potential through accessible, high-quality education and services.
            </p>
          </motion.div>

          <motion.div
            className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-12 h-12 text-neon-green mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="font-paragraph text-base text-white/70">
              To become the leading technology and education platform in the region, recognized for innovation, excellence, and our commitment to shaping the future of digital transformation.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from our services to our customer support.'
              },
              {
                icon: Users,
                title: 'Customer-Centric',
                description: 'Our customers are at the heart of our business. We listen, adapt, and deliver solutions that meet their needs.'
              },
              {
                icon: TrendingUp,
                title: 'Innovation',
                description: 'We embrace change and continuously innovate to stay ahead of the curve in technology and education.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-black/50 border border-neon-cyan/50 rounded-xl backdrop-blur-lg p-8 text-center hover:border-neon-cyan transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <value.icon className="w-12 h-12 text-neon-cyan mx-auto mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="font-paragraph text-base text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="space-y-4 font-paragraph text-base text-white/70 max-w-4xl mx-auto">
            <p>
              Founded with a vision to bridge the gap between technology and education, Zain Tech has grown from a small startup to a comprehensive platform serving thousands of users across the region.
            </p>
            <p>
              Our journey began with a simple belief: that everyone deserves access to quality education and innovative technology solutions. Today, we offer a full suite of services including professional courses, technical services, and enterprise solutions.
            </p>
            <p>
              We continue to evolve, listening to our community and adapting to the ever-changing landscape of technology and education. Our commitment remains the same: to empower, innovate, and inspire.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
