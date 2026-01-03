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
    <div className="min-h-screen bg-[#020617] relative overflow-hidden text-slate-200">
      {/* Cool Interactive Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <Navbar />

      <main className="container relative z-10 py-10">
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h1>
            <span className="text-4xl animate-bounce">🔬</span>
          </div>
          <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
            Ready to dive into the world of science? Your personalized virtual laboratory is all set for today's experiments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {studentStats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md animate-slide-up group hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Banner */}
        <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-600/10 to-purple-600/20 border border-white/10 animate-fade-in shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors" />
          <div className="relative flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 shadow-glow-primary group-hover:rotate-12 transition-transform duration-500">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Keep up the great work!
              </h3>
              <p className="text-slate-400 font-medium">
                Complete 2 more experiments this week to earn the <span className="text-primary font-bold">Lab Explorer</span> badge
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
