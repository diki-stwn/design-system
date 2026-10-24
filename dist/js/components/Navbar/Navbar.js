"use client";

// src/components/Navbar/Navbar.tsx
import * as React from "react";
import { cn, domId, oneOf, omit } from "../../internal/cn.js";
import { IconButton } from "../IconButton/IconButton.js";
import { component } from "../../internal/component.js";
import { isComposing } from "../../internal/ime.js";
import { flattenChildren } from "../../internal/children.js";
import { useSerupa } from "../../internal/provider.js";
import * as icons from "../../material/builtin.js";
var NavbarContext = /* @__PURE__ */ React.createContext(null);
var Navbar = /* @__PURE__ */ component("Navbar", function Navbar2(props, ref) {
  const sds = useSerupa();
  const rest = omit(props, { brand: 1, children: 1, actions: 1, sticky: 1, size: 1, menuLabel: 1, className: 1, "aria-label": 1, onKeyDown: 1, onBlur: 1 });
  const [open, setOpen] = React.useState(false);
  const toggle = React.useRef(null);
  const id = domId("dk-nav", React.useId());
  const size = oneOf(["prose", "md", "lg", "xl", "2xl", "full"], props.size, "xl");
  const links = flattenChildren(props.children);
  const hasLinks = links.length > 0;
  const close = React.useCallback(() => setOpen(false), []);
  React.useEffect(() => {
    if (!open || typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [open]);
  function onKeyDown(e) {
    if (props.onKeyDown) props.onKeyDown(e);
    if (!e.defaultPrevented && e.key === "Escape" && open && !isComposing(e)) {
      e.preventDefault();
      setOpen(false);
      if (toggle.current) toggle.current.focus();
    }
  }
  function onBlur(e) {
    if (props.onBlur) props.onBlur(e);
    if (open && e.relatedTarget instanceof Node && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  }
  const nav = hasLinks ? /* @__PURE__ */ React.createElement("nav", { id, "aria-label": props["aria-label"] || sds.labels.mainNavigation, className: "dk-navbar__nav" }, /* @__PURE__ */ React.createElement("ul", { className: "dk-navbar__links" }, links.map((c, i) => /* @__PURE__ */ React.createElement("li", { key: React.isValidElement(c) && c.key != null ? c.key : i }, c)))) : null;
  return /* @__PURE__ */ React.createElement(NavbarContext.Provider, { value: { close } }, /* @__PURE__ */ React.createElement("header", { ...rest, ref, onKeyDown, onBlur, "data-component": "navbar", "data-state": open ? "open" : "closed", className: cn("dk-navbar", props.sticky && "dk-navbar--sticky", props.className) }, /* @__PURE__ */ React.createElement("div", { className: cn("dk-navbar__inner dk-container dk-container--padded", "dk-container--" + size) }, props.brand != null ? /* @__PURE__ */ React.createElement("div", { className: "dk-navbar__brand" }, props.brand) : null, open ? null : nav, props.actions != null ? /* @__PURE__ */ React.createElement("div", { className: "dk-navbar__actions" }, props.actions) : null, hasLinks ? /* @__PURE__ */ React.createElement(
    IconButton,
    {
      ref: toggle,
      className: "dk-navbar__toggle",
      icon: open ? icons.Close : icons.Menu,
      label: props.menuLabel || sds.labels.menu,
      noTitle: true,
      "aria-expanded": open,
      "aria-controls": id,
      onClick: () => setOpen(!open)
    }
  ) : null, open ? nav : null)));
});
var NavbarLink = /* @__PURE__ */ component("NavbarLink", function NavbarLink2(props, ref) {
  const ctx = React.useContext(NavbarContext);
  const rest = omit(props, { active: 1, as: 1, className: 1, onClick: 1 });
  return React.createElement(props.as || "a", Object.assign(rest, {
    ref,
    "aria-current": props.active ? "page" : void 0,
    className: cn("dk-navbar__link", props.active && "dk-navbar__link--active", props.className),
    onClick: (e) => {
      if (props.onClick) props.onClick(e);
      if (ctx) ctx.close();
    }
  }));
});
export {
  Navbar,
  NavbarLink
};
//# sourceMappingURL=Navbar.js.map
