// src/internal/digits.ts
function latinDigits(text) {
  return text.replace(/\p{Nd}/gu, (c) => {
    const cp = c.codePointAt(0);
    if (cp < 128) return c;
    let zero = cp;
    while (/\p{Nd}/u.test(String.fromCodePoint(zero - 1))) zero--;
    return String((cp - zero) % 10);
  });
}
export {
  latinDigits
};
//# sourceMappingURL=digits.js.map
