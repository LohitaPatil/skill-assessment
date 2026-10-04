/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SkillCheck AI — Main Application Component
 * Manages page routing, student authentication state, selected prior skills,
 * assessment results, and completed recommendation steps via LocalStorage.
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { SelectedSkill } from './data/skillsData';
import { AssessmentResult } from './utils/evaluation';
import {
  getCurrentStudent,
  loadAssessmentResult,
  loadCompletedSteps,
  loadSelectedSkills,
  loginAsDemoStudent,
  logoutStudent,
  saveAssessmentResult,
  saveCompletedSteps,
  saveSelectedSkills,
  StudentUser,
} from './utils/storage';

// Pages
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillSelectionPage } from './pages/SkillSelectionPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ResultsPage } from './pages/ResultsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() =>
    getCurrentStudent()
  );
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    getCurrentStudent() ? 'dashboard' : 'landing'
  );
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(
    null
  );
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Synchronize user data from LocalStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      setSelectedSkills(loadSelectedSkills(currentUser.email));
      setAssessmentResult(loadAssessmentResult(currentUser.email));
      setCompletedSteps(loadCompletedSteps(currentUser.email));
    } else {
      setSelectedSkills([]);
      setAssessmentResult(null);
      setCompletedSteps([]);
    }
  }, [currentUser]);

  // Handle navigation with authentication guard for protected student routes
  const handleNavigate = (page: PageRoute) => {
    const protectedRoutes: PageRoute[] = [
      'dashboard',
      'skills',
      'assessment',
      'results',
      'recommendations',
    ];
    if (protectedRoutes.includes(page) && !currentUser) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle registration or login success
  const handleAuthSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    setSelectedSkills(loadSelectedSkills(user.email));
    setAssessmentResult(loadAssessmentResult(user.email));
    setCompletedSteps(loadCompletedSteps(user.email));
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle 1-click Demo Student login
  const handleQuickDemo = () => {
    const demoUser = loginAsDemoStudent();
    handleAuthSuccess(demoUser);
  };

  // Handle Logout
  const handleLogout = () => {
    logoutStudent();
    setCurrentUser(null);
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save updated selected skills
  const handleSaveSkills = (skills: SelectedSkill[]) => {
    setSelectedSkills(skills);
    if (currentUser) {
      saveSelectedSkills(currentUser.email, skills);
    }
  };

  // Save completed assessment result and navigate to Results page
  const handleCompleteAssessment = (result: AssessmentResult) => {
    setAssessmentResult(result);
    if (currentUser) {
      saveAssessmentResult(currentUser.email, result);
    }
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle completed learning step on Recommendations page
  const handleToggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => {
      const exists = prev.includes(stepKey);
      const updated = exists
        ? prev.filter((k) => k !== stepKey)
        : [...prev, stepKey];
      if (currentUser) {
        saveCompletedSteps(currentUser.email, updated);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onQuickDemo={handleQuickDemo}
      />

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onQuickDemo={handleQuickDemo}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'register' && (
          <RegisterPage
            onRegisterSuccess={handleAuthSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={handleAuthSuccess}
            onNavigate={handleNavigate}
            onQuickDemo={handleQuickDemo}
          />
        )}

        {currentPage === 'dashboard' && currentUser && (
          <DashboardPage
            student={currentUser}
            selectedSkills={selectedSkills}
            assessmentResult={assessmentResult}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'skills' && currentUser && (
          <SkillSelectionPage
            selectedSkills={selectedSkills}
            onSaveSkills={handleSaveSkills}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'assessment' && currentUser && (
          <AssessmentPage
            selectedSkills={selectedSkills}
            onCompleteAssessment={handleCompleteAssessment}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'results' && currentUser && (
          <ResultsPage
            assessmentResult={assessmentResult}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'recommendations' && currentUser && (
          <RecommendationsPage
            assessmentResult={assessmentResult}
            selectedSkills={selectedSkills}
            completedSteps={completedSteps}
            onToggleStep={handleToggleStep}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            SkillCheck AI — Student Prior Learning Recognition &amp; Skill Gap Analysis Prototype
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('landing')}
              className="hover:text-slate-800 cursor-pointer"
            >
              Landing Page
            </button>
            {currentUser ? (
              <button
                type="button"
                onClick={() => handleNavigate('dashboard')}
                className="hover:text-slate-800 cursor-pointer"
              >
                Student Dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={handleQuickDemo}
                className="hover:text-slate-800 cursor-pointer"
              >
                Load Demo Student
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
