import { Analysis } from "../entities/Analysis";

export interface IAnalysisRepository {
  analyzeComment(comment: string): Promise<Analysis>;
}
