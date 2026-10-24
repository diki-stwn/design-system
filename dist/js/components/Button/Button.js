"use client";

// src/components/Button/Button.tsx
import * as React from "react";
import { cn, omit, oneOf, SIZES } from "../../internal/cn.js";
import { config } from "../../internal/config.js";
import { useSerupa } from "../../internal/provider.js";
import { announce, ensureAnnouncer } from "../../internal/announce.js";
import { block, both, chain, pressKey, releaseKey, ripple } from "../../internal/interactions.js";
import { warnOnce } from "../../internal/warn.js";
import { asIcon } from "../Icon/asIcon.js";
import { Loader } from "../Loader/Loader.js";
import { component } from "../../internal/component.js";
import { BUTTON_VARIANTS, buttonClass } from "./buttonClass.js";
var OWN = { variant: 1, size: 1, destructive: 1, className: 1, children: 1, leftIcon: 1, rightIcon: 1, icon: 1, loading: 1, loadingText: 1 };
function slot(source, side) {
  const node = asIcon(source);
  return node == null || node === false ? null : /* @__PURE__ */ React.createElement("span", { className: "dk-btn__icon dk-btn__icon--" + side, "aria-hidden": true, key: side }, node);
}
var ButtonBase = /* @__PURE__ */ component("Button", function Button(props, ref) {
  const sds = useSerupa();
  const rest = omit(props, OWN);
  const isLink = rest.href != null;
  const iconOnly = props.icon != null;
  const pos = props.leftIcon != null && props.rightIcon == null ? "left" : props.rightIcon != null && props.leftIcon == null ? "right" : void 0;
  const variant = oneOf(BUTTON_VARIANTS, props.variant, "primary");
  const size = oneOf(SIZES, props.size, "md");
  let classes = buttonClass({ variant, size, destructive: props.destructive, iconOnly, iconPosition: pos, className: props.className });
  if (iconOnly && !rest["aria-label"] && !rest["aria-labelledby"] && !rest.title) {
    warnOnce("icon-label", "Button: an icon-only button needs an aria-label.");
  }
  const loading = !!props.loading;
  const disabled = !!rest.disabled;
  const loadingText = props.loadingText == null ? sds.labels.loading : props.loadingText;
  React.useEffect(function() {
    ensureAnnouncer();
  }, []);
  const wasLoading = React.useRef(false);
  const latestText = React.useRef(loadingText);
  React.useEffect(function() {
    latestText.current = loadingText;
  });
  React.useEffect(function() {
    if (loading && !wasLoading.current && latestText.current) announce(latestText.current);
    wasLoading.current = loading;
  }, [loading]);
  const spin = /* @__PURE__ */ React.createElement(Loader, { className: "dk-btn__spinner", label: "", delay: 0 });
  let content = iconOnly ? [slot(props.icon, "only")] : [
    slot(props.leftIcon, "left"),
    props.children == null || props.children === false ? null : /* @__PURE__ */ React.createElement("span", { className: "dk-btn__label", key: "label" }, props.children),
    slot(props.rightIcon, "right")
  ];
  if (loading) content = content.concat([/* @__PURE__ */ React.createElement("span", { className: "dk-btn__loader", "aria-hidden": true, key: "loader" }, spin)]);
  if (variant !== "link") content = [/* @__PURE__ */ React.createElement("span", { className: "dk-btn__ripples", "aria-hidden": true, key: "ripples" }), ...content];
  rest.onPointerDown = chain(rest.onPointerDown, ripple);
  rest.onKeyDown = chain(rest.onKeyDown, pressKey);
  rest.onKeyUp = both(rest.onKeyUp, releaseKey);
  rest.onBlur = both(rest.onBlur, releaseKey);
  rest["data-component"] = "button";
  rest["data-variant"] = variant;
  rest["data-size"] = size;
  if (props.destructive) rest["data-destructive"] = "";
  if (iconOnly) rest["data-icon-only"] = "";
  if (disabled) rest["data-disabled"] = "";
  if (loading) {
    classes = cn(classes, "dk-btn--loading", "dk-btn--loading-cover");
    rest["aria-busy"] = true;
    rest["aria-disabled"] = true;
    rest["data-loading"] = "";
    rest.onClick = block;
  }
  if (isLink) {
    if (rest.target === "_blank" && rest.rel == null) rest.rel = "noopener noreferrer";
    if (disabled) {
      delete rest.href;
      delete rest.disabled;
      rest.role = "link";
      rest["aria-disabled"] = true;
      rest.onClick = block;
    }
    delete rest.type;
    return React.createElement(disabled ? "a" : config.link, Object.assign({}, rest, { ref, className: classes }), ...content);
  }
  if (rest.type === void 0) rest.type = "button";
  return React.createElement("button", Object.assign({}, rest, { ref, className: classes }), ...content);
});
var Button2 = ButtonBase;
export {
  Button2 as Button,
  ButtonBase,
  buttonClass
};
//# sourceMappingURL=Button.js.map
