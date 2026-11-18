import express from "express";
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.post("/api/explain", async (req: Request, res: Response) => {
    const passage = typeof req.body?.passage === "string" ? req.body.passage.trim() : "";
    const lang = req.body?.lang === "en" ? "en" : "ka";

    if (passage.length < 15 || passage.length > 1500) {
      res.status(400).json({
        error:
          lang === "ka"
            ? "გთხოვთ შეიყვანოთ 15-დან 1500 სიმბოლომდე ტექსტი გასაანალიზებლად."
            : "Please provide between 15 and 1,500 characters of study text to simplify.",
      });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          lang === "ka"
            ? "AI სერვისის API გასაღები არ არის კონფიგურირებული (Settings > Secrets)."
            : "AI service API key is not configured in Settings > Secrets.",
      });
      return;
    }

    try {
      const targetLanguage = lang === "ka" ? "Georgian (ქართული)" : "English";
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: `Student reading passage that triggered an attention drop:\n\n"""\n${passage}\n"""\n\nExplain this clearly in ${targetLanguage} for a school student (grades 5-12) so they have an immediate "Aha!" comprehension moment.`,
        config: {
          systemInstruction: `You are Aham All's educational comprehension assistant. Always respond in ${targetLanguage} with crystal-clear, student-friendly prose. Never invent unrelated facts.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              simpleExplanation: {
                type: Type.STRING,
                description: "2-3 concise sentences explaining the core idea in plain, everyday language.",
              },
              realWorldExample: {
                type: Type.STRING,
                description: "1 concrete everyday analogy or school example that makes the concept intuitive.",
              },
              keyTakeaway: {
                type: Type.STRING,
                description: "1 short memorable takeaway sentence.",
              },
            },
            required: ["simpleExplanation", "realWorldExample", "keyTakeaway"],
          },
        },
      });

      const rawText = (response.text ?? "").trim();
      if (!rawText) {
        res.status(502).json({
          error:
            lang === "ka"
              ? "AI მოდელმა ცარიელი პასუხი დააბრუნა. სცადეთ ხელახლა."
              : "The AI model returned an empty response. Please try again.",
        });
        return;
      }

      const parsed = JSON.parse(rawText) as {
        simpleExplanation?: string;
        realWorldExample?: string;
        keyTakeaway?: string;
      };

      res.json({
        simpleExplanation: parsed.simpleExplanation ?? "",
        realWorldExample: parsed.realWorldExample ?? "",
        keyTakeaway: parsed.keyTakeaway ?? "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error in /api/explain:", message);
      res.status(500).json({
        error:
          lang === "ka"
            ? "ტექსტის გამარტივებისას დაფიქსირდა ტექნიკური შეფერხება."
            : "An error occurred while simplifying the passage.",
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aham All server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
