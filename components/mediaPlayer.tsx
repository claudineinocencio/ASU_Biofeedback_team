import React, { useEffect, useRef, useState } from 'react';
import { subscribeHEGPlayback, unsubscribeHEGPlayback } from '../scripts/connect';
import '../scripts/media/videocontrols.css';
import { SoundCloudPlayer } from './players/soundcloud';

const MediaPlayer = ({ id }: { id: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [volume, setVolume] = useState(100);
  const [collapsed, setCollapsed] = useState(false); // State for collapse
  let stateSub: number;

  // Handle HEG volume control
  useEffect(() => {
    stateSub = subscribeHEGPlayback((data) => {
      console.log('HEG Data:', data);
      let newVolume = volume + data.hegEffort[0];
      newVolume = Math.max(0, Math.min(100, newVolume));
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume / 100;
      }
    });

    return () => {
      unsubscribeHEGPlayback(stateSub);
    };
  }, [volume]);

  // Toggle collapsed state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`media-player ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse Button */}
      <button className="collapse-btn" onClick={toggleCollapse}>
        {collapsed ? '⏵Expand' : '⏷Minimize'}
      </button>

      {/* Content inside the collapsible container */}
      <div className={`content ${collapsed ? 'hidden' : ''}`}>
        {/* SoundCloud Player */}
        <h2>Connect to SoundCloud</h2>
        <SoundCloudPlayer autoPlay={true} color="blue" />

        
      </div>
    </div>
  );
};

export default MediaPlayer;
