/**
 * LocalStorage Helper Utilities for SkillCheck AI
 * Manages student accounts, active session, selected skills,
 * assessment results, and completed recommendation steps.
 */

import { SelectedSkill } from '../data/skillsData';
import { AssessmentResult, evaluateAssessment } from './evaluation';
import { QUESTION_BANK } from '../data/questionsData';

export interface StudentUser {
  fullName: string;
  email: string;
  password: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  createdAt: string;
}

const USERS_KEY = 'skillcheck_users';
const CURRENT_USER_KEY = 'skillcheck_current_user';

function getSkillsKey(email: string): string {
  return `skillcheck_skills_${email.toLowerCase()}`;
}

function getResultKey(email: string): string {
  return `skillcheck_result_${email.toLowerCase()}`;
}

function getCompletedStepsKey(email: string): string {
  return `skillcheck_steps_${email.toLowerCase()}`;
}

/**
 * Retrieve all registered student users from LocalStorage
 */
export function getStoredUsers(): StudentUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Register a new student and set them as the active logged-in user
 */
export function registerStudent(user: StudentUser): { success: boolean; message: string } {
  const users = getStoredUsers();
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    return {
      success: false,
      message: 'An account with this email already exists. Please log in instead.',
    };
  }

  const updatedUsers = [...users, user];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, message: 'Account created successfully!' };
}

/**
 * Authenticate a student using Email and Password against LocalStorage
 */
export function loginStudent(
  email: string,
  password: string
): { success: boolean; user?: StudentUser; message: string } {
  const users = getStoredUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );

  if (!found) {
    return {
      success: false,
      message: 'Invalid email or password. Try the "Quick Demo Student" button or register a new account.',
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  return { success: true, user: found, message: 'Login successful!' };
}

/**
 * Get the currently logged-in student
 */
export function getCurrentStudent(): StudentUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Log out the active student
 */
export function logoutStudent(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Save selected skills for a student to LocalStorage
 */
export function saveSelectedSkills(email: string, skills: SelectedSkill[]): void {
  localStorage.setItem(getSkillsKey(email), JSON.stringify(skills));
}

/**
 * Load selected skills for a student from LocalStorage
 */
export function loadSelectedSkills(email: string): SelectedSkill[] {
  try {
    const raw = localStorage.getItem(getSkillsKey(email));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save assessment evaluation results for a student to LocalStorage
 */
export function saveAssessmentResult(email: string, result: AssessmentResult): void {
  localStorage.setItem(getResultKey(email), JSON.stringify(result));
}

/**
 * Load assessment evaluation results for a student from LocalStorage
 */
export function loadAssessmentResult(email: string): AssessmentResult | null {
  try {
    const raw = localStorage.getItem(getResultKey(email));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Save completed learning recommendation steps
 */
export function saveCompletedSteps(email: string, stepKeys: string[]): void {
  localStorage.setItem(getCompletedStepsKey(email), JSON.stringify(stepKeys));
}

/**
 * Load completed learning recommendation steps
 */
export function loadCompletedSteps(email: string): string[] {
  try {
    const raw = localStorage.getItem(getCompletedStepsKey(email));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Seeds a complete Demo Student account with pre-selected skills and a sample
 * assessment result so beginners or evaluators can explore all 8 pages immediately
 * with realistic data (e.g., Python Strong, Communication Adequate, REST APIs Developing, SQL Lagging).
 */
export function loginAsDemoStudent(): StudentUser {
  const demoUser: StudentUser = {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    password: 'password123',
    college: 'National Institute of Technology',
    branch: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    createdAt: '2026-10-01',
  };

  const users = getStoredUsers();
  if (!users.some((u) => u.email.toLowerCase() === demoUser.email.toLowerCase())) {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, demoUser]));
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(demoUser));

  // Seed selected skills if not already present
  const existingSkills = loadSelectedSkills(demoUser.email);
  const demoSkills: SelectedSkill[] =
    existingSkills.length > 0
      ? existingSkills
      : [
          {
            skillId: 'python',
            name: 'Python',
            category: 'Programming',
            level: 'Intermediate',
            confidence: 4,
          },
          {
            skillId: 'sql',
            name: 'SQL',
            category: 'Database',
            level: 'Beginner',
            confidence: 4, // Overconfident gap example
          },
          {
            skillId: 'html',
            name: 'HTML',
            category: 'Web Development',
            level: 'Intermediate',
            confidence: 4,
          },
          {
            skillId: 'rest-apis',
            name: 'REST APIs',
            category: 'Web Development',
            level: 'Beginner',
            confidence: 2,
          },
          {
            skillId: 'communication',
            name: 'Communication',
            category: 'Soft Skills',
            level: 'Intermediate',
            confidence: 3,
          },
        ];

  saveSelectedSkills(demoUser.email, demoSkills);

  // Seed a sample assessment result if none exists yet so Results & Recommendations work out-of-the-box
  const existingResult = loadAssessmentResult(demoUser.email);
  if (!existingResult) {
    const sampleQuestionsIds = [
      'py-1',
      'py-2',
      'py-3',
      'sql-1',
      'sql-2',
      'sql-3',
      'html-1',
      'html-2',
      'api-1',
      'comm-1',
    ];
    const sampleQuestions = QUESTION_BANK.filter((q) => sampleQuestionsIds.includes(q.id));

    // Craft answers so Python = 100% (Strong), HTML = 100% (Strong), Communication = 100% (Strong),
    // REST APIs = 0% or 50% (Developing), SQL = 33% (Lagging) -> Overall ~ 70%
    const sampleAnswers: Record<string, 'A' | 'B' | 'C' | 'D'> = {
      'py-1': 'B', // Correct
      'py-2': 'C', // Correct
      'py-3': 'B', // Correct (Python: 3/3 = 100% Strong)
      'sql-1': 'C', // Correct
      'sql-2': 'A', // Wrong (correct is B)
      'sql-3': 'A', // Wrong (correct is B) (SQL: 1/3 = 33% Lagging)
      'html-1': 'B', // Correct
      'html-2': 'B', // Correct (HTML: 2/2 = 100% Strong)
      'api-1': 'B', // Wrong (correct is A) (REST APIs: 0/1 = 0% Lagging)
      'comm-1': 'B', // Correct (Communication: 1/1 = 100% Strong)
    };

    const result = evaluateAssessment(sampleQuestions, sampleAnswers, demoSkills);
    saveAssessmentResult(demoUser.email, result);
  }

  return demoUser;
}
