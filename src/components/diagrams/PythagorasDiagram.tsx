import React from 'react';
import { DiagramParams } from '../../types';

interface Props {
  params: DiagramParams;
  interactive?: boolean;
}

export const PythagorasDiagram: React.FC<Props> = ({ params }) => {
  const a = Math.max(1, params.val1 || 6); // alas
  const b = Math.max(1, params.val2 || 8); // tinggi
  const c = Math.sqrt(a * a + b * b); // hipotenusa
  const unit = params.unit || 'cm';
  const showProof = Boolean(params.showProof);

  // SVG viewbox layout
  const padding = showProof ? 110 : 60;
  const maxDim = Math.max(a, b);
  const scale = 140 / maxDim;

  const w = a * scale;
  const h = b * scale;

  // Origin at right angle corner (X0, Y0)
  const x0 = padding + (showProof ? 40 : 20);
  const y0 = 240;

  // Triangle vertices:
  // Corner C (right angle): (x0, y0)
  // Vertex B (along base to the right): (x0 + w, y0)
  // Vertex A (along height upwards): (x0, y0 - h)
  const Ax = x0;
  const Ay = y0 - h;
  const Bx = x0 + w;
  const By = y0;
  const Cx = x0;
  const Cy = y0;

  // Right-angle square mark
  const sqSize = Math.min(16, Math.min(w, h) * 0.25);

  return (
    <div className="flex flex-col items-center justify-center p-2 select-none">
      <svg
        viewBox="0 0 380 300"
        className="w-full max-w-[400px] h-auto drop-shadow-xs overflow-visible"
      >
        <defs>
          <pattern id="gridPythagoras" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#f1f5f9" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="380" height="300" fill="url(#gridPythagoras)" rx="12" />

        {/* Visual Proof Squares: a^2, b^2, c^2 */}
        {showProof && (
          <g className="transition-all duration-300">
            {/* Square on base a (below base) */}
            <rect
              x={Cx}
              y={Cy}
              width={w}
              height={w}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text
              x={Cx + w / 2}
              y={Cy + w / 2 + 5}
              textAnchor="middle"
              className="text-xs font-bold fill-blue-600"
            >
              a² = {Math.round(a * a)}
            </text>

            {/* Square on height b (to the left) */}
            <rect
              x={Cx - h}
              y={Ay}
              width={h}
              height={h}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text
              x={Cx - h / 2}
              y={Ay + h / 2 + 5}
              textAnchor="middle"
              className="text-xs font-bold fill-emerald-600"
            >
              b² = {Math.round(b * b)}
            </text>
          </g>
        )}

        {/* Right-angle marker */}
        <polyline
          points={`${Cx},${Cy - sqSize} ${Cx + sqSize},${Cy - sqSize} ${Cx + sqSize},${Cy}`}
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <circle cx={Cx + sqSize / 2} cy={Cy - sqSize / 2} r="1.5" fill="#475569" />

        {/* Triangle Body */}
        <polygon
          points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
          fill="rgba(99, 102, 241, 0.12)"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Vertex dots */}
        <circle cx={Ax} cy={Ay} r="4" fill="#4338ca" />
        <circle cx={Bx} cy={By} r="4" fill="#4338ca" />
        <circle cx={Cx} cy={Cy} r="4" fill="#4338ca" />

        {/* Labels for vertices */}
        <text x={Ax - 14} y={Ay - 6} className="text-xs font-bold fill-slate-700">A</text>
        <text x={Bx + 10} y={By + 6} className="text-xs font-bold fill-slate-700">B</text>
        <text x={Cx - 14} y={Cy + 14} className="text-xs font-bold fill-slate-700">C</text>

        {/* Dimension: Base a (bottom) */}
        <g>
          <text
            x={Cx + w / 2}
            y={Cy + 22}
            textAnchor="middle"
            className="text-xs font-semibold fill-blue-700 font-mono"
          >
            {params.label1 || 'alas (a)'} = {a} {unit}
          </text>
        </g>

        {/* Dimension: Height b (left) */}
        <g>
          <text
            x={Cx - 12}
            y={Cy - h / 2}
            textAnchor="end"
            className="text-xs font-semibold fill-emerald-700 font-mono"
          >
            {params.label2 || 'tinggi (b)'} = {b} {unit}
          </text>
        </g>

        {/* Dimension: Hypotenuse c (slanted) */}
        <g>
          <text
            x={(Ax + Bx) / 2 + 16}
            y={(Ay + By) / 2 - 10}
            textAnchor="middle"
            className="text-xs font-bold fill-purple-700 font-mono"
          >
            {params.label3 || 'sisi miring (c)'} = {Number.isInteger(c) ? c : c.toFixed(2)} {unit}
          </text>
        </g>
      </svg>
      <div className="mt-2 text-center text-xs font-medium text-slate-500">
        {params.caption || `Segitiga Siku-siku ABC di titik C: $c = \\sqrt{a^2 + b^2}$`}
      </div>
    </div>
  );
};
