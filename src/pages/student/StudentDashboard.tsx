import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { ExperimentCard } from '@/components/lab/ExperimentCard';
import { SubjectFilter } from '@/components/lab/SubjectFilter';
import { EXPERIMENTS, Subject, Experiment } from '@/utils/constants';
import { 
  Trophy,
  Target,
  Flame,
  Clock,
  Star,
  Bookmark
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const studentStats = [
  { label: 'Completed', value: '8', icon: Trophy, color: 'text-secondary' },
  { label: 'In Progress', value: '3', icon: Target, color: 'text-primary' },
  { label: 'Day Streak', value: '5', icon: Flame, color: 'text-destructive' },
  { label: 'Time Spent', value: '4.5h', icon: Clock, color: 'text-accent' },
];

// Simulate assigned and completed experiments
const assignedIds = ['ohms-law', 'acid-base-titration', 'microscope-observation'];
const completedIds = ['pendulum', 'ph-testing'];

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');

  const enhancedExperiments: Experiment[] = EXPERIMENTS.map(exp => ({
    ...exp,
    isAssigned: assignedIds.includes(exp.id),
    isCompleted: completedIds.includes(exp.id),
  }));

  const assignedExperiments = enhancedExperiments.filter(exp => exp.isAssigned);
  const completedExperiments = enhancedExperiments.filter(exp => exp.isCompleted);
  const allExperiments = selectedSubject === 'all' 
    ? enhancedExperiments 
    : enhancedExperiments.filter(exp => exp.subject === selectedSubject);

  const handleStartExperiment = (id: string) => {
    navigate(`/experiment/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Hey, {user?.name}! 
            </h1>
            <span className="text-3xl">🔬</span>
          </div>
          <p className="text-muted-foreground">
            Ready to explore science? Your assigned experiments are waiting.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {studentStats.map((stat, index) => (
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

        {/* Achievement Banner */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
              <Star className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                Keep up the great work!
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete 2 more experiments this week to earn the "Lab Explorer" badge
              </p>
            </div>
          </div>
        </div>

        {/* Experiments Tabs */}
        <Tabs defaultValue="assigned" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="assigned" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Assigned ({assignedExperiments.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <Trophy className="h-4 w-4" />
                Completed ({completedExperiments.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="gap-2">
                All Experiments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="assigned" className="space-y-4">
            {assignedExperiments.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedExperiments.map((experiment, index) => (
                  <div 
                    key={experiment.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ExperimentCard 
                      experiment={experiment}
                      onStart={handleStartExperiment}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No experiments assigned yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedExperiments.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedExperiments.map((experiment, index) => (
                  <div 
                    key={experiment.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ExperimentCard 
                      experiment={experiment}
                      onStart={handleStartExperiment}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>Complete your first experiment to see it here!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <SubjectFilter selected={selectedSubject} onSelect={setSelectedSubject} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allExperiments.map((experiment, index) => (
                <div 
                  key={experiment.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ExperimentCard 
                    experiment={experiment}
                    onStart={handleStartExperiment}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
