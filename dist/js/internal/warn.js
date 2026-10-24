// src/internal/warn.ts
var warned = {};
function warnOnce(key, msg) {
  if (!warned[key] && typeof console !== "undefined") {
    warned[key] = 1;
    console.warn(msg);
  }
}
export {
  warnOnce
};
//# sourceMappingURL=warn.js.map
