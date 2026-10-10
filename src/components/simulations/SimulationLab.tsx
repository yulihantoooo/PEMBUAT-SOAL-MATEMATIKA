import React from 'react';
import { DiagramParams, DiagramType } from '../../types';
import { RotateCcw, Play, CheckCircle2, Sliders, Sparkles, HelpCircle } from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

interface Props {
  type: DiagramType;
  params: DiagramParams;
  initialParams: DiagramParams;
  onChangeParams: (newParams: DiagramParams) => void;
  onSpinWheel?: () => void;
  isSpinning?: boolean;
  spinResults?: number[];
  simulationInstructions?: string;
}

export const SimulationLab: React.FC<Props> = ({
  type,
  params,
  initialParams,
  onChangeParams,
  onSpinWheel,
  isSpinning = false,
  spinResults = [],
  simulationInstructions,
}) => {
  const handleReset = () => {
    onChangeParams({ ...initialParams });
  };

  const setVal1 = (val1: number) => {
    onChangeParams({ ...params, val1 });
  };

  const setVal2 = (val2: number) => {
    onChangeParams({ ...params, val2 });
  };

  const setVal3 = (val3: number) => {
    onChangeParams({ ...params, val3 });
  };

  const toggleProof = () => {
    onChangeParams({ ...params, showProof: !params.showProof });
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Laboratorium Simulasi Interaktif</h4>
            <p className="text-xs text-slate-500">Ubah variabel di bawah untuk melihat perubahan diagram secara langsung</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
          title="Kembalikan ke angka soal asli"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Nilai
        </button>
      </div>

      {/* Instructions */}
      {simulationInstructions && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-blue-900 text-xs">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b>Tantangan Eksplorasi:</b> {simulationInstructions}
          </p>
        </div>
      )}

      {/* Sliders & Controls based on diagram type */}
      <div className="space-y-3">
        {type === 'pythagoras' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Panjang Alas (a):</span>
                <span className="font-mono text-indigo-700">{params.val1} {params.unit}</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Tinggi Segitiga (b):</span>
                <span className="font-mono text-emerald-700">{params.val2} {params.unit}</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                onClick={toggleProof}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  params.showProof
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {params.showProof ? '✓ Sembunyikan Kotak Pembuktian' : '✦ Tampilkan Kotak Pembuktian (a² + b²)'}
              </button>

              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={() => onChangeParams({ ...params, val1: 3, val2: 4 })}
                  className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-mono text-[11px]"
                >
                  Tripel (3, 4, 5)
                </button>
                <button
                  onClick={() => onChangeParams({ ...params, val1: 5, val2: 12 })}
                  className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-mono text-[11px]"
                >
                  Tripel (5, 12, 13)
                </button>
                <button
                  onClick={() => onChangeParams({ ...params, val1: 8, val2: 15 })}
                  className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-mono text-[11px]"
                >
                  Tripel (8, 15, 17)
                </button>
              </div>
            </div>
          </div>
        )}

        {type === 'circle_sector' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Jari-jari Lingkaran (r):</span>
                <span className="font-mono text-indigo-700">{params.val1} {params.unit}</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Besar Sudut Pusat (θ):</span>
                <span className="font-mono text-amber-700">{params.val2}°</span>
              </div>
              <input
                type="range"
                min="10"
                max="350"
                step="5"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="flex gap-1.5 text-xs pt-1">
              <span className="text-slate-500 text-[11px] self-center">Sudut Khusus:</span>
              {[30, 45, 60, 90, 120, 180].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setVal2(deg)}
                  className={`px-2 py-0.5 rounded border text-[11px] font-mono cursor-pointer ${
                    params.val2 === deg ? 'bg-amber-600 text-white border-amber-700 font-bold' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>
          </div>
        )}

        {type === 'fraction_pie' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Pembilang (Bagian Terarsir / Diambil):</span>
                <span className="font-mono text-blue-700 font-bold">{params.val1} bagian</span>
              </div>
              <input
                type="range"
                min="0"
                max={params.val2 || 8}
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Penyebut (Total Potongan Sama Besar):</span>
                <span className="font-mono text-slate-800 font-bold">{params.val2} potong</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={params.val2}
                onChange={(e) => {
                  const newDenom = Number(e.target.value);
                  onChangeParams({
                    ...params,
                    val2: newDenom,
                    val1: Math.min(params.val1, newDenom),
                  });
                }}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'linear_function' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Kemiringan Garis / Gradien (m):</span>
                <span className="font-mono text-indigo-700 font-bold">{params.val1}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Konstanta Titik Potong Sumbu-Y (c):</span>
                <span className="font-mono text-amber-700 font-bold">{params.val2}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'quadratic_function' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Koefisien a (Bentuk Kurva):</span>
                <span className="font-mono text-blue-700 font-bold">{params.val1} ({params.val1 > 0 ? 'Senyum / Cekung ke atas' : 'Cemberut / Cekung ke bawah'})</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="1"
                value={params.val1}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVal1(v === 0 ? 1 : v);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Koefisien b (Pergeseran Horizontal):</span>
                <span className="font-mono text-purple-700 font-bold">{params.val2}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Konstanta c (Titik Potong Sumbu Y):</span>
                <span className="font-mono text-emerald-700 font-bold">{params.val3 ?? 0}</span>
              </div>
              <input
                type="range"
                min="-8"
                max="8"
                step="1"
                value={params.val3 ?? 0}
                onChange={(e) => setVal3(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'trigonometry_elevation' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Jarak Pengamat ke Gedung (Mendatar):</span>
                <span className="font-mono text-sky-700 font-bold">{params.val1} {params.unit}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="2"
                value={params.val1}
                onChange={(e) => {
                  const dist = Number(e.target.value);
                  const h = params.val2;
                  const deg = Math.round((Math.atan2(h, dist) * 180) / Math.PI);
                  onChangeParams({ ...params, val1: dist, val3: deg });
                }}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Tinggi Gedung / Menara (Tegak):</span>
                <span className="font-mono text-slate-800 font-bold">{params.val2} {params.unit}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="2"
                value={params.val2}
                onChange={(e) => {
                  const h = Number(e.target.value);
                  const dist = params.val1;
                  const deg = Math.round((Math.atan2(h, dist) * 180) / Math.PI);
                  onChangeParams({ ...params, val2: h, val3: deg });
                }}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'probability_spinner' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Jumlah Juring Target (Peluang Sukses):</span>
                <span className="font-mono text-red-700 font-bold">{params.val1} juring</span>
              </div>
              <input
                type="range"
                min="1"
                max={params.val2 || 8}
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Total Juring Roda:</span>
                <span className="font-mono text-slate-800 font-bold">{params.val2} juring</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={params.val2}
                onChange={(e) => {
                  const tot = Number(e.target.value);
                  onChangeParams({
                    ...params,
                    val2: tot,
                    val1: Math.min(params.val1, tot),
                  });
                }}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>

            {/* Spin action */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onSpinWheel}
                disabled={isSpinning}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                {isSpinning ? 'Roda Sedang Berputar...' : 'Putar Roda Sekarang!'}
              </button>

              {spinResults.length > 0 && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Total Percobaan Putar:</span>
                    <span className="font-mono">{spinResults.length} kali</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Kemunculan Target:</span>
                    <span className="font-mono text-red-600 font-bold">
                      {spinResults.filter((r) => r <= params.val1).length} kali
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Frekuensi Relatif (Empiris):</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {(
                        (spinResults.filter((r) => r <= params.val1).length / spinResults.length) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {type === 'scale_balance' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Koefisien Kotak x (Ruas Kiri):</span>
                <span className="font-mono text-indigo-700 font-bold">{params.val1} kotak</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Konstanta Kelereng (Ruas Kiri):</span>
                <span className="font-mono text-emerald-700 font-bold">{params.val2} kelereng</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Total Beban di Ruas Kanan:</span>
                <span className="font-mono text-slate-800 font-bold">{params.val3} kelereng</span>
              </div>
              <input
                type="range"
                min={params.val2 + 1}
                max="20"
                step="1"
                value={params.val3 ?? 11}
                onChange={(e) => setVal3(Number(e.target.value))}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'angle_geometry' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Besar Sudut α (∠AOC):</span>
                <span className="font-mono text-amber-700 font-bold">{params.val1}°</span>
              </div>
              <input
                type="range"
                min="15"
                max="165"
                step="5"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {type === 'area_perimeter' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Panjang (p):</span>
                <span className="font-mono text-indigo-700 font-bold">{params.val1} {params.unit}</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={params.val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Lebar (l):</span>
                <span className="font-mono text-emerald-700 font-bold">{params.val2} {params.unit}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={params.val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
