"use client";

// src/components/ColorPicker/ColorPicker.tsx
import * as React from "react";
import { cn, omit, setRef } from "../../internal/cn.js";
import { component } from "../../internal/component.js";
import { contrastRatio, normalizeHex } from "../../internal/color.js";
import { delegateFocus } from "../../internal/focus.js";
import { useFieldLabel } from "../../internal/fieldLabel.js";
import { useLocale, useSerupa } from "../../internal/provider.js";
import { Icon } from "../Icon/Icon.js";
import { Input } from "../Input/Input.js";
import * as icons from "../../material/builtin.js";
var OWN = { "aria-label": 1, "aria-labelledby": 1, swatches: 1, value: 1, defaultValue: 1, onValueChange: 1, custom: 1, contrastWith: 1, minContrast: 1, size: 1, disabled: 1, name: 1, className: 1 };
var swatchOf = (s) => typeof s === "string" ? { value: s, label: normalizeHex(s) || s } : s;
var ink = (hex) => (contrastRatio(hex, "#ffffff") || 0) >= (contrastRatio(hex, "#000000") || 0) ? "#ffffff" : "#000000";
var ColorPicker = /* @__PURE__ */ component("ColorPicker", function ColorPicker2(props, ref) {
  const rest = omit(props, OWN);
  const sds = useSerupa(), locale = useLocale();
  const swatches = (props.swatches || []).map(swatchOf).map((s) => ({ ...s, value: normalizeHex(s.value) || s.value }));
  const controlled = props.value !== void 0;
  const [own, setOwn] = React.useState(normalizeHex(props.defaultValue || ""));
  const value = controlled ? normalizeHex(props.value || "") : own;
  const disabled = !!props.disabled, custom = props.custom !== false;
  const size = props.size === "sm" ? "sm" : "md";
  const [text, setText] = React.useState((value || "").replace("#", ""));
  const typing = React.useRef(false);
  React.useEffect(() => {
    if (!typing.current) setText((value || "").replace("#", ""));
  }, [value]);
  const root = React.useRef(null);
  const fieldLabel = useFieldLabel(props.id);
  const labelledBy = props["aria-labelledby"] ?? (props["aria-label"] ? void 0 : fieldLabel);
  const choose = (hex, focus) => {
    if (disabled) return;
    const v = normalizeHex(hex);
    if (!v) return;
    if (!controlled) setOwn(v);
    if (v !== value && props.onValueChange) props.onValueChange(v);
    if (focus && root.current) {
      const b = root.current.querySelector(`.dk-color-picker__swatch[data-value="${v}"]`);
      if (b) b.focus();
    }
  };
  const picked = swatches.findIndex((s) => s.value === value);
  const tabStop = picked >= 0 ? picked : 0;
  const onKeyDown = (e) => {
    if (e.defaultPrevented || !swatches.length) return;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const i = swatches.findIndex((s) => s.value === e.currentTarget.dataset.value);
    let n;
    switch (e.key) {
      case "ArrowRight":
        n = i + (rtl ? -1 : 1);
        break;
      case "ArrowDown":
        n = i + 1;
        break;
      case "ArrowLeft":
        n = i + (rtl ? 1 : -1);
        break;
      case "ArrowUp":
        n = i - 1;
        break;
      case "Home":
        n = 0;
        break;
      case "End":
        n = swatches.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    choose(swatches[(n + swatches.length) % swatches.length].value, true);
  };
  const ratio = props.contrastWith && value ? contrastRatio(value, props.contrastWith) : null;
  const min = props.minContrast && props.minContrast > 1 ? props.minContrast : 4.5;
  const fmt = (n) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(Math.floor(n * 10) / 10);
  const low = ratio != null && ratio < min;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ...rest,
      ref: (n) => {
        root.current = n;
        delegateFocus(n, () => n && n.querySelectorAll(".dk-color-picker__swatch")[tabStop]);
        setRef(ref, n);
      },
      className: cn("dk-color-picker", "dk-color-picker--size-" + size, disabled && "dk-color-picker--disabled", props.className),
      "data-component": "color-picker",
      "data-size": size
    },
    /* @__PURE__ */ React.createElement("div", { role: "radiogroup", className: "dk-color-picker__swatches", "aria-label": props["aria-label"], "aria-labelledby": labelledBy, "aria-disabled": disabled || void 0 }, swatches.map((s, i) => {
      const on = s.value === value;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: s.value + i,
          type: "button",
          role: "radio",
          "aria-checked": on,
          "aria-label": s.label,
          title: s.label,
          "data-value": s.value,
          className: cn("dk-color-picker__swatch", on && "dk-color-picker__swatch--checked"),
          style: { "--dk-swatch": s.value, "--dk-swatch-ink": ink(s.value) },
          tabIndex: i === tabStop ? 0 : -1,
          disabled,
          onClick: () => choose(s.value),
          onKeyDown
        },
        on ? /* @__PURE__ */ React.createElement(Icon, { icon: icons.Check, className: "dk-color-picker__check" }) : null
      );
    })),
    custom ? /* @__PURE__ */ React.createElement("div", { className: "dk-color-picker__custom" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "color",
        className: "dk-color-picker__native",
        "aria-label": sds.labels.customColor,
        value: value || "#000000",
        disabled,
        onChange: (e) => choose(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        size: "sm",
        className: "dk-color-picker__hex",
        "aria-label": sds.labels.hexCode,
        value: text,
        disabled,
        maxLength: 7,
        spellCheck: false,
        autoComplete: "off",
        leftIcon: /* @__PURE__ */ React.createElement("span", { className: "dk-color-picker__hash" }, "#"),
        "aria-invalid": text !== "" && !normalizeHex(text) ? true : void 0,
        onFocus: () => {
          typing.current = true;
        },
        onChange: (e) => {
          const t = e.target.value.replace(/^#/, "");
          setText(t);
          const v = normalizeHex(t);
          if (v && t.length === 6) choose(v);
        },
        onBlur: () => {
          typing.current = false;
          const v = normalizeHex(text);
          if (v) choose(v);
          setText((v || value || "").replace("#", ""));
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            const v = normalizeHex(text);
            if (v) {
              choose(v);
              setText(v.slice(1));
            }
          }
        }
      }
    )) : null,
    props.contrastWith ? /* @__PURE__ */ React.createElement("div", { className: cn("dk-color-picker__contrast", low && "dk-color-picker__contrast--low"), "aria-live": "polite" }, ratio != null ? /* @__PURE__ */ React.createElement(React.Fragment, null, low ? /* @__PURE__ */ React.createElement(Icon, { icon: icons.Warning, className: "dk-color-picker__warning" }) : null, /* @__PURE__ */ React.createElement("span", null, sds.labels.contrast(fmt(ratio)), low ? ", " + sds.labels.lowContrast(fmt(min)) : "")) : null) : null,
    props.name ? /* @__PURE__ */ React.createElement("input", { type: "hidden", name: props.name, value: value || "", disabled }) : null
  );
});
export {
  ColorPicker
};
//# sourceMappingURL=ColorPicker.js.map
