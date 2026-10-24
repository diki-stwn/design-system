"use client";

// src/components/Checkbox/Checkbox.tsx
import * as React from "react";
import { cn, domId, isInvalid, oneOf, omit, setRef, SIZES, useIsoLayoutEffect } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
import * as icons from "../../material/builtin.js";
var OWN = { size: 1, invalid: 1, indeterminate: 1, description: 1, children: 1, className: 1, style: 1, type: 1 };
var Checkbox = /* @__PURE__ */ component("Checkbox", function Checkbox2(props, ref) {
  props = useFieldControl(props);
  const rest = omit(props, OWN);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const mixed = !!props.indeterminate;
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
  const own = React.useRef(null);
  const setRefs = React.useCallback(function(node) {
    own.current = node;
    setRef(ref, node);
  }, [ref]);
  useIsoLayoutEffect(function() {
    if (own.current) own.current.indeterminate = mixed;
  });
  const base = domId("dk-cb", React.useId()), labelId = base + "-label", descId = base + "-desc";
  const hasLabel = props.children != null && props.children !== false && props.children !== "";
  const hasDesc = props.description != null && props.description !== false && props.description !== "";
  if (hasDesc) rest["aria-describedby"] = cn(rest["aria-describedby"], descId);
  if (hasDesc && hasLabel && rest["aria-label"] == null && rest["aria-labelledby"] == null) rest["aria-labelledby"] = labelId;
  return /* @__PURE__ */ React.createElement("label", { className: cn("dk-checkbox", "dk-checkbox--size-" + size, invalid && "dk-checkbox--invalid", rest.disabled && "dk-checkbox--disabled", readOnly && "dk-checkbox--readonly", !hasLabel && !hasDesc && "dk-checkbox--bare", props.className), style: props.style, "data-component": "checkbox", "data-size": size }, /* @__PURE__ */ React.createElement("span", { className: "dk-checkbox__control", key: "control" }, /* @__PURE__ */ React.createElement("input", { ...rest, ref: setRefs, type: "checkbox", className: "dk-checkbox__input", key: "input" }), /* @__PURE__ */ React.createElement("span", { className: "dk-checkbox__icon", "aria-hidden": true, key: "icon" }, /* @__PURE__ */ React.createElement(Icon, { icon: mixed ? icons.Remove : icons.Check }))), hasLabel || hasDesc ? /* @__PURE__ */ React.createElement("span", { className: "dk-checkbox__text", key: "text" }, hasLabel ? /* @__PURE__ */ React.createElement("span", { className: "dk-checkbox__label", id: labelId, key: "label" }, props.children) : null, hasDesc ? /* @__PURE__ */ React.createElement("span", { className: "dk-checkbox__description", id: descId, key: "desc" }, props.description) : null) : null);
});
export {
  Checkbox
};
//# sourceMappingURL=Checkbox.js.map
