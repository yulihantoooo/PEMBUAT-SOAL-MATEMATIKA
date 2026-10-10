import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const LinearFunctionDiagram: React.FC<Props> = ({ params }) => {
  const m = params.val1 ?? 2; // gradien m
  const c = params.val2 ?? -1; // titik potong c

  // Coordinate system
  // SVG size 340 x 280
  const width = 340;
  const height = 280;
  const originX = width / 2;
  const originY = height / 2;
  const scale = 20; // 20px per grid unit

  // Generate grid lines
  const gridLines = [];
  const minUnitX = -7;
  const maxUnitX = 7;
  const minUnitY = -6;
  const maxUnitY = 6;

  for (let x = minUnitX; x <= maxUnitX; x++) {
    const px = originX + x * scale;
    gridLines.push(
      <line
        key={`vx-${x}`}
        x1={px}
        y1={10}
        x2={px}
        y2={height - 10}
        stroke={x === 0 ? '#475569' : '#e2e8f0'}
        strokeWidth={x === 0 ? 2 : 1}
      />
    );
  }

  for (let y = minUnitY; y <= maxUnitY; y++) {
    const py = originY - y * scale;
    gridLines.push(
      <line
        key={`hy-${y}`}
        x1={10}
        y1={py}
        x2={width - 10}
        y2={py}
        stroke={y === 0 ? '#475569' : '#e2e8f0'}
        strokeWidth={y === 0 ? 2 : 1}
      />
    );
  }

  // Calculate endpoints of the line within grid range: x in [-7, 7]
  const xLeft = minUnitX - 1;
  const yLeft = m * xLeft + c;
  const xRight = maxUnitX + 1;
  const yRight = m * xRight + c;

  const px1 = originX + xLeft * scale;
  const py1 = originY - yLeft * scale;
  const px2 = originX + xRight * scale;
  const py2 = originY - yRight * scale;

  // Key points:
  // (0, c)
  const yInterceptPx = originX;
  const yInterceptPy = originY - c * scale;

  // (1, m + c)
  const point1Px = originX + 1 * scale;
  const point1Py = originY - (m + c) * scale;

  // Slope triangle between (0, c) and (1, m + c)
  const slopeTriangle = (
    <g>
      {/* horizontal run = 1 */}
      <line
        x1={yInterceptPx}
        y1={yInterceptPy}
        x2={point1Px}
        y2={yInterceptPy}
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
      {/* vertical rise = m */}
      <line
        x1={point1Px}
        y1={yInterceptPy}
        x2={point1Px}
        y2={point1Py}
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
    </g>
  );

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[360px] h-auto drop-shadow-xs bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        {/* Grid */}
        {gridLines}

        {/* Slope triangle */}
        {slopeTriangle}

        {/* The Line y = mx + c */}
        <line
          x1={px1}
          y1={py1}
          x2={px2}
          y2={py2}
          stroke="#4f46e5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Y-intercept Point (0, c) */}
        <circle cx={yInterceptPx} cy={yInterceptPy} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
        <text
          x={yInterceptPx + 8}
          y={yInterceptPy - 6}
          className="text-[11px] font-bold fill-amber-700 bg-white"
        >
          (0, {c})
        </text>

        {/* Second point (1, m+c) */}
        <circle cx={point1Px} cy={point1Py} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />

        {/* Axis Labels */}
        <text x={width - 16} y={originY - 6} className="text-xs font-bold fill-slate-700">X</text>
        <text x={originX + 8} y={18} className="text-xs font-bold fill-slate-700">Y</text>
        <text x={originX - 12} y={originY + 14} className="text-[10px] font-bold fill-slate-500">0</text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
        <span className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-mono font-bold">
          Persamaan: y = {m !== 1 ? (m === -1 ? '-' : m) : ''}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}
        </span>
        <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded font-mono">
          Gradien (m): <b>{m}</b>
        </span>
        <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded font-mono">
          Titik Potong-Y: <b>(0, {c})</b>
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Grafik garis lurus dengan kemiringan gradien m = ${m} dan konstanta c = ${c}`}
      </div>
    </div>
  );
};
