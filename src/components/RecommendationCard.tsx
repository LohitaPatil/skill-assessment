/**
 * Reusable Personalized Learning Recommendation Card Component
 * Displays dynamic diagnosis based on student's skill score and an interactive
 * 5-step learning checklist saved to LocalStorage.
 */

import React from 'react';
import { PersonalizedRecommendation } from '../utils/evaluation';
import { getClassificationTheme } from './ProgressBar';
import { CheckSquare, Square } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: PersonalizedRecommendation;
  completedSteps: string[];
  onToggleStep: (stepKey: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  completedSteps,
  onToggleStep,
}) => {
  const theme = getClassificationTheme(recommendation.classification);
  const isWeak = recommendation.percentage < 60;

  const completedCount = recommendation.steps.filter((_, idx) =>
    completedSteps.includes(`${recommendation.skill}-${idx}`)
  ).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5">
      <div>
        {/* Top Metadata Row (Zero-Pill Unboxed Text) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">{recommendation.skill}</span>
            <span aria-hidden="true">·</span>
            <span>{recommendation.category}</span>
            <span aria-hidden="true">·</span>
            <span>Est. {recommendation.estimatedHours} hrs</span>
          </div>
          <div className="flex items-center gap-2 font-mono tabular-nums">
            <span className={`font-semibold ${theme.textColor}`}>
              <span aria-hidden="true">{theme.symbol}</span> {recommendation.percentage}% (
              {recommendation.classification})
            </span>
          </div>
        </div>

        {/* Dynamic Diagnosis Headline */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-sky-700 mb-1">
            {isWeak ? 'Priority Skill Gap Remediation' : 'Next-Level Mastery Expansion'}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            &ldquo;{recommendation.headline}&rdquo;
          </h3>
          <p className="text-sm text-slate-600 mt-1">{recommendation.summary}</p>
        </div>

        {/* Recommended 5-Step Learning Path */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
            <span>Recommended learning:</span>
            <span className="font-mono tabular-nums text-slate-500">
              {completedCount} / {recommendation.steps.length} completed
            </span>
          </div>

          <ol className="space-y-2">
            {recommendation.steps.map((step, index) => {
              const stepKey = `${recommendation.skill}-${index}`;
              const isDone = completedSteps.includes(stepKey);

              return (
                <li key={stepKey}>
                  <button
                    type="button"
                    onClick={() => onToggleStep(stepKey)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                        : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-slate-100/80'
                    }`}
                  >
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm">
                      <span className="font-mono tabular-nums font-semibold mr-1.5">
                        {index + 1}.
                      </span>
                      {step}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Capstone Practice Milestone */}
      <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
        <span className="font-semibold text-slate-800">Suggested Practice Milestone: </span>
        {recommendation.practiceProject}
      </div>
    </div>
  );
};
