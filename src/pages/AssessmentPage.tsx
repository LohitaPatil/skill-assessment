/**
 * 6. Personalized Assessment Page Component
 * Generates a ~10-question assessment based on the student's selected skills.
 * Includes Question X of 10 indicator, Progress bar, Previous/Next buttons,
 * Question Navigator, and enforces answering all questions before submission.
 */

import React, { useState, useMemo } from 'react';
import { PageRoute } from '../components/Navbar';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { SelectedSkill } from '../data/skillsData';
import {
  AssessmentResult,
  evaluateAssessment,
  generatePersonalizedAssessment,
} from '../utils/evaluation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface AssessmentPageProps {
  selectedSkills: SelectedSkill[];
  onCompleteAssessment: (result: AssessmentResult) => void;
  onNavigate: (page: PageRoute) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  selectedSkills,
  onCompleteAssessment,
  onNavigate,
}) => {
  // Generate personalized 10-question assessment from selected skills
  const questions = useMemo(
    () => generatePersonalizedAssessment(selectedSkills, 10),
    [selectedSkills]
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [validationError, setValidationError] = useState<string>('');

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    setValidationError('');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    // Enforce rule: Do not allow submission before all questions are answered
    const unansweredIndices: number[] = [];
    questions.forEach((q, idx) => {
      if (!answers[q.id]) {
        unansweredIndices.push(idx + 1);
      }
    });

    if (unansweredIndices.length > 0) {
      setValidationError(
        `Please answer all questions before submitting. Unanswered question(s): ${unansweredIndices.join(
          ', '
        )}.`
      );
      // Jump to the first unanswered question to help the student
      setCurrentIndex(unansweredIndices[0] - 1);
      return;
    }

    const evaluation = evaluateAssessment(questions, answers, selectedSkills);
    onCompleteAssessment(evaluation);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Assessment Header & Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-700">
              Step 2 of 3 · Personalized Diagnostic Assessment
            </p>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Skill Verification Quiz
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tailored to:{' '}
              {selectedSkills.length > 0
                ? selectedSkills.map((s) => s.name).join(' · ')
                : 'Core Baseline Skills (Python · SQL · HTML · CSS · Communication)'}
            </p>
          </div>

          <div className="text-right font-mono tabular-nums">
            <span className="text-xs text-slate-500 block">Completion Progress</span>
            <span className="text-sm font-bold text-slate-900">
              {answeredCount} of {totalQuestions} Answered ({progressPercentage}%)
            </span>
          </div>
        </div>

        <ProgressBar
          percentage={progressPercentage}
          showPercentage={false}
          size="md"
        />

        {/* Interactive Question Number Navigator */}
        <div className="pt-2 flex items-center gap-2 flex-wrap">
          {questions.map((q, idx) => {
            const isAnswered = Boolean(answers[q.id]);
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg font-mono tabular-nums text-xs font-semibold border transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : isAnswered
                    ? 'bg-sky-50 border-sky-300 text-sky-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
                title={`Question ${idx + 1}: ${q.skill} (${
                  isAnswered ? 'Answered' : 'Unanswered'
                })`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Alert if student tries to submit before answering all questions */}
      {validationError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-900"
        >
          ▲ {validationError}
        </div>
      )}

      {/* Active Question Card */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          selectedOption={answers[currentQuestion.id]}
          onSelectOption={handleSelectOption}
        />
      )}

      {/* Bottom Controls: Previous, Next, and Submit Assessment */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2.5 text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-3">
          {currentIndex < totalQuestions - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-6 py-2.5 text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              answeredCount === totalQuestions
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              Submit Assessment ({answeredCount}/{totalQuestions})
            </span>
          </button>
        </div>
      </div>

      {/* Link to change skills if needed */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => onNavigate('skills')}
          className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
        >
          Want to test different skills? Return to Skill Selection
        </button>
      </div>
    </div>
  );
};
