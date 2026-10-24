// src/components/Link/Link.tsx
import * as React from "react";
import { cn, oneOf, omit } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import { component } from "../../internal/component.js";
import { AutoFocusLink } from "./AutoFocusLink.js";
import * as icons from "../../material/builtin.js";
var Link = /* @__PURE__ */ component("Link", function Link2(props, ref) {
  const rest = omit(props, { tone: 1, underline: 1, external: 1, as: 1, className: 1, children: 1, autoFocus: 1 });
  const tone = oneOf(["primary", "neutral"], props.tone, "primary");
  const underline = oneOf(["always", "hover"], props.underline, "always");
  if (props.external) {
    if (rest.target == null) rest.target = "_blank";
    rest.rel = cn(rest.rel, "noopener noreferrer");
  }
  const attrs = Object.assign(rest, {
    "data-component": "link",
    className: cn("dk-link", tone === "neutral" && "dk-link--neutral", underline === "hover" && "dk-link--hover-underline", props.className)
  });
  const children = /* @__PURE__ */ React.createElement(React.Fragment, null, props.children, props.external ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon, { icon: icons.OpenInNew, className: "dk-link__icon" }), /* @__PURE__ */ React.createElement(VisuallyHidden, null, " (opens in a new tab)")) : null);
  if (props.autoFocus) return /* @__PURE__ */ React.createElement(AutoFocusLink, { as: props.as || "a", linkRef: ref, attrs }, children);
  return React.createElement(props.as || "a", Object.assign(attrs, { ref }), children);
});
export {
  Link
};
//# sourceMappingURL=Link.js.map
