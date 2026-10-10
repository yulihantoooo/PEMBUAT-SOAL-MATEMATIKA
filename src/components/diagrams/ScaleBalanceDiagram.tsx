import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const ScaleBalanceDiagram: React.FC<Props> = ({ params }) => {
  // Linear equation: a * x + b = c
  // e.g., 2x + 3 = 11 -> x = 4
  const a = Math.max(1, params.val1 || 2); // jumlah kotak x di kiri
  const b = Math.max(0, params.val2 || 3); // jumlah kelereng di kiri
  const c = Math.max(1, params.val3 || 11); // jumlah kelereng di kanan
  const targetX = (c - b) / a;

  const svgW = 380;
  const svgH = 240;

  // Fulcrum & Beam
  const fulcrumX = svgW / 2;
  const fulcrumY = 160;
  const beamY = 70;
  const beamLeftX = 70;
  const beamRightX = 310;

  // Tilt angle: if left weight != right weight, slight tilt, but if balanced, tilt = 0
  const tilt = 0; // neutral balanced state

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[390px] h-auto drop-shadow-xs overflow-visible">
        {/* Base Stand */}
        <polygon
          points={`${fulcrumX},${beamY + 10} ${fulcrumX - 35},${fulcrumY + 40} ${fulcrumX + 35},${fulcrumY + 40}`}
          fill="#475569"
        />
        <rect x={fulcrumX - 55} y={fulcrumY + 38} width="110" height="12" fill="#334155" rx="3" />
        <circle cx={fulcrumX} cy={beamY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

        {/* Balance Beam */}
        <line
          x1={beamLeftX}
          y1={beamY + tilt}
          x2={beamRightX}
          y2={beamY - tilt}
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left Pan Strings & Pan */}
        <line x1={beamLeftX} y1={beamY + tilt} x2={beamLeftX - 35} y2={beamY + 65} stroke="#94a3b8" strokeWidth="2" />
        <line x1={beamLeftX} y1={beamY + tilt} x2={beamLeftX + 35} y2={beamY + 65} stroke="#94a3b8" strokeWidth="2" />
        <path
          d={`M ${beamLeftX - 45} ${beamY + 65} Q ${beamLeftX} ${beamY + 80} ${beamLeftX + 45} ${beamY + 65} Z`}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />

        {/* Left Pan Items: 'a' number of [x] boxes + 'b' marbles */}
        <g transform={`translate(${beamLeftX - 35}, ${beamY + 36})`}>
          {/* Variable boxes */}
          {Array.from({ length: Math.min(4, a) }).map((_, i) => (
            <g key={`x-${i}`} transform={`translate(${i * 20}, 0)`}>
              <rect x="0" y="0" width="18" height="18" fill="#4f46e5" rx="3" />
              <text x="9" y="13" textAnchor="middle" fill="#ffffff" className="text-[11px] font-bold font-mono">
                x
              </text>
            </g>
          ))}
          {/* Constant marbles */}
          {Array.from({ length: Math.min(6, b) }).map((_, i) => (
            <circle
              key={`b-${i}`}
              cx={10 + (i % 3) * 12}
              cy={24}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Right Pan Strings & Pan */}
        <line x1={beamRightX} y1={beamY - tilt} x2={beamRightX - 35} y2={beamY + 65} stroke="#94a3b8" strokeWidth="2" />
        <line x1={beamRightX} y1={beamY - tilt} x2={beamRightX + 35} y2={beamY + 65} stroke="#94a3b8" strokeWidth="2" />
        <path
          d={`M ${beamRightX - 45} ${beamY + 65} Q ${beamRightX} ${beamY + 80} ${beamRightX + 45} ${beamY + 65} Z`}
          fill="#cbd5e1"
          stroke="#64748b"
          strokeWidth="2"
        />

        {/* Right Pan Items: 'c' marbles */}
        <g transform={`translate(${beamRightX - 35}, ${beamY + 36})`}>
          {Array.from({ length: Math.min(15, c) }).map((_, i) => (
            <circle
              key={`c-${i}`}
              cx={6 + (i % 5) * 12}
              cy={8 + Math.floor(i / 5) * 10}
              r="4.5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Equation Labels under pans */}
        <text
          x={beamLeftX}
          y={beamY + 105}
          textAnchor="middle"
          className="text-xs font-bold fill-indigo-800 font-mono"
        >
          {a > 1 ? `${a}x` : 'x'} + {b}
        </text>

        <text
          x={fulcrumX}
          y={beamY + 105}
          textAnchor="middle"
          className="text-base font-bold fill-slate-700"
        >
          =
        </text>

        <text
          x={beamRightX}
          y={beamY + 105}
          textAnchor="middle"
          className="text-xs font-bold fill-emerald-800 font-mono"
        >
          {c}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
        <span className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-2.5 py-1 rounded font-mono font-bold">
          Persamaan: {a > 1 ? `${a}x` : 'x'} + {b} = {c}
        </span>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-2.5 py-1 rounded font-mono font-bold">
          Solusi: x = ({c} - {b}) / {a} = {Number.isInteger(targetX) ? targetX : targetX.toFixed(2)}
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Neraca timbangan seimbang: kedua ruas memiliki bobot yang sama`}
      </div>
    </div>
  );
};
