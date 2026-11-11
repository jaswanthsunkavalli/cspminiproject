import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ResidentDashboard } from './pages/ResidentDashboard';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { MyComplaintsPage } from './pages/MyComplaintsPage';
import { ComplaintDetailsPage } from './pages/ComplaintDetailsPage';
import { CommunitySurveyPage } from './pages/CommunitySurveyPage';
import { EducationAccessibilityPage } from './pages/EducationAccessibilityPage';
import { DrainageEnvironmentalPage } from './pages/DrainageEnvironmentalPage';
import { CommunityAwarenessPage } from './pages/CommunityAwarenessPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { VillageProfilePage } from './pages/VillageProfilePage';
import { AboutProjectPage } from './pages/AboutProjectPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-slate-500">
        Authenticating user session...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin / Volunteer Route Guard
const RoleRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isVolunteer, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs text-slate-500">
        Verifying administrative permissions...
      </div>
    );
  }
  if (!user || !isVolunteer) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ResidentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report-issue"
                element={
                  <ProtectedRoute>
                    <ReportIssuePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-complaints"
                element={
                  <ProtectedRoute>
                    <MyComplaintsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/complaints/:id"
                element={
                  <ProtectedRoute>
                    <ComplaintDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/community-survey" element={<CommunitySurveyPage />} />
              <Route path="/education-accessibility" element={<EducationAccessibilityPage />} />
              <Route path="/drainage-environmental" element={<DrainageEnvironmentalPage />} />
              <Route path="/awareness" element={<CommunityAwarenessPage />} />

              <Route
                path="/admin"
                element={
                  <RoleRoute>
                    <AdminDashboardPage />
                  </RoleRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <RoleRoute>
                    <ReportsAnalyticsPage />
                  </RoleRoute>
                }
              />

              <Route path="/village-profile" element={<VillageProfilePage />} />
              <Route path="/about" element={<AboutProjectPage />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileSettingsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
