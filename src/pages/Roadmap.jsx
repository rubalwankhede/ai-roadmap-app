import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { generateRoadmap } from '../ai/gemini'

function Roadmap() {
  const navigate = useNavigate()
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState('')
  const [level, setLevel] = useState('')

  useEffect(() => {
    const fetchRoadmap = async () => {
      const user = auth.currentUser
      if (!user) return

      // Check if roadmap already exists in Firestore
      const roadmapRef = doc(db, 'roadmaps', user.uid)
      const roadmapSnap = await getDoc(roadmapRef)

      if (roadmapSnap.exists()) {
        const data = roadmapSnap.data()
        setSteps(data.steps)
        setDomain(data.domain || 'Your Domain')
        setLevel(data.level || 'Intermediate')
        setLoading(false)
        return
      }

      // Get user profile from Firestore
      const profileRef = doc(db, 'users', user.uid)
      const profileSnap = await getDoc(profileRef)
      const profile = profileSnap.exists() ? profileSnap.data() : {}

      const name = user.displayName || 'Student'
      const userDomain = profile.domain || 'Web Development'
      const userLevel = profile.level || 'Beginner'
      const userYear = profile.year || '3rd year'

      setDomain(userDomain)
      setLevel(userLevel)

      try {
        // Generate roadmap with Gemini
        const generated = await generateRoadmap(name, userDomain, userLevel, userYear)
        const stepsWithStatus = generated.map((s, i) => ({
          ...s,
          status: i === 0 ? 'current' : 'upcoming'
        }))

        // Save to Firestore
        await setDoc(roadmapRef, {
          steps: stepsWithStatus,
          domain: userDomain,
          level: userLevel,
          createdAt: new Date().toISOString()
        })

        setSteps(stepsWithStatus)
      } catch (err) {
        console.error('Roadmap generation failed:', err)
      }

      setLoading(false)
    }

    fetchRoadmap()
  }, [])

  const markComplete = async (stepId) => {
    const user = auth.currentUser
    if (!user) return

    const updated = steps.map((s, i) => {
      if (s.step === stepId) return { ...s, status: 'done' }
      if (steps[i - 1]?.step === stepId && s.status === 'upcoming') return { ...s, status: 'current' }
      return s
    })

    setSteps(updated)
    const roadmapRef = doc(db, 'roadmaps', user.uid)
    await setDoc(roadmapRef, { steps: updated, domain, level }, { merge: true })
  }

  const statusStyle = {
    done: 'bg-green-500',
    current: 'bg-blue-500',
    upcoming: 'bg-gray-300',
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-bounce">🤖</div>
      <p className="text-gray-600 font-medium">Generating your personalized roadmap...</p>
      <p className="text-gray-400 text-sm">This may take a few seconds</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🗺️ Your Roadmap</h1>
        <p className="text-blue-100 text-sm mt-1">{domain} · {level}</p>
      </div>

      <div className="p-6">
        {steps.map((step, index) => (
          <div key={step.step} className="flex gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${statusStyle[step.status]}`}>
                {step.status === 'done' ? '✓' : step.step}
              </div>
              {index < steps.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
            </div>
            <div className={`bg-white rounded-2xl p-4 flex-1 shadow-sm border ${step.status === 'current' ? 'border-blue-400' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800">{step.title}</p>
                <span className="text-xs text-gray-400">{step.duration}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
              {step.status === 'current' && (
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">In Progress</span>
                  <button
                    onClick={() => markComplete(step.step)}
                    className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
                  >
                    Mark Complete ✓
                  </button>
                </div>
              )}
              {step.status === 'done' && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mt-2 inline-block">Completed ✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roadmap