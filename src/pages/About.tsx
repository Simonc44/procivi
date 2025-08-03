import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Target, 
  Users, 
  Award, 
  Heart,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque CV généré, en utilisant l'IA la plus avancée pour des résultats exceptionnels."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Bienveillance",
      description: "Nous accompagnons chaque utilisateur avec empathie dans sa recherche d'emploi, moment crucial de sa vie professionnelle."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "Nous intégrons les dernières technologies IA pour révolutionner la création de CV et lettres de motivation."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Confidentialité",
      description: "Vos données restent privées et sécurisées. Nous ne stockons aucune information sensible sur nos serveurs."
    }
  ];

  const team = [
    {
      name: "Simon Cusseaau",
      role: "Fondateur & Développeur",
      description: "Passionné par l'IA et l'innovation, créateur de solutions intelligentes pour optimiser la recherche d'emploi.",
      avatar: "SC"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 bg-success/10 text-success border-success/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Notre Mission
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Révolutionner la
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                recherche d'emploi
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Chez Procivi, nous croyons que chaque professionnel mérite un CV exceptionnel. 
              Notre IA de pointe transforme votre profil en candidature irrésistible.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Notre Histoire</h2>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-6">
                    Procivi est né d'un constat simple : malgré leurs compétences exceptionnelles, 
                    trop de professionnels peinent à valoriser leur profil sur le marché du travail. 
                    Les CV traditionnels ne reflètent plus la richesse des parcours modernes.
                  </p>
                  <p className="mb-6">
                    En 2024, notre équipe d'experts en IA et recrutement a décidé de créer la solution 
                    définitive : un générateur de CV intelligent qui comprend votre profil LinkedIn, 
                    analyse les tendances du marché, et génère des candidatures sur mesure.
                  </p>
                  <p>
                    Aujourd'hui, des centaines de professionnels font confiance à Procivi pour 
                    transformer leur recherche d'emploi et décrocher le poste de leurs rêves.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chaque décision et chaque ligne de code chez Procivi.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-smooth">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Équipe</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés qui révolutionnent la recherche d'emploi.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-smooth">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-ai-purple/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">CV générés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">89%</div>
              <div className="text-muted-foreground">Taux de réussite</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Note moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-muted-foreground">Support moyen</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Prêt à transformer votre carrière ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Rejoignez les centaines de professionnels qui ont fait confiance à Procivi 
              pour décrocher le poste de leurs rêves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Commencer gratuitement
                <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;