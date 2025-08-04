import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
            
            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
                <p className="text-muted-foreground">
                  En utilisant notre service de génération de CV powered by AI, vous acceptez 
                  d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces 
                  conditions, veuillez ne pas utiliser notre service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
                <p className="text-muted-foreground">
                  Notre plateforme utilise l'intelligence artificielle pour vous aider à créer 
                  des CV professionnels et personnalisés. Nous proposons également des 
                  intégrations avec LinkedIn et d'autres services professionnels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Compte utilisateur</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Vous devez fournir des informations exactes lors de l'inscription</li>
                  <li>Vous êtes responsable de la sécurité de votre compte</li>
                  <li>Un seul compte par personne est autorisé</li>
                  <li>Vous devez avoir au moins 16 ans pour utiliser notre service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Utilisation autorisée</h2>
                <p className="text-muted-foreground mb-4">Vous vous engagez à :</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Utiliser le service uniquement à des fins légales</li>
                  <li>Ne pas tenter de contourner nos mesures de sécurité</li>
                  <li>Ne pas utiliser le service pour créer du contenu trompeur</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
                <p className="text-muted-foreground">
                  Vous conservez la propriété du contenu que vous créez. Cependant, vous nous 
                  accordez une licence pour traiter et améliorer ce contenu dans le cadre de 
                  notre service. Notre technologie et nos algorithmes restent notre propriété exclusive.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
                <p className="text-muted-foreground">
                  Notre service est fourni "en l'état". Nous ne garantissons pas que l'utilisation 
                  de nos CV générera des opportunités d'emploi. Nous ne sommes pas responsables 
                  des décisions prises par les employeurs potentiels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Résiliation</h2>
                <p className="text-muted-foreground">
                  Vous pouvez supprimer votre compte à tout moment. Nous nous réservons le droit 
                  de suspendre ou supprimer des comptes qui violent ces conditions d'utilisation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
                <p className="text-muted-foreground">
                  Nous nous réservons le droit de modifier ces conditions à tout moment. 
                  Les utilisateurs seront notifiés des changements importants.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant ces conditions d'utilisation, 
                  contactez-nous à : legal@cvgenerator.com
                </p>
              </section>

              <section>
                <p className="text-sm text-muted-foreground">
                  Dernière mise à jour : 15 janvier 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;