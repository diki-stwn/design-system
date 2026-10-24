"use client";

// src/components/PhoneInput/PhoneInput.tsx
import * as React from "react";
import { cn, isInvalid, omit, oneOf, SIZES } from "../../internal/cn.js";
import { Icon } from "../Icon/Icon.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
import { useLocale, useSerupa } from "../../internal/provider.js";
import * as icons from "../../material/builtin.js";
import { PHONE_COUNTRIES, formatNational, isPhoneComplete, parsePhone, phoneCountry, stripTrunk, toE164 } from "./phone.js";
var own = {
  size: 1,
  invalid: 1,
  className: 1,
  style: 1,
  value: 1,
  defaultValue: 1,
  onValueChange: 1,
  country: 1,
  defaultCountry: 1,
  onCountryChange: 1,
  countries: 1,
  countryLabel: 1,
  name: 1,
  onKeyDown: 1
};
var regionOf = (locale) => {
  try {
    return new Intl.Locale(locale).maximize().region;
  } catch {
    return void 0;
  }
};
var caretAfter = (text, n) => {
  if (n <= 0) return 0;
  for (let i = 0, seen = 0; i < text.length; i++) if (/\d/.test(text[i]) && ++seen === n) return i + 1;
  return text.length;
};
var PhoneInput = /* @__PURE__ */ component("PhoneInput", function PhoneInput2(props, ref) {
  props = useFieldControl(props);
  const sds = useSerupa();
  const locale = useLocale();
  const rest = omit(props, own);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const list = React.useMemo(function() {
    const picked = props.countries ? props.countries.map(phoneCountry).filter((c) => !!c) : PHONE_COUNTRIES.slice();
    let names;
    try {
      names = new Intl.DisplayNames([locale], { type: "region" });
    } catch {
      names = void 0;
    }
    return picked.map((c) => ({ c, name: names && names.of(c.code) || c.code })).sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [props.countries, locale]);
  const fallback = phoneCountry(props.defaultCountry) || phoneCountry(regionOf(locale)) || phoneCountry("US");
  const start = parsePhone(props.value ?? props.defaultValue ?? "", props.country ?? props.defaultCountry);
  const [ownCountry, setOwnCountry] = React.useState(() => start ? start.country.code : fallback.code);
  const country = phoneCountry(props.country) || phoneCountry(ownCountry) || fallback;
  const [national, setNational] = React.useState(() => start ? start.national : "");
  const reported = React.useRef(start ? toE164(start.national, start.country) : "");
  let shown = national;
  if (props.value !== void 0 && props.value !== reported.current) {
    const p = parsePhone(props.value, country.code);
    shown = p ? p.national : "";
    reported.current = props.value;
    if (shown !== national) setNational(shown);
    if (p && p.country.code !== country.code && props.country === void 0) setOwnCountry(p.country.code);
  }
  const input = React.useRef(null);
  const setRef = React.useCallback(function(node) {
    input.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, [ref]);
  const caret = React.useRef(null);
  const text = formatNational(shown, country);
  React.useLayoutEffect(function() {
    if (caret.current == null || !input.current || document.activeElement !== input.current) return;
    input.current.setSelectionRange(caret.current, caret.current);
    caret.current = null;
  });
  const commit = function(digits, c) {
    digits = digits.slice(0, c.max);
    setNational(digits);
    if (c.code !== country.code) {
      if (props.country === void 0) setOwnCountry(c.code);
      props.onCountryChange?.(c.code);
    }
    const e164 = toE164(digits, c);
    if (e164 !== reported.current || c.code !== country.code) {
      reported.current = e164;
      props.onValueChange?.(e164, { country: c.code, national: digits, complete: isPhoneComplete(digits, c) });
    }
    return digits;
  };
  const onChange = function(e) {
    const raw = e.target.value, at = e.target.selectionStart ?? raw.length;
    let before = raw.slice(0, at).replace(/\D/g, "").length;
    if (/^\s*(\+|00)/.test(raw)) {
      const p = parsePhone(raw, country.code);
      if (p) {
        const d2 = commit(p.national, p.country);
        caret.current = formatNational(d2, p.country).length;
        return;
      }
    }
    const all = raw.replace(/\D/g, ""), digits = stripTrunk(all, country);
    if (digits.length < all.length) before = Math.max(0, before - (all.length - digits.length));
    const d = commit(digits, country);
    caret.current = caretAfter(formatNational(d, country), Math.min(before, d.length));
  };
  const onKeyDown = function(e) {
    props.onKeyDown?.(e);
    const el = e.currentTarget, s = el.selectionStart, end = el.selectionEnd;
    if (e.defaultPrevented || s == null || s !== end || e.key !== "Backspace" && e.key !== "Delete") return;
    const back = e.key === "Backspace";
    let i = back ? s - 1 : s;
    if (i < 0 || i >= text.length || /\d/.test(text[i])) return;
    while (i >= 0 && i < text.length && !/\d/.test(text[i])) i += back ? -1 : 1;
    if (i < 0 || i >= text.length) return;
    e.preventDefault();
    const n = text.slice(0, i).replace(/\D/g, "").length;
    commit(shown.slice(0, n) + shown.slice(n + 1), country);
    caret.current = caretAfter(formatNational(shown.slice(0, n) + shown.slice(n + 1), country), n);
  };
  const onCountry = function(e) {
    const c = phoneCountry(e.target.value);
    if (c) commit(shown, c);
  };
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: cn("dk-input dk-phone-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className),
      style: props.style,
      "data-component": "phone-input",
      "data-size": size
    },
    /* @__PURE__ */ React.createElement("span", { className: "dk-phone-input__country" }, /* @__PURE__ */ React.createElement("span", { className: "dk-phone-input__dial", "aria-hidden": true }, "+", country.dial), /* @__PURE__ */ React.createElement(Icon, { icon: icons.ExpandMore, className: "dk-phone-input__chevron" }), /* @__PURE__ */ React.createElement(
      "select",
      {
        className: "dk-phone-input__select",
        value: country.code,
        onChange: onCountry,
        disabled: rest.disabled || rest.readOnly,
        "aria-label": props.countryLabel || sds.labels.country
      },
      list.map(({ c, name }) => /* @__PURE__ */ React.createElement("option", { key: c.code, value: c.code }, name + " (+" + c.dial + ")"))
    )),
    /* @__PURE__ */ React.createElement("input", { autoComplete: "tel-national", ...rest, ref: setRef, type: "tel", inputMode: "tel", className: "dk-input__field", value: text, onChange, onKeyDown }),
    props.name ? /* @__PURE__ */ React.createElement("input", { type: "hidden", name: props.name, value: toE164(shown, country), disabled: rest.disabled }) : null
  );
});
export {
  PhoneInput
};
//# sourceMappingURL=PhoneInput.js.map
