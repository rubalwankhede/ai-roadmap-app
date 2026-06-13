import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JobRecommendations() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const jobs = [
    { title: 'Frontend Developer', company: 'TCS', location: 'Pune, India', salary: '₹4-8 LPA', match: 92, skills: ['React', 'CSS', 'JavaScript'], type: 'Full Time' },
    { title: 'React Developer', company: 'Infosys', location: 'Bangalore, India', salary: '₹5-10 LPA', match: 88, skills: ['React', 'Node.js', 'Git'], type: 'Full Time' },
    { title: 'Junior Web Developer', company: 'Wipro', location: 'Hyderabad, India', salary: '₹3-6 LPA', match: 85, skills: ['HTML', 'CSS', 'JavaScript'], type: 'Full Time' },
    { title: 'Software Engineer', company: 'Razorpay', location: 'Bangalore, India', salary: '₹8-15 LPA', match: 78, skills: ['React', 'Node.js', 'MongoDB'], type: 'Full Time' },
    { title: 'UI Developer Intern', company: 'Swiggy', location: 'Bangalore, India', salary: '₹15-25k/month', match: 90, skills: ['React', 'Tailwind', 'CSS'], type: 'Internship' },
    { title: 'Web Dev Intern', company: 'Zomato', location: 'Remote', salary: '₹10-20k/month', match: 82, skills: ['HTML', 'CSS', 'JavaScript'], type: 'Internship' },
  ]

  const filters = ['All', 'Full Time', 'Internship']
  const filtered = filter === 'All' ? jobs : jobs.filter(j => j.type === filter)

  const getMatchColor = (match) => {
    if (match >= 90) return 'bg-green-100 text-green-700'
    if (match >= 80) return 'bg-blue-100 text-blue-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">💼 Job Matches</h1>
        <p className="text-blue-100 text-sm mt-1">Based on your skills and roadmap progress</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-xl font-bold">{jobs.length}</p>
            <p className="text-xs text-blue-100">Jobs found</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-xl font-bold">85%</p>
            <p className="text-xs text-blue-100">Avg match</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
            <p className="text-xl font-bold">2</p>
            <p className="text-xs text-blue-100">Internships</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-4 flex gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-4">
        {filtered.map((job, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-gray-800">{job.title}</p>
                <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
              </div>
              <div className={`text-xs font-bold px-3 py-1 rounded-full ${getMatchColor(job.match)}`}>
                {job.match}% match
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <p className="text-blue-600 font-semibold text-sm">{job.salary}</p>
              <span className="text-gray-300">·</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                job.type === 'Internship' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
              }`}>{job.type}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map(skill => (
                <span key={skill} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
              Apply Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobRecommendations