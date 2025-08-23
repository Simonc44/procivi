import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CVPreview } from "./CVPreview";

interface CVData {
  personalInfo: any;
  skills: any[];
  education: any[];
  experiences: any[];
}

export const CVPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCV = async () => {
      setLoading(true);
      setError(null);
      try {
        // Exemple d'appel supabase, à adapter à ta structure
        const { data, error } = await supabase
          .from("cvs")
          .select("personalInfo, skills, education, experiences")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("CV non trouvé");

        setCvData(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du CV");
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [id]);

  return (
    <>
      <Navigation />
      <main className="container mx-auto p-6">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/dashboard">
            <ArrowLeft className="inline-block w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Prévisualisation du CV</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-600">Erreur : {error}</p>}
            {cvData && <CVPreview cvData={cvData} />}
            {!loading && !error && !cvData && <p>Aucun CV trouvé.</p>}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};
