import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Mail, Sparkles, Send, CheckCircle2, Lock, Gift, Volume2 } from 'lucide-react';
import { markDayAsOpened, unmarkDayAsOpened, getOpenedDays } from '../utils/storage';

export default function TodaySurprise({ note, settings, currentDateStr }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const opened = getOpenedDays();
    if (opened.includes(note.currentDayNumber)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [note.currentDayNumber]);

  function handleOpenEnvelope() {
    if (isOpen) return;
    setIsOpen(true);
    markDayAsOpened(note.currentDayNumber);

    // Trigger romantic confetti hearts
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#facc15', '#ffffff'],
        shapes: ['circle'],
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  }

  function handleReseal(e) {
    if (e) e.stopPropagation();
    unmarkDayAsOpened(note.currentDayNumber);
    setIsOpen(false);
  }

  // Pre-filled WhatsApp reaction message from bride to groom
  const reactionText = encodeURIComponent(
    `Hai ${settings.groomName}! ❤️ Indha day ${note.currentDayNumber} love note paathen... Semma sweet & romantic! Love you so much da! 💍✨`
  );

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 mt-8">
      {/* Date Header Badge */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200/50">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Day {note.currentDayNumber} of Our Journey</span>
        </div>
        <span className="text-xs font-medium text-rose-800/60 font-serif">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {!isOpen ? (
        /* Sealed Envelope / Scratch Box */
        <div
          onClick={handleOpenEnvelope}
          className="glass-card-golden rounded-3xl p-8 text-center cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group border-2 border-dashed border-rose-300/80 animate-shimmer relative"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
            <Mail className="w-10 h-10 animate-bounce" />
          </div>

          <h3 className="text-2xl font-bold text-rose-900 font-serif mb-1">
            Today's Love Letter is Sealed 💌
          </h3>
          <p className="text-sm text-rose-700 font-tamil font-medium">
            இன்றைய சர்ப்ரைஸ் காதல் கடிதத்தைத் திறக்க இங்கே தொடவும்!
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-300/50 group-hover:from-rose-600 group-hover:to-rose-700">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Open Love Note</span>
            <Heart className="w-4 h-4 fill-current text-white ml-0.5" />
          </div>
        </div>
      ) : (
        /* Opened Love Letter */
        <div className="glass-card rounded-3xl p-6 md:p-8 text-left transition-all duration-500 animate-in fade-in zoom-in-95 border-rose-200/80 relative">
          {/* Custom Message Tag if overridden */}
          {note.isCustom && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Special Custom Note from {settings.groomName} ❤️</span>
            </div>
          )}

          {/* Title */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div>
              <h2 className="text-2xl font-serif font-bold text-rose-900">
                {note.titleEn}
              </h2>
              <span className="text-xs font-medium text-rose-500 font-tamil">
                {note.titleTa}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReseal}
                className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200 transition-colors shadow-xs"
                title="Lissa-க்காக மீண்டும் என்வலப்பை மூடி வைக்க இங்கே கிளிக் செய்யவும்"
              >
                <Lock className="w-3 h-3 text-rose-500" />
                <span>Re-seal (மீண்டும் மூடு)</span>
              </button>
              <div className="px-3 py-1 rounded-full bg-rose-50 text-[11px] font-semibold text-rose-600 border border-rose-100">
                {note.mood || 'Pure Love 💖'}
              </div>
            </div>
          </div>

          {/* English Love Note */}
          <div className="my-5 p-4 rounded-2xl bg-white/60 border border-rose-100/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider mb-1.5">
              <Heart className="w-3 h-3 fill-rose-500" />
              <span>In English</span>
            </div>
            <p className="text-slate-800 font-serif italic text-base md:text-lg leading-relaxed">
              "{note.noteEn}"
            </p>
          </div>

          {/* Tamil Love Note */}
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-rose-50/80 to-pink-50/50 border border-rose-100/90 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1.5 font-tamil">
              <span>💖 தமிழ் காதல் வரிகள்</span>
            </div>
            <p className="text-slate-900 font-tamil text-sm md:text-base leading-loose font-medium">
              "{note.noteTa}"
            </p>
          </div>

          {/* Action / Conversation Prompt */}
          {note.prompt && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span><strong>Today's Cute Whisper:</strong> {note.prompt}</span>
            </div>
          )}

          {/* Send Reaction back to Groom */}
          <div className="mt-6 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-rose-600/80 font-medium">
              Made with boundless love for you 💍
            </span>

            <a
              href={`https://wa.me/?text=${reactionText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
