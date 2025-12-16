import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
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
          <div className="w-16 h-16 bg-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="font-paragraph text-base text-white/70">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="space-y-6">
          <button
            onClick={actions.login}
            className="w-full bg-neon-cyan text-black font-heading text-base py-4 rounded-lg hover:bg-neon-cyan/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            Sign In 
          </button>

          <div className="text-center">
            <p className="font-paragraph text-sm text-white/70">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="font-paragraph text-sm text-white/60 hover:text-neon-cyan transition-colors duration-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neon-cyan/30">
          <p className="font-paragraph text-xs text-white/50 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}
