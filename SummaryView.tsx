import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, XCircle, RotateCcw, Volume2, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from './questions';
import { speakSpanish, playGrandVictory } from './sound';

interface SummaryViewProps {
  questions: Question[];
  answersHistory: Record<number, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
  totalPrize: number;
  onRestart: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  questions,
  answersHistory,
  totalPrize,
  onRestart,
}) => {
  const [filter, setFilter] = useState<'all' | 'mistakes'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const totalAnswered = Object.keys(answersHistory).length;
  const correctCount = Object.values(answersHistory).filter(h => h.isCorrect).length;
  const wrongCount = totalAnswered - correctCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  useEffect(() => {
    // Fire celebration confetti
    try {
      playGrandVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }, []);

  const displayedQuestions = questions.filter((_, idx) => {
    if (filter === 'mistakes') {
      const h = answersHistory[idx];
      return h && !h.isCorrect;
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Victory Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border-2 border-amber-500/50 p-6 sm:p-10 text-center shadow-2xl shadow-amber-500/10">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 rounded-2xl shadow-xl shadow-amber-500/30 animate-bounce">
            <Trophy className="w-12 h-12" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-serif tracking-wider uppercase mb-2">
          Շնորհավորում ենք! Խաղն ավարտվեց!
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6">
          Դուք անցաք իսպաներեն ֆուտբոլային 30 բայերի (Presente de Indicativo) բոլոր հարցերը՝ մտածելով իսկական ֆուտբոլիստի պես։
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">Ընդհանուր շահում</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              {totalPrize.toLocaleString('hy-AM')} ֏
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">Ճիշտ պատասխան</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              {correctCount} / {questions.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">Սխալ պատասխան</div>
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">
              {wrongCount}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">Ճշգրտություն</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 text-sm uppercase tracking-wider transition-all transform active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Կրկին խաղալ (Jugar de nuevo)</span>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100 font-serif">
              Հարցերի և պատասխանների վերլուծություն
            </h2>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Բոլոր 30 հարցերը ({questions.length})
            </button>
            <button
              onClick={() => setFilter('mistakes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === 'mistakes'
                  ? 'bg-rose-500 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Սխալները ({wrongCount})
            </button>
          </div>
        </div>

        {displayedQuestions.length === 0 ? (
          <div className="p-8 text-center text-slate-400 bg-slate-900/50 rounded-2xl border border-slate-800">
            {filter === 'mistakes'
              ? '🎉 Հրաշալի է! Դուք չունեք ոչ մի սխալ պատասխան!'
              : 'Հարցեր չկան։'}
          </div>
        ) : (
          <div className="space-y-3">
            {displayedQuestions.map((q) => {
              const originalIdx = q.id - 1;
              const history = answersHistory[originalIdx];
              const isCorrect = history?.isCorrect ?? false;
              const userPickKey = history?.selected;
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isCorrect
                      ? 'bg-slate-900/70 border-emerald-500/30'
                      : 'bg-slate-900/70 border-rose-500/40'
                  }`}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-800/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            #{q.id}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {q.partTitleHy}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-slate-100">
                          🇪🇸 {q.questionEs}
                        </div>
                        <div className="text-xs text-slate-400">
                          🇦🇲 {q.questionHy}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(q.questionEs);
                        }}
                        className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Լսել իսպաներեն արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="px-4 pb-5 pt-1 sm:px-6 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((opt) => {
                          const isOptionCorrect = opt.key === q.correct;
                          const isOptionPicked = opt.key === userPickKey;

                          let badgeStyle = 'bg-slate-900 border-slate-800 text-slate-300';
                          if (isOptionCorrect) {
                            badgeStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isOptionPicked && !isCorrect) {
                            badgeStyle = 'bg-rose-950/70 border-rose-500 text-rose-300 line-through';
                          }

                          return (
                            <div
                              key={opt.key}
                              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${badgeStyle}`}
                            >
                              <div>
                                <span className="font-bold mr-2 text-amber-400">{opt.key})</span>
                                <span>{opt.textEs}</span>
                                <span className="block text-[11px] text-slate-400 font-normal">
                                  {opt.textHy}
                                </span>
                              </div>
                              {isOptionCorrect && (
                                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                                  Ճիշտ
                                </span>
                              )}
                              {isOptionPicked && !isCorrect && (
                                <span className="text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">
                                  Ձեր ընտրությունը
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <div className="text-amber-400 font-semibold text-xs flex items-center gap-1.5">
                          <span>💡 Բացատրություն՝</span>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {q.explanationHy}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
