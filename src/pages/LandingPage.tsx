/**
 * 1. Landing Page Component
 * Student-focused landing page for SkillCheck AI.
 */

import React from 'react';
import { PageRoute } from '../components/Navbar';
import { ArrowRight, BookOpen, BarChart3, Compass } from 'lucide-react';
import { StudentUser } from '../utils/storage';

interface LandingPageProps {
  onNavigate: (page: PageRoute) => void;
  onQuickDemo: () => void;
  currentUser: StudentUser | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onQuickDemo,
  currentUser,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Title, Subtitle, Explanation & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-medium text-slate-500">
                Prior Learning Recognition · Skill Gap Diagnostics · Guided Study Paths
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                  SkillCheck AI
                </h1>
                <p className="font-display text-xl sm:text-2xl font-medium text-sky-800 leading-snug">
                  Recognize what you already know. Discover what you need to learn.
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Students enter college courses and self-study tracks with diverse prior knowledge.
                SkillCheck AI evaluates the skills you have already learned, compares your
                self-confidence against an adaptive diagnostic assessment, pinpoints lagging concepts,
                and generates a step-by-step learning plan tailored to your exact gaps.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate(currentUser ? 'dashboard' : 'register')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>{currentUser ? 'Go to Dashboard' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!currentUser && (
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="px-6 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </button>
                )}

                <button
                  type="button"
                  onClick={onQuickDemo}
                  className="px-5 py-3 text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  Try Instant Demo Student
                </button>
              </div>
            </div>

            {/* Right Column: Live Diagnostic Rubric Preview */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Sample Diagnostic Breakdown
                  </h2>
                  <p className="text-xs text-slate-500">
                    Prior Learning vs. Verified Assessment Score
                  </p>
                </div>
                <span className="font-mono tabular-nums text-lg font-bold text-slate-900">
                  68% Overall
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">Python</span>
                    <span className="font-mono tabular-nums text-emerald-700 font-semibold">
                      ● 82% · Strong
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-2 bg-emerald-600 rounded-full w-[82%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">Communication</span>
                    <span className="font-mono tabular-nums text-sky-700 font-semibold">
                      ◆ 73% · Adequate
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-2 bg-sky-600 rounded-full w-[73%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">REST APIs</span>
                    <span className="font-mono tabular-nums text-amber-700 font-semibold">
                      ▲ 59% · Developing
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-2 bg-amber-600 rounded-full w-[59%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-800">SQL</span>
                    <span className="font-mono tabular-nums text-red-700 font-semibold">
                      ■ 35% · Lagging
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-2 bg-red-600 rounded-full w-[35%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800">Classification Scale:</strong> Strong (80–100%) ·
                Adequate (60–79%) · Developing (40–59%) · Lagging (0–39%)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            How SkillCheck AI Works
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            A structured three-step workflow from prior skill declaration to targeted study plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Personalized Assessment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                01. Personalized Assessment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select the skills you have already learned across Programming, Database, Web
                Development, Data, and Soft Skills. Rate your experience level and confidence from 1
                to 5 to generate a custom 10-question diagnostic quiz.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
              17 Core Skills · Beginner to Advanced
            </div>
          </div>

          {/* Card 2: Skill Gap Analysis */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                02. Skill Gap Analysis
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly calculate your overall percentage and skill-wise breakdown. Identify which
                skills are Strong (80–100%), Adequate (60–79%), Developing (40–59%), or Lagging
                (0–39%), and compare results against your self-confidence.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
               Automated Rubric · Confidence Calibration
            </div>
          </div>

          {/* Card 3: Learning Recommendations */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                03. Learning Recommendations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive dynamic, prioritized 5-step study plans and hands-on practice milestones for
                every weak or developing skill—helping you focus study hours only where you actually
                need improvement.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
              Interactive Study Checklists · Practice Projects
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
