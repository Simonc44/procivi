import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Shield, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animated-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 opacity-15 animated-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-10 animated-blob" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Partnership badges */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass-card rounded-full px-6 py-3">
          <div className="flex items-center gap-6 text-white/80">
            <span className="text-sm font-medium">Partenaires officiels:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs">Google</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs">LinkedIn</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#635BFF">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
                </svg>
                <span className="text-xs">Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6B35">
                  <circle cx="12" cy="12" r="10" fill="currentColor"/>
                  <text x="12" y="16" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">DB</text>
                </svg>
                <span className="text-xs">Databutton</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 glass text-white border-white/20 hover:bg-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Propulsé par Gemini 2.0 Flash
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Crée ton CV parfait
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                en un clic
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              L'IA la plus avancée de Google rencontre ton profil LinkedIn pour générer 
              des CV, lettres de motivation et emails personnalisés en 30 secondes.
            </p>

            {/* Key features */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-medium">Génération instantanée</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium">100% sécurisé</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-blue-300" />
                <span className="text-white font-medium">Qualité pro</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="default" 
                size="lg" 
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/cv-generator">
                  Créer mon CV
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link to="/login">
                  Se connecter
                </Link>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl transform scale-110"></div>
              
              {/* Main image */}
              <div className="relative glass-card rounded-3xl p-2">
                <img 
                  src={heroImage} 
                  alt="Procivi CV Generator Interface"
                  className="w-full h-auto rounded-2xl shadow-2xl float"
                />
              </div>

              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-lg animate-bounce delay-100">
                <div className="text-white text-sm font-semibold">CV généré!</div>
                <div className="text-white/90 text-xs">Score ATS: 95%</div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-lg animate-pulse">
                <div className="text-white text-sm font-semibold">IA Gemini 2.0</div>
                <div className="text-white/90 text-xs">Analyse terminée ✓</div>
              </div>

              <div className="absolute top-1/2 -left-8 glass-card rounded-xl p-3 shadow-lg float" style={{animationDelay: '1s'}}>
                <div className="text-white text-xs font-semibold">LinkedIn</div>
                <div className="text-white/90 text-xs">Synchronisé</div>
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