import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function KnowledgeLevel() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')

  const levels = [
    { id: 'beginner', emoji: '🌱', title: 'Beginner', desc: 'I am just starting out' },
    { id: 'intermediate', emoji: '🔥', title: 'Intermediate', desc: 'I know the basics already' },
    { id: 'advanced', emoji: '⚡', title: 'Advanced', desc: 'I have solid experience' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🧠</div>
          <h1 className="text-2xl font-bold text-gray-800">Your knowledge level?</h1>
          <p className="text-gray-500 text-sm">Step 2 of 4</p>
        </div>

        <div className="space-y-4">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelected(level.id)}
              className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition duration-200 ${
                selected === level.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="text-3xl">{level.emoji}</span>
              <div>
                <p className="font-semibold text-gray-800">{level.title}</p>
                <p className="text-sm text-gray-500">{level.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => selected && navigate('/domain')}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default KnowledgeLevel