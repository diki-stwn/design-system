"use client";

// src/components/PasswordInput/PasswordInput.tsx
import * as React from "react";
import { cn, isInvalid, omit, oneOf } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { asIcon } from "../Icon/asIcon.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
import { useSerupa } from "../../internal/provider.js";
import * as icons from "../../material/builtin.js";
var SIZES = ["sm", "md", "lg"];
var PasswordInput = /* @__PURE__ */ component("PasswordInput", function PasswordInput2(props, ref) {
  props = useFieldControl(props);
  const sds = useSerupa();
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, className: 1, style: 1, visible: 1, defaultVisible: 1, onVisibleChange: 1, toggleLabel: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  if (rest.autoComplete === void 0) rest.autoComplete = "current-password";
  const [own2, setOwn] = React.useState(!!props.defaultVisible);
  const controlled = props.visible !== void 0;
  const shown = controlled ? !!props.visible : own2;
  const left = asIcon(props.leftIcon);
  const toggle = () => {
    if (!controlled) setOwn(!shown);
    if (props.onVisibleChange) props.onVisibleChange(!shown);
  };
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn("dk-input dk-password-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className),
      style: props.style,
      "data-component": "password-input",
      "data-size": size
    },
    left != null && left !== false ? /* @__PURE__ */ React.createElement("span", { className: "dk-input__icon dk-input__icon--left", "aria-hidden": true }, left) : null,
    /* @__PURE__ */ React.createElement("input", { ...rest, ref, type: shown ? "text" : "password", className: "dk-input__field", spellCheck: false, autoCapitalize: "off" }),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "dk-password-input__toggle",
        "aria-label": props.toggleLabel || sds.labels.showPassword,
        "aria-pressed": shown,
        "aria-controls": rest.id,
        disabled: rest.disabled,
        onClick: toggle,
        onMouseDown: (e) => e.preventDefault()
      },
      /* @__PURE__ */ React.createElement(Icon, { icon: shown ? icons.VisibilityOff : icons.Visibility })
    )
  );
});
export {
  PasswordInput
};
//# sourceMappingURL=PasswordInput.js.map
