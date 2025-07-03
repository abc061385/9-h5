import axios from "axios";
import { writeFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { generateApi } from "swagger-typescript-api";

async function run() {
  const res = await axios.get("https://www.9mc.one/app/v2/api-docs");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerFilePath = path.join(__dirname, "./swagger.json");
  writeFileSync(swaggerFilePath, JSON.stringify(res.data), "utf8");
  await generateApi({
    input: swaggerFilePath,
    output: path.resolve(__dirname, "../src/api"),
    fileName: "ApiClient.ts",
    httpClientType: "axios",
    templates: path.resolve(__dirname, "./api-templates"),
    // debug: true,
  });
}

run();
