// src/components/Avatar/initials.ts
function initials(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const first = Array.from(words[0])[0] || "";
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] || "" : "";
  return (first + last).toUpperCase();
}
export {
  initials
};
//# sourceMappingURL=initials.js.map
