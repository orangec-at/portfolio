export default function ExperienceSection() {
  return (
    <div className="resume-section">
      <h2 className="resume-section-title">Experience</h2>
      <div className="resume-experience">
        <div className="resume-job">
          <h3 className="resume-job-title">Software Engineer</h3>
          <p className="resume-job-company">ABC Corp</p>
          <p className="resume-job-dates">Jan 2020 - Present</p>
          <ul className="resume-job-responsibilities">
            <li>Developed web applications using React and Node.js.</li>
            <li>Collaborated with cross-functional teams to deliver high-quality software.</li>
            <li>Implemented RESTful APIs and integrated third-party services.</li>
          </ul>
        </div>
        <div className="resume-job">
          <h3 className="resume-job-title">Junior Developer</h3>
          <p className="resume-job-company">XYZ Inc</p>
          <p className="resume-job-dates">Jun 2018 - Dec 2019</p>
          <ul className="resume-job-responsibilities">
            <li>
              Assisted in the development of web applications using HTML, CSS, and JavaScript.
            </li>
            <li>Participated in code reviews and contributed to team discussions.</li>
            <li>Maintained documentation for software projects.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
