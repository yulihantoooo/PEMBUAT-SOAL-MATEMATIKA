import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const AreaPerimeterDiagram: React.FC<Props> = ({ params }) => {
  // Rectangle or Trapezoid
  const length = Math.max(2, params.val1 || 12); // panjang (p)
  const widthVal = Math.max(1, params.val2 || 8); // lebar (l)
  const unit = params.unit || 'cm';

  const area = length * widthVal;
  const perimeter = 2 * (length + widthVal);

  const maxVal = Math.max(length, widthVal);
  const scale = 140 / maxVal;
  const dispW = length * scale;
  const dispH = widthVal * scale;

  const cx = 180;
  const cy = 110;
  const x0 = cx - dispW / 2;
  const y0 = cy - dispH / 2;

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg viewBox="0 0 360 220" className="w-full max-w-[380px] h-auto drop-shadow-xs overflow-visible">
        {/* Grid pattern background inside shape */}
        <defs>
          <pattern id="gridRect" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#e0e7ff" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Rectangle shape */}
        <rect
          x={x0}
          y={y0}
          width={dispW}
          height={dispH}
          fill="url(#gridRect)"
          stroke="#4f46e5"
          strokeWidth="3"
          rx="4"
        />

        {/* Dimension: Length (Top) */}
        <text
          x={cx}
          y={y0 - 12}
          textAnchor="middle"
          className="text-xs font-bold fill-indigo-700 font-mono"
        >
          {params.label1 || 'Panjang (p)'} = {length} {unit}
        </text>

        {/* Dimension: Width (Left) */}
        <text
          x={x0 - 10}
          y={cy + 4}
          textAnchor="end"
          className="text-xs font-bold fill-indigo-700 font-mono"
        >
          {params.label2 || 'Lebar (l)'} = {widthVal} {unit}
        </text>

        {/* Center label */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          className="text-xs font-bold fill-indigo-900"
        >
          Luas = {area} {unit}²
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
        <span className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-mono">
          Luas (L = p × l): <b>{area} {unit}²</b>
        </span>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono">
          Keliling (K = 2(p + l)): <b>{perimeter} {unit}</b>
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Persegi panjang dengan panjang ${length} ${unit} dan lebar ${widthVal} ${unit}`}
      </div>
    </div>
  );
};
