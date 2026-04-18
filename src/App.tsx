import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthScreen from './screens/auth/AuthScreen';
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import UserLayout from './layouts/UserLayout';
import ProviderLayout from './layouts/ProviderLayout';
import AdminLayout from './layouts/AdminLayout';

// User Screens
import HomeScreen from './screens/user/HomeScreen';
import SearchScreen from './screens/user/SearchScreen';
import BookingsScreen from './screens/user/BookingsScreen';
import ProfileScreen from './screens/user/ProfileScreen';

// Provider Screens
import ProviderDashboard from './screens/provider/ProviderDashboard';
import ProviderJobs from './screens/provider/ProviderJobs';
import ProviderProfile from './screens/provider/ProviderProfile';

// Admin Screens
import AdminDashboard from './screens/admin/AdminDashboard';

import { ReactNode } from 'react';

const PrivateRoute = ({ children, allowedRoles }: { children: ReactNode, allowedRoles?: string[] }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-medium bg-neutral-50">Loading...</div>;

  if (!user) return <Navigate to="/auth" />;

  // If user is authenticated but has no role assigned (new user)
  if (!role && window.location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirect to default based on their actual role
  }

  return <>{children}</>;
};

const RoleBasedRedirect = () => {
  const { role, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-medium bg-neutral-50">Loading...</div>;
  if (!role) return <Navigate to="/role-selection" />;
  if (role === 'admin') return <Navigate to="/admin" />;
  if (role === 'provider') return <Navigate to="/provider" />;
  return <Navigate to="/user" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleBasedRedirect />} />
          <Route path="/auth" element={<AuthScreen />} />
          
          <Route 
            path="/role-selection" 
            element={
              <PrivateRoute>
                <RoleSelectionScreen />
              </PrivateRoute>
            } 
          />

          {/* User Module */}
          <Route path="/user" element={<PrivateRoute allowedRoles={['user']}><UserLayout /></PrivateRoute>}>
            <Route index element={<HomeScreen />} />
            <Route path="search" element={<SearchScreen />} />
            <Route path="bookings" element={<BookingsScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
          </Route>

          {/* Provider Module */}
          <Route path="/provider" element={<PrivateRoute allowedRoles={['provider']}><ProviderLayout /></PrivateRoute>}>
            <Route index element={<ProviderDashboard />} />
            <Route path="jobs" element={<ProviderJobs />} />
            <Route path="profile" element={<ProviderProfile />} />
          </Route>

          {/* Admin Module */}
          <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminDashboard />} />
            {/* Add more admin routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
