// src/internal/useAnchoredLayer.ts
import * as React from "react";
import { useIsoLayoutEffect } from "./cn.js";
import { cssLength, hideLayer, placeLayer, showLayer } from "./position.js";
function useAnchoredLayer(open, layer, anchor, opts) {
  const { placement, fallback = "bottom", offsetVar, inside, matchWidth, watch } = opts;
  const outside = React.useRef(opts.onOutside);
  useIsoLayoutEffect(() => {
    outside.current = opts.onOutside;
  });
  useIsoLayoutEffect(() => {
    const p = layer.current, a = anchor.current;
    if (!p) return;
    if (!open || !a) {
      hideLayer(p);
      return;
    }
    showLayer(p);
    const update = () => {
      if (matchWidth) p.style.minWidth = a.offsetWidth + "px";
      placeLayer(p, a, placement, cssLength(p, offsetVar), fallback);
    };
    const scrolled = (e) => {
      if (!(e.target instanceof Node && p.contains(e.target))) update();
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(p);
      ro.observe(a);
    }
    window.addEventListener("scroll", scrolled, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", scrolled, true);
      window.removeEventListener("resize", update);
    };
  }, [open, layer, anchor, placement, fallback, offsetVar, matchWidth, watch]);
  React.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      for (const r of [layer, inside]) if (r && r.current && r.current.contains(t)) return;
      if (outside.current) outside.current();
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open, layer, inside]);
}
export {
  useAnchoredLayer
};
//# sourceMappingURL=useAnchoredLayer.js.map
