import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
}

export const CircleSectorDiagram: React.FC<Props> = ({ params }) => {
  const r = Math.max(1, params.val1 || 14); // radius
  const angle = Math.min(359.9, Math.max(1, params.val2 || 60)); // central angle in degrees
  const unit = params.unit || 'cm';

  const cx = 180;
  const cy = 140;
  const visualR = 95; // SVG pixel radius

  // Angles in radians
  const startAngle = 0; // along positive x-axis
  const endAngle = (angle * Math.PI) / 180;

  const x1 = cx + visualR * Math.cos(startAngle);
  const y1 = cy - visualR * Math.sin(startAngle);

  const x2 = cx + visualR * Math.cos(endAngle);
  const y2 = cy - visualR * Math.sin(endAngle);

  const largeArcFlag = angle > 180 ? 1 : 0;
  const sectorPath = `M ${cx} ${cy} L ${x1} ${y1} A ${visualR} ${visualR} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`;

  // Calculated values
  const sectorArea = ((angle / 360) * Math.PI * r * r).toFixed(1);
  const arcLength = (((angle / 360) * 2 * Math.PI * r)).toFixed(1);

  // Angle arc indicator
  const arcIndicatorR = 30;
  const ax1 = cx + arcIndicatorR * Math.cos(startAngle);
  const ay1 = cy - arcIndicatorR * Math.sin(startAngle);
  const ax2 = cx + arcIndicatorR * Math.cos(endAngle);
  const ay2 = cy - arcIndicatorR * Math.sin(endAngle);
  const angleIndicatorPath = `M ${ax1} ${ay1} A ${arcIndicatorR} ${arcIndicatorR} 0 ${largeArcFlag} 0 ${ax2} ${ay2}`;

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg
        viewBox="0 0 360 270"
        className="w-full max-w-[380px] h-auto drop-shadow-xs overflow-visible"
      >
        <defs>
          <pattern id="gridCircle" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#f8fafc" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="360" height="270" fill="url(#gridCircle)" rx="12" />

        {/* Full Circle Outline */}
        <circle
          cx={cx}
          cy={cy}
          r={visualR}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Highlighted Sector */}
        <path
          d={sectorPath}
          fill="rgba(245, 158, 11, 0.22)"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Highlighted Arc Curve */}
        <path
          d={`M ${x1} ${y1} A ${visualR} ${visualR} 0 ${largeArcFlag} 0 ${x2} ${y2}`}
          fill="none"
          stroke="#ea580c"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Center Point O */}
        <circle cx={cx} cy={cy} r="4" fill="#1e293b" />
        <text x={cx - 16} y={cy + 16} className="text-xs font-bold fill-slate-700">O</text>

        {/* Vertex A and B */}
        <circle cx={x1} cy={y1} r="3.5" fill="#ea580c" />
        <circle cx={x2} cy={y2} r="3.5" fill="#ea580c" />
        <text x={x1 + 10} y={y1 + 4} className="text-xs font-bold fill-slate-700">A</text>
        <text x={x2 + (Math.cos(endAngle) < 0 ? -14 : 10)} y={y2 + (Math.sin(endAngle) < 0 ? 14 : -8)} className="text-xs font-bold fill-slate-700">B</text>

        {/* Angle indicator */}
        <path
          d={angleIndicatorPath}
          fill="none"
          stroke="#d97706"
          strokeWidth="1.5"
        />
        <text
          x={cx + (arcIndicatorR + 15) * Math.cos(endAngle / 2)}
          y={cy - (arcIndicatorR + 15) * Math.sin(endAngle / 2) + 4}
          textAnchor="middle"
          className="text-xs font-bold fill-amber-700"
        >
          {angle}°
        </text>

        {/* Radius label */}
        <text
          x={cx + visualR / 2}
          y={cy + 16}
          textAnchor="middle"
          className="text-xs font-bold fill-indigo-700 font-mono"
        >
          r = {r} {unit}
        </text>

        {/* Busur label */}
        <text
          x={cx + (visualR + 18) * Math.cos(endAngle / 2)}
          y={cy - (visualR + 18) * Math.sin(endAngle / 2)}
          textAnchor="middle"
          className="text-xs font-semibold fill-orange-700 font-mono"
        >
          Busur AB
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-slate-600">
        <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
          Luas Juring: <b>{sectorArea}</b> {unit}²
        </span>
        <span className="bg-orange-50 px-2 py-0.5 rounded border border-orange-200 font-mono">
          Panjang Busur: <b>{arcLength}</b> {unit}
        </span>
      </div>
      <div className="text-center text-xs font-medium text-slate-500 mt-1">
        {params.caption || `Juring lingkaran dengan sudut pusat ${angle}° dan jari-jari ${r} ${unit}`}
      </div>
    </div>
  );
};
