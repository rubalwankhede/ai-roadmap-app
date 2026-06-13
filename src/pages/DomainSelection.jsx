import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DomainSelection() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')

  const domains = [
    { id: 'webdev', emoji: '🌐', title: 'Web Development', desc: 'HTML, CSS, React, Node.js' },
    { id: 'aiml', emoji: '🤖', title: 'AI / Machine Learning', desc: 'Python, TensorFlow, Data Science' },
    { id: 'mobile', emoji: '📱', title: 'Mobile Development', desc: 'React Native, Flutter' },
    { id: 'devops', emoji: '⚙️', title: 'DevOps & Cloud', desc: 'AWS, Docker, Kubernetes' },
    { id: 'design', emoji: '🎨', title: 'UI/UX Design', desc: 'Figma, Design Systems' },
    { id: 'cybersec', emoji: '🔐', title: 'Cybersecurity', desc: 'Ethical Hacking, Network Security' },
    { id: 'data', emoji: '📊', title: 'Data Analytics', desc: 'SQL, Power BI, Excel' },
    { id: 'blockchain', emoji: '🔗', title: 'Blockchain', desc: 'Solidity, Web3, Smart Contracts' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        
        {/* Header - fixed */}
        <div className="text-center p-6 pb-3">
          <div className="text-4xl mb-2">🎯</div>
          <h1 className="text-2xl font-bold text-gray-800">Pick your domain</h1>
          <p className="text-gray-500 text-sm">Step 3 of 4</p>
        </div>

        {/* Scrollable grid */}
        <div className="overflow-y-auto px-6 flex-1">
          <div className="grid grid-cols-2 gap-3 pb-3">
            {domains.map((domain) => (
              <div
                key={domain.id}
                onClick={() => setSelected(domain.id)}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition duration-200 ${
                  selected === domain.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-3xl mb-1">{domain.emoji}</span>
                <p className="font-semibold text-gray-800 text-sm">{domain.title}</p>
                <p className="text-xs text-gray-500">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Button - fixed at bottom */}
        <div className="p-6 pt-3">
          <button
            onClick={() => selected && navigate('/resume')}
            className={`w-full font-semibold py-3 rounded-xl transition duration-200 ${
              selected
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default DomainSelection
