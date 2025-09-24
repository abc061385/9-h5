const fs = require("fs");
const path = require("path");
const zh = require("../messages/zh-Hans.json");
// const zhTW = require("./zh-TW.js");
// const en = require("./en.js");
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
// const flatEn = flattenObject(en);

const csvLines = ["key,zh-Hans"];
for (const key in flat) {
  // 逗号和双引号处理一下
  let _zh = String(flat[key]);
  // let _zh_tw = String(flatTW[key]);
  // let _en = String(flatEn[key]);
  csvLines.push(`${key},${_zh}`);
}

const csvContent = csvLines.join("\n");

const date = new Date();
fs.writeFileSync(path.resolve(__dirname, '../export_lang/', `${date.getMonth()}_${date.getDay()}.csv`), csvContent, "utf8");

// console.log(flatTW);
