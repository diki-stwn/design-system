// src/internal/dates.ts
import { latinDigits } from "./digits.js";
var day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
function addMonths(d, n) {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), last));
}
var sameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
var sameMonth = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
var startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
var startOfWeek = (d, weekStartsOn) => addDays(d, -((d.getDay() - weekStartsOn + 7) % 7));
var compare = (a, b) => day(a).getTime() - day(b).getTime();
var isValid = (d) => d instanceof Date && !isNaN(d.getTime());
var isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
var SUNDAY_FIRST = /^(AG|AS|BD|BR|BS|BT|BW|BZ|CA|CO|DM|DO|ET|GT|GU|HK|HN|ID|IL|IN|JM|JP|KE|KH|KR|LA|MH|MM|MO|MT|MX|MZ|NI|NP|PA|PE|PH|PK|PR|PT|PY|SA|SG|SV|TH|TT|TW|UM|US|VE|VI|WS|YE|ZA|ZW)$/;
var SATURDAY_FIRST = /^(AF|BH|DJ|DZ|EG|IQ|IR|JO|KW|LY|OM|QA|SD|SY)$/;
function firstDayOfWeek(locale) {
  try {
    const l = new Intl.Locale(locale || new Intl.DateTimeFormat().resolvedOptions().locale);
    const info = typeof l.getWeekInfo === "function" ? l.getWeekInfo() : l.weekInfo;
    if (info && info.firstDay) return info.firstDay % 7;
    const region = l.region || (typeof l.maximize === "function" ? l.maximize().region : void 0);
    if (region) return SUNDAY_FIRST.test(region) ? 0 : SATURDAY_FIRST.test(region) ? 6 : region === "MV" ? 5 : 1;
  } catch {
  }
  return 0;
}
var numericFormats = /* @__PURE__ */ new Map();
function numeric(locale) {
  const key = locale || "";
  let f = numericFormats.get(key);
  if (!f) numericFormats.set(key, f = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit", calendar: "gregory", numberingSystem: "latn" }));
  return f;
}
function dateOrder(locale) {
  const parts = numeric(locale).formatToParts(new Date(2001, 10, 22));
  return parts.filter((p) => p.type === "day" || p.type === "month" || p.type === "year").map((p) => p.type);
}
function parseDate(text, locale) {
  const nums = latinDigits(text).trim().split(/[^0-9]+/).filter(Boolean);
  if (nums.length !== 3) return null;
  const own = dateOrder(locale);
  const order = /^\d{4}$/.test(nums[0]) && own[0] !== "year" ? ["year", "month", "day"] : own;
  const v = {};
  order.forEach((k, i) => {
    v[k] = Number(nums[i]);
  });
  if (v.year < 100) v.year += 2e3;
  const d = new Date(v.year, v.month - 1, v.day);
  return d.getFullYear() === v.year && d.getMonth() === v.month - 1 && d.getDate() === v.day ? d : null;
}
var formatDate = (d, locale) => numeric(locale).format(d);
function datePattern(locale) {
  const parts = numeric(locale).formatToParts(new Date(2001, 10, 22));
  return parts.map((p) => p.type === "day" ? "dd" : p.type === "month" ? "mm" : p.type === "year" ? "yyyy" : p.value).join("");
}
export {
  addDays,
  addMonths,
  compare,
  dateOrder,
  datePattern,
  day,
  firstDayOfWeek,
  formatDate,
  isValid,
  isoDate,
  parseDate,
  sameDay,
  sameMonth,
  startOfMonth,
  startOfWeek
};
//# sourceMappingURL=dates.js.map
