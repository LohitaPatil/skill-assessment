/**
 * Reusable Question Card Component for the Personalized Assessment Page
 * Displays question metadata, question text, and interactive MCQ options.
 */

import React from 'react';
import { Question } from '../data/questionsData';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  onSelectOption: (questionId: string, option: 'A' | 'B' | 'C' | 'D') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
      {/* Clean unboxed metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums font-semibold text-slate-800">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-sky-700">{question.skill}</span>
          <span aria-hidden="true">·</span>
          <span>{question.difficulty} Level</span>
        </div>
        <div className="font-mono tabular-nums text-slate-600">
          {question.type} · {question.marks} Marks
        </div>
      </div>

      {/* Question Prompt */}
      <h2 className="mt-5 text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
        {question.question}
      </h2>

      {/* Multiple Choice Options */}
      <div className="mt-6 space-y-3" role="radiogroup" aria-label={question.question}>
        {question.options.map((opt) => {
          const isChosen = selectedOption === opt.label;
          return (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={isChosen}
              onClick={() => onSelectOption(question.id, opt.label)}
              className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start gap-3.5 cursor-pointer ${
                isChosen
                  ? 'bg-sky-50/70 border-sky-600 text-slate-900 ring-1 ring-sky-600/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg font-mono tabular-nums text-xs font-semibold flex items-center justify-center shrink-0 border ${
                  isChosen
                    ? 'bg-sky-600 border-sky-600 text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {opt.label}
              </span>
              <span className="text-sm sm:text-base font-medium leading-relaxed pt-0.5">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
