/**
 * 4. Student Dashboard Page Component
 * Displays "Welcome, [Student Name]", 4 summary cards (Selected Skills,
 * Assessment Status, Overall Score, Weak Areas), and navigation buttons.
 */

import React from 'react';
import { PageRoute } from '../components/Navbar';
import { SelectedSkill } from '../data/skillsData';
import { AssessmentResult } from '../utils/evaluation';
import { StudentUser } from '../utils/storage';
import { getClassificationTheme, ProgressBar } from '../components/ProgressBar';

interface DashboardPageProps {
  student: StudentUser;
  selectedSkills: SelectedSkill[];
  assessmentResult: AssessmentResult | null;
  onNavigate: (page: PageRoute) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  student,
  selectedSkills,
  assessmentResult,
  onNavigate,
}) => {
  const weakAreas = assessmentResult
    ? [...assessmentResult.laggingSkills, ...assessmentResult.developingSkills]
    : [];

  const assessmentStatusLabel = assessmentResult
    ? 'Completed'
    : selectedSkills.length > 0
    ? 'Ready to Start'
    : 'Skills Needed';

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-1.5">
          {/* Unboxed Student Academic Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{student.college}</span>
            <span aria-hidden="true">·</span>
            <span>{student.branch}</span>
            <span aria-hidden="true">·</span>
            <span>{student.yearOfStudy}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome, {student.fullName}
          </h1>

          <p className="text-sm text-slate-600">
            Track your recognized prior skills, diagnostic assessment score, and personalized study
            recommendations.
          </p>
        </div>

        {/* 4 Required Navigation Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Select Skills
          </button>
          <button
            type="button"
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Start Assessment
          </button>
          <button
            type="button"
            onClick={() => onNavigate('results')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            View Results
          </button>
          <button
            type="button"
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Recommendations
          </button>
        </div>
      </div>

      {/* 4 Required Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Selected Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Selected Skills</p>
            <p className="font-mono tabular-nums text-3xl font-bold text-slate-900 mt-2">
              {selectedSkills.length}
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-3 truncate">
            {selectedSkills.length > 0
              ? selectedSkills.map((s) => s.name).join(' · ')
              : 'No skills selected yet'}
          </p>
        </div>

        {/* Card 2: Assessment Status */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Assessment Status</p>
            <p className="text-xl font-bold text-slate-900 mt-2">
              {assessmentResult ? (
                <span className="text-emerald-700">● {assessmentStatusLabel}</span>
              ) : (
                <span className="text-amber-700">▲ {assessmentStatusLabel}</span>
              )}
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            {assessmentResult
              ? `Last taken: ${assessmentResult.completedAt}`
              : 'Complete a 10-question diagnostic quiz'}
          </p>
        </div>

        {/* Card 3: Overall Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Overall Score</p>
            <p className="font-mono tabular-nums text-3xl font-bold text-slate-900 mt-2">
              {assessmentResult ? `${assessmentResult.overallPercentage}%` : '—'}
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            {assessmentResult
              ? `${assessmentResult.totalMarksObtained} / ${assessmentResult.totalPossibleMarks} marks (${assessmentResult.overallClassification})`
              : 'Take assessment to calculate score'}
          </p>
        </div>

        {/* Card 4: Weak Areas */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Weak Areas (&lt; 60%)</p>
            <p className="font-mono tabular-nums text-3xl font-bold text-slate-900 mt-2">
              {assessmentResult ? weakAreas.length : '—'}
            </p>
          </div>
          <p className="text-xs text-slate-600 mt-3 truncate">
            {assessmentResult
              ? weakAreas.length > 0
                ? weakAreas.join(' · ')
                : 'None — All tested skills >= 60%'
              : 'Pending diagnostic evaluation'}
          </p>
        </div>
      </div>

      {/* Two-Column Overview Section: Selected Prior Skills & Latest Skill Gap Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Selected Prior Learning Skills Table */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Your Declared Prior Skills
              </h2>
              <p className="text-xs text-slate-500">
                Self-reported proficiency and confidence rating (1 to 5)
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('skills')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 cursor-pointer"
            >
              Edit Skills
            </button>
          </div>

          {selectedSkills.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm text-slate-600">
                You have not selected any prior skills yet.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('skills')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Select Your Skills Now
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 mt-2">
              {selectedSkills.map((sk) => (
                <div
                  key={sk.skillId}
                  className="py-3 flex items-center justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{sk.name}</p>
                    <p className="text-xs text-slate-500">
                      {sk.category} · {sk.level}
                    </p>
                  </div>
                  <div className="text-right font-mono tabular-nums text-xs">
                    <span className="font-semibold text-slate-800">
                      Confidence: {sk.confidence}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Latest Assessment Performance Snapshot */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Skill Gap Analysis Snapshot
              </h2>
              <p className="text-xs text-slate-500">
                Verified score per skill from your most recent assessment
              </p>
            </div>
            {assessmentResult && (
              <button
                type="button"
                onClick={() => onNavigate('results')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-800 cursor-pointer"
              >
                Full Report
              </button>
            )}
          </div>

          {!assessmentResult ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm text-slate-600">
                No assessment completed yet. Take the personalized assessment to see your skill-wise
                percentages and gap classifications.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('assessment')}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 cursor-pointer"
              >
                Start Personalized Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {assessmentResult.skillScores.map((item) => {
                const theme = getClassificationTheme(item.classification);
                return (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">{item.skill}</span>
                      <span className={`font-mono tabular-nums font-semibold ${theme.textColor}`}>
                        <span aria-hidden="true">{theme.symbol}</span> {item.percentage}% ·{' '}
                        {item.classification}
                      </span>
                    </div>
                    <ProgressBar
                      percentage={item.percentage}
                      showPercentage={false}
                      classification={item.classification}
                      size="sm"
                    />
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                {assessmentResult.aiSummaryFeedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
