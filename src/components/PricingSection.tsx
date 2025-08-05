import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Crown, Zap, Sparkles } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "Pour toujours",
      description: "Parfait pour commencer",
      badge: null,
      features: [
        "2 CV par mois",
        "Templates de base",
        "Export PDF",
        "Support communautaire"
      ],
      limitations: [
        "Génération IA limitée",
        "Pas d'import LinkedIn",
        "Pas de lettres de motivation",
        "Pas d'analyse ATS"
      ],
      cta: "Commencer gratuitement",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "9,99€",
      period: "par mois",
      description: "Pour les professionnels ambitieux",
      badge: "Populaire",
      features: [
        "CV illimités",
        "Tous les templates premium",
        "Import LinkedIn complet",
        "Génération IA avancée (Gemini 2.0)",
        "Lettres de motivation personnalisées",
        "Emails de candidature",
        "Analyse ATS complète",
        "Export multi-format (PDF, PNG, TXT)",
        "Historique des versions",
        "Support prioritaire"
      ],
      limitations: [],
      cta: "Essayer 7 jours gratuits",
      variant: "premium" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      period: "Pour les équipes",
      description: "Solution pour les entreprises",
      badge: "Enterprise",
      features: [
        "Tout du plan Pro",
        "Comptes illimités",
        "Branding personnalisé",
        "API dédiée",
        "Formation des équipes",
        "Support dédié 24/7",
        "Intégrations sur mesure",
        "Conformité RGPD avancée"
      ],
      limitations: [],
      cta: "Nous contacter",
      variant: "secondary" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-success/10 text-success border-success/20">
            <Crown className="w-4 h-4 mr-2" />
            Plans flexibles
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Un plan pour chaque
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              professionnel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Commence gratuitement et évolue selon tes besoins. 
            Tous les plans incluent la sécurité et la confidentialité totales.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-border/50 transition-all duration-smooth hover:-translate-y-2 ${
                plan.popular 
                  ? "border-primary/50 shadow-glow scale-105" 
                  : "hover:shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white border-0 px-6 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                {plan.badge && !plan.popular && (
                  <Badge variant="secondary" className="w-fit mx-auto mb-4">
                    {plan.badge}
                  </Badge>
                )}
                
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.period !== "Pour les équipes" && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {/* Limitations for free plan */}
                  {plan.limitations.map((limitation, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-60">
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full group"
                >
                  {plan.cta}
                  {plan.popular && <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />}
                </Button>

                {/* Free trial note */}
                {plan.popular && (
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">
                      Pas de carte bancaire requise • Annulation à tout moment
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-ai-purple/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à transformer ta recherche d'emploi ?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoins des centaines de professionnels qui ont boosté leur carrière avec Procivi. 
              Commence gratuitement, aucune carte bancaire requise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Commencer maintenant
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Planifier une démo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};