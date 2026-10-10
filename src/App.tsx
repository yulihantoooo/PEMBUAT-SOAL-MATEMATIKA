import React, { useState, useEffect } from 'react';
import { MathProblem } from './types';
import { PRESET_PROBLEMS } from './data/presetProblems';
import { Header, AppTab } from './components/Header';
import { ExploreModeView } from './components/ExploreModeView';
import { QuizModeView } from './components/QuizModeView';
import { WorksheetView } from './components/WorksheetView';
import { BankSoalView } from './components/BankSoalView';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { ProblemEditorModal } from './components/ProblemEditorModal';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'mathemavisual_problems_v1';
const WORKSHEET_KEY = 'mathemavisual_worksheet_v1';

export default function App() {
  const [problems, setProblems] = useState<MathProblem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved problems', e);
    }
    return PRESET_PROBLEMS;
  });

  const [activeProblem, setActiveProblem] = useState<MathProblem>(
    () => problems[0] || PRESET_PROBLEMS[0]
  );

  const [worksheetProblemIds, setWorksheetProblemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WORKSHEET_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    // default first 3 problems in worksheet
    return [PRESET_PROBLEMS[0].id, PRESET_PROBLEMS[1].id, PRESET_PROBLEMS[2].id];
  });

  const [currentTab, setCurrentTab] = useState<AppTab>('explore');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<MathProblem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync problems to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
    } catch (e) {
      console.error(e);
    }
  }, [problems]);

  // Sync worksheet to local storage
  useEffect(() => {
    try {
      localStorage.setItem(WORKSHEET_KEY, JSON.stringify(worksheetProblemIds));
    } catch (e) {
      console.error(e);
    }
  }, [worksheetProblemIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectProblem = (prob: MathProblem) => {
    setActiveProblem(prob);
    setCurrentTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShuffleProblem = () => {
    const remaining = problems.filter((p) => p.id !== activeProblem.id);
    const pool = remaining.length > 0 ? remaining : problems;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setActiveProblem(random);
    showToast(`Beralih ke soal: ${random.title}`);
  };

  const handleAddToWorksheet = (prob: MathProblem) => {
    if (!worksheetProblemIds.includes(prob.id)) {
      setWorksheetProblemIds((prev) => [...prev, prob.id]);
      showToast(`Soal "${prob.title}" berhasil ditambahkan ke Lembar Cetak!`);
    } else {
      setWorksheetProblemIds((prev) => prev.filter((id) => id !== prob.id));
      showToast(`Soal "${prob.title}" dihapus dari Lembar Cetak.`);
    }
  };

  const handleRemoveFromWorksheet = (id: string) => {
    setWorksheetProblemIds((prev) => prev.filter((pId) => pId !== id));
    showToast('Soal dihapus dari Lembar Cetak.');
  };

  const handleOpenAiGenerator = () => {
    setIsAiModalOpen(true);
  };

  const handleProblemGenerated = (newProb: MathProblem) => {
    setProblems((prev) => [newProb, ...prev]);
    setActiveProblem(newProb);
    setCurrentTab('explore');
    showToast(`Soal baru "${newProb.title}" berhasil dibuat dengan AI!`);
  };

  const handleOpenManualEditor = (probToEdit?: MathProblem) => {
    setEditingProblem(probToEdit || null);
    setIsEditorModalOpen(true);
  };

  const handleSaveProblem = (savedProblem: MathProblem) => {
    if (editingProblem) {
      // Update existing
      setProblems((prev) =>
        prev.map((p) => (p.id === savedProblem.id ? savedProblem : p))
      );
      if (activeProblem.id === savedProblem.id) {
        setActiveProblem(savedProblem);
      }
      showToast(`Soal "${savedProblem.title}" berhasil diperbarui.`);
    } else {
      // Add new
      setProblems((prev) => [savedProblem, ...prev]);
      setActiveProblem(savedProblem);
      setCurrentTab('explore');
      showToast(`Soal baru "${savedProblem.title}" berhasil ditambahkan.`);
    }
  };

  const handleDeleteProblem = (id: string) => {
    if (problems.length <= 1) {
      alert('Minimal harus ada 1 soal dalam aplikasi.');
      return;
    }
    const filtered = problems.filter((p) => p.id !== id);
    setProblems(filtered);
    setWorksheetProblemIds((prev) => prev.filter((pId) => pId !== id));
    if (activeProblem.id === id) {
      setActiveProblem(filtered[0]);
    }
    showToast('Soal telah dihapus dari koleksi.');
  };

  const handleResetPresets = () => {
    if (window.confirm('Pulihkan seluruh soal ke preset standar aplikasi?')) {
      setProblems(PRESET_PROBLEMS);
      setActiveProblem(PRESET_PROBLEMS[0]);
      setWorksheetProblemIds([
        PRESET_PROBLEMS[0].id,
        PRESET_PROBLEMS[1].id,
        PRESET_PROBLEMS[2].id,
      ]);
      showToast('Koleksi soal berhasil dipulihkan ke preset awal.');
    }
  };

  const isProblemInWorksheet = (id: string) => worksheetProblemIds.includes(id);

  const worksheetProblems = worksheetProblemIds
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is MathProblem => Boolean(p));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onOpenAiGenerator={handleOpenAiGenerator}
        onOpenManualEditor={() => handleOpenManualEditor()}
        worksheetCount={worksheetProblemIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'explore' && (
          <ExploreModeView
            problems={problems}
            activeProblem={activeProblem}
            onSelectProblem={handleSelectProblem}
            onAddToWorksheet={handleAddToWorksheet}
            onEditProblem={(p) => handleOpenManualEditor(p)}
            onShuffleProblem={handleShuffleProblem}
            isProblemInWorksheet={isProblemInWorksheet}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizModeView
            problems={problems}
            onOpenExploreMode={handleSelectProblem}
          />
        )}

        {currentTab === 'worksheet' && (
          <WorksheetView
            problems={worksheetProblems}
            allProblems={problems}
            onRemoveFromWorksheet={handleRemoveFromWorksheet}
            onAddToWorksheet={handleAddToWorksheet}
          />
        )}

        {currentTab === 'bank' && (
          <BankSoalView
            problems={problems}
            onSelectProblem={handleSelectProblem}
            onEditProblem={(p) => handleOpenManualEditor(p)}
            onDeleteProblem={handleDeleteProblem}
            onAddToWorksheet={handleAddToWorksheet}
            onResetPresets={handleResetPresets}
            onOpenAiGenerator={handleOpenAiGenerator}
            isProblemInWorksheet={isProblemInWorksheet}
          />
        )}
      </main>

      {/* Footer (Hidden when printing worksheet) */}
      <footer className="print:hidden bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-800">MathemaVisual</span>
            <span>— Pembuat Soal Matematika Visual & Laboratorium Simulasi Interaktif</span>
          </div>
          <p className="text-slate-400">
            Dibuat untuk guru, pendidik, dan pelajar matematika Indonesia
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AiGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onProblemGenerated={handleProblemGenerated}
      />

      <ProblemEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onSaveProblem={handleSaveProblem}
        initialProblem={editingProblem}
      />
    </div>
  );
}
