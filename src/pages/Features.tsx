import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  FileText, 
  MessageSquare, 
  Palette, 
  Mail, 
  Crown,
  Sparkles,
  Linkedin
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Génération CV par IA",
      description: "Utilise Gemini 2.0 Flash pour créer des CV professionnels optimisés",
      premium: false
    },
    {
      icon: Linkedin,
      title: "Import LinkedIn",
      description: "Importation automatique de votre profil LinkedIn complet",
      premium: false
    },
    {
      icon: MessageSquare,
      title: "Chatbot Interactif",
      description: "Assistant IA pour collecter vos informations professionnelles",
      premium: false
    },
    {
      icon: Palette,
      title: "Templates Professionnels",
      description: "Modèles de CV modernes et élégants adaptés à votre secteur",
      premium: false
    },
    {
      icon: Mail,
      title: "Emails de Recrutement",
      description: "Génération d'emails personnalisés pour contacter les recruteurs",
      premium: true
    },
    {
      icon: FileText,
      title: "Lettres de Motivation",
      description: "Création de lettres de motivation adaptées aux offres d'emploi",
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-ai-purple/5 to-secondary/5">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Fonctionnalités IA Avancées
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-ai-purple to-secondary bg-clip-text text-transparent mb-6">
                Créez Votre CV Parfait
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Découvrez toutes les fonctionnalités de ProCivi pour créer des CV professionnels 
                qui vous démarquent sur le marché du travail.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
              >
                {feature.premium && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-ai-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choisissez Votre Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Commencez gratuitement, passez au Premium pour débloquer toutes les fonctionnalités
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Gratuit</CardTitle>
                <div className="text-4xl font-bold text-primary">0€</div>
                <CardDescription>Pour commencer votre recherche d'emploi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    1 CV généré par IA
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Import LinkedIn
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Templates de base
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Export PDF
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8" 
                  variant="outline"
                  onClick={() => navigate('/register')}
                >
                  Commencer Gratuitement
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-ai-purple/5 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-ai-purple text-white px-4 py-1">
                  Recommandé
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-ai-purple bg-clip-text text-transparent">
                  9.99€
                </div>
                <CardDescription>Par mois - Pour une recherche d'emploi complète</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    CV illimités
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Lettres de motivation IA
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Emails de recrutement
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Templates premium
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    Support prioritaire
                  </li>
                </ul>
                <Button 
                  className="w-full mt-8 bg-gradient-to-r from-primary to-ai-purple hover:from-primary-dark hover:to-ai-purple text-white"
                  onClick={() => navigate('/register')}
                >
                  Commencer l'Essai Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-ai-purple/10 to-secondary/10">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Créer Votre CV Parfait ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez des milliers de professionnels qui ont trouvé leur emploi de rêve avec ProCivi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-ai-purple hover:from-primary-dark hover:to-ai-purple text-white"
                onClick={() => navigate('/cv-generator')}
              >
                Créer Mon CV
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/pricing')}
              >
                Voir les Prix
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;