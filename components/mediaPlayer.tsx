import React, { useEffect, useRef, useState } from 'react';
import { subscribeHEGPlayback, unsubscribeHEGPlayback } from '../scripts/connect';
import '../scripts/media/videocontrols.css'


const MediaPlayer = ({ id }: { id: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [volume, setVolume] = useState(100);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  let stateSub: number;

  useEffect(() => {

    //needs testing
    stateSub = subscribeHEGPlayback((data) => {
        console.log("HEG Data:", data);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      videoRef.current.play();
    }
  };

  const handleStreamStart = async () => {
    if (selectedDevice) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDevice },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  return (
    <div className="video-container">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*,image/*" />
      
      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        {/* Devices would be dynamically populated */}
      </select>
      
      <button onClick={handleStreamStart}>Start Stream</button>
      
      <video ref={videoRef} controls className="video-player"></video>
      
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default MediaPlayer;