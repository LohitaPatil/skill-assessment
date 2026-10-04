/**
 * Reusable Linear and Circular Progress Bar Components
 * Uses tabular numerals and accessible color + text state indicators.
 */

import React from 'react';
import { SkillClassification } from '../utils/evaluation';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  classification?: SkillClassification;
  size?: 'sm' | 'md' | 'lg';
}

export function getClassificationTheme(classification?: SkillClassification): {
  barColor: string;
  textColor: string;
  symbol: string;
  rangeText: string;
} {
  switch (classification) {
    case 'Strong':
      return {
        barColor: 'bg-emerald-600',
        textColor: 'text-emerald-700',
        symbol: '●',
        rangeText: '80–100%',
      };
    case 'Adequate':
      return {
        barColor: 'bg-sky-600',
        textColor: 'text-sky-700',
        symbol: '◆',
        rangeText: '60–79%',
      };
    case 'Developing':
      return {
        barColor: 'bg-amber-600',
        textColor: 'text-amber-700',
        symbol: '▲',
        rangeText: '40–59%',
      };
    case 'Lagging':
      return {
        barColor: 'bg-red-600',
        textColor: 'text-red-700',
        symbol: '■',
        rangeText: '0–39%',
      };
    default:
      return {
        barColor: 'bg-sky-600',
        textColor: 'text-slate-700',
        symbol: '●',
        rangeText: '',
      };
  }
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  showPercentage = true,
  classification,
  size = 'md',
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
  const theme = getClassificationTheme(classification);

  const heightClass = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-3.5' : 'h-2.5';

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showPercentage && (
            <span className="font-mono tabular-nums font-semibold text-slate-900">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-slate-200/80 rounded-full overflow-hidden ${heightClass}`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${heightClass} ${theme.barColor} rounded-full transition-transform duration-200 origin-left`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

interface CircularScoreProps {
  percentage: number;
  classification: SkillClassification;
}

export const CircularScoreIndicator: React.FC<CircularScoreProps> = ({
  percentage,
  classification,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const strokeColor =
    classification === 'Strong'
      ? '#059669'
      : classification === 'Adequate'
      ? '#0284C7'
      : classification === 'Developing'
      ? '#D97706'
      : '#DC2626';

  const theme = getClassificationTheme(classification);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono tabular-nums text-3xl font-bold text-slate-900">
            {clamped}%
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">Overall Score</span>
        </div>
      </div>
      <div className={`mt-2 text-xs font-semibold ${theme.textColor}`}>
        <span aria-hidden="true">{theme.symbol}</span> {classification} Readiness
      </div>
    </div>
  );
};
