"use client";

// src/components/Breadcrumb/Breadcrumb.tsx
import * as React from "react";
import { cn, oneOf, omit } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { asIcon } from "../Icon/asIcon.js";
import { component } from "../../internal/component.js";
import { flattenChildren } from "../../internal/children.js";
import { useSerupa } from "../../internal/provider.js";
import * as icons from "../../material/builtin.js";
var BreadcrumbItem = /* @__PURE__ */ component("BreadcrumbItem", function BreadcrumbItem2(props, ref) {
  const rest = omit(props, { icon: 1, as: 1, current: 1, className: 1, children: 1 });
  const content = /* @__PURE__ */ React.createElement(React.Fragment, null, props.icon ? /* @__PURE__ */ React.createElement("span", { className: "dk-breadcrumb__icon" }, asIcon(props.icon)) : null, props.children);
  if (props.current) {
    delete rest.href;
    return /* @__PURE__ */ React.createElement("span", { ...rest, ref, "aria-current": "page", className: cn("dk-breadcrumb__item dk-breadcrumb__item--current", props.className) }, content);
  }
  return React.createElement(props.as || "a", Object.assign(rest, { ref, className: cn("dk-breadcrumb__item dk-breadcrumb__link", props.className) }), content);
});
var Breadcrumb = /* @__PURE__ */ component("Breadcrumb", function Breadcrumb2(props, ref) {
  const sds = useSerupa();
  const rest = omit(props, { separator: 1, maxItems: 1, expandLabel: 1, className: 1, children: 1 });
  const separator = oneOf(["chevron", "slash"], props.separator, "chevron");
  const [expanded, setExpanded] = React.useState(false);
  const firstHidden = React.useRef(null);
  const focusAfter = React.useRef(false);
  const items = flattenChildren(props.children).filter(React.isValidElement);
  const max = typeof props.maxItems === "number" && props.maxItems >= 2 ? Math.floor(props.maxItems) : 0;
  const collapse = !expanded && max > 0 && items.length > max;
  const shown = items.map((el, i) => ({ el, i })).filter(({ i }) => !collapse || i === 0 || i >= items.length - (max - 1));
  React.useEffect(() => {
    if (expanded && focusAfter.current && firstHidden.current) {
      focusAfter.current = false;
      const a = firstHidden.current.querySelector("a, [tabindex], button");
      if (a) a.focus();
    }
  }, [expanded]);
  const sep = (key) => /* @__PURE__ */ React.createElement("li", { key, className: "dk-breadcrumb__separator", "aria-hidden": "true" }, separator === "slash" ? "/" : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon, { icon: icons.ChevronRight, className: "dk-breadcrumb__ltr" }), /* @__PURE__ */ React.createElement(Icon, { icon: icons.ChevronLeft, className: "dk-breadcrumb__rtl" })));
  const out = [];
  shown.forEach(({ el, i }, n) => {
    if (n > 0) out.push(sep("s" + i));
    if (collapse && n === 1) {
      out.push(/* @__PURE__ */ React.createElement("li", { key: "more", className: "dk-breadcrumb__li" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: "dk-breadcrumb__item dk-breadcrumb__more",
          "aria-label": props.expandLabel || sds.labels.showHiddenPages,
          onClick: () => {
            focusAfter.current = true;
            setExpanded(true);
          }
        },
        "\u2026"
      )), sep("s-more"));
    }
    const last = i === items.length - 1;
    out.push(/* @__PURE__ */ React.createElement("li", { key: el.key != null ? el.key : i, className: "dk-breadcrumb__li", ref: expanded && max > 0 && i === 1 ? firstHidden : void 0 }, React.cloneElement(el, { current: last || el.props.current })));
  });
  return /* @__PURE__ */ React.createElement("nav", { "aria-label": sds.labels.breadcrumb, ...rest, ref, "data-component": "breadcrumb", className: cn("dk-breadcrumb", props.className) }, /* @__PURE__ */ React.createElement("ol", { className: "dk-breadcrumb__list" }, out));
});
export {
  Breadcrumb,
  BreadcrumbItem
};
//# sourceMappingURL=Breadcrumb.js.map
