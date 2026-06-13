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

  const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

  const getAnswerQuality = (text) => {
    const words = getWordCount(text)
    if (words >= 50) return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-400' }
    if (words >= 20) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-400' }
    if (words >= 10) return { label: 'Brief', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-400' }
    return { label: 'Too Short', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-400' }
  }

  const getOverallScore = () => {
    const total = answers.reduce((sum, a) => sum + getWordCount(a.a), 0)
    const avg = total / answers.length
    if (avg >= 50) return { score: 90, msg: 'Excellent! Very detailed answers.' }
    if (avg >= 30) return { score: 75, msg: 'Good job! Try to add more examples.' }
    if (avg >= 15) return { score: 55, msg: 'Decent start. Practice giving more detail.' }
    return { score: 35, msg: 'Keep practicing! Try to elaborate more on each answer.' }
  }

  if (!started) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm w-full max-w-md">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-gray-800">Mock Interview</h1>
        <p className="text-gray-500 mt-2 mb-2">Practice {questions.length} interview questions</p>
        
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-blue-800 mb-2">Tips for best results:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ Write at least 3-4 sentences per answer</li>
            <li>✅ Use specific examples from your experience</li>
            <li>✅ Be honest and clear</li>
          </ul>
        </div>

        <button onClick={() => setStarted(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Start Interview →
        </button>
        <button onClick={() => navigate('/dashboard')} className="w-full mt-3 text-gray-500 py-2 text-sm">
          ← Back
        </button>
      </div>
    </div>
  )

  if (finished) {
    const { score, msg } = getOverallScore()
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8 text-center">
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="text-2xl font-bold">Interview Complete!</h1>
        </div>

        <div className="px-6 -mt-4">
          {/* Score card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-4">
            <p className="text-gray-500 text-sm">Your Readiness Score</p>
            <p className="text-6xl font-bold text-blue-600 my-2">{score}%</p>
            <div className="bg-gray-100 rounded-full h-3 mt-2">
              <div
                className="bg-blue-600 rounded-full h-3 transition-all duration-500"
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 mt-4">
              <p className="text-sm text-blue-700 font-medium">{msg}</p>
            </div>
          </div>

          {/* Answer review */}
          <h2 className="font-bold text-gray-800 mb-3">Your Answers</h2>
          <div className="space-y-3 mb-6">
            {answers.map((item, i) => {
              const quality = getAnswerQuality(item.a)
              return (
                <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${quality.border}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800 text-sm flex-1 pr-2">Q{i + 1}: {item.q}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${quality.bg} ${quality.color} whitespace-nowrap`}>
                      {quality.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.a}</p>
                  <p className="text-xs text-gray-400 mt-1">{getWordCount(item.a)} words</p>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => { setStarted(false); setCurrent(0); setAnswers([]); setFinished(false) }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-3"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

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
          placeholder="Type your answer here... (aim for 3-4 sentences)"
          rows={6}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1 mb-4">
          <span>{getWordCount(answer)} words</span>
          <span>{answer.length > 0 && getAnswerQuality(answer).label}</span>
        </div>

        <button
          onClick={submit}
          disabled={!answer.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {current + 1 >= questions.length ? 'Finish Interview' : 'Next Question →'}
        </button>
      </div>
    </div>
  )
}

export default MockInterview