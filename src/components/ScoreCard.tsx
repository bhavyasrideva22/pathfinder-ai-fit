import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  interpretation?: string;
  className?: string;
}

export const ScoreCard = ({ 
  title, 
  score, 
  maxScore = 100, 
  description, 
  interpretation, 
  className 
}: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (percent: number) => {
    if (percent >= 80) return "text-score-excellent";
    if (percent >= 65) return "text-score-good";
    if (percent >= 50) return "text-score-average";
    return "text-score-poor";
  };

  const getScoreBg = (percent: number) => {
    if (percent >= 80) return "bg-score-excellent";
    if (percent >= 65) return "bg-score-good";
    if (percent >= 50) return "bg-score-average";
    return "bg-score-poor";
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={cn("text-3xl font-bold", getScoreColor(percentage))}>
              {score}
            </span>
            <span className="text-muted-foreground">/ {maxScore}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Score</span>
              <span>{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className={cn("h-3 rounded-full transition-all duration-500", getScoreBg(percentage))}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {interpretation && (
            <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted rounded-lg">
              {interpretation}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};