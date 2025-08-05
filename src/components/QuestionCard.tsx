import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'likert';
  title: string;
  description?: string;
  options?: string[];
  scaleRange?: [number, number];
  scaleLabels?: [string, string];
  category: string;
}

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (answer: any) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
  isLastQuestion?: boolean;
}

export const QuestionCard = ({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  showNavigation = true,
  isLastQuestion = false
}: QuestionCardProps) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup value={answer} onValueChange={onAnswer}>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label 
                    htmlFor={`${question.id}-${index}`}
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'scale':
        const [min, max] = question.scaleRange || [1, 10];
        return (
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={answer ? [answer] : [Math.floor((min + max) / 2)]}
                onValueChange={(value) => onAnswer(value[0])}
                min={min}
                max={max}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.scaleLabels?.[0] || min}</span>
              {answer && (
                <span className="font-medium text-foreground">{answer}</span>
              )}
              <span>{question.scaleLabels?.[1] || max}</span>
            </div>
          </div>
        );

      case 'likert':
        const likertOptions = [
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree'
        ];
        return (
          <RadioGroup value={answer} onValueChange={onAnswer}>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {likertOptions.map((option, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label 
                    htmlFor={`${question.id}-${index}`}
                    className="text-xs text-center cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {question.category}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.title}</CardTitle>
        {question.description && (
          <CardDescription className="text-base">
            {question.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestionInput()}
        
        {showNavigation && (
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={onPrevious}
              disabled={!onPrevious}
            >
              Previous
            </Button>
            <Button 
              onClick={onNext}
              disabled={!answer || !onNext}
              className={cn(
                isLastQuestion && "bg-success hover:bg-success/90"
              )}
            >
              {isLastQuestion ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};