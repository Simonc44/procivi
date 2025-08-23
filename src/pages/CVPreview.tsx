import React from "react";

interface CVPreviewProps {
  cvData: {
    personalInfo: {
      name: string;
      email?: string;
      phone?: string;
      address?: string;
      [key: string]: any;
    };
    skills: { id: string; name: string }[];
    education: { id: string; institution: string; degree: string; startDate?: string; endDate?: string }[];
    experiences: { id: string; company: string; role: string; startDate?: string; endDate?: string; description?: string }[];
  };
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, skills, education, experiences } = cvData;

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto">
      {/* Personal Info */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
        {personalInfo.email && <p>Email: {personalInfo.email}</p>}
        {personalInfo.phone && <p>Téléphone: {personalInfo.phone}</p>}
        {personalInfo.address && <p>Adresse: {personalInfo.address}</p>}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Compétences</h2>
        {skills.length > 0 ? (
          <ul className="list-disc list-inside">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          <p>Aucune compétence renseignée.</p>
        )}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éducation</h2>
        {education.length > 0 ? (
          <ul className="list-disc list-inside">
            {education.map((edu) => (
              <li key={edu.id}>
                <strong>{edu.degree}</strong> - {edu.institution}{" "}
                {edu.startDate && `(${edu.startDate} - ${edu.endDate || "Présent"})`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune formation renseignée.</p>
        )}
      </section>

      {/* Experiences */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Expériences</h2>
        {experiences.length > 0 ? (
          <ul className="list-disc list-inside">
            {experiences.map((exp) => (
              <li key={exp.id}>
                <strong>{exp.role}</strong> chez {exp.company}{" "}
                {exp.startDate && `(${exp.startDate} - ${exp.endDate || "Présent"})`}
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune expérience renseignée.</p>
        )}
      </section>
    </div>
  );
};
