import React, { useState } from 'react';
import { MathProblem } from '../types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sliders,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { DiagramRouter } from './diagrams/DiagramRouter';
import { MathRenderer, FormulaBadge } from './MathRenderer';
import { SimulationLab } from './simulations/SimulationLab';

interface Props {
  problems: MathProblem[];
  onOpenExploreMode: (problem: MathProblem) => void;
}

export const QuizModeView: React.FC<Props> = ({ problems, onOpenExploreMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<{ [index: number]: boolean }>({});
  const [showSimLab, setShowSimLab] = useState(false);
  const [liveParams, setLiveParams] = useState(problems[0]?.diagramParams || null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentProblem = problems[currentIndex];

  // If no problems
  if (!currentProblem) {
    return (
      <div className="text-center py-16">
        <p className="text-sm font-semibold text-slate-600">Belum ada soal untuk kuis.</p>
      </div>
    );
  }

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentProblem.correctAnswerIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    setAnswersHistory((prev) => ({
      ...prev,
      [currentIndex]: isCorrect,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < problems.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowSimLab(false);
      setLiveParams(problems[nextIdx].diagramParams);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersHistory({});
    setIsQuizCompleted(false);
    setShowSimLab(false);
    setLiveParams(problems[0]?.diagramParams);
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / problems.length) * 100);
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Kuis Selesai!</h2>
            <p className="text-xs text-slate-500">
              Kerja bagus! Anda telah menyelesaikan seluruh butir soal latihan matematika visual.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Skor Akhir:</span>
              <span className="text-2xl font-black text-indigo-600 font-mono">
                {score} / {problems.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Persentase Akurasi:</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {percentage}%
              </span>
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis dari Awal</span>
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentProblem.correctAnswerIndex;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Progress & Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            SOAL {currentIndex + 1} DARI {problems.length}
          </span>
          <h2 className="text-base font-bold text-slate-900">{currentProblem.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Skor Sementara:</span>
            <span className="font-mono font-bold text-sm text-slate-800">
              {score} / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
            </span>
          </div>
          {/* Circular or bar progress */}
          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Jenjang: {currentProblem.gradeLevel}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {currentProblem.topic}
          </span>
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
              currentProblem.difficulty === 'Mudah'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : currentProblem.difficulty === 'Sedang'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            Tingkat: {currentProblem.difficulty}
          </span>
          <FormulaBadge formula={currentProblem.keyFormula} label="Rumus Kunci" />
        </div>

        {/* Question Narration */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
          <MathRenderer content={currentProblem.questionText} />
        </div>

        {/* Diagram Area with Interactive Lab Toggle */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/40 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Ilustrasi Diagram Soal:
            </span>
            <button
              onClick={() => setShowSimLab(!showSimLab)}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showSimLab ? 'Tutup Simulator' : 'Buka Lab Simulasi (Uji Konsep)'}</span>
            </button>
          </div>

          <div className="flex justify-center">
            <DiagramRouter
              type={currentProblem.diagramType}
              params={liveParams || currentProblem.diagramParams}
            />
          </div>

          {/* Interactive Simulation Lab Accordion */}
          {showSimLab && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <SimulationLab
                type={currentProblem.diagramType}
                params={liveParams || currentProblem.diagramParams}
                initialParams={currentProblem.diagramParams}
                onChangeParams={(newP) => setLiveParams(newP)}
                simulationInstructions={currentProblem.simulationInstructions}
              />
            </div>
          )}
        </div>

        {/* Options A, B, C, D */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-700 block">
            Pilihlah salah satu jawaban yang paling tepat:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProblem.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentProblem.correctAnswerIndex;

              let btnStyle = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';

              if (isSelected && !isAnswerSubmitted) {
                btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-400 font-bold';
              } else if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : isAnswerSubmitted && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1">{option}</span>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit & Next Control Bar */}
        <div className="pt-2 flex items-center justify-between">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-40"
            >
              Periksa Jawaban
            </button>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Luar Biasa, Jawaban Anda Benar!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Jawaban Kurang Tepat. Jawaban benar adalah: {currentProblem.correctAnswerLabel}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>{currentIndex < problems.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Detailed Mathematical Explanation (Revealed upon submit) */}
        {isAnswerSubmitted && (
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs sm:text-sm text-slate-800 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Pembahasan Langkah Demi Langkah:</span>
            </div>
            <div className="leading-relaxed bg-white p-4 rounded-xl border border-indigo-100">
              <MathRenderer content={currentProblem.explanation} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
