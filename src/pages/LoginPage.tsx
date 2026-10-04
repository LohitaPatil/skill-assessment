/**
 * 3. Login Page Component
 * Fields: Email, Password.
 * Authenticates against LocalStorage and redirects to Student Dashboard.
 */

import React, { useState } from 'react';
import { PageRoute } from '../components/Navbar';
import { loginStudent, StudentUser } from '../utils/storage';

interface LoginPageProps {
  onLoginSuccess: (user: StudentUser) => void;
  onNavigate: (page: PageRoute) => void;
  onQuickDemo: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
  onQuickDemo,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginStudent(email, password);
    if (!res.success || !res.user) {
      setErrorMsg(res.message);
      return;
    }

    onLoginSuccess(res.user);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-medium text-sky-700 mb-1">Welcome Back</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Student Login
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Sign in with your registered email and password to view your dashboard.
          </p>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700"
          >
            ■ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="your.email@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>

        {/* Quick Demo Login Option for instant testing */}
        <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
          <button
            type="button"
            onClick={onQuickDemo}
            className="w-full py-2.5 px-4 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors cursor-pointer"
          >
            Instant Login as Demo Student (Pre-loaded Data)
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Don&apos;t have an account? Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
