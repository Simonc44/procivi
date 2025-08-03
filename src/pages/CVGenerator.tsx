import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CVGenerator as CVGeneratorComponent } from "@/components/CVGenerator";

const CVGenerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <CVGeneratorComponent />
      </div>
      <Footer />
    </div>
  );
};

export default CVGenerator;