import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore'

function Onboarding() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [year, setYear] = useState('')
  const [branch, setBranch] = useState('')

  const handleNext = async () => {
    if (!name || !age || !year || !branch) return

    const user = auth.currentUser
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        name,
        age,
        year,
        branch,
      }, { merge: true })
    }

    navigate('/knowledge')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👋</div>
          <h1 className="text-2xl font-bold text-gray-800">Tell us about yourself</h1>
          <p className="text-gray-500 text-sm">Step 1 of 4</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <input
            type="number"
            placeholder="Your age"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <input
            type="text"
            placeholder="Year of study (e.g. 3rd year)"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
          <textarea
            placeholder="Your branch (e.g. CSE)"
            value={branch}
            onChange={e => setBranch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            rows={2}
          />
        </div>

        <button
          onClick={handleNext}
          className={`w-full mt-6 font-semibold py-3 rounded-xl transition duration-200 ${
            name && age && year && branch
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Onboarding