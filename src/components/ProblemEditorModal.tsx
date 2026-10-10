import React, { useState, useEffect } from 'react';
import { MathProblem, GradeLevel, Difficulty, DiagramType } from '../types';
import { X, Check, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveProblem: (problem: MathProblem) => void;
  initialProblem?: MathProblem | null;
}

export const ProblemEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSaveProblem,
  initialProblem,
}) => {
  const [title, setTitle] = useState('');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('SMP');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Sedang');
  const [questionText, setQuestionText] = useState('');
  const [diagramType, setDiagramType] = useState<DiagramType>('pythagoras');
  const [val1, setVal1] = useState(6);
  const [val2, setVal2] = useState(8);
  const [unit, setUnit] = useState('cm');
  const [caption, setCaption] = useState('Diagram geometri pendukung');
  const [options, setOptions] = useState<string[]>(['8 cm', '10 cm', '12 cm', '14 cm']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(1);
  const [explanation, setExplanation] = useState('');
  const [keyFormula, setKeyFormula] = useState('c = \\sqrt{a^2 + b^2}');
  const [simulationInstructions, setSimulationInstructions] = useState(
    'Ubah parameter alas dan tinggi pada laboratorium untuk memverifikasi nilai hipotenusa.'
  );

  useEffect(() => {
    if (initialProblem) {
      setTitle(initialProblem.title);
      setGradeLevel(initialProblem.gradeLevel);
      setTopic(initialProblem.topic);
      setDifficulty(initialProblem.difficulty);
      setQuestionText(initialProblem.questionText);
      setDiagramType(initialProblem.diagramType);
      setVal1(initialProblem.diagramParams.val1);
      setVal2(initialProblem.diagramParams.val2);
      setUnit(initialProblem.diagramParams.unit);
      setCaption(initialProblem.diagramParams.caption);
      setOptions([...initialProblem.options]);
      setCorrectAnswerIndex(initialProblem.correctAnswerIndex);
      setExplanation(initialProblem.explanation);
      setKeyFormula(initialProblem.keyFormula);
      setSimulationInstructions(initialProblem.simulationInstructions);
    } else {
      // Default new template
      setTitle('Soal Matematika Baru');
      setTopic('Geometri');
      setQuestionText('Tentukan nilai sisi miring segitiga siku-siku berikut ini!');
      setOptions(['8 cm', '10 cm', '12 cm', '14 cm']);
      setCorrectAnswerIndex(1);
      setExplanation('Gunakan Teorema Pythagoras: c² = a² + b² = 6² + 8² = 100, maka c = 10 cm.');
    }
  }, [initialProblem, isOpen]);

  if (!isOpen) return null;

  const handleOptionChange = (idx: number, val: string) => {
    const updated = [...options];
    updated[idx] = val;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const labels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const problem: MathProblem = {
      id: initialProblem?.id || `custom-${Date.now()}`,
      title: title || 'Soal Matematika Interaktif',
      gradeLevel,
      topic: topic || 'Matematika Terapan',
      difficulty,
      questionText,
      diagramType,
      diagramParams: {
        val1,
        val2,
        unit,
        caption,
        showProof: false,
      },
      simulationInstructions,
      options,
      correctAnswerIndex,
      correctAnswerLabel: labels[correctAnswerIndex] || 'A',
      explanation,
      keyFormula,
      tags: ['custom', gradeLevel.toLowerCase()],
    };

    onSaveProblem(problem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {initialProblem ? 'Edit Soal Matematika' : 'Buat Soal Matematika Manual'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Soal:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
              placeholder="Contoh: Menghitung Sisi Miring Segitiga Siku-Siku"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jenjang:</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Topik:</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                placeholder="Geometri / Aljabar"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kesulitan:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Teks Narasi Soal: (Mendukung rumus LaTeX $...$ atau $$...$$)
            </label>
            <textarea
              required
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5"
              placeholder="Tuliskan soal cerita matematika secara lengkap..."
            />
          </div>

          {/* Diagram & Simulation Type */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pengaturan Diagram & Simulasi Visual
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipe Diagram/Simulasi:
                </label>
                <select
                  value={diagramType}
                  onChange={(e) => setDiagramType(e.target.value as DiagramType)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                >
                  <option value="pythagoras">Teorema Pythagoras</option>
                  <option value="circle_sector">Lingkaran & Juring</option>
                  <option value="fraction_pie">Model Pecahan (Kue & Pita)</option>
                  <option value="linear_function">Grafik Garis Linear (y = mx + c)</option>
                  <option value="quadratic_function">Fungsi Kuadrat (Parabola)</option>
                  <option value="trigonometry_elevation">Trigonometri (Sudut Elevasi)</option>
                  <option value="probability_spinner">Peluang (Roda Putar / Spinner)</option>
                  <option value="scale_balance">Neraca Aljabar (ax + b = c)</option>
                  <option value="angle_geometry">Sudut Garis Berpelurus (180°)</option>
                  <option value="area_perimeter">Luas & Keliling Bangun Datar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Satuan:</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                  placeholder="cm / m / bagian / derajat"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nilai Utama 1 (Alas / Jari-jari / m / dsb):
                </label>
                <input
                  type="number"
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nilai Utama 2 (Tinggi / Sudut / c / dsb):
                </label>
                <input
                  type="number"
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keterangan Diagram:
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Options A, B, C, D */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Pilihan Jawaban (Pilih radio untuk menandai jawaban yang benar):
            </label>
            {['A', 'B', 'C', 'D'].map((letter, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctAnswerIndex === idx}
                  onChange={() => setCorrectAnswerIndex(idx)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="w-6 text-xs font-bold text-slate-700">{letter}.</span>
                <input
                  type="text"
                  required
                  value={options[idx] || ''}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-lg p-2"
                  placeholder={`Pilihan ${letter}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rumus Kunci:
            </label>
            <input
              type="text"
              value={keyFormula}
              onChange={(e) => setKeyFormula(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              placeholder="Contoh: c = \sqrt{a^2 + b^2}"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pembahasan Lengkap (Step-by-step Solution):
            </label>
            <textarea
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2"
              placeholder="Uraikan langkah penyelesaian soal secara mendetail..."
            />
          </div>

          {/* Modal Footer */}
          <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Soal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
