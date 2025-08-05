import { Question } from '@/components/QuestionCard';

export const psychometricQuestions: Question[] = [
  {
    id: 'interest-data',
    type: 'likert',
    title: 'I enjoy working with data, numbers, and financial reports.',
    category: 'Interest Scale',
    description: 'Rate your agreement with this statement.'
  },
  {
    id: 'curiosity-markets',
    type: 'scale',
    title: 'How curious are you about how markets and businesses operate financially?',
    category: 'Interest Scale',
    scaleRange: [1, 10],
    scaleLabels: ['Not curious at all', 'Extremely curious']
  },
  {
    id: 'preference-structure',
    type: 'likert',
    title: 'I prefer structured tasks with clear outcomes.',
    category: 'Work Preference',
    description: 'Consider your natural work style preferences.'
  },
  {
    id: 'enjoy-complex',
    type: 'likert',
    title: 'I enjoy solving complex problems, even if they take time.',
    category: 'Cognitive Style',
    description: 'Think about your approach to challenging problems.'
  },
  {
    id: 'analytical-creative',
    type: 'scale',
    title: 'Rate yourself on the analytical vs creative spectrum.',
    category: 'Cognitive Style',
    scaleRange: [1, 10],
    scaleLabels: ['Highly Creative', 'Highly Analytical']
  },
  {
    id: 'motivation-finance',
    type: 'multiple-choice',
    title: 'What primarily motivates your interest in financial analysis?',
    category: 'Motivation',
    options: [
      'Career growth and financial stability',
      'Genuine interest in financial markets',
      'Problem-solving and analytical challenges',
      'Prestige and professional recognition',
      'Not sure yet'
    ]
  },
  {
    id: 'persistence-challenges',
    type: 'scale',
    title: 'How likely are you to persist when facing difficult challenges?',
    category: 'Grit Assessment',
    scaleRange: [1, 10],
    scaleLabels: ['Give up easily', 'Never give up']
  },
  {
    id: 'growth-mindset',
    type: 'likert',
    title: 'I believe my analytical abilities can be significantly improved through effort.',
    category: 'Growth Mindset',
    description: 'Consider your beliefs about skill development.'
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'logical-sequence',
    type: 'multiple-choice',
    title: 'What comes next in this sequence: 2, 6, 18, 54, ?',
    category: 'Logical Reasoning',
    options: ['108', '162', '216', '270', '324']
  },
  {
    id: 'numerical-pattern',
    type: 'multiple-choice',
    title: 'If a company\'s revenue was $100M in Year 1 and grew by 15% each year, what would it be in Year 3?',
    category: 'Numerical Reasoning',
    options: ['$115M', '$130M', '$132.25M', '$145M', '$150M']
  },
  {
    id: 'excel-knowledge',
    type: 'multiple-choice',
    title: 'Which Excel function would you use to find the highest value in a range?',
    category: 'Prerequisite Knowledge',
    options: ['SUM()', 'MAX()', 'AVERAGE()', 'COUNT()', 'LOOKUP()']
  },
  {
    id: 'balance-sheet',
    type: 'multiple-choice',
    title: 'What does a balance sheet represent?',
    category: 'Financial Knowledge',
    options: [
      'Company profits over time',
      'Financial position at a point in time',
      'Cash flow during a period',
      'Revenue and expenses',
      'Stock price movements'
    ]
  },
  {
    id: 'profit-margin',
    type: 'multiple-choice',
    title: 'Which formula calculates net profit margin?',
    category: 'Financial Knowledge',
    options: [
      '(Revenue - Costs) / Revenue',
      '(Net Income / Revenue) × 100',
      'Revenue / Total Assets',
      'EBITDA / Revenue',
      'Gross Profit / Sales'
    ]
  },
  {
    id: 'roi-understanding',
    type: 'multiple-choice',
    title: 'ROI stands for:',
    category: 'Financial Knowledge',
    options: [
      'Rate of Interest',
      'Return on Investment',
      'Revenue Operating Income',
      'Risk and Opportunity Index',
      'Recorded Operating Information'
    ]
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'will-motivation',
    type: 'scale',
    title: 'How motivated are you to pursue a career in financial analysis?',
    category: 'Will',
    scaleRange: [1, 10],
    scaleLabels: ['Not motivated', 'Extremely motivated']
  },
  {
    id: 'interest-engagement',
    type: 'scale',
    title: 'How engaged do you feel when reading about financial markets or business news?',
    category: 'Interest',
    scaleRange: [1, 10],
    scaleLabels: ['Bored', 'Fascinated']
  },
  {
    id: 'skill-technical',
    type: 'scale',
    title: 'Rate your current technical skills (Excel, data analysis, etc.)',
    category: 'Skill',
    scaleRange: [1, 10],
    scaleLabels: ['Beginner', 'Expert']
  },
  {
    id: 'cognitive-reasoning',
    type: 'scale',
    title: 'How would you rate your logical reasoning and problem-solving abilities?',
    category: 'Cognitive',
    scaleRange: [1, 10],
    scaleLabels: ['Weak', 'Excellent']
  },
  {
    id: 'ability-learning',
    type: 'scale',
    title: 'How quickly do you typically learn new concepts and skills?',
    category: 'Ability to Learn',
    scaleRange: [1, 10],
    scaleLabels: ['Very slowly', 'Very quickly']
  },
  {
    id: 'realworld-fit',
    type: 'multiple-choice',
    title: 'Which work environment appeals to you most?',
    category: 'Real-World Alignment',
    options: [
      'Fast-paced, deadline-driven corporate setting',
      'Collaborative team environment with regular meetings',
      'Independent work with periodic reviews',
      'Dynamic environment with variety in daily tasks',
      'Structured environment with clear processes'
    ]
  },
  {
    id: 'realworld-culture',
    type: 'likert',
    title: 'I thrive in competitive, results-oriented environments.',
    category: 'Real-World Alignment',
    description: 'Consider your fit with typical financial analysis workplace culture.'
  }
];

export const assessmentSections = [
  {
    name: 'Psychometric Assessment',
    description: 'Evaluate your personality traits and work preferences',
    questions: psychometricQuestions,
    timeEstimate: '8-10 minutes'
  },
  {
    name: 'Technical & Aptitude',
    description: 'Test your analytical abilities and domain knowledge',
    questions: technicalQuestions,
    timeEstimate: '10-12 minutes'
  },
  {
    name: 'WISCAR Framework',
    description: 'Comprehensive readiness and fit analysis',
    questions: wiscarQuestions,
    timeEstimate: '5-7 minutes'
  }
];