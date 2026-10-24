"use client";

// src/components/Field/Field.tsx
import * as React from "react";
import { cn, domId, omit } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { named } from "../../internal/component.js";
import { FieldContext } from "../../internal/field.js";
import * as icons from "../../material/builtin.js";
import { FieldLabelProvider } from "../../internal/fieldLabel.js";
var OWN = { label: 1, hint: 1, error: 1, required: 1, optional: 1, disabled: 1, group: 1, id: 1, children: 1, className: 1 };
var Field = /* @__PURE__ */ named("Field", function Field2(props) {
  const rest = omit(props, OWN);
  const base = domId("dk-f", React.useId());
  const child = React.Children.count(props.children) === 1 && React.isValidElement(props.children) ? props.children : null;
  const controlId = props.id || child && child.props.id || base + "-control";
  const hasError = props.error != null && props.error !== false && props.error !== "";
  const hintId = props.hint ? base + "-hint" : null, errorId = hasError ? base + "-error" : null;
  const group = !!props.group;
  const labelKids = [
    props.label,
    props.required ? /* @__PURE__ */ React.createElement("span", { className: "dk-field__required", "aria-hidden": true, key: "req" }, "*") : null,
    !props.required && props.optional ? /* @__PURE__ */ React.createElement("span", { className: "dk-field__optional", key: "opt" }, typeof props.optional === "string" ? props.optional : "(optional)") : null
  ];
  const label = props.label == null ? null : group ? React.createElement("legend", { className: "dk-field__label", key: "label" }, ...labelKids) : React.createElement("label", { className: "dk-field__label", htmlFor: controlId, id: base + "-label", key: "label" }, ...labelKids);
  const hint = props.hint ? /* @__PURE__ */ React.createElement("div", { className: "dk-field__hint", id: hintId, key: "hint" }, props.hint) : null;
  const error = hasError ? /* @__PURE__ */ React.createElement("div", { className: "dk-field__error", key: "error" }, /* @__PURE__ */ React.createElement(Icon, { icon: icons.Error, className: "dk-field__error-icon" }), /* @__PURE__ */ React.createElement("span", { id: errorId }, props.error)) : null;
  const described = cn(hintId, errorId);
  const pass = function(el, isControl) {
    if (!React.isValidElement(el)) return el;
    const p = el.props;
    const add = {}, dom = typeof el.type === "string";
    if (isControl && dom && React.Children.toArray(p.children).some(React.isValidElement)) return el;
    if (isControl) {
      if (!p.id) add.id = controlId;
      if (described) add["aria-describedby"] = cn(p["aria-describedby"], described);
      if (props.required && p["aria-required"] == null) add["aria-required"] = true;
    }
    if (hasError) {
      if (dom) add["aria-invalid"] = true;
      else add.invalid = true;
    }
    if (props.disabled && !group) add.disabled = true;
    return React.cloneElement(el, add);
  };
  const cls = cn("dk-field", group && "dk-field--group", hasError && "dk-field--invalid", props.disabled && "dk-field--disabled", props.className);
  if (group) {
    return /* @__PURE__ */ React.createElement("fieldset", { ...rest, className: cls, disabled: props.disabled || void 0, "aria-describedby": described || void 0, "data-component": "field" }, label, hint, /* @__PURE__ */ React.createElement(FieldContext.Provider, { value: null }, /* @__PURE__ */ React.createElement("div", { className: "dk-field__control", key: "control" }, React.Children.map(props.children, function(c) {
      return pass(c, false);
    }))), error);
  }
  const control = { id: controlId, labelId: props.label == null ? void 0 : base + "-label", describedBy: described || void 0, required: props.required || void 0, invalid: hasError || void 0, disabled: props.disabled || void 0 };
  return /* @__PURE__ */ React.createElement("div", { ...rest, className: cls, "data-component": "field" }, label, hint, /* @__PURE__ */ React.createElement(FieldContext.Provider, { value: control }, /* @__PURE__ */ React.createElement("div", { className: "dk-field__control", key: "control" }, /* @__PURE__ */ React.createElement(FieldLabelProvider, { value: label ? { control: controlId, label: base + "-label" } : null }, child ? pass(child, true) : props.children))), error);
});
export {
  Field
};
//# sourceMappingURL=Field.js.map
