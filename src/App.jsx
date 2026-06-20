import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const resumeRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    projects: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const skillCount = form.skills
    ? form.skills.split(",").filter(Boolean).length
    : 0;

  const projectCount = form.projects
    ? form.projects.split("\n").filter(Boolean).length
    : 0;

  const score = Math.min(
    skillCount * 10 +
      projectCount * 15 +
      (form.education ? 20 : 0),
    100
  );

  const downloadPDF = async () => {
    const element = resumeRef.current;

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 190;
    const height =
      (canvas.height * width) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      width,
      height
    );

    pdf.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        AI Resume Builder
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Enter Details
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <input
            name="education"
            placeholder="Education"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            rows="4"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="projects"
            placeholder="Projects (one per line)"
            rows="5"
            className="w-full border p-3 mb-3 rounded"
            onChange={handleChange}
          />

          <div className="bg-green-100 p-4 rounded mb-4">
            <h3 className="font-bold">
              Resume Score: {score}/100
            </h3>
          </div>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg w-full"
          >
            Download Resume PDF
          </button>
        </div>

        {/* PREVIEW */}
        <div
          ref={resumeRef}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-bold">
            {form.name || "Your Name"}
          </h1>

          <p>{form.email}</p>
          <p>{form.phone}</p>

          <hr className="my-4" />

          <h2 className="text-xl font-bold">
            Education
          </h2>

          <p>{form.education}</p>

          <h2 className="text-xl font-bold mt-4">
            Skills
          </h2>

          <ul className="list-disc ml-5">
            {form.skills
              .split(",")
              .filter(Boolean)
              .map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
          </ul>

          <h2 className="text-xl font-bold mt-4">
            Projects
          </h2>

          <ul className="list-disc ml-5">
            {form.projects
              .split("\n")
              .filter(Boolean)
              .map((project, index) => (
                <li key={index}>{project}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}