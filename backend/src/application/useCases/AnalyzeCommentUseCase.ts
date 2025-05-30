import { IAnalysisRepository } from "../../domain/repositories/IAnalysisRepository.js";
import { Analysis } from "../../domain/entities/Analysis.js";

export class AnalyzeCommentUseCase {
  constructor(private readonly analysisRepository: IAnalysisRepository) {}

  async execute(comment: string): Promise<Analysis> {
    if (!comment.trim()) {
      throw new Error("Le commentaire ne peut pas être vide");
    }
    return this.analysisRepository.analyzeComment(comment);
  }
}
