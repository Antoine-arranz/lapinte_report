export interface Analysis {
  nourriture: Criterion;
  service: Criterion;
  ambiance: Criterion;
  rapportQualitePrix: Criterion;
}

export interface Criterion {
  ressenti: Sentiment;
  explication: string;
}

export type Sentiment = "Positif" | "Neutre" | "Négatif";
