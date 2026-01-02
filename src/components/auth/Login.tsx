import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import { RoleSelector } from './RoleSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FlaskConical, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !selectedRole) {
      toast.error('Please fill all fields and select a role');
      return;
    }

    login(email, selectedRole, name);
    toast.success(`Welcome, ${name}!`);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow-primary animate-float">
            <FlaskConical className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            VirtualLab
          </h1>
          <p className="mt-2 text-muted-foreground">
            Interactive Science Laboratory Simulator
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 shadow-medium">
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary/5 p-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm text-foreground">
              Explore Physics, Chemistry & Biology experiments
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Your Role</Label>
              <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base gap-2">
              Enter Lab
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Designed for +2 level education • Works offline
        </p>
      </div>
    </div>
  );
}
