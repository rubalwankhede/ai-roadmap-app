import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: input }],
        system: 'You are a helpful career and learning assistant for someone learning software engineering. Keep responses concise and encouraging.'
      })
    })

    const data = await response.json()
    const aiText = data.content?.[0]?.text || 'Sorry, I could not respond right now.'
    setMessages(prev => [...prev, { role: 'ai', text: aiText }])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-6">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">🤖 AI Chatbot</h1>
        <p className="text-blue-100 text-sm">Ask me anything!</p>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl text-sm text-gray-400 shadow-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot