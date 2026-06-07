import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase/config'

function SignIn() {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/onboarding')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CareerMap AI</h1>
        <p className="text-gray-500 mb-8">Your personalized career roadmap starts here</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 mb-4 flex items-center justify-center gap-3"
        >
          <span>🔑</span> Sign in with Google
        </button>
        <p className="text-gray-400 text-sm">Free forever · No credit card required</p>
      </div>
    </div>
  )
}

export default SignIn
