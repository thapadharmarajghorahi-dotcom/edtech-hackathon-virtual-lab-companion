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
    <div className="min-h-screen bg-[#020617] relative overflow-hidden text-slate-200">
      {/* Cool Interactive Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <Navbar />

      <main className="container relative z-10 py-10">
        <div className="mb-10 animate-fade-in">
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-3 text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
            Manage your virtual lab experiments and track student progress with real-time insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md animate-slide-up group hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
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

        {/* Analytics Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                Recent Activity
              </h2>
              <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { student: 'Aarav Sharma', action: 'completed', experiment: "Ohm's Law", time: '2 hours ago', status: 'success' },
                { student: 'Priya Patel', action: 'started', experiment: 'Acid-Base Titration', time: '3 hours ago', status: 'info' },
                { student: 'Rahul Kumar', action: 'needs help', experiment: 'Microscope Observation', time: '4 hours ago', status: 'warning' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all group/item">
                  <div className={`p-2.5 rounded-full ${activity.status === 'success' ? 'bg-green-500/20' :
                      activity.status === 'warning' ? 'bg-orange-500/20' : 'bg-blue-500/20'
                    } group-hover/item:scale-110 transition-transform`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">
                      <span className="font-bold text-white">{activity.student}</span>
                      {' '}<span className="text-slate-400 font-medium">{activity.action}</span>{' '}
                      <span className="text-primary font-bold">{activity.experiment}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-tighter">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
            <h2 className="font-display text-xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/20 font-bold">
                %
              </div>
              Quick Stats
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Physics', value: '85%', color: 'from-blue-500/50 to-blue-600/50', text: 'text-blue-400' },
                { label: 'Chemistry', value: '72%', color: 'from-purple-500/50 to-purple-600/50', text: 'text-purple-400' },
                { label: 'Biology', value: '68%', color: 'from-green-500/50 to-green-600/50', text: 'text-green-400' },
              ].map((sub, i) => (
                <div key={i} className="group/progress">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">{sub.label}</span>
                    <span className={`font-black ${sub.text}`}>{sub.value}</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full bg-gradient-to-r ${sub.color} rounded-full transition-all duration-1000 group-hover/progress:opacity-80`}
                      style={{ width: sub.value }}
                    />
                  </div>
                </div>
              ))}
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
