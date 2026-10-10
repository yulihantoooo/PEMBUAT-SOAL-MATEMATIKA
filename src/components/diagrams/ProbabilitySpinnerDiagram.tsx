import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
  currentRotation?: number;
  isSpinning?: boolean;
}

export const ProbabilitySpinnerDiagram: React.FC<Props> = ({
  params,
  currentRotation = 0,
  isSpinning = false,
}) => {
  const totalSectors = Math.max(2, Math.min(12, params.val2 || 8)); // total sections
  const targetSector = Math.max(1, Math.min(totalSectors, params.val1 || 2)); // winning / target sections count

  const cx = 150;
  const cy = 150;
  const r = 100;

  // Pre-defined sector colors
  const colorPalette = [
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#14b8a6', // Teal
    '#6366f1', // Indigo
    '#84cc16', // Lime
    '#e11d48', // Rose
  ];

  const sliceAngle = 360 / totalSectors;
  const slices = [];

  for (let i = 0; i < totalSectors; i++) {
    const startA = (i * sliceAngle * Math.PI) / 180;
    const endA = ((i + 1) * sliceAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startA);
    const y1 = cy + r * Math.sin(startA);
    const x2 = cx + r * Math.cos(endA);
    const y2 = cy + r * Math.sin(endA);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midA = ((i + 0.5) * sliceAngle * Math.PI) / 180;
    const textR = r * 0.65;
    const tx = cx + textR * Math.cos(midA);
    const ty = cy + textR * Math.sin(midA) + 4;

    const isTarget = i < targetSector;
    const fillColor = isTarget ? colorPalette[0] : colorPalette[(i % (colorPalette.length - 1)) + 1];

    slices.push(
      <g key={i}>
        <path d={d} fill={fillColor} stroke="#ffffff" strokeWidth="2.5" />
        <text
          x={tx}
          y={ty}
          textAnchor="middle"
          fill="#ffffff"
          className="text-xs font-bold font-mono"
        >
          {i + 1}
        </text>
      </g>
    );
  }

  const theoreticalProbability = (targetSector / totalSectors).toFixed(3);
  const percentage = ((targetSector / totalSectors) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Top Pointer arrow */}
        <div className="absolute top-1 z-20 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-red-600 drop-shadow-md" />
        </div>

        {/* Rotating Wheel */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-md"
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
          }}
        >
          {slices}
          <circle cx={cx} cy={cy} r="16" fill="#1e293b" stroke="#ffffff" strokeWidth="3" />
          <circle cx={cx} cy={cy} r="6" fill="#f8fafc" />
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
        <span className="bg-red-50 border border-red-200 text-red-800 px-2.5 py-1 rounded font-mono">
          Juring Target (Merah): <b>{targetSector}</b> dari <b>{totalSectors}</b>
        </span>
        <span className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-2.5 py-1 rounded font-mono font-bold">
          P(A) = {targetSector}/{totalSectors} = {theoreticalProbability} ({percentage}%)
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Roda putar peluang terbagi menjadi ${totalSectors} juring kongruen`}
      </div>
    </div>
  );
};
