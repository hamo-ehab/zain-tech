import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { UserProfiles } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Phone, Globe, Save } from 'lucide-react';

export default function SettingsPage() {
  const { member } = useMember();
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    languagePreference: 'en'
  });

  useEffect(() => {
    loadProfile();
  }, [member]);

  const loadProfile = async () => {
    if (!member?.loginEmail) {
      setLoading(false);
      return;
    }

    const { items: profiles } = await BaseCrudService.getAll<UserProfiles>('userprofiles');
    const profile = profiles.find(p => p.email === member.loginEmail);
    
    if (profile) {
      setUserProfile(profile);
      setFormData({
        fullName: profile.fullName || '',
        phoneNumber: profile.phoneNumber || '',
        languagePreference: profile.languagePreference || 'en'
      });
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setSaving(true);

    await BaseCrudService.update<UserProfiles>('userprofiles', {
      _id: userProfile._id,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      languagePreference: formData.languagePreference
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            Account <span className="text-neon-cyan">Settings</span>
          </h1>
          <p className="font-paragraph text-lg text-white/70">
            Manage your profile and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <motion.div
            className="lg:col-span-2 bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-white mb-6">Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="font-paragraph text-sm text-white/80 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="font-paragraph text-sm text-white/80 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="bg-black/50 border-neon-cyan/50 text-white focus:border-neon-cyan"
                  placeholder="+201148352628"
                />
                <p className="font-paragraph text-xs text-white/60 mt-2">
                  Changing your phone number will require OTP verification
                </p>
              </div>

              <div>
                <label htmlFor="languagePreference" className="font-paragraph text-sm text-white/80 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language Preference
                </label>
                <select
                  id="languagePreference"
                  name="languagePreference"
                  value={formData.languagePreference}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-neon-cyan/50 text-white rounded-lg px-4 py-3 focus:border-neon-cyan focus:outline-none font-paragraph text-base"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
              </div>

              {saved && (
                <div className="bg-neon-green/20 border border-neon-green rounded-lg p-4">
                  <p className="font-paragraph text-sm text-neon-green">
                    Settings saved successfully!
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-neon-cyan text-black hover:bg-neon-cyan/80 font-heading text-base py-6"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Account Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4">Account Status</h3>
              <div className="space-y-3 font-paragraph text-sm">
                <div>
                  <p className="text-white/60 mb-1">Email</p>
                  <p className="text-white">{userProfile?.email}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">User ID</p>
                  <p className="text-white font-mono">
                    {userProfile?.userId?.substring(0, 9) || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Membership</p>
                  <p className={userProfile?.hasPaidAccess ? 'text-neon-green' : 'text-white'}>
                    {userProfile?.hasPaidAccess ? 'Premium' : 'Free'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <button className="w-full bg-transparent border border-neon-cyan text-neon-cyan font-paragraph text-sm py-3 rounded-lg hover:bg-neon-cyan/10 transition-all duration-300">
                  Change Password
                </button>
                <p className="font-paragraph text-xs text-white/60 text-center">
                  You'll receive an OTP to verify the change
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
