import React from 'react';
import { Trophy, Check, AlertCircle, Award } from 'lucide-react';
import { Question } from './questions';

interface LadderProps {
  questions: Question[];
  currentIndex: number;
  answersHistory: Record<number, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
  earnedPrize: number;
}

export const Ladder: React.FC<LadderProps> = ({
  questions,
  currentIndex,
  answersHistory,
  isOpenOnMobile,
  onCloseMobile,
  earnedPrize,
}) => {
  // Classic Millionaire lists questions from top (#30) down to bottom (#1)
  const reversedQuestions = [...questions].reverse();

  const formatMoney = (val: number) => {
    return val.toLocaleString('hy-AM') + ' ֏';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenOnMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Ladder Container */}
      <aside
        className={`fixed lg:static top-0 right-0 z-40 h-full lg:h-auto w-72 sm:w-80 bg-slate-950 lg:bg-slate-950/70 border-l border-amber-500/30 lg:border lg:rounded-2xl flex flex-col overflow-hidden transition-transform duration-300 lg:translate-x-0 ${
          isOpenOnMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-amber-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-amber-300 font-serif">
              Մրցանակային սանդուղք (30 Հարց)
            </h3>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
          >
            Փակել
          </button>
        </div>

        {/* Current prize badge */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Ընթացիկ շահում՝</span>
          <span className="font-mono font-bold text-amber-400 text-sm">
            {formatMoney(earnedPrize)}
          </span>
        </div>

        {/* Scrollable list of 30 tiers */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
          {reversedQuestions.map((q) => {
            const originalIdx = q.id - 1;
            const isCurrent = originalIdx === currentIndex;
            const history = answersHistory[originalIdx];
            const isAnswered = history !== undefined;
            const isCorrect = isAnswered && history.isCorrect;
            const isWrong = isAnswered && !history.isCorrect;
            const isMilestone = q.isMilestone || q.id === 30 || q.id === 20 || q.id === 10 || q.id === 5;

            let rowBg = 'text-slate-400 hover:bg-slate-900/50';
            if (isCurrent) {
              rowBg = 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 scale-[1.02] ring-2 ring-amber-300';
            } else if (isCorrect) {
              rowBg = 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300';
            } else if (isWrong) {
              rowBg = 'bg-rose-950/30 border border-rose-500/30 text-rose-300';
            } else if (isMilestone) {
              rowBg = 'text-amber-300 font-semibold bg-amber-500/5';
            }

            return (
              <div
                key={q.id}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-all ${rowBg}`}
              >
                <div className="flex items-center gap-2">
                  {/* Status Indicator */}
                  {isCorrect && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                  {isWrong && (
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0" title="Սխալ, բայց խաղը շարունակվում է">
                      <AlertCircle className="w-3 h-3" />
                    </span>
                  )}
                  {!isAnswered && isMilestone && (
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  {!isAnswered && !isMilestone && (
                    <span className="w-3.5 text-slate-600 font-mono text-[10px]">
                      {isCurrent ? '▶' : '·'}
                    </span>
                  )}

                  <span className={`font-mono text-xs ${isCurrent ? 'text-slate-950 font-black' : isMilestone ? 'text-amber-400 font-bold' : ''}`}>
                    {q.id.toString().padStart(2, '0')}.
                  </span>
                  <span className={`truncate max-w-[110px] text-[11px] ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {q.verb ? `${q.verb}` : `Ronda ${q.part}`}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isCurrent
                        ? 'text-slate-950 font-black'
                        : isMilestone
                        ? 'text-amber-300 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {formatMoney(q.prizeValue)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 text-center">
          💡 Սխալվելու դեպքում խաղը չի ավարտվում. շարունակում եք առաջ գնալ!
        </div>
      </aside>
    </>
  );
};
