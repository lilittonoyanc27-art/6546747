/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, Menu, Sparkles, Play, Award, CheckCircle } from 'lucide-react';
import { QUESTIONS, Question } from './questions';
import { QuestionCard } from './QuestionCard';
import { Ladder } from './Ladder';
import { LifelinesBar } from './Lifelines';
import { GrammarModal } from './GrammarModal';
import { SummaryView } from './SummaryView';
import {
  playQuestionDrone,
  playLockIn,
  playCorrect,
  playWrong,
  isSoundEnabled,
  setSoundEnabled,
} from './sound';

type GameState = 'INTRO' | 'PLAYING' | 'SUMMARY';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isGrammarOpen, setIsGrammarOpen] = useState<boolean>(false);
  const [isLadderOpenMobile, setIsLadderOpenMobile] = useState<boolean>(false);

  // Lifelines state
  const [used5050, setUsed5050] = useState<boolean>(false);
  const [usedAudience, setUsedAudience] = useState<boolean>(false);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<('A' | 'B' | 'C' | 'D')[]>([]);

  // Answers history: question index -> { selected, isCorrect }
  const [answersHistory, setAnswersHistory] = useState<
    Record<number, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>
  >({});
  const [earnedPrize, setEarnedPrize] = useState<number>(0);

  const currentQuestion: Question = QUESTIONS[currentIndex] || QUESTIONS[0];

  // Sound toggle handler
  const handleToggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    setSoundEnabled(nextVal);
  };

  // Start / Restart game
  const handleStartGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsLocked(false);
    setUsed5050(false);
    setUsedAudience(false);
    setUsedHint(false);
    setEliminatedOptions([]);
    setAnswersHistory({});
    setEarnedPrize(0);
    setGameState('PLAYING');
    playQuestionDrone();
  };

  // When question changes, play tension drone and reset current question state
  useEffect(() => {
    if (gameState === 'PLAYING') {
      playQuestionDrone();
      setSelectedOption(null);
      setIsLocked(false);
      setEliminatedOptions([]);
    }
  }, [currentIndex, gameState]);

  // Handle selecting an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isLocked || selectedOption !== null) return;

    playLockIn();
    setSelectedOption(key);
    setIsLocked(true);

    const isCorrect = key === currentQuestion.correct;

    // Small dramatic pause like in the real TV show!
    setTimeout(() => {
      if (isCorrect) {
        playCorrect();
        setEarnedPrize(currentQuestion.prizeValue);
      } else {
        playWrong();
        // Even if wrong, player keeps their earned checkpoint or current prize!
      }

      setAnswersHistory(prev => ({
        ...prev,
        [currentIndex]: { selected: key, isCorrect },
      }));
    }, 700);
  };

  // Handle Lifeline 50:50
  const handleUse5050 = () => {
    if (used5050) return;
    setUsed5050(true);

    const correctKey = currentQuestion.correct;
    const wrongKeys = (['A', 'B', 'C', 'D'] as const).filter(k => k !== correctKey);
    // Pick 2 random wrong options to eliminate
    const shuffled = [...wrongKeys].sort(() => 0.5 - Math.random());
    setEliminatedOptions([shuffled[0], shuffled[1]]);
  };

  // Advance to next question or summary
  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('SUMMARY');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Stage Lighting Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px]" />
      </div>

      {/* Top Bar Navigation Contract: 3 Zones */}
      <header className="relative z-20 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <span className="font-serif text-base">⚽</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-serif">
                ¿Conoces los verbos del fútbol?
              </span>
              <span className="hidden md:inline-block ml-2 text-xs text-amber-400 font-sans font-medium">
                🇪🇸 Presente de Indicativo · 🇦🇲 Մտածիր ֆուտբոլիստի պես
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation / Quick Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Grammar Guide Button */}
            <button
              onClick={() => setIsGrammarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-slate-200 hover:text-amber-300 text-xs font-semibold transition-all whitespace-nowrap"
              title="Բացել իսպաներեն ապառնիի քերականական աղյուսակները"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Քերականություն</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                soundOn
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundOn ? 'Անջատել ձայնը' : 'Միացնել ձայնը'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Ladder toggle button */}
            {gameState === 'PLAYING' && (
              <button
                onClick={() => setIsLadderOpenMobile(true)}
                className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
              >
                <Menu className="w-4 h-4" />
                <span>Սանդուղք</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {gameState === 'INTRO' && (
          <div className="flex-1 flex items-center justify-center py-6 animate-in fade-in duration-300">
            <div className="max-w-2xl w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
              {/* Studio Emblem */}
              <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-serif tracking-wider uppercase mb-2">
                  ¡Piensa como un futbolista! — 1 000 000 ֏
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  Կրկնեք իսպաներենի ամենակարևոր բայերը ներկա ժամանակով (Presente de Indicativo)՝ ֆուտբոլային տարբեր իրավիճակներում։
                </p>
              </div>

              {/* Game Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>30 Ֆուտբոլային հարց 5 Փուլերով</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Կանոնավոր և անկանոն բայեր, իրավիճակներ դաշտում, ֆուտբոլիստի առօրյա և չեմպիոնի փորձություն։
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Սեղմեք իսպաներենի վրա</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Իսպաներեն նախադասության վրա սեղմելիս անմիջապես կբացվի հայերեն թարգմանությունը։
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Սխալվե՞լ եք: Խաղը շարունակվում է!</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Եթե պատասխանը սխալ է, խաղը չի ընդհատվում. կարդում եք բացատրությունը և շարունակում առաջ գնալ։
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>3 Օգնության հնարավորություն</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    50:50, Հանդիսատեսի քվեարկություն և Ուսուցչի քերականական հուշում։
                  </p>
                </div>
              </div>

              {/* Start CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleStartGame}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 text-sm sm:text-base uppercase tracking-wider transition-all transform active:scale-95"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Սկսել խաղը (Empezar el juego)</span>
                </button>

                <button
                  onClick={() => setIsGrammarOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-2xl text-sm transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Կարդալ կանոնները (Gramática)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="flex-1 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            {/* Center Stage: Lifelines + Question Card */}
            <div className="flex-1 w-full flex flex-col items-center space-y-6">
              {/* Lifelines Bar */}
              <LifelinesBar
                currentQuestion={currentQuestion}
                used5050={used5050}
                usedAudience={usedAudience}
                usedHint={usedHint}
                onUse5050={handleUse5050}
                onUseAudience={() => setUsedAudience(true)}
                onUseHint={() => setUsedHint(true)}
                disabled={isLocked}
              />

              {/* Main Interactive Question Card */}
              <QuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                isLocked={isLocked}
                onNextQuestion={handleNextQuestion}
                eliminatedOptions={eliminatedOptions}
                isLastQuestion={currentIndex === QUESTIONS.length - 1}
              />
            </div>

            {/* Desktop Ladder Sidebar */}
            <div className="hidden lg:block shrink-0">
              <Ladder
                questions={QUESTIONS}
                currentIndex={currentIndex}
                answersHistory={answersHistory}
                isOpenOnMobile={false}
                onCloseMobile={() => {}}
                earnedPrize={earnedPrize}
              />
            </div>

            {/* Mobile Ladder Drawer */}
            <Ladder
              questions={QUESTIONS}
              currentIndex={currentIndex}
              answersHistory={answersHistory}
              isOpenOnMobile={isLadderOpenMobile}
              onCloseMobile={() => setIsLadderOpenMobile(false)}
              earnedPrize={earnedPrize}
            />
          </div>
        )}

        {gameState === 'SUMMARY' && (
          <div className="flex-1 flex items-center justify-center py-6">
            <SummaryView
              questions={QUESTIONS}
              answersHistory={answersHistory}
              totalPrize={earnedPrize}
              onRestart={handleStartGame}
            />
          </div>
        )}
      </main>

      {/* Grammar Modal */}
      <GrammarModal
        isOpen={isGrammarOpen}
        onClose={() => setIsGrammarOpen(false)}
      />

      {/* Clean Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950 px-6 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>⚽🇪🇸🇦🇲 Los Verbos del Fútbol · Presente de Indicativo (30 preguntas)</span>
          <span>Իսպաներենից հայերեն ֆուտբոլային վիկտորինա</span>
        </div>
      </footer>
    </div>
  );
}
