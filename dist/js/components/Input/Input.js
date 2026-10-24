"use client";

// src/components/Input/Input.tsx
import * as React from "react";
import { cn, isInvalid, omit, oneOf, SIZES } from "../../internal/cn.js";
import { asIcon } from "../Icon/asIcon.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
var Input = /* @__PURE__ */ component("Input", function Input2(props, ref) {
  props = useFieldControl(props);
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, rightIcon: 1, className: 1, style: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  if (rest.type === void 0) rest.type = "text";
  const icon = function(source, side) {
    const node = asIcon(source);
    return node == null || node === false ? null : /* @__PURE__ */ React.createElement("span", { className: "dk-input__icon dk-input__icon--" + side, "aria-hidden": true, key: side }, node);
  };
  return /* @__PURE__ */ React.createElement("span", { className: cn("dk-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className), style: props.style, "data-component": "input", "data-size": size }, icon(props.leftIcon, "left"), /* @__PURE__ */ React.createElement("input", { ...rest, ref, className: "dk-input__field", key: "field" }), icon(props.rightIcon, "right"));
});
export {
  Input
};
//# sourceMappingURL=Input.js.map
