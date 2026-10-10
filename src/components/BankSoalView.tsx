import React, { useState } from 'react';
import { MathProblem, GradeLevel } from '../types';
import {
  Library,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  BookmarkPlus,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { DiagramRouter } from './diagrams/DiagramRouter';

interface Props {
  problems: MathProblem[];
  onSelectProblem: (problem: MathProblem) => void;
  onEditProblem: (problem: MathProblem) => void;
  onDeleteProblem: (id: string) => void;
  onAddToWorksheet: (problem: MathProblem) => void;
  onResetPresets: () => void;
  onOpenAiGenerator: () => void;
  isProblemInWorksheet: (id: string) => boolean;
}

export const BankSoalView: React.FC<Props> = ({
  problems,
  onSelectProblem,
  onEditProblem,
  onDeleteProblem,
  onAddToWorksheet,
  onResetPresets,
  onOpenAiGenerator,
  isProblemInWorksheet,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = problems.filter((p) => {
    const matchesGrade = selectedGrade === 'ALL' || p.gradeLevel === selectedGrade;
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()) ||
      p.questionText.toLowerCase().includes(search.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header and Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Library className="w-5 h-5 text-indigo-600" />
            Bank Soal Matematika Visual
          </h2>
          <p className="text-xs text-slate-500">
            Tersimpan {problems.length} butir soal lengkap dengan ilustrasi diagram dan simulasi interaktif
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAiGenerator}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Tambah via AI</span>
          </button>

          <button
            onClick={onResetPresets}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Pulihkan koleksi soal awal"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Reset ke Preset</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <span className="text-xs font-bold text-slate-600">Jenjang:</span>
          {(['ALL', 'SD', 'SMP', 'SMA'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grade === 'ALL' ? 'Semua' : grade}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari judul, materi, atau teks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Grid of Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prob) => {
          const inWorksheet = isProblemInWorksheet(prob.id);
          return (
            <div
              key={prob.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
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
                    <span className="text-[11px] font-medium text-slate-500 truncate max-w-[130px]">
                      {prob.topic}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400">
                    {prob.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{prob.title}</h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {prob.questionText.replace(/\$[^$]+\$/g, '[rumus]')}
                </p>

                {/* Compact Diagram Preview */}
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 h-36 flex items-center justify-center overflow-hidden">
                  <div className="scale-75 origin-center pointer-events-none">
                    <DiagramRouter type={prob.diagramType} params={prob.diagramParams} />
                  </div>
                </div>

                {/* Correct Answer Badge */}
                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Kunci Jawaban:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Opsi {prob.correctAnswerLabel}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                <button
                  onClick={() => onSelectProblem(prob)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Uji Simulasi</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onAddToWorksheet(prob)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      inWorksheet
                        ? 'text-emerald-700 bg-emerald-100'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                    }`}
                    title={inWorksheet ? 'Sudah di lembar cetak' : 'Tambah ke lembar cetak'}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onEditProblem(prob)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Soal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteProblem(prob.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
