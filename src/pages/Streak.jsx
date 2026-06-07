import { useNavigate } from 'react-router-dom'

function Streak() {
  const navigate = useNavigate()

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const completed = [true, true, true, true, false, false, false]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-orange-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🔥 My Streak</h1>
        <p className="text-orange-100 text-sm mt-1">Keep going, don't break the chain!</p>
        <div className="mt-4 text-center">
          <p className="text-6xl font-bold">4</p>
          <p className="text-orange-100">day streak</p>
        </div>
      </div>

      <div className="p-6">
        <p className="font-semibold text-gray-700 mb-4">This week</p>
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                completed[i] ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {completed[i] ? '🔥' : '○'}
              </div>
              <p className="text-xs text-gray-500">{day}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">4</p>
            <p className="text-xs text-gray-500">Current streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-500">12</p>
            <p className="text-xs text-gray-500">Best streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-500">18</p>
            <p className="text-xs text-gray-500">Total days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Streak