"use client";

// src/components/Switch/Switch.tsx
import * as React from "react";
import { cn, domId, isInvalid, oneOf, omit, SIZES } from "../../internal/cn.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
var OWN = { size: 1, invalid: 1, description: 1, labelPosition: 1, children: 1, className: 1, style: 1, type: 1, role: 1 };
var Switch = /* @__PURE__ */ component("Switch", function Switch2(props, ref) {
  props = useFieldControl(props);
  const rest = omit(props, OWN);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const readOnly = !!rest.readOnly;
  if (readOnly) {
    rest["aria-readonly"] = true;
    delete rest.onChange;
    const onClick = rest.onClick;
    rest.onClick = (e) => {
      if (onClick) onClick(e);
      e.preventDefault();
    };
  }
  const base = domId("dk-sw", React.useId()), labelId = base + "-label", descId = base + "-desc";
  const hasLabel = props.children != null && props.children !== false && props.children !== "";
  const hasDesc = props.description != null && props.description !== false && props.description !== "";
  if (hasDesc) rest["aria-describedby"] = cn(rest["aria-describedby"], descId);
  if (hasDesc && hasLabel && rest["aria-label"] == null && rest["aria-labelledby"] == null) rest["aria-labelledby"] = labelId;
  return /* @__PURE__ */ React.createElement("label", { className: cn("dk-switch", "dk-switch--size-" + size, props.labelPosition === "start" && "dk-switch--label-start", invalid && "dk-switch--invalid", rest.disabled && "dk-switch--disabled", readOnly && "dk-switch--readonly", !hasLabel && !hasDesc && "dk-switch--bare", props.className), style: props.style, "data-component": "switch", "data-size": size }, /* @__PURE__ */ React.createElement("span", { className: "dk-switch__control", key: "control" }, /* @__PURE__ */ React.createElement("input", { ...rest, ref, type: "checkbox", role: "switch", className: "dk-switch__input", key: "input" }), /* @__PURE__ */ React.createElement("span", { className: "dk-switch__thumb", "aria-hidden": true, key: "thumb" })), hasLabel || hasDesc ? /* @__PURE__ */ React.createElement("span", { className: "dk-switch__text", key: "text" }, hasLabel ? /* @__PURE__ */ React.createElement("span", { className: "dk-switch__label", id: labelId, key: "label" }, props.children) : null, hasDesc ? /* @__PURE__ */ React.createElement("span", { className: "dk-switch__description", id: descId, key: "desc" }, props.description) : null) : null);
});
export {
  Switch
};
//# sourceMappingURL=Switch.js.map
