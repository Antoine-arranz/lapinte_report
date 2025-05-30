import { Router } from "express";
import { AnalysisController } from "../controllers/AnalysisController.js";

export function createAnalysisRoutes(
  analysisController: AnalysisController
): Router {
  const router = Router();

  router.post("/analyze", (req, res) =>
    analysisController.analyzeComment(req, res)
  );

  return router;
}
