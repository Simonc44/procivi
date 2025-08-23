import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CVPreview = () => {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCV() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("cvs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError(error.message);
          setCvData(null);
        } else {
          setCvData(data);
          setError(null);
        }
      } catch (err) {
        setError("Erreur inattendue");
        setCvData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCV();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!cvData) return <p>Aucune donnée trouvée pour cet ID.</p>;

  // Attention : n'affiche pas un objet directement, mais ses propriétés !
  return (
    <>
      <Navigation />
      <main className="container mx-auto p-6">
        <Button as={Link} to="/dashboard" variant="outline" className="mb-6">
          <ArrowLeft className="mr-2" /> Retour au dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Prévisualisation du CV</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{cvData.personalInfo?.fullName}</h2>
            <p>Email : {cvData.personalInfo?.email}</p>

            <section className="mt-6">
              <h3 className="font-semibold">Compétences</h3>
              <ul>
                {cvData.skills?.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="font-semibold">Éducation</h3>
              <ul>
                {cvData.education?.map((edu, idx) => (
                  <li key={idx}>
                    {edu.degree} - {edu.institution} ({edu.year})
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="font-semibold">Expériences</h3>
              <ul>
                {cvData.experiences?.map((exp, idx) => (
                  <li key={idx}>
                    {exp.title} chez {exp.company} ({exp.startDate} - {exp.endDate || "Présent"})
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default CVPreview;
