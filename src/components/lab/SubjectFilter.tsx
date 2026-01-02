import { Subject, SUBJECTS } from '@/utils/constants';
import { Atom, FlaskConical, Microscope, LayoutGrid } from 'lucide-react';

interface SubjectFilterProps {
  selected: Subject | 'all';
  onSelect: (subject: Subject | 'all') => void;
}

const filters = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: SUBJECTS.PHYSICS, label: 'Physics', icon: Atom },
  { key: SUBJECTS.CHEMISTRY, label: 'Chemistry', icon: FlaskConical },
  { key: SUBJECTS.BIOLOGY, label: 'Biology', icon: Microscope },
] as const;

export function SubjectFilter({ selected, onSelect }: SubjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onSelect(key as Subject | 'all')}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            selected === key
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
