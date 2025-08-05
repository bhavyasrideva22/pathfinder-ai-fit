import { useState } from 'react';
import { AssessmentHeader } from './AssessmentHeader';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { AssessmentResultsComponent } from './AssessmentResults';
import { useAssessment } from '@/hooks/useAssessment';
import { assessmentSections } from '@/data/assessmentQuestions';

export const Assessment = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const {
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
  } = useAssessment();

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    setHasStarted(false);
    // Reset assessment state would go here
    window.location.reload(); // Simple reset for now
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-assessment-bg">
        <div className="container mx-auto px-6 py-12">
          <AssessmentIntro onStart={handleStart} />
        </div>
      </div>
    );
  }

  if (isComplete) {
    const results = generateResults();
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <AssessmentResultsComponent results={results} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];
  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0);
  const currentQuestionNumber = assessmentSections
    .slice(0, currentSection)
    .reduce((sum, section) => sum + section.questions.length, 0) + currentQuestion + 1;

  const getSectionKey = (): 'psychometric' | 'technical' | 'wiscar' => {
    const sectionKeys = ['psychometric', 'technical', 'wiscar'] as const;
    return sectionKeys[currentSection];
  };

  const handleAnswer = (answer: any) => {
    updateAnswer(getSectionKey(), currentQuestionData.id, answer);
  };

  const handleNext = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      nextQuestion();
    } else if (currentSection < assessmentSections.length - 1) {
      nextSection();
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      previousQuestion();
    } else if (currentSection > 0) {
      // Go to previous section's last question
      // This would need more complex logic in a real implementation
    }
  };

  const isLastQuestion = currentSection === assessmentSections.length - 1 && 
                        currentQuestion === currentSectionData.questions.length - 1;

  return (
    <div className="min-h-screen bg-assessment-bg">
      <AssessmentHeader
        title={`PathCheck: Financial Analyst Assessment`}
        subtitle={currentSectionData.name}
        currentStep={currentQuestionNumber}
        totalSteps={totalQuestions}
        timeEstimate={currentSectionData.timeEstimate}
      />
      
      <div className="container mx-auto px-6 py-12">
        <QuestionCard
          question={currentQuestionData}
          answer={answers[getSectionKey()][currentQuestionData.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={currentQuestionNumber > 1 ? handlePrevious : undefined}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};