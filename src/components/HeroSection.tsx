import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Shield, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-ai-purple/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Propulsé par Gemini 2.0 Flash
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Crée ton CV parfait
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                en un clic
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              L'IA la plus avancée de Google rencontre ton profil LinkedIn pour générer 
              des CV, lettres de motivation et emails personnalisés en 30 secondes.
            </p>

            {/* Key features */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-medium">Génération instantanée</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">100% sécurisé</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Trophy className="w-5 h-5 text-blue-300" />
                <span className="text-white font-medium">Qualité pro</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Voir la démo
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4">Déjà utilisé par 500+ professionnels</p>
              <div className="flex items-center justify-center lg:justify-start gap-8 opacity-80">
                <div className="text-white font-semibold">★★★★★</div>
                <div className="text-white/90 text-sm">4.9/5 sur les stores</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="flex-1 relative max-w-2xl">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-ai-purple/20 rounded-3xl blur-2xl transform scale-110"></div>
              
              {/* Main image */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-2 border border-white/20">
                <img 
                  src={heroImage} 
                  alt="Procivi CV Generator Interface"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>

              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 bg-success/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce delay-100">
                <div className="text-white text-sm font-semibold">CV généré!</div>
                <div className="text-white/90 text-xs">Score ATS: 95%</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-ai-purple/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-pulse">
                <div className="text-white text-sm font-semibold">IA Gemini</div>
                <div className="text-white/90 text-xs">Analyse en cours...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};