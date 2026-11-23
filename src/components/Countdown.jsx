import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles, Clock, PartyPopper } from 'lucide-react';

export default function Countdown({ settings }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDaysLeft: 0,
    isWeddingDay: false,
    percentComplete: 0,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date();
      // Target: May 16 Wedding Muhurtham
      const weddingDate = new Date(`${settings.weddingDate}T06:00:00`);
      const engagementDate = new Date(`${settings.engagementDate}T00:00:00`);

      const totalJourney = weddingDate - engagementDate;
      const progressJourney = now - engagementDate;
      const pct = Math.min(100, Math.max(0, Math.round((progressJourney / totalJourney) * 100)));

      const diff = weddingDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalDaysLeft: 0,
          isWeddingDay: true,
          percentComplete: 100,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalDaysLeft: days,
        isWeddingDay: false,
        percentComplete: pct,
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [settings.weddingDate, settings.engagementDate]);

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4">
      {/* Couple Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold tracking-wide uppercase shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Our Journey to Forever • மே 16 & 17</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-script text-rose-800 tracking-wide drop-shadow-sm">
          {settings.groomName} <span className="text-rose-500 text-3xl font-serif">&</span> {settings.brideName}
        </h1>

        <p className="text-sm md:text-base text-rose-900/70 mt-1 font-medium font-serif italic">
          "Two hearts, one soul, counting down to eternal togetherness"
        </p>
      </div>

      {/* Countdown Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 text-center relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"></div>

        {timeLeft.isWeddingDay ? (
          <div className="py-6 animate-pulse-subtle">
            <PartyPopper className="w-16 h-16 text-rose-600 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-rose-800 font-serif">Today is Our Wedding Day! 💍❤️</h2>
            <p className="text-rose-600 font-tamil mt-2 text-lg">இன்று நம் திருமணத் திருநாள்! இரு ஆன்மாக்கள் இணையும் நன்நாள்!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-rose-700 font-semibold mb-4 text-sm md:text-base">
              <Clock className="w-4 h-4 text-rose-500 animate-bounce" />
              <span>Marriage-க்கு இன்னும் கொஞ்ச நாட்கள் தான் இருக்கு!</span>
            </div>

            {/* Timer Grid */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 my-4">
              <TimerBox value={timeLeft.days} labelEn="Days" labelTa="நாட்கள்" />
              <TimerBox value={timeLeft.hours} labelEn="Hours" labelTa="மணி" />
              <TimerBox value={timeLeft.minutes} labelEn="Mins" labelTa="நிமிடம்" />
              <TimerBox value={timeLeft.seconds} labelEn="Secs" labelTa="நொடி" />
            </div>

            {/* Progress Bar from Engagement to Wedding */}
            <div className="mt-6 pt-4 border-t border-rose-100">
              <div className="flex justify-between items-center text-xs text-rose-700/80 mb-1.5 font-medium">
                <span>Engagement: 20 Nov</span>
                <span className="font-bold text-rose-600">{timeLeft.percentComplete}% Completed</span>
                <span>Muhurtham: 16 May</span>
              </div>
              <div className="w-full bg-rose-100/90 rounded-full h-2.5 overflow-hidden p-0.5 border border-rose-200/60 shadow-inner">
                <div
                  className="bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${timeLeft.percentComplete}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TimerBox({ value, labelEn, labelTa }) {
  return (
    <div className="bg-white/90 rounded-2xl p-2.5 md:p-3.5 border border-rose-100/80 shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105">
      <span className="text-2xl md:text-4xl font-extrabold text-rose-700 font-serif tracking-tight">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs font-semibold text-rose-500 uppercase tracking-wider mt-0.5">
        {labelEn}
      </span>
      <span className="text-[9px] md:text-[10px] text-rose-400 font-tamil font-medium">
        {labelTa}
      </span>
    </div>
  );
}
