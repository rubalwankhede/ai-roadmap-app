import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase/config'

function SignIn() {
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/onboarding')
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">CareerMap AI</h1>
        <p className="text-gray-600 mb-8">Your personalized career roadmap starts here</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        <p className="text-gray-400 text-sm mt-4">Free forever · No credit card required</p>
      </div>
    </div>
  )
}

export default SignIn