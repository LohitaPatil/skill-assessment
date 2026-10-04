/**
 * 7. Results Page Component
 * Displays "Assessment Completed", Overall Score with circular indicator,
 * skill-wise percentage dashboard, Strong / Adequate / Developing / Lagging
 * classification lists, and detailed question-by-question answer review.
 */

import React, { useState } from 'react';
import { PageRoute } from '../components/Navbar';
import {
  CircularScoreIndicator,
  getClassificationTheme,
  ProgressBar,
} from '../components/ProgressBar';
import { ResultCard } from '../components/ResultCard';
import { AssessmentResult } from '../utils/evaluation';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface ResultsPageProps {
  assessmentResult: AssessmentResult | null;
  onNavigate: (page: PageRoute) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  assessmentResult,
  onNavigate,
}) => {
  const [showAnswerReview, setShowAnswerReview] = useState<boolean>(false);

  if (!assessmentResult) {
    return (
      <div className="max-w-xl mx-auto py-14 text-center">
        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            No Assessment Results Yet
          </h1>
          <p className="text-sm text-slate-600">
            Complete the personalized 10-question assessment to calculate your overall score,
            skill-wise percentages, and gap classifications.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              Select Skills
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessment')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Overall Score Summary Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Circular Overall Score */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center lg:border-r lg:border-slate-100 lg:pr-6">
            <CircularScoreIndicator
              percentage={assessmentResult.overallPercentage}
              classification={assessmentResult.overallClassification}
            />
            <p className="mt-2 font-mono tabular-nums text-xs text-slate-500">
              {assessmentResult.totalMarksObtained} / {assessmentResult.totalPossibleMarks} Total
              Marks
            </p>
          </div>

          {/* Right: "Assessment Completed" Summary & Actions */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">● Diagnostic Evaluated</span>
              <span aria-hidden="true">·</span>
              <span>Completed {assessmentResult.completedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{assessmentResult.attempts.length} Questions</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Assessment Completed
              </h1>
              <p className="text-lg font-semibold text-slate-800 font-mono tabular-nums">
                Overall Score: {assessmentResult.overallPercentage}%
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {assessmentResult.aiSummaryFeedback}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('recommendations')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>View Learning Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('assessment')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAnswerReview((prev) => !prev)}
                className="px-4 py-2.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                {showAnswerReview ? 'Hide Answer Review' : 'Review Question Answers'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Classification Summary Lists: Strong, Adequate, Developing, Lagging */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Strong Skills (80-100%) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 pb-2.5 border-b border-slate-100">
            <span>● Strong Skills</span>
            <span className="font-mono tabular-nums">80–100%</span>
          </div>
          {assessmentResult.strongSkills.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-slate-800">
              {assessmentResult.strongSkills.map((sk) => (
                <li key={sk}>• {sk}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">No skills in this tier yet.</p>
          )}
        </div>

        {/* Adequate Skills (60-79%) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-700 pb-2.5 border-b border-slate-100">
            <span>◆ Adequate Skills</span>
            <span className="font-mono tabular-nums">60–79%</span>
          </div>
          {assessmentResult.adequateSkills.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-slate-800">
              {assessmentResult.adequateSkills.map((sk) => (
                <li key={sk}>• {sk}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">No skills in this tier yet.</p>
          )}
        </div>

        {/* Developing Skills (40-59%) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700 pb-2.5 border-b border-slate-100">
            <span>▲ Developing Skills</span>
            <span className="font-mono tabular-nums">40–59%</span>
          </div>
          {assessmentResult.developingSkills.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-slate-800">
              {assessmentResult.developingSkills.map((sk) => (
                <li key={sk}>• {sk}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">No skills in this tier.</p>
          )}
        </div>

        {/* Lagging Skills (0-39%) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-red-700 pb-2.5 border-b border-slate-100">
            <span>■ Lagging Skills</span>
            <span className="font-mono tabular-nums">0–39%</span>
          </div>
          {assessmentResult.laggingSkills.length > 0 ? (
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-slate-800">
              {assessmentResult.laggingSkills.map((sk) => (
                <li key={sk}>• {sk}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-slate-400">No skills in this tier.</p>
          )}
        </div>
      </div>

      {/* Skill-Wise Dashboard Table + Cards */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">
              Skill-Wise Performance Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Detailed percentage breakdown and proficiency classification for each assessed skill
            </p>
          </div>
        </div>

        {/* Structured Tabular Summary */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-2.5 pr-4">Skill</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 w-1/3">Progress</th>
                <th className="py-2.5 px-4 text-right">Score</th>
                <th className="py-2.5 pl-4 text-right">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {assessmentResult.skillScores.map((row) => {
                const theme = getClassificationTheme(row.classification);
                return (
                  <tr key={row.skill} className="hover:bg-slate-50/70">
                    <td className="py-3.5 pr-4 font-semibold text-slate-900">{row.skill}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{row.category}</td>
                    <td className="py-3.5 px-4">
                      <ProgressBar
                        percentage={row.percentage}
                        showPercentage={false}
                        classification={row.classification}
                        size="sm"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                      {row.percentage}%
                    </td>
                    <td
                      className={`py-3.5 pl-4 text-right text-xs font-semibold whitespace-nowrap ${theme.textColor}`}
                    >
                      <span aria-hidden="true">{theme.symbol}</span> {row.classification}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Skill Calibration Cards */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-slate-900">
          Prior Learning Recognition & Confidence Calibration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessmentResult.skillScores.map((sc) => (
            <ResultCard key={sc.skill} skillScore={sc} />
          ))}
        </div>
      </div>

      {/* Expandable Question-by-Question Answer Review */}
      {showAnswerReview && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-display text-xl font-semibold text-slate-900">
              Question-by-Question Answer Review
            </h2>
            <p className="text-xs text-slate-500">
              Review your submitted responses and explanations for every question
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {assessmentResult.attempts.map((att, i) => (
              <div key={att.questionId} className="py-4 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono tabular-nums font-semibold text-slate-700">
                    Q{i + 1} · {att.skill} ({att.difficulty})
                  </span>
                  <span
                    className={`font-mono tabular-nums font-semibold ${
                      att.isCorrect ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {att.isCorrect
                      ? `● Correct (+${att.marksObtained} Marks)`
                      : `■ Incorrect (0 / ${att.totalMarks} Marks)`}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{att.question}</p>
                <div className="text-xs text-slate-600 flex flex-wrap gap-4">
                  <span>
                    Your Answer: <strong>Option {att.selectedOption}</strong>
                  </span>
                  <span>
                    Correct Answer: <strong>Option {att.correctAnswer}</strong>
                  </span>
                </div>
                <p className="text-xs text-slate-500 pt-1">{att.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
