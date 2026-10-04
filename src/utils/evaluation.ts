/**
 * Assessment Generation, Score Evaluation, and Rule-Based Recommendation Engine
 * Includes structured hooks and comments showing where a future AI API can be integrated.
 */

import { QUESTION_BANK, Question } from '../data/questionsData';
import { RECOMMENDATIONS_MAP, SkillRecommendationTemplate } from '../data/recommendationsData';
import { SelectedSkill, SkillLevel } from '../data/skillsData';

export type SkillClassification = 'Strong' | 'Adequate' | 'Developing' | 'Lagging';

export interface SkillScoreBreakdown {
  skill: string;
  category: string;
  obtainedMarks: number;
  totalMarks: number;
  questionsCount: number;
  correctCount: number;
  percentage: number;
  classification: SkillClassification;
  selfReportedLevel?: SkillLevel;
  selfReportedConfidence?: number;
  calibrationNote: string;
}

export interface QuestionAttempt {
  questionId: string;
  question: string;
  skill: string;
  difficulty: SkillLevel;
  selectedOption: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  marksObtained: number;
  totalMarks: number;
  explanation: string;
}

export interface AssessmentResult {
  completedAt: string;
  totalMarksObtained: number;
  totalPossibleMarks: number;
  overallPercentage: number;
  overallClassification: SkillClassification;
  skillScores: SkillScoreBreakdown[];
  strongSkills: string[];
  adequateSkills: string[];
  developingSkills: string[];
  laggingSkills: string[];
  attempts: QuestionAttempt[];
  aiSummaryFeedback: string;
}

export interface PersonalizedRecommendation {
  skill: string;
  category: string;
  percentage: number;
  classification: SkillClassification;
  priority: 'High Priority (Lagging)' | 'Medium Priority (Developing)' | 'Growth & Mastery';
  headline: string;
  summary: string;
  steps: string[];
  estimatedHours: number;
  practiceProject: string;
}

/**
 * Classifies a percentage score according to the SkillCheck AI rubric:
 * 80–100 = Strong
 * 60–79  = Adequate
 * 40–59  = Developing
 * 0–39   = Lagging
 */
export function classifyScore(percentage: number): SkillClassification {
  if (percentage >= 80) return 'Strong';
  if (percentage >= 60) return 'Adequate';
  if (percentage >= 40) return 'Developing';
  return 'Lagging';
}

/**
 * Generates a personalized assessment (~10 questions) based on the student's selected skills.
 * Distributes questions across selected skills so every chosen skill is evaluated.
 *
 * ============================================================================
 * [FUTURE AI API INTEGRATION POINT 1: AI-GENERATED QUESTIONS]
 * In a future version with a backend AI API (e.g., Gemini API), you can replace
 * or augment this function with an async call:
 *
 * export async function generateAIQuestions(selectedSkills: SelectedSkill[]) {
 *   const response = await fetch('/api/ai/generate-questions', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ skills: selectedSkills, count: 10 })
 *   });
 *   return await response.json();
 * }
 * ============================================================================
 */
export function generatePersonalizedAssessment(
  selectedSkills: SelectedSkill[],
  targetCount: number = 10
): Question[] {
  // If no skills are selected yet, fallback to a balanced default set (Python, SQL, HTML, CSS, Communication)
  const activeSkillNames =
    selectedSkills.length > 0
      ? selectedSkills.map((s) => s.name)
      : ['Python', 'SQL', 'HTML', 'CSS', 'Communication'];

  // Group available questions by skill
  const matchingPool = QUESTION_BANK.filter((q) => activeSkillNames.includes(q.skill));

  // Round-robin selection across selected skills so every selected skill gets representation
  const selectedQuestions: Question[] = [];
  const usedIds = new Set<string>();

  let pass = 0;
  while (selectedQuestions.length < targetCount && pass < 5) {
    for (const skillName of activeSkillNames) {
      if (selectedQuestions.length >= targetCount) break;

      const skillQuestions = matchingPool.filter(
        (q) => q.skill === skillName && !usedIds.has(q.id)
      );

      // Prefer questions matching student's self-reported difficulty level on the first pass
      const studentSkill = selectedSkills.find((s) => s.name === skillName);
      let candidate = skillQuestions[0];
      if (pass === 0 && studentSkill) {
        const levelMatch = skillQuestions.find((q) => q.difficulty === studentSkill.level);
        if (levelMatch) candidate = levelMatch;
      }

      if (candidate) {
        selectedQuestions.push(candidate);
        usedIds.add(candidate.id);
      }
    }
    pass++;
  }

  // If the student only selected 1 or 2 skills and we still have fewer than targetCount questions,
  // pad with foundational questions from other core skills so the assessment has ~10 questions
  if (selectedQuestions.length < targetCount) {
    for (const q of QUESTION_BANK) {
      if (selectedQuestions.length >= targetCount) break;
      if (!usedIds.has(q.id)) {
        selectedQuestions.push(q);
        usedIds.add(q.id);
      }
    }
  }

  return selectedQuestions;
}

/**
 * Compares self-reported confidence (1-5) with actual assessment score
 * to recognize prior learning accuracy or highlight blind spots.
 */
function getCalibrationNote(percentage: number, confidence?: number): string {
  if (!confidence) return 'Assessed via core baseline benchmark';
  if (percentage >= 80 && confidence >= 4) {
    return 'Verified Mastery — High confidence matched by strong performance';
  }
  if (percentage >= 80 && confidence <= 3) {
    return 'Hidden Strength — You scored higher than your self-rating suggests';
  }
  if (percentage < 60 && confidence >= 4) {
    return 'Priority Blind Spot — High confidence, but fundamentals need review';
  }
  if (percentage < 60 && confidence <= 2) {
    return 'Expected Gap — Matches your beginner self-rating; ready for guided study';
  }
  return 'Calibrated — Performance aligns with your self-reported experience';
}

/**
 * Evaluates all submitted answers, computes overall and skill-wise percentages,
 * classifies skills into Strong / Adequate / Developing / Lagging, and builds
 * a complete AssessmentResult object.
 *
 * ============================================================================
 * [FUTURE AI API INTEGRATION POINT 2: SHORT-ANSWER EVALUATION & AI FEEDBACK]
 * When short-answer questions or LLM feedback are enabled in a future version:
 *
 * export async function evaluateShortAnswerWithAI(question: string, studentAnswer: string) {
 *   const res = await fetch('/api/ai/evaluate-answer', {
 *     method: 'POST',
 *     body: JSON.stringify({ question, studentAnswer })
 *   });
 *   return await res.json(); // { marksObtained, feedback }
 * }
 * ============================================================================
 */
export function evaluateAssessment(
  questions: Question[],
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>,
  selectedSkills: SelectedSkill[]
): AssessmentResult {
  let totalMarksObtained = 0;
  let totalPossibleMarks = 0;

  const skillMap = new Map<
    string,
    {
      category: string;
      obtainedMarks: number;
      totalMarks: number;
      questionsCount: number;
      correctCount: number;
    }
  >();

  const attempts: QuestionAttempt[] = [];

  for (const q of questions) {
    const chosen = answers[q.id];
    const isCorrect = chosen === q.correctAnswer;
    const marksObtained = isCorrect ? q.marks : 0;

    totalMarksObtained += marksObtained;
    totalPossibleMarks += q.marks;

    attempts.push({
      questionId: q.id,
      question: q.question,
      skill: q.skill,
      difficulty: q.difficulty,
      selectedOption: chosen,
      correctAnswer: q.correctAnswer,
      isCorrect,
      marksObtained,
      totalMarks: q.marks,
      explanation: q.explanation,
    });

    const current = skillMap.get(q.skill) || {
      category: q.category,
      obtainedMarks: 0,
      totalMarks: 0,
      questionsCount: 0,
      correctCount: 0,
    };

    current.obtainedMarks += marksObtained;
    current.totalMarks += q.marks;
    current.questionsCount += 1;
    if (isCorrect) current.correctCount += 1;

    skillMap.set(q.skill, current);
  }

  // Overall Percentage = (total marks obtained / total possible marks) * 100
  const overallPercentage =
    totalPossibleMarks > 0
      ? Math.round((totalMarksObtained / totalPossibleMarks) * 100)
      : 0;

  const overallClassification = classifyScore(overallPercentage);

  const skillScores: SkillScoreBreakdown[] = [];
  const strongSkills: string[] = [];
  const adequateSkills: string[] = [];
  const developingSkills: string[] = [];
  const laggingSkills: string[] = [];

  skillMap.forEach((data, skillName) => {
    const percentage =
      data.totalMarks > 0 ? Math.round((data.obtainedMarks / data.totalMarks) * 100) : 0;
    const classification = classifyScore(percentage);
    const selectedInfo = selectedSkills.find((s) => s.name === skillName);

    skillScores.push({
      skill: skillName,
      category: data.category,
      obtainedMarks: data.obtainedMarks,
      totalMarks: data.totalMarks,
      questionsCount: data.questionsCount,
      correctCount: data.correctCount,
      percentage,
      classification,
      selfReportedLevel: selectedInfo?.level,
      selfReportedConfidence: selectedInfo?.confidence,
      calibrationNote: getCalibrationNote(percentage, selectedInfo?.confidence),
    });

    if (classification === 'Strong') strongSkills.push(skillName);
    else if (classification === 'Adequate') adequateSkills.push(skillName);
    else if (classification === 'Developing') developingSkills.push(skillName);
    else laggingSkills.push(skillName);
  });

  // Sort skills by percentage descending for clear dashboard display
  skillScores.sort((a, b) => b.percentage - a.percentage);

  const aiSummaryFeedback = generateRuleBasedFeedback(
    overallPercentage,
    strongSkills,
    developingSkills,
    laggingSkills
  );

  return {
    completedAt: new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    totalMarksObtained,
    totalPossibleMarks,
    overallPercentage,
    overallClassification,
    skillScores,
    strongSkills,
    adequateSkills,
    developingSkills,
    laggingSkills,
    attempts,
    aiSummaryFeedback,
  };
}

/**
 * Generates personalized summary feedback based on assessment scores.
 *
 * ============================================================================
 * [FUTURE AI API INTEGRATION POINT 3: PERSONALIZED AI FEEDBACK]
 * In the future, pass `skillScores` and `selectedSkills` to an LLM prompt
 * to synthesize custom natural-language coaching.
 * ============================================================================
 */
function generateRuleBasedFeedback(
  overallPercentage: number,
  strongSkills: string[],
  developingSkills: string[],
  laggingSkills: string[]
): string {
  const weakList = [...laggingSkills, ...developingSkills];
  if (overallPercentage >= 80 && weakList.length === 0) {
    return `Excellent prior learning recognition (${overallPercentage}%). You demonstrated strong command across ${strongSkills.join(', ')}. You are ready to skip introductory modules and focus on advanced project work.`;
  }
  if (overallPercentage >= 60) {
    const focusPart =
      weakList.length > 0
        ? `While your foundation is solid, prioritize strengthening ${weakList.join(' and ')} to close your remaining skill gaps.`
        : `Continue practicing real-world problems to move your adequate skills into the 80%+ Strong tier.`;
    return `Good overall readiness (${overallPercentage}%). ${
      strongSkills.length > 0 ? `Recognized strengths in ${strongSkills.join(', ')}. ` : ''
    }${focusPart}`;
  }
  return `Your baseline score is ${overallPercentage}%. We identified key learning gaps in ${
    weakList.length > 0 ? weakList.join(', ') : 'core fundamentals'
  }. Follow the step-by-step recommended learning path to build confidence and retake the assessment.`;
}

/**
 * Generates dynamic, rule-based learning recommendations based on student scores.
 * Prioritizes weak skills (< 60%: Lagging & Developing) first, then offers
 * mastery expansion paths for Adequate/Strong skills (>= 60%).
 *
 * ============================================================================
 * [FUTURE AI API INTEGRATION POINT 4: AI-GENERATED LEARNING PATHS]
 * In a future update, replace or enrich this function with an AI API call that
 * generates custom tutorials, code exercises, and video links tailored to the
 * exact questions the student missed.
 * ============================================================================
 */
export function generateRecommendations(
  result: AssessmentResult | null,
  selectedSkills: SelectedSkill[]
): PersonalizedRecommendation[] {
  // If an assessment has been completed, generate recommendations from actual scores
  if (result && result.skillScores.length > 0) {
    // Sort weakest scores first so Lagging (<40%) and Developing (40-59%) are at the top
    const sortedByGap = [...result.skillScores].sort((a, b) => a.percentage - b.percentage);

    return sortedByGap.map((item) => {
      const template: SkillRecommendationTemplate | undefined =
        RECOMMENDATIONS_MAP[item.skill];

      const isWeak = item.percentage < 60;
      const priority =
        item.percentage < 40
          ? 'High Priority (Lagging)'
          : item.percentage < 60
          ? 'Medium Priority (Developing)'
          : 'Growth & Mastery';

      if (template) {
        return {
          skill: item.skill,
          category: item.category,
          percentage: item.percentage,
          classification: item.classification,
          priority,
          headline: isWeak ? template.weakHeadline : template.strongHeadline,
          summary: isWeak ? template.weakSummary : template.strongSummary,
          steps: isWeak ? template.weakSteps : template.strongSteps,
          estimatedHours: template.estimatedHours,
          practiceProject: template.practiceProject,
        };
      }

      // Fallback if a custom skill is ever added
      return {
        skill: item.skill,
        category: item.category,
        percentage: item.percentage,
        classification: item.classification,
        priority,
        headline: isWeak
          ? `Your ${item.skill} fundamentals need improvement.`
          : `Continue advancing your ${item.skill} proficiency.`,
        summary: isWeak
          ? `Focus on core concepts and hands-on practice exercises for ${item.skill}.`
          : `Build intermediate projects to solidify your ${item.skill} expertise.`,
        steps: [
          `Review core ${item.skill} concepts and syntax`,
          `Complete 5 guided beginner exercises in ${item.skill}`,
          `Study common patterns and best practices`,
          `Build a mini-project applying ${item.skill}`,
          `Retake the ${item.skill} assessment to verify mastery`,
        ],
        estimatedHours: 6,
        practiceProject: `Build a practical mini-project demonstrating ${item.skill}.`,
      };
    });
  }

  // If the student hasn't taken the assessment yet, show preparatory recommendations based on selected skills
  const skillsToUse =
    selectedSkills.length > 0
      ? selectedSkills
      : [
          { skillId: 'sql', name: 'SQL', category: 'Database', level: 'Beginner' as SkillLevel, confidence: 2 },
          { skillId: 'python', name: 'Python', category: 'Programming', level: 'Beginner' as SkillLevel, confidence: 3 },
        ];

  return skillsToUse.map((s) => {
    const template = RECOMMENDATIONS_MAP[s.name];
    const estimatedScore = s.confidence * 15;
    return {
      skill: s.name,
      category: s.category,
      percentage: estimatedScore,
      classification: classifyScore(estimatedScore),
      priority: s.confidence <= 2 ? 'High Priority (Lagging)' : 'Medium Priority (Developing)',
      headline: template ? template.weakHeadline : `Strengthen your ${s.name} fundamentals.`,
      summary: template
        ? template.weakSummary
        : `Take the assessment to unlock your exact ${s.name} score breakdown.`,
      steps: template
        ? template.weakSteps
        : [
            'Review core concepts',
            'Practice fundamental exercises',
            'Build a sample project',
            'Take the SkillCheck AI assessment',
            'Review your skill gap analysis',
          ],
      estimatedHours: template ? template.estimatedHours : 6,
      practiceProject: template
        ? template.practiceProject
        : `Complete a hands-on ${s.name} starter exercise.`,
    };
  });
}
