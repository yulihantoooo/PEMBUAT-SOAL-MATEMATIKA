import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const TrigonometryDiagram: React.FC<Props> = ({ params }) => {
  const distance = Math.max(1, params.val1 || 30); // jarak mendatar (m)
  const height = Math.max(1, params.val2 || 40); // tinggi gedung/tiang (m)
  const angleDeg = params.val3 || Math.round((Math.atan2(height, distance) * 180) / Math.PI);
  const unit = params.unit || 'm';

  // SVG coordinates
  const svgW = 380;
  const svgH = 260;
  const groundY = 220;
  const observerX = 50;

  // Building position
  const maxW = 260;
  const maxH = 160;
  const ratio = Math.max(distance, height);
  const scale = Math.min(maxW / distance, maxH / height);

  const displayDist = distance * scale;
  const displayHeight = height * scale;
  const buildingX = observerX + displayDist;
  const buildingTopY = groundY - displayHeight;

  // Hypotenuse line of sight
  const hypotenuse = Math.sqrt(distance * distance + height * height).toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[400px] h-auto drop-shadow-xs overflow-visible">
        {/* Sky background */}
        <rect x="0" y="0" width={svgW} height={groundY} fill="#f0f9ff" rx="10" />

        {/* Ground */}
        <rect x="0" y={groundY} width={svgW} height={svgH - groundY} fill="#e2e8f0" rx="4" />
        <line x1="0" y1={groundY} x2={svgW} y2={groundY} stroke="#64748b" strokeWidth="2.5" />

        {/* Building / Lighthouse */}
        <g>
          {/* Base structure */}
          <rect
            x={buildingX - 10}
            y={buildingTopY}
            width="50"
            height={displayHeight}
            fill="#334155"
            rx="4"
          />
          {/* Windows on building */}
          {Array.from({ length: Math.min(6, Math.floor(displayHeight / 25)) }).map((_, i) => (
            <rect
              key={i}
              x={buildingX}
              y={buildingTopY + 12 + i * 24}
              width="30"
              height="14"
              fill="#fbbf24"
              rx="2"
            />
          ))}
          {/* Beacon / antenna at top */}
          <circle cx={buildingX + 15} cy={buildingTopY - 4} r="5" fill="#ef4444" />
          <line
            x1={buildingX + 15}
            y1={buildingTopY - 4}
            x2={buildingX + 15}
            y2={buildingTopY}
            stroke="#ef4444"
            strokeWidth="3"
          />
        </g>

        {/* Observer (Stick figure / Eye) */}
        <g transform={`translate(${observerX}, ${groundY - 32})`}>
          <circle cx="0" cy="0" r="7" fill="#0284c7" />
          <line x1="0" y1="7" x2="0" y2="24" stroke="#0284c7" strokeWidth="3" />
          <line x1="0" y1="24" x2="-6" y2="34" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="0" y1="24" x2="6" y2="34" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="-8" y1="14" x2="8" y2="14" stroke="#0284c7" strokeWidth="2.5" />
          {/* Telescope / eye ray indicator */}
          <circle cx="4" cy="-2" r="2.5" fill="#ffffff" />
        </g>

        {/* Right-angle marker at base */}
        <polyline
          points={`${buildingX - 16},${groundY} ${buildingX - 16},${groundY - 16} ${buildingX},${groundY - 16}`}
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Line of Sight (Hypotenuse) */}
        <line
          x1={observerX}
          y1={groundY}
          x2={buildingX}
          y2={buildingTopY}
          stroke="#ef4444"
          strokeWidth="3"
          strokeDasharray="6 3"
        />

        {/* Elevation Angle arc */}
        <path
          d={`M ${observerX + 32} ${groundY} A 32 32 0 0 0 ${observerX + 32 * Math.cos((angleDeg * Math.PI) / 180)} ${
            groundY - 32 * Math.sin((angleDeg * Math.PI) / 180)
          }`}
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
        />
        <text
          x={observerX + 42}
          y={groundY - 10}
          className="text-xs font-bold fill-orange-700"
        >
          {angleDeg}°
        </text>

        {/* Distance label (Base) */}
        <text
          x={(observerX + buildingX) / 2}
          y={groundY + 18}
          textAnchor="middle"
          className="text-xs font-bold fill-sky-800 font-mono"
        >
          Jarak = {distance} {unit}
        </text>

        {/* Height label */}
        <text
          x={buildingX + 48}
          y={buildingTopY + displayHeight / 2}
          className="text-xs font-bold fill-slate-800 font-mono"
        >
          Tinggi = {height} {unit}
        </text>

        {/* Slanted distance */}
        <text
          x={(observerX + buildingX) / 2 - 14}
          y={(groundY + buildingTopY) / 2 - 12}
          textAnchor="middle"
          className="text-[11px] font-semibold fill-red-700 font-mono"
        >
          c ≈ {hypotenuse} {unit}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
        <span className="bg-sky-50 border border-sky-200 text-sky-900 px-2 py-0.5 rounded font-mono">
          Jarak: <b>{distance} {unit}</b>
        </span>
        <span className="bg-slate-100 border border-slate-300 text-slate-900 px-2 py-0.5 rounded font-mono">
          Tinggi Gedung: <b>{height} {unit}</b>
        </span>
        <span className="bg-orange-50 border border-orange-200 text-orange-900 px-2 py-0.5 rounded font-mono">
          Sudut Elevasi: <b>{angleDeg}°</b> (tan {angleDeg}° = {Math.tan((angleDeg * Math.PI) / 180).toFixed(3)})
        </span>
      </div>

      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Pengamat melihat puncak gedung dengan sudut elevasi ${angleDeg}°`}
      </div>
    </div>
  );
};
