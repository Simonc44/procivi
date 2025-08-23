// src/pages/CVPreview.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const CVPreview = () => {
  const { id } = useParams();
  const [cv, setCV] = useState<any>(null);

  useEffect(() => {
    async function fetchCV() {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erreur chargement du CV :", error);
      } else {
        setCV(data);
      }
    }

    fetchCV();
  }, [id]);

  if (!cv) return <div className="p-4">Chargement du CV…</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{cv.name}</h1>
      <p className="text-muted-foreground">Créé le {new Date(cv.created_at).toLocaleDateString()}</p>
      <div className="mt-4">
        {/* Tu peux afficher le contenu du CV ici si tu as un champ `content` par exemple */}
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {cv.content || "Contenu du CV indisponible."}
        </pre>
      </div>
    </div>
  );
};

export default CVPreview;
