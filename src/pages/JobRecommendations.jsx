import { useNavigate } from 'react-router-dom'

function JobRecommendations() {
  const navigate = useNavigate()

  const jobs = [
    { title: 'Frontend Developer', company: 'TCS', location: 'Pune, India', salary: '₹4-8 LPA', match: 92, skills: ['React', 'CSS', 'JavaScript'] },
    { title: 'React Developer', company: 'Infosys', location: 'Bangalore, India', salary: '₹5-10 LPA', match: 88, skills: ['React', 'Node.js', 'Git'] },
    { title: 'Junior Web Developer', company: 'Wipro', location: 'Hyderabad, India', salary: '₹3-6 LPA', match: 85, skills: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'Software Engineer', company: 'Razorpay', location: 'Bangalore, India', salary: '₹8-15 LPA', match: 78, skills: ['React', 'Node.js', 'MongoDB'] },
    { title: 'UI Developer', company: 'Swiggy', location: 'Bangalore, India', salary: '₹6-12 LPA', match: 75, skills: ['React', 'Tailwind', 'TypeScript'] },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-8">
        <button onClick={() => navigate('/dashboard')} className="text-blue-200 text-sm mb-3">← Back</button>
        <h1 className="text-2xl font-bold">💼 Job Matches</h1>
        <p className="text-blue-100 text-sm mt-1">Based on your skills and roadmap progress</p>
      </div>

      <div className="p-6 space-y-4">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-gray-800">{job.title}</p>
                <p className="text-sm text-gray-500">{job.company} · {job.location}</p>
              </div>
              <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                {job.match}% match
              </div>
            </div>

            <p className="text-blue-600 font-semibold text-sm mb-3">{job.salary}</p>

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