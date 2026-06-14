import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geminiModel } from '../ai/gemini'

function Chatbot() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your AI learning assistant 🤖 Ask me anything about your roadmap, concepts, or career!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const prompt = `You are a helpful career and learning assistant for someone learning software engineering. 
      Keep responses concise, friendly and encouraging. 
      User question: ${input}`

      const result = await geminiModel.generateContent(prompt)
      const aiText = result.response.text()
      setMessages(prev => [...prev, { role: 'ai', text: aiText }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I could not respond right now. Please try again!' }])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-6">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🤖 AI Chatbot</h1>
        <p className="text-blue-100 text-sm">Ask me anything!</p>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
            }`}>
            {msg.text.replace(/\*\*/g, '').replace(/\*/g, '')}  
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl text-sm text-gray-400 shadow-sm animate-pulse">
              Thinking... 🤔
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot