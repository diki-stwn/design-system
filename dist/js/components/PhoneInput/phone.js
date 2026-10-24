// src/components/PhoneInput/phone.ts
var ROWS = "US 1 - (###)_###-#### 10 10|CA 1 - (###)_###-#### 10 10|GB 44 0 ####_###### 10 10|IE 353 0 ##_###_#### 9 9|AU 61 0 ###_###_### 9 9|NZ 64 0 ##_###_#### 8 10|DE 49 0 ###_######## 6 11|FR 33 0 #_##_##_##_## 9 9|ES 34 - ###_##_##_## 9 9|IT 39 - ###_###_#### 6 11|NL 31 0 #_######## 9 9|BE 32 0 ###_##_##_## 8 9|CH 41 0 ##_###_##_## 9 9|AT 43 0 ###_####### 4 13|SE 46 0 ##-###_##_## 7 10|NO 47 - ###_##_### 8 8|DK 45 - ##_##_##_## 8 8|FI 358 0 ##_###_#### 5 12|PL 48 - ###_###_### 9 9|PT 351 - ###_###_### 9 9|GR 30 - ###_###_#### 10 10|TR 90 0 ###_###_##_## 10 10|RU 7 8 ###_###-##-## 10 10|UA 380 0 ##_###_##_## 9 9|IL 972 0 ##-###-#### 8 9|SA 966 0 ##_###_#### 9 9|AE 971 0 ##_###_#### 8 9|EG 20 0 ###_###_#### 9 10|NG 234 0 ###_###_#### 10 10|KE 254 0 ###_###### 9 9|ZA 27 0 ##_###_#### 9 9|IN 91 0 #####_##### 10 10|PK 92 0 ###_####### 10 10|BD 880 0 ####-###### 10 10|CN 86 0 ###_####_#### 11 11|HK 852 - ####_#### 8 8|TW 886 0 ###_###_### 9 9|JP 81 0 ##-####-#### 9 10|KR 82 0 ##-####-#### 9 10|SG 65 - ####_#### 8 8|MY 60 0 ##-###_#### 9 10|ID 62 0 ###-####-#### 9 12|PH 63 0 ###_###_#### 10 10|TH 66 0 ##_###_#### 8 9|VN 84 0 ###_###_### 9 10|MX 52 - ##_####_#### 10 10|BR 55 0 ##_#####-#### 10 11|AR 54 0 ##_####-#### 10 10|CL 56 - #_####_#### 9 9|CO 57 - ###_####### 10 10|PE 51 - ###_###_### 9 9";
var PHONE_COUNTRIES = ROWS.split("|").map(function(row) {
  const [code, dial, trunk, pattern, min, max] = row.split(" ");
  return { code, dial, trunk: trunk === "-" ? "" : trunk, pattern: pattern.replace(/_/g, " "), min: +min, max: +max };
});
var BY_CODE = new Map(PHONE_COUNTRIES.map((c) => [c.code, c]));
var phoneCountry = (code) => code ? BY_CODE.get(code.toUpperCase()) : void 0;
function formatNational(digits, country) {
  let out = "", i = 0;
  for (const ch of country.pattern) {
    if (i >= digits.length) break;
    out += ch === "#" ? digits[i++] : ch;
  }
  return out + digits.slice(i);
}
function parsePhone(value, prefer) {
  const digits = value.trim().replace(/^00/, "+").replace(/[^\d+]/g, "");
  if (digits[0] !== "+") return void 0;
  const rest = digits.slice(1).replace(/\D/g, "");
  let best;
  for (const c of PHONE_COUNTRIES) {
    if (!rest.startsWith(c.dial)) continue;
    if (!best || c.dial.length > best.dial.length || c.dial === best.dial && c.code === prefer?.toUpperCase()) best = c;
  }
  if (!best) return void 0;
  return { country: best, national: stripTrunk(rest.slice(best.dial.length), best) };
}
function stripTrunk(digits, country) {
  return country.trunk && digits.startsWith(country.trunk) ? digits.slice(country.trunk.length) : digits;
}
var toE164 = (national, country) => national ? "+" + country.dial + national : "";
var isPhoneComplete = (national, country) => national.length >= country.min && national.length <= country.max;
function formatPhone(e164, prefer) {
  const p = parsePhone(e164, prefer);
  return p ? "+" + p.country.dial + " " + formatNational(p.national, p.country) : e164;
}
export {
  PHONE_COUNTRIES,
  formatNational,
  formatPhone,
  isPhoneComplete,
  parsePhone,
  phoneCountry,
  stripTrunk,
  toE164
};
//# sourceMappingURL=phone.js.map
