import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DailyTasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read about React Hooks', duration: '20 mins', done: false },
    { id: 2, title: 'Build a Counter App', duration: '30 mins', done: false },
    { id: 3, title: 'Watch useState tutorial', duration: '15 mins', done: false },
    { id: 4, title: 'Solve 2 JavaScript problems', duration: '25 mins', done: false },
    { id: 5, title: 'Read React docs', duration: '10 mins', done: false },
  ])

  const toggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completed = tasks.filter(t => t.done).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">✅ Daily Tasks</h1>
        <p className="text-blue-100 text-sm mt-1">{completed}/{tasks.length} completed today</p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-xl p-3">
          <div className="bg-white bg-opacity-30 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(completed / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className={`bg-white rounded-2xl p-4 shadow-sm border cursor-pointer transition duration-200 flex items-center gap-4 ${
              task.done ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-blue-300'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              task.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
            }`}>
              {task.done && '✓'}
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">⏱ {task.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyTasks