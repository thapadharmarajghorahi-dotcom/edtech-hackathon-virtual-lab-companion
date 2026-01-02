import { Experiment, getSubjectColor, getSubjectGradient, SUBJECTS } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Atom, FlaskConical, Microscope, Play, CheckCircle } from 'lucide-react';

interface ExperimentCardProps {
  experiment: Experiment;
  onStart: (id: string) => void;
  isTeacher?: boolean;
  onAssign?: (id: string) => void;
}

const SubjectIcon = ({ subject }: { subject: string }) => {
  switch (subject) {
    case SUBJECTS.PHYSICS:
      return <Atom className="h-5 w-5" />;
    case SUBJECTS.CHEMISTRY:
      return <FlaskConical className="h-5 w-5" />;
    case SUBJECTS.BIOLOGY:
      return <Microscope className="h-5 w-5" />;
    default:
      return <FlaskConical className="h-5 w-5" />;
  }
};

export function ExperimentCard({ experiment, onStart, isTeacher, onAssign }: ExperimentCardProps) {
  const subjectColor = getSubjectColor(experiment.subject);
  const subjectGradient = getSubjectGradient(experiment.subject);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-medium hover:border-primary/30">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${subjectGradient}`} />
      
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${subjectColor}/10`}>
            <div className={`text-${subjectColor}`}>
              <SubjectIcon subject={experiment.subject} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {experiment.isCompleted && (
              <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1">
                <CheckCircle className="h-3 w-3 text-secondary" />
                <span className="text-xs font-medium text-secondary">Done</span>
              </div>
            )}
            <Badge variant="outline" className="capitalize">
              {experiment.difficulty}
            </Badge>
          </div>
        </div>

        <h3 className="mb-2 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {experiment.title}
        </h3>
        
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {experiment.description}
        </p>

        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{experiment.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="capitalize font-medium text-foreground">{experiment.subject}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onStart(experiment.id)}
            className="flex-1 gap-2"
            size="sm"
          >
            <Play className="h-3.5 w-3.5" />
            {isTeacher ? 'Preview' : 'Start'}
          </Button>
          {isTeacher && onAssign && (
            <Button 
              variant="outline"
              onClick={() => onAssign(experiment.id)}
              size="sm"
            >
              Assign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
