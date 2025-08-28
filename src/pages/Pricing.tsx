import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous abonner.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
         body: {
            plan_type: 'premium_monthly', // ou ce que tu veux
         },
           });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la création du checkout",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const freeFeatures = [
    "1 CV généré par IA",
    "Import LinkedIn",
    "Templates de base",
    "Export PDF",
    "Support email"
  ];

  const premiumFeatures = [
    "CV illimités",
    "Lettres de motivation IA",
    "Emails de recrutement",
    "Templates premium",
    "Support prioritaire",
    "Analyse de profil avancée",
    "Suggestions d'amélioration",
    "Historique complet"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-ai-purple/5 to-secondary/5">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Tarifs Transparents
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-ai-purple to-secondary bg-clip-text text-transparent mb-6">
                Choisissez Votre Plan
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Commencez gratuitement, puis passez au Premium pour débloquer 
                toutes les fonctionnalités avancées de génération IA.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Gratuit</CardTitle>
                <div className="text-5xl font-bold text-primary my-4">0€</div>
                <CardDescription className="text-lg">
                  Parfait pour commencer votre recherche d'emploi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate('/register')}
                >
                  Commencer Gratuitement
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-ai-purple/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-ai-purple text-white px-6 py-2 text-sm font-semibold">
                  <Crown className="w-4 h-4 mr-2" />
                  Le Plus Populaire
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Premium</CardTitle>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-ai-purple bg-clip-text text-transparent my-4">
                  9.99€
                </div>
                <CardDescription className="text-lg">
                  Par mois - Pour une recherche d'emploi complète et efficace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-ai-purple hover:from-primary-dark hover:to-ai-purple text-white font-semibold py-3"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Redirection...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Passer au Premium
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Comparison */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comparaison Détaillée</h2>
              <p className="text-xl text-muted-foreground">
                Découvrez tout ce que vous pouvez faire avec ProCivi
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-card/50 backdrop-blur-sm rounded-lg border border-border/20">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left p-6 font-semibold">Fonctionnalités</th>
                    <th className="text-center p-6 font-semibold">Gratuit</th>
                    <th className="text-center p-6 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/10">
                    <td className="p-6">Génération de CV par IA</td>
                    <td className="text-center p-6">1 CV</td>
                    <td className="text-center p-6">Illimité</td>
                  </tr>
                  <tr className="border-b border-border/10">
                    <td className="p-6">Import LinkedIn</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-success mx-auto" /></td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/10">
                    <td className="p-6">Templates de CV</td>
                    <td className="text-center p-6">3 basiques</td>
                    <td className="text-center p-6">15+ premium</td>
                  </tr>
                  <tr className="border-b border-border/10">
                    <td className="p-6">Lettres de motivation IA</td>
                    <td className="text-center p-6">-</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-border/10">
                    <td className="p-6">Emails de recrutement IA</td>
                    <td className="text-center p-6">-</td>
                    <td className="text-center p-6"><Check className="w-5 h-5 text-success mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-6">Support</td>
                    <td className="text-center p-6">Email</td>
                    <td className="text-center p-6">Prioritaire</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-ai-purple/10 to-secondary/10">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-2">Puis-je annuler à tout moment ?</h3>
                <p className="text-sm text-muted-foreground">
                  Oui, vous pouvez annuler votre abonnement à tout moment. Aucun engagement.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-2">Y a-t-il une période d'essai ?</h3>
                <p className="text-sm text-muted-foreground">
                  Le plan gratuit vous permet de tester nos fonctionnalités de base.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-2">Comment fonctionne l'IA ?</h3>
                <p className="text-sm text-muted-foreground">
                  Nous utilisons Gemini 2.0 Flash de Google pour générer du contenu professionnel.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-2">Mes données sont-elles sécurisées ?</h3>
                <p className="text-sm text-muted-foreground">
                  Oui, nous utilisons un chiffrement de niveau entreprise pour protéger vos données.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
