"use client";

// src/components/Sidebar/Sidebar.tsx
import * as React from "react";
import { cn, domId, omit } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { asIcon } from "../Icon/asIcon.js";
import { Tooltip } from "../Tooltip/Tooltip.js";
import { Menu, MenuItem } from "../Menu/Menu.js";
import { component } from "../../internal/component.js";
import { flattenChildren } from "../../internal/children.js";
import { useSerupa } from "../../internal/provider.js";
import * as icons from "../../material/builtin.js";
var SidebarContext = /* @__PURE__ */ React.createContext({ collapsed: false, depth: 0 });
function isSection(c) {
  return React.isValidElement(c) && c.type === SidebarSection;
}
var Sidebar = /* @__PURE__ */ component("Sidebar", function Sidebar2(props, ref) {
  const sds = useSerupa();
  const rest = omit(props, { header: 1, footer: 1, collapsed: 1, className: 1, children: 1, "aria-label": 1 });
  const collapsed = !!props.collapsed;
  const body = [];
  let run = [];
  const flush = () => {
    if (run.length) {
      body.push(/* @__PURE__ */ React.createElement("ul", { key: "l" + body.length, className: "dk-sidebar__list" }, run));
      run = [];
    }
  };
  flattenChildren(props.children).forEach((c) => {
    if (isSection(c)) {
      flush();
      body.push(c);
    } else run.push(c);
  });
  flush();
  return /* @__PURE__ */ React.createElement(SidebarContext.Provider, { value: { collapsed, depth: 0 } }, /* @__PURE__ */ React.createElement(
    "nav",
    {
      ...rest,
      "aria-label": props["aria-label"] || sds.labels.mainNavigation,
      ref,
      "data-component": "sidebar",
      "data-collapsed": collapsed ? "" : void 0,
      className: cn("dk-sidebar", collapsed && "dk-sidebar--collapsed", props.className)
    },
    props.header != null ? /* @__PURE__ */ React.createElement("div", { className: "dk-sidebar__header" }, props.header) : null,
    /* @__PURE__ */ React.createElement("div", { className: "dk-sidebar__body" }, body),
    props.footer != null ? /* @__PURE__ */ React.createElement("div", { className: "dk-sidebar__footer" }, props.footer) : null
  ));
});
var SidebarSection = /* @__PURE__ */ component("SidebarSection", function SidebarSection2(props, ref) {
  const rest = omit(props, { title: 1, className: 1, children: 1 });
  const id = domId("dk-sbs", React.useId());
  const titled = props.title != null && props.title !== false && props.title !== "";
  return /* @__PURE__ */ React.createElement("div", { ...rest, ref, className: cn("dk-sidebar__section", props.className) }, titled ? /* @__PURE__ */ React.createElement("div", { id, className: "dk-sidebar__section-title" }, props.title) : null, /* @__PURE__ */ React.createElement("ul", { className: "dk-sidebar__list", "aria-labelledby": titled ? id : void 0 }, props.children));
});
var SidebarItem = /* @__PURE__ */ component("SidebarItem", function SidebarItem2(props, ref) {
  const ctx = React.useContext(SidebarContext);
  const rest = omit(props, { label: 1, icon: 1, active: 1, badge: 1, children: 1, defaultOpen: 1, as: 1, className: 1 });
  const kids = flattenChildren(props.children).filter(React.isValidElement);
  const group = kids.length > 0;
  const childActive = kids.some((k) => k.props.active);
  const [open, setOpen] = React.useState(props.defaultOpen != null ? !!props.defaultOpen : childActive);
  const listId = domId("dk-sbi", React.useId());
  const rail = ctx.collapsed && ctx.depth === 0;
  const inner = (chevron) => /* @__PURE__ */ React.createElement(React.Fragment, null, props.icon ? /* @__PURE__ */ React.createElement("span", { className: "dk-sidebar__icon" }, asIcon(props.icon)) : null, /* @__PURE__ */ React.createElement("span", { className: "dk-sidebar__label" }, props.label), props.badge != null && !rail ? /* @__PURE__ */ React.createElement("span", { className: "dk-sidebar__badge" }, props.badge) : null, chevron && !rail ? /* @__PURE__ */ React.createElement(Icon, { icon: icons.ExpandMore, className: "dk-sidebar__chevron" }) : null);
  const btnProps = omit(rest, { href: 1, target: 1, rel: 1, download: 1, hrefLang: 1, ping: 1, referrerPolicy: 1, type: 1, onClick: 1 });
  const cls = cn("dk-sidebar__item", ctx.depth > 0 && "dk-sidebar__item--nested", (props.active || group && childActive) && "dk-sidebar__item--active", props.className);
  if (group && rail) {
    return /* @__PURE__ */ React.createElement("li", { className: "dk-sidebar__li" }, /* @__PURE__ */ React.createElement(Menu, { placement: "right-start", trigger: /* @__PURE__ */ React.createElement("button", { type: "button", ...btnProps, className: cls }, inner(false)) }, kids.map((k, i) => /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        key: k.key != null ? k.key : i,
        href: k.props.href,
        icon: k.props.icon,
        onSelect: k.props.onClick
      },
      k.props.label
    ))));
  }
  if (group) {
    return /* @__PURE__ */ React.createElement("li", { className: "dk-sidebar__li", "data-state": open ? "open" : "closed" }, /* @__PURE__ */ React.createElement("button", { type: "button", ...btnProps, className: cls, "aria-expanded": open, "aria-controls": listId, onClick: (e) => {
      if (props.onClick) props.onClick(e);
      setOpen(!open);
    } }, inner(true)), /* @__PURE__ */ React.createElement(SidebarContext.Provider, { value: { collapsed: ctx.collapsed, depth: ctx.depth + 1 } }, /* @__PURE__ */ React.createElement("ul", { id: listId, className: "dk-sidebar__list dk-sidebar__list--nested", hidden: !open }, kids)));
  }
  const link = React.createElement(props.as || "a", Object.assign(rest, { ref, className: cls, "aria-current": props.active ? "page" : void 0 }), inner(false));
  return /* @__PURE__ */ React.createElement("li", { className: "dk-sidebar__li" }, rail && typeof props.label === "string" ? /* @__PURE__ */ React.createElement(Tooltip, { content: props.label, placement: "right", role: "label" }, link) : link);
});
export {
  Sidebar,
  SidebarItem,
  SidebarSection
};
//# sourceMappingURL=Sidebar.js.map
