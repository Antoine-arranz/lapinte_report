import { Request, Response } from "express";
import { AnalyzeCommentUseCase } from "../../application/useCases/AnalyzeCommentUseCase.js";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string().min(1, "Le commentaire ne peut pas être vide"),
});

export class AnalysisController {
  constructor(private readonly analyzeCommentUseCase: AnalyzeCommentUseCase) {}

  async analyzeComment(req: Request, res: Response): Promise<void> {
    try {
      const { comment } = commentSchema.parse(req.body);
      const analysis = await this.analyzeCommentUseCase.execute(comment);

      res.json({ analysis });
    } catch (error) {
      console.error("Erreur:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors[0].message });
      } else {
        res
          .status(500)
          .json({ error: "Erreur lors de l'analyse du commentaire" });
      }
    }
  }
}
