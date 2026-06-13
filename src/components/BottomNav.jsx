import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { emoji: '🏠', label: 'Home', path: '/dashboard' },
    { emoji: '🗺️', label: 'Roadmap', path: '/roadmap' },
    { emoji: '✅', label: 'Tasks', path: '/tasks' },
    { emoji: '🤖', label: 'Chat', path: '/chatbot' },
    { emoji: '👤', label: 'Profile', path: '/streak' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center px-3 py-1 rounded-xl transition-all ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.emoji}</span>
            <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default BottomNav