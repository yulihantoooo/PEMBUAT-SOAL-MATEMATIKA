import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', inline = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!content) {
      containerRef.current.innerHTML = '';
      return;
    }

    try {
      // Split content by LaTeX delimiters: $$...$$ (block) and $...$ (inline)
      // Regex matches $$...$$ or $...$
      const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g;
      const parts = content.split(regex);

      containerRef.current.innerHTML = '';

      parts.forEach((part) => {
        if (!part) return;

        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          const span = document.createElement('div');
          span.className = 'my-2 overflow-x-auto text-center py-1';
          try {
            katex.render(math, span, { displayMode: true, throwOnError: false });
          } catch {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1).trim();
          const span = document.createElement('span');
          span.className = 'inline-block px-0.5';
          try {
            katex.render(math, span, { displayMode: false, throwOnError: false });
          } catch {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else {
          // Regular text
          const span = document.createElement('span');
          span.textContent = part;
          containerRef.current?.appendChild(span);
        }
      });
    } catch {
      if (containerRef.current) {
        containerRef.current.textContent = content;
      }
    }
  }, [content]);

  return <span ref={containerRef} className={`math-content ${inline ? 'inline' : 'block'} ${className}`} />;
};

export const FormulaBadge: React.FC<{ formula: string; label?: string }> = ({ formula, label }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-950 font-mono text-sm shadow-xs">
      {label && <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{label}:</span>}
      <MathRenderer content={`$${formula}$`} inline />
    </div>
  );
};
