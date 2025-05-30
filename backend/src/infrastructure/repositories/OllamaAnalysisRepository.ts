import axios from "axios";
import { IAnalysisRepository } from "../../domain/repositories/IAnalysisRepository.js";
import { Analysis, Sentiment } from "../../domain/entities/Analysis.js";

export class OllamaAnalysisRepository implements IAnalysisRepository {
  private readonly OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
  private readonly MODEL = "mistral";

  async analyzeComment(comment: string): Promise<Analysis> {
    const prompt = this.buildPrompt(comment);
    const response = await this.callOllama(prompt);
    return this.parseResponse(response);
  }

  private buildPrompt(comment: string): string {
    return `Tu es un expert en analyse de sentiment. À partir d'un avis client sur un restaurant, donne-moi le ressenti exprimé pour chaque critère suivant :
- Nourriture
- Service
- Ambiance
- Rapport qualité/prix

Pour chaque critère, indique :
- Un ressenti synthétique (positif, neutre, négatif)
- Une phrase courte expliquant pourquoi

La réponse doit être en français, et si tu ne sais pas, ne mets rien.

Voici le commentaire :
${comment}`;
  }

  private async callOllama(prompt: string): Promise<string> {
    try {
      const response = await axios.post(this.OLLAMA_URL, {
        model: this.MODEL,
        prompt,
        stream: false,
      });
      return response.data.response;
    } catch (error) {
      console.error("Erreur lors de l'appel à Ollama:", error);
      throw new Error("Erreur lors de l'analyse du commentaire");
    }
  }

  private parseResponse(response: string): Analysis {
    const result: Analysis = {
      nourriture: { ressenti: "Neutre", explication: "" },
      service: { ressenti: "Neutre", explication: "" },
      ambiance: { ressenti: "Neutre", explication: "" },
      rapportQualitePrix: { ressenti: "Neutre", explication: "" },
    };

    const lines = response.split("\n");
    let currentCriterion: keyof Analysis | null = null;
    let currentExplication = "";

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Ignorer les lignes vides
      if (!trimmedLine) continue;

      // Détecter le critère
      if (trimmedLine.includes("Nourriture")) {
        currentCriterion = "nourriture";
        result.nourriture.ressenti = this.extractSentiment(trimmedLine);
        currentExplication = "";
      } else if (trimmedLine.includes("Service")) {
        currentCriterion = "service";
        result.service.ressenti = this.extractSentiment(trimmedLine);
        currentExplication = "";
      } else if (trimmedLine.includes("Ambiance")) {
        currentCriterion = "ambiance";
        result.ambiance.ressenti = this.extractSentiment(trimmedLine);
        currentExplication = "";
      } else if (trimmedLine.includes("Rapport qualité/prix")) {
        currentCriterion = "rapportQualitePrix";
        result.rapportQualitePrix.ressenti = this.extractSentiment(trimmedLine);
        currentExplication = "";
      }

      // Si nous avons un critère actif et que la ligne commence par un tiret, c'est une explication
      if (currentCriterion && trimmedLine.startsWith("-")) {
        currentExplication = trimmedLine.replace("-", "").trim();
        if (currentExplication) {
          result[currentCriterion].explication = currentExplication;
        }
      }
    }

    return result;
  }

  private extractSentiment(line: string): Sentiment {
    const lowerLine = line.toLowerCase();

    // Expressions positives
    if (
      lowerLine.includes("positif") ||
      lowerLine.includes("excellent") ||
      lowerLine.includes("très bien") ||
      lowerLine.includes("mention très bien") ||
      lowerLine.includes("apprécié") ||
      lowerLine.includes("satisfait") ||
      lowerLine.includes("bon")
    ) {
      return "Positif";
    }

    // Expressions négatives
    if (
      lowerLine.includes("négatif") ||
      lowerLine.includes("mauvais") ||
      lowerLine.includes("insatisfait") ||
      lowerLine.includes("déçu") ||
      lowerLine.includes("médiocre") ||
      lowerLine.includes("peu satisfait")
    ) {
      return "Négatif";
    }

    // Par défaut, on considère comme neutre
    return "Neutre";
  }
}
