import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface CV {
  id: string;
  name: string;
  created_at: string;
  downloads: number;
}

interface Stat {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

const Dashboard = () => {
  const [recentCVs, setRecentCVs] = useState<CV[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  // Remplace cette valeur par l'ID utilisateur connecté (récupéré via ton auth)
  const user = supabase.auth.getUser?.(); // selon ta méthode d'authentification

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      setLoading(true);

      try {
        // 1. Récupère les 5 derniers CVs
        const { data: cvs, error: cvError } = await supabase
          .from<CV>("cvs")
          .select("id, name, created_at, downloads")
          .order("created_at", { ascending: false })
          .limit(5);

        if (cvError) {
          console.error("Erreur fetch CVs:", cvError);
        }

        // 2. Compte le nombre total de CVs
        const { count: totalCvs, error: cntError } = await supabase
          .from("cvs")
          .select("*", { count: "exact", head: true });

        if (cntError) {
          console.error("Erreur comptage CVs:", cntError);
        }

        // 3. Somme des téléchargements
        const { data: dlData, error: dlError } = await supabase
          .from("cvs")
          .select("downloads");

        if (dlError) {
          console.error("Erreur sum téléchargements:", dlError);
        }

        const totalDownloads = dlData?.reduce(
          (sum, cv) => sum + (cv.downloads || 0),
          0
        ) ?? 0;

        // 4. Vues profil
        const { count: profileViewsCount, error: profileViewsError } =
          await supabase
            .from("profile_views")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.data.user?.id);

        if (profileViewsError) {
          console.error("Erreur récupération vues profil:", profileViewsError);
        }

        // 5. Calcul du taux de réussite
        const { count: totalApplications, error: totalAppsError } =
          await supabase
            .from("applications")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.data.user?.id);

        const { count: acceptedApplications, error: acceptedAppsError } =
          await supabase
            .from("applications")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.data.user?.id)
            .eq("status", "accepted");

        if (totalAppsError || acceptedAppsError) {
          console.error(
            "Erreur récupération applications:",
            totalAppsError || acceptedAppsError
          );
        }

        const successRate =
          totalApplications && totalApplications > 0
            ? ((acceptedApplications ?? 0) / totalApplications * 100).toFixed(1) + "%"
            : "—";

        setRecentCVs(cvs ?? []);
        setStats([
          { title: "CV créés", value: totalCvs ?? 0, icon: FileText },
          { title: "Téléchargements", value: totalDownloads, icon: Download },
          { title: "Vues profil", value: profileViewsCount ?? 0, icon: Eye },
          { title: "Taux de réussite", value: successRate, icon: TrendingUp },
        ]);
      } catch (error) {
        console.error("Erreur chargement dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  // Fonction pour analyser le profil (appelle une fonction serverless ou API)
  async function analyzeProfile() {
    if (!user) return;

    const { data, error } = await supabase.functions.invoke("analyze-profile", {
      body: { user_id: user.data.user?.id },
    });

    if (error) {
      alert("Erreur analyse profil: " + error.message);
    } else {
      alert("Analyse terminée: " + JSON.stringify(data));
    }
  }

  // URL de ta fonction LinkedIn Auth
  const linkedInAuthUrl = "/functions/linkedin-auth"; // adapte selon ta config

  if (loading) {
    return <div className="min-h-screen p-8 text-center">Chargement…</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Gérez vos CV et suivez vos performances
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CV récents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>CV récents</CardTitle>
                    <CardDescription>Vos dernières créations</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/cv-generator">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau CV
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
  <div className="space-y-4">
    {recentCVs.length === 0 ? (
      <p className="text-center text-muted-foreground">Il n’y a rien pour le moment.</p>
    ) : (
      recentCVs.map((cv) => (
        <div
          key={cv.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-medium">{cv.name}</h3>
            <p className="text-sm text-muted-foreground">
              Créé le {new Date(cv.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {cv.downloads} téléchargements
            </span>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))
    )}
  </div>
</CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Commencez votre recherche d'emploi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button asChild className="w-full justify-start">
                    <Link to="/cv-generator">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un nouveau CV
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      window.location.href = linkedInAuthUrl;
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Importer depuis LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={analyzeProfile}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analyser mon profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
