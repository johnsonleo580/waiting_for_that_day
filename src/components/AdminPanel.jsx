import React, { useState } from 'react';
import { ShieldCheck, Settings, Edit3, Send, Check, X, Sparkles, KeyRound, Copy } from 'lucide-react';
import { saveSettings, saveCustomOverride, deleteCustomOverride, resetOpenedDays } from '../utils/storage';

export default function AdminPanel({ settings, onUpdateSettings, customOverrides, onUpdateOverrides, currentDayNumber }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ ...settings });
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
  const [customNote, setCustomNote] = useState({
    titleEn: 'My Special Message to You',
    titleTa: 'உனக்கான என் பிரத்யேக வரிகள்',
    noteEn: '',
    noteTa: '',
    mood: 'Special Surprise 🌟',
    prompt: '',
    isCustom: true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (pinInput === (settings.adminPin || '1617')) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  }

  function handleSaveSettings(e) {
    e.preventDefault();
    saveSettings(formData);
    onUpdateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  function handleSaveCustomOverride(e) {
    e.preventDefault();
    if (!customNote.noteEn && !customNote.noteTa) {
      alert('Please enter at least one message in English or Tamil!');
      return;
    }

    const payload = {
      ...customNote,
      day: currentDayNumber,
      currentDayNumber: currentDayNumber,
      isCustom: true,
    };

    saveCustomOverride(customDate, payload);
    onUpdateOverrides();
    alert(`Success! Custom message set for ${customDate}!`);
  }

  function handleDeleteOverride(dateStr) {
    deleteCustomOverride(dateStr);
    onUpdateOverrides();
  }

  // Pre-formatted daily morning message for WhatsApp / Telegram broadcast
  const todayMessagePreview = `Good morning my pondati! ❤️👰\n\n💍 Wedding Countdown: Innum ${Math.max(0, Math.ceil((new Date(`${settings.weddingDate}T06:00:00`) - new Date()) / (1000 * 60 * 60 * 24)))} days thaan irukku namma marriage-ku!\n\n💌 Today's special surprise love note unakkaga wait pannudhu:\n👉 ${window.location.origin}\n\nLove you forever! 💖`;

  function copyMorningMessage() {
    navigator.clipboard.writeText(todayMessagePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      {/* Secret Trigger button in footer */}
      <div className="text-center py-6 relative z-10">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 text-[11px] text-rose-900/40 hover:text-rose-700 transition-colors font-medium cursor-pointer"
        >
          <Settings className="w-3 h-3" />
          <span>Groom Settings & Custom Messages (Secret)</span>
        </button>
      </div>

      {/* Admin Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-rose-100 mb-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-600" />
                <h3 className="text-xl font-bold font-serif text-rose-950">
                  Groom Control Room 🎩💍
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {!isAuthenticated ? (
              /* PIN Prompt */
              <form onSubmit={handleLogin} className="py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-100 mx-auto flex items-center justify-center text-rose-600 mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1">Enter Secret Groom PIN</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Default PIN is <strong className="text-rose-600">1617</strong> (Wedding Date)
                </p>

                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN"
                  className="w-36 text-center text-2xl font-bold tracking-widest px-3 py-2 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 mx-auto block mb-3"
                  autoFocus
                />

                {pinError && (
                  <p className="text-xs text-rose-600 font-semibold mb-3">
                    Incorrect PIN! Try 1617.
                  </p>
                )}

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-colors"
                >
                  Unlock Control Room
                </button>
              </form>
            ) : (
              /* Authenticated Controls */
              <div className="space-y-6">
                {savedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Settings updated successfully!</span>
                  </div>
                )}

                {/* Section 1: Quick WhatsApp / Telegram Message Copy */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-rose-600" />
                      <span>Today's Daily Morning Ping (Copy & Send)</span>
                    </span>
                    <button
                      onClick={copyMorningMessage}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied! ✅' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-700 bg-white/80 p-2.5 rounded-xl border border-rose-100 font-sans whitespace-pre-wrap">
                    {todayMessagePreview}
                  </pre>
                </div>

                {/* Section 2: Write Custom Message for Today or Any Date */}
                <form onSubmit={handleSaveCustomOverride} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 mb-3">
                    <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Set Custom Love Note for Today / Special Date</span>
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Select Target Date:
                      </label>
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        English Message:
                      </label>
                      <textarea
                        rows={2}
                        value={customNote.noteEn}
                        onChange={(e) => setCustomNote({ ...customNote, noteEn: e.target.value })}
                        placeholder="e.g. Happy 6 months anniversary my pondati! You look like an angel in that saree..."
                        className="w-full text-xs p-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1 font-tamil">
                        தமிழ் காதல் வரிகள் (Tamil Note):
                      </label>
                      <textarea
                        rows={2}
                        value={customNote.noteTa}
                        onChange={(e) => setCustomNote({ ...customNote, noteTa: e.target.value })}
                        placeholder="எ.கா: பிறந்தநாள் வாழ்த்துகள் என் உயிரே... உன்னோடு வாழும் ஒவ்வொரு நொடியும் வரம்!"
                        className="w-full text-xs p-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white font-tamil"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Save Custom Note for {customDate}</span>
                    </button>
                  </div>
                </form>

                {/* Section 3: Couple Names & Dates Settings */}
                <form onSubmit={handleSaveSettings} className="space-y-3 border-t border-rose-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Couple Names & Dates
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                        Groom Name
                      </label>
                      <input
                        type="text"
                        value={formData.groomName}
                        onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                        Bride Name
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                        Engagement Date
                      </label>
                      <input
                        type="date"
                        value={formData.engagementDate}
                        onChange={(e) => setFormData({ ...formData, engagementDate: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-0.5">
                        Wedding Muhurtham Date
                      </label>
                      <input
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow transition-colors"
                  >
                    Save Couple Info
                  </button>
                </form>

                {/* Reset Opened Envelopes for Lissa */}
                <div className="pt-4 border-t border-rose-100 flex items-center justify-between bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                  <div>
                    <h5 className="text-xs font-bold text-rose-900">Reset / Re-seal All Envelopes</h5>
                    <p className="text-[11px] text-slate-500">Testing mudichitu Lissa-kaga marubadiyum moodi vaikka idhai click pannunga!</p>
                  </div>
                  <button
                    onClick={() => {
                      resetOpenedDays();
                      alert('Success! All envelopes re-sealed! Page will now reload.');
                      window.location.reload();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap ml-2"
                  >
                    Re-seal All 🔒
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
