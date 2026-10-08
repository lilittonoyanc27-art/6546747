import React, { useState } from 'react';
import { Users, Lightbulb, Split, X, CheckCircle2 } from 'lucide-react';
import { Question } from './questions';
import { playLifeline } from './sound';

interface LifelinesProps {
  currentQuestion: Question;
  used5050: boolean;
  usedAudience: boolean;
  usedHint: boolean;
  onUse5050: () => void;
  onUseAudience: () => void;
  onUseHint: () => void;
  disabled: boolean;
}

interface PollResult {
  A: number;
  B: number;
  C: number;
  D: number;
}

export const LifelinesBar: React.FC<LifelinesProps> = ({
  currentQuestion,
  used5050,
  usedAudience,
  usedHint,
  onUse5050,
  onUseAudience,
  onUseHint,
  disabled,
}) => {
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [pollData, setPollData] = useState<PollResult | null>(null);

  const handle5050 = () => {
    if (used5050 || disabled) return;
    playLifeline();
    onUse5050();
  };

  const handleAudience = () => {
    if (usedAudience || disabled) return;
    playLifeline();

    // Generate realistic poll distribution favoring the correct answer (65% - 85%)
    const correctKey = currentQuestion.correct;
    const correctScore = Math.floor(Math.random() * 21) + 65; // 65% - 85%
    const remainder = 100 - correctScore;
    const p1 = Math.floor(Math.random() * (remainder - 5)) + 1;
    const p2 = Math.floor(Math.random() * (remainder - p1 - 2)) + 1;
    const p3 = Math.max(0, remainder - p1 - p2);

    const otherKeys = (['A', 'B', 'C', 'D'] as const).filter(k => k !== correctKey);
    const result: PollResult = { A: 0, B: 0, C: 0, D: 0 };
    result[correctKey] = correctScore;
    result[otherKeys[0]] = p1;
    result[otherKeys[1]] = p2;
    result[otherKeys[2]] = p3;

    setPollData(result);
    setShowAudienceModal(true);
    onUseAudience();
  };

  const handleHint = () => {
    if (usedHint || disabled) return;
    playLifeline();
    setShowHintModal(true);
    onUseHint();
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {/* 50:50 Button */}
        <button
          onClick={handle5050}
          disabled={used5050 || disabled}
          className={`relative group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
            used5050
              ? 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed line-through'
              : disabled
              ? 'bg-slate-900/80 border-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-amber-500/20 to-amber-950/40 border-amber-500/50 text-amber-300 hover:border-amber-400 hover:scale-105 shadow-md shadow-amber-500/10'
          }`}
          title="50:50 — Հեռացնել երկու սխալ տարբերակ"
        >
          <Split className="w-4 h-4 text-amber-400" />
          <span>50:50</span>
          {used5050 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500/80 ring-2 ring-slate-950" />
          )}
        </button>

        {/* Audience Poll Button */}
        <button
          onClick={handleAudience}
          disabled={usedAudience || disabled}
          className={`relative group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
            usedAudience
              ? 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed'
              : disabled
              ? 'bg-slate-900/80 border-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-cyan-500/20 to-cyan-950/40 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:scale-105 shadow-md shadow-cyan-500/10'
          }`}
          title="👥 Հանդիսատեսի քվեարկություն (Audience Poll)"
        >
          <Users className="w-4 h-4 text-cyan-400" />
          <span>Հանդիսատես</span>
          {usedAudience && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500/80 ring-2 ring-slate-950" />
          )}
        </button>

        {/* Hint Button */}
        <button
          onClick={handleHint}
          disabled={usedHint || disabled}
          className={`relative group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
            usedHint
              ? 'bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed'
              : disabled
              ? 'bg-slate-900/80 border-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-b from-emerald-500/20 to-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:scale-105 shadow-md shadow-emerald-500/10'
          }`}
          title="💡 Ուսուցչի հուշում (Pista)"
        >
          <Lightbulb className="w-4 h-4 text-emerald-400" />
          <span>Հուշում</span>
          {usedHint && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500/80 ring-2 ring-slate-950" />
          )}
        </button>
      </div>

      {/* Audience Poll Modal */}
      {showAudienceModal && pollData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-cyan-500/60 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-cyan-300 font-serif">
                  Հանդիսատեսի քվեարկության արդյունքը
                </h3>
              </div>
              <button
                onClick={() => setShowAudienceModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Դահլիճի հանդիսատեսները քվեարկել են հետևյալ կերպ՝
            </p>

            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const opt = currentQuestion.options.find(o => o.key === key);
                const score = pollData[key];
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">
                        {key}: {opt?.textEs}
                      </span>
                      <span className="text-cyan-300 font-mono">{score}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowAudienceModal(false)}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Ընդունել արդյունքը և շարունակել
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher's Hint Modal */}
      {showHintModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-emerald-500/60 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-emerald-300 font-serif">
                  Ուսուցչի հուշում (Pista del profesor)
                </h3>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-100 mb-1">
                  💡 Քերականական ակնարկ՝
                </p>
                <p className="text-xs sm:text-sm text-emerald-200/90">
                  {currentQuestion.hintHy}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Պարզ է, շնորհակալություն
            </button>
          </div>
        </div>
      )}
    </>
  );
};
