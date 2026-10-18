// src/components/Accordion/Accordion.tsx
import * as React3 from "react";

// src/internal/cn.ts
import * as React from "react";
function cn(...names) {
  return names.filter(Boolean).join(" ");
}
function domId(prefix, reactId) {
  return prefix + reactId.replace(/[^A-Za-z0-9_-]/g, "");
}
function oneOf(list, value, fallback) {
  return list.indexOf(value) < 0 ? fallback : value;
}
function omit(props, own) {
  const rest = {};
  for (const k in props) if (!own[k]) rest[k] = props[k];
  return rest;
}
function isInvalid(invalid, ariaInvalid) {
  return !!invalid || ariaInvalid === true || ariaInvalid === "true";
}
function setRef(ref, node) {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}
function elementRef(el) {
  const r = parseInt(React.version, 10) >= 19 ? el.props.ref : el.ref;
  return r != null ? r : void 0;
}
var SIZES = ["sm", "md", "lg"];
var useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

// src/components/Icon/Icon.tsx
import * as React2 from "react";

// src/icons.ts
var ICONS = {};
var customIcons = Object.freeze(Object.keys(ICONS).sort());
function hasIcon(name) {
  return typeof name === "string" && Object.prototype.hasOwnProperty.call(ICONS, name);
}

// src/components/Icon/Icon.tsx
var Icon = React2.forwardRef(function Icon2(props, ref) {
  const rest = omit(props, { name: 1, size: 1, className: 1, style: 1 });
  const labelled = rest["aria-label"] || rest["aria-labelledby"];
  if (!labelled) rest["aria-hidden"] = true;
  else rest.role = "img";
  const style = Object.assign({}, props.style);
  if (props.size != null) style.fontSize = typeof props.size === "number" ? props.size + "px" : props.size;
  if (hasIcon(props.name)) {
    rest["data-icon"] = props.name;
    return /* @__PURE__ */ React2.createElement("span", { ...rest, ref, className: cn("dk-icon dk-icon--custom", props.className), style }, /* @__PURE__ */ React2.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, focusable: "false", dangerouslySetInnerHTML: { __html: ICONS[props.name] } }));
  }
  return /* @__PURE__ */ React2.createElement("span", { ...rest, ref, className: cn("dk-icon", props.className), style, translate: "no" }, props.name);
});
Icon.displayName = "Icon";
function asIcon(node) {
  return typeof node === "string" ? /* @__PURE__ */ React2.createElement(Icon, { name: node }) : node;
}

// src/components/Accordion/Accordion.tsx
var AccordionContext = React3.createContext(null);
var Accordion = React3.forwardRef(function Accordion2(props, ref) {
  const rest = omit(props, { type: 1, value: 1, defaultValue: 1, onValueChange: 1, collapsible: 1, variant: 1, headingLevel: 1, className: 1, children: 1, onKeyDown: 1 });
  const single = props.type !== "multiple";
  const controlled = props.value !== void 0;
  const [inner, setInner] = React3.useState(() => (props.defaultValue || []).slice(0, single ? 1 : void 0));
  const open = controlled ? props.value : inner;
  const collapsible = props.collapsible !== false;
  const onChange = React3.useRef(props.onValueChange);
  onChange.current = props.onValueChange;
  const toggle = React3.useCallback((v) => {
    const isOpen = open.indexOf(v) >= 0;
    let next2;
    if (single) next2 = isOpen ? collapsible ? [] : open : [v];
    else next2 = isOpen ? open.filter((x) => x !== v) : open.concat(v);
    if (next2 === open) return;
    if (!controlled) setInner(next2);
    if (onChange.current) onChange.current(next2);
  }, [open, single, collapsible, controlled]);
  const level = [2, 3, 4, 5, 6].indexOf(props.headingLevel) >= 0 ? props.headingLevel : 3;
  const base = domId("dk-acc", React3.useId());
  const variant = oneOf(["plain", "card"], props.variant, "plain");
  function onKeyDown(e) {
    if (props.onKeyDown) props.onKeyDown(e);
    const t = e.target;
    if (e.defaultPrevented || !t.classList.contains("dk-accordion__trigger") || t.closest(".dk-accordion") !== e.currentTarget) return;
    const all = Array.from(e.currentTarget.querySelectorAll(".dk-accordion__trigger")).filter((b) => b.closest(".dk-accordion") === e.currentTarget && !b.disabled);
    const i = all.indexOf(t);
    const to = e.key === "ArrowDown" ? all[(i + 1) % all.length] : e.key === "ArrowUp" ? all[(i - 1 + all.length) % all.length] : e.key === "Home" ? all[0] : e.key === "End" ? all[all.length - 1] : null;
    if (to) {
      e.preventDefault();
      to.focus();
    }
  }
  let n = 0;
  const items3 = React3.Children.map(props.children, (c) => React3.isValidElement(c) ? React3.cloneElement(c, { "data-index": String(n++) }) : c);
  return /* @__PURE__ */ React3.createElement(AccordionContext.Provider, { value: { open, toggle, level, collapsible, single, base } }, /* @__PURE__ */ React3.createElement("div", { ...rest, ref, onKeyDown, "data-component": "accordion", className: cn("dk-accordion", variant === "card" && "dk-accordion--card", props.className) }, items3));
});
Accordion.displayName = "Accordion";
var AccordionItem = React3.forwardRef(function AccordionItem2(props, ref) {
  const ctx = React3.useContext(AccordionContext);
  const rest = omit(props, { value: 1, title: 1, disabled: 1, className: 1, children: 1 });
  const index = String(rest["data-index"] || "0");
  delete rest["data-index"];
  const value = props.value != null ? props.value : index;
  const open = !!ctx && ctx.open.indexOf(value) >= 0;
  const id = (ctx ? ctx.base : "dk-acc") + "-" + index;
  const locked = !!ctx && open && ctx.single && !ctx.collapsible;
  const H = "h" + (ctx ? ctx.level : 3);
  return /* @__PURE__ */ React3.createElement("div", { ...rest, ref, "data-state": open ? "open" : "closed", className: cn("dk-accordion__item", open && "dk-accordion__item--open", props.disabled && "dk-accordion__item--disabled", props.className) }, /* @__PURE__ */ React3.createElement(H, { className: "dk-accordion__heading" }, /* @__PURE__ */ React3.createElement(
    "button",
    {
      type: "button",
      id: id + "-t",
      className: "dk-accordion__trigger",
      "aria-expanded": open,
      "aria-controls": id + "-p",
      disabled: props.disabled,
      "aria-disabled": locked ? true : void 0,
      onClick: () => {
        if (ctx && !locked) ctx.toggle(value);
      }
    },
    /* @__PURE__ */ React3.createElement("span", { className: "dk-accordion__title" }, props.title),
    /* @__PURE__ */ React3.createElement(Icon, { name: "expand_more", className: "dk-accordion__icon" })
  )), /* @__PURE__ */ React3.createElement("div", { id: id + "-p", role: "region", "aria-labelledby": id + "-t", className: "dk-accordion__panel" }, /* @__PURE__ */ React3.createElement("div", { className: "dk-accordion__clip" }, /* @__PURE__ */ React3.createElement("div", { className: "dk-accordion__content" }, props.children))));
});
AccordionItem.displayName = "AccordionItem";

// src/components/Alert/Alert.tsx
import * as React6 from "react";

// src/components/Button/Button.tsx
import * as React5 from "react";

// src/internal/config.ts
var config = { link: "a" };
function configure(opts) {
  opts = opts || {};
  if (opts.link) config.link = opts.link;
  return Object.assign({}, config);
}

// src/internal/announce.ts
var announcer = null;
function ensureAnnouncer() {
  if (announcer || typeof document === "undefined") return announcer;
  announcer = document.createElement("div");
  announcer.setAttribute("role", "status");
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("data-dk-announcer", "");
  announcer.className = "sr-only";
  document.body.appendChild(announcer);
  return announcer;
}
function announce(text2) {
  const el = ensureAnnouncer();
  if (!el) return;
  el.textContent = "";
  setTimeout(function() {
    el.textContent = text2;
  }, 50);
}

// src/internal/interactions.ts
function block(e) {
  e.preventDefault();
  e.stopPropagation();
}
function chain(a, b) {
  return a ? function(e) {
    a(e);
    if (!e.defaultPrevented) b(e);
  } : b;
}
function both(a, b) {
  return a ? function(e) {
    a(e);
    b(e);
  } : b;
}
function inactive(el) {
  return el.disabled || el.getAttribute("aria-disabled") === "true" || el.classList.contains("dk-btn--link");
}
function reducedMotion() {
  return !!(typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function pressKey(e) {
  const el = e.currentTarget;
  if ((e.key === "Enter" || e.key === " ") && !e.repeat && !inactive(el)) el.setAttribute("data-pressed", "");
}
function releaseKey(e) {
  e.currentTarget.removeAttribute("data-pressed");
}
function ripple(e) {
  const el = e.currentTarget;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  if (inactive(el) || reducedMotion()) return;
  const pre = el.classList.contains("dk-badge") ? "badge" : "btn";
  const host = el.querySelector(".dk-" + pre + "__ripples");
  if (!host || parseFloat(getComputedStyle(el).getPropertyValue(pre === "badge" ? "--badge-ripple-opacity" : "--button-ripple-opacity")) === 0) return;
  const r = host.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
  const d = 2 * Math.sqrt(Math.pow(Math.max(x, r.width - x), 2) + Math.pow(Math.max(y, r.height - y), 2));
  const dot = document.createElement("span");
  dot.className = "dk-" + pre + "__ripple";
  dot.style.width = dot.style.height = d + "px";
  dot.style.left = x - d / 2 + "px";
  dot.style.top = y - d / 2 + "px";
  host.appendChild(dot);
  const started = Date.now(), spread = parseFloat(getComputedStyle(dot).animationDuration) * 1e3 || 0;
  function remove() {
    if (dot.parentNode) dot.parentNode.removeChild(dot);
  }
  function release() {
    document.removeEventListener("pointerup", release, true);
    document.removeEventListener("pointercancel", release, true);
    setTimeout(function() {
      dot.addEventListener("transitionend", remove);
      dot.className += " dk-" + pre + "__ripple--out";
      setTimeout(remove, 2e3);
    }, Math.max(0, started + spread - Date.now()));
  }
  document.addEventListener("pointerup", release, true);
  document.addEventListener("pointercancel", release, true);
}

// src/internal/warn.ts
var warned = {};
function warnOnce(key2, msg) {
  if (!warned[key2] && typeof console !== "undefined") {
    warned[key2] = 1;
    console.warn(msg);
  }
}

// src/components/Loader/Loader.tsx
import * as React4 from "react";
var VARIANTS = ["ring", "spokes", "dots", "pixel", "text", "skeleton"];
var SHAPES = ["text", "circle", "rect"];
var TONES = ["neutral", "primary", "muted", "inverse"];
var PATTERNS = ["wave", "random", "sweep", "fall", "rise", "snake", "spiral", "cross", "checker"];
var PIXEL_STEPS = {
  sweep: [0, 2, 4, 0, 2, 4, 0, 2, 4],
  // columns, left to right
  fall: [0, 0, 0, 2, 2, 2, 4, 4, 4],
  // rows, top to bottom
  rise: [4, 4, 4, 2, 2, 2, 0, 0, 0],
  // rows, bottom to top
  snake: [0, 1, 2, 5, 4, 3, 6, 7, 8],
  // left to right, then back, row by row
  spiral: [0, 1, 2, 7, 8, 3, 6, 5, 4],
  // clockwise round the edge from the top-left, then the center
  cross: [0, 7, 0, 7, 7, 7, 0, 7, 0],
  // the corners, then the plus (edges and center)
  checker: [0, 7, 0, 7, 0, 7, 0, 7, 0]
  // the X (corners and center), then the edges
};
var OWN = { variant: 1, size: 1, tone: 1, label: 1, delay: 1, shape: 1, lines: 1, pattern: 1, glow: 1, className: 1 };
var Loader = React4.forwardRef(function Loader2(props, ref) {
  const rest = omit(props, OWN);
  const variant = oneOf(VARIANTS, props.variant, "ring");
  const size = oneOf(SIZES, props.size, "md");
  const tone = oneOf(TONES, props.tone, "neutral");
  const label = props.label == null ? "Loading" : String(props.label);
  const isText = variant === "text", isSkeleton = variant === "skeleton";
  const shape = oneOf(SHAPES, props.shape, "text");
  const pattern = oneOf(PATTERNS, props.pattern, "wave");
  const lines = Math.min(20, Math.max(1, Math.floor(Number(props.lines)) || 1));
  const words = label || "Loading";
  const delay = props.delay == null ? 300 : Math.max(0, Number(props.delay) || 0);
  const [shown, setShown] = React4.useState(delay === 0);
  React4.useEffect(function() {
    if (shown) return;
    const t = setTimeout(function() {
      setShown(true);
    }, delay);
    return function() {
      clearTimeout(t);
    };
  }, []);
  React4.useEffect(function() {
    ensureAnnouncer();
  }, []);
  React4.useEffect(function() {
    if (shown && label) announce(label);
  }, [shown]);
  rest["data-component"] = "loader";
  rest["data-variant"] = variant;
  rest["data-size"] = size;
  if (isSkeleton) rest["data-shape"] = shape;
  if (variant === "pixel") rest["data-pattern"] = pattern;
  if (shown && label) {
    rest.role = "progressbar";
    rest["aria-label"] = label;
  } else rest["aria-hidden"] = true;
  const maskId = domId("dk-px", React4.useId());
  const cells = [];
  if (variant === "pixel") for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++)
    cells.push(/* @__PURE__ */ React4.createElement("rect", { key: r * 3 + c, className: "dk-loader__px " + (pattern === "wave" ? "dk-loader__px--d" + (r + c) : pattern === "random" ? "dk-loader__px--r" + (r * 3 + c) : "dk-loader__px--s" + PIXEL_STEPS[pattern][r * 3 + c]), x: c * 8, y: r * 8, width: 8, height: 8 }));
  const drawing = !shown || isText ? null : variant === "pixel" ? /* @__PURE__ */ React4.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" }, /* @__PURE__ */ React4.createElement("mask", { id: maskId, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 24, height: 24 }, /* @__PURE__ */ React4.createElement("rect", { width: 24, height: 24, fill: "white" }), /* @__PURE__ */ React4.createElement("path", { className: "dk-loader__px-cut", d: "M16 0V48M32 0V48M0 16H48M0 32H48", transform: "scale(0.5)" })), /* @__PURE__ */ React4.createElement("g", { mask: "url(#" + maskId + ")" }, cells), /* @__PURE__ */ React4.createElement("path", { className: "dk-loader__px-divider", d: "M16 0V48M32 0V48M0 16H48M0 32H48", transform: "scale(0.5)" })) : variant === "spokes" ? /* @__PURE__ */ React4.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" }, /* @__PURE__ */ React4.createElement("g", { transform: "scale(0.625)" }, [0, 1, 2, 3, 4, 5, 6, 7].map(function(k) {
    return /* @__PURE__ */ React4.createElement("line", { key: k, className: "dk-loader__spoke", x1: 19.2, y1: 4, x2: 19.2, y2: 9.6, transform: "rotate(" + -45 * k + " 19.2 19.2)" });
  }))) : variant === "dots" ? /* @__PURE__ */ React4.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" }, /* @__PURE__ */ React4.createElement("circle", { className: "dk-loader__dot", cx: 4, cy: 12, r: 2.5 }), /* @__PURE__ */ React4.createElement("circle", { className: "dk-loader__dot", cx: 12, cy: 12, r: 2.5 }), /* @__PURE__ */ React4.createElement("circle", { className: "dk-loader__dot", cx: 20, cy: 12, r: 2.5 })) : /* @__PURE__ */ React4.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" }, /* @__PURE__ */ React4.createElement("circle", { className: "dk-loader__track", cx: 12, cy: 12, r: 10 }), /* @__PURE__ */ React4.createElement("circle", { className: "dk-loader__arc", cx: 12, cy: 12, r: 10, pathLength: 100, strokeDasharray: "25 150" }));
  const text2 = isText ? /* @__PURE__ */ React4.createElement("span", { className: "dk-loader__label", "aria-hidden": true, key: "label" }, words) : null;
  const cls = cn("dk-loader", "dk-loader--" + variant, isSkeleton && "dk-loader--shape-" + shape, variant === "pixel" && pattern !== "wave" && "dk-loader--pattern-" + pattern, variant === "pixel" && props.glow && "dk-loader--glow", "dk-loader--size-" + size, tone !== "neutral" && "dk-loader--" + tone, !shown && "dk-loader--waiting", props.className);
  if (isSkeleton) {
    const bones = [];
    if (shape === "text") for (let i = 0; i < lines; i++) bones.push(/* @__PURE__ */ React4.createElement("span", { className: "dk-loader__line", key: i }, /* @__PURE__ */ React4.createElement("span", { className: "dk-loader__bone" })));
    else bones.push(/* @__PURE__ */ React4.createElement("span", { className: "dk-loader__bone", key: "bone" }));
    return /* @__PURE__ */ React4.createElement("span", { ...rest, ref, className: cls }, bones);
  }
  return /* @__PURE__ */ React4.createElement("span", { ...rest, ref, className: cls }, isText ? null : /* @__PURE__ */ React4.createElement("span", { className: "dk-loader__art", key: "art" }, drawing), text2);
});
Loader.displayName = "Loader";

// src/components/Button/Button.tsx
var VARIANTS2 = ["primary", "secondary", "outline", "ghost", "link"];
var OWN2 = { variant: 1, size: 1, destructive: 1, className: 1, children: 1, leftIcon: 1, rightIcon: 1, icon: 1, loading: 1, loadingText: 1 };
function buttonClass(opts) {
  opts = opts || {};
  const v = oneOf(VARIANTS2, opts.variant, "primary");
  const s = oneOf(SIZES, opts.size, "md");
  const iconOnly = !!opts.iconOnly, pos = opts.iconPosition;
  return cn("dk-btn", "dk-btn--" + v, opts.destructive && "dk-btn--destructive", "dk-btn--size-" + s, iconOnly && "dk-btn--icon-only", !iconOnly && (pos === "left" || pos === "right") && "dk-btn--icon-" + pos, opts.className);
}
function slot(node, side) {
  node = asIcon(node);
  return node == null || node === false ? null : /* @__PURE__ */ React5.createElement("span", { className: "dk-btn__icon dk-btn__icon--" + side, "aria-hidden": true, key: side }, node);
}
var ButtonBase = React5.forwardRef(function Button(props, ref) {
  const rest = omit(props, OWN2);
  const isLink = rest.href != null;
  const iconOnly = props.icon != null;
  const pos = props.leftIcon != null && props.rightIcon == null ? "left" : props.rightIcon != null && props.leftIcon == null ? "right" : void 0;
  const variant = oneOf(VARIANTS2, props.variant, "primary");
  const size = oneOf(SIZES, props.size, "md");
  let classes = buttonClass({ variant, size, destructive: props.destructive, iconOnly, iconPosition: pos, className: props.className });
  if (iconOnly && !rest["aria-label"] && !rest["aria-labelledby"] && !rest.title) {
    warnOnce("icon-label", "Button: an icon-only button needs an aria-label.");
  }
  const loading = !!props.loading;
  const disabled = !!rest.disabled;
  const loadingText = props.loadingText == null ? "Loading" : props.loadingText;
  React5.useEffect(function() {
    ensureAnnouncer();
  }, []);
  const wasLoading = React5.useRef(false);
  React5.useEffect(function() {
    if (loading && !wasLoading.current && loadingText) announce(loadingText);
    wasLoading.current = loading;
  }, [loading]);
  const spin = /* @__PURE__ */ React5.createElement(Loader, { className: "dk-btn__spinner", label: "", delay: 0 });
  let content = iconOnly ? [slot(props.icon, "only")] : [
    slot(props.leftIcon, "left"),
    props.children == null || props.children === false ? null : /* @__PURE__ */ React5.createElement("span", { className: "dk-btn__label", key: "label" }, props.children),
    slot(props.rightIcon, "right")
  ];
  if (loading) content = content.concat([/* @__PURE__ */ React5.createElement("span", { className: "dk-btn__loader", "aria-hidden": true, key: "loader" }, spin)]);
  if (variant !== "link") content = [/* @__PURE__ */ React5.createElement("span", { className: "dk-btn__ripples", "aria-hidden": true, key: "ripples" }), ...content];
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
    return React5.createElement(disabled ? "a" : config.link, Object.assign({}, rest, { ref, className: classes }), ...content);
  }
  if (rest.type === void 0) rest.type = "button";
  return React5.createElement("button", Object.assign({}, rest, { ref, className: classes }), ...content);
});
ButtonBase.displayName = "Button";
var Button2 = ButtonBase;

// src/components/Alert/Alert.tsx
var OWN3 = { tone: 1, title: 1, icon: 1, actions: 1, onDismiss: 1, dismissLabel: 1, className: 1, children: 1 };
var TONES2 = ["info", "success", "warning", "danger", "neutral"];
var ICONS2 = { info: "info", success: "check_circle", warning: "warning", danger: "error", neutral: "info" };
var Alert = React6.forwardRef(function Alert2(props, ref) {
  const rest = omit(props, OWN3);
  const tone = oneOf(TONES2, props.tone, "info");
  const has = (n) => n != null && n !== false && n !== "";
  if (rest.role == null) rest.role = tone === "warning" || tone === "danger" ? "alert" : "status";
  const icon = props.icon === false ? null : props.icon == null || props.icon === true ? /* @__PURE__ */ React6.createElement(Icon, { name: ICONS2[tone] }) : typeof props.icon === "string" ? /* @__PURE__ */ React6.createElement(Icon, { name: props.icon }) : props.icon;
  return /* @__PURE__ */ React6.createElement("div", { ...rest, ref, className: cn("dk-alert", "dk-alert--" + tone, props.className), "data-component": "alert", "data-tone": tone }, icon ? /* @__PURE__ */ React6.createElement("span", { className: "dk-alert__icon", "aria-hidden": "true" }, icon) : null, /* @__PURE__ */ React6.createElement("div", { className: "dk-alert__content" }, has(props.title) ? /* @__PURE__ */ React6.createElement("p", { className: "dk-alert__title" }, props.title) : null, has(props.children) ? /* @__PURE__ */ React6.createElement("div", { className: "dk-alert__message" }, props.children) : null, has(props.actions) ? /* @__PURE__ */ React6.createElement("div", { className: "dk-alert__actions" }, props.actions) : null), props.onDismiss ? /* @__PURE__ */ React6.createElement(Button2, { className: "dk-alert__dismiss", variant: "ghost", size: "sm", icon: "close", "aria-label": props.dismissLabel || "Dismiss", onClick: props.onDismiss }) : null);
});
Alert.displayName = "Alert";

// src/components/Avatar/Avatar.tsx
import * as React7 from "react";
var OWN4 = { src: 1, name: 1, alt: 1, size: 1, shape: 1, status: 1, statusLabel: 1, className: 1, children: 1 };
var AVATAR_SIZES = ["xs", "sm", "md", "lg", "xl"];
var SIZES2 = AVATAR_SIZES;
var AvatarGroupSize = React7.createContext(null);
var STATUSES = ["online", "busy", "away", "offline"];
function initials(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const first = Array.from(words[0])[0] || "";
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] || "" : "";
  return (first + last).toUpperCase();
}
var Avatar = React7.forwardRef(function Avatar2(props, ref) {
  const rest = omit(props, OWN4);
  const size = React7.useContext(AvatarGroupSize) || oneOf(SIZES2, props.size, "md");
  const square = props.shape === "square";
  const status = props.status && STATUSES.indexOf(props.status) >= 0 ? props.status : null;
  const [failedSrc, setFailedSrc] = React7.useState(null);
  const failed = failedSrc != null && failedSrc === props.src;
  const label = props.alt != null ? props.alt : props.name || "";
  const full = label && status ? label + ", " + (props.statusLabel || status) : label;
  const showImg = !!props.src && !failed;
  const text2 = initials(props.name);
  const body = showImg ? /* @__PURE__ */ React7.createElement("img", { className: "dk-avatar__img", src: props.src, alt: "", onError: () => setFailedSrc(props.src) }) : text2 ? /* @__PURE__ */ React7.createElement("span", { className: "dk-avatar__initials", "aria-hidden": "true" }, text2) : /* @__PURE__ */ React7.createElement(Icon, { className: "dk-avatar__icon", name: "person" });
  if (full) {
    rest.role = "img";
    rest["aria-label"] = full;
  } else rest["aria-hidden"] = true;
  return /* @__PURE__ */ React7.createElement(
    "span",
    {
      ...rest,
      ref,
      className: cn("dk-avatar", "dk-avatar--" + size, square && "dk-avatar--square", props.className),
      "data-component": "avatar",
      "data-size": size,
      "data-shape": square ? "square" : "circle"
    },
    /* @__PURE__ */ React7.createElement("span", { className: "dk-avatar__frame" }, body),
    status ? /* @__PURE__ */ React7.createElement("span", { className: "dk-avatar__status dk-avatar__status--" + status, "aria-hidden": "true" }) : null
  );
});
Avatar.displayName = "Avatar";

// src/components/AvatarGroup/AvatarGroup.tsx
import * as React8 from "react";
var OWN5 = { children: 1, max: 1, total: 1, size: 1, moreLabel: 1, label: 1, className: 1 };
function items(children) {
  const out = [];
  React8.Children.forEach(children, (c) => {
    if (!React8.isValidElement(c)) return;
    if (c.type === React8.Fragment) out.push(...items(c.props.children));
    else out.push(c);
  });
  return out;
}
var AvatarGroup = React8.forwardRef(function AvatarGroup2(props, ref) {
  const rest = omit(props, OWN5);
  const size = oneOf(AVATAR_SIZES, props.size, "md");
  const all = items(props.children);
  const max = props.max != null && props.max >= 0 ? Math.floor(props.max) : Infinity;
  const total = Math.max(all.length, props.total != null && props.total > 0 ? Math.floor(props.total) : 0);
  const shown = all.slice(0, max);
  const more = total - shown.length;
  const count = shown.length + (more > 0 ? 1 : 0);
  const cap = size === "xs" ? 9 : 99;
  if (props.label) rest["aria-label"] = props.label;
  return /* @__PURE__ */ React8.createElement(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      className: cn("dk-avatar-group", "dk-avatar-group--" + size, props.className),
      "data-component": "avatar-group",
      "data-size": size
    },
    /* @__PURE__ */ React8.createElement(AvatarGroupSize.Provider, { value: size }, shown.map((el, i) => {
      var _a;
      return /* @__PURE__ */ React8.createElement("span", { key: (_a = el.key) != null ? _a : i, className: "dk-avatar-group__item", style: { zIndex: count - i } }, el);
    })),
    more > 0 ? /* @__PURE__ */ React8.createElement("span", { className: "dk-avatar-group__item", style: { zIndex: 1 } }, /* @__PURE__ */ React8.createElement(
      "span",
      {
        className: "dk-avatar dk-avatar--" + size + " dk-avatar-group__more",
        role: "img",
        "aria-label": props.moreLabel ? props.moreLabel(more) : more + " more",
        "data-component": "avatar",
        "data-size": size
      },
      /* @__PURE__ */ React8.createElement("span", { className: "dk-avatar__frame" }, /* @__PURE__ */ React8.createElement("span", { className: "dk-avatar__initials", "aria-hidden": "true" }, more > cap ? cap + "+" : "+" + more))
    )) : null
  );
});
AvatarGroup.displayName = "AvatarGroup";

// src/components/Badge/Badge.tsx
import * as React9 from "react";
var VARIANTS3 = ["subtle", "solid", "outline"];
var TONES3 = ["neutral", "primary", "success", "warning", "danger", "info", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
var OWN6 = { variant: 1, tone: 1, size: 1, dot: 1, ping: 1, leftIcon: 1, count: 1, max: 1, showZero: 1, onRemove: 1, removeLabel: 1, loading: 1, loadingText: 1, className: 1, children: 1 };
var Badge = React9.forwardRef(function Badge2(props, ref) {
  const rest = omit(props, OWN6);
  const variant = oneOf(VARIANTS3, props.variant, "subtle");
  const tone = oneOf(TONES3, props.tone, "neutral");
  if (props.size != null) warnOnce("badge-size", "Badge: size was removed in 4.0.0; badges have one size (20px, text-xs). Remove the size prop.");
  const loading = !!props.loading;
  const loadingText = props.loadingText == null ? "Loading" : props.loadingText;
  React9.useEffect(function() {
    ensureAnnouncer();
  }, []);
  const wasLoading = React9.useRef(false);
  React9.useEffect(function() {
    if (loading && !wasLoading.current && loadingText) announce(loadingText);
    wasLoading.current = loading;
  }, [loading]);
  const isCount = props.count != null;
  let label = props.children;
  if (isCount) {
    const n = Math.max(0, Math.floor(Number(props.count)) || 0);
    const max = Math.max(1, Math.floor(Number(props.max)) || 99);
    if (n === 0 && !props.showZero) return null;
    label = n > max ? max + "+" : String(n);
  }
  const isLink = rest.href != null, interactive = isLink || typeof rest.onClick === "function";
  let removable = !isCount && typeof props.onRemove === "function";
  if (removable && interactive) {
    warnOnce("badge-remove-interactive", "Badge: onRemove is ignored on a badge with onClick or href (a button can't hold another button).");
    removable = false;
  }
  const hasLabel = !(label == null || label === false || label === "");
  if (!isCount && props.dot && !hasLabel && (props.leftIcon == null || props.leftIcon === false)) {
    if (interactive || typeof props.onRemove === "function") warnOnce("badge-indicator", "Badge: a dot indicator can't be clicked or removed (it's too small to target); name and handle the control it sits on.");
    delete rest.href;
    delete rest.onClick;
    delete rest.type;
    delete rest.disabled;
    delete rest.target;
    delete rest.rel;
    rest["data-component"] = "badge";
    rest["data-variant"] = "indicator";
    rest["data-tone"] = tone;
    if (rest["aria-label"] || rest["aria-labelledby"]) rest.role = rest.role || "img";
    else rest["aria-hidden"] = true;
    return /* @__PURE__ */ React9.createElement("span", { ...rest, ref, className: cn("dk-badge", "dk-badge--indicator", "dk-badge--tone-" + tone, props.ping && "dk-badge--ping", props.className) });
  }
  rest["data-component"] = "badge";
  rest["data-variant"] = variant;
  rest["data-tone"] = tone;
  if (interactive) rest["data-interactive"] = "";
  if (loading) {
    rest["aria-busy"] = true;
    rest["data-loading"] = "";
    if (interactive) {
      rest["aria-disabled"] = true;
      rest.onClick = block;
    }
  }
  const icon = !isCount && props.leftIcon != null && props.leftIcon !== false ? /* @__PURE__ */ React9.createElement("span", { className: "dk-badge__icon", "aria-hidden": true, key: "icon" }, asIcon(props.leftIcon)) : null;
  const dot = !isCount && !icon && props.dot ? /* @__PURE__ */ React9.createElement("span", { className: "dk-badge__icon dk-badge__icon--dot", "aria-hidden": true, key: "dot" }, /* @__PURE__ */ React9.createElement("span", { className: "dk-badge__dot" })) : null;
  const named = typeof label === "string" || typeof label === "number";
  const remove = removable ? /* @__PURE__ */ React9.createElement(
    "button",
    {
      type: "button",
      className: "dk-badge__remove",
      key: "remove",
      onClick: props.onRemove,
      disabled: loading || void 0,
      "aria-label": (props.removeLabel || "Remove") + (named ? " " + label : "")
    },
    /* @__PURE__ */ React9.createElement(Icon, { name: "close" })
  ) : null;
  const spin = loading ? /* @__PURE__ */ React9.createElement("span", { className: "dk-badge__loader", "aria-hidden": true, key: "loader" }, /* @__PURE__ */ React9.createElement(Loader, { label: "", delay: 0 })) : null;
  const classes = cn("dk-badge", "dk-badge--" + variant, "dk-badge--tone-" + tone, isCount && "dk-badge--count", (icon || dot) && "dk-badge--lead", dot && props.ping && "dk-badge--ping", removable && "dk-badge--removable", interactive && "dk-badge--interactive", loading && "dk-badge--loading", props.className);
  const content = [dot, icon, /* @__PURE__ */ React9.createElement("span", { className: "dk-badge__label", key: "label" }, label), remove, spin];
  if (interactive) {
    content.unshift(/* @__PURE__ */ React9.createElement("span", { className: "dk-badge__ripples", "aria-hidden": true, key: "ripples" }));
    rest.onPointerDown = chain(rest.onPointerDown, ripple);
    rest.onKeyDown = chain(rest.onKeyDown, pressKey);
    rest.onKeyUp = both(rest.onKeyUp, releaseKey);
    rest.onBlur = both(rest.onBlur, releaseKey);
  }
  if (isLink) {
    if (rest.target === "_blank" && rest.rel == null) rest.rel = "noopener noreferrer";
    delete rest.type;
    return React9.createElement(config.link, Object.assign(rest, { ref, className: classes }), ...content);
  }
  if (interactive && rest.type === void 0) rest.type = "button";
  return React9.createElement(interactive ? "button" : "span", Object.assign(rest, { ref, className: classes }), ...content);
});
Badge.displayName = "Badge";

// src/components/Breadcrumb/Breadcrumb.tsx
import * as React10 from "react";
var BreadcrumbItem = React10.forwardRef(function BreadcrumbItem2(props, ref) {
  const rest = omit(props, { icon: 1, as: 1, current: 1, className: 1, children: 1 });
  const content = /* @__PURE__ */ React10.createElement(React10.Fragment, null, props.icon ? /* @__PURE__ */ React10.createElement("span", { className: "dk-breadcrumb__icon" }, asIcon(props.icon)) : null, props.children);
  if (props.current) {
    delete rest.href;
    return /* @__PURE__ */ React10.createElement("span", { ...rest, ref, "aria-current": "page", className: cn("dk-breadcrumb__item dk-breadcrumb__item--current", props.className) }, content);
  }
  return React10.createElement(props.as || "a", Object.assign(rest, { ref, className: cn("dk-breadcrumb__item dk-breadcrumb__link", props.className) }), content);
});
BreadcrumbItem.displayName = "BreadcrumbItem";
var Breadcrumb = React10.forwardRef(function Breadcrumb2(props, ref) {
  const rest = omit(props, { separator: 1, maxItems: 1, expandLabel: 1, className: 1, children: 1 });
  const separator = oneOf(["chevron", "slash"], props.separator, "chevron");
  const [expanded, setExpanded] = React10.useState(false);
  const firstHidden = React10.useRef(null);
  const focusAfter = React10.useRef(false);
  const items3 = React10.Children.toArray(props.children).filter(React10.isValidElement);
  const max = typeof props.maxItems === "number" && props.maxItems >= 2 ? Math.floor(props.maxItems) : 0;
  const collapse = !expanded && max > 0 && items3.length > max;
  const shown = items3.map((el, i) => ({ el, i })).filter(({ i }) => !collapse || i === 0 || i >= items3.length - (max - 1));
  React10.useEffect(() => {
    if (expanded && focusAfter.current && firstHidden.current) {
      focusAfter.current = false;
      const a = firstHidden.current.querySelector("a, [tabindex], button");
      if (a) a.focus();
    }
  }, [expanded]);
  const sep = (key2) => /* @__PURE__ */ React10.createElement("li", { key: key2, className: "dk-breadcrumb__separator", "aria-hidden": "true" }, separator === "slash" ? "/" : /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(Icon, { name: "chevron_right", className: "dk-breadcrumb__ltr" }), /* @__PURE__ */ React10.createElement(Icon, { name: "chevron_left", className: "dk-breadcrumb__rtl" })));
  const out = [];
  shown.forEach(({ el, i }, n) => {
    if (n > 0) out.push(sep("s" + i));
    if (collapse && n === 1) {
      out.push(/* @__PURE__ */ React10.createElement("li", { key: "more", className: "dk-breadcrumb__li" }, /* @__PURE__ */ React10.createElement(
        "button",
        {
          type: "button",
          className: "dk-breadcrumb__item dk-breadcrumb__more",
          "aria-label": props.expandLabel || "Show the hidden pages",
          onClick: () => {
            focusAfter.current = true;
            setExpanded(true);
          }
        },
        "\u2026"
      )), sep("s-more"));
    }
    const last = i === items3.length - 1;
    out.push(/* @__PURE__ */ React10.createElement("li", { key: el.key != null ? el.key : i, className: "dk-breadcrumb__li", ref: expanded && max > 0 && i === 1 ? firstHidden : void 0 }, React10.cloneElement(el, { current: last || el.props.current })));
  });
  return /* @__PURE__ */ React10.createElement("nav", { "aria-label": "Breadcrumb", ...rest, ref, "data-component": "breadcrumb", className: cn("dk-breadcrumb", props.className) }, /* @__PURE__ */ React10.createElement("ol", { className: "dk-breadcrumb__list" }, out));
});
Breadcrumb.displayName = "Breadcrumb";

// src/components/ButtonGroup/ButtonGroup.tsx
import * as React11 from "react";
var ButtonGroup = React11.forwardRef(function ButtonGroup2(props, ref) {
  const rest = omit(props, { attached: 1, orientation: 1, className: 1 });
  const vertical = oneOf(["horizontal", "vertical"], props.orientation, "horizontal") === "vertical";
  return /* @__PURE__ */ React11.createElement(
    "div",
    {
      role: "group",
      ...rest,
      ref,
      "data-component": "button-group",
      "data-orientation": vertical ? "vertical" : "horizontal",
      className: cn("dk-button-group", vertical && "dk-button-group--vertical", props.attached !== false && "dk-button-group--attached", props.className)
    }
  );
});
ButtonGroup.displayName = "ButtonGroup";

// src/components/Carousel/Carousel.tsx
import * as React13 from "react";

// src/components/IconButton/IconButton.tsx
import * as React12 from "react";
var IconButton = React12.forwardRef(function IconButton2(props, ref) {
  const { icon, label, shape, noTitle, className, ...rest } = props;
  const round = shape === "round";
  const title = !noTitle && rest.title == null ? label : rest.title;
  return /* @__PURE__ */ React12.createElement(
    ButtonBase,
    {
      variant: "ghost",
      ...rest,
      "aria-label": label,
      "data-shape": round ? "round" : "square",
      title,
      ref,
      icon,
      className: cn("dk-icon-btn", round && "dk-icon-btn--round", className)
    }
  );
});
IconButton.displayName = "IconButton";

// src/components/Carousel/Carousel.tsx
var OWN7 = { children: 1, label: 1, index: 1, defaultIndex: 1, onIndexChange: 1, loop: 1, arrows: 1, dots: 1, previousLabel: 1, nextLabel: 1, slideLabel: 1, className: 1, style: 1 };
var SWIPE = 40;
var Carousel = React13.forwardRef(function Carousel2(props, ref) {
  const rest = omit(props, OWN7);
  const slides = React13.Children.toArray(props.children);
  const count = slides.length;
  const clamp = (i) => Math.min(Math.max(0, Math.floor(i) || 0), Math.max(0, count - 1));
  const [own, setOwn] = React13.useState(() => props.defaultIndex || 0);
  const controlled = props.index != null;
  const index = clamp(controlled ? props.index : own);
  const loop = !!props.loop && count > 1;
  const name = props.slideLabel || ((i, n) => i + 1 + " of " + n);
  const dotsRef = React13.useRef(null);
  const viewport = React13.useRef(null);
  const drag = React13.useRef(null);
  const [offset, setOffset] = React13.useState(0);
  const dragged = React13.useRef(false);
  const prevBtn = React13.useRef(null), nextBtn = React13.useRef(null);
  const refocus = React13.useRef(null);
  const go = (i) => {
    const next2 = loop ? (i % count + count) % count : clamp(i);
    if (next2 === index) return;
    if (!controlled) setOwn(next2);
    if (props.onIndexChange) props.onIndexChange(next2);
  };
  const rtl = () => !!viewport.current && getComputedStyle(viewport.current).direction === "rtl";
  const [dir, setDir] = React13.useState("ltr");
  useIsoLayoutEffect(() => {
    const d = rtl() ? "rtl" : "ltr";
    if (d !== dir) setDir(d);
  });
  const onDotsKey = (e) => {
    const back = rtl() ? "ArrowRight" : "ArrowLeft", fwd = rtl() ? "ArrowLeft" : "ArrowRight";
    let to = -1;
    if (e.key === back) to = loop ? index - 1 : Math.max(0, index - 1);
    else if (e.key === fwd) to = loop ? index + 1 : Math.min(count - 1, index + 1);
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = count - 1;
    else return;
    e.preventDefault();
    to = (to % count + count) % count;
    refocus.current = "dot";
    go(to);
  };
  const arrow = (step) => {
    const to = index + step;
    if (!loop && (to <= 0 || to >= count - 1)) refocus.current = step > 0 ? "prev" : "next";
    go(to);
  };
  useIsoLayoutEffect(() => {
    var _a, _b, _c;
    const r = refocus.current;
    refocus.current = null;
    if (r === "dot") (_b = (_a = dotsRef.current) == null ? void 0 : _a.children[index]) == null ? void 0 : _b.focus();
    else if (r && (document.activeElement === prevBtn.current || document.activeElement === nextBtn.current || document.activeElement === document.body)) (_c = (r === "prev" ? prevBtn : nextBtn).current) == null ? void 0 : _c.focus();
  });
  const onPointerDown = (e) => {
    if (count < 2 || e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    dragged.current = false;
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (offset === 0 && Math.abs(dx) < 8) return;
    if (offset === 0 && Math.abs(e.clientY - d.y) > Math.abs(dx)) {
      drag.current = null;
      return;
    }
    if (offset === 0 && viewport.current) try {
      viewport.current.setPointerCapture(e.pointerId);
    } catch {
    }
    dragged.current = true;
    setOffset(dx);
  };
  const onPointerEnd = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const dx = e.clientX - d.x;
    setOffset(0);
    if (Math.abs(dx) >= SWIPE) go(index + (dx < 0 !== rtl() ? 1 : -1));
  };
  const onPointerCancel = (e) => {
    if (drag.current && drag.current.id === e.pointerId) {
      drag.current = null;
      dragged.current = false;
      setOffset(0);
    }
  };
  const onPointerLeave = (e) => {
    if (offset === 0) onPointerCancel(e);
  };
  const style = { ...props.style, "--dk-carousel-index": index, "--dk-carousel-drag": offset + "px" };
  const track = React13.useRef(null);
  useIsoLayoutEffect(() => {
    if (track.current) Array.from(track.current.children).forEach((el, i) => {
      el.inert = i !== index;
    });
  }, [index, count]);
  const prevOff = !loop && index === 0, nextOff = !loop && index >= count - 1;
  return /* @__PURE__ */ React13.createElement(
    "section",
    {
      ...rest,
      ref,
      className: cn("dk-carousel", props.className),
      style,
      "aria-roledescription": "carousel",
      "aria-label": props.label,
      "data-component": "carousel",
      "data-index": index,
      "data-dir": dir
    },
    /* @__PURE__ */ React13.createElement(
      "div",
      {
        className: "dk-carousel__viewport",
        ref: viewport,
        onPointerDown,
        onPointerMove,
        onPointerUp: onPointerEnd,
        onPointerCancel,
        onPointerLeave,
        onDragStart: (e) => e.preventDefault(),
        onClickCapture: (e) => {
          if (dragged.current && e.detail) {
            dragged.current = false;
            e.preventDefault();
            e.stopPropagation();
          }
        },
        "data-dragging": offset ? "" : void 0
      },
      /* @__PURE__ */ React13.createElement("div", { className: "dk-carousel__track", ref: track, "aria-live": "polite" }, slides.map((s, i) => {
        var _a;
        return /* @__PURE__ */ React13.createElement(
          "div",
          {
            key: (_a = s.key) != null ? _a : i,
            className: "dk-carousel__slide",
            role: "group",
            "aria-roledescription": "slide",
            "aria-label": name(i, count),
            "aria-hidden": i === index ? void 0 : true,
            "data-active": i === index ? "" : void 0
          },
          s
        );
      })),
      props.arrows !== false && count > 1 ? /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement(
        IconButton,
        {
          className: "dk-carousel__arrow dk-carousel__arrow--prev",
          label: props.previousLabel || "Previous slide",
          size: "sm",
          variant: "secondary",
          shape: "round",
          noTitle: true,
          icon: /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement(Icon, { name: "chevron_left", className: "dk-carousel__ltr" }), /* @__PURE__ */ React13.createElement(Icon, { name: "chevron_right", className: "dk-carousel__rtl" })),
          ref: prevBtn,
          disabled: prevOff,
          onClick: () => arrow(-1)
        }
      ), /* @__PURE__ */ React13.createElement(
        IconButton,
        {
          className: "dk-carousel__arrow dk-carousel__arrow--next",
          label: props.nextLabel || "Next slide",
          size: "sm",
          variant: "secondary",
          shape: "round",
          noTitle: true,
          icon: /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement(Icon, { name: "chevron_right", className: "dk-carousel__ltr" }), /* @__PURE__ */ React13.createElement(Icon, { name: "chevron_left", className: "dk-carousel__rtl" })),
          ref: nextBtn,
          disabled: nextOff,
          onClick: () => arrow(1)
        }
      )) : null
    ),
    props.dots !== false && count > 1 ? /* @__PURE__ */ React13.createElement("div", { className: "dk-carousel__dots", ref: dotsRef, onKeyDown: onDotsKey }, slides.map((_, i) => /* @__PURE__ */ React13.createElement(
      "button",
      {
        key: i,
        type: "button",
        className: "dk-carousel__dot",
        "aria-label": name(i, count),
        "aria-current": i === index ? "true" : void 0,
        tabIndex: i === index ? 0 : -1,
        onClick: () => go(i)
      }
    ))) : null
  );
});
Carousel.displayName = "Carousel";

// src/components/Calendar/Calendar.tsx
import * as React14 from "react";

// src/internal/dates.ts
var day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
function addMonths(d, n) {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), last));
}
var sameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
var sameMonth = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
var startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
var startOfWeek = (d, weekStartsOn) => addDays(d, -((d.getDay() - weekStartsOn + 7) % 7));
var compare = (a, b) => day(a).getTime() - day(b).getTime();
var isValid = (d) => d instanceof Date && !isNaN(d.getTime());
var isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
var SUNDAY_FIRST = /^(AG|AS|BD|BR|BS|BT|BW|BZ|CA|CO|DM|DO|ET|GT|GU|HK|HN|ID|IL|IN|JM|JP|KE|KH|KR|LA|MH|MM|MO|MT|MX|MZ|NI|NP|PA|PE|PH|PK|PR|PT|PY|SA|SG|SV|TH|TT|TW|UM|US|VE|VI|WS|YE|ZA|ZW)$/;
var SATURDAY_FIRST = /^(AF|BH|DJ|DZ|EG|IQ|IR|JO|KW|LY|OM|QA|SD|SY)$/;
function firstDayOfWeek(locale) {
  try {
    const l = new Intl.Locale(locale || new Intl.DateTimeFormat().resolvedOptions().locale);
    const info = typeof l.getWeekInfo === "function" ? l.getWeekInfo() : l.weekInfo;
    if (info && info.firstDay) return info.firstDay % 7;
    const region = l.region || (typeof l.maximize === "function" ? l.maximize().region : void 0);
    if (region) return SUNDAY_FIRST.test(region) ? 0 : SATURDAY_FIRST.test(region) ? 6 : region === "MV" ? 5 : 1;
  } catch {
  }
  return 0;
}
function dateOrder(locale) {
  const parts = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(2001, 10, 22));
  return parts.filter((p) => p.type === "day" || p.type === "month" || p.type === "year").map((p) => p.type);
}
function parseDate(text2, locale) {
  const nums = text2.trim().split(/[^0-9]+/).filter(Boolean);
  if (nums.length !== 3) return null;
  const order = /^\d{4}$/.test(nums[0]) ? ["year", "month", "day"] : dateOrder(locale);
  const v = {};
  order.forEach((k, i) => {
    v[k] = Number(nums[i]);
  });
  if (v.year < 100) v.year += 2e3;
  const d = new Date(v.year, v.month - 1, v.day);
  return d.getFullYear() === v.year && d.getMonth() === v.month - 1 && d.getDate() === v.day ? d : null;
}
var formatDate = (d, locale) => new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
function datePattern(locale) {
  const parts = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(2001, 10, 22));
  return parts.map((p) => p.type === "day" ? "dd" : p.type === "month" ? "mm" : p.type === "year" ? "yyyy" : p.value).join("");
}

// src/components/Calendar/Calendar.tsx
var OWN8 = { value: 1, defaultValue: 1, onValueChange: 1, month: 1, defaultMonth: 1, onMonthChange: 1, min: 1, max: 1, isDateDisabled: 1, locale: 1, weekStartsOn: 1, autoFocus: 1, previousLabel: 1, nextLabel: 1, dayClassName: 1, isDateSelected: 1, onDayHover: 1, hideOutside: 1, className: 1 };
var Calendar = React14.forwardRef(function Calendar2(props, ref) {
  const rest = omit(props, OWN8);
  const locale = props.locale;
  const ws = props.weekStartsOn != null ? (Math.floor(props.weekStartsOn) % 7 + 7) % 7 : firstDayOfWeek(locale);
  const controlledValue = props.value !== void 0;
  const [ownValue, setOwnValue] = React14.useState(isValid(props.defaultValue) ? day(props.defaultValue) : null);
  const value = controlledValue ? isValid(props.value) ? day(props.value) : null : ownValue;
  const today = day(/* @__PURE__ */ new Date());
  const controlledMonth = props.month !== void 0;
  const [ownMonth, setOwnMonth] = React14.useState(() => startOfMonth(props.defaultMonth || value || today));
  const month = controlledMonth && isValid(props.month) ? startOfMonth(props.month) : ownMonth;
  const [focus, setFocus] = React14.useState(() => value && sameMonth(value, month) ? value : sameMonth(today, month) ? today : month);
  const grid = React14.useRef(null);
  const wantFocus = React14.useRef(!!props.autoFocus);
  const disabled = (d) => props.min && compare(d, props.min) < 0 || props.max && compare(d, props.max) > 0 || (props.isDateDisabled ? props.isDateDisabled(d) : false);
  const showMonth = (m) => {
    const s = startOfMonth(m);
    if (!controlledMonth) setOwnMonth(s);
    if (props.onMonthChange) props.onMonthChange(s);
  };
  React14.useEffect(() => {
    if (!sameMonth(focus, month)) setFocus(value && sameMonth(value, month) ? value : sameMonth(today, month) ? today : month);
  }, [month.getTime()]);
  React14.useEffect(() => {
    if (!wantFocus.current || !grid.current) return;
    wantFocus.current = false;
    const b = grid.current.querySelector('button[tabindex="0"]');
    if (b) b.focus();
  });
  const move = (d) => {
    setFocus(d);
    if (!sameMonth(d, month)) showMonth(d);
    wantFocus.current = true;
  };
  const pick2 = (d) => {
    if (disabled(d)) return;
    if (!controlledValue) setOwnValue(d);
    if (props.onValueChange) props.onValueChange(d);
    if (!sameMonth(d, month)) showMonth(d);
    setFocus(d);
  };
  const onKeyDown = (e) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    let n = null;
    switch (e.key) {
      case "ArrowLeft":
        n = addDays(focus, rtl ? 1 : -1);
        break;
      case "ArrowRight":
        n = addDays(focus, rtl ? -1 : 1);
        break;
      case "ArrowUp":
        n = addDays(focus, -7);
        break;
      case "ArrowDown":
        n = addDays(focus, 7);
        break;
      case "Home":
        n = startOfWeek(focus, ws);
        break;
      case "End":
        n = addDays(startOfWeek(focus, ws), 6);
        break;
      case "PageUp":
        n = addMonths(focus, e.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        n = addMonths(focus, e.shiftKey ? 12 : 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick2(focus);
        return;
      default:
        return;
    }
    e.preventDefault();
    move(n);
  };
  const first = startOfWeek(month, ws);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let i = 0; i < 7; i++) row.push(addDays(first, w * 7 + i));
    weeks.push(row);
  }
  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month);
  const short = new Intl.DateTimeFormat(locale, { weekday: "short" }), long = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const full = new Intl.DateTimeFormat(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const titleId = domId("dk-cal", React14.useId()) + "-title";
  const selected = (d) => props.isDateSelected ? props.isDateSelected(d) : sameDay(d, value);
  return /* @__PURE__ */ React14.createElement("div", { ...rest, ref, className: cn("dk-calendar", props.className), "data-component": "calendar" }, /* @__PURE__ */ React14.createElement("div", { className: "dk-calendar__header" }, /* @__PURE__ */ React14.createElement(
    IconButton,
    {
      icon: /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement(Icon, { name: "chevron_left", className: "dk-calendar__ltr" }), /* @__PURE__ */ React14.createElement(Icon, { name: "chevron_right", className: "dk-calendar__rtl" })),
      className: "dk-calendar__nav dk-calendar__nav--prev",
      label: props.previousLabel || "Previous month",
      size: "sm",
      variant: "ghost",
      noTitle: true,
      disabled: !!props.min && compare(addDays(month, -1), props.min) < 0,
      onClick: () => showMonth(addMonths(month, -1))
    }
  ), /* @__PURE__ */ React14.createElement("h2", { className: "dk-calendar__title", id: titleId, "aria-live": "polite" }, title), /* @__PURE__ */ React14.createElement(
    IconButton,
    {
      icon: /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement(Icon, { name: "chevron_right", className: "dk-calendar__ltr" }), /* @__PURE__ */ React14.createElement(Icon, { name: "chevron_left", className: "dk-calendar__rtl" })),
      className: "dk-calendar__nav dk-calendar__nav--next",
      label: props.nextLabel || "Next month",
      size: "sm",
      variant: "ghost",
      noTitle: true,
      disabled: !!props.max && compare(addMonths(month, 1), props.max) > 0,
      onClick: () => showMonth(addMonths(month, 1))
    }
  )), /* @__PURE__ */ React14.createElement("table", { ref: grid, className: "dk-calendar__grid", role: "grid", "aria-labelledby": titleId, onKeyDown }, /* @__PURE__ */ React14.createElement("thead", null, /* @__PURE__ */ React14.createElement("tr", null, weeks[0].map((d) => /* @__PURE__ */ React14.createElement("th", { key: d.getDay(), scope: "col", abbr: long.format(d) }, /* @__PURE__ */ React14.createElement("span", { "aria-hidden": true }, short.format(d)))))), /* @__PURE__ */ React14.createElement("tbody", null, weeks.map((row, w) => /* @__PURE__ */ React14.createElement("tr", { key: w }, row.map((d) => {
    const off = !!disabled(d), sel = selected(d), outside = !sameMonth(d, month);
    if (outside && props.hideOutside) return /* @__PURE__ */ React14.createElement("td", { key: d.getTime(), role: "gridcell", className: "dk-calendar__blank" });
    return /* @__PURE__ */ React14.createElement("td", { key: d.getTime(), "aria-selected": sel, role: "gridcell" }, /* @__PURE__ */ React14.createElement(
      "button",
      {
        type: "button",
        tabIndex: sameDay(d, focus) ? 0 : -1,
        "aria-label": full.format(d),
        "aria-disabled": off || void 0,
        "aria-current": sameDay(d, today) ? "date" : void 0,
        className: cn("dk-calendar__day", outside && "dk-calendar__day--outside", sel && "dk-calendar__day--selected", sameDay(d, today) && "dk-calendar__day--today", off && "dk-calendar__day--disabled", props.dayClassName && props.dayClassName(d)),
        "data-date": d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"),
        onClick: () => pick2(d),
        onFocus: () => {
          if (!sameDay(d, focus)) setFocus(d);
          if (props.onDayHover) props.onDayHover(d);
        },
        onMouseEnter: props.onDayHover ? () => props.onDayHover(d) : void 0
      },
      d.getDate()
    ));
  }))))));
});
Calendar.displayName = "Calendar";

// src/components/Card/Card.tsx
import * as React15 from "react";
var OWN9 = { variant: 1, padding: 1, as: 1, className: 1 };
var VARIANTS4 = ["outline", "elevated", "filled"];
var PADDINGS = ["none", "sm", "md", "lg"];
var TAGS = ["div", "section", "article", "li"];
var Card = React15.forwardRef(function Card2(props, ref) {
  const rest = omit(props, OWN9);
  const variant = oneOf(VARIANTS4, props.variant, "outline");
  const padding = oneOf(PADDINGS, props.padding, "md");
  const isLink = rest.href != null;
  if (isLink && rest.target === "_blank" && rest.rel == null) rest.rel = "noopener noreferrer";
  const cls = cn("dk-card", variant !== "outline" && "dk-card--" + variant, padding !== "md" && "dk-card--padding-" + padding, isLink && "dk-card--link", props.className);
  return React15.createElement(
    isLink ? config.link : oneOf(TAGS, props.as, "div"),
    Object.assign(rest, { ref, className: cls, "data-component": "card", "data-variant": variant })
  );
});
Card.displayName = "Card";
var CardHeader = React15.forwardRef(function CardHeader2(props, ref) {
  const rest = omit(props, { title: 1, description: 1, action: 1, headingLevel: 1, className: 1, children: 1 });
  const level = [2, 3, 4, 5, 6].indexOf(props.headingLevel) < 0 ? 3 : props.headingLevel;
  const has = (n) => n != null && n !== false && n !== "";
  return /* @__PURE__ */ React15.createElement("div", { ...rest, ref, className: cn("dk-card__header", props.className) }, /* @__PURE__ */ React15.createElement("div", { className: "dk-card__heading" }, has(props.title) ? React15.createElement("h" + level, { className: "dk-card__title" }, props.title) : null, has(props.description) ? /* @__PURE__ */ React15.createElement("p", { className: "dk-card__description" }, props.description) : null, props.children), has(props.action) ? /* @__PURE__ */ React15.createElement("div", { className: "dk-card__action" }, props.action) : null);
});
CardHeader.displayName = "CardHeader";
var CardBody = React15.forwardRef(function CardBody2(props, ref) {
  return /* @__PURE__ */ React15.createElement("div", { ...props, ref, className: cn("dk-card__body", props.className) });
});
CardBody.displayName = "CardBody";
var CardFooter = React15.forwardRef(function CardFooter2(props, ref) {
  const rest = omit(props, { justify: 1, className: 1 });
  const j = oneOf(["start", "end", "between"], props.justify, "end");
  return /* @__PURE__ */ React15.createElement("div", { ...rest, ref, className: cn("dk-card__footer", j !== "end" && "dk-card__footer--" + j, props.className) });
});
CardFooter.displayName = "CardFooter";

// src/components/Checkbox/Checkbox.tsx
import * as React16 from "react";
var OWN10 = { size: 1, invalid: 1, indeterminate: 1, description: 1, children: 1, className: 1, style: 1, type: 1 };
var Checkbox = React16.forwardRef(function Checkbox2(props, ref) {
  const rest = omit(props, OWN10);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const mixed = !!props.indeterminate;
  const own = React16.useRef(null);
  const setRefs = React16.useCallback(function(node) {
    own.current = node;
    setRef(ref, node);
  }, [ref]);
  useIsoLayoutEffect(function() {
    if (own.current) own.current.indeterminate = mixed;
  });
  const base = domId("dk-cb", React16.useId()), labelId = base + "-label", descId = base + "-desc";
  const hasLabel = props.children != null && props.children !== false && props.children !== "";
  const hasDesc = props.description != null && props.description !== false && props.description !== "";
  if (hasDesc) rest["aria-describedby"] = cn(rest["aria-describedby"], descId);
  if (hasDesc && hasLabel && rest["aria-label"] == null && rest["aria-labelledby"] == null) rest["aria-labelledby"] = labelId;
  return /* @__PURE__ */ React16.createElement("label", { className: cn("dk-checkbox", "dk-checkbox--size-" + size, invalid && "dk-checkbox--invalid", rest.disabled && "dk-checkbox--disabled", !hasLabel && !hasDesc && "dk-checkbox--bare", props.className), style: props.style, "data-component": "checkbox", "data-size": size }, /* @__PURE__ */ React16.createElement("span", { className: "dk-checkbox__control", key: "control" }, /* @__PURE__ */ React16.createElement("input", { ...rest, ref: setRefs, type: "checkbox", className: "dk-checkbox__input", key: "input" }), /* @__PURE__ */ React16.createElement("span", { className: "dk-checkbox__icon", "aria-hidden": true, key: "icon" }, /* @__PURE__ */ React16.createElement(Icon, { name: mixed ? "remove" : "check" }))), hasLabel || hasDesc ? /* @__PURE__ */ React16.createElement("span", { className: "dk-checkbox__text", key: "text" }, hasLabel ? /* @__PURE__ */ React16.createElement("span", { className: "dk-checkbox__label", id: labelId, key: "label" }, props.children) : null, hasDesc ? /* @__PURE__ */ React16.createElement("span", { className: "dk-checkbox__description", id: descId, key: "desc" }, props.description) : null) : null);
});
Checkbox.displayName = "Checkbox";

// src/components/Combobox/Combobox.tsx
import * as React17 from "react";

// src/internal/position.ts
var OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };
function parsePlacement(p, fallback) {
  const m = /^(top|bottom|left|right)(?:-(start|end))?$/.exec(p || "") || /^(top|bottom|left|right)(?:-(start|end))?$/.exec(fallback);
  return [m[1], m[2] || "center"];
}
function place(anchor, floating, placement, offset, fallback = "top", margin = 8) {
  const vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
  const parsed = parsePlacement(placement, fallback), align = parsed[1];
  let side = parsed[0];
  const rtl = getComputedStyle(document.documentElement).direction === "rtl";
  const room = (s) => s === "top" ? anchor.top - offset - floating.height >= margin : s === "bottom" ? anchor.bottom + offset + floating.height <= vh - margin : s === "left" ? anchor.left - offset - floating.width >= margin : anchor.right + offset + floating.width <= vw - margin;
  if (!room(side) && room(OPPOSITE[side])) side = OPPOSITE[side];
  let x, y;
  if (side === "top" || side === "bottom") {
    y = side === "top" ? anchor.top - offset - floating.height : anchor.bottom + offset;
    const start = rtl ? anchor.right - floating.width : anchor.left, end = rtl ? anchor.left : anchor.right - floating.width;
    x = align === "start" ? start : align === "end" ? end : anchor.left + (anchor.width - floating.width) / 2;
    x = Math.min(Math.max(x, margin), Math.max(margin, vw - margin - floating.width));
  } else {
    x = side === "left" ? anchor.left - offset - floating.width : anchor.right + offset;
    y = align === "start" ? anchor.top : align === "end" ? anchor.bottom - floating.height : anchor.top + (anchor.height - floating.height) / 2;
    y = Math.min(Math.max(y, margin), Math.max(margin, vh - margin - floating.height));
  }
  return { x: Math.round(x), y: Math.round(y), side };
}
function showLayer(el) {
  if (!el) return;
  if (typeof el.showPopover === "function" && el.hasAttribute("popover")) {
    try {
      if (!el.matches(":popover-open")) el.showPopover();
    } catch {
    }
  }
}
function hideLayer(el) {
  if (!el) return;
  if (typeof el.hidePopover === "function" && el.hasAttribute("popover")) {
    try {
      if (el.matches(":popover-open")) el.hidePopover();
    } catch {
    }
  }
}
function cssLength(el, prop) {
  const v = getComputedStyle(el).getPropertyValue(prop).trim(), n = parseFloat(v);
  if (isNaN(n)) return 0;
  if (/rem$/.test(v)) return n * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  if (/em$/.test(v)) return n * (parseFloat(getComputedStyle(el).fontSize) || 16);
  return n;
}

// src/components/Combobox/Combobox.tsx
var plain = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
var Combobox = React17.forwardRef(function Combobox2(props, ref) {
  var _a, _b, _c;
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, className: 1, style: 1, options: 1, value: 1, defaultValue: 1, onValueChange: 1, onInputChange: 1, filter: 1, clearable: 1, loading: 1, emptyText: 1, loadingText: 1, toggleLabel: 1, clearLabel: 1, name: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const base = domId("dk-cbx", React17.useId());
  const opts = (props.options || []).map((o, i) => {
    var _a2;
    return typeof o === "string" ? { value: o, label: o, i } : { value: String(o.value), label: String((_a2 = o.label) != null ? _a2 : o.value), description: o.description, disabled: !!o.disabled, i };
  });
  const controlled = props.value !== void 0;
  const [ownValue, setOwnValue] = React17.useState((_a = props.defaultValue) != null ? _a : null);
  const value = controlled ? (_b = props.value) != null ? _b : null : ownValue;
  const selected = opts.find((o) => o.value === value) || null;
  const [text2, setText] = React17.useState(selected ? selected.label : "");
  const [typed, setTyped] = React17.useState(false);
  const [open, setOpen] = React17.useState(false);
  const [active, setActive] = React17.useState(-1);
  const box = React17.useRef(null);
  const input = React17.useRef(null);
  const pop = React17.useRef(null);
  const locked = !!rest.disabled || !!rest.readOnly;
  React17.useEffect(() => {
    if (!open || !typed) setText(selected ? selected.label : "");
  }, [value, selected && selected.label]);
  const matches = (o) => {
    if (!typed || props.filter === false) return true;
    if (typeof props.filter === "function") return props.filter({ value: o.value, label: o.label }, text2);
    return plain(o.label).includes(plain(text2.trim()));
  };
  const shown = opts.filter(matches);
  const usable = shown.filter((o) => !o.disabled);
  const commit = (v) => {
    if (!controlled) setOwnValue(v);
    if (v !== value && props.onValueChange) props.onValueChange(v);
  };
  const show = (to) => {
    if (locked) return;
    setOpen(true);
    const list = opts.filter((o) => !o.disabled);
    const sel = selected && !selected.disabled ? selected.i : -1;
    setActive(to === "last" ? sel >= 0 ? sel : list.length ? list[list.length - 1].i : -1 : to === "first" ? sel >= 0 ? sel : list.length ? list[0].i : -1 : sel);
  };
  const hide = (revert = true) => {
    setOpen(false);
    setActive(-1);
    setTyped(false);
    if (revert) setText(selected ? selected.label : "");
  };
  const pick2 = (o) => {
    if (o.disabled) return;
    commit(o.value);
    setText(o.label);
    setOpen(false);
    setActive(-1);
    setTyped(false);
    if (props.onInputChange && o.label !== text2) props.onInputChange(o.label);
  };
  const move = (by) => {
    if (!usable.length) return;
    const i = usable.findIndex((o) => o.i === active);
    const n = i < 0 ? by > 0 ? 0 : usable.length - 1 : (i + by + usable.length) % usable.length;
    setActive(usable[n].i);
  };
  const onChange = (e) => {
    const t = e.target.value;
    setText(t);
    setTyped(true);
    if (!locked) setOpen(true);
    const first = opts.filter((o) => !o.disabled && (props.filter === false || (typeof props.filter === "function" ? props.filter({ value: o.value, label: o.label }, t) : plain(o.label).includes(plain(t.trim())))))[0];
    setActive(t.trim() && first ? first.i : -1);
    if (props.onInputChange) props.onInputChange(t);
  };
  const onKeyDown = (e) => {
    if (rest.onKeyDown) rest.onKeyDown(e);
    if (e.defaultPrevented || locked) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) show(e.altKey ? "selected" : "first");
      else move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) show("last");
      else move(-1);
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      const o = opts[active];
      if (o && shown.includes(o)) pick2(o);
      else hide();
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      hide();
    } else if ((e.key === "PageDown" || e.key === "PageUp") && open) {
      e.preventDefault();
      if (usable.length) setActive(usable[e.key === "PageDown" ? usable.length - 1 : 0].i);
    }
  };
  const onBlur = (e) => {
    if (rest.onBlur) rest.onBlur(e);
    if (text2.trim() === "" && value != null) {
      commit(null);
      setOpen(false);
      setActive(-1);
      setTyped(false);
      setText("");
    } else hide();
  };
  const clear = () => {
    commit(null);
    setText("");
    setTyped(false);
    setActive(-1);
    if (props.onInputChange) props.onInputChange("");
    if (input.current) input.current.focus();
  };
  useIsoLayoutEffect(() => {
    const p = pop.current, b = box.current;
    if (!p) return;
    if (!open || !b) {
      hideLayer(p);
      return;
    }
    showLayer(p);
    const update = () => {
      p.style.minWidth = b.offsetWidth + "px";
      const r = place(b.getBoundingClientRect(), { width: p.offsetWidth, height: p.offsetHeight }, "bottom-start", cssLength(p, "--dk-combobox-offset"), "bottom-start");
      p.style.left = r.x + "px";
      p.style.top = r.y + "px";
      p.dataset.side = r.side;
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(p);
      ro.observe(b);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  React17.useEffect(() => {
    if (!open || active < 0 || !pop.current) return;
    const el = pop.current.querySelector("#" + base + "-opt-" + active);
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  }, [active, open]);
  const left = asIcon(props.leftIcon);
  const keep = (e) => e.preventDefault();
  const listId = base + "-list";
  const activeShown = active >= 0 && shown.some((o) => o.i === active);
  return /* @__PURE__ */ React17.createElement(
    "span",
    {
      ref: box,
      className: cn("dk-input dk-combobox", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className),
      style: props.style,
      "data-component": "combobox",
      "data-size": size,
      "data-state": open ? "open" : "closed"
    },
    left != null && left !== false ? /* @__PURE__ */ React17.createElement("span", { className: "dk-input__icon dk-input__icon--left", "aria-hidden": true }, left) : null,
    /* @__PURE__ */ React17.createElement(
      "input",
      {
        ...rest,
        ref: (n) => {
          input.current = n;
          if (typeof ref === "function") ref(n);
          else if (ref) ref.current = n;
        },
        type: "text",
        role: "combobox",
        "aria-expanded": open,
        "aria-controls": listId,
        "aria-autocomplete": "list",
        "aria-haspopup": "listbox",
        "aria-activedescendant": open && activeShown ? base + "-opt-" + active : void 0,
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        className: "dk-input__field",
        value: text2,
        onChange,
        onKeyDown,
        onBlur,
        onClick: (e) => {
          if (rest.onClick) rest.onClick(e);
          if (!open) show("selected");
        }
      }
    ),
    props.clearable && value != null && !locked ? /* @__PURE__ */ React17.createElement("button", { type: "button", tabIndex: -1, className: "dk-combobox__button dk-combobox__clear", "aria-label": props.clearLabel || "Clear", onMouseDown: keep, onClick: clear }, /* @__PURE__ */ React17.createElement(Icon, { name: "close" })) : null,
    /* @__PURE__ */ React17.createElement(
      "button",
      {
        type: "button",
        tabIndex: -1,
        className: "dk-combobox__button dk-combobox__toggle",
        "aria-label": props.toggleLabel || "Show options",
        "aria-expanded": open,
        "aria-controls": listId,
        disabled: locked,
        onMouseDown: keep,
        onClick: () => {
          if (open) hide();
          else show("selected");
          if (input.current) input.current.focus();
        }
      },
      /* @__PURE__ */ React17.createElement(Icon, { name: "expand_more" })
    ),
    /* @__PURE__ */ React17.createElement("div", { ref: pop, className: "dk-combobox__popup", ...{ popover: "manual" }, hidden: !open || void 0, onMouseDown: keep }, props.loading ? /* @__PURE__ */ React17.createElement("div", { className: "dk-combobox__message", role: "status" }, /* @__PURE__ */ React17.createElement(Loader, { size: "sm", delay: 0, label: "" }), props.loadingText || "Loading\u2026") : null, /* @__PURE__ */ React17.createElement("div", { id: listId, role: "listbox", className: "dk-combobox__listbox", "aria-labelledby": rest["aria-labelledby"], "aria-label": rest["aria-labelledby"] ? void 0 : rest["aria-label"] }, shown.map((o) => /* @__PURE__ */ React17.createElement(
      "div",
      {
        key: o.value,
        id: base + "-opt-" + o.i,
        role: "option",
        "aria-selected": o.value === value,
        "aria-disabled": o.disabled || void 0,
        className: cn("dk-combobox__option", o.i === active && "dk-combobox__option--active", o.value === value && "dk-combobox__option--selected"),
        onMouseMove: () => {
          if (!o.disabled && active !== o.i) setActive(o.i);
        },
        onClick: () => pick2(o)
      },
      /* @__PURE__ */ React17.createElement("span", { className: "dk-combobox__text" }, /* @__PURE__ */ React17.createElement("span", { className: "dk-combobox__label" }, o.label), o.description != null && o.description !== "" ? /* @__PURE__ */ React17.createElement("span", { className: "dk-combobox__description" }, o.description) : null),
      o.value === value ? /* @__PURE__ */ React17.createElement(Icon, { name: "check", className: "dk-combobox__check" }) : null
    ))), !props.loading && shown.length === 0 ? /* @__PURE__ */ React17.createElement("div", { className: "dk-combobox__message", role: "status" }, (_c = props.emptyText) != null ? _c : "No results") : null),
    props.name ? /* @__PURE__ */ React17.createElement("input", { type: "hidden", name: props.name, value: value != null ? value : "", disabled: rest.disabled }) : null
  );
});
Combobox.displayName = "Combobox";

// src/components/Container/Container.tsx
import * as React18 from "react";
var SIZES3 = ["prose", "md", "lg", "xl", "2xl", "full"];
var TAGS2 = ["div", "main", "section", "header", "footer", "article"];
var Container = React18.forwardRef(function Container2(props, ref) {
  const rest = omit(props, { size: 1, padded: 1, as: 1, className: 1 });
  const size = oneOf(SIZES3, props.size, "xl");
  return React18.createElement(oneOf(TAGS2, props.as, "div"), Object.assign(rest, {
    ref,
    "data-component": "container",
    "data-size": size,
    className: cn("dk-container", "dk-container--" + size, props.padded !== false && "dk-container--padded", props.className)
  }));
});
Container.displayName = "Container";

// src/components/DatePicker/DatePicker.tsx
import * as React19 from "react";
var DatePicker = React19.forwardRef(function DatePicker2(props, ref) {
  const { value: _v, defaultValue: _d, onValueChange, min, max, isDateDisabled, locale, weekStartsOn, size: _s, invalid: _i, buttonLabel, className, style, name, placeholder, disabled, readOnly, onBlur, onKeyDown, ...rest } = props;
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  const controlled = props.value !== void 0;
  const [own, setOwn] = React19.useState(isValid(props.defaultValue) ? day(props.defaultValue) : null);
  const value = controlled ? isValid(props.value) ? day(props.value) : null : own;
  const [text2, setText] = React19.useState(value ? formatDate(value, locale) : "");
  const [open, setOpen] = React19.useState(false);
  const id = domId("dk-dp", React19.useId());
  const field = React19.useRef(null);
  const button = React19.useRef(null);
  const box = React19.useRef(null);
  const panel = React19.useRef(null);
  const shown = React19.useRef(value ? value.getTime() : null);
  if ((value ? value.getTime() : null) !== shown.current) {
    shown.current = value ? value.getTime() : null;
    const t = value ? formatDate(value, locale) : "";
    if (t !== text2) setText(t);
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
    if (text2.trim() === "") return commit(null);
    const d = parseDate(text2, locale);
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
    const update = () => {
      const r = place(anchor.getBoundingClientRect(), { width: p.offsetWidth, height: p.offsetHeight }, "bottom-start", cssLength(p, "--dk-dp-offset"), "bottom");
      p.style.left = r.x + "px";
      p.style.top = r.y + "px";
      p.dataset.side = r.side;
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(p);
      ro.observe(anchor);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  React19.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      if (panel.current && panel.current.contains(t) || button.current && button.current.contains(t)) return;
      close(false);
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open]);
  const typed = parseDate(text2, locale);
  const off = !!disabled || !!readOnly;
  return /* @__PURE__ */ React19.createElement("span", { ref: box, className: cn("dk-input", "dk-input--size-" + size, "dk-date-picker", invalid && "dk-input--invalid", disabled && "dk-input--disabled", readOnly && "dk-input--readonly", className), style, "data-component": "date-picker", "data-size": size }, /* @__PURE__ */ React19.createElement(
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
      value: text2,
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
        if (e.defaultPrevented) return;
        if (e.key === "Enter") read();
        else if (e.key === "ArrowDown" && e.altKey && !off) {
          e.preventDefault();
          read();
          setOpen(true);
        }
      }
    }
  ), /* @__PURE__ */ React19.createElement(
    "button",
    {
      ref: button,
      type: "button",
      className: "dk-date-picker__button",
      "aria-label": buttonLabel || "Choose date",
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      "aria-controls": open ? id : void 0,
      disabled: off,
      onClick: () => {
        if (!open) read();
        setOpen(!open);
      }
    },
    /* @__PURE__ */ React19.createElement(Icon, { name: "calendar_today" })
  ), name ? /* @__PURE__ */ React19.createElement("input", { type: "hidden", name, value: value ? isoDate(value) : "", disabled }) : null, /* @__PURE__ */ React19.createElement(
    "div",
    {
      ref: panel,
      id,
      role: "dialog",
      "aria-label": buttonLabel || "Choose date",
      ...{ popover: "manual" },
      hidden: !open || void 0,
      className: "dk-date-picker__popup",
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          close(true);
        }
      }
    },
    open ? /* @__PURE__ */ React19.createElement(
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
DatePicker.displayName = "DatePicker";

// src/components/DateRangePicker/DateRangePicker.tsx
import * as React21 from "react";

// src/internal/useAnchoredLayer.ts
import * as React20 from "react";
function useAnchoredLayer(open, layer, anchor, opts) {
  const outside = React20.useRef(opts.onOutside);
  outside.current = opts.onOutside;
  useIsoLayoutEffect(() => {
    const p = layer.current, a = anchor.current;
    if (!p) return;
    if (!open || !a) {
      hideLayer(p);
      return;
    }
    showLayer(p);
    const update = () => {
      const r = place(a.getBoundingClientRect(), { width: p.offsetWidth, height: p.offsetHeight }, opts.placement, cssLength(p, opts.offsetVar), "bottom");
      p.style.left = r.x + "px";
      p.style.top = r.y + "px";
      p.dataset.side = r.side;
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(p);
      ro.observe(a);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  React20.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      if (layer.current && layer.current.contains(t)) return;
      if (opts.inside && opts.inside.current && opts.inside.current.contains(t)) return;
      outside.current();
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open]);
}

// src/components/DateRangePicker/DateRangePicker.tsx
var norm = (r) => ({ start: r && isValid(r.start) ? day(r.start) : null, end: r && isValid(r.end) ? day(r.end) : null });
var key = (d) => d ? d.getTime() : null;
var DateRangePicker = React21.forwardRef(function DateRangePicker2(props, ref) {
  const { value: _v, defaultValue: _d, onValueChange, min, max, isDateDisabled, locale, weekStartsOn, size: _s, invalid: _i, disabled, readOnly, id, startLabel, endLabel, startName, endName, buttonLabel, months: _m, className, ...rest } = props;
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  const describedBy = rest["aria-describedby"], required = rest["aria-required"];
  delete rest["aria-describedby"];
  delete rest["aria-required"];
  const controlled = props.value !== void 0;
  const [own, setOwn] = React21.useState(norm(props.defaultValue));
  const value = controlled ? norm(props.value) : own;
  const fmt = (d) => d ? formatDate(d, locale) : "";
  const [text2, setText] = React21.useState({ start: fmt(value.start), end: fmt(value.end) });
  const shown = React21.useRef({ start: key(value.start), end: key(value.end) });
  if (key(value.start) !== shown.current.start || key(value.end) !== shown.current.end) {
    shown.current = { start: key(value.start), end: key(value.end) };
    const t = { start: fmt(value.start), end: fmt(value.end) };
    if (t.start !== text2.start || t.end !== text2.end) setText(t);
  }
  const [open, setOpen] = React21.useState(false);
  const [picking, setPicking] = React21.useState("start");
  const [hover, setHover] = React21.useState(null);
  const [base, setBase] = React21.useState(() => startOfMonth(value.start || /* @__PURE__ */ new Date()));
  const popId = domId("dk-drp", React21.useId());
  const box = React21.useRef(null);
  const startField = React21.useRef(null);
  const button = React21.useRef(null);
  const panel = React21.useRef(null);
  const two = props.months !== 1;
  const allowed = (d) => !(min && compare(d, min) < 0) && !(max && compare(d, max) > 0) && !(isDateDisabled && isDateDisabled(d));
  const commit = (r) => {
    shown.current = { start: key(r.start), end: key(r.end) };
    setText({ start: fmt(r.start), end: fmt(r.end) });
    if (key(r.start) === key(value.start) && key(r.end) === key(value.end)) return;
    if (!controlled) setOwn(r);
    if (onValueChange) onValueChange(r);
  };
  const read = (which) => {
    const raw = text2[which].trim();
    let d = raw === "" ? null : parseDate(raw, locale);
    if (raw !== "" && !(d && allowed(d))) d = value[which];
    const r = { ...value, [which]: d };
    if (r.start && r.end && compare(r.start, r.end) > 0) {
      if (which === "start") r.end = null;
      else r.end = value.end;
    }
    commit(r);
  };
  const close = (focus) => {
    setOpen(false);
    setHover(null);
    if (focus && startField.current) startField.current.focus();
  };
  const show = () => {
    const typed = parseDate(text2.start, locale);
    setBase(startOfMonth((typed && allowed(typed) ? typed : null) || value.start || /* @__PURE__ */ new Date()));
    setPicking(value.start && !value.end ? "end" : "start");
    setOpen(true);
  };
  useAnchoredLayer(open, panel, box, { placement: "bottom-start", offsetVar: "--dk-drp-offset", onOutside: () => close(false), inside: button });
  const pick2 = (d) => {
    if (picking === "start" || !value.start || compare(d, value.start) < 0) {
      commit({ start: d, end: null });
      setPicking("end");
      return;
    }
    commit({ start: value.start, end: d });
    close(true);
  };
  const to = picking === "end" && value.start && !value.end && hover && compare(hover, value.start) > 0 ? hover : value.end;
  const dayClass = (d) => {
    const s = value.start;
    if (!s || !to) return void 0;
    if (compare(d, s) > 0 && compare(d, to) < 0) return "dk-calendar__day--in-range";
    return void 0;
  };
  const isSel = (d) => sameDay(d, value.start) || sameDay(d, value.end);
  const off = !!disabled || !!readOnly;
  const field = (which) => /* @__PURE__ */ React21.createElement(
    "input",
    {
      type: "text",
      inputMode: "numeric",
      autoComplete: "off",
      className: "dk-input__field dk-date-range-picker__field",
      ref: which === "start" ? startField : void 0,
      id: which === "start" ? id : void 0,
      "aria-label": which === "start" ? startLabel || "Start date" : endLabel || "End date",
      "aria-describedby": describedBy,
      "aria-required": required,
      "aria-invalid": invalid || void 0,
      value: text2[which],
      placeholder: datePattern(locale),
      disabled,
      readOnly,
      onChange: (e) => setText({ ...text2, [which]: e.target.value }),
      onBlur: () => read(which),
      onKeyDown: (e) => {
        if (e.key === "Enter") read(which);
        else if (e.key === "ArrowDown" && e.altKey && !off) {
          e.preventDefault();
          read(which);
          show();
        }
      }
    }
  );
  const cal = (m, first) => /* @__PURE__ */ React21.createElement(
    Calendar,
    {
      month: m,
      onMonthChange: (n) => setBase(first ? n : addMonths(n, -1)),
      value: first ? value.start : value.end,
      min,
      max,
      isDateDisabled,
      locale,
      weekStartsOn,
      autoFocus: first,
      hideOutside: two,
      isDateSelected: isSel,
      dayClassName: dayClass,
      onDayHover: setHover,
      onValueChange: pick2
    }
  );
  return /* @__PURE__ */ React21.createElement(
    "span",
    {
      ...rest,
      ref: (n) => {
        box.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      role: "group",
      className: cn("dk-input", "dk-input--size-" + size, "dk-date-range-picker", invalid && "dk-input--invalid", disabled && "dk-input--disabled", readOnly && "dk-input--readonly", className),
      "data-component": "date-range-picker",
      "data-size": size
    },
    field("start"),
    /* @__PURE__ */ React21.createElement("span", { className: "dk-date-range-picker__dash", "aria-hidden": true }, "\u2013"),
    field("end"),
    /* @__PURE__ */ React21.createElement(
      "button",
      {
        ref: button,
        type: "button",
        className: "dk-date-picker__button dk-date-range-picker__button",
        "aria-label": buttonLabel || "Choose dates",
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": open ? popId : void 0,
        disabled: off,
        onClick: () => {
          if (open) close(false);
          else {
            read("start");
            show();
          }
        }
      },
      /* @__PURE__ */ React21.createElement(Icon, { name: "date_range" })
    ),
    startName ? /* @__PURE__ */ React21.createElement("input", { type: "hidden", name: startName, value: value.start ? isoDate(value.start) : "", disabled }) : null,
    endName ? /* @__PURE__ */ React21.createElement("input", { type: "hidden", name: endName, value: value.end ? isoDate(value.end) : "", disabled }) : null,
    /* @__PURE__ */ React21.createElement(
      "div",
      {
        ref: panel,
        id: popId,
        role: "dialog",
        "aria-label": buttonLabel || "Choose dates",
        ...{ popover: "manual" },
        hidden: !open || void 0,
        className: "dk-date-picker__popup dk-date-range-picker__popup",
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            close(true);
          }
        },
        onMouseLeave: () => setHover(null)
      },
      open ? /* @__PURE__ */ React21.createElement(React21.Fragment, null, /* @__PURE__ */ React21.createElement("div", { className: "dk-date-range-picker__months" }, cal(base, true), two ? cal(addMonths(base, 1), false) : null), /* @__PURE__ */ React21.createElement("p", { className: "dk-date-range-picker__status", "aria-live": "polite" }, picking === "start" ? "Choose the start date" : "Choose the end date")) : null
    )
  );
});
DateRangePicker.displayName = "DateRangePicker";

// src/components/Dialog/Dialog.tsx
import * as React22 from "react";
var OWN11 = { open: 1, onOpenChange: 1, title: 1, description: 1, footer: 1, size: 1, alert: 1, closeButton: 1, closeLabel: 1, closeOnBackdrop: 1, className: 1, children: 1 };
var Dialog = React22.forwardRef(function Dialog2(props, ref) {
  const rest = omit(props, OWN11);
  const base = domId("dk-dlg", React22.useId());
  const el = React22.useRef(null);
  const back = React22.useRef(null);
  const size = oneOf(["sm", "md", "lg"], props.size, "md");
  const alert = !!props.alert;
  const showClose = props.closeButton != null ? props.closeButton : !alert;
  const backdrop = props.closeOnBackdrop != null ? props.closeOnBackdrop : !alert;
  const ask = React22.useRef(props.onOpenChange);
  ask.current = props.onOpenChange;
  const close = React22.useCallback(() => {
    if (ask.current) ask.current(false);
  }, []);
  const has = (n) => n != null && n !== false && n !== "";
  useIsoLayoutEffect(() => {
    const d = el.current;
    if (!d) return;
    if (props.open && !d.open) {
      back.current = document.activeElement;
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
    } else if (!props.open && d.open) {
      if (typeof d.close === "function") d.close();
      else d.removeAttribute("open");
      const b = back.current;
      back.current = null;
      if (b && b.isConnected && typeof b.focus === "function") b.focus();
    }
  }, [props.open]);
  React22.useEffect(() => () => {
    const b = back.current;
    if (b && b.isConnected) b.focus();
  }, []);
  const onCancel = (e) => {
    if (rest.onCancel) rest.onCancel(e);
    e.preventDefault();
    close();
  };
  const onClick = (e) => {
    if (rest.onClick) rest.onClick(e);
    if (backdrop && e.target === e.currentTarget) close();
  };
  return /* @__PURE__ */ React22.createElement(
    "dialog",
    {
      ...rest,
      ref: (n) => {
        el.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      role: alert ? "alertdialog" : void 0,
      "aria-modal": "true",
      "aria-labelledby": rest["aria-labelledby"] || (has(props.title) ? base + "-title" : void 0),
      "aria-describedby": rest["aria-describedby"] || (has(props.description) ? base + "-desc" : void 0),
      className: cn("dk-dialog", "dk-dialog--" + size, props.className),
      "data-component": "dialog",
      "data-size": size,
      onCancel,
      onClick
    },
    /* @__PURE__ */ React22.createElement("div", { className: "dk-dialog__panel" }, has(props.title) || has(props.description) || showClose ? /* @__PURE__ */ React22.createElement("div", { className: "dk-dialog__header" }, /* @__PURE__ */ React22.createElement("div", { className: "dk-dialog__heading" }, has(props.title) ? /* @__PURE__ */ React22.createElement("h2", { className: "dk-dialog__title", id: base + "-title" }, props.title) : null, has(props.description) ? /* @__PURE__ */ React22.createElement("p", { className: "dk-dialog__description", id: base + "-desc" }, props.description) : null), showClose ? /* @__PURE__ */ React22.createElement(IconButton, { className: "dk-dialog__close", icon: "close", label: props.closeLabel || "Close", size: "sm", noTitle: true, onClick: close }) : null) : null, has(props.children) ? /* @__PURE__ */ React22.createElement("div", { className: "dk-dialog__body" }, props.children) : null, has(props.footer) ? /* @__PURE__ */ React22.createElement("div", { className: "dk-dialog__footer" }, props.footer) : null)
  );
});
Dialog.displayName = "Dialog";

// src/components/Divider/Divider.tsx
import * as React23 from "react";
var Divider = React23.forwardRef(function Divider2(props, ref) {
  const rest = omit(props, { orientation: 1, label: 1, decorative: 1, className: 1 });
  const vertical = props.orientation === "vertical";
  const label = props.label != null && props.label !== false && props.label !== "" && !vertical ? props.label : null;
  const cls = cn("dk-divider", vertical && "dk-divider--vertical", label != null && "dk-divider--label", props.className);
  const a11y = props.decorative ? { role: "none", "aria-hidden": true } : { role: "separator", "aria-orientation": vertical ? "vertical" : void 0 };
  if (label == null && !vertical) return React23.createElement("hr", Object.assign(rest, a11y, { ref, className: cls, "data-component": "divider", role: props.decorative ? "none" : void 0 }));
  return React23.createElement(
    "div",
    Object.assign(rest, a11y, { ref, className: cls, "data-component": "divider" }),
    label != null ? /* @__PURE__ */ React23.createElement("span", { className: "dk-divider__label" }, label) : null
  );
});
Divider.displayName = "Divider";

// src/components/Drawer/Drawer.tsx
import * as React24 from "react";
var OWN12 = { open: 1, onOpenChange: 1, side: 1, size: 1, title: 1, description: 1, footer: 1, closeButton: 1, closeLabel: 1, closeOnBackdrop: 1, className: 1, children: 1 };
var Drawer = React24.forwardRef(function Drawer2(props, ref) {
  const rest = omit(props, OWN12);
  const base = domId("dk-drw", React24.useId());
  const el = React24.useRef(null);
  const back = React24.useRef(null);
  const side = oneOf(["right", "left", "top", "bottom"], props.side, "right");
  const size = oneOf(["sm", "md", "lg"], props.size, "md");
  const showClose = props.closeButton !== false;
  const backdrop = props.closeOnBackdrop !== false;
  const ask = React24.useRef(props.onOpenChange);
  ask.current = props.onOpenChange;
  const close = React24.useCallback(() => {
    if (ask.current) ask.current(false);
  }, []);
  const has = (n) => n != null && n !== false && n !== "";
  useIsoLayoutEffect(() => {
    const d = el.current;
    if (!d) return;
    if (props.open && !d.open) {
      back.current = document.activeElement;
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
    } else if (!props.open && d.open) {
      if (typeof d.close === "function") d.close();
      else d.removeAttribute("open");
      const b = back.current;
      back.current = null;
      if (b && b.isConnected && typeof b.focus === "function") b.focus();
    }
  }, [props.open]);
  React24.useEffect(() => () => {
    const b = back.current;
    if (b && b.isConnected) b.focus();
  }, []);
  const onCancel = (e) => {
    if (rest.onCancel) rest.onCancel(e);
    e.preventDefault();
    close();
  };
  const onClick = (e) => {
    if (rest.onClick) rest.onClick(e);
    if (backdrop && e.target === e.currentTarget) close();
  };
  return /* @__PURE__ */ React24.createElement(
    "dialog",
    {
      ...rest,
      ref: (n) => {
        el.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      "aria-modal": "true",
      "aria-labelledby": rest["aria-labelledby"] || (has(props.title) ? base + "-title" : void 0),
      "aria-describedby": rest["aria-describedby"] || (has(props.description) ? base + "-desc" : void 0),
      className: cn("dk-drawer", "dk-drawer--" + side, "dk-drawer--" + size, props.className),
      "data-component": "drawer",
      "data-side": side,
      "data-size": size,
      onCancel,
      onClick
    },
    /* @__PURE__ */ React24.createElement("div", { className: "dk-drawer__panel" }, has(props.title) || has(props.description) || showClose ? /* @__PURE__ */ React24.createElement("div", { className: "dk-drawer__header" }, /* @__PURE__ */ React24.createElement("div", { className: "dk-drawer__heading" }, has(props.title) ? /* @__PURE__ */ React24.createElement("h2", { className: "dk-drawer__title", id: base + "-title" }, props.title) : null, has(props.description) ? /* @__PURE__ */ React24.createElement("p", { className: "dk-drawer__description", id: base + "-desc" }, props.description) : null), showClose ? /* @__PURE__ */ React24.createElement(IconButton, { className: "dk-drawer__close", icon: "close", label: props.closeLabel || "Close", size: "sm", noTitle: true, onClick: close }) : null) : null, has(props.children) ? /* @__PURE__ */ React24.createElement("div", { className: "dk-drawer__body" }, props.children) : null, has(props.footer) ? /* @__PURE__ */ React24.createElement("div", { className: "dk-drawer__footer" }, props.footer) : null)
  );
});
Drawer.displayName = "Drawer";

// src/components/EmptyState/EmptyState.tsx
import * as React25 from "react";
var EmptyState = React25.forwardRef(function EmptyState2(props, ref) {
  const rest = omit(props, { icon: 1, title: 1, description: 1, actions: 1, size: 1, variant: 1, headingLevel: 1, className: 1 });
  const size = oneOf(["sm", "md"], props.size, "md");
  const variant = oneOf(["plain", "dashed"], props.variant, "plain");
  const level = [2, 3, 4, 5, 6].indexOf(props.headingLevel) >= 0 ? props.headingLevel : 3;
  const H = "h" + level;
  const icon = asIcon(props.icon);
  return /* @__PURE__ */ React25.createElement("div", { ...rest, ref, "data-component": "empty-state", className: cn("dk-empty-state", size === "sm" && "dk-empty-state--sm", variant === "dashed" && "dk-empty-state--dashed", props.className) }, icon != null ? /* @__PURE__ */ React25.createElement("div", { className: cn("dk-empty-state__icon", typeof props.icon !== "string" && "dk-empty-state__icon--custom"), "aria-hidden": "true" }, icon) : null, /* @__PURE__ */ React25.createElement("div", { className: "dk-empty-state__text" }, /* @__PURE__ */ React25.createElement(H, { className: "dk-empty-state__title" }, props.title), props.description != null ? /* @__PURE__ */ React25.createElement("p", { className: "dk-empty-state__description" }, props.description) : null), props.actions != null ? /* @__PURE__ */ React25.createElement("div", { className: "dk-empty-state__actions" }, props.actions) : null);
});
EmptyState.displayName = "EmptyState";

// src/components/Fab/Fab.tsx
import * as React26 from "react";
var POSITIONS = ["bottom-end", "bottom-start", "top-end", "top-start", "static"];
var Fab = React26.forwardRef(function Fab2(props, ref) {
  const { icon, label, extended, size, position, className, ...rest } = props;
  const pos = oneOf(POSITIONS, position, "bottom-end");
  const sm = size === "sm";
  const look = {
    variant: "primary",
    size: sm ? "sm" : "md",
    "data-position": pos,
    className: cn("dk-fab", sm && "dk-fab--sm", extended && "dk-fab--extended", pos !== "static" && "dk-fab--" + pos, className)
  };
  return extended ? /* @__PURE__ */ React26.createElement(ButtonBase, { ...rest, ...look, ref, leftIcon: icon }, label) : /* @__PURE__ */ React26.createElement(ButtonBase, { title: label, ...rest, ...look, ref, icon, "aria-label": label });
});
Fab.displayName = "Fab";

// src/components/Field/Field.tsx
import * as React27 from "react";
var OWN13 = { label: 1, hint: 1, error: 1, required: 1, optional: 1, disabled: 1, group: 1, id: 1, children: 1, className: 1 };
function Field(props) {
  const rest = omit(props, OWN13);
  const base = domId("dk-f", React27.useId());
  const child = React27.Children.count(props.children) === 1 && React27.isValidElement(props.children) ? props.children : null;
  const controlId = props.id || child && child.props.id || base + "-control";
  const hasError = props.error != null && props.error !== false && props.error !== "";
  const hintId = props.hint ? base + "-hint" : null, errorId = hasError ? base + "-error" : null;
  const group = !!props.group;
  const labelKids = [
    props.label,
    props.required ? /* @__PURE__ */ React27.createElement("span", { className: "dk-field__required", "aria-hidden": true, key: "req" }, "*") : null,
    !props.required && props.optional ? /* @__PURE__ */ React27.createElement("span", { className: "dk-field__optional", key: "opt" }, typeof props.optional === "string" ? props.optional : "(optional)") : null
  ];
  const label = props.label == null ? null : group ? React27.createElement("legend", { className: "dk-field__label", key: "label" }, ...labelKids) : React27.createElement("label", { className: "dk-field__label", htmlFor: controlId, key: "label" }, ...labelKids);
  const hint = props.hint ? /* @__PURE__ */ React27.createElement("div", { className: "dk-field__hint", id: hintId, key: "hint" }, props.hint) : null;
  const error = hasError ? /* @__PURE__ */ React27.createElement("div", { className: "dk-field__error", key: "error" }, /* @__PURE__ */ React27.createElement(Icon, { name: "error", className: "dk-field__error-icon" }), /* @__PURE__ */ React27.createElement("span", { id: errorId }, props.error)) : null;
  const described = cn(hintId, errorId);
  const pass = function(el, isControl) {
    if (!React27.isValidElement(el)) return el;
    const p = el.props;
    const add = {}, dom = typeof el.type === "string";
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
    return React27.cloneElement(el, add);
  };
  const cls = cn("dk-field", group && "dk-field--group", hasError && "dk-field--invalid", props.disabled && "dk-field--disabled", props.className);
  if (group) {
    return /* @__PURE__ */ React27.createElement("fieldset", { ...rest, className: cls, disabled: props.disabled || void 0, "aria-describedby": described || void 0, "data-component": "field" }, label, hint, /* @__PURE__ */ React27.createElement("div", { className: "dk-field__control", key: "control" }, React27.Children.map(props.children, function(c) {
      return pass(c, false);
    })), error);
  }
  return /* @__PURE__ */ React27.createElement("div", { ...rest, className: cls, "data-component": "field" }, label, hint, /* @__PURE__ */ React27.createElement("div", { className: "dk-field__control", key: "control" }, child ? pass(child, true) : props.children), error);
}
Field.displayName = "Field";

// src/components/FileUpload/FileUpload.tsx
import * as React28 from "react";
var OWN14 = { files: 1, onFilesChange: 1, onReject: 1, accept: 1, multiple: 1, maxSize: 1, maxFiles: 1, disabled: 1, name: 1, title: 1, buttonLabel: 1, hint: 1, removeLabel: 1, className: 1, id: 1 };
function formatFileSize(bytes) {
  if (!(bytes >= 0)) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0, n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return (i === 0 ? String(n) : n >= 10 ? String(Math.round(n)) : String(Math.round(n * 10) / 10)) + " " + units[i];
}
function accepts(file, accept) {
  if (!accept) return true;
  const name = file.name.toLowerCase(), type = (file.type || "").toLowerCase();
  return accept.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean).some((a) => a.startsWith(".") ? name.endsWith(a) : a.endsWith("/*") ? type.startsWith(a.slice(0, -1)) : type === a);
}
var iconFor = (f) => /^image\//.test(f.type) ? "image" : f.type === "application/pdf" ? "picture_as_pdf" : /^video\//.test(f.type) ? "movie" : /^audio\//.test(f.type) ? "audio_file" : /zip|compressed|tar/.test(f.type) ? "folder_zip" : "draft";
var same = (a, b) => a.name === b.name && a.size === b.size && a.type === b.type;
var FileUpload = React28.forwardRef(function FileUpload2(props, ref) {
  var _a;
  const rest = omit(props, OWN14);
  const base = domId("dk-fu", React28.useId());
  const inputId = props.id || base + "-input";
  const input = React28.useRef(null);
  const chooser = React28.useRef(null);
  const controlled = props.files !== void 0;
  const [own, setOwn] = React28.useState([]);
  const files = controlled ? props.files : own;
  const [rejected, setRejected] = React28.useState([]);
  const [over, setOver] = React28.useState(false);
  const depth = React28.useRef(0);
  const multiple = !!props.multiple, disabled = !!props.disabled;
  const removeLabel = props.removeLabel || ((n) => "Remove " + n);
  const set = (next2) => {
    if (!controlled) setOwn(next2);
    if (props.onFilesChange) props.onFilesChange(next2);
  };
  const add = (list) => {
    if (!list || disabled) return;
    const incoming = Array.from(list), ok = [], bad = [];
    const limit = props.maxSize != null ? formatFileSize(props.maxSize) : "";
    for (const f of incoming) {
      if (!accepts(f, props.accept)) bad.push({ file: f, reason: "type", message: `${f.name}: this type of file isn't accepted.` });
      else if (props.maxSize != null && f.size > props.maxSize) bad.push({ file: f, reason: "size", message: `${f.name} is larger than ${limit}.` });
      else ok.push(f);
    }
    let next2;
    if (!multiple) next2 = ok.length ? [ok[0]] : files;
    else {
      next2 = files.slice();
      for (const f of ok) {
        if (next2.some((g) => same(f, g))) continue;
        if (props.maxFiles != null && next2.length >= props.maxFiles) {
          bad.push({ file: f, reason: "count", message: `${f.name} wasn't added: up to ${props.maxFiles} ${props.maxFiles === 1 ? "file" : "files"}.` });
          continue;
        }
        next2.push(f);
      }
    }
    if (!multiple && ok.length > 1) for (const f of ok.slice(1)) bad.push({ file: f, reason: "count", message: `${f.name} wasn't added: one file only.` });
    setRejected(bad);
    if (bad.length && props.onReject) props.onReject(bad);
    if (next2 !== files) set(next2);
  };
  const remove = (f) => {
    set(files.filter((g) => g !== f));
    setRejected([]);
    if (chooser.current) chooser.current.focus();
  };
  React28.useEffect(() => {
    const i = input.current;
    if (!i || typeof DataTransfer === "undefined") return;
    try {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));
      i.files = dt.files;
    } catch {
    }
  }, [files]);
  const drag = {
    onDragEnter: (e) => {
      if (disabled) return;
      e.preventDefault();
      depth.current++;
      setOver(true);
    },
    onDragOver: (e) => {
      if (disabled) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    onDragLeave: () => {
      if (disabled) return;
      depth.current = Math.max(0, depth.current - 1);
      if (!depth.current) setOver(false);
    },
    onDrop: (e) => {
      if (disabled) return;
      e.preventDefault();
      depth.current = 0;
      setOver(false);
      add(e.dataTransfer.files);
    }
  };
  const hasHint = props.hint != null && props.hint !== "";
  return /* @__PURE__ */ React28.createElement("div", { ...rest, ref, className: cn("dk-file-upload", disabled && "dk-file-upload--disabled", props.className), "data-component": "file-upload" }, /* @__PURE__ */ React28.createElement(
    "div",
    {
      className: cn("dk-file-upload__zone", over && "dk-file-upload__zone--over"),
      "data-dragging": over ? "" : void 0,
      "aria-disabled": disabled || void 0,
      ...drag,
      onClick: (e) => {
        if (!disabled && e.target === e.currentTarget && input.current) input.current.click();
      }
    },
    /* @__PURE__ */ React28.createElement(Icon, { name: "upload_file", className: "dk-file-upload__icon" }),
    /* @__PURE__ */ React28.createElement("p", { className: "dk-file-upload__title" }, (_a = props.title) != null ? _a : multiple ? "Drag files here" : "Drag a file here"),
    /* @__PURE__ */ React28.createElement(Button2, { ref: chooser, variant: "outline", size: "sm", disabled, onClick: () => input.current && input.current.click(), "aria-describedby": hasHint ? base + "-hint" : void 0 }, props.buttonLabel || (multiple ? "Choose files" : "Choose a file")),
    hasHint ? /* @__PURE__ */ React28.createElement("p", { className: "dk-file-upload__hint", id: base + "-hint" }, props.hint) : null,
    /* @__PURE__ */ React28.createElement(
      "input",
      {
        ref: input,
        id: inputId,
        type: "file",
        className: "dk-file-upload__input",
        tabIndex: -1,
        "aria-hidden": true,
        name: props.name,
        accept: props.accept,
        multiple,
        disabled,
        onChange: (e) => {
          add(e.target.files);
        }
      }
    )
  ), rejected.length ? /* @__PURE__ */ React28.createElement("div", { className: "dk-file-upload__errors", role: "alert" }, rejected.map((r, i) => /* @__PURE__ */ React28.createElement("p", { key: i, className: "dk-file-upload__error" }, /* @__PURE__ */ React28.createElement(Icon, { name: "error" }), r.message))) : null, files.length ? /* @__PURE__ */ React28.createElement("ul", { className: "dk-file-upload__list", "aria-label": multiple ? "Chosen files" : "Chosen file" }, files.map((f, i) => /* @__PURE__ */ React28.createElement("li", { key: f.name + f.size + f.lastModified + i, className: "dk-file-upload__item" }, /* @__PURE__ */ React28.createElement(Icon, { name: iconFor(f), className: "dk-file-upload__file-icon" }), /* @__PURE__ */ React28.createElement("span", { className: "dk-file-upload__file" }, /* @__PURE__ */ React28.createElement("span", { className: "dk-file-upload__name" }, f.name), /* @__PURE__ */ React28.createElement("span", { className: "dk-file-upload__size" }, formatFileSize(f.size))), /* @__PURE__ */ React28.createElement(IconButton, { icon: "close", label: removeLabel(f.name), size: "sm", disabled, onClick: () => remove(f) })))) : null);
});
FileUpload.displayName = "FileUpload";

// src/components/Grid/Grid.tsx
import * as React29 from "react";

// src/internal/space.ts
var SPACE = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24"];
function space(step) {
  const s = step == null ? "" : String(step);
  return SPACE.indexOf(s) < 0 ? void 0 : "var(--spacing-" + s.replace(".", "\\.") + ")";
}

// src/components/Grid/Grid.tsx
var TAGS3 = ["div", "section", "ul", "ol"];
var Grid = React29.forwardRef(function Grid2(props, ref) {
  const rest = omit(props, { columns: 1, minColumnWidth: 1, gap: 1, as: 1, className: 1, style: 1 });
  const n = typeof props.columns === "number" ? Math.round(props.columns) : 0;
  const cols = n >= 1 && n <= 12 ? n : 0;
  const vars = {};
  const gap = space(props.gap);
  if (gap) vars["--dk-grid-gap"] = gap;
  if (cols) vars["--dk-grid-cols"] = String(cols);
  if (!cols && props.minColumnWidth) vars["--dk-grid-min"] = /^[a-z][a-z0-9-]*$/.test(props.minColumnWidth) ? "var(--" + props.minColumnWidth + ")" : props.minColumnWidth;
  return React29.createElement(oneOf(TAGS3, props.as, "div"), Object.assign(rest, {
    ref,
    "data-component": "grid",
    className: cn("dk-grid", cols ? "dk-grid--fixed" : "dk-grid--auto", props.className),
    style: Object.assign(vars, props.style)
  }));
});
Grid.displayName = "Grid";

// src/components/Heading/Heading.tsx
import * as React30 from "react";
var SIZES4 = ["sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
var Heading = React30.forwardRef(function Heading2(props, ref) {
  const { level: lv, size: sz, className, ...rest } = props;
  const level = [1, 2, 3, 4, 5, 6].indexOf(lv) < 0 ? 2 : lv;
  const size = SIZES4.indexOf(sz) < 0 ? null : sz;
  return React30.createElement("h" + level, Object.assign(rest, {
    ref,
    className: cn("dk-heading", "dk-heading--" + level, size && "dk-heading--size-" + size, className),
    "data-component": "heading"
  }));
});
Heading.displayName = "Heading";

// src/components/Image/Image.tsx
import * as React31 from "react";
var RATIOS = ["auto", "square", "4:3", "video"];
var Image = React31.forwardRef(function Image2(props, ref) {
  const { src, alt, ratio: _r, fit: _f, rounded, fallback, viewable, fullSrc, viewLabel, onRemove, removeLabel, frameProps, className, onLoad, onError, loading, ...rest } = props;
  const ratio = typeof props.ratio === "number" && props.ratio > 0 ? props.ratio : oneOf(RATIOS, props.ratio, "auto");
  const fit = oneOf(["cover", "contain"], props.fit, "cover");
  const [state, setState] = React31.useState("loading");
  const [open, setOpen] = React31.useState(false);
  const img = React31.useRef(null);
  React31.useEffect(() => {
    setState("loading");
  }, [src]);
  React31.useEffect(() => {
    const i = img.current;
    if (i && i.complete) setState(i.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);
  const named = (base) => alt ? base + ": " + alt : base;
  const frameStyle = typeof ratio === "number" ? { ...frameProps && frameProps.style, "--dk-image-ratio": String(ratio) } : frameProps && frameProps.style;
  const picture = state === "error" ? /* @__PURE__ */ React31.createElement("span", { className: "dk-image__fallback", role: alt ? "img" : void 0, "aria-label": alt || void 0, "aria-hidden": alt ? void 0 : true }, fallback != null ? fallback : /* @__PURE__ */ React31.createElement(Icon, { name: "broken_image" })) : /* @__PURE__ */ React31.createElement(
    "img",
    {
      ...rest,
      ref: (n) => {
        img.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      src,
      alt,
      loading: loading || "lazy",
      className: cn("dk-image__img", className),
      onLoad: (e) => {
        setState("loaded");
        if (onLoad) onLoad(e);
      },
      onError: (e) => {
        setState("error");
        if (onError) onError(e);
      }
    }
  );
  return /* @__PURE__ */ React31.createElement(
    "span",
    {
      ...frameProps,
      style: frameStyle,
      className: cn("dk-image", "dk-image--ratio-" + (typeof ratio === "number" ? "custom" : ratio.replace(":", "-")), "dk-image--" + fit, rounded !== false && "dk-image--rounded", "dk-image--" + state, frameProps && frameProps.className),
      "data-component": "image",
      "data-state": state
    },
    viewable && state !== "error" ? /* @__PURE__ */ React31.createElement("button", { type: "button", className: "dk-image__view", "aria-label": viewLabel || named("View image"), "aria-haspopup": "dialog", onClick: () => setOpen(true) }, picture) : picture,
    onRemove ? /* @__PURE__ */ React31.createElement(IconButton, { className: "dk-image__remove", icon: "close", label: removeLabel || named("Remove image"), size: "sm", variant: "secondary", shape: "round", noTitle: true, onClick: onRemove }) : null,
    viewable ? /* @__PURE__ */ React31.createElement(Dialog, { open, onOpenChange: setOpen, size: "lg", title: alt || void 0, "aria-label": alt ? void 0 : viewLabel || "Image", className: "dk-image__viewer" }, open ? /* @__PURE__ */ React31.createElement("img", { src: fullSrc || src, alt, className: "dk-image__full" }) : null) : null
  );
});
Image.displayName = "Image";

// src/components/Input/Input.tsx
import * as React32 from "react";
var Input = React32.forwardRef(function Input2(props, ref) {
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, rightIcon: 1, className: 1, style: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  if (rest.type === void 0) rest.type = "text";
  const icon = function(node, side) {
    node = asIcon(node);
    return node == null || node === false ? null : /* @__PURE__ */ React32.createElement("span", { className: "dk-input__icon dk-input__icon--" + side, "aria-hidden": true, key: side }, node);
  };
  return /* @__PURE__ */ React32.createElement("span", { className: cn("dk-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className), style: props.style, "data-component": "input", "data-size": size }, icon(props.leftIcon, "left"), /* @__PURE__ */ React32.createElement("input", { ...rest, ref, className: "dk-input__field", key: "field" }), icon(props.rightIcon, "right"));
});
Input.displayName = "Input";

// src/components/List/List.tsx
import * as React33 from "react";
var List = React33.forwardRef(function List2(props, ref) {
  const rest = omit(props, { variant: 1, divided: 1, as: 1, className: 1 });
  const variant = oneOf(["plain", "card"], props.variant, "plain");
  return React33.createElement(oneOf(["ul", "ol"], props.as, "ul"), Object.assign(rest, {
    ref,
    "data-component": "list",
    className: cn("dk-list", variant === "card" && "dk-list--card", props.divided !== false && "dk-list--divided", props.className)
  }));
});
List.displayName = "List";
var ListItem = React33.forwardRef(function ListItem2(props, ref) {
  const rest = omit(props, { title: 1, description: 1, leading: 1, trailing: 1, href: 1, onClick: 1, as: 1, linkProps: 1, selected: 1, disabled: 1, className: 1 });
  const lead = asIcon(props.leading);
  const body = /* @__PURE__ */ React33.createElement(React33.Fragment, null, lead != null && lead !== false ? /* @__PURE__ */ React33.createElement("span", { className: cn("dk-list__leading", typeof props.leading === "string" && "dk-list__leading--icon") }, lead) : null, /* @__PURE__ */ React33.createElement("span", { className: "dk-list__text" }, /* @__PURE__ */ React33.createElement("span", { className: "dk-list__title" }, props.title), props.description != null ? /* @__PURE__ */ React33.createElement("span", { className: "dk-list__description" }, props.description) : null));
  const lp = Object.assign({}, props.linkProps);
  let main;
  if (props.href != null || props.as) {
    const attrs = Object.assign(lp, { className: cn("dk-list__main", lp.className), "aria-current": props.selected ? "true" : void 0 });
    if (props.disabled) {
      attrs["aria-disabled"] = true;
      attrs.tabIndex = -1;
      attrs.onClick = (e) => e.preventDefault();
    } else {
      attrs.href = props.href;
      if (props.onClick) attrs.onClick = props.onClick;
    }
    main = React33.createElement(props.as || "a", attrs, body);
  } else if (props.onClick) {
    main = /* @__PURE__ */ React33.createElement("button", { type: "button", ...lp, className: cn("dk-list__main", lp.className), onClick: props.onClick, disabled: props.disabled, "aria-pressed": props.selected === void 0 ? void 0 : !!props.selected }, body);
  } else {
    main = /* @__PURE__ */ React33.createElement("div", { className: "dk-list__main dk-list__main--static" }, body);
  }
  const interactive = props.href != null || !!props.as || !!props.onClick;
  return /* @__PURE__ */ React33.createElement("li", { ...rest, ref, className: cn("dk-list__item", interactive && "dk-list__item--interactive", props.selected && "dk-list__item--selected", props.disabled && "dk-list__item--disabled", props.className) }, main, props.trailing != null ? /* @__PURE__ */ React33.createElement("span", { className: "dk-list__trailing" }, props.trailing) : null);
});
ListItem.displayName = "ListItem";

// src/components/Kbd/Kbd.tsx
import * as React35 from "react";

// src/components/VisuallyHidden/VisuallyHidden.tsx
import * as React34 from "react";
var TAGS4 = ["span", "div", "h1", "h2", "h3", "h4", "h5", "h6", "p", "label", "legend"];
var VisuallyHidden = React34.forwardRef(function VisuallyHidden2(props, ref) {
  const rest = omit(props, { focusable: 1, as: 1, className: 1 });
  return React34.createElement(oneOf(TAGS4, props.as, "span"), Object.assign(rest, {
    ref,
    "data-component": "visually-hidden",
    className: cn("dk-visually-hidden", props.focusable && "dk-visually-hidden--focusable", props.className)
  }));
});
VisuallyHidden.displayName = "VisuallyHidden";

// src/components/Kbd/Kbd.tsx
var NAMED = {
  mod: ["\u2318", "Command", "Ctrl", "Control"],
  cmd: ["\u2318", "Command", "\u229E", "Windows"],
  meta: ["\u2318", "Command", "\u229E", "Windows"],
  ctrl: ["\u2303", "Control", "Ctrl", "Control"],
  control: ["\u2303", "Control", "Ctrl", "Control"],
  alt: ["\u2325", "Option", "Alt", "Alt"],
  option: ["\u2325", "Option", "Alt", "Alt"],
  shift: ["\u21E7", "Shift", "Shift", "Shift"],
  enter: ["\u21B5", "Enter", "Enter", "Enter"],
  return: ["\u21B5", "Return", "Enter", "Enter"],
  backspace: ["\u232B", "Backspace", "Backspace", "Backspace"],
  delete: ["\u2326", "Delete", "Del", "Delete"],
  esc: ["Esc", "Escape", "Esc", "Escape"],
  escape: ["Esc", "Escape", "Esc", "Escape"],
  tab: ["\u21E5", "Tab", "Tab", "Tab"],
  space: ["Space", "Space", "Space", "Space"],
  up: ["\u2191", "Up arrow", "\u2191", "Up arrow"],
  down: ["\u2193", "Down arrow", "\u2193", "Down arrow"],
  left: ["\u2190", "Left arrow", "\u2190", "Left arrow"],
  right: ["\u2192", "Right arrow", "\u2192", "Right arrow"]
};
var isApple = () => {
  var _a;
  return typeof navigator !== "undefined" && [(_a = navigator.userAgentData) == null ? void 0 : _a.platform, navigator.platform, navigator.userAgent].some((s) => /Mac|iPhone|iPad|iPod/.test(s || ""));
};
function Key({ k, apple }) {
  const n = NAMED[k.toLowerCase()];
  if (!n) return /* @__PURE__ */ React35.createElement("kbd", { className: "dk-kbd__key" }, k.length === 1 ? k.toUpperCase() : k);
  const [shown, name] = apple ? [n[0], n[1]] : [n[2], n[3]];
  return /* @__PURE__ */ React35.createElement("kbd", { className: "dk-kbd__key", title: shown === name ? void 0 : name }, shown === name ? shown : /* @__PURE__ */ React35.createElement(React35.Fragment, null, /* @__PURE__ */ React35.createElement("span", { "aria-hidden": true }, shown), /* @__PURE__ */ React35.createElement(VisuallyHidden, null, name)));
}
var Kbd = React35.forwardRef(function Kbd2(props, ref) {
  const rest = omit(props, { keys: 1, size: 1, className: 1, children: 1 });
  const [apple, setApple] = React35.useState(false);
  React35.useEffect(() => {
    setApple(isApple());
  }, []);
  const size = props.size === "sm" ? "sm" : "md";
  const keys = props.keys && props.keys.length ? props.keys : typeof props.children === "string" ? [props.children] : null;
  const cls = cn("dk-kbd", "dk-kbd--size-" + size, props.className);
  if (!keys) return /* @__PURE__ */ React35.createElement("kbd", { ...rest, ref, className: cn(cls, "dk-kbd--single"), "data-component": "kbd", "data-size": size }, /* @__PURE__ */ React35.createElement("kbd", { className: "dk-kbd__key" }, props.children));
  return /* @__PURE__ */ React35.createElement("kbd", { ...rest, ref, className: cn(cls, keys.length === 1 && "dk-kbd--single"), "data-component": "kbd", "data-size": size }, keys.map((k, i) => /* @__PURE__ */ React35.createElement(React35.Fragment, { key: i }, i > 0 ? /* @__PURE__ */ React35.createElement("span", { className: "dk-kbd__plus", "aria-hidden": true }, "+") : null, /* @__PURE__ */ React35.createElement(Key, { k, apple }))));
});
Kbd.displayName = "Kbd";

// src/components/Link/Link.tsx
import * as React36 from "react";
var Link = React36.forwardRef(function Link2(props, ref) {
  const rest = omit(props, { tone: 1, underline: 1, external: 1, as: 1, className: 1, children: 1 });
  const tone = oneOf(["primary", "neutral"], props.tone, "primary");
  const underline = oneOf(["always", "hover"], props.underline, "always");
  if (props.external) {
    if (rest.target == null) rest.target = "_blank";
    rest.rel = cn(rest.rel, "noopener noreferrer");
  }
  return React36.createElement(props.as || "a", Object.assign(rest, {
    ref,
    "data-component": "link",
    className: cn("dk-link", tone === "neutral" && "dk-link--neutral", underline === "hover" && "dk-link--hover-underline", props.className)
  }), props.children, props.external ? /* @__PURE__ */ React36.createElement(React36.Fragment, null, /* @__PURE__ */ React36.createElement(Icon, { name: "open_in_new", className: "dk-link__icon" }), /* @__PURE__ */ React36.createElement(VisuallyHidden, null, " (opens in a new tab)")) : null);
});
Link.displayName = "Link";

// src/components/Menu/Menu.tsx
import * as React37 from "react";
var MenuContext = React37.createContext(null);
var ITEMS = '[role="menuitem"]';
function Menu(props) {
  const id = domId("dk-menu", React37.useId());
  const [inner, setInner] = React37.useState(false);
  const controlled = props.open !== void 0;
  const open = controlled ? !!props.open : inner;
  const menuRef = React37.useRef(null);
  const triggerRef = React37.useRef(null);
  const focusOn = React37.useRef(null);
  const ask = React37.useRef(props.onOpenChange);
  ask.current = props.onOpenChange;
  const set = React37.useCallback((v) => {
    if (!controlled) setInner(v);
    if (ask.current) ask.current(v);
  }, [controlled]);
  const close = React37.useCallback((focusTrigger) => {
    set(false);
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
  }, [set]);
  const ctx = React37.useMemo(() => ({ close }), [close]);
  const items3 = () => menuRef.current ? Array.from(menuRef.current.querySelectorAll(ITEMS)) : [];
  useIsoLayoutEffect(() => {
    const menu = menuRef.current, trigger2 = triggerRef.current;
    if (!menu) return;
    if (!open || !trigger2) {
      hideLayer(menu);
      return;
    }
    showLayer(menu);
    const update = () => {
      const r = place(trigger2.getBoundingClientRect(), { width: menu.offsetWidth, height: menu.offsetHeight }, props.placement, cssLength(menu, "--dk-menu-offset"), "bottom-start");
      menu.style.left = r.x + "px";
      menu.style.top = r.y + "px";
      menu.dataset.side = r.side;
    };
    update();
    const list = items3();
    const target = focusOn.current === "last" ? list[list.length - 1] : list[0];
    focusOn.current = null;
    if (target) target.focus();
    else menu.focus();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(menu);
      ro.observe(trigger2);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, props.placement]);
  React37.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      if (menuRef.current && menuRef.current.contains(t)) return;
      if (triggerRef.current && triggerRef.current.contains(t)) return;
      close(false);
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open, close]);
  const onMenuKey = (e) => {
    const list = items3(), i = list.indexOf(document.activeElement);
    const go = (n) => {
      e.preventDefault();
      if (list.length) list[(n + list.length) % list.length].focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i < 0 ? list.length - 1 : i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close(true);
    } else if (e.key === "Tab") close(false);
    else if (e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const k = e.key.toLowerCase();
      for (let s = 1; s <= list.length; s++) {
        const it = list[(i + s) % list.length];
        const label = it.querySelector(".dk-menu__label") || it;
        if ((label.textContent || "").trim().toLowerCase().startsWith(k)) {
          it.focus();
          break;
        }
      }
    }
  };
  const child = React37.Children.only(props.trigger);
  const cp = child.props;
  const childRef = elementRef(child);
  const trigger = React37.cloneElement(child, {
    ref: (n) => {
      triggerRef.current = n;
      if (childRef) setRef(childRef, n);
    },
    id: cp.id || id + "-button",
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? id : void 0,
    onClick: (e) => {
      if (cp.onClick) cp.onClick(e);
      if (e.defaultPrevented) return;
      if (!open) focusOn.current = "first";
      set(!open);
    },
    onKeyDown: (e) => {
      if (cp.onKeyDown) cp.onKeyDown(e);
      if (e.defaultPrevented) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        focusOn.current = e.key === "ArrowUp" ? "last" : "first";
        set(true);
      }
    }
  });
  return /* @__PURE__ */ React37.createElement(MenuContext.Provider, { value: ctx }, trigger, /* @__PURE__ */ React37.createElement(
    "div",
    {
      ref: menuRef,
      id,
      role: "menu",
      tabIndex: -1,
      ...{ popover: "manual" },
      hidden: !open || void 0,
      "aria-label": props["aria-label"],
      "aria-labelledby": props["aria-label"] ? void 0 : cp.id || id + "-button",
      className: cn("dk-menu", props.className),
      style: props.style,
      "data-component": "menu",
      "data-state": open ? "open" : "closed",
      onKeyDown: onMenuKey
    },
    open ? props.children : null
  ));
}
Menu.displayName = "Menu";
var MenuItem = React37.forwardRef(function MenuItem2(props, ref) {
  const ctx = React37.useContext(MenuContext);
  const rest = omit(props, { onSelect: 1, icon: 1, shortcut: 1, destructive: 1, disabled: 1, className: 1, children: 1, onClick: 1, onKeyDown: 1, onPointerMove: 1 });
  const own = { onClick: props.onClick, onKeyDown: props.onKeyDown, onPointerMove: props.onPointerMove };
  const choose = (e) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }
    if (props.onSelect) props.onSelect(e);
    if (!e.defaultPrevented && ctx) ctx.close(true);
  };
  const onClick = (e) => {
    if (own.onClick) own.onClick(e);
    if (rest.href != null && !props.disabled) {
      if (props.onSelect) props.onSelect(e);
      if (ctx) ctx.close(false);
      return;
    }
    choose(e);
  };
  const onKeyDown = (e) => {
    if (own.onKeyDown) own.onKeyDown(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " ") {
      if (rest.href != null && e.key === "Enter" && !props.disabled) return;
      choose(e);
      e.preventDefault();
    }
  };
  const isLink = rest.href != null && !props.disabled;
  if (!isLink) delete rest.href;
  if (isLink && rest.target === "_blank" && rest.rel == null) rest.rel = "noopener noreferrer";
  return React37.createElement(
    isLink ? config.link : "div",
    Object.assign(rest, {
      ref,
      role: "menuitem",
      tabIndex: -1,
      "aria-disabled": props.disabled || void 0,
      className: cn("dk-menu__item", props.destructive && "dk-menu__item--destructive", props.className),
      onClick,
      onKeyDown,
      onPointerMove: (e) => {
        if (own.onPointerMove) own.onPointerMove(e);
        if (document.activeElement !== e.currentTarget) e.currentTarget.focus();
      }
    }),
    props.icon != null ? /* @__PURE__ */ React37.createElement("span", { className: "dk-menu__icon", "aria-hidden": "true" }, asIcon(props.icon)) : null,
    /* @__PURE__ */ React37.createElement("span", { className: "dk-menu__label" }, props.children),
    props.shortcut ? /* @__PURE__ */ React37.createElement("kbd", { className: "dk-menu__shortcut" }, props.shortcut) : null
  );
});
MenuItem.displayName = "MenuItem";
var MenuGroup = React37.forwardRef(function MenuGroup2(props, ref) {
  const rest = omit(props, { label: 1, className: 1, children: 1 });
  const id = domId("dk-mg", React37.useId());
  return /* @__PURE__ */ React37.createElement("div", { ...rest, ref, role: "group", "aria-labelledby": props.label != null ? id : void 0, className: cn("dk-menu__group", props.className) }, props.label != null ? /* @__PURE__ */ React37.createElement("div", { className: "dk-menu__group-label", id, role: "presentation" }, props.label) : null, props.children);
});
MenuGroup.displayName = "MenuGroup";
var MenuSeparator = React37.forwardRef(function MenuSeparator2(props, ref) {
  return /* @__PURE__ */ React37.createElement("div", { ...props, ref, role: "separator", className: cn("dk-menu__separator", props.className) });
});
MenuSeparator.displayName = "MenuSeparator";

// src/components/Navbar/Navbar.tsx
import * as React38 from "react";
var NavbarContext = React38.createContext(null);
var Navbar = React38.forwardRef(function Navbar2(props, ref) {
  const rest = omit(props, { brand: 1, children: 1, actions: 1, sticky: 1, size: 1, menuLabel: 1, className: 1, "aria-label": 1, onKeyDown: 1 });
  const [open, setOpen] = React38.useState(false);
  const toggle = React38.useRef(null);
  const id = domId("dk-nav", React38.useId());
  const size = oneOf(["prose", "md", "lg", "xl", "2xl", "full"], props.size, "xl");
  const hasLinks = React38.Children.count(props.children) > 0;
  const close = React38.useCallback(() => setOpen(false), []);
  React38.useEffect(() => {
    if (!open || typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [open]);
  function onKeyDown(e) {
    if (props.onKeyDown) props.onKeyDown(e);
    if (!e.defaultPrevented && e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      if (toggle.current) toggle.current.focus();
    }
  }
  return /* @__PURE__ */ React38.createElement(NavbarContext.Provider, { value: { close } }, /* @__PURE__ */ React38.createElement("header", { ...rest, ref, onKeyDown, "data-component": "navbar", "data-state": open ? "open" : "closed", className: cn("dk-navbar", props.sticky && "dk-navbar--sticky", props.className) }, /* @__PURE__ */ React38.createElement("div", { className: cn("dk-navbar__inner dk-container dk-container--padded", "dk-container--" + size) }, props.brand != null ? /* @__PURE__ */ React38.createElement("div", { className: "dk-navbar__brand" }, props.brand) : null, hasLinks ? /* @__PURE__ */ React38.createElement("nav", { id, "aria-label": props["aria-label"] || "Main", className: "dk-navbar__nav" }, /* @__PURE__ */ React38.createElement("ul", { className: "dk-navbar__links" }, React38.Children.map(props.children, (c) => c == null || c === false ? null : /* @__PURE__ */ React38.createElement("li", null, c)))) : null, props.actions != null ? /* @__PURE__ */ React38.createElement("div", { className: "dk-navbar__actions" }, props.actions) : null, hasLinks ? /* @__PURE__ */ React38.createElement(
    IconButton,
    {
      ref: toggle,
      className: "dk-navbar__toggle",
      icon: open ? "close" : "menu",
      label: props.menuLabel || "Menu",
      noTitle: true,
      "aria-expanded": open,
      "aria-controls": id,
      onClick: () => setOpen(!open)
    }
  ) : null)));
});
Navbar.displayName = "Navbar";
var NavbarLink = React38.forwardRef(function NavbarLink2(props, ref) {
  const ctx = React38.useContext(NavbarContext);
  const rest = omit(props, { active: 1, as: 1, className: 1, onClick: 1 });
  return React38.createElement(props.as || "a", Object.assign(rest, {
    ref,
    "aria-current": props.active ? "page" : void 0,
    className: cn("dk-navbar__link", props.active && "dk-navbar__link--active", props.className),
    onClick: (e) => {
      if (props.onClick) props.onClick(e);
      if (ctx) ctx.close();
    }
  }));
});
NavbarLink.displayName = "NavbarLink";

// src/components/NumberInput/NumberInput.tsx
import * as React39 from "react";
var decimals = (n) => {
  const s = String(n);
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
};
var NumberInput = React39.forwardRef(function NumberInput2(props, ref) {
  var _a, _b;
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, className: 1, style: 1, value: 1, defaultValue: 1, onValueChange: 1, min: 1, max: 1, step: 1, largeStep: 1, steppers: 1, decrementLabel: 1, incrementLabel: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const step = Number(props.step) > 0 ? Number(props.step) : 1;
  const large = Number(props.largeStep) > 0 ? Number(props.largeStep) : 10;
  const min = props.min != null && isFinite(props.min) ? props.min : void 0;
  const max = props.max != null && isFinite(props.max) ? props.max : void 0;
  const places = decimals(step);
  const controlled = props.value !== void 0;
  const [ownValue, setOwnValue] = React39.useState((_a = props.defaultValue) != null ? _a : null);
  const value = controlled ? (_b = props.value) != null ? _b : null : ownValue;
  const show = (v) => v == null ? "" : String(v);
  const [text2, setText] = React39.useState(show(value));
  const focused = React39.useRef(false);
  React39.useEffect(() => {
    if (!focused.current) setText(show(value));
  }, [value]);
  const el = React39.useRef(null);
  const locked = !!rest.disabled || !!rest.readOnly;
  const fit = (v) => {
    let n = Number(v.toFixed(places));
    if (min !== void 0 && n < min) n = min;
    if (max !== void 0 && n > max) n = max;
    return n;
  };
  const parse = (s) => {
    const t = s.trim().replace(/−/g, "-").replace(",", ".");
    if (t === "") return null;
    const n = Number(t);
    return t !== "-" && t !== "." && isFinite(n) ? n : void 0;
  };
  const commit = (v) => {
    if (!controlled) setOwnValue(v);
    if (v !== value && props.onValueChange) props.onValueChange(v);
  };
  const nudge = (by) => {
    if (locked) return;
    const base = parse(text2);
    const from = typeof base === "number" ? base : value != null ? value : min !== void 0 && min > 0 ? min - step : max !== void 0 && max < 0 ? max + step : 0;
    const next2 = fit(from + by * step);
    setText(show(next2));
    commit(next2);
  };
  const onChange = (e) => {
    setText(e.target.value);
    const n = parse(e.target.value);
    if (n === null || n !== void 0 && (min === void 0 || n >= min) && (max === void 0 || n <= max)) commit(n);
    if (rest.onChange) rest.onChange(e);
  };
  const onBlur = (e) => {
    focused.current = false;
    const n = parse(text2);
    const v = n == null ? null : fit(n === void 0 ? value != null ? value : 0 : n);
    const out = n === void 0 ? value : v;
    setText(show(out));
    commit(out);
    if (rest.onBlur) rest.onBlur(e);
  };
  const onKeyDown = (e) => {
    if (rest.onKeyDown) rest.onKeyDown(e);
    if (e.defaultPrevented) return;
    const k = e.key, big = e.shiftKey ? large : 1;
    if (k === "ArrowUp") nudge(big);
    else if (k === "ArrowDown") nudge(-big);
    else if (k === "PageUp") nudge(large);
    else if (k === "PageDown") nudge(-large);
    else if (k === "Home" && min !== void 0 && !locked) {
      setText(show(min));
      commit(min);
    } else if (k === "End" && max !== void 0 && !locked) {
      setText(show(max));
      commit(max);
    } else if (k === "Enter") {
      const n = parse(text2);
      if (n != null) {
        const v = fit(n);
        setText(show(v));
        commit(v);
      }
      return;
    } else return;
    e.preventDefault();
  };
  const current = parse(text2);
  const now = typeof current === "number" ? current : value;
  const left = asIcon(props.leftIcon);
  const press = (by) => () => {
    nudge(by);
    if (el.current && document.activeElement !== el.current) el.current.focus({ preventScroll: true });
  };
  return /* @__PURE__ */ React39.createElement(
    "span",
    {
      className: cn("dk-input dk-number-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.steppers !== false && "dk-number-input--steppers", props.className),
      style: props.style,
      "data-component": "number-input",
      "data-size": size
    },
    left != null && left !== false ? /* @__PURE__ */ React39.createElement("span", { className: "dk-input__icon dk-input__icon--left", "aria-hidden": true }, left) : null,
    /* @__PURE__ */ React39.createElement(
      "input",
      {
        ...rest,
        ref: (n) => {
          el.current = n;
          if (typeof ref === "function") ref(n);
          else if (ref) ref.current = n;
        },
        type: "text",
        inputMode: rest.inputMode || (places > 0 || min !== void 0 && min < 0 || min === void 0 ? "decimal" : "numeric"),
        role: "spinbutton",
        "aria-valuenow": now != null ? now : void 0,
        "aria-valuemin": min,
        "aria-valuemax": max,
        autoComplete: rest.autoComplete || "off",
        className: "dk-input__field",
        value: text2,
        onChange,
        onBlur,
        onKeyDown,
        onFocus: (e) => {
          focused.current = true;
          if (rest.onFocus) rest.onFocus(e);
        }
      }
    ),
    props.steppers !== false ? /* @__PURE__ */ React39.createElement("span", { className: "dk-number-input__steppers" }, /* @__PURE__ */ React39.createElement(
      "button",
      {
        type: "button",
        tabIndex: -1,
        className: "dk-number-input__step",
        "aria-label": props.decrementLabel || "Decrease",
        "aria-controls": rest.id,
        disabled: locked || min !== void 0 && now != null && now <= min,
        onClick: press(-1),
        onMouseDown: (e) => e.preventDefault()
      },
      /* @__PURE__ */ React39.createElement(Icon, { name: "remove" })
    ), /* @__PURE__ */ React39.createElement(
      "button",
      {
        type: "button",
        tabIndex: -1,
        className: "dk-number-input__step",
        "aria-label": props.incrementLabel || "Increase",
        "aria-controls": rest.id,
        disabled: locked || max !== void 0 && now != null && now >= max,
        onClick: press(1),
        onMouseDown: (e) => e.preventDefault()
      },
      /* @__PURE__ */ React39.createElement(Icon, { name: "add" })
    )) : null
  );
});
NumberInput.displayName = "NumberInput";

// src/components/Pagination/Pagination.tsx
import * as React40 from "react";
function paginationRange(page, count, siblings = 1, boundaries = 1) {
  const r = (a, b) => {
    const o = [];
    for (let i = a; i <= b; i++) o.push(i);
    return o;
  };
  const start = r(1, Math.min(boundaries, count));
  const end = r(Math.max(count - boundaries + 1, boundaries + 1), count);
  const sibStart = Math.max(Math.min(page - siblings, count - boundaries - siblings * 2 - 1), boundaries + 2);
  const sibEnd = Math.min(Math.max(page + siblings, boundaries + siblings * 2 + 2), end.length > 0 ? end[0] - 2 : count - 1);
  const out = start.slice();
  if (sibStart > boundaries + 2) out.push("start-ellipsis");
  else if (boundaries + 1 < count - boundaries) out.push(boundaries + 1);
  out.push(...r(sibStart, sibEnd));
  if (sibEnd < count - boundaries - 1) out.push("end-ellipsis");
  else if (count - boundaries > boundaries) out.push(count - boundaries);
  out.push(...end);
  return out.filter((e, i) => out.indexOf(e) === i);
}
function int(v, min, fallback) {
  return typeof v === "number" && isFinite(v) && v >= min ? Math.floor(v) : fallback;
}
var Pagination = React40.forwardRef(function Pagination2(props, ref) {
  const rest = omit(props, { count: 1, page: 1, defaultPage: 1, onPageChange: 1, getHref: 1, siblings: 1, boundaries: 1, size: 1, previousLabel: 1, nextLabel: 1, pageLabel: 1, className: 1 });
  const count = int(props.count, 0, 0);
  const [own, setOwn] = React40.useState(() => int(props.defaultPage, 1, 1));
  const controlled = props.page !== void 0;
  const page = Math.min(Math.max(int(controlled ? props.page : own, 1, 1), 1), Math.max(count, 1));
  const size = oneOf(["sm", "md"], props.size, "md");
  const label = props.pageLabel || ((n) => "Page " + n);
  const go = (n, e) => {
    if (n < 1 || n > count || n === page) {
      if (!props.getHref || n === page) e.preventDefault();
      return;
    }
    if (!controlled) setOwn(n);
    if (props.onPageChange) props.onPageChange(n);
  };
  const item = (n, content, aria, disabled, cls) => {
    const common = Object.assign({ className: cn("dk-pagination__item", cls), onClick: (e) => go(n, e) }, aria);
    if (props.getHref) return disabled ? /* @__PURE__ */ React40.createElement("a", { ...common, role: "link", "aria-disabled": "true" }, content) : /* @__PURE__ */ React40.createElement("a", { ...common, href: props.getHref(n) }, content);
    return /* @__PURE__ */ React40.createElement("button", { type: "button", ...common, disabled }, content);
  };
  const arrow = (dir) => {
    const n = dir === "prev" ? page - 1 : page + 1;
    const icons = dir === "prev" ? /* @__PURE__ */ React40.createElement(React40.Fragment, null, /* @__PURE__ */ React40.createElement(Icon, { name: "chevron_left", className: "dk-pagination__ltr" }), /* @__PURE__ */ React40.createElement(Icon, { name: "chevron_right", className: "dk-pagination__rtl" })) : /* @__PURE__ */ React40.createElement(React40.Fragment, null, /* @__PURE__ */ React40.createElement(Icon, { name: "chevron_right", className: "dk-pagination__ltr" }), /* @__PURE__ */ React40.createElement(Icon, { name: "chevron_left", className: "dk-pagination__rtl" }));
    return /* @__PURE__ */ React40.createElement("li", { key: dir }, item(n, icons, { "aria-label": dir === "prev" ? props.previousLabel || "Previous page" : props.nextLabel || "Next page", rel: props.getHref ? dir : void 0 }, n < 1 || n > count, "dk-pagination__arrow"));
  };
  return /* @__PURE__ */ React40.createElement("nav", { "aria-label": "Pagination", ...rest, ref, "data-component": "pagination", className: cn("dk-pagination", size === "sm" && "dk-pagination--sm", props.className) }, /* @__PURE__ */ React40.createElement("ul", { className: "dk-pagination__list" }, arrow("prev"), paginationRange(page, count, int(props.siblings, 0, 1), int(props.boundaries, 0, 1)).map((e) => typeof e === "number" ? /* @__PURE__ */ React40.createElement("li", { key: e }, item(e, e, { "aria-label": label(e), "aria-current": e === page ? "page" : void 0 }, false, e === page ? "dk-pagination__item--current" : "")) : /* @__PURE__ */ React40.createElement("li", { key: e, className: "dk-pagination__ellipsis", "aria-hidden": "true" }, "\u2026")), arrow("next")));
});
Pagination.displayName = "Pagination";

// src/components/PasswordInput/PasswordInput.tsx
import * as React41 from "react";
var SIZES5 = ["sm", "md", "lg"];
var PasswordInput = React41.forwardRef(function PasswordInput2(props, ref) {
  const rest = omit(props, { size: 1, invalid: 1, leftIcon: 1, className: 1, style: 1, visible: 1, defaultVisible: 1, onVisibleChange: 1, toggleLabel: 1 });
  const size = oneOf(SIZES5, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  if (rest.autoComplete === void 0) rest.autoComplete = "current-password";
  const [own2, setOwn] = React41.useState(!!props.defaultVisible);
  const controlled = props.visible !== void 0;
  const shown = controlled ? !!props.visible : own2;
  const left = asIcon(props.leftIcon);
  const toggle = () => {
    if (!controlled) setOwn(!shown);
    if (props.onVisibleChange) props.onVisibleChange(!shown);
  };
  return /* @__PURE__ */ React41.createElement(
    "span",
    {
      className: cn("dk-input dk-password-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className),
      style: props.style,
      "data-component": "password-input",
      "data-size": size
    },
    left != null && left !== false ? /* @__PURE__ */ React41.createElement("span", { className: "dk-input__icon dk-input__icon--left", "aria-hidden": true }, left) : null,
    /* @__PURE__ */ React41.createElement("input", { ...rest, ref, type: shown ? "text" : "password", className: "dk-input__field", spellCheck: false, autoCapitalize: "off" }),
    /* @__PURE__ */ React41.createElement(
      "button",
      {
        type: "button",
        className: "dk-password-input__toggle",
        "aria-label": props.toggleLabel || "Show password",
        "aria-pressed": shown,
        "aria-controls": rest.id,
        disabled: rest.disabled,
        onClick: toggle,
        onMouseDown: (e) => e.preventDefault()
      },
      /* @__PURE__ */ React41.createElement(Icon, { name: shown ? "visibility_off" : "visibility" })
    )
  );
});
PasswordInput.displayName = "PasswordInput";

// src/components/Popover/Popover.tsx
import * as React42 from "react";
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Popover(props) {
  const id = domId("dk-pop", React42.useId());
  const [inner, setInner] = React42.useState(false);
  const controlled = props.open !== void 0;
  const open = controlled ? !!props.open : inner;
  const panelRef = React42.useRef(null);
  const triggerRef = React42.useRef(null);
  const ask = React42.useRef(props.onOpenChange);
  ask.current = props.onOpenChange;
  const set = React42.useCallback((v) => {
    if (!controlled) setInner(v);
    if (ask.current) ask.current(v);
  }, [controlled]);
  const close = React42.useCallback((focusTrigger = true) => {
    set(false);
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
  }, [set]);
  const focusFirst = props.initialFocus !== "panel";
  useIsoLayoutEffect(() => {
    const panel = panelRef.current, trigger2 = triggerRef.current;
    if (!panel) return;
    if (!open || !trigger2) {
      hideLayer(panel);
      return;
    }
    showLayer(panel);
    const update = () => {
      const r = place(trigger2.getBoundingClientRect(), { width: panel.offsetWidth, height: panel.offsetHeight }, props.placement || "bottom", cssLength(panel, "--dk-popover-offset"), "bottom");
      panel.style.left = r.x + "px";
      panel.style.top = r.y + "px";
      panel.dataset.side = r.side;
    };
    update();
    const first = focusFirst ? panel.querySelector(FOCUSABLE) : null;
    (first || panel).focus();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(panel);
      ro.observe(trigger2);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, props.placement]);
  React42.useEffect(() => {
    if (!open) return;
    const down = (e) => {
      const t = e.target;
      if (panelRef.current && panelRef.current.contains(t)) return;
      if (triggerRef.current && triggerRef.current.contains(t)) return;
      close(false);
    };
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, [open, close]);
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close(true);
    }
  };
  const onBlur = (e) => {
    const to = e.relatedTarget;
    if (!to) return;
    if (panelRef.current && panelRef.current.contains(to)) return;
    if (triggerRef.current && triggerRef.current.contains(to)) return;
    close(false);
  };
  const child = React42.Children.only(props.trigger);
  const cp = child.props;
  const childRef = elementRef(child);
  const trigger = React42.cloneElement(child, {
    ref: (n) => {
      triggerRef.current = n;
      if (childRef) setRef(childRef, n);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? id : void 0,
    onClick: (e) => {
      if (cp.onClick) cp.onClick(e);
      if (e.defaultPrevented) return;
      set(!open);
    }
  });
  const titled = props.title != null && props.title !== false && props.title !== "";
  const content = typeof props.children === "function" ? props.children(() => close(true)) : props.children;
  return /* @__PURE__ */ React42.createElement(React42.Fragment, null, trigger, /* @__PURE__ */ React42.createElement(
    "div",
    {
      ref: panelRef,
      id,
      role: "dialog",
      tabIndex: -1,
      ...{ popover: "manual" },
      hidden: !open || void 0,
      "aria-labelledby": titled ? id + "-title" : void 0,
      "aria-label": titled ? void 0 : props["aria-label"],
      className: cn("dk-popover", props.className),
      style: props.style,
      "data-component": "popover",
      "data-state": open ? "open" : "closed",
      onKeyDown,
      onBlur
    },
    open ? /* @__PURE__ */ React42.createElement(React42.Fragment, null, titled ? /* @__PURE__ */ React42.createElement("div", { id: id + "-title", className: "dk-popover__title" }, props.title) : null, /* @__PURE__ */ React42.createElement("div", { className: "dk-popover__body" }, content)) : null
  ));
}
Popover.displayName = "Popover";

// src/components/Progress/Progress.tsx
import * as React43 from "react";
var TONES4 = ["primary", "success", "warning", "danger"];
var OWN15 = { value: 1, max: 1, variant: 1, size: 1, tone: 1, label: 1, showValue: 1, formatValue: 1, className: 1 };
var pct = (v, max) => Math.round(v / max * 100) + "%";
var Progress = React43.forwardRef(function Progress2(props, ref) {
  const rest = omit(props, OWN15);
  const base = domId("dk-prg", React43.useId());
  const variant = props.variant === "circle" ? "circle" : "bar";
  const size = oneOf(SIZES, props.size, "md");
  const tone = oneOf(TONES4, props.tone, "primary");
  const max = Number(props.max) > 0 ? Number(props.max) : 100;
  const known = props.value != null && isFinite(Number(props.value));
  const value = known ? Math.min(max, Math.max(0, Number(props.value))) : 0;
  const text2 = known ? props.formatValue ? props.formatValue(value, max) : pct(value, max) : "";
  const hasLabel = props.label != null && props.label !== false && props.label !== "";
  const showValue = !!props.showValue && known;
  const share = known ? value / max : 0;
  const aria = { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max };
  if (known) {
    aria["aria-valuenow"] = value;
    aria["aria-valuetext"] = text2;
  }
  if (hasLabel && variant === "bar" && !rest["aria-label"] && !rest["aria-labelledby"]) aria["aria-labelledby"] = base + "-label";
  const cls = cn("dk-progress", "dk-progress--" + variant, "dk-progress--size-" + size, tone !== "primary" && "dk-progress--" + tone, !known && "dk-progress--indeterminate", props.className);
  const data = { "data-component": "progress", "data-variant": variant, "data-size": size, "data-tone": tone, "data-state": known ? value >= max ? "complete" : "loading" : "indeterminate" };
  if (variant === "circle") {
    return /* @__PURE__ */ React43.createElement("div", { ...rest, ...aria, ...data, ref, className: cls }, /* @__PURE__ */ React43.createElement("svg", { className: "dk-progress__ring", viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" }, /* @__PURE__ */ React43.createElement("circle", { className: "dk-progress__track", cx: 12, cy: 12, r: 10.5 }), /* @__PURE__ */ React43.createElement("circle", { className: "dk-progress__arc", cx: 12, cy: 12, r: 10.5, pathLength: 100, strokeDasharray: known ? share * 100 + " 100" : "25 100" })), showValue && size !== "sm" ? /* @__PURE__ */ React43.createElement("span", { className: "dk-progress__value", "aria-hidden": true }, text2) : null);
  }
  const outer = omit(rest, { "aria-label": 1, "aria-labelledby": 1 });
  return /* @__PURE__ */ React43.createElement("div", { ...outer, ...data, ref, className: cls }, hasLabel || showValue ? /* @__PURE__ */ React43.createElement("div", { className: "dk-progress__header" }, hasLabel ? /* @__PURE__ */ React43.createElement("span", { className: "dk-progress__label", id: base + "-label" }, props.label) : null, showValue ? /* @__PURE__ */ React43.createElement("span", { className: "dk-progress__value", "aria-hidden": true }, text2) : null) : null, /* @__PURE__ */ React43.createElement("div", { ...aria, className: "dk-progress__track", "aria-label": rest["aria-label"], "aria-labelledby": rest["aria-labelledby"] || aria["aria-labelledby"] }, /* @__PURE__ */ React43.createElement("div", { className: "dk-progress__fill", style: known ? { inlineSize: share * 100 + "%" } : void 0 })));
});
Progress.displayName = "Progress";

// src/components/Radio/Radio.tsx
import * as React44 from "react";
var RadioContext = React44.createContext(null);
var GROUP_OWN = { name: 1, value: 1, defaultValue: 1, onChange: 1, orientation: 1, size: 1, invalid: 1, disabled: 1, required: 1, children: 1, className: 1 };
var RadioGroup = React44.forwardRef(function RadioGroup2(props, ref) {
  const rest = omit(props, GROUP_OWN);
  const autoName = domId("dk-rg", React44.useId());
  const controlled = props.value !== void 0;
  const [picked, setPicked] = React44.useState(props.defaultValue), cur = controlled ? props.value : picked;
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  const orientation = props.orientation === "horizontal" ? "horizontal" : "vertical";
  const onChange = props.onChange;
  const ctx = {
    name: props.name || autoName,
    value: cur,
    size: props.size,
    invalid,
    disabled: !!props.disabled,
    required: !!props.required,
    select: function(v, e) {
      if (!controlled) setPicked(v);
      if (onChange) onChange(v, e);
    }
  };
  return /* @__PURE__ */ React44.createElement(
    "div",
    {
      ...rest,
      ref,
      role: "radiogroup",
      "aria-invalid": invalid || void 0,
      "aria-required": props.required || void 0,
      "aria-disabled": props.disabled || void 0,
      className: cn("dk-radio-group", "dk-radio-group--" + orientation, invalid && "dk-radio-group--invalid", props.className),
      "data-component": "radio-group",
      "data-orientation": orientation
    },
    /* @__PURE__ */ React44.createElement(RadioContext.Provider, { value: ctx }, props.children)
  );
});
RadioGroup.displayName = "RadioGroup";
var OWN16 = { size: 1, invalid: 1, description: 1, children: 1, className: 1, style: 1, type: 1 };
var Radio = React44.forwardRef(function Radio2(props, ref) {
  const ctx = React44.useContext(RadioContext);
  const rest = omit(props, OWN16);
  const size = oneOf(SIZES, props.size, oneOf(SIZES, ctx && ctx.size, "md"));
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  if (ctx) {
    const own = rest.onChange;
    rest.name = ctx.name;
    rest.checked = ctx.value != null && String(ctx.value) === String(props.value);
    delete rest.defaultChecked;
    rest.onChange = function(e) {
      if (own) own(e);
      ctx.select(props.value, e);
    };
    if (ctx.disabled) rest.disabled = true;
    if (ctx.required) rest.required = true;
  }
  const base = domId("dk-rd", React44.useId()), labelId = base + "-label", descId = base + "-desc";
  const hasLabel = props.children != null && props.children !== false && props.children !== "";
  const hasDesc = props.description != null && props.description !== false && props.description !== "";
  if (hasDesc) rest["aria-describedby"] = cn(rest["aria-describedby"], descId);
  if (hasDesc && hasLabel && rest["aria-label"] == null && rest["aria-labelledby"] == null) rest["aria-labelledby"] = labelId;
  return /* @__PURE__ */ React44.createElement("label", { className: cn("dk-radio", "dk-radio--size-" + size, (invalid || ctx && ctx.invalid) && "dk-radio--invalid", rest.disabled && "dk-radio--disabled", !hasLabel && !hasDesc && "dk-radio--bare", props.className), style: props.style, "data-component": "radio", "data-size": size }, /* @__PURE__ */ React44.createElement("span", { className: "dk-radio__control", key: "control" }, /* @__PURE__ */ React44.createElement("input", { ...rest, ref, type: "radio", className: "dk-radio__input", key: "input" }), /* @__PURE__ */ React44.createElement("span", { className: "dk-radio__dot", "aria-hidden": true, key: "dot" })), hasLabel || hasDesc ? /* @__PURE__ */ React44.createElement("span", { className: "dk-radio__text", key: "text" }, hasLabel ? /* @__PURE__ */ React44.createElement("span", { className: "dk-radio__label", id: labelId, key: "label" }, props.children) : null, hasDesc ? /* @__PURE__ */ React44.createElement("span", { className: "dk-radio__description", id: descId, key: "desc" }, props.description) : null) : null);
});
Radio.displayName = "Radio";

// src/components/SearchInput/SearchInput.tsx
import * as React45 from "react";
var setValue = Object.getOwnPropertyDescriptor(typeof HTMLInputElement === "undefined" ? {} : HTMLInputElement.prototype, "value");
var SearchInput = React45.forwardRef(function SearchInput2(props, ref) {
  var _a, _b, _c;
  const rest = omit(props, { size: 1, invalid: 1, className: 1, style: 1, onSearch: 1, onClear: 1, clearLabel: 1, loading: 1, loadingLabel: 1 });
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const el = React45.useRef(null);
  const controlled = props.value !== void 0;
  const [typed, setTyped] = React45.useState(String((_a = props.defaultValue) != null ? _a : ""));
  const text2 = controlled ? String((_b = props.value) != null ? _b : "") : typed;
  const locked = !!rest.disabled || !!rest.readOnly;
  const clear = () => {
    const i = el.current;
    if (!i) return;
    if (setValue && setValue.set) setValue.set.call(i, "");
    else i.value = "";
    i.dispatchEvent(new Event("input", { bubbles: true }));
    if (!controlled) setTyped("");
    i.focus();
    if (props.onClear) props.onClear();
  };
  const onChange = (e) => {
    if (!controlled) setTyped(e.target.value);
    if (rest.onChange) rest.onChange(e);
  };
  const onKeyDown = (e) => {
    if (rest.onKeyDown) rest.onKeyDown(e);
    if (e.defaultPrevented) return;
    if (e.key === "Escape" && e.currentTarget.value !== "" && !locked) {
      e.preventDefault();
      e.stopPropagation();
      clear();
    } else if (e.key === "Enter" && props.onSearch) props.onSearch(e.currentTarget.value);
  };
  return /* @__PURE__ */ React45.createElement(
    "span",
    {
      className: cn("dk-input dk-search-input", "dk-input--size-" + size, invalid && "dk-input--invalid", rest.disabled && "dk-input--disabled", rest.readOnly && "dk-input--readonly", props.className),
      style: props.style,
      "data-component": "search-input",
      "data-size": size
    },
    /* @__PURE__ */ React45.createElement("span", { className: "dk-input__icon dk-input__icon--left dk-search-input__icon", "aria-hidden": props.loading ? void 0 : true }, props.loading ? /* @__PURE__ */ React45.createElement(Loader, { size: "sm", delay: 0, label: (_c = props.loadingLabel) != null ? _c : "Searching" }) : /* @__PURE__ */ React45.createElement(Icon, { name: "search" })),
    /* @__PURE__ */ React45.createElement(
      "input",
      {
        ...rest,
        ref: (n) => {
          el.current = n;
          if (typeof ref === "function") ref(n);
          else if (ref) ref.current = n;
        },
        type: "search",
        enterKeyHint: rest.enterKeyHint || "search",
        className: "dk-input__field",
        onChange,
        onKeyDown
      }
    ),
    text2 !== "" && !locked ? /* @__PURE__ */ React45.createElement(
      "button",
      {
        type: "button",
        className: "dk-search-input__clear",
        "aria-label": props.clearLabel || "Clear search",
        "aria-controls": rest.id,
        onClick: clear,
        onMouseDown: (e) => e.preventDefault()
      },
      /* @__PURE__ */ React45.createElement(Icon, { name: "close" })
    ) : null
  );
});
SearchInput.displayName = "SearchInput";

// src/components/SegmentedControl/SegmentedControl.tsx
import * as React46 from "react";
var OWN17 = { options: 1, value: 1, defaultValue: 1, onValueChange: 1, size: 1, fullWidth: 1, disabled: 1, name: 1, className: 1 };
var SegmentedControl = React46.forwardRef(function SegmentedControl2(props, ref) {
  var _a;
  const rest = omit(props, OWN17);
  const options = props.options || [];
  const disabled = !!props.disabled;
  const usable = options.filter((o) => !o.disabled && !disabled);
  const controlled = props.value !== void 0;
  const [own, setOwn] = React46.useState((_a = props.defaultValue) != null ? _a : (options.find((o) => !o.disabled) || {}).value);
  const value = controlled ? props.value : own;
  const root = React46.useRef(null);
  const buttons = React46.useRef({});
  const [box, setBox] = React46.useState(null);
  const size = props.size === "sm" ? "sm" : "md";
  const choose = (v, focus) => {
    if (focus) {
      const b = buttons.current[v];
      if (b) b.focus();
    }
    if (v === value) return;
    if (!controlled) setOwn(v);
    if (props.onValueChange) props.onValueChange(v);
  };
  const measure = React46.useCallback(() => {
    const r = root.current, b = value != null ? buttons.current[value] : null;
    if (!r || !b) {
      setBox(null);
      return;
    }
    setBox({ x: b.offsetLeft, w: b.offsetWidth });
  }, [value]);
  useIsoLayoutEffect(measure, [measure, options.length, size, props.fullWidth]);
  React46.useEffect(() => {
    const r = root.current;
    if (!r || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(r);
    for (const k in buttons.current) {
      const b = buttons.current[k];
      if (b) ro.observe(b);
    }
    return () => ro.disconnect();
  }, [measure, options.length]);
  const onKeyDown = (e) => {
    if (!usable.length) return;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const i = usable.findIndex((o) => o.value === value);
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
        n = usable.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    choose(usable[(n + usable.length) % usable.length].value, true);
  };
  const checkedUsable = usable.some((o) => o.value === value);
  return /* @__PURE__ */ React46.createElement(
    "div",
    {
      ...rest,
      ref: (n) => {
        root.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      role: "radiogroup",
      "aria-disabled": disabled || void 0,
      className: cn("dk-segmented", "dk-segmented--size-" + size, props.fullWidth && "dk-segmented--full", disabled && "dk-segmented--disabled", props.className),
      "data-component": "segmented-control",
      "data-size": size
    },
    box ? /* @__PURE__ */ React46.createElement("span", { className: "dk-segmented__indicator", "aria-hidden": true, style: { left: box.x, width: box.w } }) : null,
    options.map((o) => {
      const on = o.value === value, off = disabled || !!o.disabled;
      const icon = asIcon(o.icon);
      const hasLabel = o.label != null && o.label !== false && o.label !== "";
      const tab = off ? -1 : on || !checkedUsable && usable[0] && usable[0].value === o.value ? 0 : -1;
      return /* @__PURE__ */ React46.createElement(
        "button",
        {
          key: o.value,
          ref: (n) => {
            buttons.current[o.value] = n;
          },
          type: "button",
          role: "radio",
          "aria-checked": on,
          "aria-label": o["aria-label"],
          disabled: off,
          tabIndex: tab,
          "data-value": o.value,
          className: cn("dk-segmented__item", on && "dk-segmented__item--selected", !hasLabel && "dk-segmented__item--icon-only"),
          onClick: () => choose(o.value),
          onKeyDown
        },
        icon != null && icon !== false ? /* @__PURE__ */ React46.createElement("span", { className: "dk-segmented__icon", "aria-hidden": true }, icon) : null,
        hasLabel ? /* @__PURE__ */ React46.createElement("span", { className: "dk-segmented__label" }, o.label) : null
      );
    }),
    props.name ? /* @__PURE__ */ React46.createElement("input", { type: "hidden", name: props.name, value: value != null ? value : "", disabled }) : null
  );
});
SegmentedControl.displayName = "SegmentedControl";

// src/components/Select/Select.tsx
import * as React47 from "react";
var OWN18 = { size: 1, invalid: 1, leftIcon: 1, placeholder: 1, options: 1, children: 1, className: 1, style: 1, multiple: 1 };
function optionNodes(list) {
  return (list || []).map(function(o, i) {
    if (o != null && typeof o === "object" && "options" in o && Array.isArray(o.options)) return /* @__PURE__ */ React47.createElement("optgroup", { key: "g" + i, label: o.label, disabled: o.disabled }, optionNodes(o.options));
    const v = o != null && typeof o === "object" ? o : { value: o, label: o, disabled: void 0 };
    return /* @__PURE__ */ React47.createElement("option", { key: String(v.value), value: v.value, disabled: v.disabled }, v.label != null ? v.label : v.value);
  });
}
var Select = React47.forwardRef(function Select2(props, ref) {
  const rest = omit(props, OWN18);
  if (props.multiple) warnOnce("select-multiple", "Serupa.Select: multiple isn't supported (a native multi-select is hard to use); use checkboxes instead. It was ignored.");
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const hasPh = props.placeholder != null && props.placeholder !== "";
  const controlled = rest.value !== void 0;
  if (hasPh && !controlled && rest.defaultValue === void 0) rest.defaultValue = "";
  const [picked, setPicked] = React47.useState(controlled ? rest.value : rest.defaultValue), cur = controlled ? rest.value : picked;
  const onChange = rest.onChange;
  rest.onChange = function(e) {
    if (!controlled) setPicked(e.target.value);
    if (onChange) onChange(e);
  };
  const empty = hasPh && (cur == null || cur === "");
  const left = asIcon(props.leftIcon);
  return /* @__PURE__ */ React47.createElement("span", { className: cn("dk-select", "dk-select--size-" + size, invalid && "dk-select--invalid", rest.disabled && "dk-select--disabled", empty && "dk-select--empty", left != null && left !== false && "dk-select--has-icon", props.className), style: props.style, "data-component": "select", "data-size": size }, left == null || left === false ? null : /* @__PURE__ */ React47.createElement("span", { className: "dk-select__icon dk-select__icon--left", "aria-hidden": true, key: "left" }, left), /* @__PURE__ */ React47.createElement("select", { ...rest, ref, className: "dk-select__field", key: "field" }, hasPh ? /* @__PURE__ */ React47.createElement("option", { value: "", disabled: true, key: "__placeholder" }, props.placeholder) : null, optionNodes(props.options), props.children), /* @__PURE__ */ React47.createElement("span", { className: "dk-select__icon dk-select__icon--chevron", "aria-hidden": true, key: "chevron" }, /* @__PURE__ */ React47.createElement(Icon, { name: "expand_more" })));
});
Select.displayName = "Select";

// src/components/Sidebar/Sidebar.tsx
import * as React49 from "react";

// src/components/Tooltip/Tooltip.tsx
import * as React48 from "react";
function Tooltip(props) {
  const id = domId("dk-tip", React48.useId());
  const [inner, setInner] = React48.useState(false);
  const controlled = props.open !== void 0;
  const open = !props.disabled && (controlled ? !!props.open : inner);
  const tipRef = React48.useRef(null);
  const anchorRef = React48.useRef(null);
  const timer = React48.useRef(void 0);
  const onOpenChange = React48.useRef(props.onOpenChange);
  onOpenChange.current = props.onOpenChange;
  const set = React48.useCallback((v) => {
    window.clearTimeout(timer.current);
    if (!controlled) setInner(v);
    if (onOpenChange.current) onOpenChange.current(v);
  }, [controlled]);
  const later = (v, ms) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => set(v), ms);
  };
  React48.useEffect(() => () => window.clearTimeout(timer.current), []);
  useIsoLayoutEffect(() => {
    const tip = tipRef.current, anchor = anchorRef.current;
    if (!tip) return;
    if (!open || !anchor) {
      hideLayer(tip);
      return;
    }
    showLayer(tip);
    const update = () => {
      const offset = cssLength(tip, "--dk-tooltip-offset");
      const r = place(anchor.getBoundingClientRect(), { width: tip.offsetWidth, height: tip.offsetHeight }, props.placement, offset, "top");
      tip.style.left = r.x + "px";
      tip.style.top = r.y + "px";
      tip.dataset.side = r.side;
    };
    update();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(tip);
      ro.observe(anchor);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, props.placement, props.content]);
  React48.useEffect(() => {
    if (!open) return;
    const esc = (e) => {
      if (e.key === "Escape") set(false);
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, set]);
  const child = React48.Children.only(props.children);
  const cp = child.props;
  const delay = props.delay == null ? 400 : props.delay;
  const chain2 = (name, fn) => (e) => {
    const own = cp[name];
    if (typeof own === "function") own(e);
    fn(e);
  };
  const childRef = elementRef(child);
  const aria = props.role === "label" ? "aria-labelledby" : "aria-describedby";
  const merged = [cp[aria], id].filter(Boolean).join(" ");
  const trigger = React48.cloneElement(child, {
    ref: (n) => {
      anchorRef.current = n;
      if (childRef) setRef(childRef, n);
    },
    [aria]: merged,
    onMouseEnter: chain2("onMouseEnter", () => later(true, delay)),
    onMouseLeave: chain2("onMouseLeave", () => later(false, 100)),
    onFocus: chain2("onFocus", (e) => {
      const t = e.target;
      if (!t.matches || t.matches(":focus-visible")) set(true);
    }),
    onBlur: chain2("onBlur", () => set(false)),
    onPointerDown: chain2("onPointerDown", () => set(false))
  });
  return /* @__PURE__ */ React48.createElement(React48.Fragment, null, trigger, /* @__PURE__ */ React48.createElement(
    "div",
    {
      ref: tipRef,
      id,
      role: "tooltip",
      ...{ popover: "manual" },
      hidden: !open || void 0,
      className: cn("dk-tooltip", props.className),
      style: props.style,
      "data-component": "tooltip",
      "data-state": open ? "open" : "closed",
      onMouseEnter: () => window.clearTimeout(timer.current),
      onMouseLeave: () => later(false, 100)
    },
    props.content
  ));
}
Tooltip.displayName = "Tooltip";

// src/components/Sidebar/Sidebar.tsx
var SidebarContext = React49.createContext({ collapsed: false, depth: 0 });
function isSection(c) {
  return React49.isValidElement(c) && c.type === SidebarSection;
}
var Sidebar = React49.forwardRef(function Sidebar2(props, ref) {
  const rest = omit(props, { header: 1, footer: 1, collapsed: 1, className: 1, children: 1, "aria-label": 1 });
  const collapsed = !!props.collapsed;
  const body = [];
  let run = [];
  const flush = () => {
    if (run.length) {
      body.push(/* @__PURE__ */ React49.createElement("ul", { key: "l" + body.length, className: "dk-sidebar__list" }, run));
      run = [];
    }
  };
  React49.Children.forEach(props.children, (c) => {
    if (isSection(c)) {
      flush();
      body.push(c);
    } else if (c != null && c !== false) run.push(c);
  });
  flush();
  return /* @__PURE__ */ React49.createElement(SidebarContext.Provider, { value: { collapsed, depth: 0 } }, /* @__PURE__ */ React49.createElement(
    "nav",
    {
      ...rest,
      "aria-label": props["aria-label"] || "Main",
      ref,
      "data-component": "sidebar",
      "data-collapsed": collapsed ? "" : void 0,
      className: cn("dk-sidebar", collapsed && "dk-sidebar--collapsed", props.className)
    },
    props.header != null ? /* @__PURE__ */ React49.createElement("div", { className: "dk-sidebar__header" }, props.header) : null,
    /* @__PURE__ */ React49.createElement("div", { className: "dk-sidebar__body" }, body),
    props.footer != null ? /* @__PURE__ */ React49.createElement("div", { className: "dk-sidebar__footer" }, props.footer) : null
  ));
});
Sidebar.displayName = "Sidebar";
var SidebarSection = React49.forwardRef(function SidebarSection2(props, ref) {
  const rest = omit(props, { title: 1, className: 1, children: 1 });
  const id = domId("dk-sbs", React49.useId());
  const titled = props.title != null && props.title !== false && props.title !== "";
  return /* @__PURE__ */ React49.createElement("div", { ...rest, ref, className: cn("dk-sidebar__section", props.className) }, titled ? /* @__PURE__ */ React49.createElement("div", { id, className: "dk-sidebar__section-title" }, props.title) : null, /* @__PURE__ */ React49.createElement("ul", { className: "dk-sidebar__list", "aria-labelledby": titled ? id : void 0 }, props.children));
});
SidebarSection.displayName = "SidebarSection";
var SidebarItem = React49.forwardRef(function SidebarItem2(props, ref) {
  const ctx = React49.useContext(SidebarContext);
  const rest = omit(props, { label: 1, icon: 1, active: 1, badge: 1, children: 1, defaultOpen: 1, as: 1, className: 1 });
  const kids = React49.Children.toArray(props.children).filter(React49.isValidElement);
  const group = kids.length > 0;
  const childActive = kids.some((k) => k.props.active);
  const [open, setOpen] = React49.useState(props.defaultOpen != null ? !!props.defaultOpen : childActive);
  const listId = domId("dk-sbi", React49.useId());
  const rail = ctx.collapsed && ctx.depth === 0;
  const inner = (chevron) => /* @__PURE__ */ React49.createElement(React49.Fragment, null, props.icon ? /* @__PURE__ */ React49.createElement("span", { className: "dk-sidebar__icon" }, asIcon(props.icon)) : null, /* @__PURE__ */ React49.createElement("span", { className: "dk-sidebar__label" }, props.label), props.badge != null && !rail ? /* @__PURE__ */ React49.createElement("span", { className: "dk-sidebar__badge" }, props.badge) : null, chevron && !rail ? /* @__PURE__ */ React49.createElement(Icon, { name: "expand_more", className: "dk-sidebar__chevron" }) : null);
  const btnProps = omit(rest, { href: 1, target: 1, rel: 1, download: 1, hrefLang: 1, ping: 1, referrerPolicy: 1, type: 1, onClick: 1 });
  const cls = cn("dk-sidebar__item", ctx.depth > 0 && "dk-sidebar__item--nested", (props.active || group && childActive) && "dk-sidebar__item--active", props.className);
  if (group && rail) {
    return /* @__PURE__ */ React49.createElement("li", { className: "dk-sidebar__li" }, /* @__PURE__ */ React49.createElement(Menu, { placement: "right-start", trigger: /* @__PURE__ */ React49.createElement("button", { type: "button", ...btnProps, className: cls }, inner(false)) }, kids.map((k, i) => /* @__PURE__ */ React49.createElement(
      MenuItem,
      {
        key: k.key != null ? k.key : i,
        href: k.props.href,
        icon: k.props.icon,
        onSelect: k.props.onClick
      },
      k.props.label
    ))));
  }
  if (group) {
    return /* @__PURE__ */ React49.createElement("li", { className: "dk-sidebar__li", "data-state": open ? "open" : "closed" }, /* @__PURE__ */ React49.createElement("button", { type: "button", ...btnProps, className: cls, "aria-expanded": open, "aria-controls": listId, onClick: (e) => {
      if (props.onClick) props.onClick(e);
      setOpen(!open);
    } }, inner(true)), /* @__PURE__ */ React49.createElement(SidebarContext.Provider, { value: { collapsed: ctx.collapsed, depth: ctx.depth + 1 } }, /* @__PURE__ */ React49.createElement("ul", { id: listId, className: "dk-sidebar__list dk-sidebar__list--nested", hidden: !open }, kids)));
  }
  const link = React49.createElement(props.as || "a", Object.assign(rest, { ref, className: cls, "aria-current": props.active ? "page" : void 0 }), inner(false));
  return /* @__PURE__ */ React49.createElement("li", { className: "dk-sidebar__li" }, rail && typeof props.label === "string" ? /* @__PURE__ */ React49.createElement(Tooltip, { content: props.label, placement: "right", role: "label" }, link) : link);
});
SidebarItem.displayName = "SidebarItem";

// src/components/Slider/Slider.tsx
import * as React50 from "react";
var OWN19 = { value: 1, defaultValue: 1, onValueChange: 1, onValueCommit: 1, min: 1, max: 1, step: 1, largeStep: 1, size: 1, disabled: 1, formatValue: 1, thumbLabels: 1, name: 1, className: 1, "aria-label": 1, "aria-labelledby": 1 };
var Slider = React50.forwardRef(function Slider2(props, ref) {
  var _a;
  const rest = omit(props, OWN19);
  const min = isFinite(Number(props.min)) && props.min != null ? Number(props.min) : 0;
  const maxIn = isFinite(Number(props.max)) && props.max != null ? Number(props.max) : 100;
  const max = maxIn > min ? maxIn : min + 1;
  const step = Number(props.step) > 0 ? Number(props.step) : 1;
  const large = Number(props.largeStep) > 0 ? Number(props.largeStep) : 10;
  const places = (String(step).split(".")[1] || "").length;
  const snap = (v) => Math.min(max, Math.max(min, Number((Math.round((v - min) / step) * step + min).toFixed(places))));
  const controlled = props.value !== void 0;
  const [own, setOwn] = React50.useState((_a = props.defaultValue) != null ? _a : min);
  const raw = controlled ? props.value : own;
  const isRange = Array.isArray(raw);
  const vals = isRange ? [snap(raw[0]), snap(raw[1])].sort((a, b) => a - b) : [snap(raw)];
  const latest = React50.useRef(vals);
  latest.current = vals;
  const root = React50.useRef(null);
  const thumbs = React50.useRef([]);
  const drag = React50.useRef(null);
  const disabled = !!props.disabled;
  const pct2 = (v) => (v - min) / (max - min) * 100;
  const out = (vs) => isRange ? [vs[0], vs[1]] : vs[0];
  const text2 = (v) => props.formatValue ? props.formatValue(v) : String(v);
  const set = (i, v) => {
    const vs = latest.current.slice();
    let n = snap(v);
    if (isRange) n = i === 0 ? Math.min(n, vs[1]) : Math.max(n, vs[0]);
    if (n === vs[i]) return vs;
    vs[i] = n;
    latest.current = vs;
    if (!controlled) setOwn(out(vs));
    if (props.onValueChange) props.onValueChange(out(vs));
    return vs;
  };
  const commit = () => {
    if (props.onValueCommit) props.onValueCommit(out(latest.current));
  };
  const fromPoint = (x) => {
    const r = root.current.querySelector(".dk-slider__track").getBoundingClientRect();
    let share = r.width ? (x - r.left) / r.width : 0;
    if (getComputedStyle(root.current).direction === "rtl") share = 1 - share;
    return min + Math.min(1, Math.max(0, share)) * (max - min);
  };
  const onPointerDown = (e) => {
    if (rest.onPointerDown) rest.onPointerDown(e);
    if (disabled || e.button !== 0 || e.defaultPrevented) return;
    e.preventDefault();
    const v = fromPoint(e.clientX), vs = latest.current;
    let i = 0;
    if (isRange) {
      const d0 = Math.abs(v - vs[0]), d1 = Math.abs(v - vs[1]);
      i = d1 < d0 || d1 === d0 && v > vs[1] ? 1 : 0;
    }
    drag.current = i;
    e.currentTarget.setPointerCapture(e.pointerId);
    set(i, v);
    const t = thumbs.current[i];
    if (t) t.focus({ preventScroll: true });
  };
  const onPointerMove = (e) => {
    if (rest.onPointerMove) rest.onPointerMove(e);
    if (drag.current != null) set(drag.current, fromPoint(e.clientX));
  };
  const end = (e) => {
    if (drag.current == null) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    commit();
  };
  const onKeyDown = (i) => (e) => {
    if (disabled) return;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const by = (e.shiftKey ? large : 1) * step, v = latest.current[i];
    let n;
    switch (e.key) {
      case "ArrowUp":
        n = v + by;
        break;
      case "ArrowDown":
        n = v - by;
        break;
      case "ArrowRight":
        n = rtl ? v - by : v + by;
        break;
      case "ArrowLeft":
        n = rtl ? v + by : v - by;
        break;
      case "PageUp":
        n = v + large * step;
        break;
      case "PageDown":
        n = v - large * step;
        break;
      case "Home":
        n = isRange && i === 1 ? latest.current[0] : min;
        break;
      case "End":
        n = isRange && i === 0 ? latest.current[1] : max;
        break;
      default:
        return;
    }
    e.preventDefault();
    const before = latest.current[i];
    if (set(i, n)[i] !== before) commit();
  };
  const names = props.thumbLabels || ["Minimum", "Maximum"];
  const lo = isRange ? pct2(vals[0]) : 0, hi = pct2(vals[vals.length - 1]);
  return /* @__PURE__ */ React50.createElement(
    "div",
    {
      ...rest,
      ref: (n) => {
        root.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      role: isRange ? "group" : rest.role,
      "aria-label": isRange ? props["aria-label"] : void 0,
      "aria-labelledby": isRange ? props["aria-labelledby"] : void 0,
      className: cn("dk-slider", props.size === "sm" ? "dk-slider--size-sm" : "dk-slider--size-md", disabled && "dk-slider--disabled", props.className),
      "data-component": "slider",
      "data-size": props.size === "sm" ? "sm" : "md",
      "data-disabled": disabled ? "" : void 0,
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerCancel: end
    },
    /* @__PURE__ */ React50.createElement("div", { className: "dk-slider__track" }, /* @__PURE__ */ React50.createElement("div", { className: "dk-slider__fill", style: { insetInlineStart: lo + "%", inlineSize: hi - lo + "%" } }), vals.map((v, i) => /* @__PURE__ */ React50.createElement(
      "span",
      {
        key: i,
        ref: (n) => {
          thumbs.current[i] = n;
        },
        className: "dk-slider__thumb",
        style: { insetInlineStart: pct2(v) + "%" },
        role: "slider",
        tabIndex: disabled ? -1 : 0,
        "aria-valuenow": v,
        "aria-valuemin": isRange && i === 1 ? vals[0] : min,
        "aria-valuemax": isRange && i === 0 ? vals[1] : max,
        "aria-valuetext": props.formatValue ? text2(v) : void 0,
        "aria-orientation": "horizontal",
        "aria-disabled": disabled || void 0,
        "aria-label": isRange ? names[i] : props["aria-label"],
        "aria-labelledby": isRange ? void 0 : props["aria-labelledby"],
        onKeyDown: onKeyDown(i)
      }
    ))),
    props.name ? vals.map((v, i) => /* @__PURE__ */ React50.createElement("input", { key: "in" + i, type: "hidden", name: props.name, value: v, disabled })) : null
  );
});
Slider.displayName = "Slider";

// src/components/Stack/Stack.tsx
import * as React51 from "react";
var TAGS5 = ["div", "section", "ul", "ol", "nav", "header", "footer", "form", "fieldset", "span"];
var Stack = React51.forwardRef(function Stack2(props, ref) {
  const rest = omit(props, { direction: 1, gap: 1, align: 1, justify: 1, wrap: 1, as: 1, className: 1, style: 1 });
  const row = props.direction === "row";
  const align = oneOf(["stretch", "start", "center", "end", "baseline"], props.align, row ? "center" : "stretch");
  const justify = oneOf(["start", "center", "end", "between"], props.justify, "start");
  const gap = space(props.gap);
  return React51.createElement(oneOf(TAGS5, props.as, "div"), Object.assign(rest, {
    ref,
    "data-component": "stack",
    className: cn("dk-stack", row && "dk-stack--row", "dk-stack--align-" + align, justify !== "start" && "dk-stack--justify-" + justify, props.wrap && "dk-stack--wrap", props.className),
    style: gap ? Object.assign({ "--dk-stack-gap": gap }, props.style) : props.style
  }));
});
Stack.displayName = "Stack";

// src/components/Stepper/Stepper.tsx
import * as React52 from "react";
var OWN20 = { steps: 1, current: 1, orientation: 1, size: 1, onStepClick: 1, labels: 1, className: 1 };
var Stepper = React52.forwardRef(function Stepper2(props, ref) {
  const rest = omit(props, OWN20);
  const steps = props.steps || [];
  const current = Math.max(0, Math.min(steps.length, Math.floor(Number(props.current)) || 0));
  const vertical = props.orientation === "vertical";
  const size = props.size === "sm" ? "sm" : "md";
  const L = { completed: "completed", error: "has an error", optional: "Optional", ...props.labels || {} };
  return /* @__PURE__ */ React52.createElement(
    "nav",
    {
      ...rest,
      ref,
      "aria-label": rest["aria-label"] || (rest["aria-labelledby"] ? void 0 : "Progress"),
      className: cn("dk-stepper", vertical ? "dk-stepper--vertical" : "dk-stepper--horizontal", "dk-stepper--size-" + size, props.className),
      "data-component": "stepper",
      "data-orientation": vertical ? "vertical" : "horizontal",
      "data-size": size
    },
    /* @__PURE__ */ React52.createElement("ol", { className: "dk-stepper__list" }, steps.map((s, i) => {
      const state = s.status === "error" ? "error" : i < current ? "complete" : i === current ? "current" : "upcoming";
      const clickable = !!props.onStepClick && i < current;
      const Head = clickable ? "button" : "div";
      const hasDesc = s.description != null && s.description !== "";
      return /* @__PURE__ */ React52.createElement("li", { key: i, className: cn("dk-stepper__step", "dk-stepper__step--" + state, i < current && "dk-stepper__step--done"), "data-state": state, "aria-current": i === current ? "step" : void 0 }, /* @__PURE__ */ React52.createElement(Head, { className: "dk-stepper__head", ...clickable ? { type: "button", onClick: () => props.onStepClick(i) } : {} }, /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__indicator", "aria-hidden": true }, state === "complete" ? /* @__PURE__ */ React52.createElement(Icon, { name: "check" }) : state === "error" ? /* @__PURE__ */ React52.createElement(Icon, { name: "priority_high" }) : i + 1), /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__text" }, /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__title" }, s.title, state === "complete" ? /* @__PURE__ */ React52.createElement(VisuallyHidden, null, ", " + L.completed) : state === "error" ? /* @__PURE__ */ React52.createElement(VisuallyHidden, null, ", " + L.error) : null), hasDesc ? /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__description" }, s.description) : null, s.optional ? /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__description dk-stepper__optional" }, L.optional) : null)), i < steps.length - 1 ? /* @__PURE__ */ React52.createElement("span", { className: "dk-stepper__connector", "aria-hidden": true }) : null);
    }))
  );
});
Stepper.displayName = "Stepper";

// src/components/Switch/Switch.tsx
import * as React53 from "react";
var OWN21 = { size: 1, invalid: 1, description: 1, labelPosition: 1, children: 1, className: 1, style: 1, type: 1, role: 1 };
var Switch = React53.forwardRef(function Switch2(props, ref) {
  const rest = omit(props, OWN21);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const base = domId("dk-sw", React53.useId()), labelId = base + "-label", descId = base + "-desc";
  const hasLabel = props.children != null && props.children !== false && props.children !== "";
  const hasDesc = props.description != null && props.description !== false && props.description !== "";
  if (hasDesc) rest["aria-describedby"] = cn(rest["aria-describedby"], descId);
  if (hasDesc && hasLabel && rest["aria-label"] == null && rest["aria-labelledby"] == null) rest["aria-labelledby"] = labelId;
  return /* @__PURE__ */ React53.createElement("label", { className: cn("dk-switch", "dk-switch--size-" + size, props.labelPosition === "start" && "dk-switch--label-start", invalid && "dk-switch--invalid", rest.disabled && "dk-switch--disabled", !hasLabel && !hasDesc && "dk-switch--bare", props.className), style: props.style, "data-component": "switch", "data-size": size }, /* @__PURE__ */ React53.createElement("span", { className: "dk-switch__control", key: "control" }, /* @__PURE__ */ React53.createElement("input", { ...rest, ref, type: "checkbox", role: "switch", className: "dk-switch__input", key: "input" }), /* @__PURE__ */ React53.createElement("span", { className: "dk-switch__thumb", "aria-hidden": true, key: "thumb" })), hasLabel || hasDesc ? /* @__PURE__ */ React53.createElement("span", { className: "dk-switch__text", key: "text" }, hasLabel ? /* @__PURE__ */ React53.createElement("span", { className: "dk-switch__label", id: labelId, key: "label" }, props.children) : null, hasDesc ? /* @__PURE__ */ React53.createElement("span", { className: "dk-switch__description", id: descId, key: "desc" }, props.description) : null) : null);
});
Switch.displayName = "Switch";

// src/components/Table/Table.tsx
import * as React54 from "react";
var ALIGN = ["start", "center", "end"];
var Table = React54.forwardRef(function Table2(props, ref) {
  const rest = omit(props, { size: 1, striped: 1, stickyHeader: 1, caption: 1, captionHidden: 1, containerProps: 1, className: 1, children: 1 });
  const size = oneOf(["sm", "md"], props.size, "md");
  const frame = React54.useRef(null);
  const [scrolls, setScrolls] = React54.useState(false);
  const cid = domId("dk-tc", React54.useId());
  React54.useEffect(() => {
    const el = frame.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const check = () => setScrolls(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    check();
    return () => ro.disconnect();
  }, []);
  const cp = props.containerProps || {};
  const hasCaption = props.caption != null && props.caption !== false && props.caption !== "";
  const region = scrolls ? { tabIndex: 0, role: "region", "aria-labelledby": hasCaption ? cid : void 0, "aria-label": hasCaption ? void 0 : cp["aria-label"] || "Table" } : {};
  return /* @__PURE__ */ React54.createElement("div", { ...cp, ...region, ref: frame, "data-component": "table", className: cn("dk-table", size === "sm" && "dk-table--sm", props.striped && "dk-table--striped", props.stickyHeader && "dk-table--sticky", cp.className) }, /* @__PURE__ */ React54.createElement("table", { ...rest, ref, className: cn("dk-table__table", props.className) }, hasCaption ? /* @__PURE__ */ React54.createElement("caption", { id: cid, className: cn("dk-table__caption", props.captionHidden && "dk-visually-hidden") }, props.caption) : null, props.children));
});
Table.displayName = "Table";
var TableHead = React54.forwardRef(function TableHead2(props, ref) {
  return /* @__PURE__ */ React54.createElement("thead", { ...props, ref, className: cn("dk-table__head", props.className) });
});
TableHead.displayName = "TableHead";
var TableBody = React54.forwardRef(function TableBody2(props, ref) {
  return /* @__PURE__ */ React54.createElement("tbody", { ...props, ref, className: cn("dk-table__body", props.className) });
});
TableBody.displayName = "TableBody";
var TableFoot = React54.forwardRef(function TableFoot2(props, ref) {
  return /* @__PURE__ */ React54.createElement("tfoot", { ...props, ref, className: cn("dk-table__foot", props.className) });
});
TableFoot.displayName = "TableFoot";
var TableRow = React54.forwardRef(function TableRow2(props, ref) {
  const rest = omit(props, { selected: 1, className: 1 });
  return /* @__PURE__ */ React54.createElement("tr", { ...rest, ref, "aria-selected": props.selected === void 0 ? void 0 : !!props.selected, className: cn("dk-table__row", props.selected && "dk-table__row--selected", props.className) });
});
TableRow.displayName = "TableRow";
var NEXT_ICON = { ascending: "arrow_upward", descending: "arrow_downward", none: "unfold_more" };
var TableHeaderCell = React54.forwardRef(function TableHeaderCell2(props, ref) {
  const rest = omit(props, { align: 1, sort: 1, onSort: 1, className: 1, children: 1 });
  const align = oneOf(ALIGN, props.align, "start");
  const sort = props.sort !== void 0 ? oneOf(["ascending", "descending", "none"], props.sort, "none") : null;
  return /* @__PURE__ */ React54.createElement(
    "th",
    {
      scope: "col",
      ...rest,
      ref,
      "aria-sort": sort && sort !== "none" ? sort : void 0,
      className: cn("dk-table__cell dk-table__header", align !== "start" && "dk-table__cell--" + align, sort && "dk-table__header--sortable", props.className)
    },
    sort ? /* @__PURE__ */ React54.createElement("button", { type: "button", className: "dk-table__sort", onClick: props.onSort }, /* @__PURE__ */ React54.createElement("span", null, props.children), /* @__PURE__ */ React54.createElement(Icon, { name: NEXT_ICON[sort], className: cn("dk-table__sort-icon", sort === "none" && "dk-table__sort-icon--idle") })) : props.children
  );
});
TableHeaderCell.displayName = "TableHeaderCell";
var TableCell = React54.forwardRef(function TableCell2(props, ref) {
  const rest = omit(props, { align: 1, className: 1 });
  const align = oneOf(ALIGN, props.align, "start");
  return /* @__PURE__ */ React54.createElement("td", { ...rest, ref, className: cn("dk-table__cell", align !== "start" && "dk-table__cell--" + align, props.className) });
});
TableCell.displayName = "TableCell";

// src/components/Tabs/Tabs.tsx
import * as React55 from "react";
var TabsContext = React55.createContext(null);
var useTabs = (who) => {
  const c = React55.useContext(TabsContext);
  if (!c) throw new Error("Serupa: " + who + " must be inside <Tabs>.");
  return c;
};
var safe = (v) => String(v).replace(/[^A-Za-z0-9_-]/g, "_");
var Tabs = React55.forwardRef(function Tabs2(props, ref) {
  const rest = omit(props, { value: 1, defaultValue: 1, onValueChange: 1, variant: 1, size: 1, activation: 1, className: 1 });
  const base = domId("dk-tabs", React55.useId());
  const controlled = props.value !== void 0;
  const [inner, setInner] = React55.useState(props.defaultValue != null ? props.defaultValue : null);
  const value = controlled ? props.value : inner;
  const onChange = React55.useRef(props.onValueChange);
  onChange.current = props.onValueChange;
  const select = React55.useCallback((v) => {
    if (!controlled) setInner(v);
    if (onChange.current) onChange.current(v);
  }, [controlled]);
  const variant = oneOf(["line", "pill"], props.variant, "line");
  const size = oneOf(["sm", "md"], props.size, "md");
  const [panels, setPanels] = React55.useState({});
  const register = React55.useCallback((v, d) => setPanels((p) => Object.assign({}, p, { [v]: (p[v] || 0) + d })), []);
  const ctx = React55.useMemo(() => ({ base, value, select, manual: props.activation === "manual", panels, register }), [base, value, select, props.activation, panels, register]);
  const self = React55.useRef(null);
  useIsoLayoutEffect(() => {
    if (value != null || controlled || !self.current) return;
    const first = self.current.querySelector('[role="tab"]:not([disabled])');
    if (first && first.dataset.value != null) setInner(first.dataset.value);
  });
  return /* @__PURE__ */ React55.createElement(TabsContext.Provider, { value: ctx }, /* @__PURE__ */ React55.createElement(
    "div",
    {
      ...rest,
      ref: (n) => {
        self.current = n;
        if (typeof ref === "function") ref(n);
        else if (ref) ref.current = n;
      },
      className: cn("dk-tabs", "dk-tabs--" + variant, size === "sm" && "dk-tabs--sm", props.className),
      "data-component": "tabs",
      "data-variant": variant
    }
  ));
});
Tabs.displayName = "Tabs";
var TabList = React55.forwardRef(function TabList2(props, ref) {
  const ctx = useTabs("TabList");
  const onKeyDown = (e) => {
    if (props.onKeyDown) props.onKeyDown(e);
    if (e.defaultPrevented) return;
    const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]:not([disabled])'));
    const i = tabs.indexOf(document.activeElement);
    if (i < 0 || !tabs.length) return;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    let next2 = -1;
    if (e.key === "ArrowRight") next2 = (i + (rtl ? -1 : 1) + tabs.length) % tabs.length;
    else if (e.key === "ArrowLeft") next2 = (i + (rtl ? 1 : -1) + tabs.length) % tabs.length;
    else if (e.key === "Home") next2 = 0;
    else if (e.key === "End") next2 = tabs.length - 1;
    if (next2 < 0) return;
    e.preventDefault();
    tabs[next2].focus();
    if (!ctx.manual && tabs[next2].dataset.value != null) ctx.select(tabs[next2].dataset.value);
  };
  return /* @__PURE__ */ React55.createElement("div", { ...props, ref, role: "tablist", "aria-orientation": "horizontal", className: cn("dk-tabs__list", props.className), onKeyDown });
});
TabList.displayName = "TabList";
var Tab = React55.forwardRef(function Tab2(props, ref) {
  const ctx = useTabs("Tab");
  const rest = omit(props, { value: 1, icon: 1, className: 1, children: 1 });
  const selected = ctx.value === props.value;
  const id = ctx.base + "-tab-" + safe(props.value), panel = ctx.base + "-panel-" + safe(props.value);
  const onClick = (e) => {
    if (props.onClick) props.onClick(e);
    if (!e.defaultPrevented) ctx.select(props.value);
  };
  return /* @__PURE__ */ React55.createElement(
    "button",
    {
      ...rest,
      ref,
      type: "button",
      role: "tab",
      id,
      "aria-controls": ctx.panels[props.value] ? panel : void 0,
      "aria-selected": selected,
      tabIndex: selected ? 0 : -1,
      "data-value": props.value,
      "data-state": selected ? "active" : "inactive",
      className: cn("dk-tabs__tab", props.className),
      onClick
    },
    props.icon != null ? /* @__PURE__ */ React55.createElement("span", { className: "dk-tabs__icon", "aria-hidden": "true" }, asIcon(props.icon)) : null,
    /* @__PURE__ */ React55.createElement("span", { className: "dk-tabs__label" }, props.children)
  );
});
Tab.displayName = "Tab";
var TabPanel = React55.forwardRef(function TabPanel2(props, ref) {
  const ctx = useTabs("TabPanel");
  const rest = omit(props, { value: 1, keepMounted: 1, className: 1, children: 1 });
  const selected = ctx.value === props.value;
  const keep = props.keepMounted !== false;
  const register = ctx.register;
  useIsoLayoutEffect(() => {
    register(props.value, 1);
    return () => register(props.value, -1);
  }, [props.value, register]);
  return /* @__PURE__ */ React55.createElement(
    "div",
    {
      tabIndex: 0,
      ...rest,
      ref,
      role: "tabpanel",
      id: ctx.base + "-panel-" + safe(props.value),
      "aria-labelledby": ctx.base + "-tab-" + safe(props.value),
      hidden: !selected,
      "data-state": selected ? "active" : "inactive",
      className: cn("dk-tabs__panel", props.className)
    },
    selected || keep ? props.children : null
  );
});
TabPanel.displayName = "TabPanel";

// src/components/Text/Text.tsx
import * as React56 from "react";
var TAGS6 = ["p", "span", "div", "label", "strong", "em", "small", "li", "figcaption"];
var SIZES6 = ["xs", "sm", "base", "lg", "xl"];
var TONES5 = ["default", "muted", "primary", "danger"];
var WEIGHTS = ["normal", "medium", "semibold", "bold"];
var pick = (list, v) => list.indexOf(v) < 0 ? null : v;
var Text = React56.forwardRef(function Text2(props, ref) {
  const { as, size, tone, weight, truncate, className, ...rest } = props;
  const s = pick(SIZES6, size), t = pick(TONES5, tone), w = pick(WEIGHTS, weight);
  return React56.createElement(oneOf(TAGS6, as, "p"), Object.assign(rest, {
    ref,
    "data-component": "text",
    className: cn("dk-text", s && "dk-text--" + s, t && "dk-text--" + t, w && "dk-text--" + w, truncate && "dk-text--truncate", className)
  }));
});
Text.displayName = "Text";

// src/components/Textarea/Textarea.tsx
import * as React57 from "react";
var OWN22 = { size: 1, invalid: 1, rows: 1, autoResize: 1, maxRows: 1, resize: 1, showCount: 1, className: 1, style: 1 };
var Textarea = React57.forwardRef(function Textarea2(props, ref) {
  const rest = omit(props, OWN22);
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  if (invalid) rest["aria-invalid"] = true;
  const rows = props.rows > 0 ? Math.floor(props.rows) : 3;
  const auto = !!props.autoResize;
  const maxRows = props.maxRows > 0 ? Math.max(rows, Math.floor(props.maxRows)) : 0;
  const resize = auto || props.resize === "none" ? "none" : "vertical";
  const controlled = rest.value != null;
  const own = React57.useRef(null);
  const [len, setLen] = React57.useState(function() {
    return String(controlled ? rest.value : rest.defaultValue != null ? rest.defaultValue : "").length;
  });
  const length = controlled ? String(rest.value).length : len;
  const countId = domId("dk-ta", React57.useId());
  const fit = React57.useCallback(function() {
    const el = own.current;
    if (!auto || !el) return;
    const cs = getComputedStyle(el), line = parseFloat(cs.lineHeight) || 0, pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    el.style.height = "auto";
    const need = el.scrollHeight, max2 = maxRows ? maxRows * line + pad : Infinity;
    el.style.height = Math.min(need, max2) + "px";
    el.style.overflowY = need > max2 ? "auto" : "hidden";
  }, [auto, maxRows]);
  useIsoLayoutEffect(fit);
  React57.useEffect(function() {
    if (!auto || typeof ResizeObserver === "undefined" || !own.current) return;
    let w = own.current.offsetWidth, raf = 0;
    const ro = new ResizeObserver(function() {
      const nw = own.current && own.current.offsetWidth;
      if (nw !== w) {
        w = nw;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(fit);
      }
    });
    ro.observe(own.current);
    return function() {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [auto, fit]);
  const setRefs = React57.useCallback(function(node) {
    own.current = node;
    setRef(ref, node);
  }, [ref]);
  const onChange = rest.onChange;
  rest.onChange = function(e) {
    if (!controlled) setLen(e.target.value.length);
    if (onChange) onChange(e);
  };
  if (props.showCount) rest["aria-describedby"] = cn(rest["aria-describedby"], countId);
  const max = rest.maxLength != null && rest.maxLength > 0 ? rest.maxLength : null;
  return /* @__PURE__ */ React57.createElement("span", { className: cn("dk-textarea", "dk-textarea--size-" + size, invalid && "dk-textarea--invalid", rest.disabled && "dk-textarea--disabled", rest.readOnly && "dk-textarea--readonly", resize === "none" && "dk-textarea--resize-none", auto && "dk-textarea--auto", props.className), style: props.style, "data-component": "textarea", "data-size": size }, /* @__PURE__ */ React57.createElement("textarea", { ...rest, ref: setRefs, rows, className: "dk-textarea__field", key: "field" }), props.showCount ? /* @__PURE__ */ React57.createElement("span", { className: cn("dk-textarea__count", max != null && length >= max && "dk-textarea__count--full"), id: countId, key: "count" }, max != null ? length + " / " + max : String(length)) : null);
});
Textarea.displayName = "Textarea";

// src/components/TimePicker/TimePicker.tsx
import * as React58 from "react";

// src/internal/times.ts
function toMinutes(v) {
  const m = /^(\d{1,2}):(\d{2})$/.exec((v || "").trim());
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]);
  return h < 24 && min < 60 ? h * 60 + min : null;
}
var toHHmm = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
function uses12h(locale) {
  return !!new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions().hour12;
}
var formats = /* @__PURE__ */ new Map();
function formatTime(n, locale, hour12) {
  const h12 = hour12 != null ? hour12 : uses12h(locale);
  const key2 = (locale || "") + "|" + h12;
  let f = formats.get(key2);
  if (!f) formats.set(key2, f = new Intl.DateTimeFormat(locale, { hour: h12 ? "numeric" : "2-digit", minute: "2-digit", hour12: h12 }));
  return f.format(new Date(2e3, 0, 1, Math.floor(n / 60), n % 60));
}
function parseTime(text2) {
  const s = text2.trim().toLowerCase().replace(/\s+/g, "");
  if (!s) return null;
  const m = /^(\d{1,2})(?:[:.h]?(\d{2}))?(a|am|a\.m\.|p|pm|p\.m\.)?$/.exec(s);
  if (!m) return null;
  let h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  const ap = m[3] ? m[3][0] : "";
  if (min > 59) return null;
  if (ap) {
    if (h < 1 || h > 12) return null;
    if (h === 12) h = 0;
    if (ap === "p") h += 12;
  } else if (h > 23) return null;
  return h * 60 + min;
}

// src/components/TimePicker/TimePicker.tsx
var TimePicker = React58.forwardRef(function TimePicker2(props, ref) {
  var _a, _b, _c;
  const { value: _v, defaultValue: _d, onValueChange, min, max, step: _st, locale, hour12: _h, size: _s, invalid: _i, listLabel, className, style, name, placeholder, disabled, readOnly, onBlur, onKeyDown, ...rest } = props;
  const size = oneOf(SIZES, props.size, "md");
  const invalid = isInvalid(props.invalid, rest["aria-invalid"]);
  const h12 = (_a = props.hour12) != null ? _a : uses12h(locale);
  const step = props.step && Math.round(props.step) >= 1 ? Math.round(props.step) : 30;
  const lo = (_b = toMinutes(min)) != null ? _b : 0, hi = (_c = toMinutes(max)) != null ? _c : 24 * 60 - 1;
  const controlled = props.value !== void 0;
  const [own, setOwn] = React58.useState(toMinutes(props.defaultValue));
  const value = controlled ? toMinutes(props.value) : own;
  const fmt = (n) => n == null ? "" : formatTime(n, locale, h12);
  const [text2, setText] = React58.useState(fmt(value));
  const shown = React58.useRef(value);
  const shownFmt = React58.useRef(locale + "|" + h12);
  if (value !== shown.current || shownFmt.current !== locale + "|" + h12) {
    shown.current = value;
    shownFmt.current = locale + "|" + h12;
    if (fmt(value) !== text2) setText(fmt(value));
  }
  const [open, setOpen] = React58.useState(false);
  const [active, setActive] = React58.useState(0);
  const id = domId("dk-tp", React58.useId());
  const box = React58.useRef(null);
  const field = React58.useRef(null);
  const list = React58.useRef(null);
  const typed = React58.useRef(false);
  const times = React58.useMemo(() => {
    const out = [];
    for (let n = lo; n <= hi; n += step) out.push(n);
    return out;
  }, [lo, hi, step]);
  const nearest = (n) => {
    if (n == null || !times.length) return 0;
    let best = 0;
    times.forEach((x, i) => {
      if (Math.abs(x - n) < Math.abs(times[best] - n)) best = i;
    });
    return best;
  };
  const commit = (n) => {
    shown.current = n;
    setText(fmt(n));
    if (n === value) return;
    if (!controlled) setOwn(n);
    if (onValueChange) onValueChange(n == null ? null : toHHmm(n));
  };
  const read = () => {
    if (text2.trim() === "") return commit(null);
    const n = parseTime(text2);
    commit(n != null && n >= lo && n <= hi ? n : value);
  };
  const show = () => {
    if (disabled || readOnly || !times.length) return;
    const n = parseTime(text2);
    setActive(nearest(n != null ? n : value));
    typed.current = false;
    setOpen(true);
  };
  useIsoLayoutEffect(() => {
    if (open && list.current && box.current) list.current.style.minWidth = box.current.offsetWidth + "px";
  }, [open]);
  useAnchoredLayer(open, list, box, { placement: "bottom-start", offsetVar: "--dk-tp-offset", onOutside: () => setOpen(false), inside: box });
  React58.useEffect(() => {
    if (!open || !list.current) return;
    const o = list.current.children[active];
    if (o) {
      const l = list.current;
      if (o.offsetTop < l.scrollTop) l.scrollTop = o.offsetTop;
      else if (o.offsetTop + o.offsetHeight > l.scrollTop + l.clientHeight) l.scrollTop = o.offsetTop + o.offsetHeight - l.clientHeight;
    }
  }, [open, active]);
  React58.useEffect(() => {
    if (!open || !list.current) return;
    const o = list.current.children[active];
    if (o) list.current.scrollTop = Math.max(0, o.offsetTop - o.offsetHeight);
  }, [open]);
  const pick2 = (n) => {
    commit(n);
    setOpen(false);
    if (field.current) field.current.focus();
  };
  const keys = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented) return;
    const last = times.length - 1, page = 4;
    const move = (i) => {
      e.preventDefault();
      typed.current = false;
      setActive(i);
    };
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        show();
      } else if (e.key === "Enter") read();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        move(Math.min(last, active + 1));
        break;
      case "ArrowUp":
        move(Math.max(0, active - 1));
        break;
      case "PageDown":
        move(Math.min(last, active + page));
        break;
      case "PageUp":
        move(Math.max(0, active - page));
        break;
      case "Home":
        if (e.altKey || e.ctrlKey) move(0);
        break;
      case "End":
        if (e.altKey || e.ctrlKey) move(last);
        break;
      case "Enter":
        e.preventDefault();
        if (typed.current) {
          read();
          setOpen(false);
        } else pick2(times[active]);
        break;
      // what was typed wins over the highlight
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };
  const label = listLabel || "Choose time";
  return /* @__PURE__ */ React58.createElement("span", { ref: box, className: cn("dk-input", "dk-input--size-" + size, "dk-time-picker", invalid && "dk-input--invalid", disabled && "dk-input--disabled", readOnly && "dk-input--readonly", className), style, "data-component": "time-picker", "data-size": size }, /* @__PURE__ */ React58.createElement(
    "input",
    {
      ...rest,
      ref: (n) => {
        field.current = n;
        setRef(ref, n);
      },
      type: "text",
      role: "combobox",
      autoComplete: "off",
      className: "dk-input__field",
      value: text2,
      disabled,
      readOnly,
      placeholder: placeholder != null ? placeholder : h12 ? "hh:mm am" : "hh:mm",
      "aria-invalid": invalid || void 0,
      "aria-expanded": open,
      "aria-controls": id,
      "aria-autocomplete": "none",
      "aria-haspopup": "listbox",
      "aria-activedescendant": open ? `${id}-${active}` : void 0,
      onChange: (e) => {
        setText(e.target.value);
        if (open) {
          typed.current = true;
          const n = parseTime(e.target.value);
          if (n != null) setActive(nearest(n));
        }
      },
      onBlur: (e) => {
        read();
        if (onBlur) onBlur(e);
      },
      onKeyDown: keys
    }
  ), /* @__PURE__ */ React58.createElement(
    "button",
    {
      type: "button",
      tabIndex: -1,
      className: "dk-time-picker__button",
      "aria-label": label,
      "aria-controls": id,
      "aria-expanded": open,
      disabled: !!disabled || !!readOnly,
      onMouseDown: (e) => e.preventDefault(),
      onClick: () => {
        if (open) setOpen(false);
        else show();
        if (field.current) field.current.focus();
      }
    },
    /* @__PURE__ */ React58.createElement(Icon, { name: "schedule" })
  ), name ? /* @__PURE__ */ React58.createElement("input", { type: "hidden", name, value: value == null ? "" : toHHmm(value), disabled }) : null, /* @__PURE__ */ React58.createElement("ul", { ref: list, id, role: "listbox", "aria-label": label, ...{ popover: "manual" }, hidden: !open || void 0, className: "dk-time-picker__list" }, open ? times.map((n, i) => /* @__PURE__ */ React58.createElement(
    "li",
    {
      key: n,
      id: `${id}-${i}`,
      role: "option",
      "aria-selected": n === value,
      "data-value": toHHmm(n),
      className: cn("dk-time-picker__option", i === active && "dk-time-picker__option--active", n === value && "dk-time-picker__option--selected"),
      onMouseDown: (e) => e.preventDefault(),
      onMouseMove: () => {
        if (i !== active) {
          typed.current = false;
          setActive(i);
        }
      },
      onClick: () => pick2(n)
    },
    /* @__PURE__ */ React58.createElement("span", { className: "dk-time-picker__time" }, fmt(n)),
    n === value ? /* @__PURE__ */ React58.createElement(Icon, { name: "check", className: "dk-time-picker__check" }) : null
  )) : null));
});
TimePicker.displayName = "TimePicker";

// src/components/Toast/Toast.tsx
import * as React59 from "react";
var items2 = [];
var listeners = /* @__PURE__ */ new Set();
var next = 0;
var emit = () => listeners.forEach((l) => l(items2));
var text = (n) => typeof n === "string" || typeof n === "number" ? String(n) : "";
var TONES6 = ["neutral", "info", "success", "warning", "danger"];
function toast(options) {
  const o = typeof options === "string" ? { title: options } : options;
  const id = o.id || "dk-toast-" + ++next;
  const item = Object.assign({}, o, { id, tone: oneOf(TONES6, o.tone, "neutral") });
  const at = items2.findIndex((x) => x.id === id);
  items2 = at >= 0 ? items2.map((x, i) => i === at ? item : x) : items2.concat(item);
  emit();
  const say = o.announcement != null ? o.announcement : [text(o.title), text(o.description)].filter(Boolean).join(". ");
  if (say) announce(say);
  return id;
}
toast.dismiss = function dismiss(id) {
  items2 = id == null ? [] : items2.filter((x) => x.id !== id);
  emit();
};
var POSITIONS2 = ["top-start", "top-center", "top-end", "bottom-start", "bottom-center", "bottom-end"];
var ICONS3 = { neutral: null, info: "info", success: "check_circle", warning: "warning", danger: "error" };
function Toaster(props) {
  const { position, label, dismissLabel, className, ...rest } = props;
  const [list, setList] = React59.useState(items2);
  React59.useEffect(() => {
    ensureAnnouncer();
    listeners.add(setList);
    setList(items2);
    return () => {
      listeners.delete(setList);
    };
  }, []);
  const pos = oneOf(POSITIONS2, position, "bottom-end");
  const ordered = pos.startsWith("top") ? list.slice().reverse() : list;
  return /* @__PURE__ */ React59.createElement("section", { ...rest, "aria-label": label || "Notifications", className: cn("dk-toaster", "dk-toaster--" + pos, className), "data-component": "toaster", "data-position": pos }, /* @__PURE__ */ React59.createElement("ol", { className: "dk-toaster__list" }, ordered.map((t) => /* @__PURE__ */ React59.createElement(ToastView, { key: t.id, item: t, dismissLabel: dismissLabel || "Dismiss" }))));
}
Toaster.displayName = "Toaster";
function ToastView(props) {
  const t = props.item;
  const duration = t.duration == null ? 5e3 : t.duration;
  const [paused, setPaused] = React59.useState(false);
  const left = React59.useRef(duration);
  React59.useEffect(() => {
    left.current = duration;
  }, [t]);
  React59.useEffect(() => {
    if (!duration || paused) return;
    const start = Date.now();
    const timer = window.setTimeout(() => toast.dismiss(t.id), left.current);
    return () => {
      window.clearTimeout(timer);
      left.current -= Date.now() - start;
    };
  }, [paused, t, duration]);
  React59.useEffect(() => {
    const vis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);
  const titleId = t.id + "-title", descId = t.id + "-desc";
  const icon = ICONS3[t.tone];
  return /* @__PURE__ */ React59.createElement(
    "li",
    {
      className: cn("dk-toast", "dk-toast--" + t.tone),
      "data-tone": t.tone,
      "aria-labelledby": titleId,
      "aria-describedby": t.description != null ? descId : void 0,
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }
    },
    icon ? /* @__PURE__ */ React59.createElement("span", { className: "dk-toast__icon", "aria-hidden": "true" }, /* @__PURE__ */ React59.createElement(Icon, { name: icon })) : null,
    /* @__PURE__ */ React59.createElement("div", { className: "dk-toast__content" }, /* @__PURE__ */ React59.createElement("p", { className: "dk-toast__title", id: titleId }, t.title), t.description != null ? /* @__PURE__ */ React59.createElement("p", { className: "dk-toast__description", id: descId }, t.description) : null),
    t.action ? /* @__PURE__ */ React59.createElement(Button2, { className: "dk-toast__action", size: "sm", variant: "secondary", onClick: () => {
      t.action.onClick();
      toast.dismiss(t.id);
    } }, t.action.label) : null,
    /* @__PURE__ */ React59.createElement(IconButton, { className: "dk-toast__close", icon: "close", label: props.dismissLabel, size: "sm", noTitle: true, onClick: () => toast.dismiss(t.id) })
  );
}

// src/components/ToggleButton/ToggleButton.tsx
import * as React60 from "react";
var ToggleButton = React60.forwardRef(function ToggleButton2(props, ref) {
  const { pressed, defaultPressed, onPressedChange, variant, className, onClick, ...rest } = props;
  const [own, setOwn] = React60.useState(!!defaultPressed);
  const controlled = pressed !== void 0;
  const on = controlled ? !!pressed : own;
  const v = oneOf(["outline", "ghost"], variant, "outline");
  return /* @__PURE__ */ React60.createElement(
    Button2,
    {
      ...rest,
      ref,
      variant: v,
      "aria-pressed": on,
      className: cn("dk-toggle-button", on && "dk-toggle-button--pressed", className),
      onClick: (e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented) return;
        if (!controlled) setOwn(!on);
        if (onPressedChange) onPressedChange(!on);
      }
    }
  );
});
ToggleButton.displayName = "ToggleButton";

// src/index.ts
var version2 = "5.0.1";
export {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button2 as Button,
  ButtonGroup,
  Calendar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Checkbox,
  Combobox,
  Container,
  DatePicker,
  DateRangePicker,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  Fab,
  Field,
  FileUpload,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Kbd,
  Link,
  List,
  ListItem,
  Loader,
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  Navbar,
  NavbarLink,
  NumberInput,
  Pagination,
  PasswordInput,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  SearchInput,
  SegmentedControl,
  Select,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Slider,
  Stack,
  Stepper,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tabs,
  Text,
  Textarea,
  TimePicker,
  Toaster,
  ToggleButton,
  Tooltip,
  VisuallyHidden,
  buttonClass,
  configure,
  customIcons,
  formatFileSize,
  initials,
  paginationRange,
  toast,
  version2 as version
};
/*! Serupa · React components (needs React 18+) · CHANGELOG.md */
//# sourceMappingURL=index.js.map