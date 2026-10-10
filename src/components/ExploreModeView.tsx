import React, { useState } from 'react';
import { MathProblem, GradeLevel, DiagramParams } from '../types';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  BookmarkPlus,
  Edit3,
  Shuffle,
  Eye,
  EyeOff,
  Filter,
  Plus,
  Play,
  RotateCcw,
} from 'lucide-react';
import { DiagramRouter } from './diagrams/DiagramRouter';
import { MathRenderer, FormulaBadge } from './MathRenderer';
import { SimulationLab } from './simulations/SimulationLab';

interface Props {
  problems: MathProblem[];
  activeProblem: MathProblem;
  onSelectProblem: (problem: MathProblem) => void;
  onAddToWorksheet: (problem: MathProblem) => void;
  onEditProblem: (problem: MathProblem) => void;
  onShuffleProblem: () => void;
  isProblemInWorksheet: (id: string) => boolean;
}

export const ExploreModeView: React.FC<Props> = ({
  problems,
  activeProblem,
  onSelectProblem,
  onAddToWorksheet,
  onEditProblem,
  onShuffleProblem,
  isProblemInWorksheet,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  // Live simulation parameters
  const [liveParams, setLiveParams] = useState<DiagramParams>(activeProblem.diagramParams);

  // Wheel spinner state for probability
  const [spinnerRotation, setSpinnerRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResults, setSpinResults] = useState<number[]>([]);

  // When active problem changes, sync liveParams
  React.useEffect(() => {
    setLiveParams(activeProblem.diagramParams);
    setShowSolution(false);
    setSpinResults([]);
  }, [activeProblem.id]);

  const filteredProblems = problems.filter((p) => {
    const matchesGrade = selectedGrade === 'ALL' || p.gradeLevel === selectedGrade;
    const matchesQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.questionText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesQuery;
  });

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const totalSectors = liveParams.val2 || 8;
    const targetCount = liveParams.val1 || 2;

    // Pick random outcome from 1 to totalSectors
    const outcome = Math.floor(Math.random() * totalSectors) + 1;

    // Calculate rotation: 5 full spins (1800 deg) + angle for outcome
    const sliceAngle = 360 / totalSectors;
    const extraAngle = (totalSectors - outcome + 0.5) * sliceAngle;
    const totalRotation = spinnerRotation + 1800 + (extraAngle % 360);

    setSpinnerRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResults((prev) => [outcome, ...prev]);
    }, 3000);
  };

  const inWorksheet = isProblemInWorksheet(activeProblem.id);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Filter and Problem Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Jenjang:</span>
          </div>

          {(['ALL', 'SD', 'SMP', 'SMA'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {grade === 'ALL' ? 'Semua Jenjang' : grade}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari topik atau materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-48 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />

          <button
            onClick={onShuffleProblem}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Pilih Soal Acak"
          >
            <Shuffle className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Acak Soal</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar (Problem list) + Content (Problem & Interactive Lab) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Questions */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 max-h-[780px] overflow-y-auto">
          <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Koleksi Soal ({filteredProblems.length})
            </span>
          </div>

          <div className="space-y-2">
            {filteredProblems.map((prob) => {
              const isActive = prob.id === activeProblem.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => onSelectProblem(prob)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    isActive
                      ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        prob.gradeLevel === 'SD'
                          ? 'bg-amber-100 text-amber-800'
                          : prob.gradeLevel === 'SMP'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {prob.gradeLevel}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 truncate max-w-[120px]">
                      {prob.topic}
                    </span>
                  </div>

                  <h4
                    className={`text-xs font-bold line-clamp-1 ${
                      isActive ? 'text-indigo-950 font-extrabold' : 'text-slate-800'
                    }`}
                  >
                    {prob.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {prob.questionText.replace(/\$[^$]+\$/g, '[rumus]')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Interactive Math Problem & Lab Simulation */}
        <div className="lg:col-span-8 space-y-6">
          {/* Problem Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {activeProblem.gradeLevel}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {activeProblem.topic}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                    Kesulitan: {activeProblem.difficulty}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {activeProblem.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddToWorksheet(activeProblem)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    inWorksheet
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                  title={inWorksheet ? 'Sudah ada di lembar kerja' : 'Tambahkan ke lembar kerja cetak'}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{inWorksheet ? 'Di Lembar Cetak ✓' : '+ Lembar Cetak'}</span>
                </button>

                <button
                  onClick={() => onEditProblem(activeProblem)}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                  title="Edit Soal Ini"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Formula Badge */}
            <div>
              <FormulaBadge formula={activeProblem.keyFormula} label="Rumus Dasar" />
            </div>

            {/* Question Text with KaTeX */}
            <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
              <MathRenderer content={activeProblem.questionText} />
            </div>

            {/* Diagram Display */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
              <DiagramRouter
                type={activeProblem.diagramType}
                params={liveParams}
                spinnerRotation={spinnerRotation}
                isSpinning={isSpinning}
              />
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Pilihan Jawaban (Klik untuk mencoba menjawab):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProblem.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isCorrect = i === activeProblem.correctAnswerIndex;
                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                        showSolution && isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          showSolution && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span>{opt}</span>
                      {showSolution && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Solution Toggle */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
              >
                {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSolution ? 'Sembunyikan Pembahasan' : 'Lihat Kunci Jawaban & Solusi'}</span>
              </button>

              <span className="text-xs text-slate-400">
                Gunakan laboratorium di bawah untuk mensimulasikan angka baru
              </span>
            </div>

            {/* Full Explanation Box */}
            {showSolution && (
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-slate-800 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kunci Jawaban: {activeProblem.correctAnswerLabel} ({activeProblem.options[activeProblem.correctAnswerIndex]})</span>
                </div>
                <div className="leading-relaxed bg-white p-4 rounded-xl border border-indigo-100">
                  <MathRenderer content={activeProblem.explanation} />
                </div>
              </div>
            )}
          </div>

          {/* Real-time Interactive Simulation Laboratory */}
          <SimulationLab
            type={activeProblem.diagramType}
            params={liveParams}
            initialParams={activeProblem.diagramParams}
            onChangeParams={(newP) => setLiveParams(newP)}
            onSpinWheel={handleSpinWheel}
            isSpinning={isSpinning}
            spinResults={spinResults}
            simulationInstructions={activeProblem.simulationInstructions}
          />
        </div>
      </div>
    </div>
  );
};
