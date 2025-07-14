#!/usr/bin/env node
/**
 * 自动生成 icons 类型定义
 */

import fs from "fs/promises";
import path from "path";

async function main() {
  const iconsDir = path.resolve(process.cwd(), "public/icons");
  const outFile = path.resolve(process.cwd(), "src/types/icons.d.ts");

  let files;
  try {
    files = await fs.readdir(iconsDir, { withFileTypes: true });
  } catch (err) {
    console.error(`❌ 无法读取目录 ${iconsDir}：`, err);
    process.exit(1);
  }

  const iconNames = files
    .filter((d) => d.isFile() && d.name.endsWith(".svg"))
    .map((d) => path.basename(d.name, ".svg"));

  if (iconNames.length === 0) {
    console.warn("⚠️ 没有找到任何 SVG 文件");
  }

  const union = iconNames.map((n) => `"${n}"`).join(" | ") || "never";
  const content = `// 此文件由脚本生成，请勿手动修改
export type IconName = ${union};
`;

  try {
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, content, "utf8");
    console.log(`✅ 成功生成 ${outFile}`);
  } catch (err) {
    console.error("❌ 写入文件失败：", err);
    process.exit(1);
  }
}

main();
