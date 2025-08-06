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
import { Mail, Crown, Sparkles, Copy, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const RecruitmentEmail = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    companyName: "",
    position: "",
    userBackground: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour générer un email de recrutement.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.companyName || !formData.position) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au minimum l'entreprise et le poste.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recruitment-email', {
        body: formData
      });

      if (error) throw error;

      setGeneratedEmail(data.generated_content);
      toast({
        title: "Email généré !",
        description: "Votre email de recrutement a été créé avec succès."
      });
    } catch (error: any) {
      console.error('Error generating recruitment email:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la génération de l'email",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "Copié !",
      description: "L'email a été copié dans votre presse-papier."
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
                Emails de Recrutement IA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Créez des emails professionnels et percutants pour contacter directement 
                les recruteurs et décrocher votre prochain entretien.
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
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Informations de Contact
                </CardTitle>
                <CardDescription>
                  Détails du recruteur et du poste que vous visez
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Nom du Recruteur</Label>
                  <Input
                    id="recipientName"
                    placeholder="Ex: Marie Dupont (optionnel)"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
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
                  <Label htmlFor="position">Poste Visé *</Label>
                  <Input
                    id="position"
                    placeholder="Ex: Développeur Full Stack Senior"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userBackground">Votre Profil</Label>
                  <Textarea
                    id="userBackground"
                    placeholder="Décrivez brièvement votre expérience, vos compétences clés et vos motivations pour ce poste..."
                    rows={6}
                    value={formData.userBackground}
                    onChange={(e) => handleInputChange('userBackground', e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.companyName || !formData.position}
                  className="w-full bg-gradient-to-r from-primary to-ai-purple hover:from-primary-dark hover:to-ai-purple text-white"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Générer l'Email
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Email de Recrutement</span>
                  {generatedEmail && (
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
                  {generatedEmail 
                    ? "Votre email de recrutement personnalisé"
                    : "L'email généré apparaîtra ici"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedEmail ? (
                  <div className="bg-white/50 dark:bg-white/5 rounded-lg p-6 border border-border/20">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {generatedEmail}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-muted/20 rounded-lg p-8 text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Remplissez le formulaire et cliquez sur "Générer" pour créer votre email de recrutement.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-ai-purple/10 to-secondary/10">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                Conseils pour un Email Efficace
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Personnalisation</h3>
                  <p className="text-sm text-muted-foreground">
                    Mentionnez des détails spécifiques sur l'entreprise et le poste
                  </p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Objet Accrocheur</h3>
                  <p className="text-sm text-muted-foreground">
                    Un objet clair et professionnel augmente le taux d'ouverture
                  </p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Valeur Ajoutée</h3>
                  <p className="text-sm text-muted-foreground">
                    Montrez ce que vous pouvez apporter à l'entreprise
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

export default RecruitmentEmail;