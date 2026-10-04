/**
 * Predefined Question Bank for SkillCheck AI
 * Includes questions for all 17 skills across Programming, Database,
 * Web Development, Data, and Soft Skills.
 */

import { SkillLevel } from './skillsData';

export interface Question {
  id: string;
  question: string;
  skill: string;
  category: string;
  difficulty: SkillLevel;
  type: 'MCQ';
  options: {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  marks: number;
  explanation: string;
}

export const QUESTION_BANK: Question[] = [
  // ==================== PROGRAMMING: PYTHON ====================
  {
    id: 'py-1',
    question: 'What is the output of print(2 + 3)?',
    skill: 'Python',
    category: 'Programming',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '23' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'In Python, the + operator adds two integers (2 and 3) to output 5.',
  },
  {
    id: 'py-2',
    question: 'Which Python data type stores key-value pairs using curly braces {}?',
    skill: 'Python',
    category: 'Programming',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'List' },
      { label: 'B', text: 'Tuple' },
      { label: 'C', text: 'Dictionary' },
      { label: 'D', text: 'Set' },
    ],
    correctAnswer: 'C',
    marks: 10,
    explanation: 'A dictionary (dict) in Python stores mappings of unique keys to values, e.g., {"name": "Asha"}.',
  },
  {
    id: 'py-3',
    question: 'What is the output of [x * 2 for x in range(3)] in Python?',
    skill: 'Python',
    category: 'Programming',
    difficulty: 'Advanced',
    type: 'MCQ',
    options: [
      { label: 'A', text: '[2, 4, 6]' },
      { label: 'B', text: '[0, 2, 4]' },
      { label: 'C', text: '[0, 1, 2]' },
      { label: 'D', text: '[1, 2, 3]' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'range(3) produces 0, 1, 2. Multiplying each by 2 in a list comprehension yields [0, 2, 4].',
  },

  // ==================== PROGRAMMING: JAVA ====================
  {
    id: 'java-1',
    question: 'Which keyword is used to define a class in Java?',
    skill: 'Java',
    category: 'Programming',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'struct' },
      { label: 'B', text: 'class' },
      { label: 'C', text: 'object' },
      { label: 'D', text: 'define' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Java uses the "class" keyword to declare a new class definition.',
  },
  {
    id: 'java-2',
    question: 'Which OOP concept allows a subclass in Java to provide a specific implementation of a parent method?',
    skill: 'Java',
    category: 'Programming',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Method Overriding' },
      { label: 'B', text: 'Variable Shadowing' },
      { label: 'C', text: 'Garbage Collection' },
      { label: 'D', text: 'Autoboxing' },
    ],
    correctAnswer: 'A',
    marks: 10,
    explanation: 'Method overriding occurs when a subclass redefines a method with the same signature as its superclass.',
  },

  // ==================== PROGRAMMING: C ====================
  {
    id: 'c-1',
    question: 'Which operator is used to get the memory address of a variable in C?',
    skill: 'C',
    category: 'Programming',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: '*' },
      { label: 'B', text: '&' },
      { label: 'C', text: '#' },
      { label: 'D', text: '->' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'The address-of operator (&) returns the memory address of a variable in C.',
  },
  {
    id: 'c-2',
    question: 'Which standard library function dynamically allocates a block of memory in C?',
    skill: 'C',
    category: 'Programming',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'scanf()' },
      { label: 'B', text: 'malloc()' },
      { label: 'C', text: 'printf()' },
      { label: 'D', text: 'sizeof()' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'malloc() (memory allocation) from <stdlib.h> dynamically allocates bytes on the heap.',
  },

  // ==================== PROGRAMMING: DATA STRUCTURES ====================
  {
    id: 'ds-1',
    question: 'Which data structure operates on the Last-In, First-Out (LIFO) principle?',
    skill: 'Data Structures',
    category: 'Programming',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Queue' },
      { label: 'B', text: 'Stack' },
      { label: 'C', text: 'Linked List' },
      { label: 'D', text: 'Binary Search Tree' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'A Stack follows Last-In, First-Out (LIFO), where elements are pushed and popped from the top.',
  },
  {
    id: 'ds-2',
    question: 'What is the worst-case time complexity of binary search on a sorted array of N elements?',
    skill: 'Data Structures',
    category: 'Programming',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'O(N)' },
      { label: 'B', text: 'O(N log N)' },
      { label: 'C', text: 'O(log N)' },
      { label: 'D', text: 'O(1)' },
    ],
    correctAnswer: 'C',
    marks: 10,
    explanation: 'Binary search halves the search space on each comparison, resulting in O(log N) time complexity.',
  },

  // ==================== DATABASE: SQL ====================
  {
    id: 'sql-1',
    question: 'Which SQL command is used to retrieve data?',
    skill: 'SQL',
    category: 'Database',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'INSERT' },
      { label: 'B', text: 'UPDATE' },
      { label: 'C', text: 'SELECT' },
      { label: 'D', text: 'DELETE' },
    ],
    correctAnswer: 'C',
    marks: 10,
    explanation: 'The SELECT statement is used to query and retrieve rows from one or more database tables.',
  },
  {
    id: 'sql-2',
    question: 'Which SQL clause is used to filter grouped rows created by a GROUP BY clause?',
    skill: 'SQL',
    category: 'Database',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'WHERE' },
      { label: 'B', text: 'HAVING' },
      { label: 'C', text: 'ORDER BY' },
      { label: 'D', text: 'DISTINCT' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'HAVING filters groups after aggregation, whereas WHERE filters individual rows before grouping.',
  },
  {
    id: 'sql-3',
    question: 'Which JOIN returns all rows from the left table and matched rows from the right table (or NULL if no match)?',
    skill: 'SQL',
    category: 'Database',
    difficulty: 'Advanced',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'INNER JOIN' },
      { label: 'B', text: 'LEFT JOIN' },
      { label: 'C', text: 'CROSS JOIN' },
      { label: 'D', text: 'SELF JOIN' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'A LEFT JOIN (or LEFT OUTER JOIN) preserves all records from the left table even when no matching right record exists.',
  },

  // ==================== DATABASE: DATABASE FUNDAMENTALS ====================
  {
    id: 'dbf-1',
    question: 'Which key uniquely identifies each record in a relational database table and cannot contain NULL values?',
    skill: 'Database Fundamentals',
    category: 'Database',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Foreign Key' },
      { label: 'B', text: 'Primary Key' },
      { label: 'C', text: 'Secondary Index' },
      { label: 'D', text: 'Composite Attribute' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'A Primary Key uniquely identifies every tuple/row in a table and enforces entity integrity (no NULLs).',
  },
  {
    id: 'dbf-2',
    question: 'What is the primary purpose of database normalization?',
    skill: 'Database Fundamentals',
    category: 'Database',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'To increase data redundancy' },
      { label: 'B', text: 'To minimize data redundancy and prevent update anomalies' },
      { label: 'C', text: 'To encrypt database passwords' },
      { label: 'D', text: 'To convert SQL tables into HTML files' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Normalization organizes attributes and tables to reduce redundant data and avoid insertion, update, and deletion anomalies.',
  },

  // ==================== WEB DEVELOPMENT: HTML ====================
  {
    id: 'html-1',
    question: 'Which HTML tag is used to create a hyperlink?',
    skill: 'HTML',
    category: 'Web Development',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: '<p>' },
      { label: 'B', text: '<a>' },
      { label: 'C', text: '<img>' },
      { label: 'D', text: '<link>' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'The <a> (anchor) tag with the href attribute defines a clickable hyperlink in HTML.',
  },
  {
    id: 'html-2',
    question: 'Which attribute on an <img> element provides alternative text for screen readers and when an image fails to load?',
    skill: 'HTML',
    category: 'Web Development',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'title' },
      { label: 'B', text: 'alt' },
      { label: 'C', text: 'src' },
      { label: 'D', text: 'caption' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'The "alt" attribute provides accessible fallback text describing the image content.',
  },

  // ==================== WEB DEVELOPMENT: CSS ====================
  {
    id: 'css-1',
    question: 'In the CSS Box Model, which property controls the space INSIDE the border, between the border and the content?',
    skill: 'CSS',
    category: 'Web Development',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'margin' },
      { label: 'B', text: 'padding' },
      { label: 'C', text: 'outline' },
      { label: 'D', text: 'gap' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Padding is the inner spacing between an element’s content and its border; margin is outside the border.',
  },
  {
    id: 'css-2',
    question: 'In CSS Flexbox, which property aligns flex items along the main axis?',
    skill: 'CSS',
    category: 'Web Development',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'align-items' },
      { label: 'B', text: 'justify-content' },
      { label: 'C', text: 'flex-wrap' },
      { label: 'D', text: 'z-index' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'justify-content distributes space and aligns items along the main axis of the flex container.',
  },

  // ==================== WEB DEVELOPMENT: JAVASCRIPT ====================
  {
    id: 'js-1',
    question: 'Which JavaScript method converts a JSON string into a JavaScript object?',
    skill: 'JavaScript',
    category: 'Web Development',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'JSON.stringify()' },
      { label: 'B', text: 'JSON.parse()' },
      { label: 'C', text: 'JSON.toObject()' },
      { label: 'D', text: 'Object.fromJSON()' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'JSON.parse() parses a valid JSON string and constructs the JavaScript value or object described by the string.',
  },
  {
    id: 'js-2',
    question: 'Which array method creates a new array populated with the results of calling a function on every element?',
    skill: 'JavaScript',
    category: 'Web Development',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Array.prototype.forEach()' },
      { label: 'B', text: 'Array.prototype.map()' },
      { label: 'C', text: 'Array.prototype.push()' },
      { label: 'D', text: 'Array.prototype.find()' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: '.map() transforms each item and returns a new array of the same length without mutating the original array.',
  },

  // ==================== WEB DEVELOPMENT: REST APIS ====================
  {
    id: 'api-1',
    question: 'Which HTTP status code indicates that a GET request succeeded and the response payload is returned?',
    skill: 'REST APIs',
    category: 'Web Development',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: '200 OK' },
      { label: 'B', text: '404 Not Found' },
      { label: 'C', text: '500 Internal Server Error' },
      { label: 'D', text: '301 Moved Permanently' },
    ],
    correctAnswer: 'A',
    marks: 10,
    explanation: 'HTTP 200 OK is the standard status code for successful HTTP requests.',
  },
  {
    id: 'api-2',
    question: 'In a RESTful API, which HTTP method is conventionally used to create a new resource on the server?',
    skill: 'REST APIs',
    category: 'Web Development',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'GET' },
      { label: 'B', text: 'POST' },
      { label: 'C', text: 'DELETE' },
      { label: 'D', text: 'HEAD' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'POST is used to submit an entity to the specified resource, creating a new record on the server.',
  },

  // ==================== DATA: EXCEL ====================
  {
    id: 'xl-1',
    question: 'Every formula or function in Microsoft Excel must begin with which character?',
    skill: 'Excel',
    category: 'Data',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: '#' },
      { label: 'B', text: '=' },
      { label: 'C', text: '@' },
      { label: 'D', text: ':' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'All Excel formulas start with the equals sign (=), such as =SUM(A1:A10).',
  },
  {
    id: 'xl-2',
    question: 'Which Excel feature allows you to quickly summarize, group, and cross-tabulate large tables of data without writing formulas?',
    skill: 'Excel',
    category: 'Data',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Goal Seek' },
      { label: 'B', text: 'PivotTable' },
      { label: 'C', text: 'Freeze Panes' },
      { label: 'D', text: 'Data Validation' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'PivotTables interactively group, filter, and aggregate large datasets by rows, columns, and values.',
  },

  // ==================== DATA: DATA ANALYSIS ====================
  {
    id: 'da-1',
    question: 'Which measure of central tendency is LEAST affected by extreme outliers in a dataset?',
    skill: 'Data Analysis',
    category: 'Data',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Mean (Average)' },
      { label: 'B', text: 'Median' },
      { label: 'C', text: 'Range' },
      { label: 'D', text: 'Standard Deviation' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'The median is the middle value of a sorted dataset, making it robust against extreme high or low outliers.',
  },
  {
    id: 'da-2',
    question: 'What is the best chart type to visualize the relationship or correlation between two continuous numerical variables?',
    skill: 'Data Analysis',
    category: 'Data',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Pie Chart' },
      { label: 'B', text: 'Scatter Plot' },
      { label: 'C', text: 'Donut Chart' },
      { label: 'D', text: 'Gantt Chart' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'A scatter plot plots pairs of numerical variables on X and Y axes to reveal correlation patterns and clusters.',
  },

  // ==================== DATA: POWER BI ====================
  {
    id: 'pbi-1',
    question: 'Which component in Power BI Desktop is used to clean, transform, and shape data before loading it into the model?',
    skill: 'Power BI',
    category: 'Data',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Power Query Editor' },
      { label: 'B', text: 'Report Canvas' },
      { label: 'C', text: 'DAX Studio' },
      { label: 'D', text: 'Bookmark Navigator' },
    ],
    correctAnswer: 'A',
    marks: 10,
    explanation: 'Power Query Editor handles ETL (Extract, Transform, Load) steps like removing nulls, splitting columns, and changing types.',
  },
  {
    id: 'pbi-2',
    question: 'What is the formula language used in Power BI to create custom calculated columns and measures?',
    skill: 'Power BI',
    category: 'Data',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'VBA' },
      { label: 'B', text: 'DAX (Data Analysis Expressions)' },
      { label: 'C', text: 'CSS' },
      { label: 'D', text: 'JSON' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'DAX (Data Analysis Expressions) is the formula language used across Power BI for dynamic measures and calculations.',
  },

  // ==================== SOFT SKILLS: COMMUNICATION ====================
  {
    id: 'comm-1',
    question: 'When writing a professional technical email to a professor or project lead, what should the subject line do?',
    skill: 'Communication',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Be left blank to create curiosity' },
      { label: 'B', text: 'Clearly summarize the specific topic and any action required' },
      { label: 'C', text: 'Contain the entire body paragraph of the email' },
      { label: 'D', text: 'Use all-uppercase text with exclamation marks' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'A concise, specific subject line helps the recipient immediately understand the context and priority.',
  },
  {
    id: 'comm-2',
    question: 'In active listening during a project discussion, what is the best way to confirm you understood a complex requirement?',
    skill: 'Communication',
    category: 'Soft Skills',
    difficulty: 'Intermediate',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Interrupt the speaker to share your own code' },
      { label: 'B', text: 'Paraphrase the key points back to the speaker and ask for confirmation' },
      { label: 'C', text: 'Nod silently even if parts of the requirement are unclear' },
      { label: 'D', text: 'Wait until the deadline to ask what they meant' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Paraphrasing back in your own words verifies shared understanding and catches misalignments early.',
  },

  // ==================== SOFT SKILLS: PRESENTATION ====================
  {
    id: 'pres-1',
    question: 'What is a key best practice when designing slides for a technical project presentation?',
    skill: 'Presentation',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Paste full pages of small source code onto every slide' },
      { label: 'B', text: 'Keep slides focused on one core visual or key takeaway with concise bullet points' },
      { label: 'C', text: 'Read long paragraphs word-for-word with your back to the audience' },
      { label: 'D', text: 'Use 8 different fonts and flashing animations on every slide' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Clean slides with one main takeaway per slide allow the audience to focus on your spoken explanation.',
  },

  // ==================== SOFT SKILLS: TEAMWORK ====================
  {
    id: 'team-1',
    question: 'If two team members disagree on which technology to use for a group project, what is the most constructive approach?',
    skill: 'Teamwork',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Let each person build a separate incompatible version' },
      { label: 'B', text: 'Compare pros and cons against project requirements and team familiarity' },
      { label: 'C', text: 'Ignore the disagreement until the night before submission' },
      { label: 'D', text: 'Refuse to participate unless your choice is selected' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Evaluating options objectively against project goals and constraints builds consensus and better outcomes.',
  },

  // ==================== SOFT SKILLS: PROBLEM SOLVING ====================
  {
    id: 'prob-1',
    question: 'When debugging an application error that you have never seen before, what should be your first step?',
    skill: 'Problem Solving',
    category: 'Soft Skills',
    difficulty: 'Beginner',
    type: 'MCQ',
    options: [
      { label: 'A', text: 'Delete the entire project and start over' },
      { label: 'B', text: 'Read the exact error message/stack trace and reproduce the issue consistently' },
      { label: 'C', text: 'Randomly change lines of code without testing' },
      { label: 'D', text: 'Hide the error message with an empty try/catch block' },
    ],
    correctAnswer: 'B',
    marks: 10,
    explanation: 'Understanding the exact error output and isolating a reproducible test case is the foundation of systematic debugging.',
  },
];
