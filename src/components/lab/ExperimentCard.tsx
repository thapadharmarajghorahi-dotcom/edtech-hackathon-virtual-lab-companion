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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-white/20">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${subjectGradient} opacity-70 group-hover:opacity-100 transition-opacity`} />
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${subjectGradient} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`} />

      <div className="p-6">
        <div className="mb-5 flex items-start justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${subjectColor}/10 border border-${subjectColor}/20 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
            <div className={`text-${subjectColor} drop-shadow-[0_0_8px_rgba(currentColor,0.4)]`}>
              <SubjectIcon subject={experiment.subject} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {experiment.isCompleted && (
              <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 border border-green-500/20">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Done</span>
              </div>
            )}
            <Badge variant="secondary" className="bg-white/5 border-white/10 text-xs font-semibold capitalize backdrop-blur-sm">
              {experiment.difficulty}
            </Badge>
          </div>
        </div>

        <h3 className="mb-2 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {experiment.title}
        </h3>

        <p className="mb-5 text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {experiment.description}
        </p>

        <div className="mb-6 flex items-center gap-5 text-xs text-muted-foreground/70">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary/60" />
            <span className="font-medium tracking-wide">{experiment.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 capitalize">
            <div className={`w-2 h-2 rounded-full bg-${subjectColor}`} />
            <span className="font-semibold text-foreground/80 tracking-wide">{experiment.subject}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onStart(experiment.id)}
            className="flex-1 gap-2 font-bold shadow-lg hover:shadow-primary/20 transition-all duration-300 transform active:scale-95"
            size="sm"
          >
            <Play className="h-4 w-4 fill-current" />
            {isTeacher ? 'Preview' : 'Start Experiment'}
          </Button>
          {isTeacher && onAssign && (
            <Button
              variant="outline"
              onClick={() => onAssign(experiment.id)}
              size="sm"
              className="px-4 font-semibold border-white/10 hover:bg-white/5 transition-all"
            >
              Assign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
