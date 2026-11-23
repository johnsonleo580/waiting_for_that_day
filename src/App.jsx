import React, { useState, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';
import TodaySurprise from './components/TodaySurprise';
import MemoriesVault from './components/MemoriesVault';
import AdminPanel from './components/AdminPanel';
import { getSettings, getCustomOverrides } from './utils/storage';
import { getNoteForDate } from './data/messages';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState(getSettings());
  const [customOverrides, setCustomOverrides] = useState(getCustomOverrides());
  const [todayStr, setTodayStr] = useState(new Date().toISOString().split('T')[0]);

  // Load today's active note
  const todayNote = getNoteForDate(todayStr, customOverrides);

  function reloadOverrides() {
    setCustomOverrides(getCustomOverrides());
  }

  function handleUpdateSettings(newSettings) {
    setSettings(newSettings);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/70 to-amber-50/60 text-slate-800 relative selection:bg-rose-200">
      {/* Gentle Floating Hearts Background */}
      <FloatingHearts />

      {/* Romantic Audio Player */}
      <MusicPlayer audioUrl={settings.bgMusicUrl} />

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center min-h-screen justify-between relative z-10">
        <div className="w-full flex flex-col items-center">
          {/* Live Wedding Countdown */}
          <Countdown settings={settings} />

          {/* Today's Romantic Surprise Box / Envelope */}
          <TodaySurprise
            note={todayNote}
            settings={settings}
            currentDateStr={todayStr}
          />

          {/* Past Unlocked Letters Vault */}
          <MemoriesVault
            currentDayNumber={todayNote.currentDayNumber}
            customOverrides={customOverrides}
          />
        </div>

        {/* Footer & Secret Admin Control */}
        <footer className="w-full max-w-xl text-center mt-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 font-medium">
            <span>Forever & Always</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>May 16 & 17, 2027</span>
          </div>

          {/* Groom Control Access */}
          <AdminPanel
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            customOverrides={customOverrides}
            onUpdateOverrides={reloadOverrides}
            currentDayNumber={todayNote.currentDayNumber}
          />
        </footer>
      </main>
    </div>
  );
}
