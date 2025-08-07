import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CVGeneratorForm } from "./CVGeneratorForm";
import { 
  User, 
  Linkedin, 
  Brain, 
  Download, 
  FileText, 
  Mail,
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
            <CVGeneratorForm 
              activeTab={activeTab}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
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