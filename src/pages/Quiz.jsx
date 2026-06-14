import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { geminiModel } from '../ai/gemini'

function Quiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState('Web Development')
  const [level, setLevel] = useState('Beginner')

  useEffect(() => {
    const generateQuiz = async () => {
      const user = auth.currentUser
      if (user) {
        const profileSnap = await getDoc(doc(db, 'users', user.uid))
        if (profileSnap.exists()) {
          const data = profileSnap.data()
          setDomain(data.domain || 'Web Development')
          setLevel(data.level || 'Beginner')
        }
      }

      try {
        const prompt = `Generate 5 multiple choice questions for a ${level} level ${domain} quiz.
        Return ONLY a JSON array, no extra text:
        [
          {
            "q": "Question here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": 0
          }
        ]
        The answer field is the index (0-3) of the correct option.
        Make questions appropriate for ${level} level.`

        const result = await geminiModel.generateContent(prompt)
        const text = result.response.text()
        const clean = text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)
        setQuestions(parsed)
      } catch (err) {
        console.error(err)
        // Fallback questions
        setQuestions([
          {
            q: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'None of these'],
            answer: 0
          }
        ])
      }
      setLoading(false)
    }

    generateQuiz()
  }, [])

  const handleAnswer = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[current].answer) setScore(score + 1)
  }

  const next = () => {
    setAnswers([...answers, selected])
    if (current + 1 >= questions.length) setFinished(true)
    else { setCurrent(current + 1); setSelected(null) }
  }

  const percentage = Math.round((score / questions.length) * 100)

  const getMessage = () => {
    if (percentage === 100) return { text: 'Perfect Score! 🔥', color: 'text-green-600' }
    if (percentage >= 75) return { text: 'Great job! 👏', color: 'text-blue-600' }
    if (percentage >= 50) return { text: 'Good effort! 💪', color: 'text-yellow-600' }
    return { text: 'Keep practicing! 📚', color: 'text-red-500' }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-bounce">🧪</div>
      <p className="text-gray-600 font-medium">Generating your {domain} quiz...</p>
      <p className="text-gray-400 text-sm">Creating {level} level questions</p>
    </div>
  )

  if (finished) return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8 text-center">
        <div className="text-5xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold">Quiz Complete!</h1>
        <p className={`text-lg font-semibold mt-1 ${getMessage().color} bg-white rounded-full px-4 py-1 inline-block mt-2`}>
          {getMessage().text}
        </p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-4">
          <p className="text-gray-500 text-sm">Your Score</p>
          <p className="text-6xl font-bold text-blue-600 my-2">{score}/{questions.length}</p>
          <div className="bg-gray-100 rounded-full h-3 mt-3">
            <div className="bg-blue-600 rounded-full h-3 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{percentage}% correct</p>
        </div>

        <h2 className="font-bold text-gray-800 mb-3">Answer Review</h2>
        <div className="space-y-3 mb-6">
          {questions.map((q, i) => {
            const userAnswer = answers[i]
            const isCorrect = userAnswer === q.answer
            return (
              <div key={i} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-400'}`}>
                <p className="font-medium text-gray-800 text-sm mb-2">{q.q}</p>
                <p className={`text-xs ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                  {isCorrect ? '✅ Correct' : `❌ You answered: ${q.options[userAnswer]}`}
                </p>
                {!isCorrect && (
                  <p className="text-xs text-green-600 mt-1">✅ Correct: {q.options[q.answer]}</p>
                )}
              </div>
            )
          })}
        </div>

        <button onClick={() => navigate('/roadmap')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mb-3">
          Continue Roadmap →
        </button>
        <button onClick={() => navigate('/dashboard')} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
          Back to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🧪 Quiz</h1>
        <p className="text-blue-100 text-sm">{domain} · {level} · Question {current + 1} of {questions.length}</p>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <p className="font-semibold text-gray-800 text-lg">{questions[current].q}</p>
        </div>

        <div className="space-y-3">
          {questions[current].options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleAnswer(i)}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 cursor-pointer transition duration-200 ${
                selected === null ? 'border-gray-100 hover:border-blue-300' :
                i === questions[current].answer ? 'border-green-500 bg-green-50' :
                selected === i ? 'border-red-400 bg-red-50' : 'border-gray-100'
              }`}
            >
              <p className="font-medium text-gray-800">{opt}</p>
            </div>
          ))}
        </div>

        {selected !== null && (
          <button onClick={next} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold">
            {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz