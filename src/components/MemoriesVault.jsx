import React, { useState } from 'react';
import { BookHeart, Lock, Unlock, ChevronDown, ChevronUp, Sparkles, Heart } from 'lucide-react';
import { dailyLoveNotes } from '../data/messages';

export default function MemoriesVault({ currentDayNumber, customOverrides }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Show only past and today's notes as unlocked, future as locked
  const maxDay = Math.max(1, currentDayNumber || 1);

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 mt-8 mb-12">
      <div className="glass-card rounded-3xl p-6 border-rose-200/60">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
              <BookHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-900 font-serif">
                Our Love Vault 📖
              </h3>
              <p className="text-xs text-rose-700/70 font-medium">
                {maxDay} days of letters unlocked so far
              </p>
            </div>
          </div>

          <button className="p-2 rounded-full hover:bg-rose-100/50 text-rose-600 transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-5 pt-4 border-t border-rose-100">
            <p className="text-xs text-rose-600/80 mb-4 font-tamil">
              கடந்த நாட்களில் உனக்கு அனுப்பப்பட்ட காதல் மடல்கள் இங்கே சேமிக்கப்பட்டுள்ளன:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {dailyLoveNotes.slice(0, Math.min(dailyLoveNotes.length, maxDay + 6)).map((item) => {
                const isUnlocked = item.day <= maxDay;
                return (
                  <button
                    key={item.day}
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && setSelectedNote(item)}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                      isUnlocked
                        ? 'bg-white/80 hover:bg-rose-50/80 border-rose-100 hover:border-rose-300 text-rose-900 shadow-sm cursor-pointer'
                        : 'bg-slate-100/60 border-slate-200/50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-rose-600">Day {item.day}</span>
                      {isUnlocked ? (
                        <Unlock className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>
                    <span className="truncate font-medium text-[11px]">
                      {isUnlocked ? item.titleEn : 'Unlocks soon'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal for viewing a past love note */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-rose-100 mb-4">
              <div>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wide">
                  Day {selectedNote.day} Memory
                </span>
                <h4 className="text-xl font-bold font-serif text-rose-950">
                  {selectedNote.titleEn}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 text-sm font-serif italic text-rose-900">
              "{selectedNote.noteEn}"
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 text-sm font-tamil text-slate-800 leading-relaxed">
              "{selectedNote.noteTa}"
            </div>

            <button
              onClick={() => setSelectedNote(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
