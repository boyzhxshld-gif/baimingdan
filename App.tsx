
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PlatformConfig from './pages/admin/PlatformConfig';
import CompetitionList from './pages/admin/CompetitionList';
import CompetitionDetail from './pages/admin/CompetitionDetail';
import RegistrationList from './pages/admin/RegistrationList';
import ReviewConsole from './pages/admin/ReviewConsole';
import UserManagement from './pages/admin/UserManagement';
import CandidateRoster from './pages/admin/CandidateRoster';
import CourseManagement from './pages/admin/CourseManagement';
import JudgingSystem from './pages/admin/JudgingSystem';
import PermissionManagement from './pages/admin/PermissionManagement';
import PromotionManagement from './pages/admin/PromotionManagement';
import WorkManagement from './pages/admin/WorkManagement';
import UserAudit from './pages/admin/UserAudit';
import ReviewOverview from './pages/admin/ReviewOverview';
import SchoolManagement from './pages/admin/SchoolManagement';
import AnnouncementManagement from './pages/admin/AnnouncementManagement';
import PublicCompetitionDetail from './pages/CompetitionDetail'; // Public H5 Page

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Public H5 Preview Route */}
        <Route path="/competition/:id" element={<PublicCompetitionDetail />} />

        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="platform" element={<PlatformConfig />} />
          <Route path="competitions" element={<CompetitionList />} />
          <Route path="competitions/:id" element={<CompetitionDetail />} />
          <Route path="registrations" element={<RegistrationList />} />
          <Route path="works" element={<WorkManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="judging" element={<JudgingSystem />} />
          <Route path="review-overview" element={<ReviewOverview />} />
          <Route path="review" element={<ReviewConsole />} />
          <Route path="promotion" element={<PromotionManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="schools" element={<SchoolManagement />} />
          <Route path="audit" element={<UserAudit />} />
          <Route path="roster" element={<CandidateRoster />} />
          <Route path="permissions" element={<PermissionManagement />} />
          <Route path="announcements" element={<AnnouncementManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
