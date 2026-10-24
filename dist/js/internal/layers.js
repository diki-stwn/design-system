// src/internal/layers.ts
var modals = [];
var listeners = /* @__PURE__ */ new Set();
var topModal = () => modals[modals.length - 1] || null;
function onModalChange(fn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
function modalOpening() {
  if (modals.length || typeof document === "undefined") return;
  const root = document.documentElement;
  if (window.innerWidth - root.clientWidth > 0) root.setAttribute("data-dk-gutter", "");
  else root.removeAttribute("data-dk-gutter");
}
function modalOpened(el) {
  const at = modals.indexOf(el);
  if (at >= 0) modals.splice(at, 1);
  modals.push(el);
  listeners.forEach((l) => l());
}
function modalClosed(el) {
  const at = modals.indexOf(el);
  if (at < 0) return;
  modals.splice(at, 1);
  listeners.forEach((l) => l());
}
export {
  modalClosed,
  modalOpened,
  modalOpening,
  onModalChange,
  topModal
};
//# sourceMappingURL=layers.js.map
