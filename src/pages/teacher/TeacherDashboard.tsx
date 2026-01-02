import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { ExperimentCard } from '@/components/lab/ExperimentCard';
import { SubjectFilter } from '@/components/lab/SubjectFilter';
import { EXPERIMENTS, Subject } from '@/utils/constants';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const stats = [
  { label: 'Total Students', value: '45', icon: Users, color: 'text-primary' },
  { label: 'Experiments Assigned', value: '12', icon: BookOpen, color: 'text-secondary' },
  { label: 'Completion Rate', value: '78%', icon: TrendingUp, color: 'text-accent' },
  { label: 'Avg. Time', value: '32 min', icon: Clock, color: 'text-physics' },
];

export function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');

  const filteredExperiments = selectedSubject === 'all' 
    ? EXPERIMENTS 
    : EXPERIMENTS.filter(exp => exp.subject === selectedSubject);

  const handleStartExperiment = (id: string) => {
    navigate(`/experiment/${id}`);
  };

  const handleAssignExperiment = (id: string) => {
    const experiment = EXPERIMENTS.find(e => e.id === id);
    toast.success(`"${experiment?.title}" assigned to all students`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your virtual lab experiments and track student progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="p-4 rounded-xl bg-card border border-border shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Preview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { student: 'Aarav Sharma', action: 'completed', experiment: "Ohm's Law", time: '2 hours ago', status: 'success' },
                { student: 'Priya Patel', action: 'started', experiment: 'Acid-Base Titration', time: '3 hours ago', status: 'info' },
                { student: 'Rahul Kumar', action: 'needs help', experiment: 'Microscope Observation', time: '4 hours ago', status: 'warning' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`p-1.5 rounded-full ${
                    activity.status === 'success' ? 'bg-secondary/20' :
                    activity.status === 'warning' ? 'bg-destructive/20' : 'bg-primary/20'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-secondary" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <Clock className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.student}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-primary">{activity.experiment}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="font-display font-semibold text-foreground mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Physics</span>
                  <span className="font-medium text-physics">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-physics rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Chemistry</span>
                  <span className="font-medium text-chemistry">72%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-chemistry rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Biology</span>
                  <span className="font-medium text-biology">68%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-biology rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experiments Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Experiment Library
          </h2>
          <SubjectFilter selected={selectedSubject} onSelect={setSelectedSubject} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperiments.map((experiment, index) => (
            <div 
              key={experiment.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ExperimentCard 
                experiment={experiment}
                onStart={handleStartExperiment}
                isTeacher
                onAssign={handleAssignExperiment}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
