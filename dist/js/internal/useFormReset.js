// src/internal/useFormReset.ts
import * as React from "react";
function useFormReset(el, reset) {
  const run = React.useRef(reset);
  run.current = reset;
  React.useEffect(() => {
    const node = el.current;
    const form = node && (node.form || node.closest("form"));
    if (!form) return;
    const on = () => run.current();
    form.addEventListener("reset", on);
    return () => form.removeEventListener("reset", on);
  }, [el]);
}
export {
  useFormReset
};
//# sourceMappingURL=useFormReset.js.map
