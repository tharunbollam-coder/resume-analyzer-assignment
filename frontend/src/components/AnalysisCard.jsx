import React from 'react';

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6 transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl">
    <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4 tracking-tight">{title}</h2>
    {children}
  </div>
);

const ListSection = ({ title, items }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-gray-700 mb-1 text-base">{title}</h3>
    <ul className="list-disc pl-5 mt-1 text-gray-600">
      {items.length > 0 ? items.map((item, index) => <li key={index}>{item}</li>) : <p className="text-gray-400 italic text-sm">Not found</p>}
    </ul>
  </div>
);

const AnalysisCard = ({ data }) => {
  const { personalDetails, resumeContent, skills, aiFeedback } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Personal Details & AI Feedback */}
      <div className="col-span-1 space-y-6">
        <Card title="Personal Details">
          <p><strong>Name:</strong> {personalDetails.name || 'N/A'}</p>
          <p><strong>Email:</strong> {personalDetails.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {personalDetails.phone || 'N/A'}</p>
          <p><strong>LinkedIn/Portfolio:</strong> <a href={personalDetails.linkedin_portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{personalDetails.linkedin_portfolio || 'N/A'}</a></p>
        </Card>

        <Card title="AI Feedback">
          <p className="text-lg font-bold">Rating: <span className="text-blue-600">{aiFeedback.rating || 'N/A'}/10</span></p>
          <ListSection title="Improvement Suggestions" items={aiFeedback.improvementSuggestions} />
          <ListSection title="Suggested Upskilling Areas" items={aiFeedback.upskillingAreas} />
        </Card>
      </div>

      {/* Resume Content */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-6">
        <Card title="Summary">
          <p className="text-gray-600 italic">{resumeContent.summary || 'Summary not found.'}</p>
        </Card>

        <Card title="Work Experience">
          {resumeContent.workExperience.length > 0 ? (
            resumeContent.workExperience.map((job, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">{job.title || 'N/A'} at {job.company || 'N/A'}</h3>
                <p className="text-sm text-gray-500">{job.duration || 'N/A'}</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  {job.responsibilities.length > 0 ? job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>) : <li className="text-gray-400 italic">No responsibilities listed.</li>}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No work experience found.</p>
          )}
        </Card>

        <Card title="Education">
          {resumeContent.education.length > 0 ? (
            resumeContent.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree || 'N/A'} at {edu.institution || 'N/A'}</h3>
                <p className="text-sm text-gray-500">{edu.duration || 'N/A'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No education found.</p>
          )}
        </Card>

        <Card title="Projects">
          {resumeContent.projects.length > 0 ? (
            resumeContent.projects.map((proj, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">{proj.name || 'N/A'}</h3>
                <p className="text-gray-600 mt-1">{proj.description || 'N/A'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No projects found.</p>
          )}
        </Card>

        <Card title="Certifications">
          <ul className="list-disc pl-5 text-gray-600">
            {resumeContent.certifications.length > 0 ? resumeContent.certifications.map((cert, index) => <li key={index}>{cert}</li>) : <li className="text-gray-400 italic">No certifications found.</li>}
          </ul>
        </Card>

        <Card title="Skills">
          <ListSection title="Technical Skills" items={skills.technicalSkills} />
          <ListSection title="Soft Skills" items={skills.softSkills} />
        </Card>
      </div>
    </div>
  );
};

export default AnalysisCard;