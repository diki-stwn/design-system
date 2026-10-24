---
"serupa-ds": minor
---

- Added: `control-height-xs` (20px) and `control-height-xl` (48px), with `h-control-xs`, `h-control-xl` and the other control-height classes. With `data-density="compact"`, `xl` is 44px and `xs` stays 20px.
- Changed: `control-height-lg` is 40px (was 44px), so the scale is five steps: 20, 24, 32, 40 and 48. `lg` Buttons, IconButtons, Inputs, Selects, NumberInputs, PasswordInputs and SearchInputs are 4px shorter. For a 44px-plus touch target, use `xl`, for example `--button-height-lg: var(--control-height-xl)`. With `data-density="compact"`, `lg` stays 36px.
