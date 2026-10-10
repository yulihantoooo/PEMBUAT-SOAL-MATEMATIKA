import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const FractionPieDiagram: React.FC<Props> = ({ params }) => {
  const numerator = Math.max(0, Math.min(params.val2 || 8, params.val1 || 3)); // pembilang
  const denominator = Math.max(1, params.val2 || 8); // penyebut

  const cx = 130;
  const cy = 130;
  const r = 90;

  // Create slices for the pie
  const slices = [];
  const sliceAngle = (2 * Math.PI) / denominator;

  for (let i = 0; i < denominator; i++) {
    const startA = i * sliceAngle - Math.PI / 2;
    const endA = (i + 1) * sliceAngle - Math.PI / 2;

    const x1 = cx + r * Math.cos(startA);
    const y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy + r * Math.sin(endA);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const isShaded = i < numerator;
    slices.push(
      <path
        key={i}
        d={d}
        fill={isShaded ? '#3b82f6' : '#f1f5f9'}
        stroke="#ffffff"
        strokeWidth="2.5"
        className="transition-colors duration-200"
      />
    );
  }

  const decimalVal = (numerator / denominator).toFixed(3);
  const percentageVal = ((numerator / denominator) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        {/* Pie Diagram */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 260 260" className="w-52 h-52 drop-shadow-xs">
            <circle cx={cx} cy={cy} r={r} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            {slices}
            <circle cx={cx} cy={cy} r="5" fill="#1e293b" />
          </svg>
          <span className="text-xs font-semibold text-slate-500 mt-1">Model Lingkaran</span>
        </div>

        {/* Fraction Bar & Stats */}
        <div className="flex flex-col gap-3 min-w-[160px]">
          <div>
            <span className="text-xs font-semibold text-slate-500 mb-1 block">Model Pita Pecahan:</span>
            <div className="flex w-full h-8 border-2 border-slate-300 rounded-md overflow-hidden bg-slate-100 shadow-xs">
              {Array.from({ length: denominator }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 border-r last:border-r-0 border-white flex items-center justify-center text-[10px] font-bold ${
                    i < numerator ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  1/{denominator}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Nilai Pecahan:</span>
              <span className="font-bold text-blue-700 text-base font-mono">
                {numerator} / {denominator}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Bentuk Desimal:</span>
              <span className="font-mono text-slate-800">{decimalVal}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Persentase:</span>
              <span className="font-mono text-emerald-700 font-bold">{percentageVal}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-2">
        {params.caption || `Pecahan visual: ${numerator} bagian terarsir dari total ${denominator} bagian sama besar`}
      </div>
    </div>
  );
};
