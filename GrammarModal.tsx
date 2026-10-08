import React, { useState } from 'react';
import { X, Volume2, Search, BookOpen, Sparkles } from 'lucide-react';
import { REGULAR_CONJUGATIONS, FOOTBALL_VERBS, GRAMMAR_EXAMPLES } from './grammar';
import { speakSpanish } from './sound';

interface GrammarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrammarModal: React.FC<GrammarModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'regular' | 'footballVerbs' | 'examples'>('regular');

  if (!isOpen) return null;

  const filteredVerbs = FOOTBALL_VERBS.filter(v =>
    v.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.armenian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.yo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-300 font-serif tracking-wide">
                ⚽ Los Verbos del Fútbol — Presente de Indicativo
              </h2>
              <p className="text-xs text-slate-400">
                Ֆուտբոլի 30 բայերը ներկա ժամանակով (Nivel A1–A2)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Փակել"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('regular')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'regular'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Կանոնավոր բայեր (-ar, -er, -ir)
          </button>
          <button
            onClick={() => setActiveTab('footballVerbs')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'footballVerbs'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ֆուտբոլային բոլոր բայերը ({FOOTBALL_VERBS.length})
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'examples'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Ֆուտբոլային օրինակներ
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* General Explanation Banner */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Ինչպե՞ս են խոնարհվում ֆուտբոլի բայերը ներկա ժամանակում (Presente)</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm">
              Ֆուտբոլային իրավիճակներում գործածվում են կանոնավոր, արմատափոխ (e-&gt;ie, o-&gt;ue, e-&gt;i, u-&gt;ue) և անկանոն բայեր։
              Ուշադրություն դարձրեք <strong>1-ին դեմքի (yo)</strong> անկանոնություններին (hago, pongo, salgo, conozco, doy, sé, veo)։
            </p>
          </div>

          {activeTab === 'regular' && (
            <div>
              <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                Կանոնավոր բայերի խոնարհման կանոնը (Ayudar, Correr, Vivir)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Դեմք / Persona</th>
                      <th className="py-3 px-3">-AR (Ayudar — Օգնել)</th>
                      <th className="py-3 px-3">-ER (Correr — Վազել)</th>
                      <th className="py-3 px-3">-IR (Vivir — Ապրել)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {REGULAR_CONJUGATIONS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-white">{row.person}</span>
                          <span className="block text-[11px] text-slate-400">{row.armenianPerson}</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-emerald-300 font-medium">{row.ar}</span>
                          <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">({row.endingAr})</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-cyan-300 font-medium">{row.er}</span>
                          <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">({row.endingEr})</span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-purple-300 font-medium">{row.ir}</span>
                          <span className="ml-1 text-[11px] font-mono text-amber-400 font-bold">({row.endingIr})</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'footballVerbs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Ֆուտբոլի 26+ բայերը խոնարհումներով
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Որոնել բայ կամ հայերեն..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredVerbs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-amber-300 group-hover:text-amber-200">
                        {item.infinitive}
                      </span>
                      <button
                        onClick={() => speakSpanish(item.infinitive)}
                        className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                        title="Լսել արտասանությունը"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-slate-300">
                      Հայերեն՝ <strong className="text-white">{item.armenian}</strong>
                    </div>

                    <div className="text-[11px] text-cyan-400 font-mono">
                      {item.type}
                    </div>

                    <div className="pt-1 border-t border-slate-800/80 text-[11px] grid grid-cols-2 gap-1 text-slate-400 font-mono">
                      <div>yo <span className="text-slate-200 font-semibold">{item.yo}</span></div>
                      <div>tú <span className="text-slate-200">{item.tu}</span></div>
                      <div>él <span className="text-amber-300 font-semibold">{item.el}</span></div>
                      <div>nos. <span className="text-slate-200">{item.nosotros}</span></div>
                      <div>vos. <span className="text-slate-200">{item.vosotros}</span></div>
                      <div>ellos <span className="text-slate-200">{item.ellos}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                Գործնական ֆուտբոլային օրինակներ
              </h3>
              <div className="space-y-3">
                {GRAMMAR_EXAMPLES.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-amber-300 flex items-center gap-2">
                        <span>🇪🇸 {ex.es}</span>
                      </div>
                      <div className="text-xs text-slate-300">
                        <span>🇦🇲 {ex.hy}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Բացատրություն՝ {ex.note}
                      </div>
                    </div>
                    <button
                      onClick={() => speakSpanish(ex.es)}
                      className="p-2 text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 rounded-lg transition-colors shrink-0"
                      title="Լսել նախադասությունը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-md shadow-amber-500/20"
          >
            Վերադառնալ խաղին
          </button>
        </div>
      </div>
    </div>
  );
};
