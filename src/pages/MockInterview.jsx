import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MockInterview() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const questions = [
    'Tell me about yourself and your coding journey.',
    'What is the difference between let, const and var in JavaScript?',
    'Explain how React components work.',
    'What is a REST API and how does it work?',
    'Where do you see yourself in 2 years as a developer?',
  ]

  const submit = () => {
    const newAnswers = [...answers, { q: questions[current], a: answer }]
    setAnswers(newAnswers)
    setAnswer('')
    if (current + 1 >= questions.length) setFinished(true)
    else setCurrent(current + 1)
  }

  if (!started) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm w-full max-w-md">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-gray-800">Mock Interview</h1>
        <p className="text-gray-500 mt-2 mb-6">Practice {questions.length} interview questions and get your readiness score!</p>
        <button onClick={() => setStarted(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Start Interview →
        </button>
        <button onClick={() => navigate('/dashboard')} className="w-full mt-3 text-gray-500 py-2 text-sm">
          ← Back
        </button>
      </div>
    </div>
  )

  if (finished) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm w-full max-w-md">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-2xl font-bold text-gray-800">Interview Complete!</h1>
        <p className="text-gray-500 mt-2">Your interview readiness score</p>
        <p className="text-5xl font-bold text-blue-600 my-4">72%</p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-blue-800 mb-2">Feedback:</p>
          <p className="text-sm text-blue-700">Good job! Keep practicing your technical answers and be more specific with examples.</p>
        </div>
        <button onClick={() => navigate('/dashboard')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Back to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <h1 className="text-2xl font-bold">🎯 Mock Interview</h1>
        <p className="text-blue-100 text-sm">Question {current + 1} of {questions.length}</p>
        <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <p className="font-semibold text-gray-800 text-lg">{questions[current]}</p>
        </div>

        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={6}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={submit}
          disabled={!answer.trim()}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {current + 1 >= questions.length ? 'Finish Interview' : 'Next Question →'}
        </button>
      </div>
    </div>
  )
}

export default MockInterview