import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OHMS_LAW_STEPS = [
  {
    id: 1,
    title: 'Set up the circuit',
    description: 'Connect the battery, ammeter, resistor, and voltmeter in the circuit as shown in the diagram.',
  },
  {
    id: 2,
    title: 'Adjust the voltage',
    description: 'Use the voltage slider to set different voltage values and observe the current changes.',
  },
  {
    id: 3,
    title: 'Record observations',
    description: 'Note down the voltage (V) and current (I) readings for at least 5 different settings.',
  },
  {
    id: 4,
    title: 'Calculate resistance',
    description: 'For each reading, calculate R = V/I and verify it matches the set resistance value.',
  },
  {
    id: 5,
    title: 'Plot the graph',
    description: 'Plot V vs I on graph paper. The slope gives the resistance value.',
  },
  {
    id: 6,
    title: 'Draw conclusions',
    description: 'Verify that V ∝ I (voltage is directly proportional to current) for a constant resistance.',
  },
];

export function ProcedureSteps() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / OHMS_LAW_STEPS.length) * 100;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-foreground">Procedure Steps</h3>
          <span className="text-xs text-muted-foreground">
            {completedSteps.length}/{OHMS_LAW_STEPS.length} completed
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <>
          <div className="px-4 pb-2">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-4 pt-2 space-y-3">
            {OHMS_LAW_STEPS.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-secondary/10 border border-secondary/30' 
                      : 'bg-muted/50 hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-secondary' : 'text-foreground'}`}>
                      Step {step.id}: {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {completedSteps.length === OHMS_LAW_STEPS.length && (
            <div className="p-4 bg-secondary/10 border-t border-secondary/20">
              <p className="text-sm text-secondary font-medium text-center">
                🎉 All steps completed! You can now record your observations.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
