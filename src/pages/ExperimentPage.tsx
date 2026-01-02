import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { LabCanvas } from '@/components/lab/LabCanvas';
import { ProcedureSteps } from '@/components/lab/ProcedureSteps';
import { ObservationPanel } from '@/components/lab/ObservationPanel';
import { EXPERIMENTS } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Info, Clock, Target, Beaker } from 'lucide-react';

export function ExperimentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const experiment = EXPERIMENTS.find(e => e.id === id);
  
  if (!experiment) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Experiment not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The experiment you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
      </div>
    );
  }

  // For now, only Ohm's Law has a simulation
  const hasSimulation = experiment.id === 'ohms-law';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {experiment.title}
                </h1>
                <Badge variant="outline" className="capitalize">
                  {experiment.subject}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {experiment.description}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{experiment.duration}</span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {experiment.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Simulation & Observations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Simulation Canvas */}
            {hasSimulation ? (
              <div className="animate-slide-up">
                <LabCanvas />
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-muted/50 border border-border text-center animate-fade-in">
                <Beaker className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Simulation Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground">
                  The interactive simulation for this experiment is under development.
                </p>
              </div>
            )}

            {/* Observation Panel */}
            {hasSimulation && (
              <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <ObservationPanel />
              </div>
            )}
          </div>

          {/* Right Column - Info & Procedure */}
          <div className="space-y-6">
            {/* Objectives */}
            <div className="p-4 rounded-xl bg-card border border-border animate-slide-up" style={{ animationDelay: '50ms' }}>
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                Objectives
              </h3>
              <ul className="space-y-2">
                {experiment.objectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {index + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apparatus */}
            <div className="p-4 rounded-xl bg-card border border-border animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
                <Beaker className="h-4 w-4 text-secondary" />
                Apparatus Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {experiment.apparatus.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Procedure Steps */}
            {hasSimulation && (
              <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                <ProcedureSteps />
              </div>
            )}

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-1">Did you know?</h4>
                  <p className="text-xs text-muted-foreground">
                    {experiment.subject === 'physics' && "Ohm's Law was discovered by Georg Simon Ohm in 1827. It forms the foundation of electrical circuit analysis."}
                    {experiment.subject === 'chemistry' && "The word 'titration' comes from the French word 'titre', meaning 'title' or 'standard'."}
                    {experiment.subject === 'biology' && "The first microscope was invented by Zacharias Janssen around 1590."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
