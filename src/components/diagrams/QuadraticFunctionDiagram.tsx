import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const QuadraticFunctionDiagram: React.FC<Props> = ({ params }) => {
  const a = params.val1 === 0 ? 1 : (params.val1 ?? 1); // a != 0
  const b = params.val2 ?? -2;
  const c = params.val3 ?? -3;

  // Parabola properties
  // Vertex: x_v = -b / (2a), y_v = c - b^2 / (4a)
  const D = b * b - 4 * a * c;
  const xv = -b / (2 * a);
  const yv = -D / (4 * a);

  // SVG dimensions
  const width = 340;
  const height = 280;
  const originX = width / 2;
  const originY = height / 2 + 20;
  const scale = 18; // px per math unit

  // Generate path points for parabola
  const points: [number, number][] = [];
  const minX = -6;
  const maxX = 6;
  const step = 0.2;

  for (let x = minX; x <= maxX; x += step) {
    const y = a * x * x + b * x + c;
    const px = originX + x * scale;
    const py = originY - y * scale;
    points.push([px, py]);
  }

  const pathD = points.reduce((acc, [px, py], idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
  }, '');

  // Vertex SVG coordinates
  const vertexPx = originX + xv * scale;
  const vertexPy = originY - yv * scale;

  // Real roots if D >= 0
  const roots: number[] = [];
  if (D >= 0) {
    const sqrtD = Math.sqrt(D);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    roots.push(r1, r2);
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[360px] h-auto drop-shadow-xs bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        {/* Axes */}
        <line x1={10} y1={originY} x2={width - 10} y2={originY} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={originX} y1={10} x2={originX} y2={height - 10} stroke="#94a3b8" strokeWidth="1.5" />

        {/* Axis of symmetry */}
        <line
          x1={vertexPx}
          y1={10}
          x2={vertexPx}
          y2={height - 10}
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Parabola curve */}
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

        {/* Roots on x-axis */}
        {roots.map((r, i) => {
          const rPx = originX + r * scale;
          return (
            <g key={`root-${i}`}>
              <circle cx={rPx} cy={originY} r="4" fill="#10b981" />
              <text
                x={rPx}
                y={originY + (a > 0 ? 14 : -8)}
                textAnchor="middle"
                className="text-[10px] font-bold fill-emerald-800 font-mono"
              >
                x={r.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Vertex Point */}
        <circle cx={vertexPx} cy={vertexPy} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        <text
          x={vertexPx + (xv > 0 ? -12 : 12)}
          y={vertexPy + (a > 0 ? 16 : -10)}
          textAnchor={xv > 0 ? 'end' : 'start'}
          className="text-[10px] font-bold fill-red-700 bg-white"
        >
          Puncak ({xv.toFixed(1)}, {yv.toFixed(1)})
        </text>

        {/* Labels */}
        <text x={width - 16} y={originY - 6} className="text-xs font-bold fill-slate-700">X</text>
        <text x={originX + 8} y={20} className="text-xs font-bold fill-slate-700">Y</text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 text-blue-900 px-2 py-0.5 rounded font-mono font-bold">
          f(x) = {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}
        </span>
        <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded font-mono">
          Titik Puncak: ({xv.toFixed(1)}, {yv.toFixed(1)})
        </span>
        <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded font-mono">
          D = {D} ({D > 0 ? '2 Akar Nyata' : D === 0 ? '1 Akar Kembar' : 'Tidak Ada Akar Nyata'})
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Kurva parabola membuka ke ${a > 0 ? 'atas' : 'bawah'} dengan sumbu simetri x = ${xv.toFixed(1)}`}
      </div>
    </div>
  );
};
