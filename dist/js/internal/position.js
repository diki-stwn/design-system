// src/internal/position.ts
var OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };
function parsePlacement(p, fallback) {
  const m = /^(top|bottom|left|right)(?:-(start|end))?$/.exec(p || "") || /^(top|bottom|left|right)(?:-(start|end))?$/.exec(fallback);
  return [m[1], m[2] || "center"];
}
function place(anchor, floating, placement, offset, fallback = "top", margin = 8) {
  const vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
  const parsed = parsePlacement(placement, fallback), align = parsed[1];
  let side = parsed[0];
  const rtl = getComputedStyle(document.documentElement).direction === "rtl";
  const space = (s) => s === "top" ? anchor.top - offset - margin : s === "bottom" ? vh - margin - anchor.bottom - offset : s === "left" ? anchor.left - offset - margin : vw - margin - anchor.right - offset;
  const need = (s) => s === "top" || s === "bottom" ? floating.height : floating.width;
  const other = OPPOSITE[side];
  if (space(side) < need(side) && (space(other) >= need(other) || space(other) > space(side))) side = other;
  let x, y, height = floating.height, maxHeight;
  if (side === "top" || side === "bottom") {
    if (height > space(side)) height = maxHeight = Math.max(0, Math.floor(space(side)));
    y = side === "top" ? anchor.top - offset - height : anchor.bottom + offset;
    const start = rtl ? anchor.right - floating.width : anchor.left, end = rtl ? anchor.left : anchor.right - floating.width;
    x = align === "start" ? start : align === "end" ? end : anchor.left + (anchor.width - floating.width) / 2;
    x = Math.min(Math.max(x, margin), Math.max(margin, vw - margin - floating.width));
  } else {
    if (height > vh - 2 * margin) height = maxHeight = Math.max(0, Math.floor(vh - 2 * margin));
    x = side === "left" ? anchor.left - offset - floating.width : anchor.right + offset;
    y = align === "start" ? anchor.top : align === "end" ? anchor.bottom - height : anchor.top + (anchor.height - height) / 2;
    y = Math.min(Math.max(y, margin), Math.max(margin, vh - margin - height));
  }
  return maxHeight === void 0 ? { x: Math.round(x), y: Math.round(y), side } : { x: Math.round(x), y: Math.round(y), side, maxHeight };
}
function placeLayer(layer, anchor, placement, offset, fallback) {
  const scroll = layer.scrollTop;
  layer.style.maxHeight = "";
  layer.style.overflowY = "";
  const r = place(anchor.getBoundingClientRect(), { width: layer.offsetWidth, height: layer.offsetHeight }, placement, offset, fallback);
  layer.style.left = r.x + "px";
  layer.style.top = r.y + "px";
  layer.dataset.side = r.side;
  if (r.maxHeight !== void 0) {
    layer.style.maxHeight = r.maxHeight + "px";
    layer.style.overflowY = "auto";
  }
  layer.scrollTop = scroll;
}
function showLayer(el) {
  if (!el) return;
  if (typeof el.showPopover === "function" && el.hasAttribute("popover")) {
    try {
      if (!el.matches(":popover-open")) el.showPopover();
    } catch {
    }
  }
}
function hideLayer(el) {
  if (!el) return;
  if (typeof el.hidePopover === "function" && el.hasAttribute("popover")) {
    try {
      if (el.matches(":popover-open")) el.hidePopover();
    } catch {
    }
  }
}
function cssLength(el, prop) {
  const v = getComputedStyle(el).getPropertyValue(prop).trim(), n = parseFloat(v);
  if (isNaN(n)) return 0;
  if (/rem$/.test(v)) return n * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  if (/em$/.test(v)) return n * (parseFloat(getComputedStyle(el).fontSize) || 16);
  return n;
}
export {
  cssLength,
  hideLayer,
  parsePlacement,
  place,
  placeLayer,
  showLayer
};
//# sourceMappingURL=position.js.map
