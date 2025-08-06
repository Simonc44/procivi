import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Crown, Sparkles, Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CoverLetter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    userExperience: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour générer une lettre de motivation.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.jobTitle || !formData.companyName) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au minimum le poste et l'entreprise.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-cover-letter', {
        body: formData
      });

      if (error) throw error;

      setGeneratedLetter(data.generated_content);
      toast({
        title: "Lettre générée !",
        description: "Votre lettre de motivation a été créée avec succès."
      });
    } catch (error: any) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la génération de la lettre",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copié !",
      description: "La lettre a été copiée dans votre presse-papier."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-ai-purple/5 to-secondary/5">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Crown className="w-4 h-4 mr-2" />
                Fonctionnalité Premium
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-ai-purple to-secondary bg-clip-text text-transparent mb-6">
                Lettres de Motivation IA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Créez des lettres de motivation personnalisées et convaincantes 
                avec l'aide de notre IA avancée Gemini 2.0 Flash.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Informations sur l'Offre
                </CardTitle>
                <CardDescription>
                  Remplissez les détails de l'offre d'emploi pour une lettre personnalisée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Intitulé du Poste *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Ex: Développeur Full Stack"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'Entreprise *</Label>
                  <Input
                    id="companyName"
                    placeholder="Ex: Tech Innovation"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Description du Poste</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Copiez-collez la description de l'offre d'emploi ici..."
                    rows={4}
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userExperience">Votre Expérience Pertinente</Label>
                  <Textarea
                    id="userExperience"
                    placeholder="Décrivez votre expérience, vos compétences et réalisations en lien avec ce poste..."
                    rows={4}
                    value={formData.userExperience}
                    onChange={(e) => handleInputChange('userExperience', e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.jobTitle || !formData.companyName}
                  className="w-full bg-gradient-to-r from-primary to-ai-purple hover:from-primary-dark hover:to-ai-purple text-white"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Générer la Lettre
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Lettre de Motivation</span>
                  {generatedLetter && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copier
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {generatedLetter 
                    ? "Votre lettre de motivation personnalisée"
                    : "La lettre générée apparaîtra ici"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="bg-white/50 dark:bg-white/5 rounded-lg p-6 border border-border/20">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {generatedLetter}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-muted/20 rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Remplissez le formulaire et cliquez sur "Générer" pour créer votre lettre de motivation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Features */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-ai-purple/10 to-secondary/10">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Avantages Premium
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">IA Avancée</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilise Gemini 2.0 Flash pour des lettres authentiques et percutantes
                  </p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <FileText className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Personnalisation</h3>
                  <p className="text-sm text-muted-foreground">
                    Chaque lettre est adaptée à l'offre et à votre profil
                  </p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <Crown className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Illimité</h3>
                  <p className="text-sm text-muted-foreground">
                    Générez autant de lettres que nécessaire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoverLetter;