import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import { TeacherDashboard } from "./pages/teacher/TeacherDashboard";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { ExperimentPage } from "./pages/ExperimentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'teacher' | 'student' }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (user?.role !== allowedRole) {
    return <Navigate to={`/${user?.role}`} replace />;
  }
  
  return <>{children}</>;
}

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <Index />} 
      />
      <Route 
        path="/teacher" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student" 
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/experiment/:id" 
        element={
          <AuthenticatedRoute>
            <ExperimentPage />
          </AuthenticatedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
