import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketTicker from './components/MarketTicker';
import Features from './components/Features';
import LearningPath from './components/LearningPath';
import Footer from './components/Footer';
import CourseLayout from './components/course/CourseLayout';
import LessonView from './components/course/LessonView';
import PlaceholderPage from './components/auth/PlaceholderPage';
import EnrollmentSuccess from './components/auth/EnrollmentSuccess';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDashboard from './components/course/CourseDashboard';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <Hero />
      <MarketTicker />
      <Features />
      <LearningPath />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
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
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
