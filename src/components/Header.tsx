import React from 'react';
import {
  Sparkles,
  PlusCircle,
  BookOpen,
  GraduationCap,
  Printer,
  Library,
  Compass,
} from 'lucide-react';

export type AppTab = 'explore' | 'quiz' | 'worksheet' | 'bank';

interface HeaderProps {
  currentTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
  onOpenAiGenerator: () => void;
  onOpenManualEditor: () => void;
  worksheetCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onChangeTab,
  onOpenAiGenerator,
  onOpenManualEditor,
  worksheetCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  Mathema<span className="text-indigo-600">Visual</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                  LAB & GENERATOR
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Pembuat Soal Matematika • Diagram Interaktif • Laboratorium Simulasi
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onChangeTab('explore')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'explore'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Belajar & Simulasi</span>
            </button>

            <button
              onClick={() => onChangeTab('quiz')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'quiz'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Mode Kuis</span>
            </button>

            <button
              onClick={() => onChangeTab('worksheet')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer relative ${
                currentTab === 'worksheet'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Printer className="w-4 h-4 text-amber-600" />
              <span>Lembar Cetak</span>
              {worksheetCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {worksheetCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onChangeTab('bank')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'bank'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Library className="w-4 h-4 text-purple-600" />
              <span>Bank Soal</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiGenerator}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm shadow-indigo-300 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
              <span className="hidden sm:inline">Generator</span> AI
            </button>

            <button
              onClick={onOpenManualEditor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
              title="Buat Soal Manual"
            >
              <PlusCircle className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Buat Manual</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
