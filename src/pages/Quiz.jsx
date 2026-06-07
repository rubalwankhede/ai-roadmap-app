import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Quiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = [
    {
      q: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'None of these'],
      answer: 0
    },
    {
      q: 'Which hook is used for state in React?',
      options: ['useEffect', 'useRef', 'useState', 'useContext'],
      answer: 2
    },
    {
      q: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
      answer: 1
    },
    {
      q: 'Which company created React?',
      options: ['Google', 'Microsoft', 'Facebook', 'Apple'],
      answer: 2
    },
  ]

  const handleAnswer = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[current].answer) setScore(score + 1)
  }

  const next = () => {
    if (current + 1 >= questions.length) setFinished(true)
    else { setCurrent(current + 1); setSelected(null) }
  }

  if (finished) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm w-full max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800">Quiz Complete!</h1>
        <p className="text-gray-500 mt-2">You scored</p>
        <p className="text-5xl font-bold text-blue-600 my-4">{score}/{questions.length}</p>
        <button onClick={() => navigate('/dashboard')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Back to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🧪 Quiz</h1>
        <p className="text-blue-100 text-sm">Question {current + 1} of {questions.length}</p>
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