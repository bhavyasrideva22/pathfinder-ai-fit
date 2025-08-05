import { useState, useCallback } from 'react';
import { Question } from '@/components/QuestionCard';

export interface AssessmentData {
  psychometric: Record<string, any>;
  technical: Record<string, any>;
  wiscar: Record<string, any>;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'YES' | 'MAYBE' | 'NO';
  insights: string[];
  careerPaths: string[];
  learningPath: string[];
  alternatives?: string[];
}

export const useAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentData>({
    psychometric: {},
    technical: {},
    wiscar: {}
  });
  const [isComplete, setIsComplete] = useState(false);

  const updateAnswer = useCallback((section: keyof AssessmentData, questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: answer
      }
    }));
  }, []);

  const calculatePsychometricScore = useCallback((data: Record<string, any>): number => {
    // Simplified scoring logic - in a real app, this would be more sophisticated
    const scores = Object.values(data).filter(value => typeof value === 'number');
    if (scores.length === 0) return 0;
    
    const average = scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length;
    return Math.round(average);
  }, []);

  const calculateTechnicalScore = useCallback((data: Record<string, any>): number => {
    // Technical assessment scoring
    let correctAnswers = 0;
    let totalQuestions = 0;

    // Sample scoring logic for technical questions
    Object.entries(data).forEach(([questionId, answer]) => {
      totalQuestions++;
      
      // Define correct answers for each question type
      if (questionId.includes('balance-sheet') && answer === 'Financial position at a point in time') {
        correctAnswers++;
      } else if (questionId.includes('profit-margin') && answer === '(Net Income / Revenue) × 100') {
        correctAnswers++;
      } else if (questionId.includes('logical') && typeof answer === 'number' && answer >= 7) {
        correctAnswers++;
      }
    });

    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  }, []);

  const calculateWiscarScores = useCallback((data: Record<string, any>) => {
    // WISCAR framework scoring
    const categories = {
      will: ['motivation', 'persistence', 'drive'],
      interest: ['curiosity', 'engagement', 'fascination'],
      skill: ['technical', 'analytical', 'tools'],
      cognitive: ['reasoning', 'problem-solving', 'analysis'],
      ability: ['learning', 'adaptation', 'growth'],
      realWorld: ['fit', 'environment', 'culture']
    };

    const scores: Record<string, number> = {};

    Object.entries(categories).forEach(([dimension, keywords]) => {
      const relevantAnswers = Object.entries(data)
        .filter(([questionId]) => keywords.some(keyword => questionId.includes(keyword)))
        .map(([, answer]) => typeof answer === 'number' ? answer : 5);
      
      if (relevantAnswers.length > 0) {
        scores[dimension] = Math.round(
          relevantAnswers.reduce((sum, score) => sum + score, 0) / relevantAnswers.length * 10
        );
      } else {
        scores[dimension] = 50; // Default if no relevant answers
      }
    });

    return scores as AssessmentResults['wiscarScores'];
  }, []);

  const generateResults = useCallback((): AssessmentResults => {
    const psychometricScore = calculatePsychometricScore(answers.psychometric);
    const technicalScore = calculateTechnicalScore(answers.technical);
    const wiscarScores = calculateWiscarScores(answers.wiscar);

    const overallScore = Math.round(
      (psychometricScore * 0.3 + technicalScore * 0.4 + 
       Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.3)
    );

    let recommendation: 'YES' | 'MAYBE' | 'NO';
    if (overallScore >= 75) recommendation = 'YES';
    else if (overallScore >= 50) recommendation = 'MAYBE';
    else recommendation = 'NO';

    const insights = [
      `Your analytical thinking shows ${psychometricScore >= 70 ? 'strong' : 'developing'} potential.`,
      `Technical readiness is ${technicalScore >= 70 ? 'excellent' : technicalScore >= 50 ? 'good' : 'needs improvement'}.`,
      `WISCAR analysis indicates ${overallScore >= 70 ? 'high' : 'moderate'} career fit.`
    ];

    const careerPaths = [
      'Junior Financial Analyst',
      'Corporate Budget Analyst',
      'Equity Research Assistant',
      'FP&A Analyst',
      'Risk Analyst'
    ];

    const learningPath = [
      'Stage 1: Basic Finance & Excel',
      'Stage 2: Financial Modeling & Budgeting',
      'Stage 3: Advanced Analytics & Case Studies'
    ];

    const alternatives = recommendation === 'NO' ? [
      'Business Analyst',
      'Data Analyst',
      'Marketing Analyst'
    ] : undefined;

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      insights,
      careerPaths,
      learningPath,
      alternatives
    };
  }, [answers, calculatePsychometricScore, calculateTechnicalScore, calculateWiscarScores]);

  const nextQuestion = useCallback(() => {
    setCurrentQuestion(prev => prev + 1);
  }, []);

  const previousQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  }, []);

  const nextSection = useCallback(() => {
    setCurrentSection(prev => prev + 1);
    setCurrentQuestion(0);
  }, []);

  const completeAssessment = useCallback(() => {
    setIsComplete(true);
  }, []);

  return {
    currentSection,
    currentQuestion,
    answers,
    isComplete,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    nextSection,
    completeAssessment,
    generateResults
  };
};