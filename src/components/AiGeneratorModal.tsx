import React, { useState } from 'react';
import { MathProblem, GradeLevel, Difficulty, DiagramType } from '../types';
import {
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { DiagramRouter } from './diagrams/DiagramRouter';
import { MathRenderer } from './MathRenderer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProblemGenerated: (problem: MathProblem) => void;
}

export const AiGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onProblemGenerated,
}) => {
  const [topic, setTopic] = useState('Teorema Pythagoras');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('SMP');
  const [difficulty, setDifficulty] = useState<Difficulty>('Sedang');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewProblem, setPreviewProblem] = useState<MathProblem | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Soal cerita tentang nelayan berlayar ke utara dan ke barat, cari jarak terdekat kembali ke pelabuhan',
    'Soal tentang juring kolam renang lingkaran berdiameter 28 meter',
    'Soal cerita anak membeli pizza dan membaginya ke 3 temannya dengan pecahan',
    'Soal persamaan tarif listrik dengan grafik linear f(x) = mx + c',
    'Soal bola basket dilempar parabola ke ring dengan fungsi kuadrat',
    'Soal mengukur tinggi tiang bendera upacara menggunakan sudut elevasi 30 derajat',
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setPreviewProblem(null);

    try {
      const response = await fetch('/api/generate-math-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          gradeLevel,
          difficulty,
          prompt: prompt.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Gagal menghasilkan soal dengan AI. Coba lagi beberapa saat lagi.'
        );
      }

      const raw = data.problem;
      const formatted: MathProblem = {
        id: `ai-${Date.now()}`,
        title: raw.title || 'Soal Matematika AI',
        gradeLevel: (raw.gradeLevel as GradeLevel) || gradeLevel,
        topic: raw.topic || topic,
        difficulty: (raw.difficulty as Difficulty) || difficulty,
        questionText: raw.questionText,
        diagramType: (raw.diagramType as DiagramType) || 'pythagoras',
        diagramParams: {
          val1: Number(raw.diagramParams?.val1) || 6,
          val2: Number(raw.diagramParams?.val2) || 8,
          val3: raw.diagramParams?.val3 !== undefined ? Number(raw.diagramParams.val3) : undefined,
          unit: raw.diagramParams?.unit || 'cm',
          caption: raw.diagramParams?.caption || 'Diagram ilustrasi visual matematika',
          label1: raw.diagramParams?.label1,
          label2: raw.diagramParams?.label2,
          label3: raw.diagramParams?.label3,
          showProof: false,
        },
        simulationInstructions:
          raw.simulationInstructions || 'Eksplorasi nilai parameter pada diagram di atas.',
        options: Array.isArray(raw.options) && raw.options.length === 4 ? raw.options : ['A', 'B', 'C', 'D'],
        correctAnswerIndex: typeof raw.correctAnswerIndex === 'number' ? raw.correctAnswerIndex : 0,
        correctAnswerLabel: (raw.correctAnswerLabel as 'A' | 'B' | 'C' | 'D') || 'A',
        explanation: raw.explanation || '',
        keyFormula: raw.keyFormula || 'c^2 = a^2 + b^2',
        tags: ['ai-generated', gradeLevel.toLowerCase()],
        createdAt: new Date().toISOString(),
      };

      setPreviewProblem(formatted);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message ||
          'Terjadi kendala koneksi saat menghubungi server AI. Pastikan server aktif.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyProblem = () => {
    if (previewProblem) {
      onProblemGenerated(previewProblem);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pembuat Soal Otomatis (Gemini 3.8 Flash)
              </h3>
              <p className="text-xs text-slate-500">
                Ketik tema atau konsep matematika yang diinginkan, AI merancang soal lengkap dengan diagram & simulasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Controls: Grade, Topic, Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenjang Sekolah:
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="SD">SD (Sekolah Dasar)</option>
                <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                <option value="SMA">SMA / SMK (Sekolah Menengah Atas)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Topik / Materi:
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Teorema Pythagoras">Teorema Pythagoras</option>
                <option value="Lingkaran & Juring">Lingkaran & Juring</option>
                <option value="Pecahan & Model Kue">Pecahan & Visual Bar</option>
                <option value="Persamaan Linear Garis Lurus">Persamaan Garis Lurus (y = mx + c)</option>
                <option value="Fungsi Kuadrat & Parabola">Fungsi Kuadrat & Parabola</option>
                <option value="Trigonometri & Sudut Elevasi">Trigonometri & Sudut Elevasi</option>
                <option value="Peluang & Roda Putar">Peluang & Teori Probabilitas</option>
                <option value="Persamaan Linear Neraca">Neraca Aljabar (ax + b = c)</option>
                <option value="Garis dan Sudut Berpelurus">Garis dan Sudut (180°)</option>
                <option value="Keliling & Luas Bangun Datar">Luas & Keliling Bangun Datar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Kesulitan:
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Mudah">Mudah (Pemahaman Konsep)</option>
                <option value="Sedang">Sedang (Aplikasi Standar)</option>
                <option value="Sulit">Sulit (HOTS / Penalaran Analitis)</option>
              </select>
            </div>
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instruksi Tambahan / Konteks Soal (Opsional):
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Contoh: Buat soal cerita tentang seorang arsitek yang merancang jembatan layang dengan tiang kabel penopang..."
              rows={2}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Quick prompt ideas */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Inspirasi Cepat Soal Cerita:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(item)}
                  className="text-[11px] text-left px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 transition-colors cursor-pointer"
                >
                  "{item.slice(0, 50)}..."
                </button>
              ))}
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Perhatian:</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Generated Result Preview */}
          {previewProblem && (
            <div className="mt-4 p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white">
                  HASIL GENERATOR AI
                </span>
                <span className="text-xs text-indigo-800 font-semibold">
                  {previewProblem.gradeLevel} • {previewProblem.difficulty}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{previewProblem.title}</h4>

              <div className="text-xs text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100">
                <MathRenderer content={previewProblem.questionText} />
              </div>

              {/* Diagram Preview */}
              <div className="bg-white p-2 rounded-lg border border-indigo-100 flex justify-center">
                <DiagramRouter
                  type={previewProblem.diagramType}
                  params={previewProblem.diagramParams}
                />
              </div>

              {/* Options Preview */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {previewProblem.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isCorrect = i === previewProblem.correctAnswerIndex;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border flex items-center gap-2 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                        {letter}
                      </span>
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Batal
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Merancang Soal & Simulasi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Buat Soal dengan Gemini</span>
                </>
              )}
            </button>

            {previewProblem && (
              <button
                onClick={handleApplyProblem}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Gunakan Soal Ini</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
