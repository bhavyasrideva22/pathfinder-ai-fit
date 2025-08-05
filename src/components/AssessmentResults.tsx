import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssessmentResults } from "@/hooks/useAssessment";
import { ScoreCard } from "./ScoreCard";
import { RadarChart } from "./RadarChart";
import { CheckCircle, AlertCircle, XCircle, BookOpen, Users, Target, Download } from "lucide-react";

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const AssessmentResultsComponent = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'YES': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'MAYBE': return <AlertCircle className="h-6 w-6 text-warning" />;
      case 'NO': return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'YES': return 'text-success';
      case 'MAYBE': return 'text-warning';
      case 'NO': return 'text-destructive';
    }
  };

  const getRecommendationBg = () => {
    switch (results.recommendation) {
      case 'YES': return 'bg-success-light';
      case 'MAYBE': return 'bg-warning-light';
      case 'NO': return 'bg-destructive/10';
    }
  };

  const wiscarData = [
    { label: 'Will', value: results.wiscarScores.will, maxValue: 100 },
    { label: 'Interest', value: results.wiscarScores.interest, maxValue: 100 },
    { label: 'Skill', value: results.wiscarScores.skill, maxValue: 100 },
    { label: 'Cognitive', value: results.wiscarScores.cognitive, maxValue: 100 },
    { label: 'Ability', value: results.wiscarScores.ability, maxValue: 100 },
    { label: 'Real-World', value: results.wiscarScores.realWorld, maxValue: 100 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Your Assessment Results</h1>
        <p className="text-lg text-muted-foreground">
          Complete analysis of your readiness for a Financial Analyst career
        </p>
      </div>

      {/* Primary Recommendation */}
      <Card className={`border-2 ${getRecommendationBg()}`}>
        <CardHeader>
          <div className="flex items-center justify-center gap-3">
            {getRecommendationIcon()}
            <CardTitle className={`text-2xl ${getRecommendationColor()}`}>
              {results.recommendation === 'YES' && 'Recommended: Pursue Financial Analysis'}
              {results.recommendation === 'MAYBE' && 'Conditional: Consider with preparation'}
              {results.recommendation === 'NO' && 'Not Recommended: Explore alternatives'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-foreground">
              {results.overallScore}%
            </div>
            <p className="text-lg text-muted-foreground">Overall Confidence Score</p>
            
            {results.recommendation === 'YES' && (
              <p className="text-center max-w-2xl mx-auto">
                You demonstrate strong foundational traits and readiness for a Financial Analyst role. 
                Your analytical abilities, interest level, and learning capacity suggest high potential for success.
              </p>
            )}
            {results.recommendation === 'MAYBE' && (
              <p className="text-center max-w-2xl mx-auto">
                You show promise for Financial Analysis but would benefit from targeted skill development. 
                Focus on strengthening your technical knowledge and analytical capabilities.
              </p>
            )}
            {results.recommendation === 'NO' && (
              <p className="text-center max-w-2xl mx-auto">
                Your assessment suggests that other career paths might be a better fit. 
                Consider the alternative roles suggested below that better align with your strengths.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <ScoreCard
          title="Psychological Fit"
          score={results.psychometricScore}
          description="Personality and interest alignment"
          interpretation={
            results.psychometricScore >= 70 
              ? "Strong psychological alignment with financial analyst roles"
              : results.psychometricScore >= 50
              ? "Moderate fit with room for development"
              : "Limited psychological alignment"
          }
        />
        
        <ScoreCard
          title="Technical Readiness" 
          score={results.technicalScore}
          description="Analytical abilities and domain knowledge"
          interpretation={
            results.technicalScore >= 70
              ? "Excellent technical foundation"
              : results.technicalScore >= 50
              ? "Good foundation, some skill gaps to address"
              : "Significant technical development needed"
          }
        />
        
        <ScoreCard
          title="Overall Readiness"
          score={results.overallScore}
          description="Composite readiness score"
          interpretation={
            results.overallScore >= 75
              ? "High readiness for career transition"
              : results.overallScore >= 50
              ? "Moderate readiness with focused preparation"
              : "Consider alternative career paths"
          }
        />
      </div>

      {/* WISCAR Analysis */}
      <RadarChart
        title="WISCAR Framework Analysis"
        description="Comprehensive readiness assessment across six key dimensions"
        data={wiscarData}
      />

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p className="text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Career Paths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.careerPaths.map((path, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium">{index + 1}.</div>
                  <div className="text-sm">{path}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Suggested Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.learningPath.map((stage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                  <div className="text-sm text-muted-foreground">{stage}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Careers (if applicable) */}
      {results.alternatives && (
        <Card>
          <CardHeader>
            <CardTitle>Alternative Career Suggestions</CardTitle>
            <CardDescription>
              Based on your strengths, these roles might be a better fit:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.alternatives.map((alt) => (
                <Badge key={alt} variant="secondary">
                  {alt}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onRestart}>
          Retake Assessment
        </Button>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
};