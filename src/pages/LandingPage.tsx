import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FlaskConical, Boxes, ClipboardList, Download, Users, GraduationCap, Beaker } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

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
    <div className="min-h-screen relative overflow-hidden">
      <img
        src="/background.png"
        alt="Virtual Lab Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="text-center mb-12 mt-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Molecular Structure Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl blur-lg opacity-60" />
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-5 rounded-2xl shadow-2xl">
                {/* Molecular structure pattern */}
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
                  {/* Central node */}
                  <circle cx="30" cy="30" r="6" fill="currentColor" />
                  {/* Connected nodes */}
                  <circle cx="15" cy="20" r="4" fill="currentColor" />
                  <circle cx="45" cy="20" r="4" fill="currentColor" />
                  <circle cx="15" cy="40" r="4" fill="currentColor" />
                  <circle cx="45" cy="40" r="4" fill="currentColor" />
                  <circle cx="30" cy="10" r="4" fill="currentColor" />
                  <circle cx="30" cy="50" r="4" fill="currentColor" />
                  {/* Connections */}
                  <line x1="30" y1="30" x2="15" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="30" x2="45" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="30" x2="15" y2="40" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="30" x2="45" y2="40" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="30" x2="30" y2="10" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="30" x2="30" y2="50" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl mb-1">
                VIRTUAL LAB
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 font-light drop-shadow-lg">
                SIMULATOR
              </p>
            </div>
          </div>
          
          {/* Main Slogan */}
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-3">
            Learn & Experiment Like Never Before!
          </h2>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg font-medium">
            For Nepali +2 Students to Explore Science Practically!
          </p>
        </div>

        {/* Student Illustrations Section */}
        <div className="flex justify-center items-end gap-6 md:gap-12 mb-16 relative z-20 px-4">
          {/* Girl with Flask */}
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl mb-3 relative">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full flex items-center justify-center relative overflow-hidden">
                <Users className="w-14 h-14 md:w-18 md:h-18 text-blue-700" />
                {/* Flask */}
                <div className="absolute -bottom-1 right-1 bg-white rounded-lg p-2 shadow-lg border-2 border-blue-200">
                  <div className="w-8 h-10 bg-blue-500 rounded-t-lg relative">
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-blue-600 rounded-b-lg" />
                    <div className="absolute top-1 left-1 right-1 h-2 bg-blue-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
            {/* Body/Clothing */}
            <div className="text-center relative">
              <div className="w-20 h-6 bg-blue-500 rounded-t-lg mx-auto mb-0.5" />
              <div className="w-24 h-32 md:w-28 md:h-40 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg mx-auto shadow-lg" />
            </div>
          </div>

          {/* Boy with Tablet (Center, slightly behind) */}
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform -mt-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl mb-3 relative z-10">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center relative overflow-hidden">
                <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-green-700" />
                {/* Tablet */}
                <div className="absolute -bottom-2 left-2 bg-white rounded-lg p-2 shadow-xl border-2 border-gray-200">
                  <div className="w-16 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                      <Boxes className="w-4 h-4 text-white" />
                      <div className="w-2 h-2 bg-white rounded" />
                      <div className="w-2 h-2 bg-white rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Body/Clothing */}
            <div className="text-center relative">
              <div className="w-24 h-8 bg-blue-600 rounded-t-lg mx-auto mb-0.5" />
              <div className="w-28 h-36 md:w-32 md:h-44 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg mx-auto shadow-lg" />
            </div>
          </div>

          {/* Boy with Multimeter */}
          <div className="flex flex-col items-center transform hover:scale-105 transition-transform">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl mb-3 relative">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center relative overflow-hidden">
                <Users className="w-14 h-14 md:w-18 md:h-18 text-purple-700" />
                {/* Safety Goggles */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/80 rounded-full border-2 border-gray-300" />
                {/* Multimeter */}
                <div className="absolute -bottom-2 left-1 bg-white rounded-lg p-2 shadow-xl border-2 border-orange-200">
                  <div className="w-10 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded flex items-center justify-center relative">
                    <div className="w-6 h-4 bg-black rounded-sm flex items-center justify-center">
                      <div className="w-1 h-2 bg-green-400 rounded" />
                    </div>
                    {/* Wires */}
                    <div className="absolute -left-1 top-1 w-1 h-2 bg-red-600 rounded" />
                    <div className="absolute -left-1 bottom-1 w-1 h-2 bg-black rounded" />
                  </div>
                </div>
              </div>
            </div>
            {/* Body/Clothing */}
            <div className="text-center relative">
              <div className="w-20 h-6 bg-indigo-600 rounded-t-lg mx-auto mb-0.5" />
              <div className="w-24 h-32 md:w-28 md:h-40 bg-gradient-to-b from-slate-700 to-slate-900 rounded-lg mx-auto shadow-lg" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-full flex items-center justify-center mb-3 shadow-lg hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h3 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 hidden md:block">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/login')}
            size="lg"
            className="w-full md:w-auto min-w-[200px] h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          >
            Log In
          </Button>
          <Button
            onClick={() => navigate('/login')}
            size="lg"
            variant="outline"
            className="w-full md:w-auto min-w-[200px] h-12 text-base font-semibold bg-white hover:bg-gray-50 text-gray-700 border-2 shadow-lg"
          >
            Sign Up
          </Button>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/90">
          <button
            onClick={handleGuestAccess}
            className="hover:text-white transition-colors mb-2 md:mb-0 underline"
          >
            Try as Guest
          </button>
          <div className="flex items-center gap-2">
            <span>Language:</span>
            <button
              onClick={() => setLanguage(language === 'english' ? 'nepali' : 'english')}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {language === 'english' ? 'English' : 'नयनी / English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

