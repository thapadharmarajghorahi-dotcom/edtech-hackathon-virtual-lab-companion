import { MolecularLogo } from '@/components/MolecularLogo';

export function Loader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
        <MolecularLogo size={40} className="animate-pulse-soft" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground animate-pulse tracking-wide uppercase">
          Loading Experiment
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Preparing your virtual laboratory...
        </p>
      </div>
    </div>
  );
}
