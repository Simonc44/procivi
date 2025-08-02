import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Linkedin, 
  FileText, 
  Download, 
  Shield, 
  Zap, 
  Target, 
  Sparkles,
  ArrowRight,
  CheckCircle 
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Gemini 2.0 Flash",
      description: "L'IA la plus rapide et contextuelle de Google pour des CV personnalisés et optimisés.",
      badge: "Nouveau",
      gradient: "bg-gradient-ai"
    },
    {
      icon: Linkedin,
      title: "Intégration LinkedIn",
      description: "Importe automatiquement tes expériences, compétences et formations en un clic.",
      badge: "Populaire",
      gradient: "bg-secondary"
    },
    {
      icon: FileText,
      title: "Lettres & Emails",
      description: "Génère des lettres de motivation et emails de candidature sur mesure.",
      badge: "Pro",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Target,
      title: "Analyse ATS",
      description: "Score de compatibilité et suggestions pour maximiser tes chances.",
      badge: "Expert",
      gradient: "bg-success"
    },
    {
      icon: Download,
      title: "Export multi-format",
      description: "PDF haute qualité, PNG pour réseaux sociaux, TXT pour ATS.",
      badge: "Gratuit",
      gradient: "bg-primary"
    },
    {
      icon: Shield,
      title: "Sécurité totale",
      description: "Stockage local de tes données, aucun transfert sur nos serveurs.",
      badge: "Sécurisé",
      gradient: "bg-muted"
    }
  ];

  const benefits = [
    "Génération en 30 secondes",
    "Templates professionnels",
    "Optimisation ATS automatique",
    "Multi-langues supportées",
    "Historique des versions",
    "Support client dédié"
  ];

  return (
    <section id="features" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Fonctionnalités premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tout ce dont tu as besoin pour
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              réussir tes candidatures
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Procivi combine l'intelligence artificielle de Google avec l'intégration LinkedIn 
            pour créer des documents de candidature qui se démarquent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-smooth hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits section */}
        <div className="bg-gradient-to-r from-primary/5 to-ai-purple/5 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Pourquoi choisir Procivi ?
              </h3>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button variant="default" size="lg" className="mt-8 group">
                Découvrir tous les avantages
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-card p-8 rounded-2xl shadow-lg border border-border/50">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground mb-4">Professionnels conquis</div>
                  <div className="flex justify-center mb-4">
                    {"★".repeat(5).split("").map((star, i) => (
                      <span key={i} className="text-yellow-400 text-xl">{star}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Procivi a transformé ma recherche d'emploi. CV professionnel en 30 secondes !"
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">- Sarah M., Data Scientist</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-ai rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};