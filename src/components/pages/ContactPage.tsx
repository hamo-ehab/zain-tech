import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submission: ContactSubmissions = {
      _id: crypto.randomUUID(),
      submitterName: formData.name,
      submitterEmail: formData.email,
      submitterPhone: formData.phone,
      messageContent: formData.message,
      submissionDate: new Date().toISOString()
    };

    await BaseCrudService.create('contactsubmissions', submission);
    
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            Get in <span className="text-neon-cyan">Touch</span>
          </h1>
          <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="font-paragraph text-sm text-white/80 mb-2 block">
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-paragraph text-sm text-white/80 mb-2 block">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="font-paragraph text-sm text-white/80 mb-2 block">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                  placeholder="+201000000000"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-paragraph text-sm text-white/80 mb-2 block">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {submitted && (
                <div className="bg-neon-green/20 border border-neon-green rounded-lg p-4">
                  <p className="font-paragraph text-sm text-neon-green">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-heading text-base py-6"
              >
                {submitting ? 'Sending...' : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8">
              <h2 className="font-heading text-3xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">Phone</h3>
                    <a
                      href="tel:01148352628"
                      className="font-paragraph text-base text-white/70 hover:text-neon-cyan transition-colors duration-300"
                    >
                      +201148352628
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">Email</h3>
                    <a
                      href="mailto:zain@zain-tech.me"
                      className="font-paragraph text-base text-white/70 hover:text-neon-cyan transition-colors duration-300"
                    >
                      zain@zain-tech.me
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neon-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">Location</h3>
                    <p className="font-paragraph text-base text-white/70">
                      Cairo, Egypt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 font-paragraph text-base text-white/70">
                <p>Sunday - Thursday: 9:00 AM - 5:00 PM</p>
                <p> Saturday: 10:00 AM - 4:00 PM</p>
                <p>Friday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
