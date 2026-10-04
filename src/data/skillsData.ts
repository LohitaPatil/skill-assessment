/**
 * Skill Categories and Available Skills for SkillCheck AI
 * Covers Programming, Database, Web Development, Data, and Soft Skills.
 */

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface SelectedSkill {
  skillId: string;
  name: string;
  category: string;
  level: SkillLevel;
  confidence: number; // 1 to 5
}

export interface SkillCategoryGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export const CONFIDENCE_LABELS: Record<number, string> = {
  1: '1 / 5 — Novice (Just started exploring)',
  2: '2 / 5 — Basic (Need frequent reference)',
  3: '3 / 5 — Moderate (Can solve standard tasks)',
  4: '4 / 5 — Confident (Comfortable with most concepts)',
  5: '5 / 5 — Very Confident (Can build & explain to others)',
};

export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    category: 'Programming',
    description: 'Core software logic, syntax, and algorithmic data structures.',
    skills: [
      {
        id: 'python',
        name: 'Python',
        category: 'Programming',
        description: 'Variables, control flow, functions, lists, dictionaries, and scripting.',
      },
      {
        id: 'java',
        name: 'Java',
        category: 'Programming',
        description: 'Object-oriented programming, classes, inheritance, and JVM basics.',
      },
      {
        id: 'c',
        name: 'C',
        category: 'Programming',
        description: 'Pointers, memory management, arrays, structures, and procedural code.',
      },
      {
        id: 'data-structures',
        name: 'Data Structures',
        category: 'Programming',
        description: 'Arrays, linked lists, stacks, queues, trees, and time complexity.',
      },
    ],
  },
  {
    category: 'Database',
    description: 'Relational data modeling, querying, and storage fundamentals.',
    skills: [
      {
        id: 'sql',
        name: 'SQL',
        category: 'Database',
        description: 'SELECT queries, filtering with WHERE, JOINs, GROUP BY, and aggregations.',
      },
      {
        id: 'database-fundamentals',
        name: 'Database Fundamentals',
        category: 'Database',
        description: 'Primary keys, foreign keys, normalization, ACID properties, and ER diagrams.',
      },
    ],
  },
  {
    category: 'Web Development',
    description: 'Frontend document structure, styling, scripting, and backend APIs.',
    skills: [
      {
        id: 'html',
        name: 'HTML',
        category: 'Web Development',
        description: 'Semantic tags, forms, hyperlinks, multimedia, and document structure.',
      },
      {
        id: 'css',
        name: 'CSS',
        category: 'Web Development',
        description: 'Selectors, box model, Flexbox, CSS Grid, and responsive layouts.',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Web Development',
        description: 'DOM manipulation, ES6 functions, arrays, promises, and event handling.',
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        category: 'Web Development',
        description: 'HTTP methods (GET, POST, PUT, DELETE), status codes, and JSON payloads.',
      },
    ],
  },
  {
    category: 'Data',
    description: 'Spreadsheet modeling, exploratory data analysis, and business intelligence.',
    skills: [
      {
        id: 'excel',
        name: 'Excel',
        category: 'Data',
        description: 'Formulas, VLOOKUP/XLOOKUP, pivot tables, conditional formatting, and charts.',
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        category: 'Data',
        description: 'Data cleaning, summary statistics, outlier detection, and trend interpretation.',
      },
      {
        id: 'power-bi',
        name: 'Power BI',
        category: 'Data',
        description: 'Data modeling, DAX basics, interactive dashboards, and Power Query.',
      },
    ],
  },
  {
    category: 'Soft Skills',
    description: 'Professional workplace communication, collaboration, and analytical thinking.',
    skills: [
      {
        id: 'communication',
        name: 'Communication',
        category: 'Soft Skills',
        description: 'Active listening, clear written emails, and structured technical explanations.',
      },
      {
        id: 'presentation',
        name: 'Presentation',
        category: 'Soft Skills',
        description: 'Slide structuring, audience engagement, visual storytelling, and Q&A handling.',
      },
      {
        id: 'teamwork',
        name: 'Teamwork',
        category: 'Soft Skills',
        description: 'Constructive feedback, task coordination, conflict resolution, and shared goals.',
      },
      {
        id: 'problem-solving',
        name: 'Problem Solving',
        category: 'Soft Skills',
        description: 'Root cause analysis, breaking down complex issues, and evaluating trade-offs.',
      },
    ],
  },
];

export const ALL_SKILLS: SkillItem[] = SKILL_CATEGORIES.flatMap((group) => group.skills);
