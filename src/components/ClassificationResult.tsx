import { CheckCircle2, AlertTriangle, Trash2, Leaf, Droplets, Zap, Smartphone, Heart, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ClassificationResultProps {
  category: "dry" | "wet" | "hazardous" | "ewaste" | "sanitary" | "reject";
  confidence: number;
  item: string;
}

const categoryConfig = {
  dry: {
    icon: Trash2,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    title: "Dry Waste",
    description: "Recyclable materials",
    examples: "Paper, cardboard, plastic bottles, metal cans, glass jars, packaging materials",
    guidance: [
      "Clean and dry the item before recycling",
      "Remove any labels or caps from containers",
      "Place in blue recycling bin",
      "Flatten cardboard boxes to save space",
      "Consider donating if item is reusable",
    ],
  },
  wet: {
    icon: Droplets,
    color: "text-primary",
    bgColor: "bg-primary/10",
    title: "Wet Waste",
    description: "Organic/biodegradable materials",
    examples: "Vegetable peels, leftover food, tea powder, fruit skins, garden waste",
    guidance: [
      "Place in green composting bin",
      "Do not mix with plastic bags or packaging",
      "Can be used for home composting or vermicomposting",
      "Breaks down naturally in 30-45 days",
      "Keep separate from other waste types",
    ],
  },
  hazardous: {
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    title: "Hazardous Waste",
    description: "Requires special handling",
    examples: "Batteries, paint, chemicals, syringes, medical waste, broken bulbs",
    guidance: [
      "Do NOT place in regular bins",
      "Store in sealed containers until disposal",
      "Take to designated hazardous waste collection center",
      "Keep away from children and pets",
      "Contact local waste management for pickup schedules",
    ],
  },
  ewaste: {
    icon: Smartphone,
    color: "text-accent",
    bgColor: "bg-accent/10",
    title: "E-Waste",
    description: "Electronic waste items",
    examples: "Phones, chargers, earphones, keyboards, old gadgets, cables",
    guidance: [
      "Do not dispose with regular waste",
      "Remove batteries before disposal if possible",
      "Take to authorized e-waste collection centers",
      "Consider donating working electronics",
      "Many retailers offer e-waste recycling programs",
    ],
  },
  sanitary: {
    icon: Heart,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    title: "Sanitary Waste",
    description: "Personal hygiene items",
    examples: "Diapers, sanitary pads, tissues, cotton swabs, bandages",
    guidance: [
      "Wrap securely in paper or biodegradable bags",
      "Place in designated sanitary waste bins",
      "Never flush down toilets",
      "Keep separate from recyclable waste",
      "Dispose of daily to maintain hygiene",
    ],
  },
  reject: {
    icon: XCircle,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
    title: "Reject Waste",
    description: "Non-recyclable items",
    examples: "Thermocol, chips packets, disposable cups/plates, multilayer packaging",
    guidance: [
      "Cannot be recycled through normal channels",
      "Minimize use of these products when possible",
      "Place in designated reject waste bin",
      "Look for eco-friendly alternatives for future",
      "Some specialized facilities may accept these items",
    ],
  },
};

export const ClassificationResult = ({
  category,
  confidence,
  item,
}: ClassificationResultProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-card border-border overflow-hidden">
        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`${config.bgColor} p-4 rounded-full`}>
              <Icon className={`h-8 w-8 ${config.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">{config.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(confidence)}% confident
                </Badge>
              </div>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Confidence Score</span>
              <span className={`font-semibold ${
                confidence >= 90 ? 'text-primary' : 
                confidence >= 70 ? 'text-warning' : 
                'text-destructive'
              }`}>
                {Math.round(confidence)}%
              </span>
            </div>
            <Progress value={confidence} className="h-2" />
            {confidence < 70 && (
              <p className="text-xs text-warning flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Low confidence - Please verify the classification manually
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Detected item:</span> {item}
              </p>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">Common items in this category:</p>
              <p className="text-sm text-foreground">{config.examples}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-card border-border">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-semibold text-foreground">Disposal Guidance</h4>
          </div>
          <ul className="space-y-3">
            {config.guidance.map((tip, index) => (
              <li key={index} className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
