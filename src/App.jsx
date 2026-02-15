import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Landing page sections
import HeroSection from './components/landing/HeroSection';
import MarketTicker from './components/landing/MarketTicker';
import FeaturesSection from './components/landing/FeaturesSection';
import LearningPathSection from './components/landing/LearningPathSection';

// Common / utility components
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy load heavy components
const CourseLayout = lazy(() => import('./components/course/layout/CourseLayout'));
const CourseDashboard = lazy(() => import('./components/course/dashboard/CourseDashboard'));
const LessonView = lazy(() => import('./components/course/lesson/LessonView'));
const PlaceholderPage = lazy(() => import('./components/auth/PlaceholderPage'));
const EnrollmentSuccess = lazy(() => import('./components/auth/EnrollmentSuccess'));

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <HeroSection />
      <MarketTicker />
      <FeaturesSection />
      <LearningPathSection />
      <Footer />
    </div>
  );
}

// Loading component
function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#020617] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PlaceholderPage title="Login" />} />
            <Route path="/register" element={<PlaceholderPage title="Register" />} />
            <Route path="/enrollment-success" element={<EnrollmentSuccess />} />

            {/* Course Routes - Protected */}
            <Route path="/learn" element={
              <ProtectedRoute>
                <CourseLayout />
              </ProtectedRoute>
            }>
              <Route index element={<CourseDashboard />} />
              <Route path=":lessonId" element={<LessonView />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
