import { Camera, Sparkles, CheckCircle } from "lucide-react";
import scanIcon from "@/assets/scan-icon.png";
import guidanceIcon from "@/assets/guidance-icon.png";

const steps = [
  {
    icon: Camera,
    title: "Upload or Capture",
    description: "Take a photo of your waste item or upload an existing image",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    description: "Our AI model identifies the waste type with high accuracy",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CheckCircle,
    title: "Get Guidance",
    description: "Receive clear disposal instructions and recycling tips",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and accurate waste classification in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-card border border-border rounded-xl p-8 h-full transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${step.bgColor} p-6 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`h-10 w-10 ${step.color}`} />
                    </div>
                    
                    <div className="mb-4 text-4xl font-bold text-primary/20">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
