// copyEnToRoot.js
const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname, "..", "out");
const src = path.join(outDir, "en");
const dest = outDir;

if (!fs.existsSync(src)) {
  console.error("❌ 未找到源目录：", src);
  process.exit(1);
}

try {
  // Node.js v16.7+ 支持 fs.cp/Sync
  fs.cpSync(src, dest, { recursive: true, errorOnExist: false, force: true });
  console.log("✅ 成功将 /en 的内容复制到根目录！");
} catch (err) {
  console.error("❌ 复制失败：", err);
  process.exit(1);
}
