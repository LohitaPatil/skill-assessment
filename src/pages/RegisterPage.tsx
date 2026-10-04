/**
 * 2. Register Page Component
 * Fields: Full Name, Email, Password, College, Branch, Year of Study.
 * Stores student registration details in LocalStorage.
 */

import React, { useState } from 'react';
import { PageRoute } from '../components/Navbar';
import { registerStudent, StudentUser } from '../utils/storage';

interface RegisterPageProps {
  onRegisterSuccess: (user: StudentUser) => void;
  onNavigate: (page: PageRoute) => void;
}

const BRANCH_OPTIONS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Data Science & AI',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Bachelor of Computer Applications (BCA)',
  'Other',
];

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState(BRANCH_OPTIONS[0]);
  const [yearOfStudy, setYearOfStudy] = useState(YEAR_OPTIONS[1]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !password.trim() || !college.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    const newUser: StudentUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      college: college.trim(),
      branch,
      yearOfStudy,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const result = registerStudent(newUser);
    if (!result.success) {
      setErrorMsg(result.message);
      return;
    }

    onRegisterSuccess(newUser);
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-medium text-sky-700 mb-1">Student Onboarding</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Create Your Student Account
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Register to record your prior skills, take assessments, and track your learning roadmap.
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
          {/* Full Name */}
          <div>
            <label
              htmlFor="reg-fullname"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="reg-fullname"
              type="text"
              required
              placeholder="e.g., Priya Nair"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              required
              placeholder="e.g., priya.nair@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              required
              placeholder="Create a password (min. 4 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          {/* College */}
          <div>
            <label
              htmlFor="reg-college"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              College / University
            </label>
            <input
              id="reg-college"
              type="text"
              required
              placeholder="e.g., Government College of Engineering"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          {/* Branch & Year of Study */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reg-branch"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Branch
              </label>
              <select
                id="reg-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
              >
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-year"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Year of Study
              </label>
              <select
                id="reg-year"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
              >
                {YEAR_OPTIONS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Secondary Action: Switch to Login */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 cursor-pointer"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};
