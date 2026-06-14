import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { geminiModel } from '../ai/gemini'

function DailyTasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState('')

  useEffect(() => {
    const generateTasks = async () => {
      const user = auth.currentUser
      if (!user) return

      // Get current roadmap step
      const roadmapSnap = await getDoc(doc(db, 'roadmaps', user.uid))
      let step = 'Web Development basics'
      let domain = 'Web Development'

      if (roadmapSnap.exists()) {
        const data = roadmapSnap.data()
        const currentStepObj = data.steps?.find(s => s.status === 'current')
        if (currentStepObj) {
          step = currentStepObj.title
          domain = data.domain || 'Web Development'
        }
      }

      setCurrentStep(step)

      // Check if tasks already generated today
      const today = new Date().toISOString().split('T')[0]
      const savedTasks = localStorage.getItem(`tasks_${today}_${user.uid}`)
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
        setLoading(false)
        return
      }

      try {
        const prompt = `Generate 5 daily learning tasks for someone currently studying "${step}" in ${domain}.
        Return ONLY a JSON array, no extra text:
        [
          { "id": 1, "title": "Task title", "duration": "X mins", "done": false },
          { "id": 2, "title": "Task title", "duration": "X mins", "done": false }
        ]
        Make tasks specific, actionable and achievable in the given time.`

        const result = await geminiModel.generateContent(prompt)
        const text = result.response.text()
        const clean = text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)

        localStorage.setItem(`tasks_${today}_${user.uid}`, JSON.stringify(parsed))
        setTasks(parsed)
      } catch (err) {
        console.error(err)
        setTasks([
          { id: 1, title: `Study ${step} concepts`, duration: '30 mins', done: false },
          { id: 2, title: 'Practice with a small project', duration: '45 mins', done: false },
          { id: 3, title: 'Watch a tutorial video', duration: '20 mins', done: false },
          { id: 4, title: 'Read documentation', duration: '15 mins', done: false },
          { id: 5, title: 'Solve 2 practice problems', duration: '25 mins', done: false },
        ])
      }

      setLoading(false)
    }

    generateTasks()
  }, [])

  const toggle = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    setTasks(updated)
    const user = auth.currentUser
    if (user) {
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem(`tasks_${today}_${user.uid}`, JSON.stringify(updated))
    }
  }

  const completed = tasks.filter(t => t.done).length

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-bounce">✅</div>
      <p className="text-gray-600 font-medium">Generating your daily tasks...</p>
      <p className="text-gray-400 text-sm">Based on your current roadmap step</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">✅ Daily Tasks</h1>
        <p className="text-blue-100 text-sm mt-1">{completed}/{tasks.length} completed today</p>
        <p className="text-blue-200 text-xs mt-1">📍 Current step: {currentStep}</p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-xl p-3">
          <div className="bg-white bg-opacity-30 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: tasks.length ? `${(completed / tasks.length) * 100}%` : '0%' }}
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