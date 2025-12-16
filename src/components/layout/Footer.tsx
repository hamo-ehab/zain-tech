import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neon-cyan/30 mt-auto">
      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-neon-cyan rounded-lg flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-black">ZT</span>
              </div>
              <span className="font-heading text-xl font-bold text-white">Zain Tech</span>
            </div>
            <p className="font-paragraph text-sm text-white/70">
              Innovating the future with cutting-edge technology solutions and advanced learning platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/academy', label: 'Academy' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { path: '/blog', label: 'Blog' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/login', label: 'Login' },
                { path: '/register', label: 'Register' },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
                <a
                  href="tel:+201148352628"
                  className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
                >
                  +201148352628
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
                <a
                  href="mailto:zain@zain-tech.me"
                  className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
                >
                  zain@zain-tech.me
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neon-cyan mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm text-white/70">
                  Cairo, Egypt
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neon-cyan/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-white/70">
              © {currentYear} Zain Tech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
