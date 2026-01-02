import { GraduationCap, Users } from 'lucide-react';
import { UserRole } from '@/context/AuthContext';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelect: (role: UserRole) => void;
}

export function RoleSelector({ selectedRole, onSelect }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onSelect('teacher')}
        className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-300 ${
          selectedRole === 'teacher'
            ? 'border-primary bg-primary/5 shadow-glow-primary'
            : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
            selectedRole === 'teacher'
              ? 'gradient-primary shadow-medium'
              : 'bg-muted group-hover:bg-primary/10'
          }`}
        >
          <GraduationCap
            className={`h-7 w-7 transition-colors ${
              selectedRole === 'teacher' ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
            }`}
          />
        </div>
        <div className="text-center">
          <p className="font-display font-semibold text-foreground">Teacher</p>
          <p className="text-xs text-muted-foreground">Manage & assign experiments</p>
        </div>
        {selectedRole === 'teacher' && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            ✓
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={() => onSelect('student')}
        className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-300 ${
          selectedRole === 'student'
            ? 'border-secondary bg-secondary/5 shadow-glow-primary'
            : 'border-border bg-card hover:border-secondary/50 hover:bg-muted'
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
            selectedRole === 'student'
              ? 'gradient-secondary shadow-medium'
              : 'bg-muted group-hover:bg-secondary/10'
          }`}
        >
          <Users
            className={`h-7 w-7 transition-colors ${
              selectedRole === 'student' ? 'text-secondary-foreground' : 'text-muted-foreground group-hover:text-secondary'
            }`}
          />
        </div>
        <div className="text-center">
          <p className="font-display font-semibold text-foreground">Student</p>
          <p className="text-xs text-muted-foreground">Perform & learn experiments</p>
        </div>
        {selectedRole === 'student' && (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
            ✓
          </div>
        )}
      </button>
    </div>
  );
}
