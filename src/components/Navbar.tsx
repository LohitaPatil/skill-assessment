/**
 * Top Navigation Bar Component
 * Follows the strict 3-zone Top Bar Contract:
 * [Zone 1: Brand Title] — [Zone 2: Clean Text Nav Links] — [Zone 3: 1-2 Primary Actions]
 */

import React from 'react';
import { StudentUser } from '../utils/storage';

export type PageRoute =
  | 'landing'
  | 'register'
  | 'login'
  | 'dashboard'
  | 'skills'
  | 'assessment'
  | 'results'
  | 'recommendations';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  currentUser: StudentUser | null;
  onLogout: () => void;
  onQuickDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
  onQuickDemo,
}) => {
  const studentNavItems: { id: PageRoute; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'skills', label: 'Select Skills' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'results', label: 'Results' },
    { id: 'recommendations', label: 'Recommendations' },
  ];

  const publicNavItems: { id: PageRoute; label: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'register', label: 'Register' },
    { id: 'login', label: 'Login' },
  ];

  const activeNavList = currentUser ? studentNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate(currentUser ? 'dashboard' : 'landing')}
          className="font-display text-xl font-semibold tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          SkillCheck AI
        </button>

        {/* Zone 2: Clean Typography Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7">
          {activeNavList.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`py-5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-sky-600 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <>
              <span className="hidden sm:inline text-xs text-slate-600 truncate max-w-[160px]">
                {currentUser.fullName}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onQuickDemo}
                className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar (compact single-line scrollable strip) */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-5 overflow-x-auto bg-slate-50/70">
        {activeNavList.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-medium whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                isActive
                  ? 'border-sky-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
