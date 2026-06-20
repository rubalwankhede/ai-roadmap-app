import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import SignIn from './pages/signIn'
import Onboarding from './pages/Onboarding'
import KnowledgeLevel from './pages/KnowledgeLevel'
import DomainSelection from './pages/DomainSelection'
import ResumeUpload from './pages/ResumeUpload'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import DailyTasks from './pages/DailyTasks'
import Quiz from './pages/Quiz'
import Chatbot from './pages/Chatbot'
import Streak from './pages/Streak'
import MockInterview from './pages/MockInterview'
import JobRecommendations from './pages/JobRecommendations'
import BottomNav from './components/BottomNav'

const noNavPages = ['/', '/onboarding', '/knowledge', '/domain', '/resume']

function Layout() {
  const location = useLocation()
  const showNav = !noNavPages.includes(location.pathname)

  return (
    <>
      <div className={showNav ? 'pb-16' : ''}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/knowledge" element={<KnowledgeLevel />} />
          <Route path="/domain" element={<DomainSelection />} />
          <Route path="/resume" element={<ResumeUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/tasks" element={<DailyTasks />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/streak" element={<Streak />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/jobs" element={<JobRecommendations />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App