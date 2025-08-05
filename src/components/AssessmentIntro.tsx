import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Target, BookOpen, TrendingUp } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const careerPaths = [
    "Investment Analyst",
    "Budget Analyst", 
    "Corporate Finance Associate",
    "Portfolio Analyst",
    "Equity Research Associate"
  ];

  const idealTraits = [
    "High analytical reasoning",
    "Attention to detail",
    "Comfort with numbers and datasets",
    "Curiosity about markets",
    "Persistence and growth mindset"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          PathCheck: Financial Analyst
        </h1>
        <h2 className="text-2xl text-primary">
          Readiness & Fit Assessment
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover if you're well-suited—psychologically, cognitively, and technically—to pursue a learning path and career in Financial Analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* What is Financial Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              What is Financial Analysis?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Financial Analysts assess economic trends, analyze financial statements, and make recommendations for investments, budgeting, and forecasting.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Typical Career Paths:</h4>
              <div className="flex flex-wrap gap-2">
                {careerPaths.map((path) => (
                  <Badge key={path} variant="secondary" className="text-xs">
                    {path}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideal Traits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Ideal Traits for Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {idealTraits.map((trait) => (
                <div key={trait} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Assessment Overview
          </CardTitle>
          <CardDescription>
            This comprehensive evaluation consists of three main sections:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-primary">1. Psychometric Section</h4>
              <p className="text-sm text-muted-foreground">
                Evaluate personality traits, interests, and work preferences using Big Five, Holland Code, and motivation assessments.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                8-10 minutes
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-primary">2. Technical & Aptitude</h4>
              <p className="text-sm text-muted-foreground">
                Test analytical abilities, numerical reasoning, and domain-specific knowledge in finance and tools.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                10-12 minutes
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-primary">3. WISCAR Framework</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                5-7 minutes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Get */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            What You'll Receive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Comprehensive Scoring</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Psychological Fit Score (0-100)</li>
                <li>• Technical Readiness Score (0-100)</li>
                <li>• WISCAR Radar Chart Analysis</li>
                <li>• Overall Confidence Score</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Personalized Guidance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clear YES/MAYBE/NO recommendation</li>
                <li>• Career paths and role suggestions</li>
                <li>• Customized learning roadmap</li>
                <li>• Alternative career options</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-lg px-8 py-6"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Total estimated time: 20-30 minutes
        </p>
      </div>
    </div>
  );
};