import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', age: '', education: '', goal: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleNext = () => {
    if (form.name && form.goal) navigate('/knowledge')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">👋</div>
          <h1 className="text-2xl font-bold text-gray-800">Tell us about yourself</h1>
          <p className="text-gray-500 text-sm">Step 1 of 4</p>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="age"
            placeholder="Your age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="education"
            placeholder="Your education (e.g. B.Tech, 12th grade)"
            value={form.education}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="goal"
            placeholder="What is your career goal? (e.g. I want to become a web developer)"
            value={form.goal}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Onboarding