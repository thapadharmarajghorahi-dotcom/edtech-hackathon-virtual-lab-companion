import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FlaskConical, Boxes, ClipboardList, Download } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MolecularLogo } from '@/components/MolecularLogo';

export function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [language, setLanguage] = useState<'nepali' | 'english'>('english');

  const handleGuestAccess = () => {
    login('guest@virtuallab.com', 'student', 'Guest User');
    navigate('/student');
  };

  const features = [
    {
      icon: FlaskConical,
      title: 'Virtual Experiments',
      description: 'Interactive lab simulations',
    },
    {
      icon: Boxes,
      title: '2D & 3D Simulations',
      description: 'Realistic visualizations',
    },
    {
      icon: ClipboardList,
      title: 'Auto Practical Notes',
      description: 'Automatic documentation',
    },
    {
      icon: Download,
      title: 'Offline Learning',
      description: 'Learn anywhere, anytime',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <img
        src="/background.png"
        alt="Virtual Lab Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 container mx-auto px-4 py-4 flex flex-col min-h-screen">
        {/* Top Header Section - Pushed to the edges to negate container padding */}
        <div className="relative flex items-center justify-between h-20 mb-8 px-0 -mx-4 md:-mx-6">
          {/* Logo & Brand - Moved further Left as requested */}
          <div className="flex items-center gap-4 -ml-6 md:-ml-8">
            <MolecularLogo size={35} />
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-0 leading-tight tracking-tight">
                VIRTUAL LAB
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-widest uppercase">
                Simulator
              </p>
            </div>
          </div>

          {/* Navigation & Login - Right */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleGuestAccess}
              className="hidden md:block text-white/80 hover:text-white transition-colors underline font-medium drop-shadow-lg text-sm"
            >
              Try as Guest
            </button>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/login')}
                size="sm"
                className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/login')}
                size="sm"
                variant="outline"
                className="px-5 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md transition-all"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Marquee Slogan - Moved further down to completely avoid overlap */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-full py-3 px-8 max-w-5xl mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden mb-12 mt-4">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .marquee {
                display: inline-block;
                white-space: nowrap;
                animation: marquee 30s linear infinite;
              }
              .marquee-container:hover .marquee {
                animation-play-state: paused;
              }
            `}} />
          <div className="marquee-container">
            <h2 className="marquee text-lg md:text-xl font-medium text-blue-100/90 tracking-wide drop-shadow-sm">
              ✨ Learn & Experiment Like Never Before! • For Nepali +2 Students to Explore Science Practically! ✨
            </h2>
          </div>
        </div>

        {/* Spacer to push grid to bottom */}
        <div className="flex-grow"></div>



        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 mt-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center bg-black/30 backdrop-blur-md rounded-xl p-3 md:p-4 border border-white/10 shadow-xl hover:bg-black/40 transition-all">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-white mb-1 drop-shadow-lg">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/80 hidden md:block drop-shadow-md">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>



        {/* Footer Section */}
        <div className="mt-auto pt-4">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/10 shadow-xl">
            <div className="flex items-center justify-center text-sm text-white">
              <div className="flex items-center gap-2">
                <span className="font-medium drop-shadow-lg">Language:</span>
                <button
                  onClick={() => setLanguage(language === 'english' ? 'nepali' : 'english')}
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors font-medium backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  {language === 'english' ? 'English' : 'नयनी / English'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

