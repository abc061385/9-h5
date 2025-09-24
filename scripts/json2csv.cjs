const fs = require("fs");
const path = require("path");
const zh = require("../messages/zh-Hans.json");
// const zhTW = require("./zh-TW.js");
const en = require("../messages/en.json");
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

const flat = flattenObject(zh);
// const flatTW = flattenObject(zhTW);
const flatEn = flattenObject(en);


const csvLines = ["key,en,zh-Hans,zh-Hant,ja-JP,ko-KR,ms-MY,th-TH,vi-VN,hi-IN,de-DE,fr-FR,pt-PT,es-ES"];
for (const key in flat) {
  // 逗号和双引号处理一下
  let _zh = String(flat[key]);
  // let _zh_tw = String(flatTW[key]);
  let _en = String(flatEn[key]);
  csvLines.push(`${key},"${_en}","${_zh}"`);
}

const csvContent = csvLines.join("\n");
function getCurrentDateYYYYMMDD() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
 
fs.writeFileSync(path.resolve(__dirname, '../export_lang/', `${getCurrentDateYYYYMMDD()}.csv`), csvContent, "utf8");

// console.log(flatTW);
