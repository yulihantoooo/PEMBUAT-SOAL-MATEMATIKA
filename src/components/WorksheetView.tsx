import React, { useState } from 'react';
import { MathProblem, WorksheetSettings } from '../types';
import { Printer, Trash2, Plus, Download, CheckCircle, FileText, Settings2 } from 'lucide-react';
import { DiagramRouter } from './diagrams/DiagramRouter';
import { MathRenderer } from './MathRenderer';

interface Props {
  problems: MathProblem[];
  allProblems: MathProblem[];
  onRemoveFromWorksheet: (id: string) => void;
  onAddToWorksheet: (problem: MathProblem) => void;
}

export const WorksheetView: React.FC<Props> = ({
  problems,
  allProblems,
  onRemoveFromWorksheet,
  onAddToWorksheet,
}) => {
  const [settings, setSettings] = useState<WorksheetSettings>({
    schoolName: 'SMP / SMA NEGERI 1 CERDAS MANDIRI',
    examTitle: 'LEMBAR KERJA SISWA (LKS) & ASESMEN MATEMATIKA VISUAL',
    subject: 'Matematika Terapan',
    teacherName: 'Tim Guru Matematika',
    classGrade: 'VIII / IX / X',
    timeLimit: '60 Menit',
    includeAnswerKey: true,
    includeExplanations: true,
  });

  const [showConfig, setShowConfig] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(problems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `soal-matematika-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Problems available to add that are not already in worksheet
  const availableToAdd = allProblems.filter((p) => !problems.some((wp) => wp.id === p.id));

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Control Toolbar (Hidden in Print) */}
      <div className="print:hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Lembar Kerja Siswa (Siap Cetak / PDF)
          </h2>
          <p className="text-xs text-slate-500">
            {problems.length} butir soal terpasang dalam format lembar kerja ujian A4 standar
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Settings2 className="w-4 h-4 text-slate-600" />
            <span>Kop & Pengaturan</span>
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Ekspor JSON</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={problems.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Lembar Soal (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Settings Panel (Hidden in Print) */}
      {showConfig && (
        <div className="print:hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nama Instansi / Sekolah:</label>
            <input
              type="text"
              value={settings.schoolName}
              onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Judul Dokumen Ujian:</label>
            <input
              type="text"
              value={settings.examTitle}
              onChange={(e) => setSettings({ ...settings, examTitle: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran:</label>
            <input
              type="text"
              value={settings.subject}
              onChange={(e) => setSettings({ ...settings, subject: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Kelas / Tingkat:</label>
            <input
              type="text"
              value={settings.classGrade}
              onChange={(e) => setSettings({ ...settings, classGrade: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Alokasi Waktu:</label>
            <input
              type="text"
              value={settings.timeLimit}
              onChange={(e) => setSettings({ ...settings, timeLimit: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Guru Pengampu:</label>
            <input
              type="text"
              value={settings.teacherName}
              onChange={(e) => setSettings({ ...settings, teacherName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2"
            />
          </div>

          <div className="md:col-span-3 flex flex-wrap gap-4 pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={settings.includeAnswerKey}
                onChange={(e) => setSettings({ ...settings, includeAnswerKey: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              Cetak Kunci Jawaban di Halaman Terpisah
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={settings.includeExplanations}
                onChange={(e) => setSettings({ ...settings, includeExplanations: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              Sertakan Pembahasan Lengkap di Halaman Kunci
            </label>
          </div>
        </div>
      )}

      {/* Printable Sheet Page */}
      <div className="bg-white border border-slate-300 print:border-none rounded-xl p-8 shadow-md print:shadow-none print:p-0">
        {/* Printable Official Header (KOP SURAT) */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="text-center space-y-1">
            <h1 className="text-base font-extrabold uppercase tracking-wider text-slate-900">
              {settings.schoolName}
            </h1>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              {settings.examTitle}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Mata Pelajaran: <b>{settings.subject}</b> • Waktu: <b>{settings.timeLimit}</b> • Pengampu: <b>{settings.teacherName}</b>
            </p>
          </div>

          {/* Student Identiy Form Box */}
          <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-slate-700">
            <div>Nama Siswa: __________________</div>
            <div>Kelas / No: __________________</div>
            <div>Hari / Tanggal: __________________</div>
            <div>Nilai: [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
          </div>
        </div>

        {/* Question List */}
        {problems.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-sm font-semibold">Belum ada soal di dalam lembar kerja ini.</p>
            <p className="text-xs mt-1">Tambahkan soal dari Bank Soal atau gunakan Generator AI di atas.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                className="break-inside-avoid border-b border-slate-200 pb-6 last:border-b-0 relative group"
              >
                {/* Delete button (Hidden in Print) */}
                <div className="print:hidden absolute top-0 right-0">
                  <button
                    onClick={() => onRemoveFromWorksheet(problem.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus dari lembar kerja"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>

                  <div className="flex-1 space-y-3">
                    <div className="text-xs sm:text-sm text-slate-900 leading-relaxed font-normal">
                      <MathRenderer content={problem.questionText} />
                    </div>

                    {/* Problem Diagram (Clean Vector Render) */}
                    <div className="my-3 max-w-[340px] mx-auto border border-slate-200 rounded-lg p-2 bg-slate-50/50 print:bg-white print:border-slate-300">
                      <DiagramRouter
                        type={problem.diagramType}
                        params={problem.diagramParams}
                      />
                    </div>

                    {/* Multiple Choice Options A, B, C, D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {problem.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        return (
                          <div key={optIdx} className="flex items-start gap-2">
                            <span className="font-bold text-slate-900">{letter}.</span>
                            <span className="text-slate-800">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Answer Key & Explanations Page (Print Page Break) */}
        {settings.includeAnswerKey && problems.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-400 print:break-before-page">
            <div className="text-center mb-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                KUNCI JAWABAN & PEMBAHASAN MATEMATIS
              </h3>
              <p className="text-xs text-slate-500">
                (Lembar Pegangan Guru / Kunci Evaluasi Mandiri)
              </p>
            </div>

            <div className="space-y-4">
              {problems.map((p, idx) => (
                <div key={`key-${p.id}`} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Soal Nomor {idx + 1}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono">
                      Jawaban Benar: {p.correctAnswerLabel} ({p.options[p.correctAnswerIndex]})
                    </span>
                  </div>

                  {settings.includeExplanations && (
                    <div className="pt-1 text-slate-700 leading-relaxed">
                      <div className="font-semibold text-slate-800 mb-0.5">Pembahasan:</div>
                      <MathRenderer content={p.explanation} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Available to Add section (Hidden in Print) */}
      {availableToAdd.length > 0 && (
        <div className="print:hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Tambahkan Soal Lain ke Lembar Kerja Ini ({availableToAdd.length} Tersedia):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableToAdd.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-indigo-300 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{p.title}</p>
                  <p className="text-[11px] text-slate-500">
                    {p.gradeLevel} • {p.topic}
                  </p>
                </div>
                <button
                  onClick={() => onAddToWorksheet(p)}
                  className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
