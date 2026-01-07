import { useState } from "react";
import { Leaf, Recycle, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WasteUploader } from "@/components/WasteUploader";
import { ClassificationResult } from "@/components/ClassificationResult";
import { HowItWorks } from "@/components/HowItWorks";
import { WasteCategories } from "@/components/WasteCategories";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-waste-bins.jpg";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<{
    category: "dry" | "wet" | "hazardous" | "ewaste" | "sanitary" | "reject";
    confidence: number;
    item: string;
  } | null>(null);

  const handleImageSelected = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsClassifying(true);
    
    // Convert file to base64 for AI classification
    const base64Image = await new Promise<string>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => resolve(e.target?.result as string);
      fileReader.readAsDataURL(file);
    });

    try {
      console.log('Calling AI classification...');
      
      const { data, error } = await supabase.functions.invoke('classify-waste', {
        body: { imageData: base64Image }
      });

      if (error) {
        console.error('Classification error:', error);
        toast.error(error.message || 'Failed to classify image');
        setIsClassifying(false);
        setSelectedImage(null);
        return;
      }

              if (data) {
        console.log('Classification result:', data);
        
        // Check confidence level
        if (data.confidence < 70) {
          toast.warning('Low confidence classification. The result may not be accurate.');
        }
        
        setResult({
          category: data.category,
          confidence: data.confidence,
          item: data.item
        });
        toast.success('Classification complete!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
      setSelectedImage(null);
    } finally {
      setIsClassifying(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <Leaf className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                AI-Powered Waste Classification
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Sort Your Waste
              <br />
              <span className="text-primary-glow">Correctly, Easily</span>
            </h1>

            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Classify waste into 6 categories: Dry, Wet, Hazardous, E-Waste, Sanitary, and Reject. 
              Get instant AI-powered guidance for proper disposal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Recycle className="h-5 w-5" />
                Start Classifying
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">95%+</div>
              <div className="text-sm text-muted-foreground">Classification Accuracy</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4">
                <Recycle className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Privacy Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Classify Your Waste
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload an image and let AI guide you to the right disposal method
            </p>
          </div>

          {!selectedImage ? (
            <WasteUploader onImageSelected={handleImageSelected} />
          ) : (
            <div className="space-y-8">
              <div className="relative rounded-xl overflow-hidden shadow-glow">
                <img
                  src={selectedImage}
                  alt="Selected waste"
                  className="w-full h-64 object-cover"
                />
                {isClassifying && (
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4" />
                      <p className="text-primary-foreground font-semibold">Analyzing waste...</p>
                    </div>
                  </div>
                )}
              </div>

              {result && !isClassifying && (
                <>
                  <ClassificationResult
                    category={result.category}
                    confidence={result.confidence}
                    item={result.item}
                  />
                  <div className="flex justify-center">
                    <Button variant="outline" onClick={handleReset}>
                      Classify Another Item
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Waste Categories */}
      <WasteCategories />

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-4 mt-20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Smart Waste Assistant</span>
          </div>
          <p className="text-muted-foreground mb-6">
            Making sustainable waste management accessible to everyone
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Smart Waste Assistant. Powered by AI for a greener future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
