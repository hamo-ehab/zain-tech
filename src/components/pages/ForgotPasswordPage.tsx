import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-24">
      <motion.div
        className="w-full max-w-md bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Reset Password</h1>
          <p className="font-paragraph text-base text-white/70">
            {submitted 
              ? 'Check your email for the OTP code'
              : 'Enter your email to receive an OTP code'
            }
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="font-paragraph text-sm text-white/80 mb-2 block">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                placeholder="your@email.com"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-heading text-base py-6"
            >
              {loading ? 'Sending...' : 'Send OTP Code'}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-neon-green/20 border border-neon-green rounded-lg p-4">
              <p className="font-paragraph text-sm text-neon-green text-center">
                An OTP code has been sent to {email}. Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>

            <div className="text-center space-y-4">
              <p className="font-paragraph text-sm text-white/70">
                Didn't receive the code?
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="font-paragraph text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
              >
                Resend OTP
              </button>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/login"
                className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
