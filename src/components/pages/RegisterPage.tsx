import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const { actions } = useMember();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-24">
      <motion.div
        className="w-full max-w-md bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neon-green rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Join Zain Tech</h1>
          <p className="font-paragraph text-base text-white/70">
            Create your account and start learning
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={actions.login}
            className="w-full bg-neon-green text-black font-heading text-base py-4 rounded-lg hover:bg-neon-green/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="font-paragraph text-sm text-white/70">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neon-cyan/30">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-white text-center mb-4">
              What you'll get:
            </h3>
            <ul className="space-y-2 font-paragraph text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                Access to premium courses
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                Professional services booking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                Progress tracking and certificates
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></span>
                Personalized dashboard
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neon-cyan/30">
          <p className="font-paragraph text-xs text-white/50 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
