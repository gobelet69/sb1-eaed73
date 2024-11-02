import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Loader } from 'lucide-react';

interface MusicPlayerProps {
  platform: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ platform }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Memoize the URL to prevent unnecessary re-renders
  const getEmbedUrl = useCallback(() => {
    try {
      switch (platform) {
        case 'spotify':
          return 'https://open.spotify.com/embed/home';
        case 'youtube':
          return 'https://www.youtube-nocookie.com/embed/?listType=home';
        case 'soundcloud':
          return 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/discover&auto_play=false&show_artwork=true&visual=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }
    } catch (error) {
      console.error('Error getting embed URL:', error);
      setErrorMessage('Invalid platform selected');
      return '';
    }
  }, [platform]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    // Persist platform selection
    try {
      localStorage.setItem('lastPlatform', platform);
    } catch (error) {
      console.error('Error saving platform preference:', error);
    }
  }, [platform]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setErrorMessage('');
  }, []);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(`Unable to connect to ${platform}. Please check your internet connection or try again later.`);
    console.error('Iframe loading error:', event);
  }, [platform]);

  return (
    <div className="relative h-full w-full bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-4">
            <Loader className="h-8 w-8 animate-spin text-purple-500" />
            <p className="text-gray-400">Loading {platform}...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold">Connection Error</h3>
            <p className="text-gray-400 max-w-md">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <iframe
        key={platform} // Force iframe refresh on platform change
        src={getEmbedUrl()}
        className={`w-full h-full border-0 ${isLoading || hasError ? 'invisible' : 'visible'}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`${platform} player`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default MusicPlayer;