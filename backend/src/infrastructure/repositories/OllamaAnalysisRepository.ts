import axios from "axios";
import { IAnalysisRepository } from "../../domain/repositories/IAnalysisRepository.js";
import { Analysis, Sentiment } from "../../domain/entities/Analysis.js";

export class OllamaAnalysisRepository implements IAnalysisRepository {
  private readonly OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
  private readonly MODEL = "mistral";

  async analyzeComment(comment: string): Promise<any> {
    const prompt = this.buildPrompt(comment);
    console.log(prompt);
    const response = await this.callOllama(prompt);
    console.log(response);
    return response;
    // return this.parseResponse(response);
  }

  private buildPrompt(comment: string): string {
    return `Tu es un expert en analyse de sentiment spécialisé dans les avis clients pour les restaurants ou bars.

Tu dois analyser un commentaire en évaluant les critères suivants :
- Nourriture
- Service
- Ambiance
- Rapport qualité/prix
- Autre

Pour chaque critère, indique toujours les 3 éléments suivants :
- Note : une note sur 10 uniquement si l'information est clairement indiquée dans le commentaire. Sinon, écris "Pas de commentaire".
- Ressenti : positif, neutre, négatif — uniquement si une indication claire ou raisonnable est présente. Sinon, écris "Pas de commentaire".
- Justification : phrase très courte, sans extrapolation. Si rien n’est dit, écris "Pas de commentaire".

N’invente rien. N'utilise pas le ton global du commentaire pour évaluer tous les critères : chaque critère doit être traité **indépendamment**.

En plus, indique une **note globale** uniquement si au moins deux ressentis sont clairement exprimés (positifs ou négatifs). Sinon, écris "Pas de note globale".

Le format de réponse doit être **toujours strictement le même**, comme ci-dessous :

1 Nourriture
Note : [x/10 ou "Pas de commentaire"]
Ressenti : [positif / neutre / négatif ou "Pas de commentaire"]
Justification : [phrase courte ou "Pas de commentaire"]

2 Service
Note : [x/10 ou "Pas de commentaire"]
Ressenti : [positif / neutre / négatif ou "Pas de commentaire"]
Justification : [phrase courte ou "Pas de commentaire"]

3 Ambiance
Note : [x/10 ou "Pas de commentaire"]
Ressenti : [positif / neutre / négatif ou "Pas de commentaire"]
Justification : [phrase courte ou "Pas de commentaire"]

4 Rapport qualité/prix
Note : [x/10 ou "Pas de commentaire"]
Ressenti : [positif / neutre / négatif ou "Pas de commentaire"]
Justification : [phrase courte ou "Pas de commentaire"]

5 Autre
Note : [x/10 ou "Pas de commentaire"]
Ressenti : [positif / neutre / négatif ou "Pas de commentaire"]
Justification : [phrase courte ou "Pas de commentaire"]

Note globale : [x/10 ou "Pas de note globale"]

yaml
Copier
Modifier

Voici le commentaire à analyser :  
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
}
