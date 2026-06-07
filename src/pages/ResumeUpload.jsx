import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ResumeUpload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)

  const handleFile = (f) => {
    if (f && f.type === 'application/pdf') setFile(f)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">📄</div>
          <h1 className="text-2xl font-bold text-gray-800">Upload your resume</h1>
          <p className="text-gray-500 text-sm">Step 4 of 4</p>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400"
          onClick={() => document.getElementById('resumeInput').click()}
        >
          <div className="text-5xl mb-3">📁</div>
          {file ? (
            <p className="text-green-600 font-semibold">{file.name} ✅</p>
          ) : (
            <p className="text-gray-600 font-semibold">Click to upload PDF resume</p>
          )}
          <input
            id="resumeInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          {file ? 'Analyze & Continue →' : 'Skip for now →'}
        </button>
      </div>
    </div>
  )
}

export default ResumeUpload