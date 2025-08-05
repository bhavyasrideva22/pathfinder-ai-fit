import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RadarDataPoint {
  label: string;
  value: number;
  maxValue: number;
  description?: string;
}

interface RadarChartProps {
  title: string;
  description?: string;
  data: RadarDataPoint[];
  size?: number;
}

export const RadarChart = ({ title, description, data, size = 300 }: RadarChartProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 40;
  
  // Calculate polygon points for the data
  const calculatePoints = (values: number[]) => {
    const angleStep = (2 * Math.PI) / values.length;
    return values.map((value, index) => {
      const angle = (angleStep * index) - (Math.PI / 2);
      const radius = (value / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Calculate label positions
  const labelPositions = data.map((_, index) => {
    const angleStep = (2 * Math.PI) / data.length;
    const angle = (angleStep * index) - (Math.PI / 2);
    const labelRadius = maxRadius + 25;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, angle };
  });

  // Create grid circles
  const gridCircles = [20, 40, 60, 80, 100].map(percentage => {
    const radius = (percentage / 100) * maxRadius;
    return (
      <circle
        key={percentage}
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity="0.3"
      />
    );
  });

  // Create grid lines
  const gridLines = data.map((_, index) => {
    const angleStep = (2 * Math.PI) / data.length;
    const angle = (angleStep * index) - (Math.PI / 2);
    const endX = centerX + maxRadius * Math.cos(angle);
    const endY = centerY + maxRadius * Math.sin(angle);
    return (
      <line
        key={index}
        x1={centerX}
        y1={centerY}
        x2={endX}
        y2={endY}
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity="0.3"
      />
    );
  });

  const normalizedValues = data.map(d => (d.value / d.maxValue) * 100);
  const dataPoints = calculatePoints(normalizedValues);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <svg width={size} height={size} className="overflow-visible">
            {/* Grid */}
            {gridCircles}
            {gridLines}
            
            {/* Data polygon */}
            <polygon
              points={dataPoints}
              fill="hsl(var(--primary))"
              fillOpacity="0.2"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {normalizedValues.map((value, index) => {
              const angleStep = (2 * Math.PI) / data.length;
              const angle = (angleStep * index) - (Math.PI / 2);
              const radius = (value / 100) * maxRadius;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(var(--primary))"
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
            
            {/* Labels */}
            {data.map((item, index) => {
              const pos = labelPositions[index];
              return (
                <text
                  key={index}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-xs font-medium"
                  transform={`rotate(${pos.angle * 180 / Math.PI}, ${pos.x}, ${pos.y})`}
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}/{item.maxValue}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};