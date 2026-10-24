"use client";

// src/components/DatePicker/DatePicker.tsx
import * as React from "react";
import { cn, domId, isInvalid, oneOf, SIZES, useIsoLayoutEffect } from "../../internal/cn.js";
import { compare, datePattern, day, formatDate, isoDate, isValid, parseDate } from "../../internal/dates.js";
import { cssLength, hideLayer, placeLayer, showLayer } from "../../internal/position.js";
import { Calendar } from "../Calendar/Calendar.js";
import { Icon } from "../Icon/Icon.js";
import { component } from "../../internal/component.js";
import { useFieldControl } from "../../internal/field.js";
import { useLocale, useSerupa } from "../../internal/provider.js";
import { useFormReset } from "../../internal/useFormReset.js";
import * as icons from "../../material/builtin.js";
import { isComposing } from "../../internal/ime.js";
var DatePicker = /* @__PURE__ */ component("DatePicker", function DatePicker2(props, ref) {
  props = useFieldControl(props);
  const sds = useSerupa();
  const { value: _v, defaultValue: _d, onValueChange, min, max, isDateDisabled, locale: localeProp, weekStartsOn, size: _s, invalid: _i, buttonLabel, className, style, name, placeholder, disabled, readOnly, onBlur, onKeyDown, ...rest } = props;
  const locale = useLocale(localeProp);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  const controlled = props.value !== void 0;
  const [own, setOwn] = React.useState(isValid(props.defaultValue) ? day(props.defaultValue) : null);
  const value = controlled ? isValid(props.value) ? day(props.value) : null : own;
  const [text, setText] = React.useState(value ? formatDate(value, locale) : "");
  const [open, setOpen] = React.useState(false);
  const id = domId("dk-dp", React.useId());
  const field = React.useRef(null);
  const button = React.useRef(null);
  const box = React.useRef(null);
  const panel = React.useRef(null);
  const shown = React.useRef(value ? value.getTime() : null);
  useFormReset(field, () => {
    if (controlled) return;
    const d = isValid(props.defaultValue) ? day(props.defaultValue) : null;
    shown.current = d ? d.getTime() : null;
    setOwn(d);
    setText(d ? formatDate(d, locale) : "");
    setOpen(false);
  });
  const shownLocale = React.useRef(locale);
  if ((value ? value.getTime() : null) !== shown.current || locale !== shownLocale.current) {
    shown.current = value ? value.getTime() : null;
    shownLocale.current = locale;
    const t = value ? formatDate(value, locale) : "";
    if (t !== text) setText(t);
  }
  const allowed = (d) => !(min && compare(d, min) < 0) && !(max && compare(d, max) > 0) && !(isDateDisabled && isDateDisabled(d));
  const commit = (d) => {
    shown.current = d ? d.getTime() : null;
    setText(d ? formatDate(d, locale) : "");
    if ((d ? d.getTime() : null) === (value ? value.getTime() : null)) return;
    if (!controlled) setOwn(d);
    if (onValueChange) onValueChange(d);
  };
  const read = () => {
    if (text.trim() === "") return commit(null);
    const d = parseDate(text, locale);
    commit(d && allowed(d) ? d : value);
  };
  const close = (focusField) => {
    setOpen(false);
    if (focusField && field.current) field.current.focus();
  };
  useIsoLayoutEffect(() => {
    const p = panel.current, anchor = box.current;
    if (!p) return;
    if (!open || !anchor) {
      hideLayer(p);
      return;
    }
    showLayer(p);
    const update = () => placeLayer(p, anchor, "bottom-start", cssLength(p, "--dk-dp-offset"), "bottom");
    const scrolled = (e) => {
      if (!(e.target instanceof Node && p.contains(e.target))) update();
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(p);
      ro.observe(anchor);
    }
    window.addEventListener("scroll", scrolled, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", scrolled, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      if (panel.current && panel.current.contains(t) || button.current && button.current.contains(t)) return;
      close(false);
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open]);
  const typed = parseDate(text, locale);
  const off = !!disabled || !!readOnly;
  return /* @__PURE__ */ React.createElement("span", { ref: box, className: cn("dk-input", "dk-input--size-" + size, "dk-date-picker", invalid && "dk-input--invalid", disabled && "dk-input--disabled", readOnly && "dk-input--readonly", className), style, "data-component": "date-picker", "data-size": size }, /* @__PURE__ */ React.createElement(
    "input",
    {
      ...rest,
      ref: (n) => {
        field.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      type: "text",
      inputMode: "numeric",
      autoComplete: "off",
      className: "dk-input__field",
      value: text,
      disabled,
      readOnly,
      placeholder: placeholder != null ? placeholder : datePattern(locale),
      "aria-invalid": invalid || void 0,
      onChange: (e) => setText(e.target.value),
      onBlur: (e) => {
        read();
        if (onBlur) onBlur(e);
      },
      onKeyDown: (e) => {
        if (onKeyDown) onKeyDown(e);
        if (e.defaultPrevented || isComposing(e)) return;
        if (e.key === "Enter") read();
        else if (e.key === "ArrowDown" && e.altKey && !off) {
          e.preventDefault();
          read();
          setOpen(true);
        }
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      ref: button,
      type: "button",
      className: "dk-date-picker__button",
      "aria-label": buttonLabel || sds.labels.chooseDate,
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-controls": open ? id : void 0,
      disabled: off,
      onClick: () => {
        if (!open) read();
        setOpen(!open);
      }
    },
    /* @__PURE__ */ React.createElement(Icon, { icon: icons.CalendarToday })
  ), name ? /* @__PURE__ */ React.createElement("input", { type: "hidden", name, value: value ? isoDate(value) : "", disabled }) : null, /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: panel,
      id,
      role: "dialog",
      "aria-label": buttonLabel || sds.labels.chooseDate,
      ...{ popover: "manual" },
      hidden: !open || void 0,
      className: "dk-date-picker__popup",
      onKeyDown: (e) => {
        if (e.key === "Escape" && !isComposing(e)) {
          e.preventDefault();
          e.stopPropagation();
          close(true);
        }
      }
    },
    open ? /* @__PURE__ */ React.createElement(
      Calendar,
      {
        value,
        defaultMonth: (typed && allowed(typed) ? typed : null) || value || void 0,
        min,
        max,
        isDateDisabled,
        locale,
        weekStartsOn,
        autoFocus: true,
        onValueChange: (d) => {
          commit(d);
          close(true);
        }
      }
    ) : null
  ));
});
export {
  DatePicker
};
//# sourceMappingURL=DatePicker.js.map
