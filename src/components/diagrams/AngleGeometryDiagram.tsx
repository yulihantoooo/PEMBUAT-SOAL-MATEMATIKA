import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const AngleGeometryDiagram: React.FC<Props> = ({ params }) => {
  const angleAlpha = Math.min(170, Math.max(10, params.val1 || 115));
  const angleBeta = 180 - angleAlpha;

  const width = 360;
  const height = 220;
  const cx = 180;
  const cy = 160;
  const lineLen = 140;

  // Base straight line (straight angle 180 deg)
  const xLeft = cx - lineLen;
  const xRight = cx + lineLen;

  // Ray at angleAlpha measured from right ray (0 deg) counter-clockwise
  const rad = (angleAlpha * Math.PI) / 180;
  const rayX = cx + lineLen * Math.cos(Math.PI - rad);
  const rayY = cy - lineLen * Math.sin(Math.PI - rad);

  // Arcs for angles
  const arcR1 = 45;
  const arcR2 = 35;

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[380px] h-auto drop-shadow-xs overflow-visible">
        {/* Straight baseline AB */}
        <line x1={xLeft} y1={cy} x2={xRight} y2={cy} stroke="#334155" strokeWidth="3" strokeLinecap="round" />

        {/* Center vertex O */}
        <circle cx={cx} cy={cy} r="4.5" fill="#0f172a" />
        <text x={cx - 5} y={cy + 18} className="text-xs font-bold fill-slate-700">O</text>

        {/* Slanted Ray OC */}
        <line x1={cx} y1={cy} x2={rayX} y2={rayY} stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx={rayX} cy={rayY} r="4" fill="#2563eb" />
        <text x={rayX + 8} y={rayY - 4} className="text-xs font-bold fill-blue-700">C</text>

        {/* Ray A and B end labels */}
        <text x={xLeft - 15} y={cy + 4} className="text-xs font-bold fill-slate-700">A</text>
        <text x={xRight + 8} y={cy + 4} className="text-xs font-bold fill-slate-700">B</text>

        {/* Angle Beta (Right side: ∠BOC) */}
        <path
          d={`M ${cx + arcR2} ${cy} A ${arcR2} ${arcR2} 0 0 0 ${cx + arcR2 * Math.cos(Math.PI - rad)} ${cy - arcR2 * Math.sin(Math.PI - rad)}`}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text
          x={cx + (arcR2 + 16) * Math.cos((Math.PI - rad) / 2)}
          y={cy - (arcR2 + 14) * Math.sin((Math.PI - rad) / 2)}
          textAnchor="middle"
          className="text-xs font-bold fill-blue-700 font-mono"
        >
          {angleBeta}°
        </text>

        {/* Angle Alpha (Left side: ∠AOC) */}
        <path
          d={`M ${cx + arcR1 * Math.cos(Math.PI - rad)} ${cy - arcR1 * Math.sin(Math.PI - rad)} A ${arcR1} ${arcR1} 0 0 0 ${cx - arcR1} ${cy}`}
          fill="rgba(245, 158, 11, 0.18)"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text
          x={cx - (arcR1 + 18) * 0.6}
          y={cy - (arcR1 + 18) * 0.7}
          textAnchor="middle"
          className="text-xs font-bold fill-amber-700 font-mono"
        >
          {angleAlpha}°
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
        <span className="bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono">
          ∠AOC = <b>{angleAlpha}°</b>
        </span>
        <span className="bg-blue-50 border border-blue-200 text-blue-900 px-2 py-0.5 rounded font-mono">
          ∠BOC = <b>{angleBeta}°</b>
        </span>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
          Sudut Berpelurus: {angleAlpha}° + {angleBeta}° = 180°
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Dua sudut yang saling berpelurus (suplemen) memiliki jumlah 180°`}
      </div>
    </div>
  );
};
