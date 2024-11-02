import React, { useMemo } from 'react';
import { Music, Youtube, Radio } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface SidebarProps {
  isOpen: boolean;
  currentPlatform: string;
  setCurrentPlatform: (platform: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPlatform, setCurrentPlatform }) => {
  const platforms: Platform[] = useMemo(() => [
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: Music, 
      color: 'green',
      description: 'Stream millions of songs'
    },
    { 
      id: 'youtube', 
      name: 'YouTube Music', 
      icon: Youtube, 
      color: 'red',
      description: 'Music videos and more'
    },
    { 
      id: 'soundcloud', 
      name: 'SoundCloud', 
      icon: Radio, 
      color: 'orange',
      description: 'Discover independent artists'
    }
  ], []);

  return (
    <aside 
      className={`fixed lg:relative z-40 h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      aria-hidden={!isOpen}
    >
      <div className="h-full w-64 bg-gray-800 p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Music size={32} className="text-purple-500" />
          <h1 className="text-xl font-bold">Music Hub</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = currentPlatform === platform.id;
            
            return (
              <button
                key={platform.id}
                onClick={() => setCurrentPlatform(platform.id)}
                className={`w-full flex flex-col gap-1 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-gray-700 text-white ring-2 ring-purple-500 ring-opacity-50' 
                    : 'hover:bg-gray-700/50 text-gray-300'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={`text-${platform.color}-500`} />
                  <span className="font-medium">{platform.name}</span>
                </div>
                <p className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                  {platform.description}
                </p>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 text-center">
              All your music platforms in one place
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;