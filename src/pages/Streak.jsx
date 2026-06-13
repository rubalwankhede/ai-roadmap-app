import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Streak() {
  const navigate = useNavigate()
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    bestStreak: 0,
    totalDays: 0,
    completedDates: []
  })

  useEffect(() => {
    const saved = localStorage.getItem('streakData')
    if (saved) {
      setStreakData(JSON.parse(saved))
    }
  }, [])

  const todayStr = new Date().toISOString().split('T')[0]
  const alreadyDoneToday = streakData.completedDates.includes(todayStr)

  const markToday = () => {
    if (alreadyDoneToday) return

    const newDates = [...streakData.completedDates, todayStr]

    // Calculate current streak
    let streak = 1
    let d = new Date()
    d.setDate(d.getDate() - 1)
    while (newDates.includes(d.toISOString().split('T')[0])) {
      streak++
      d.setDate(d.getDate() - 1)
    }

    const newData = {
      completedDates: newDates,
      currentStreak: streak,
      bestStreak: Math.max(streak, streakData.bestStreak),
      totalDays: newDates.length
    }

    localStorage.setItem('streakData', JSON.stringify(newData))
    setStreakData(newData)
  }

  // Get this week's days
  const getThisWeek = () => {
    const week = []
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      const dateStr = d.toISOString().split('T')[0]
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
      week.push({ day: dayName, dateStr, completed: streakData.completedDates.includes(dateStr) })
    }
    return week
  }

  const week = getThisWeek()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-orange-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🔥 My Streak</h1>
        <p className="text-orange-100 text-sm mt-1">Keep going, don't break the chain!</p>
        <div className="mt-4 text-center">
          <p className="text-6xl font-bold">{streakData.currentStreak}</p>
          <p className="text-orange-100">day streak</p>
        </div>
      </div>

      <div className="p-6">
        {/* Mark today button */}
        <button
          onClick={markToday}
          disabled={alreadyDoneToday}
          className={`w-full py-3 rounded-xl font-semibold mb-6 transition duration-200 ${
            alreadyDoneToday
              ? 'bg-green-100 text-green-600 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {alreadyDoneToday ? '✅ Done for today!' : '🔥 Mark today as complete'}
        </button>

        <p className="font-semibold text-gray-700 mb-4">This week</p>
        <div className="grid grid-cols-7 gap-2 mb-8">
          {week.map(({ day, completed }) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                completed ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {completed ? '🔥' : '○'}
              </div>
              <p className="text-xs text-gray-500">{day}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">{streakData.currentStreak}</p>
            <p className="text-xs text-gray-500">Current streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-500">{streakData.bestStreak}</p>
            <p className="text-xs text-gray-500">Best streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-500">{streakData.totalDays}</p>
            <p className="text-xs text-gray-500">Total days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Streak