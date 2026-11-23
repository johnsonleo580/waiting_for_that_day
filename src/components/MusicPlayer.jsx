import React, { useState, useRef } from 'react';
import { Music, VolumeX, Sparkles } from 'lucide-react';

export default function MusicPlayer({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <audio
        ref={audioRef}
        src={audioUrl || "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c765f37508.mp3?filename=romantic-ambient-111354.mp3"}
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        title={isPlaying ? "Mute Background Music" : "Play Romantic Music"}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md border transition-all ${
          isPlaying
            ? 'bg-rose-500/90 text-white border-rose-300 ring-4 ring-rose-200/50 animate-pulse-subtle'
            : 'bg-white/80 text-rose-700 border-rose-200/70 hover:bg-rose-50'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-full bg-white rounded-full animate-bounce"></span>
              <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-0.5 h-full bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <span>Romantic Tune</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span>Play BGM 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
