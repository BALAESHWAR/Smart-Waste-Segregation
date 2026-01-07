import { Trash2, Droplets, AlertTriangle, Smartphone, Heart, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    icon: Trash2,
    title: "Dry Waste",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    examples: ["Paper", "Plastic bottles", "Metal cans", "Glass jars"],
  },
  {
    icon: Droplets,
    title: "Wet Waste",
    color: "text-primary",
    bgColor: "bg-primary/10",
    examples: ["Food scraps", "Vegetable peels", "Garden waste", "Tea powder"],
  },
  {
    icon: AlertTriangle,
    title: "Hazardous",
    color: "text-warning",
    bgColor: "bg-warning/10",
    examples: ["Batteries", "Chemicals", "Paint", "Medical waste"],
  },
  {
    icon: Smartphone,
    title: "E-Waste",
    color: "text-accent",
    bgColor: "bg-accent/10",
    examples: ["Old phones", "Chargers", "Keyboards", "Cables"],
  },
  {
    icon: Heart,
    title: "Sanitary",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    examples: ["Diapers", "Sanitary pads", "Tissues", "Bandages"],
  },
  {
    icon: XCircle,
    title: "Reject",
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
    examples: ["Thermocol", "Chips packets", "Disposable cups", "Multi-layer packaging"],
  },
];

export const WasteCategories = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Waste Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI recognizes 6 different types of waste to guide you to proper disposal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-card border-border p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`${category.bgColor} p-3 rounded-lg flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
