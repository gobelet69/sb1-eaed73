import React, { useState, useEffect, useCallback } from 'react';
import { Music, Youtube, Radio, Menu, X } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import Sidebar from './components/Sidebar';

function App() {
  const [currentPlatform, setCurrentPlatform] = useState(() => {
    try {
      return localStorage.getItem('lastPlatform') || 'spotify';
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return 'spotify';
    }
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handlePlatformChange = useCallback((platform: string) => {
    try {
      setCurrentPlatform(platform);
      localStorage.setItem('lastPlatform', platform);
    } catch (error) {
      console.error('Error saving platform preference:', error);
    }
  }, []);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex h-screen">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          currentPlatform={currentPlatform}
          setCurrentPlatform={handlePlatformChange}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <MusicPlayer platform={currentPlatform} />
        </div>
      </div>
    </div>
  );
}

export default App;