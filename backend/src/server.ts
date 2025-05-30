import express from "express";
import cors from "cors";
import { OllamaAnalysisRepository } from "./infrastructure/repositories/OllamaAnalysisRepository.js";
import { AnalyzeCommentUseCase } from "./application/useCases/AnalyzeCommentUseCase.js";
import { AnalysisController } from "./infrastructure/controllers/AnalysisController.js";
import { createAnalysisRoutes } from "./infrastructure/routes/analysisRoutes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Dependency Injection
const analysisRepository = new OllamaAnalysisRepository();
const analyzeCommentUseCase = new AnalyzeCommentUseCase(analysisRepository);
const analysisController = new AnalysisController(analyzeCommentUseCase);

// Routes
app.use("/api", createAnalysisRoutes(analysisController));

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
