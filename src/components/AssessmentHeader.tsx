import { Progress } from "@/components/ui/progress";

interface AssessmentHeaderProps {
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
  timeEstimate?: string;
}

export const AssessmentHeader = ({ 
  title, 
  subtitle, 
  currentStep, 
  totalSteps, 
  timeEstimate 
}: AssessmentHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{subtitle}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              {timeEstimate && (
                <span className="text-muted-foreground">
                  Est. time: {timeEstimate}
                </span>
              )}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};