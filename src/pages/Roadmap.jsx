import { useNavigate } from 'react-router-dom'

function Roadmap() {
  const navigate = useNavigate()

  const steps = [
    { id: 1, title: 'HTML & CSS Basics', desc: 'Learn the building blocks of the web', status: 'done', duration: '1 week' },
    { id: 2, title: 'JavaScript Fundamentals', desc: 'Variables, functions, loops, arrays', status: 'done', duration: '2 weeks' },
    { id: 3, title: 'React.js', desc: 'Components, hooks, state management', status: 'current', duration: '3 weeks' },
    { id: 4, title: 'Node.js & Express', desc: 'Build backend APIs', status: 'upcoming', duration: '2 weeks' },
    { id: 5, title: 'Database (MongoDB)', desc: 'Store and manage data', status: 'upcoming', duration: '1 week' },
    { id: 6, title: 'Full Stack Project', desc: 'Build a complete web app', status: 'upcoming', duration: '2 weeks' },
    { id: 7, title: 'System Design Basics', desc: 'Learn how to design scalable systems', status: 'upcoming', duration: '1 week' },
    { id: 8, title: 'Job Ready!', desc: 'Apply for jobs with confidence', status: 'upcoming', duration: '🎯' },
  ]

  const statusStyle = {
    done: 'bg-green-500',
    current: 'bg-blue-500 animate-pulse',
    upcoming: 'bg-gray-300',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🗺️ Your Roadmap</h1>
        <p className="text-blue-100 text-sm mt-1">Web Development · Intermediate</p>
      </div>

      <div className="p-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${statusStyle[step.status]}`}>
                {step.status === 'done' ? '✓' : step.id}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
            </div>
            <div className={`bg-white rounded-2xl p-4 flex-1 shadow-sm border ${step.status === 'current' ? 'border-blue-400' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800">{step.title}</p>
                <span className="text-xs text-gray-400">{step.duration}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
              {step.status === 'current' && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mt-2 inline-block">In Progress</span>
              )}
              {step.status === 'done' && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mt-2 inline-block">Completed ✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap