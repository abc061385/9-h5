import axios from "axios";
import { writeFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { generateApi } from "swagger-typescript-api";

const apiUrl = "https://www.9mc.one/app/v2/api-docs";
const nineIndexUrl = "https://www.9mc.one/app/nine-index/v3/api-docs";
async function run(url, name) {
  const res = await axios.get(url);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerFilePath = path.join(__dirname, `./${name}.json`);
  writeFileSync(swaggerFilePath, JSON.stringify(res.data), "utf8");
  await generateApi({
    input: swaggerFilePath,
    output: path.resolve(__dirname, `../src/api`),
    fileName: `${name}.ts`,
    httpClientType: "axios",
    templates: path.resolve(__dirname, "./api-templates"),
    // debug: true,
  });
}

function main() {
  Promise.allSettled([
    run(apiUrl, "ApiClient"),
    run(nineIndexUrl, "NineIndexClient"),
  ]);
}

main();
