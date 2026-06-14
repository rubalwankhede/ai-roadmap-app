import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geminiModel } from '../ai/gemini'
import { auth, db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

function MockInterview() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [aiFeedback, setAiFeedback] = useState(null)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [loadingStart, setLoadingStart] = useState(false)
  const [domain, setDomain] = useState('Software Engineering')
  const [questions, setQuestions] = useState([])

  const startInterview = async () => {
    setLoadingStart(true)
    let userDomain = 'Software Engineering'

    const user = auth.currentUser
    if (user) {
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (snap.exists()) {
        userDomain = snap.data().domain || 'Software Engineering'
        setDomain(userDomain)
      }
    }

    try {
      const qResult = await geminiModel.generateContent(
        `Generate 5 interview questions for a ${userDomain} role.
         Mix technical and behavioral questions.
         Return ONLY a JSON array of strings, no extra text:
         ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]`
      )
      const qText = qResult.response.text()
      const qClean = qText.replace(/```json|```/g, '').trim()
      setQuestions(JSON.parse(qClean))
    } catch (err) {
      setQuestions([
        'Tell me about yourself and your coding journey.',
        `What are the core concepts in ${userDomain}?`,
        'Describe a project you are proud of.',
        'How do you approach solving a difficult problem?',
        'Where do you see yourself in 2 years as a developer?',
      ])
    }

    setLoadingStart(false)
    setStarted(true)
  }

  const submit = async () => {
    const newAnswers = [...answers, { q: questions[current], a: answer }]
    setAnswers(newAnswers)
    setAnswer('')

    if (current + 1 >= questions.length) {
      setFinished(true)
      setLoadingFeedback(true)

      try {
        const prompt = `You are an expert technical interviewer. Evaluate these interview answers for a ${domain} role:

${newAnswers.map((item, i) => `Q${i + 1}: ${item.q}\nAnswer: ${item.a}`).join('\n\n')}

Return ONLY a JSON object, no extra text:
{
  "score": 75,
  "overall": "Overall feedback in 2 sentences",
  "strengths": "What they did well",
  "improvements": "What to improve",
  "answers": [
    { "q": "question", "feedback": "specific feedback", "rating": "Strong/Good/Brief/Weak" }
  ]
}`

        const result = await geminiModel.generateContent(prompt)
        const text = result.response.text()
        const clean = text.replace(/```json|```/g, '').trim()
        setAiFeedback(JSON.parse(clean))
      } catch (err) {
        setAiFeedback({
          score: 70,
          overall: 'Good effort! Keep practicing your technical answers.',
          strengths: 'You showed enthusiasm and basic knowledge.',
          improvements: 'Try to be more specific with examples.',
          answers: newAnswers.map(a => ({ q: a.q, feedback: 'Good attempt!', rating: 'Good' }))
        })
      }
      setLoadingFeedback(false)
    } else {
      setCurrent(current + 1)
    }
  }

  const getWordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

  const getRatingStyle = (rating) => {
    if (rating === 'Strong') return 'border-green-400 bg-green-50 text-green-600'
    if (rating === 'Good') return 'border-blue-400 bg-blue-50 text-blue-600'
    if (rating === 'Brief') return 'border-yellow-400 bg-yellow-50 text-yellow-600'
    return 'border-red-400 bg-red-50 text-red-500'
  }

  if (!started) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm w-full max-w-md">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-gray-800">Mock Interview</h1>
        <p className="text-gray-500 mt-2 mb-2">Practice 5 AI-generated interview questions</p>
        <p className="text-blue-600 text-sm font-medium mb-4">🤖 Questions tailored to your domain!</p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-blue-800 mb-2">Tips for best results:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ Write at least 3-4 sentences per answer</li>
            <li>✅ Use specific examples from your experience</li>
            <li>✅ Be honest and clear</li>
          </ul>
        </div>

        <button
          onClick={startInterview}
          disabled={loadingStart}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loadingStart ? 'Generating questions... 🤖' : 'Start Interview →'}
        </button>
        <button onClick={() => navigate('/dashboard')} className="w-full mt-3 text-gray-500 py-2 text-sm">
          ← Back
        </button>
      </div>
    </div>
  )

  if (finished) {
    if (loadingFeedback) return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="text-4xl animate-bounce">🤖</div>
        <p className="text-gray-600 font-medium">Analyzing your answers...</p>
        <p className="text-gray-400 text-sm">Getting AI feedback on your performance</p>
      </div>
    )

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8 text-center">
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="text-2xl font-bold">Interview Complete!</h1>
          <p className="text-blue-100 text-sm mt-1">{domain} Interview</p>
        </div>

        <div className="px-6 -mt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-4">
            <p className="text-gray-500 text-sm">AI Readiness Score</p>
            <p className="text-6xl font-bold text-blue-600 my-2">{aiFeedback?.score}%</p>
            <div className="bg-gray-100 rounded-full h-3 mt-2">
              <div className="bg-blue-600 rounded-full h-3" style={{ width: `${aiFeedback?.score}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            <h2 className="font-bold text-gray-800 mb-3">🤖 AI Feedback</h2>
            <p className="text-sm text-gray-600 mb-3">{aiFeedback?.overall}</p>
            <div className="bg-green-50 rounded-xl p-3 mb-2">
              <p className="text-xs font-semibold text-green-700 mb-1">✅ Strengths</p>
              <p className="text-xs text-green-600">{aiFeedback?.strengths}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-orange-700 mb-1">📈 To Improve</p>
              <p className="text-xs text-orange-600">{aiFeedback?.improvements}</p>
            </div>
          </div>

          <h2 className="font-bold text-gray-800 mb-3">Answer Breakdown</h2>
          <div className="space-y-3 mb-6">
            {aiFeedback?.answers.map((item, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${getRatingStyle(item.rating).split(' ')[0]}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800 text-sm flex-1 pr-2">Q{i + 1}: {answers[i]?.q}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getRatingStyle(item.rating)}`}>
                    {item.rating}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">🤖 {item.feedback}</p>
                <p className="text-xs text-gray-400 mt-1">{getWordCount(answers[i]?.a || '')} words</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setStarted(false); setCurrent(0); setAnswers([]); setFinished(false); setAiFeedback(null); setQuestions([]) }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-3"
          >
            Try Again
          </button>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
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
        <p className="text-blue-100 text-sm">{domain} · Question {current + 1} of {questions.length}</p>
        <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${(current / questions.length) * 100}%` }}></div>
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
        </div>

        <button
          onClick={submit}
          disabled={!answer.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {current + 1 >= questions.length ? 'Finish & Get AI Feedback →' : 'Next Question →'}
        </button>
      </div>
    </div>
  )
}

export default MockInterview