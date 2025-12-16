import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useMember } from '@/integrations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const publicLinks = [
    { path: '/', label: language === 'en' ? 'Home' : 'الرئيسية' },
    { path: '/about', label: language === 'en' ? 'About Us' : 'من نحن' },
    { path: '/services', label: language === 'en' ? 'Services' : 'الخدمات' },
    { path: '/academy', label: language === 'en' ? 'Academy' : 'الأكاديمية' },
    { path: '/blog', label: language === 'en' ? 'Blog' : 'المدونة' },
    { path: '/contact', label: language === 'en' ? 'Contact' : 'اتصل بنا' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-neon-cyan/30">
      <nav className="max-w-[100rem] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neon-cyan rounded-lg flex items-center justify-center">
              <span className="font-heading text-xl font-bold text-black">ZT</span>
            </div>
            <span className="font-heading text-xl font-bold text-white hidden sm:inline">Zain Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {publicLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-neon-cyan'
                    : 'text-white/80 hover:text-neon-cyan'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-paragraph text-sm">{language.toUpperCase()}</span>
            </button>

            {/* Auth Buttons */}
            {!isLoading && (
              <>
                {!isAuthenticated ? (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/login"
                      className="font-paragraph text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
                    >
                      {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                    </Link>
                    <Link
                      to="/register"
                      className="font-paragraph text-sm bg-neon-cyan text-black px-4 py-2 rounded-lg hover:bg-neon-cyan/80 transition-all duration-300"
                    >
                      {language === 'en' ? 'Register' : 'تسجيل'}
                    </Link>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/dashboard"
                      className="font-paragraph text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
                    >
                      {member?.profile?.nickname || language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                    </Link>
                    <button
                      onClick={actions.logout}
                      className="font-paragraph text-sm text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-neon-cyan"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-neon-cyan/30"
            >
              <div className="flex flex-col gap-4">
                {publicLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph text-sm transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-neon-cyan'
                        : 'text-white/80 hover:text-neon-cyan'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!isLoading && (
                  <>
                    {!isAuthenticated ? (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-paragraph text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
                        >
                          {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-paragraph text-sm bg-neon-cyan text-black px-4 py-2 rounded-lg hover:bg-neon-cyan/80 transition-all duration-300 text-center"
                        >
                          {language === 'en' ? 'Register' : 'تسجيل'}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-paragraph text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300"
                        >
                          {member?.profile?.nickname || language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                        </Link>
                        <button
                          onClick={() => {
                            actions.logout();
                            setMobileMenuOpen(false);
                          }}
                          className="font-paragraph text-sm text-white/80 hover:text-white transition-colors duration-300 text-left"
                        >
                          {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
