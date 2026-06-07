import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const cards = [
    { emoji: '🗺️', title: 'My Roadmap', desc: 'View your learning path', path: '/roadmap' },
    { emoji: '✅', title: 'Daily Tasks', desc: 'Complete today\'s tasks', path: '/tasks' },
    { emoji: '🧪', title: 'Take a Quiz', desc: 'Test your knowledge', path: '/quiz' },
    { emoji: '🤖', title: 'AI Chatbot', desc: 'Ask anything', path: '/chatbot' },
    { emoji: '🔥', title: 'My Streak', desc: 'Track consistency', path: '/streak' },
    { emoji: '🎯', title: 'Mock Interview', desc: 'Practice interviews', path: '/interview' },
    { emoji: '💼', title: 'Job Matches', desc: 'See job recommendations', path: '/jobs' },
    { emoji: '📄', title: 'Resume Scan', desc: 'Upload your resume', path: '/resume' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="text-blue-100 mt-1">Continue your journey to becoming a Software Engineer</p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>24%</span>
          </div>
          <div className="bg-white bg-opacity-30 rounded-full h-2">
            <div className="bg-white rounded-full h-2 w-1/4"></div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition duration-200"
          >
            <div className="text-3xl mb-2">{card.emoji}</div>
            <p className="font-semibold text-gray-800 text-sm">{card.title}</p>
            <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard