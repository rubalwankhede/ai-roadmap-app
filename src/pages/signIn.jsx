import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🚀</div>

        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          CareerMap AI
        </h1>

        <p className="text-gray-600 mb-8">
          Generate personalized career roadmaps, skill plans, projects,
          certifications, and interview preparation using AI.
        </p>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200"
        >
          Get Started Free
        </button>

        <div className="grid grid-cols-3 gap-3 mt-8 text-sm text-gray-500">
          <div>
            <div className="font-bold text-lg text-gray-800">AI</div>
            Roadmaps
          </div>
          <div>
            <div className="font-bold text-lg text-gray-800">100+</div>
            Resources
          </div>
          <div>
            <div className="font-bold text-lg text-gray-800">Free</div>
            Forever
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
