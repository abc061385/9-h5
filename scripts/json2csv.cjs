const fs = require("fs");
const path = require("path");
// const zh = require("../messages/zh-Hans.json");
function flattenObject(obj, prefix = "", res = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const val = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (val && typeof val === "object" && !Array.isArray(val)) {
      flattenObject(val, newKey, res);
    } else {
      res[newKey] = val;
    }
  }
  return res;
}

// const flat = flattenObject(zh);
// const flatEn = flattenObject(en);


const langList = ['en', 'zh-Hans', 'zh-Hant', 'ja-JP', 'ko-KR', 'ms-MY', 'th-TH', 'vi-VN', 'hi-IN', 'de-DE', 'fr-FR', 'pt-PT', 'es-ES', 'it-IT',
  "nl-NL",
  "no-NO",
  "sv-SE",
  "ro-RO",
  "cs-CZ",
]
const csvLines = ["key," + langList.join(",")];

const langsMap = {}

for (let index = 0; index < langList.length; index++) {
  const _lang = langList[index];
  const _langObj =  require(`../messages/${_lang}.json`);
  langsMap[_lang] = flattenObject(_langObj)
  
}

// for (const key in langsMap["en"]) {
for (const key in langsMap["zh-Hans"]) {
  let langStr = ""
  for (let index = 0; index < langList.length; index++) {
    const _lang = langList[index];
    langStr += `"${langsMap[_lang][key] || ''}"`+ ","    
  }
  // console.log(langStr)
  // let _zh = String(flat[key]);
  // let _en = String(flatEn[key]);

  csvLines.push(`${key},${langStr}`);
}

const csvContent = csvLines.join("\n");
function getCurrentDateYYYYMMDD() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
 
fs.writeFileSync(path.resolve(__dirname, '../export_lang/', `export_${getCurrentDateYYYYMMDD()}.csv`), csvContent, "utf8");

// console.log(flatTW);
