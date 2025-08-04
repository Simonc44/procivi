import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
            
            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Collecte des informations</h2>
                <p className="text-muted-foreground mb-4">
                  Nous collectons les informations que vous nous fournissez directement, telles que :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Informations de compte (nom, adresse email)</li>
                  <li>Informations de CV (expérience, compétences, formation)</li>
                  <li>Données d'utilisation de nos services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Utilisation des informations</h2>
                <p className="text-muted-foreground mb-4">
                  Nous utilisons vos informations pour :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Générer et personnaliser vos CV</li>
                  <li>Améliorer nos services grâce à l'IA</li>
                  <li>Vous envoyer des communications importantes</li>
                  <li>Assurer la sécurité de notre plateforme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Partage des informations</h2>
                <p className="text-muted-foreground">
                  Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
                  Nous ne partageons vos informations que dans les cas suivants :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour respecter les obligations légales</li>
                  <li>Avec nos prestataires de services de confiance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Sécurité des données</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                  appropriées pour protéger vos informations personnelles contre l'accès non autorisé, 
                  la modification, la divulgation ou la destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
                <p className="text-muted-foreground mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité, 
                  contactez-nous à : privacy@cvgenerator.com
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

export default Privacy;