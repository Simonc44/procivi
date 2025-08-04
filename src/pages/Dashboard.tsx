import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentCVs = [
    { id: 1, name: "CV Développeur Full Stack", createdAt: "2024-01-15", downloads: 5 },
    { id: 2, name: "CV Designer UX/UI", createdAt: "2024-01-10", downloads: 3 },
    { id: 3, name: "CV Chef de Projet", createdAt: "2024-01-08", downloads: 8 },
  ];

  const stats = [
    { title: "CV créés", value: "12", icon: FileText },
    { title: "Téléchargements", value: "45", icon: Download },
    { title: "Vues profil", value: "128", icon: Eye },
    { title: "Taux de réussite", value: "85%", icon: TrendingUp },
  ];

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
                  {recentCVs.map((cv) => (
                    <div key={cv.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{cv.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Créé le {new Date(cv.createdAt).toLocaleDateString()}
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
                  ))}
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
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Importer depuis LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
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