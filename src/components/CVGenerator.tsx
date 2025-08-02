import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Linkedin, 
  Brain, 
  Download, 
  FileText, 
  Mail,
  Sparkles,
  Zap,
  CheckCircle
} from "lucide-react";

export const CVGenerator = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const tabs = [
    { id: "manual", label: "Saisie manuelle", icon: User },
    { id: "linkedin", label: "Import LinkedIn", icon: Linkedin },
    { id: "ai", label: "Génération IA", icon: Brain }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-ai-purple/10 text-ai-purple border-ai-purple/20">
            <Brain className="w-4 h-4 mr-2" />
            Générateur intelligent
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Crée ton CV en 3 étapes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisis ta méthode préférée et laisse Procivi faire le reste
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Input Methods */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id 
                      ? "bg-white shadow-sm text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {activeTab === "manual" && <User className="w-5 h-5" />}
                  {activeTab === "linkedin" && <Linkedin className="w-5 h-5" />}
                  {activeTab === "ai" && <Brain className="w-5 h-5" />}
                  {activeTab === "manual" && "Informations personnelles"}
                  {activeTab === "linkedin" && "Connexion LinkedIn"}
                  {activeTab === "ai" && "Génération assistée par IA"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === "manual" && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Prénom" />
                      <Input placeholder="Nom" />
                    </div>
                    <Input placeholder="Email professionnel" />
                    <Input placeholder="Téléphone" />
                    <Input placeholder="Poste recherché" />
                    <Textarea placeholder="Résumé professionnel..." rows={4} />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Expérience professionnelle
                      </h4>
                      <div className="p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                        Clique pour ajouter une expérience
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Formation
                      </h4>
                      <div className="p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                        Clique pour ajouter une formation
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "linkedin" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                      <Linkedin className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Connecte ton profil LinkedIn</h3>
                      <p className="text-muted-foreground mb-6">
                        Importe automatiquement tes expériences, formations et compétences
                      </p>
                    </div>
                    <Button variant="linkedin" size="lg" className="w-full">
                      <Linkedin className="w-5 h-5 mr-2" />
                      Se connecter avec LinkedIn
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      ✓ Connexion sécurisée OAuth 2.0 • ✓ Aucun stockage de mot de passe
                    </div>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Génération assistée par IA</h3>
                      <p className="text-muted-foreground">
                        Décris ton parcours et laisse Gemini créer ton CV professionnel
                      </p>
                    </div>
                    
                    <Textarea 
                      placeholder="Exemple: Je suis développeur full-stack avec 5 ans d'expérience en React et Node.js. J'ai travaillé chez Startup XYZ en tant que lead developer..."
                      rows={6}
                      className="resize-none"
                    />
                    
                    <Input placeholder="Poste ciblé (ex: Senior Developer, Product Manager...)" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Années d'expérience" type="number" />
                      <Input placeholder="Secteur d'activité" />
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  variant="ai" 
                  size="lg" 
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Générer mon CV avec l'IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right - Preview & Actions */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Aperçu en temps réel</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ATS Optimisé
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <div className="w-16 h-20 bg-white border border-border mx-auto mb-4 rounded shadow-sm">
                    <div className="h-2 bg-muted rounded-full mx-2 mt-2"></div>
                    <div className="h-1 bg-muted rounded-full mx-2 mt-1"></div>
                    <div className="h-1 bg-muted rounded-full mx-2 mt-1 w-3/4"></div>
                    <div className="space-y-1 mt-2 mx-2">
                      <div className="h-1 bg-muted/50 rounded-full"></div>
                      <div className="h-1 bg-muted/50 rounded-full w-5/6"></div>
                      <div className="h-1 bg-muted/50 rounded-full w-4/6"></div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Ton CV apparaîtra ici en temps réel
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Options d'export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start" disabled>
                    <FileText className="w-4 h-4 mr-2" />
                    Télécharger en PDF
                  </Button>
                  <Button variant="outline" className="justify-start" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Exporter en PNG
                  </Button>
                  <Button variant="outline" className="justify-start" disabled>
                    <Mail className="w-4 h-4 mr-2" />
                    Générer une lettre de motivation
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  💡 Astuce : Les exports seront disponibles après la génération de ton CV
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};