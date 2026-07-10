export interface SamplePrompt {
  title: string;
  text: string;
  color: string;
}

export const samplePrompts: SamplePrompt[] = [
  {
    title: "In-Person Meeting",
    text: "Met Dr. Sarah Jenkins in-person today at 2 PM. MSL Mark attended. We discussed Cardioxa clinical results, she was highly positive and requested Phase 3 clinical reprints.",
    color: "border-brand-primary/20 hover:border-brand-primary text-brand-primary",
  },
  {
    title: "Virtual Call",
    text: "Had a 15-minute virtual call with Dr. Robert Vance. Reviewed Cardioxa safety profile. The sentiment was neutral and I shared the Product Monograph PDF.",
    color: "border-brand-accent/20 hover:border-brand-accent text-brand-accent",
  },
  {
    title: "Quick Email",
    text: "Received an email from Dr. Gregory House requesting pediatric guidelines for Cardioxa. The sentiment was neutral. Sent the pediatric guidelines monograph.",
    color: "border-brand-success/20 hover:border-brand-success text-brand-success",
  },
];