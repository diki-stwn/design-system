import type * as React from "react";

/** The words the components say or show on their own: button names, region names, empty and loading text.
    configure({ labels }) changes them for the whole app; a component's own prop (closeLabel, dismissLabel, …)
    still wins for that one instance. */
export interface SerupaLabels {
  /** Dialog and Drawer × button. */
  close: string;
  /** Alert and Toast close button. */
  dismiss: string;
  /** Loader, and Button and Badge while loading. */
  loading: string;
  /** Combobox while loading options. */
  loadingResults: string;
  /** Combobox when nothing matches. */
  noResults: string;
  /** SearchInput while loading. */
  searching: string;
  /** SearchInput clear button. */
  clearSearch: string;
  /** Before the name on a remove button: Badge ("Remove Design"), FileUpload ("Remove report.pdf"). */
  remove: string;
  /** Image view and remove buttons, and the viewer's name when the image has no alt text. */
  viewImage: string;
  removeImage: string;
  image: string;
  /** Pagination. */
  pagination: string;
  previousPage: string;
  nextPage: string;
  page: (page: number) => string;
  /** Breadcrumb, and its "…" button. */
  breadcrumb: string;
  showHiddenPages: string;
  /** Calendar month buttons. */
  previousMonth: string;
  nextMonth: string;
  /** Carousel arrows. */
  previousSlide: string;
  nextSlide: string;
  /** NumberInput step buttons. */
  decrease: string;
  increase: string;
  /** DatePicker, DateRangePicker and TimePicker. */
  chooseDate: string;
  chooseDates: string;
  chooseTime: string;
  startDate: string;
  endDate: string;
  chooseStartDate: string;
  chooseEndDate: string;
  /** Stepper: its name, and the words read out or shown for a step. */
  progress: string;
  completed: string;
  hasError: string;
  optional: string;
  /** Toaster region. */
  notifications: string;
  /** Sidebar and Navbar nav, and the Navbar menu button. */
  mainNavigation: string;
  menu: string;
  /** FileUpload. */
  dragFiles: string;
  dragFile: string;
  chooseFiles: string;
  chooseFile: string;
  chosenFiles: string;
  chosenFile: string;
  /** PasswordInput show/hide button. */
  showPassword: string;
  /** Table's scroll region when it has no caption. */
  table: string;
}

export interface SerupaConfig {
  /** Renders a Button with href, such as a router's Link (Next.js: Link; React Router: a component that maps href to to). Receives href, className, ref, event handlers and children. Default: 'a'. */
  link?: React.ElementType;
  /** A BCP 47 locale (such as 'id-ID' or 'de-DE') for Calendar, DatePicker, DateRangePicker and TimePicker: how dates and times are written and typed, month and weekday names, and the first day of the week. A component's locale prop still wins. Default: the browser's. */
  locale?: string;
  /** Replaces some or all of the words the components say on their own, such as { close: 'Tutup', dismiss: 'Abaikan' }. Keys left out keep their current words. */
  labels?: Partial<SerupaLabels>;
}

export const DEFAULT_LABELS: SerupaLabels = {
  close: "Close",
  dismiss: "Dismiss",
  loading: "Loading",
  loadingResults: "Loading…",
  noResults: "No results",
  searching: "Searching",
  clearSearch: "Clear search",
  remove: "Remove",
  viewImage: "View image",
  removeImage: "Remove image",
  image: "Image",
  pagination: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  page: (n) => "Page " + n,
  breadcrumb: "Breadcrumb",
  showHiddenPages: "Show the hidden pages",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  previousSlide: "Previous slide",
  nextSlide: "Next slide",
  decrease: "Decrease",
  increase: "Increase",
  chooseDate: "Choose date",
  chooseDates: "Choose dates",
  chooseTime: "Choose time",
  startDate: "Start date",
  endDate: "End date",
  chooseStartDate: "Choose the start date",
  chooseEndDate: "Choose the end date",
  progress: "Progress",
  completed: "completed",
  hasError: "has an error",
  optional: "Optional",
  notifications: "Notifications",
  mainNavigation: "Main",
  menu: "Menu",
  dragFiles: "Drag files here",
  dragFile: "Drag a file here",
  chooseFiles: "Choose files",
  chooseFile: "Choose a file",
  chosenFiles: "Chosen files",
  chosenFile: "Chosen file",
  showPassword: "Show password",
  table: "Table",
};

// What the components read when they render; configure() changes it. locale undefined means the browser's.
export const config: { link: React.ElementType; locale: string | undefined; labels: SerupaLabels } = { link: "a", locale: undefined, labels: { ...DEFAULT_LABELS } };

/** Set once at startup, before the first render (components read these as they render); returns the current settings. */
export function configure(opts?: SerupaConfig): { link: React.ElementType; locale: string | undefined; labels: SerupaLabels } {
  opts = opts || {};
  if (opts.link) config.link = opts.link;
  if ("locale" in opts) config.locale = opts.locale || undefined;
  if (opts.labels) {
    const next = { ...config.labels };
    for (const k of Object.keys(opts.labels) as (keyof SerupaLabels)[]) {
      const v = opts.labels[k];
      if (v != null && v !== "") (next as Record<string, unknown>)[k] = v;
    }
    config.labels = next;
  }
  return { link: config.link, locale: config.locale, labels: { ...config.labels } };
}
