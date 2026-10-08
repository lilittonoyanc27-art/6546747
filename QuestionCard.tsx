import React, { useState } from 'react';
import { Volume2, Languages, HelpCircle, ArrowRight, CheckCircle2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Question } from './questions';
import { speakSpanish } from './sound';

interface QuestionCardProps {
  question: Question;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  onSelectOption: (key: 'A' | 'B' | 'C' | 'D') => void;
  isLocked: boolean;
  onNextQuestion: () => void;
  eliminatedOptions: ('A' | 'B' | 'C' | 'D')[];
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  isLocked,
  onNextQuestion,
  eliminatedOptions,
  isLastQuestion,
}) => {
  // State for toggling translation when clicking on Spanish text
  const [showQuestionTranslation, setShowQuestionTranslation] = useState<boolean>(false);
  const [showOptionTranslations, setShowOptionTranslations] = useState<boolean>(false);

  // If answer is locked, auto-reveal translations for educational feedback
  const isQuestionAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correct;
  const isWrong = isQuestionAnswered && !isCorrect;

  const handleSpanishTextClick = () => {
    setShowQuestionTranslation(prev => !prev);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-5 animate-in fade-in duration-200">
      {/* Category / Part Header */}
      <div className="flex items-center justify-between w-full px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
            Հարց {question.id} / 30
          </span>
          <span className="text-slate-400 hidden sm:inline">
            {question.partTitleHy}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Translation Toggle for Option Choices */}
          <button
            onClick={() => setShowOptionTranslations(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-xs transition-colors"
            title="Բոլոր տարբերակների հայերեն թարգմանությունը"
          >
            {showOptionTranslations ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">Տարբերակների թարգմ.</span>
          </button>

          <span className="font-mono font-extrabold text-amber-400 text-sm bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
            {question.prizeValue.toLocaleString('hy-AM')} ֏
          </span>
        </div>
      </div>

      {/* Main Question Display Box (Classic Diamond / Lozenge Millionaire Frame) */}
      <div className="relative w-full group">
        {/* Glowing border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/40 via-cyan-500/20 to-amber-500/40 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300" />

        <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-7 shadow-2xl text-center space-y-3">
          {/* Action buttons inside question card */}
          <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-amber-400/80 uppercase tracking-wider">
                {question.partTitleEs}
              </span>
              {question.verb && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold">
                  ⚽ {question.verb}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => speakSpanish(question.questionEs)}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-400 transition-colors"
                title="Լսել իսպաներեն արտասանությունը (Audio)"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleSpanishTextClick}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Սեղմեք թարգմանությունը բացելու համար"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">
                  {showQuestionTranslation ? 'Թաքցնել' : 'Թարգմանել'}
                </span>
              </button>
            </div>
          </div>

          {/* Clickable Spanish Question text */}
          <div
            onClick={handleSpanishTextClick}
            className="cursor-pointer select-none py-1 group/text transition-transform active:scale-[0.99]"
            title="Սեղմեք իսպաներեն տեքստի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
          >
            <p className="text-lg sm:text-2xl font-bold text-white tracking-wide leading-snug group-hover/text:text-amber-200 transition-colors">
              🇪🇸 {question.questionEs}
            </p>
            <p className="text-[11px] text-amber-400/60 mt-1 flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3 inline" />
              <span>(Սեղմեք տեքստի վրա՝ հայերեն թարգմանությունը բացելու համար)</span>
            </p>
          </div>

          {/* Armenian Translation Reveal (Opens on click or when answered) */}
          {(showQuestionTranslation || isQuestionAnswered) && (
            <div className="pt-2 border-t border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-medium">
                <span>🇦🇲 {question.questionHy}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answer Options Grid (A, B, C, D) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        {question.options.map((option) => {
          const isEliminated = eliminatedOptions.includes(option.key);
          const isSelected = selectedOption === option.key;
          const isCorrectOption = option.key === question.correct;

          // Compute option button styling based on state
          let containerStyle = 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/30 text-slate-100 hover:border-amber-400 hover:from-slate-800 hover:to-slate-900';
          let letterStyle = 'text-amber-400 group-hover:text-amber-300';

          if (isEliminated) {
            containerStyle = 'opacity-25 bg-slate-950 border-slate-900 text-slate-600 pointer-events-none';
            letterStyle = 'text-slate-600';
          } else if (isQuestionAnswered) {
            if (isCorrectOption) {
              // Highlight the correct answer in vibrant green
              containerStyle = 'bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/30 scale-[1.01]';
              letterStyle = 'text-emerald-300 font-extrabold';
            } else if (isSelected && !isCorrect) {
              // Selected wrong answer marked in red
              containerStyle = 'bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950 border-rose-500 text-rose-100 ring-2 ring-rose-500 shadow-lg shadow-rose-500/30';
              letterStyle = 'text-rose-300 font-extrabold';
            } else {
              containerStyle = 'opacity-40 bg-slate-950 border-slate-800 text-slate-500';
              letterStyle = 'text-slate-500';
            }
          }

          return (
            <button
              key={option.key}
              disabled={isLocked || isEliminated}
              onClick={() => onSelectOption(option.key)}
              className={`group relative flex items-start text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${containerStyle}`}
            >
              <div className="flex items-center gap-3 w-full">
                <span className={`font-mono text-base sm:text-lg font-black shrink-0 ${letterStyle}`}>
                  {option.key}:
                </span>

                <div className="flex-1 min-w-0">
                  <span className="block text-sm sm:text-base font-bold text-slate-100 group-hover:text-amber-200">
                    {option.textEs}
                  </span>

                  {/* Armenian translation for option */}
                  {(showOptionTranslations || isQuestionAnswered) && (
                    <span className="block text-xs text-slate-400 font-normal mt-0.5 truncate">
                      {option.textHy}
                    </span>
                  )}
                </div>

                {/* Pronounce single word/choice button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(option.textEs);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition-opacity shrink-0"
                  title="Արտասանել"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Educational Resolution Banner */}
      {isQuestionAnswered && (
        <div className="w-full space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Status Message */}
          {isCorrect ? (
            <div className="p-4 rounded-xl bg-emerald-950/60 border-2 border-emerald-500/60 text-emerald-200 flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-300 text-sm sm:text-base">
                    ✅ Ճիշտ պատասխան! (¡Respuesta Correcta!)
                  </div>
                  <div className="text-xs text-emerald-200/90 mt-0.5">
                    Դուք վաստակեցիք {question.prizeValue.toLocaleString('hy-AM')} ֏:
                  </div>
                </div>
              </div>

              <button
                onClick={onNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md shadow-emerald-500/20 shrink-0"
              >
                <span>{isLastQuestion ? 'Արդյունքներ' : 'Հաջորդ հարցը'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Explicit WRONG answer banner, showing that the game STILL continues! */
            <div className="p-4 sm:p-5 rounded-xl bg-rose-950/60 border-2 border-rose-500/60 text-rose-200 space-y-3 shadow-lg shadow-rose-500/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-rose-300 text-sm sm:text-base flex items-center gap-2">
                      <span>⚠️ Ոչ ճիշտ պատասխան, բայց խաղը շարունակվում է!</span>
                    </div>
                    <div className="text-xs text-rose-200/90 mt-0.5">
                      Ճիշտ տարբերակն է՝ <strong className="text-white font-mono">{question.correct} ({question.options.find(o => o.key === question.correct)?.textEs})</strong>: Դուք շարունակում եք խաղը!
                    </div>
                  </div>
                </div>

                <button
                  onClick={onNextQuestion}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-md shadow-amber-500/20 shrink-0 self-stretch sm:self-auto"
                >
                  <span>{isLastQuestion ? 'Արդյունքներ' : 'Շարունակել խաղը'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Detailed Grammar Explanation Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <span>💡 Քերականական բացատրություն (Explicación)՝</span>
            </div>
            <p className="leading-relaxed">
              {question.explanationHy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
