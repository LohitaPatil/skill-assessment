/**
 * 8. Personalized Learning Recommendations Page Component
 * Dynamically generates study roadmaps based on the student's weak/lagging skills (< 60%)
 * and provides next-level expansion paths for adequate/strong skills (>= 60%).
 */

import React, { useState, useMemo } from 'react';
import { PageRoute } from '../components/Navbar';
import { RecommendationCard } from '../components/RecommendationCard';
import { SelectedSkill } from '../data/skillsData';
import {
  AssessmentResult,
  generateRecommendations,
} from '../utils/evaluation';

interface RecommendationsPageProps {
  assessmentResult: AssessmentResult | null;
  selectedSkills: SelectedSkill[];
  completedSteps: string[];
  onToggleStep: (stepKey: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  assessmentResult,
  selectedSkills,
  completedSteps,
  onToggleStep,
  onNavigate,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'weak' | 'strong'>('all');

  const allRecommendations = useMemo(
    () => generateRecommendations(assessmentResult, selectedSkills),
    [assessmentResult, selectedSkills]
  );

  const weakRecommendations = allRecommendations.filter((r) => r.percentage < 60);
  const strongRecommendations = allRecommendations.filter((r) => r.percentage >= 60);

  const visibleRecommendations =
    filterMode === 'weak'
      ? weakRecommendations
      : filterMode === 'strong'
      ? strongRecommendations
      : allRecommendations;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-xs font-medium text-sky-700">
            Step 3 of 3 · Personalized Skill Gap Remediation
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Personalized Learning Recommendations
          </h1>
          <p className="text-sm text-slate-600">
            {assessmentResult
              ? `Generated from your ${assessmentResult.overallPercentage}% diagnostic assessment. Skills scoring below 60% are prioritized first with step-by-step foundational modules.`
              : 'Showing baseline study plans based on your selected skills. Take the assessment to unlock score-driven gap analysis.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('results')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Back to Results
          </button>
          <button
            type="button"
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Retake Assessment
          </button>
        </div>
      </div>

      {/* Filter Bar & Study Progress Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Skills ({allRecommendations.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('weak')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterMode === 'weak'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weak &amp; Developing &lt; 60% ({weakRecommendations.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('strong')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterMode === 'strong'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Adequate &amp; Strong &ge; 60% ({strongRecommendations.length})
          </button>
        </div>

        <div className="text-xs text-slate-600 font-mono tabular-nums">
          Completed Study Steps: <strong>{completedSteps.length}</strong>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {visibleRecommendations.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
          <p className="text-sm font-medium text-slate-700">
            No skills match this filter category.
          </p>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className="px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg cursor-pointer"
          >
            Show All Recommendations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.skill}
              recommendation={rec}
              completedSteps={completedSteps}
              onToggleStep={onToggleStep}
            />
          ))}
        </div>
      )}

      {/* Architecture Note for Future AI API Integration */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
        <div className="text-xs font-semibold text-slate-800">
          Rule-Based Engine &amp; Future AI API Extensibility
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          This localhost prototype runs a deterministic rule-based evaluation and recommendation
          engine (<code className="font-mono text-slate-800">src/utils/evaluation.ts</code>) so it
          works 100% offline without requiring paid API keys. When you are ready to connect an
          external LLM API (such as Google Gemini or OpenAI), check the documented integration
          hooks in <code className="font-mono text-slate-800">src/utils/evaluation.ts</code> for
          AI-generated questions, short-answer grading, and dynamic curriculum synthesis.
        </p>
      </div>
    </div>
  );
};
