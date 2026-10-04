/**
 * Reusable Skill Result Card Component
 * Displays skill percentage, semantic classification (Strong / Adequate / Developing / Lagging),
 * progress bar, and prior learning confidence calibration.
 */

import React from 'react';
import { SkillScoreBreakdown } from '../utils/evaluation';
import { ProgressBar, getClassificationTheme } from './ProgressBar';

interface ResultCardProps {
  skillScore: SkillScoreBreakdown;
}

export const ResultCard: React.FC<ResultCardProps> = ({ skillScore }) => {
  const theme = getClassificationTheme(skillScore.classification);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
      <div>
        {/* Unboxed Metadata Line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
          <span>
            {skillScore.category} · {skillScore.correctCount}/{skillScore.questionsCount} Correct
          </span>
          <span className={`font-semibold ${theme.textColor}`}>
            <span aria-hidden="true">{theme.symbol}</span> {skillScore.classification}
          </span>
        </div>

        {/* Skill Title & Score Readout */}
        <div className="flex items-baseline justify-between gap-3 mt-1 mb-3">
          <h3 className="text-base font-semibold text-slate-900">{skillScore.skill}</h3>
          <span className="font-mono tabular-nums text-xl font-bold text-slate-900">
            {skillScore.percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          percentage={skillScore.percentage}
          showPercentage={false}
          classification={skillScore.classification}
          size="md"
        />
      </div>

      {/* Prior Learning Recognition Calibration Note */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-1">
        {skillScore.selfReportedLevel && (
          <div className="text-slate-500">
            Prior Claim: <strong className="text-slate-700">{skillScore.selfReportedLevel}</strong>{' '}
            (Confidence {skillScore.selfReportedConfidence}/5)
          </div>
        )}
        <div className="text-slate-700 font-medium">{skillScore.calibrationNote}</div>
      </div>
    </div>
  );
};
