/**
 * 用法：
 *   node csv2json.mjs input.csv zh_CN zh_HK en
  *  node csv2json.mjs ../export_lang/import_0924.csv en zh-Hans zh-Hant ja-JP ko-KR ms-MY th-TH vi-VN hi-IN de-DE fr-FR pt-PT es-ES
 */

const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const [, , csvPath, ..._langs] = process.argv;

let langs = _langs
if (langs.length === 0) {
  console.log(langs)
  langs = [
    "en",
    "zh-Hans",
    "zh-Hant",
    "ja-JP",
    "ko-KR",
    "ms-MY",
    "th-TH",
    "vi-VN",
    "hi-IN",
    "de-DE",
    "fr-FR",
    "pt-PT",
    "es-ES"
  ]

}
// 参数校验
if (!csvPath || langs.length === 0) {
  console.error("用法: node csv2json.mjs <input.csv> <col1> <col2> ...");
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error(`找不到 CSV 文件: ${csvPath}`);
  process.exit(1);
}

const content = fs.readFileSync(csvPath, "utf8");
const rows = parse(content, {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  relax_column_count_less: true,
  relax_column_count_more: true,
});

if (rows.length === 0) {
  console.error("CSV 文件无内容");
  process.exit(1);
}

// 校验 key 列与每个语言列是否存在
const headers = Object.keys(rows[0]);
if (!headers.includes("key")) {
  console.error("CSV 必须包含 `key` 列");
  process.exit(1);
}
for (const lang of langs) {
  if (!headers.includes(lang)) {
    console.error(`CSV 不包含指定语言列: ${lang}`);
    process.exit(1);
  }
}

// 工具函数：把 "a.b.c" 的 key 转换为嵌套对象
function setDeep(obj, path, value) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!cur[p] || typeof cur[p] !== "object") {
      cur[p] = {};
    }
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

// 提取内容，按语言生成对象
const output = {};
for (const lang of langs) {
  const oldLang = require(`../messages/${lang}.json`);
  output[lang] = {...oldLang}
};

for (const row of rows) {
  const k = row.key;
  for (const lang of langs) {
    setDeep(output[lang], k, row[lang]);
  }
}

// 写入 JSON 文件
for (const lang of langs) {
  const json = JSON.stringify(output[lang], null, 2);
  const fileName = path.join(__dirname,`../messages/${lang}.json`) ;
  fs.writeFileSync(fileName, json, "utf8");
  console.log(`✅ 已生成 ${fileName}`);
}
