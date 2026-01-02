import { FlaskConical } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-glow-primary">
          <FlaskConical className="h-8 w-8 text-primary-foreground animate-pulse-soft" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading experiment...</p>
    </div>
  );
}
