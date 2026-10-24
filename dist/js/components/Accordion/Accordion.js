"use client";

// src/components/Accordion/Accordion.tsx
import * as React from "react";
import { cn, domId, oneOf, omit } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { component } from "../../internal/component.js";
import { flattenChildren } from "../../internal/children.js";
import * as icons from "../../material/builtin.js";
var AccordionContext = /* @__PURE__ */ React.createContext(null);
var Accordion = /* @__PURE__ */ component("Accordion", function Accordion2(props, ref) {
  const rest = omit(props, { type: 1, value: 1, defaultValue: 1, onValueChange: 1, collapsible: 1, variant: 1, headingLevel: 1, className: 1, children: 1, onKeyDown: 1 });
  const single = props.type !== "multiple";
  const controlled = props.value !== void 0;
  const [inner, setInner] = React.useState(() => (props.defaultValue || []).slice(0, single ? 1 : void 0));
  const open = controlled ? props.value : inner;
  const collapsible = props.collapsible !== false;
  const onChange = React.useRef(props.onValueChange);
  onChange.current = props.onValueChange;
  const toggle = React.useCallback((v) => {
    const isOpen = open.indexOf(v) >= 0;
    let next;
    if (single) next = isOpen ? collapsible ? [] : open : [v];
    else next = isOpen ? open.filter((x) => x !== v) : open.concat(v);
    if (next === open) return;
    if (!controlled) setInner(next);
    if (onChange.current) onChange.current(next);
  }, [open, single, collapsible, controlled]);
  const level = [2, 3, 4, 5, 6].indexOf(props.headingLevel) >= 0 ? props.headingLevel : 3;
  const variant = oneOf(["plain", "card"], props.variant, "plain");
  function onKeyDown(e) {
    if (props.onKeyDown) props.onKeyDown(e);
    const t = e.target;
    if (e.defaultPrevented || !t.classList.contains("dk-accordion__trigger") || t.closest(".dk-accordion") !== e.currentTarget) return;
    const all = Array.from(e.currentTarget.querySelectorAll(".dk-accordion__trigger")).filter((b) => b.closest(".dk-accordion") === e.currentTarget && !b.disabled);
    const i = all.indexOf(t);
    const to = e.key === "ArrowDown" ? all[(i + 1) % all.length] : e.key === "ArrowUp" ? all[(i - 1 + all.length) % all.length] : e.key === "Home" ? all[0] : e.key === "End" ? all[all.length - 1] : null;
    if (to) {
      e.preventDefault();
      to.focus();
    }
  }
  let n = 0;
  const items = flattenChildren(props.children).map((c) => React.isValidElement(c) ? React.cloneElement(c, { "data-index": String(n++) }) : c);
  return /* @__PURE__ */ React.createElement(AccordionContext.Provider, { value: { open, toggle, level, collapsible, single } }, /* @__PURE__ */ React.createElement("div", { ...rest, ref, onKeyDown, "data-component": "accordion", className: cn("dk-accordion", variant === "card" && "dk-accordion--card", props.className) }, items));
});
var AccordionItem = /* @__PURE__ */ component("AccordionItem", function AccordionItem2(props, ref) {
  const ctx = React.useContext(AccordionContext);
  const rest = omit(props, { value: 1, title: 1, disabled: 1, className: 1, children: 1 });
  const index = String(rest["data-index"] || "0");
  delete rest["data-index"];
  const value = props.value != null ? props.value : index;
  const open = !!ctx && ctx.open.indexOf(value) >= 0;
  const id = domId("dk-acc", React.useId());
  const locked = !!ctx && open && ctx.single && !ctx.collapsible;
  const H = "h" + (ctx ? ctx.level : 3);
  return /* @__PURE__ */ React.createElement("div", { ...rest, ref, "data-state": open ? "open" : "closed", className: cn("dk-accordion__item", open && "dk-accordion__item--open", props.disabled && "dk-accordion__item--disabled", props.className) }, /* @__PURE__ */ React.createElement(H, { className: "dk-accordion__heading" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      id: id + "-t",
      className: "dk-accordion__trigger",
      "aria-expanded": open,
      "aria-controls": id + "-p",
      disabled: props.disabled,
      "aria-disabled": locked ? true : void 0,
      onClick: () => {
        if (ctx && !locked) ctx.toggle(value);
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "dk-accordion__title" }, props.title),
    /* @__PURE__ */ React.createElement(Icon, { icon: icons.ExpandMore, className: "dk-accordion__icon" })
  )), /* @__PURE__ */ React.createElement("div", { id: id + "-p", role: "region", "aria-labelledby": id + "-t", className: "dk-accordion__panel" }, /* @__PURE__ */ React.createElement("div", { className: "dk-accordion__clip" }, /* @__PURE__ */ React.createElement("div", { className: "dk-accordion__content" }, props.children))));
});
export {
  Accordion,
  AccordionItem
};
//# sourceMappingURL=Accordion.js.map
