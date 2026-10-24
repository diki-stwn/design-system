"use client";

// src/components/Tooltip/Tooltip.tsx
import * as React from "react";
import { cn, domId, elementRef, setRef } from "../../internal/cn.js";
import { useAnchoredLayer } from "../../internal/useAnchoredLayer.js";
import { named } from "../../internal/component.js";
import { isComposing } from "../../internal/ime.js";
var Tooltip = /* @__PURE__ */ named("Tooltip", function Tooltip2(props) {
  const id = domId("dk-tip", React.useId());
  const [inner, setInner] = React.useState(false);
  const controlled = props.open !== void 0;
  const open = !props.disabled && (controlled ? !!props.open : inner);
  const tipRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  const timer = React.useRef(void 0);
  const onOpenChange = React.useRef(props.onOpenChange);
  onOpenChange.current = props.onOpenChange;
  const set = React.useCallback((v) => {
    window.clearTimeout(timer.current);
    if (!controlled) setInner(v);
    if (onOpenChange.current) onOpenChange.current(v);
  }, [controlled]);
  const later = (v, ms) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => set(v), ms);
  };
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  useAnchoredLayer(open, tipRef, anchorRef, { placement: props.placement, fallback: "top", offsetVar: "--dk-tooltip-offset", watch: props.content });
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => {
      if (e.key === "Escape" && !isComposing(e)) {
        e.preventDefault();
        e.stopPropagation();
        set(false);
      }
    };
    document.addEventListener("keydown", esc, true);
    return () => document.removeEventListener("keydown", esc, true);
  }, [open, set]);
  const child = React.Children.only(props.children);
  const cp = child.props;
  const delay = props.delay == null ? 400 : props.delay;
  const chain = (name, fn) => (e) => {
    const own = cp[name];
    if (typeof own === "function") own(e);
    fn(e);
  };
  const childRef = elementRef(child);
  const aria = props.role === "label" ? "aria-labelledby" : "aria-describedby";
  const merged = [cp[aria], id].filter(Boolean).join(" ");
  const trigger = React.cloneElement(child, {
    ref: (n) => {
      anchorRef.current = n;
      if (childRef) setRef(childRef, n);
    },
    [aria]: merged,
    onMouseEnter: chain("onMouseEnter", () => later(true, delay)),
    onMouseLeave: chain("onMouseLeave", () => later(false, 100)),
    onFocus: chain("onFocus", (e) => {
      const t = e.target;
      if (!t.matches || t.matches(":focus-visible")) set(true);
    }),
    onBlur: chain("onBlur", () => set(false)),
    onPointerDown: chain("onPointerDown", () => set(false))
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, trigger, /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: tipRef,
      id,
      role: "tooltip",
      ...{ popover: "manual" },
      hidden: !open || void 0,
      className: cn("dk-tooltip", props.className),
      style: props.style,
      "data-component": "tooltip",
      "data-state": open ? "open" : "closed",
      onMouseEnter: () => window.clearTimeout(timer.current),
      onMouseLeave: () => later(false, 100)
    },
    props.content
  ));
});
export {
  Tooltip
};
//# sourceMappingURL=Tooltip.js.map
