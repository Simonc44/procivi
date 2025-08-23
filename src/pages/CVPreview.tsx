import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2, Check, X } from "lucide-react";

type Education = {
  degree: string;
  institution: string;
  year: string;
};

type Experience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

type PersonalInfo = {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  summary?: string;
};

type CVData = {
  personalInfo: PersonalInfo;
  skills: string[];
  education: Education[];
  experiences: Experience[];
};

const CVPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section en édition
  const [editingSection, setEditingSection] = useState<
    "personalInfo" | "skills" | "education" | "experiences" | null
  >(null);

  // Pour stocker les données modifiées temporairement
  const [tempData, setTempData] = useState<Partial<CVData>>({});

  useEffect(() => {
    if (!id) return;

    async function fetchCV() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("cvs")
          .select("personalInfo, skills, education, experiences")
          .eq("id", id)
          .single();

        if (error) {
          setError(error.message);
          setCvData(null);
        } else if (!data) {
          setError("Aucune donnée trouvée pour cet ID.");
          setCvData(null);
        } else {
          const parsedData: CVData = {
            personalInfo:
              typeof data.personalInfo === "string"
                ? JSON.parse(data.personalInfo)
                : data.personalInfo,
            skills:
              typeof data.skills === "string" ? JSON.parse(data.skills) : data.skills,
            education:
              typeof data.education === "string"
                ? JSON.parse(data.education)
                : data.education,
            experiences:
              typeof data.experiences === "string"
                ? JSON.parse(data.experiences)
                : data.experiences,
          };
          setCvData(parsedData);
        }
      } catch {
        setError("Erreur inattendue lors de la récupération des données.");
        setCvData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCV();
  }, [id]);

  // Commencer à éditer une section
  const startEdit = (section: "personalInfo" | "skills" | "education" | "experiences") => {
    setEditingSection(section);
    setTempData(cvData ? { [section]: cvData[section] } : {});
  };

  // Annuler l’édition
  const cancelEdit = () => {
    setEditingSection(null);
    setTempData({});
  };

  // Enregistrer la modification (juste localement ici, tu peux envoyer à Supabase)
  const saveEdit = () => {
    if (!editingSection || !cvData) return;

    setCvData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [editingSection]: tempData[editingSection as keyof CVData] ?? prev[editingSection],
      };
    });
    setEditingSection(null);
    setTempData({});
  };

  // Gestion des changements dans les inputs
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setTempData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    if (!tempData.skills) return;
    const newSkills = [...tempData.skills];
    newSkills[index] = value;
    setTempData((prev) => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    const newSkills = tempData.skills ? [...tempData.skills, ""] : [""];
    setTempData((prev) => ({ ...prev, skills: newSkills }));
  };

  const removeSkill = (index: number) => {
    if (!tempData.skills) return;
    const newSkills = tempData.skills.filter((_, i) => i !== index);
    setTempData((prev) => ({ ...prev, skills: newSkills }));
  };

  // Même chose pour éducation / expériences (édition simplifiée ici)
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    if (!tempData.education) return;
    const newEdu = [...tempData.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setTempData((prev) => ({ ...prev, education: newEdu }));
  };

  const addEducation = () => {
    const newEdu = tempData.education ? [...tempData.education] : [];
    newEdu.push({ degree: "", institution: "", year: "" });
    setTempData((prev) => ({ ...prev, education: newEdu }));
  };

  const removeEducation = (index: number) => {
    if (!tempData.education) return;
    const newEdu = tempData.education.filter((_, i) => i !== index);
    setTempData((prev) => ({ ...prev, education: newEdu }));
  };

  // Expériences
  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    if (!tempData.experiences) return;
    const newExp = [...tempData.experiences];
    newExp[index] = { ...newExp[index], [field]: value };
    setTempData((prev) => ({ ...prev, experiences: newExp }));
  };

  const addExperience = () => {
    const newExp = tempData.experiences ? [...tempData.experiences] : [];
    newExp.push({ title: "", company: "", startDate: "", endDate: "", description: "" });
    setTempData((prev) => ({ ...prev, experiences: newExp }));
  };

  const removeExperience = (index: number) => {
    if (!tempData.experiences) return;
    const newExp = tempData.experiences.filter((_, i) => i !== index);
    setTempData((prev) => ({ ...prev, experiences: newExp }));
  };

  if (loading) return <p>Chargement du CV...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;
  if (!cvData) return <p>Aucune donnée à afficher.</p>;

  return (
    <>
      <Navigation />
      <main className="container mx-auto p-6 max-w-3xl bg-white shadow-md rounded-md">
        <Button as={Link} to="/dashboard" variant="outline" className="mb-6">
          <ArrowLeft className="mr-2" /> Retour au dashboard
        </Button>

        {/* ----- PERSONAL INFO ----- */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-bold">{cvData.personalInfo.fullName}</h2>
            {editingSection === "personalInfo" ? (
              <div>
                <Button variant="ghost" onClick={cancelEdit} className="mr-2" title="Annuler">
                  <X />
                </Button>
                <Button variant="success" onClick={saveEdit} title="Enregistrer">
                  <Check />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => startEdit("personalInfo")} title="Modifier">
                <Edit2 className="w-4 h-4 mr-1" /> Modifier
              </Button>
            )}
          </div>

          {editingSection === "personalInfo" ? (
            <div className="space-y-2">
              <input
                type="text"
                className="input input-bordered w-full"
                value={tempData.personalInfo?.fullName ?? ""}
                onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                placeholder="Nom complet"
              />
              <input
                type="email"
                className="input input-bordered w-full"
                value={tempData.personalInfo?.email ?? ""}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                placeholder="Email"
              />
              <input
                type="tel"
                className="input input-bordered w-full"
                value={tempData.personalInfo?.phone ?? ""}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                placeholder="Téléphone"
              />
              <input
                type="text"
                className="input input-bordered w-full"
                value={tempData.personalInfo?.address ?? ""}
                onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                placeholder="Adresse"
              />
              <textarea
                className="textarea textarea-bordered w-full"
                value={tempData.personalInfo?.summary ?? ""}
                onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
                placeholder="Résumé / Objectif professionnel"
              />
            </div>
          ) : (
            <div>
              <p>Email : {cvData.personalInfo.email}</p>
              {cvData.personalInfo.phone && <p>Téléphone : {cvData.personalInfo.phone}</p>}
              {cvData.personalInfo.address && <p>Adresse : {cvData.personalInfo.address}</p>}
              {cvData.personalInfo.summary && <p className="mt-2 italic">{cvData.personalInfo.summary}</p>}
            </div>
          )}
        </section>

        {/* ----- SKILLS ----- */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">Compétences</h3>
            {editingSection === "skills" ? (
              <div>
                <Button variant="ghost" onClick={cancelEdit} className="mr-2" title="Annuler">
                  <X />
                </Button>
                <Button variant="success" onClick={saveEdit} title="Enregistrer">
                  <Check />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => startEdit("skills")} title="Modifier">
                <Edit2 className="w-4 h-4 mr-1" /> Modifier
              </Button>
            )}
          </div>

          {editingSection === "skills" ? (
            <div className="space-y-2">
              {(tempData.skills ?? []).map((skill, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="input input-bordered flex-grow"
                    value={skill}
                    onChange={(e) => handleSkillChange(idx, e.target.value)}
                    placeholder={`Compétence ${idx + 1}`}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSkill(idx)}
                    title="Supprimer compétence"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSkill}>
                + Ajouter une compétence
              </Button>
            </div>
          ) : cvData.skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {cvData.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>Aucune compétence renseignée.</p>
          )}
        </section>

        {/* ----- EDUCATION ----- */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">Éducation</h3>
            {editingSection === "education" ? (
              <div>
                <Button variant="ghost" onClick={cancelEdit} className="mr-2" title="Annuler">
                  <X />
                </Button>
                <Button variant="success" onClick={saveEdit} title="Enregistrer">
                  <Check />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => startEdit("education")} title="Modifier">
                <Edit2 className="w-4 h-4 mr-1" /> Modifier
              </Button>
            )}
          </div>

          {editingSection === "education" ? (
            <div className="space-y-4">
              {(tempData.education ?? []).map((edu, idx) => (
                <div key={idx} className="border rounded p-3 relative">
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                    placeholder="Diplôme"
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                    placeholder="Établissement"
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                    placeholder="Année"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeEducation(idx)}
                    className="absolute top-2 right-2"
                    title="Supprimer éducation"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addEducation}>
                + Ajouter une éducation
              </Button>
            </div>
          ) : cvData.education.length > 0 ? (
            <ul className="list-disc list-inside">
              {cvData.education.map((edu, idx) => (
                <li key={idx}>
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune éducation renseignée.</p>
          )}
        </section>

        {/* ----- EXPERIENCES ----- */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">Expériences</h3>
            {editingSection === "experiences" ? (
              <div>
                <Button variant="ghost" onClick={cancelEdit} className="mr-2" title="Annuler">
                  <X />
                </Button>
                <Button variant="success" onClick={saveEdit} title="Enregistrer">
                  <Check />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => startEdit("experiences")} title="Modifier">
                <Edit2 className="w-4 h-4 mr-1" /> Modifier
              </Button>
            )}
          </div>

          {editingSection === "experiences" ? (
            <div className="space-y-4">
              {(tempData.experiences ?? []).map((exp, idx) => (
                <div key={idx} className="border rounded p-3 relative">
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(idx, "title", e.target.value)}
                    placeholder="Intitulé du poste"
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                    placeholder="Entreprise"
                  />
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      className="input input-bordered flex-grow"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(idx, "startDate", e.target.value)}
                      placeholder="Date début"
                    />
                    <input
                      type="text"
                      className="input input-bordered flex-grow"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(idx, "endDate", e.target.value)}
                      placeholder="Date fin"
                    />
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                    placeholder="Description"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeExperience(idx)}
                    className="absolute top-2 right-2"
                    title="Supprimer expérience"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addExperience}>
                + Ajouter une expérience
              </Button>
            </div>
          ) : cvData.experiences.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {cvData.experiences.map((exp, idx) => (
                <li key={idx}>
                  <strong>{exp.title}</strong> chez <em>{exp.company}</em> (
                  {exp.startDate} - {exp.endDate ?? "Présent"})
                  {exp.description && <p>{exp.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune expérience renseignée.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CVPreview;
