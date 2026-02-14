import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketTicker from './components/MarketTicker';
import Features from './components/Features';
import LearningPath from './components/LearningPath';
import Footer from './components/Footer';
import CourseLayout from './components/course/CourseLayout';
import LessonView from './components/course/LessonView';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Course Routes */}
        <Route path="/learn" element={<CourseLayout />}>
          <Route path=":lessonId" element={<LessonView />} />
          {/* Redirect or default view if no lesson selected, usually handled in layout or index route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
