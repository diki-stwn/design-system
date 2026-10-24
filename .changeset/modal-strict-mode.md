---
"serupa-ds": patch
---

- Fixed: under React StrictMode (development), a Dialog or Drawer open on its first mount dropped off the modal stack, so toasts and screen reader announcements stayed behind it on the inert page. It registers again when StrictMode mounts it the second time (A1).
