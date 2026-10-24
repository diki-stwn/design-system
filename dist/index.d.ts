import * as React from 'react';
import { IconData, MaterialIconName } from './icons.js';

type ThemeBrand = 'blue' | 'violet' | 'emerald';
type ThemeMode = 'auto' | 'light' | 'dark';
interface ThemeInfo {
    brand: ThemeBrand; /** What was asked for. */
    mode: ThemeMode; /** What is applied, e.g. "violet-dark". */
    theme: string;
}
/** theme.js (standalone, no React): picks the page theme and follows the system's light/dark setting. */
interface SerupaTheme {
    get(): ThemeInfo;
    /** Change and remember the choice in this browser. Unknown values are ignored. */
    set(choice: {
        brand?: ThemeBrand;
        mode?: ThemeMode;
    }): ThemeInfo;
    /** Forget the choice; back to the page's data-brand / data-mode. */
    reset(): ThemeInfo;
    /** Called after every change; returns an unsubscribe function. */
    onChange(fn: (info: ThemeInfo) => void): () => void;
}

interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    /** 'single' (default): opening one closes the others. 'multiple': any number can be open. */
    type?: 'single' | 'multiple';
    /** The open items' values (controlled). Use with onValueChange. */
    value?: string[];
    /** The items open at first (uncontrolled). Default: none. */
    defaultValue?: string[];
    /** Called with the open items' values when one opens or closes. */
    onValueChange?: (value: string[]) => void;
    /** With type="single": lets the open item close again, leaving none open. Default: true. */
    collapsible?: boolean;
    /** 'plain' (default): lines between items. 'card': a bordered, rounded frame. */
    variant?: 'plain' | 'card';
    /** The heading level of the titles, to fit the page's outline. Default: 3. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** Identifies the item in value. Default: its position ("0", "1"…). */
    value?: string;
    /** The title: what the heading button says. */
    title: React.ReactNode;
    /** Can't be opened or closed. Default: false. */
    disabled?: boolean;
    /** The content shown when it's open. */
    children?: React.ReactNode;
}
/** Items that show and hide their content under heading buttons; one open at a time, or several. */
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
/** One item in an Accordion: a title button and the content it shows and hides. */
declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;

/** Names of the custom icons (tools/icons/build.mjs). Empty (never) until you add some. */
type CustomIconName = never;
/** Names of your custom icons, sorted. */
declare const customIcons: readonly CustomIconName[];
/** Adds icons that work by name. Every Material Symbol already does; use this for an icon of your own in the same shape
 * (`{ name, d }`, drawn on Material's 960-unit grid): `registerIcons(MyIcon)` or a whole module. To draw every icon on
 * the first render (server rendering, say), register the full set first: `registerIcons(await import("serupa-ds/icons"))`. */
declare function registerIcons(...icons: Array<IconData | Readonly<Record<string, IconData>>>): void;
/** The Material Symbol for a name, if it is registered or already loaded. */
declare function getIcon(name: string): IconData | undefined;

/** Any Material Symbol's name, a custom icon's name, or a name you registered with registerIcons. */
type IconName = CustomIconName | MaterialIconName | (string & {});
/** What icon props (Button's leftIcon, IconButton's icon…) take: an icon name, an icon from serupa-ds/icons
 * (`leftIcon={Add}`), or any element. */
type IconSource = IconName | IconData | React.ReactNode;
interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Any Material Symbols name (search them on Foundations/Icons), a custom icon's name, or one you registered with
     * registerIcons. A custom icon with the same name wins. Give `name` or `icon`. */
    name?: IconName;
    /** A Material Symbols icon imported from serupa-ds/icons: `icon={ArrowForward}`. Give `name` or `icon`. */
    icon?: IconData;
    /** Size in px (number) or any CSS length. Default: 24px, or the button's icon size inside a Button. */
    size?: number | string;
}
/** An icon: Material Symbols Rounded (filled) or one of your custom SVG icons. Sized by font-size, drawn in the text color. Decorative by default (aria-hidden); pass aria-label to make it meaningful. */
declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;

type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** 'info' (default), 'success', 'warning', 'danger' or 'neutral'. Sets the background, the border tint and the icon. */
    tone?: AlertTone;
    /** A short bold first line. */
    title?: React.ReactNode;
    /** The icon before the content: an icon name or element, or false for none. Default: each tone's own (info, check_circle, warning, error). */
    icon?: IconSource | false;
    /** Buttons or links under the message. */
    actions?: React.ReactNode;
    /** Shows a close button that calls this. Hide or remove the alert yourself. */
    onDismiss?: () => void;
    /** The close button's name. Default: 'Dismiss'. */
    dismissLabel?: string;
}
/** A message about the page or a task: a tinted box with an icon, an optional title, actions and a close button. */
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

/** The initials of a name: the first letters of the first and last words ("Ada Lovelace" → "AL"), or one letter. */
declare function initials(name?: string): string;

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** The picture's URL. Without one, or when it fails to load, the initials (or the person icon) show instead. */
    src?: string;
    /** The person's or thing's name: the initials come from it, and it's the accessible name. */
    name?: string;
    /** The accessible name, when it isn't the name. Pass alt="" when the name is already written next to it. */
    alt?: string;
    /** 'xs' 24px, 'sm' 32px, 'md' 40px (default), 'lg' 48px or 'xl' 64px. */
    size?: AvatarSize;
    /** 'circle' (default, people) or 'square' (teams, projects, organisations). */
    shape?: 'circle' | 'square';
    /** A dot at the bottom end: 'online', 'busy', 'away' or 'offline'. Added to the accessible name. */
    status?: AvatarStatus;
    /** What a screen reader hears for the status. Default: the status in English ("online"). */
    statusLabel?: string;
}
/** A picture of a person, team or project, with initials or an icon when there's no picture. */
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The avatars: <Avatar> elements, or elements around them such as a Tooltip or a link. */
    children?: React.ReactNode;
    /** The most avatars to show. The rest fold into a "+N" avatar at the end. Default: all of them. */
    max?: number;
    /** How many there are in all, when you pass only some (e.g. the first 5 of 120 members). Default: the number of children. */
    total?: number;
    /** One size for every avatar in the group: 'xs', 'sm', 'md' (default), 'lg' or 'xl'. */
    size?: AvatarSize;
    /** What a screen reader hears for the "+N" avatar. Default: "N more". */
    moreLabel?: (count: number) => string;
    /** The group's accessible name, such as "Assigned to". */
    label?: string;
}
/** Avatars in an overlapping row, with "+N" for the rest. */
declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLDivElement>>;

type BadgeVariant = 'subtle' | 'solid' | 'outline';
type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
    /** 'subtle' (default): a tint with colored text. 'solid': a full fill, for strong emphasis. 'outline': a colored border and text. */
    variant?: BadgeVariant;
    /** 'neutral' (default) and 'primary' use the alias colors; 'success' (green), 'warning' (amber), 'danger' (red) and 'info' (sky) are statuses; the palette families are for categories and tags. Every tone and variant keeps 4.5:1 text in light and dark. */
    tone?: BadgeTone;
    /** @deprecated Removed in 4.0.0: badges have one size (20px, text-xs). Ignored, with a console warning. */
    size?: never;
    /** A small status dot before the label, in the badge's text color. Ignored with leftIcon or count. With no label, icon or count, renders a lone indicator dot ("something new"): decorative unless given aria-label. */
    dot?: boolean;
    /** With dot (in a label or the lone indicator): a copy of the dot grows and fades every second (the system's ping animation), for live states. Off under reduced motion. Ignored without a dot. Default false. */
    ping?: boolean;
    /** A Material Symbols (or custom) icon name, or an element, before the label. Decorative. */
    leftIcon?: IconSource;
    /** Makes it a count badge: a round pill with the number. 0 renders nothing unless showZero. */
    count?: number;
    /** With count: above this, shows "max+" (default 99: "99+"). */
    max?: number;
    /** With count: show the badge at 0. */
    showZero?: boolean;
    /** Adds a remove (×) button at the end that calls this. */
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** The remove button's accessible name, before the label: "Remove" (default) → "Remove Design". */
    removeLabel?: string;
    /** Makes it interactive: renders a <button type="button"> with hover, focus and active states. onRemove is ignored then. */
    onClick?: React.MouseEventHandler<HTMLElement>;
    /** Makes it a link (the component set with Serupa.configure({ link }), <a> by default), with hover, focus and active states. */
    href?: string;
    target?: string;
    rel?: string;
    /** Native button attributes, when interactive. */
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /** A ring replaces the content (the width stays); aria-busy, and an interactive badge ignores clicks but keeps focus. */
    loading?: boolean;
    /** Announced to screen readers when loading starts. Default "Loading"; "" announces nothing. */
    loadingText?: string;
}
/** A short label for status, counts and categories. A <span>; a <button> with onClick, a link with href. */
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>;

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /** BreadcrumbItems, from the top level down to the current page (the last one). */
    children?: React.ReactNode;
    /** 'chevron' (default) or 'slash' between items. */
    separator?: 'chevron' | 'slash';
    /** Shows at most this many items: the first, a "…" button that shows the rest, and the last ones. Default: no limit. */
    maxItems?: number;
    /** The nav's accessible name. Default: "Breadcrumb". */
    "aria-label"?: string;
    /** The "…" button's accessible name. Default: "Show all pages". */
    expandLabel?: string;
}
interface BreadcrumbItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Where it goes. The last item is the current page: it's text, not a link, whatever href says. */
    href?: string;
    /** An icon before the label: a Material Symbols or custom name, or an element. */
    icon?: IconSource;
    /** What renders the link: 'a' (default), or your router's link component. */
    as?: React.ElementType;
    /** Set by Breadcrumb on the last item. */
    current?: boolean;
}
/** One page in a Breadcrumb: a link, or the current page when it's the last. */
declare const BreadcrumbItem: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLAnchorElement>>;
/** Where the current page sits: links to the pages above it, separated by chevrons. maxItems collapses the middle. */
declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;

/** The button's class names, for styling any other element as a button. iconPosition adds the optical padding for one icon beside a label. */
declare function buttonClass(opts?: {
    variant?: ButtonVariant;
    destructive?: boolean;
    size?: ButtonSize;
    iconOnly?: boolean;
    iconPosition?: 'left' | 'right';
    className?: string;
}): string;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';
/** What every Button takes, as a <button> or as a link. */
interface ButtonOwnProps {
    /** Visual style. Default: 'primary' (solid brand color). */
    variant?: ButtonVariant;
    /** Danger colors on any variant, for deleting or irreversible actions. Default: false. */
    destructive?: boolean;
    /** Height: sm 24px, md 32px, lg 44px (the control-height tokens). Default: 'md'. */
    size?: ButtonSize;
    /** Icon before the label: an icon name (custom or Material Symbols, "add") or any element. */
    leftIcon?: IconSource;
    /** Icon after the label: an icon name (custom or Material Symbols, "arrow_forward") or any element. */
    rightIcon?: IconSource;
    /** Icon-only button: an icon name (custom or Material Symbols) or element, in a square at the size's height. Ignores children, leftIcon and rightIcon; needs an aria-label. */
    icon?: IconSource;
    /** Shows a centered Loader (ring) and blocks clicks, keys and Enter-key form submission while an action runs, so a request can't be sent twice. Keeps size, colors and keyboard focus; sets aria-busy, aria-disabled and data-loading. Default: false. */
    loading?: boolean;
    /** Announced to screen readers (polite status region) when loading starts. Default: 'Loading'. Pass '' to stay silent. */
    loadingText?: string;
}
/** A Button without href: a native <button>. */
interface ButtonAsButtonProps extends ButtonOwnProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    href?: undefined;
    /** 'button' (default, never submits by accident), 'submit' or 'reset'. */
    type?: 'button' | 'submit' | 'reset';
    /** Opens, closes or toggles a [popover] element by id (native HTML; React 18's own types don't list it yet). */
    popoverTarget?: string;
    popoverTargetAction?: 'show' | 'hide' | 'toggle';
    /** Invoker commands: the id of the element to act on, and the action ('show-modal', 'close', 'request-close', 'show-popover', 'hide-popover', 'toggle-popover', or a custom '--name'). */
    commandfor?: string;
    command?: string;
}
/** A Button with href: a link (<a>, or the component set with Serupa.configure({ link })), for navigation. */
interface ButtonAsLinkProps extends ButtonOwnProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
    /** Where the link goes. With target="_blank", rel defaults to "noopener noreferrer". */
    href: string;
    /** A link has no disabled state in HTML: a disabled link Button renders without href, with aria-disabled, and can't be focused or followed. */
    disabled?: boolean;
}
type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
/** A <button> for actions; pass href for navigation and it renders a link. Built-in micro-interactions: press, ripple and a loading cross-fade, plus an opt-in right-icon nudge (--button-icon-nudge); off under reduced motion. Colors, spacing, sizes, borders and motion can be overridden with the --button-* component tokens (button.tokens.json) on the page, a container or one button. */
declare const Button: {
    (props: ButtonAsButtonProps & React.RefAttributes<HTMLButtonElement>): React.ReactElement | null;
    (props: ButtonAsLinkProps & React.RefAttributes<HTMLAnchorElement>): React.ReactElement | null;
    displayName?: string;
};

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Buttons, IconButtons or ToggleButtons. */
    children?: React.ReactNode;
    /** Joins them into one control: shared borders, outer corners only. Default: true. */
    attached?: boolean;
    /** 'horizontal' (default) or 'vertical'. */
    orientation?: 'horizontal' | 'vertical';
    /** What the group is for ("Text formatting"), for screen readers. */
    "aria-label"?: string;
}
/** Related buttons in a row or a column, joined into one control or spaced apart. */
declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;

interface CarouselProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    /** The slides, one per child (pictures, cards, anything). */
    children?: React.ReactNode;
    /** What the carousel shows, such as "Featured products". Required: it names the region. */
    label: string;
    /** The slide shown (from 0), when you control it. */
    index?: number;
    /** The first slide shown when you don't control it. Default: 0. */
    defaultIndex?: number;
    /** Called with the new slide's index when the person moves to it. */
    onIndexChange?: (index: number) => void;
    /** Past the last slide comes the first, and before the first the last. Default: false (the buttons stop at the ends). */
    loop?: boolean;
    /** The previous and next buttons on the sides. Default: true. */
    arrows?: boolean;
    /** A dot for each slide under the carousel. Default: true. */
    dots?: boolean;
    /** The previous button's name. Default: "Previous slide". */
    previousLabel?: string;
    /** The next button's name. Default: "Next slide". */
    nextLabel?: string;
    /** Each slide's name, and its dot's, from the index (from 0) and the count. Default: the slideOf label, "2 of 5". */
    slideLabel?: (index: number, count: number) => string;
}
/** One slide at a time, with previous and next buttons, dots and swipe. */
declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLElement>>;

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** The selected day (controlled), or null. Use with onValueChange. */
    value?: Date | null;
    /** The selected day at first (uncontrolled). */
    defaultValue?: Date | null;
    /** Called with the day people pick. */
    onValueChange?: (value: Date) => void;
    /** The month shown (controlled): any day in it. Use with onMonthChange. */
    month?: Date;
    /** The month shown at first. Default: the selected day's, or today's. */
    defaultMonth?: Date;
    /** Called when the shown month changes. */
    onMonthChange?: (month: Date) => void;
    /** The earliest day that can be picked. */
    min?: Date;
    /** The latest day that can be picked. */
    max?: Date;
    /** Days that can't be picked, such as weekends. */
    isDateDisabled?: (date: Date) => boolean;
    /** A BCP 47 locale for month and weekday names and the first day of the week. Default: the nearest SerupaProvider's locale, else the browser's. */
    locale?: string;
    /** 0 Sunday … 6 Saturday. Default: the locale's. */
    weekStartsOn?: number;
    /** Moves focus to the selected day (or today) when the calendar appears. Default: false. */
    autoFocus?: boolean;
    /** Names for the month buttons. Default: "Previous month" and "Next month". */
    previousLabel?: string;
    nextLabel?: string;
    /** @internal Extra classes per day, for DateRangePicker. */
    dayClassName?: (date: Date) => string | undefined;
    /** @internal aria-selected per day, for DateRangePicker. */
    isDateSelected?: (date: Date) => boolean;
    /** @internal Called when a day gets focus or the pointer, for DateRangePicker's preview. */
    onDayHover?: (date: Date) => void;
    /** @internal Leaves the days of other months blank, for DateRangePicker's two months side by side. */
    hideOutside?: boolean;
}
/** A month of days to pick one from, with keyboard navigation; used by DatePicker. */
declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;

type CardVariant = 'outline' | 'elevated' | 'filled';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
interface CardProps extends React.HTMLAttributes<HTMLElement> {
    /** 'outline' (default): surface, a border and a hairline shadow. 'elevated': a raised shadow, for content that floats over the page. 'filled': surface-muted and flat, for panels inside another surface. */
    variant?: CardVariant;
    /** Inner padding: 'none' (for full-bleed media; pad the parts yourself), 'sm' 12px, 'md' 20px (default) or 'lg' 24px. */
    padding?: CardPadding;
    /** The element: 'div' (default), 'section', 'article' or 'li'. */
    as?: 'div' | 'section' | 'article' | 'li';
    /** Makes the whole card clickable, with a hover border and a focus ring. The link (the component set with
        configure({ link }), <a> by default) goes around the CardHeader's title and is named by it; its area is
        stretched over the card. Buttons and links inside still work on their own. Without a CardHeader title, the
        link is named by the card's text. */
    href?: string;
    /** The link's target. "_blank" adds rel="noopener noreferrer". */
    target?: string;
    /** The link's rel. */
    rel?: string;
}
/** A surface that groups related content and actions: CardHeader, CardBody and CardFooter inside. With href, the whole card is a link. */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>>;
interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The card's title, as a heading. */
    title?: React.ReactNode;
    /** A muted line (or a few) under the title. */
    description?: React.ReactNode;
    /** Something at the end of the header: a Badge, a menu button. */
    action?: React.ReactNode;
    /** The title's heading level: 2 to 6, default 3. Pick the level that fits the page's outline. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
/** The card's title, an optional description and an optional action at the end. Any children come after the description. */
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
/** The card's main content. */
declare const CardBody: React.ForwardRefExoticComponent<CardBodyProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Where the actions sit: 'end' (default), 'start' or 'between' (the first at the start, the rest at the end: give them a wrapper). */
    justify?: 'start' | 'end' | 'between';
}
/** The card's actions, in a wrapping row at the end. */
declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /** 'sm' (14px box, text-xs), 'md' (16px, text-sm, default) or 'lg' (20px, text-base). */
    size?: 'sm' | 'md' | 'lg';
    /** The label, next to the box; a click on it toggles the box. Without one, give the checkbox an aria-label. */
    children?: React.ReactNode;
    /** A second, muted line under the label, linked to the checkbox with aria-describedby. */
    description?: React.ReactNode;
    /** The "some" state, such as a select-all box when only some rows are picked: a dash, announced as mixed. Set it from your state; a click clears it natively. */
    indeterminate?: boolean;
    /** A danger border (while unchecked) and focus ring, and aria-invalid. */
    invalid?: boolean;
    /** Focusable and read out (aria-readonly), but a click or Space doesn't change it; a checked box is still submitted. */
    readOnly?: boolean;
}
/** A native checkbox with its label (ref, checked, onChange and every input attribute go to the <input>); className and style go to the <label> around it. */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

/** A swatch: its color as hex, and its name in words ("Ocean"), which is what screen readers say. */
interface ColorSwatch {
    value: string;
    label: string;
}
interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** The colors to pick from: { value: "#1d4ed8", label: "Blue" }, or a hex string, named by its code. */
    swatches: ReadonlyArray<ColorSwatch | string>;
    /** The color, as #rrggbb (controlled). Use with onValueChange. null: none picked. */
    value?: string | null;
    /** The color at first (uncontrolled). */
    defaultValue?: string | null;
    /** Called with the new color, always lowercase #rrggbb. */
    onValueChange?: (value: string) => void;
    /** A hex field and the browser's color picker after the swatches, for any color. Default: true. */
    custom?: boolean;
    /** A color to check the picked one against (the background it goes on, or the text on it): shows the WCAG ratio. */
    contrastWith?: string;
    /** The ratio below which it warns. Default: 4.5 (text); 3 for large text and icons. */
    minContrast?: number;
    /** 'sm' (24px swatches) or 'md' (32px, default). */
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** Submits the color with a form, in a hidden input. */
    name?: string;
}
/** Swatches to pick a color from, a hex field for any other, and a contrast check against a background. */
declare const ColorPicker: React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** 'sm' (24px, text-xs), 'md' (32px, text-sm, default) or 'lg' (44px, text-base): the control heights, like Button. */
    size?: 'sm' | 'md' | 'lg';
    /** A danger border and focus ring, and aria-invalid. Say what's wrong in text next to it, linked with aria-describedby. */
    invalid?: boolean;
    /** A decorative icon inside the field, before the text: an icon name or an element. */
    leftIcon?: IconSource;
    /** A decorative icon inside the field, after the text. */
    rightIcon?: IconSource;
}
/** A single-line text field: a native <input> (ref, value, onChange and every input attribute go to it) in a box that holds the icons; className and style go to the box. Label it with <label htmlFor> or aria-label. */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

type ComboboxOption = string | {
    value: string;
    label: string;
    description?: React.ReactNode;
    disabled?: boolean;
};
interface ComboboxProps extends Omit<InputProps, "type" | "value" | "defaultValue" | "rightIcon" | "onChange"> {
    /** The choices: strings, or { value, label, description, disabled }. The label is what's typed to find it and shown once picked. */
    options: ComboboxOption[];
    /** The selected value (controlled), or null. Use with onValueChange. */
    value?: string | null;
    /** The value selected at first (uncontrolled). */
    defaultValue?: string | null;
    /** Called with the picked value, or null when the field is emptied or cleared. */
    onValueChange?: (value: string | null) => void;
    /** Called with the text as it's typed: for loading options from a server (with filter={false} and loading). */
    onInputChange?: (text: string) => void;
    /** How typing narrows the list. Default: options whose label contains the text, ignoring case, accents and width ("lodz" finds "Łódź", "strasse" finds "Straße"). false shows every option (filter them yourself). */
    filter?: false | ((option: {
        value: string;
        label: string;
    }, text: string) => boolean);
    /** Shows a × that clears the selection once something is picked. Default: false. */
    clearable?: boolean;
    /** Shows a loading row in the list. Default: false. */
    loading?: boolean;
    /** Shown when nothing matches. Default: "No results". */
    emptyText?: React.ReactNode;
    /** Shown while loading. Default: "Loading…". */
    loadingText?: string;
    /** The chevron button's name. Default: "Show options". */
    toggleLabel?: string;
    /** The × button's name. Default: "Clear" and the field's label ("Clear Country"), or "Clear" when it has none. */
    clearLabel?: string;
}
/** A text field with a list of options that narrows as you type; picks one listed option. */
declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLInputElement>>;

type ContainerSize = 'prose' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    /** The widest the content gets: 'prose' 672px (reading), 'md' 768, 'lg' 1024, 'xl' 1280 (default), '2xl' 1536 or 'full'. */
    size?: ContainerSize;
    /** Side padding that grows with the screen (16, 24 from 640px, 32 from 1024px). Default: true. */
    padded?: boolean;
    /** The element. Default: 'div'. */
    as?: 'div' | 'main' | 'section' | 'header' | 'footer' | 'article';
}
/** Centers content with a maximum width and responsive side padding. */
declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLElement>>;

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max'> {
    /** The chosen day (controlled), or null. Use with onValueChange. */
    value?: Date | null;
    /** The chosen day at first (uncontrolled). */
    defaultValue?: Date | null;
    /** Called with the new day, or null when the field is cleared. */
    onValueChange?: (value: Date | null) => void;
    /** The earliest and latest days that can be chosen. */
    min?: Date;
    max?: Date;
    /** Days that can't be chosen, such as weekends. */
    isDateDisabled?: (date: Date) => boolean;
    /** A BCP 47 locale for the typed format, names and first day of the week. Default: the nearest SerupaProvider's locale, else the browser's. */
    locale?: string;
    /** 0 Sunday … 6 Saturday. Default: the locale's. */
    weekStartsOn?: number;
    /** 'sm', 'md' (default) or 'lg', like Input. */
    size?: 'sm' | 'md' | 'lg';
    /** A danger border and aria-invalid, like Input. */
    invalid?: boolean;
    /** The calendar button's name. Default: "Choose a date". */
    buttonLabel?: string;
}
/** A date field: type a date or pick one from a calendar popover. */
declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;

/** A range of days; either end can be empty while it's being chosen. */
interface DateRange {
    start: Date | null;
    end: Date | null;
}
interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'defaultValue' | 'onChange'> {
    /** The chosen range (controlled). Use with onValueChange. */
    value?: DateRange;
    /** The chosen range at first (uncontrolled). */
    defaultValue?: DateRange;
    /** Called with the new range whenever either end changes. */
    onValueChange?: (value: DateRange) => void;
    /** The earliest and latest days that can be chosen. */
    min?: Date;
    max?: Date;
    /** Days that can't be the start or end, such as holidays. They can sit inside a range. */
    isDateDisabled?: (date: Date) => boolean;
    /** A BCP 47 locale for the typed format, names and first day of the week. Default: the nearest SerupaProvider's locale, else the browser's. */
    locale?: string;
    /** 0 Sunday … 6 Saturday. Default: the locale's. */
    weekStartsOn?: number;
    /** 'sm', 'md' (default) or 'lg', like Input. */
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    /** Both fields are required: a form won't submit until each end has a date, as with a required <input>. */
    required?: boolean;
    /** The start field's id, so a Field or <label htmlFor> focuses it. */
    id?: string;
    /** Names for the two fields. Default: "Start date" and "End date". */
    startLabel?: string;
    endLabel?: string;
    /** Form names: hidden inputs send each end as yyyy-mm-dd. */
    startName?: string;
    endName?: string;
    /** The calendar button's name. Default: "Choose dates". */
    buttonLabel?: string;
    /** Months shown side by side in the popup: 1 or 2 (default). */
    months?: 1 | 2;
}
/** Two date fields for a start and end, with a two-month calendar popup to pick the range. */
declare const DateRangePicker: React.ForwardRefExoticComponent<DateRangePickerProps & React.RefAttributes<HTMLSpanElement>>;

interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open'> {
    /** Whether it's open. Controlled: close it yourself in onOpenChange. */
    open: boolean;
    /** Called with false when people ask to close it: Escape, the close button, or a click on the backdrop. */
    onOpenChange?: (open: boolean) => void;
    /** The heading, which also names the dialog. */
    title?: React.ReactNode;
    /** A muted line under the title, read when the dialog opens. */
    description?: React.ReactNode;
    /** Buttons at the bottom end: the main action last. */
    footer?: React.ReactNode;
    /** 'sm' 384px, 'md' 512px (default) or 'lg' 672px wide, at most the screen less 16px each side. */
    size?: 'sm' | 'md' | 'lg';
    /** An alert dialog (role="alertdialog") for a confirmation that needs an answer: no close button, and the backdrop doesn't close it. Escape still does. */
    alert?: boolean;
    /** Shows the × in the corner. Default: true (false for alert). */
    closeButton?: boolean;
    /** The × button's name. Default: 'Close'. */
    closeLabel?: string;
    /** Whether a click on the backdrop closes it. Default: true (false for alert). */
    closeOnBackdrop?: boolean;
}
/** A modal dialog on the native <dialog>: a title, content and actions, over a dimmed page. */
declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDialogElement>>;

interface DividerProps extends React.HTMLAttributes<HTMLElement> {
    /** 'horizontal' (default) or 'vertical' (between items in a row: it takes the row's height). */
    orientation?: 'horizontal' | 'vertical';
    /** Text in the middle of a horizontal line, such as "or". */
    label?: React.ReactNode;
    /** Leaves it out of the accessibility tree, when it's only decoration. Default: false. */
    decorative?: boolean;
}
/** A line between content, horizontal or vertical, with an optional label such as "or". */
declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLElement>>;

interface DrawerProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open'> {
    /** Whether it's open. Controlled: close it yourself in onOpenChange. */
    open: boolean;
    /** Called with false when people ask to close it: Escape, the close button, or a click on the backdrop. */
    onOpenChange?: (open: boolean) => void;
    /** The edge it slides in from: 'right' (default), 'left', 'top' or 'bottom'. */
    side?: 'right' | 'left' | 'top' | 'bottom';
    /** The width of a left or right drawer: 'sm' 320px, 'md' 384px (default) or 'lg' 512px, at most the screen. Top and bottom drawers fit their content. */
    size?: 'sm' | 'md' | 'lg';
    /** The heading, which also names the drawer. */
    title?: React.ReactNode;
    /** A muted line under the title, read when it opens. */
    description?: React.ReactNode;
    /** Buttons pinned to the bottom, under a line: the main action last. */
    footer?: React.ReactNode;
    /** Shows the × in the corner. Default: true. */
    closeButton?: boolean;
    /** The × button's name. Default: 'Close'. */
    closeLabel?: string;
    /** Whether a click on the backdrop closes it. Default: true. */
    closeOnBackdrop?: boolean;
}
/** A modal panel that slides in from an edge: navigation, filters, details. */
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDialogElement>>;

interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** A picture of what's missing: an icon name ('inbox', 'search_off') or an element (an illustration). */
    icon?: IconSource;
    /** What's empty, in a few words: "No projects yet". */
    title: React.ReactNode;
    /** What it means or what to do next. */
    description?: React.ReactNode;
    /** One or two Buttons: the way out ("New project"). */
    actions?: React.ReactNode;
    /** 'md' (default) or 'sm' (inside a card, a table or a menu). */
    size?: 'sm' | 'md';
    /** 'plain' (default) or 'dashed': a dashed frame, for a drop zone or a slot to fill. */
    variant?: 'plain' | 'dashed';
    /** The title's heading level, to fit the page outline. Default: 3. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
}
/** What to show when there's nothing yet: an icon, a title, a description and the action that fills it. */
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

type FabPosition = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start' | 'static';
interface FabProps extends Omit<ButtonAsButtonProps, 'icon' | 'leftIcon' | 'rightIcon' | 'children' | 'variant' | 'size' | 'aria-label'> {
    /** The icon: a custom or Material Symbols name ("add") or any element. */
    icon: IconSource;
    /** What the button does. Shown next to the icon when extended; otherwise its aria-label and title. */
    label: string;
    /** Shows the label next to the icon (an extended FAB). Default: false. */
    extended?: boolean;
    /** 'md' (default, 56px) or 'sm' (40px). */
    size?: 'sm' | 'md';
    /** Where it's fixed on the screen: 'bottom-end' (default), 'bottom-start', 'top-end' or 'top-start', 24px from the corner; 'static' leaves the placing to you. */
    position?: FabPosition;
}
/** A floating action button: the screen's main action, round and raised, fixed to a corner. */
declare const Fab: React.ForwardRefExoticComponent<FabProps & React.RefAttributes<HTMLButtonElement>>;

interface FieldProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    /** The label: a <label> linked to the control, or with group, the fieldset's <legend>. */
    label?: React.ReactNode;
    /** Help text under the label, before the control (text-muted); added to the control's aria-describedby. */
    hint?: React.ReactNode;
    /** An error message under the control (danger-text, with an icon); makes the control invalid and is added to its aria-describedby. */
    error?: React.ReactNode;
    /** A * after the label (hidden from screen readers) and aria-required on the control. Add the control's own required for the browser's check. */
    required?: boolean;
    /** "(optional)" after the label, or your own words. Ignored with required. */
    optional?: boolean | string;
    /** Disables the control (with group, every control in the fieldset) and dims the label and hint. */
    disabled?: boolean;
    /** A <fieldset> with a <legend> for a set of checkboxes or radios; the hint and error describe the fieldset. */
    group?: boolean;
    /** The control's id; by default the control's own id, or a generated one. */
    id?: string;
    /** One control (Input, Textarea, Select or any element), or with group, the set. */
    children?: React.ReactNode;
}
/** A label, an optional hint and an error message around one form control, wired up for screen readers. className and other attributes go to the outer element. */
declare const Field: ((props: FieldProps) => React.ReactElement) & {
    displayName: string;
};

/** A file size for people: 1.5 MB, 820 KB, 12 B. */
declare function formatFileSize(bytes: number): string;

type FileRejection = {
    file: File;
    reason: 'type' | 'size' | 'count';
    message: string;
};
interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'title'> {
    /** The chosen files (controlled). Use with onFilesChange. */
    files?: File[];
    /** Called with the new list when files are added or removed. */
    onFilesChange?: (files: File[]) => void;
    /** Called with the files that weren't added and why. They're also listed under the drop area. */
    onReject?: (rejections: FileRejection[]) => void;
    /** File types to allow, as for <input accept>: "image/*,.pdf". */
    accept?: string;
    /** Allows several files. Default: false (a new file replaces the old one). */
    multiple?: boolean;
    /** The largest file allowed, in bytes. */
    maxSize?: number;
    /** The most files allowed, with multiple. */
    maxFiles?: number;
    disabled?: boolean;
    /** A danger outline on the drop area, and aria-invalid on the choose button. In a Field with an error, it's set for you. */
    invalid?: boolean;
    /** Required for the form's check (on the native input) and aria-required on the choose button. In a required Field, aria-required is set for you. */
    required?: boolean;
    /** The chosen files are shown and submitted, but can't be changed: the choose button stays focusable (aria-disabled) and doesn't open the picker, dropped files are ignored and there are no remove buttons. */
    readOnly?: boolean;
    /** Submits the files with a form, through the native file input. */
    name?: string;
    /** The drop area's title. Default: "Drag files here" ("Drag a file here" without multiple). */
    title?: React.ReactNode;
    /** The button's text. Default: "Choose files" ("Choose a file"). */
    buttonLabel?: string;
    /** A muted line, such as "PNG or JPG, up to 5 MB". */
    hint?: React.ReactNode;
    /** The remove buttons' names, given the file name. Default: (name) => `Remove ${name}`. */
    removeLabel?: (name: string) => string;
}
/** A drop area and a button for choosing files, with the chosen files listed under it. */
declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;

/** How FormattedNumber writes a number: as is, short (1.2K), a share (45%), money, a file size or a unit. */
type NumberFormat = 'decimal' | 'compact' | 'percent' | 'currency' | 'bytes' | 'unit';
interface FormatNumberOptions extends Intl.NumberFormatOptions {
    /** 'decimal' (default), 'compact', 'percent' (0.45 is 45%), 'currency' (with currency), 'bytes' or 'unit' (with unit). */
    format?: NumberFormat;
}
/** A number in the locale's words: formatNumber(1234, "id-ID") is "1.234"; { format: "compact" } "1,2 rb"; "bytes" "1,5 MB". */
declare function formatNumber(value: number | bigint, locale?: string, options?: FormatNumberOptions): string;

interface FormattedNumberProps extends Omit<React.DataHTMLAttributes<HTMLDataElement>, 'children' | 'value'> {
    /** The number. NaN renders an empty element. */
    value: number | bigint;
    /** 'decimal' (default), 'compact' (1.2K), 'percent' (0.45 is 45%), 'currency' (with currency), 'bytes' (1.5 MB) or 'unit' (with unit). */
    format?: NumberFormat;
    /** With format="currency": an ISO 4217 code, "IDR", "USD", "EUR". */
    currency?: string;
    /** With format="unit": a unit Intl knows, "kilometer-per-hour", "celsius", "liter". */
    unit?: string;
    /** Any other Intl.NumberFormat options (maximumFractionDigits, signDisplay, currencyDisplay...); these win. */
    options?: Intl.NumberFormatOptions;
    /** A locale for this one; otherwise the SerupaProvider's, else the browser's. */
    locale?: string;
}
/** A number written the way the reader's locale writes it: plain, compact, a percentage, money, a size or a unit. */
declare const FormattedNumber: React.ForwardRefExoticComponent<FormattedNumberProps & React.RefAttributes<HTMLDataElement>>;

type Space = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;

interface GridProps extends React.HTMLAttributes<HTMLElement> {
    /** A number of equal columns (1 to 12), or 'auto' (default): as many columns as fit, each at least minColumnWidth. */
    columns?: number | 'auto';
    /** With columns="auto": the narrowest a column gets, a CSS length or a sizing token name ('container-3xs'). Default: 256px (container-3xs). */
    minColumnWidth?: string;
    /** The space between cells, a step of the spacing scale. Default: 4 (16px). */
    gap?: Space;
    /** The element. Default: 'div'. */
    as?: 'div' | 'section' | 'ul' | 'ol';
}
/** Equal columns, or as many as fit, with even space from the spacing scale between cells. */
declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLElement>>;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** The heading element, h1 to h6: pick the level that fits the page's outline. Default: 2. */
    level?: HeadingLevel;
    /** The look, from the type scale, separate from the level. Default: the level's own (1: 3xl, 2: 2xl, 3: xl, 4: lg, 5: base, 6: sm). */
    size?: HeadingSize;
}
/** A heading (h1 to h6) in the system's type: level sets the element, size the look. */
declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;

type Without<T> = T extends unknown ? Omit<T, 'icon' | 'leftIcon' | 'rightIcon' | 'children' | 'aria-label'> : never;
interface IconButtonOwnProps {
    /** The icon: a custom or Material Symbols name ("more_vert") or any element. */
    icon: IconSource;
    /** What the button does, for screen readers (its aria-label) and as a tooltip (title). Required: an icon alone has no name. */
    label: string;
    /** 'square' (default, the Button's corners) or 'round'. */
    shape?: 'square' | 'round';
    /** Leaves out the title tooltip, for when a Tooltip or visible text already shows the label. Default: false. */
    noTitle?: boolean;
}
type IconButtonProps = Without<ButtonAsButtonProps> & IconButtonOwnProps | Without<ButtonAsLinkProps> & IconButtonOwnProps;
/** A Button that shows only an icon, with a required label for screen readers. Default variant: ghost. */
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;

type ImageRatio = 'auto' | 'square' | '4:3' | 'video' | number;
interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src' | 'placeholder'> {
    /** The picture's address. */
    src: string;
    /** What the picture shows, for people who can't see it. Required: use "" only for a decorative picture. */
    alt: string;
    /** The frame's shape: 'auto' (the picture's own, default), 'square' (1:1), '4:3', 'video' (16:9) or a number (width / height). */
    ratio?: ImageRatio;
    /** How the picture fills a fixed ratio: 'cover' (fills and crops, default) or 'contain' (fits whole). */
    fit?: 'cover' | 'contain';
    /** Rounded corners (--image-radius). Default: true. */
    rounded?: boolean;
    /** What shows if the picture fails to load. Default: a muted broken-image icon. */
    fallback?: React.ReactNode;
    /** Makes it a button that opens the picture full size in a viewer. Default: false. */
    viewable?: boolean;
    /** A larger version for the viewer. Default: src. */
    fullSrc?: string;
    /** The view button's name. Default: "View image" plus the alt text. */
    viewLabel?: string;
    /** Shows a remove button in the corner; called when it's pressed. */
    onRemove?: () => void;
    /** The remove button's name. Default: "Remove image" plus the alt text. */
    removeLabel?: string;
    /** The main picture at the top of a page (a hero): loads at once with high priority instead of lazily, so it
     *  shows sooner (Largest Contentful Paint). Default: false. */
    priority?: boolean;
    /** Props for the outer frame, such as style for its width. */
    frameProps?: React.HTMLAttributes<HTMLSpanElement>;
}
/** A picture in a frame with a ratio, a loading placeholder and an error fallback; optionally opens full size or can be removed. */
declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;

interface InlineEditProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'defaultValue' | 'onChange'> {
    /** What the text is ("Project name"): the field's name while editing, and part of the button's name ("Project name: Apollo, Edit"). */
    label: string;
    /** The text (controlled). Use with onValueChange. */
    value?: string;
    /** The text at first (uncontrolled). */
    defaultValue?: string;
    /** Called with the new text when it's saved (Enter, or leaving the field) and has changed. */
    onValueChange?: (value: string) => void;
    /** Called when editing ends without saving (Escape). */
    onCancel?: () => void;
    /** Checks the text before it's saved: return an error message to keep the field open and show it, or nothing to save. */
    validate?: (value: string) => React.ReactNode;
    /** Shown (in the muted color) when the text is empty. */
    placeholder?: string;
    /** 'sm', 'md' (default) or 'lg': Input's heights and text sizes, in both modes, so nothing moves when it opens. */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the field is open (controlled). Use with onEditingChange. */
    editing?: boolean;
    /** Called with true when it opens and false when it closes. */
    onEditingChange?: (editing: boolean) => void;
    /** Shows the text without an edit button. */
    disabled?: boolean;
    /** Shows the text without an edit button, in the full text color. */
    readOnly?: boolean;
    /** The word after the text in the button's name. Default: "Edit" (from SerupaProvider labels). */
    editLabel?: string;
    /** Props for the <input> while editing: maxLength, autoComplete, spellCheck, inputMode… */
    inputProps?: Omit<InputProps, 'value' | 'defaultValue' | 'size' | 'aria-label'>;
}
/** Text people can click to edit in place: Enter or leaving saves, Escape cancels. */
declare const InlineEdit: React.ForwardRefExoticComponent<InlineEditProps & React.RefAttributes<HTMLDivElement>>;

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    /** ListItems. */
    children?: React.ReactNode;
    /** 'plain' (default) or 'card': inside a bordered, rounded frame. */
    variant?: 'plain' | 'card';
    /** Lines between items. Default: true. */
    divided?: boolean;
    /** 'ul' (default) or 'ol' when the order matters. */
    as?: 'ul' | 'ol';
}
interface ListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title" | "onClick"> {
    /** The item's main line. */
    title: React.ReactNode;
    /** A second, muted line. */
    description?: React.ReactNode;
    /** Before the text: an Avatar, an icon name or an image. */
    leading?: IconSource;
    /** After the text: meta (a date, a Badge) or actions (an IconButton, a Menu). Stays outside the link or button. */
    trailing?: React.ReactNode;
    /** Makes the item's main area a link. */
    href?: string;
    /** Makes the item's main area a button (when there's no href). */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    /** What renders the link: 'a' (default), or your router's link component. Its props go in linkProps. */
    as?: React.ElementType;
    /** Extra props for the link or button (to for a router link, target, aria-*). */
    linkProps?: Record<string, unknown>;
    /** Shaded with a primary bar at its start, and aria-current="true" (or aria-pressed for a button). Default: false. */
    selected?: boolean;
    /** Dims a link or button item and stops it. Default: false. */
    disabled?: boolean;
}
/** Rows of related things: title, description, leading avatar or icon, trailing meta or actions; rows can be links. */
declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLUListElement>>;
/** One row in a List. */
declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;

type LoaderVariant = 'ring' | 'spokes' | 'dots' | 'pixel' | 'text' | 'skeleton';
type LoaderShape = 'text' | 'circle' | 'rect';
type LoaderPattern = 'wave' | 'random' | 'sweep' | 'fall' | 'rise' | 'snake' | 'spiral' | 'cross' | 'checker';
type LoaderTone = 'neutral' | 'primary' | 'muted' | 'inverse';
interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** 'ring' (default): an arc that grows and shrinks as it turns on a faint track. 'spokes': eight rounded spokes fading round a circle, ticking a spoke at a time, like the iOS activity indicator. 'dots': three pulsing dots, softer, for chat-like or inline waits. 'pixel': a 3×3 grid of squares lighting up in a diagonal wave. 'text': the label's words with a shine sweeping through them. 'skeleton': placeholder shapes where the content will be (see shape). */
    variant?: LoaderVariant;
    /** sm 16px (inline, small controls), md 24px (default: cards, panels, lists), lg 40px (a page or empty area). The text variant's words, and the skeleton's text lines: text-xs, text-sm, text-base. The skeleton circle: 16, 24 or 40px. */
    size?: 'sm' | 'md' | 'lg';
    /** 'neutral' (default): the text color, so it fits any surface. 'primary' or 'muted' color the ring, dots or pixel grid with those aliases (the text and skeleton variants stay in the text color). 'inverse': white in every theme, for dark scrims, overlays and media. */
    tone?: LoaderTone;
    /** Announced to screen readers when the loader appears, and its accessible name (role="progressbar"); the words the text variant shows. Default: 'Loading'. Pass '' when something nearby already announces it (the loader is then decorative). In a group of skeletons, name one and pass '' to the rest. */
    label?: string;
    /** Skeleton only. 'text' (default): lines as tall as the size's text line, full width, the last of several shorter. 'circle': an avatar, the size's 24px by default. 'rect': an image or card, full width and 96px tall. Set width and height with className (w-48, size-12, h-40). */
    shape?: LoaderShape;
    /** Skeleton with shape 'text': how many lines, 1 (default) to 20. */
    lines?: number;
    /** Pixel only. 'wave' (default): a wave of light runs along the diagonals from the top-left. 'random': each square twinkles on its own clock, so they light up in an ever-changing order. 'sweep': columns, left to right. 'fall': rows, top to bottom. 'rise': rows, bottom to top. 'snake': square by square, left to right then back, row by row. 'spiral': clockwise round the edge, then the center. 'cross': the corners, then the plus. 'checker': the X, then the edges. */
    pattern?: LoaderPattern;
    /** Pixel only: a soft halo of the loader's color round the lit squares (--loader-pixel-glow-size, 2px). Best on dark surfaces. Default false. */
    glow?: boolean;
    /** Milliseconds to wait before showing, so fast requests don't flash a loader. Its space is kept meanwhile. Default: 300. 0 shows it at once. */
    delay?: number;
}
/** Shows that something is loading when you can't say how far along it is. Mark the area that's loading with aria-busy while it shows. */
declare const Loader: React.ForwardRefExoticComponent<LoaderProps & React.RefAttributes<HTMLSpanElement>>;

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
    /** A combination, one key each: ['mod', 'K'], ['shift', 'enter']. Names below show as symbols on Apple devices. Or pass one key as children. */
    keys?: string[];
    /** 'sm' (20px) or 'md' (24px, default). */
    size?: 'sm' | 'md';
}
/** A keyboard key or shortcut, drawn as keycaps; "mod" follows the platform (⌘ or Ctrl). */
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** 'primary' (default): the primary color. 'neutral': the surrounding text's color, still underlined. */
    tone?: 'primary' | 'neutral';
    /** 'always' (default): underlined, so it's a link without relying on color. 'hover': only on hover and focus, for links whose place already says they're links (a nav bar, a footer). */
    underline?: 'always' | 'hover';
    /** Opens in a new tab (target="_blank", rel="noopener noreferrer"), with a new-tab icon and "(opens in a new tab)" for screen readers. Default: false. */
    external?: boolean;
    /** What renders the link: 'a' (default), or your router's link component (it gets href, className and the rest). */
    as?: React.ElementType;
}
/** An inline text link: underlined, primary or the text's color. external opens a new tab and says so. */
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

type Side = 'top' | 'bottom' | 'left' | 'right';
type Placement = Side | `${Side}-${'start' | 'end'}`;

interface MenuProps {
    /** The button that opens the menu: one element, such as a Button or IconButton. It gets aria-haspopup, aria-expanded and the keys. */
    trigger: React.ReactElement;
    /** MenuItem, MenuGroup and MenuSeparator. */
    children: React.ReactNode;
    /** Where the menu goes: 'bottom-start' (default), 'bottom-end', 'top-start', 'top-end', or any Tooltip placement. It flips when there's no room. */
    placement?: Placement;
    /** Open it yourself (controlled), with onOpenChange. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** The menu's name for screen readers. Default: the trigger's text, by aria-labelledby. */
    'aria-label'?: string;
    className?: string;
    style?: React.CSSProperties;
}
/** A list of actions behind a button: MenuItem, MenuGroup and MenuSeparator inside. */
declare const Menu: ((props: MenuProps) => React.ReactElement) & {
    displayName: string;
};
interface MenuItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /** Called when the item is chosen (click, Enter or Space). The menu then closes, unless you call event.preventDefault(). */
    onSelect?: (event: React.SyntheticEvent) => void;
    /** An icon before the label: an icon name or any element. */
    icon?: IconSource;
    /** A keyboard shortcut shown at the end, such as "⌘K". Only a hint: wire the shortcut yourself. */
    shortcut?: string;
    /** Danger colors, for deleting. */
    destructive?: boolean;
    /** Still reachable with the keys, but can't be chosen (aria-disabled). */
    disabled?: boolean;
    /** Makes it a link (the configure({ link }) component, <a> by default). */
    href?: string;
    target?: string;
    rel?: string;
}
/** One action in a Menu. */
declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLElement>>;
interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** A small heading over the group, which also names it. */
    label?: React.ReactNode;
}
/** Items that belong together, with an optional heading. */
declare const MenuGroup: React.ForwardRefExoticComponent<MenuGroupProps & React.RefAttributes<HTMLDivElement>>;
/** A line between groups of items. */
declare const MenuSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    /** The logo or product name on the left, usually a link home. */
    brand?: React.ReactNode;
    /** NavbarLinks: the main pages. Below 768px they fold into a menu button. */
    children?: React.ReactNode;
    /** Controls on the right: a search, a user menu, a sign-in button. */
    actions?: React.ReactNode;
    /** Keeps the bar at the top while the page scrolls. Default: false. */
    sticky?: boolean;
    /** The content's maximum width, like Container: 'md', 'lg', 'xl' (default), '2xl' or 'full'. */
    size?: ContainerSize;
    /** The links' nav name. Default: "Main". */
    "aria-label"?: string;
    /** The menu button's name on small screens. Default: "Menu". */
    menuLabel?: string;
}
interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The current page: shaded, with aria-current="page". Default: false. */
    active?: boolean;
    /** What renders the link: 'a' (default), or your router's link component. */
    as?: React.ElementType;
}
/** The bar across the top: brand, main links and actions. On small screens the links fold into a menu button. */
declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>>;
/** A main page link in a Navbar. active marks the current page; following one closes the small-screen menu. */
declare const NavbarLink: React.ForwardRefExoticComponent<NavbarLinkProps & React.RefAttributes<HTMLAnchorElement>>;

interface NumberInputProps extends Omit<InputProps, "type" | "value" | "defaultValue" | "rightIcon" | "min" | "max" | "step"> {
    /** The number (controlled), or null when the field is empty. Use with onValueChange. */
    value?: number | null;
    /** The number at first (uncontrolled). */
    defaultValue?: number | null;
    /** Called with the new number, or null when emptied: as people type (numbers within min..max), on blur (clamped), and from the arrow keys and buttons. */
    onValueChange?: (value: number | null) => void;
    /** The smallest allowed number. The field snaps to it when it loses focus. */
    min?: number;
    /** The largest allowed number. */
    max?: number;
    /** How much the arrow keys and buttons change it. Default: 1. Its decimals set how many the value keeps (step 0.25: two). */
    step?: number;
    /** How many steps PageUp, PageDown and Shift with an arrow move. Default: 10. */
    largeStep?: number;
    /** Shows the − and + buttons at the end. Default: true. */
    steppers?: boolean;
    /** The buttons' names. Default: "Decrease" and "Increase". */
    decrementLabel?: string;
    incrementLabel?: string;
    /** The locale whose decimal and group marks are read and written ("1.500,25" in id-ID). Default: the nearest SerupaProvider's locale, else the browser's. */
    locale?: string;
    /** How the number is shown, as Intl.NumberFormat options: `{ style: "currency", currency: "IDR" }`, `{ useGrouping: true }`,
        or the percent style (the value is the fraction: 0.15 shows 15%). Default: no grouping and every decimal the value has. */
    formatOptions?: Intl.NumberFormatOptions;
    /** An ISO 4217 code ("IDR", "USD", "JPY"): shows the amount as money, with the symbol where the locale puts it, and keeps
        the currency's decimals (19.99, not 20). Short for formatOptions { style: "currency", currency }; formatOptions still wins. */
    currency?: string;
    /** With currency: value, defaultValue, onValueChange, min, max and step are whole minor units (cents), so 1999 is
        $19.99 and ¥1999 is ¥1,999. Store money this way to avoid floating-point sums. */
    minorUnits?: boolean;
}
/** A number field with − and + buttons, arrow keys, min, max and step. */
declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;

type Entry = number | "start-ellipsis" | "end-ellipsis";
/** The pages to show: the boundaries at each end, siblings around the current one, and … where pages are skipped. Always the same length, so the arrows don't move. */
declare function paginationRange(page: number, count: number, siblings?: number, boundaries?: number): Entry[];

interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    /** How many pages there are. */
    count: number;
    /** The current page, from 1 (controlled). Use with onPageChange. */
    page?: number;
    /** The page it starts on when uncontrolled. Default: 1. */
    defaultPage?: number;
    /** Called with the new page when someone picks one. */
    onPageChange?: (page: number) => void;
    /** Makes every page a link to this URL instead of a button (it still calls onPageChange on click). */
    getHref?: (page: number) => string;
    /** Pages shown on each side of the current one. Default: 1. */
    siblings?: number;
    /** Pages always shown at the start and the end. Default: 1. */
    boundaries?: number;
    /** 'md' (default, 32px) or 'sm' (24px). */
    size?: 'sm' | 'md';
    /** The nav's accessible name. Default: "Pagination". */
    "aria-label"?: string;
    /** Default: "Previous page". */
    previousLabel?: string;
    /** Default: "Next page". */
    nextLabel?: string;
    /** A page's accessible name. Default: (n) => "Page " + n. */
    pageLabel?: (page: number) => string;
}
/** Moves through pages of results: previous, next, and page numbers with … where pages are skipped. */
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;

interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
    /** Shows the password as text (controlled). Use with onVisibleChange. */
    visible?: boolean;
    /** Shows it as text at first (uncontrolled). Default: false. */
    defaultVisible?: boolean;
    /** Called with the new state when the show/hide button is pressed. */
    onVisibleChange?: (visible: boolean) => void;
    /** The show/hide button's name. Default: "Show password" (its aria-pressed says whether it's shown). */
    toggleLabel?: string;
}
/** A password field with a button that shows and hides what was typed. */
declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;

/** What onValueChange reports with the E.164 number. */
interface PhoneValueDetails {
    /** The picked country's ISO code, such as "ID". */
    country: string;
    /** The national number, digits only, without the trunk prefix. */
    national: string;
    /** Whether the number has a length the country uses. */
    complete: boolean;
}
interface PhoneInputProps extends Omit<InputProps, "type" | "value" | "defaultValue" | "onChange" | "leftIcon" | "rightIcon"> {
    /** The number in E.164, such as "+6281234567890", or "" (controlled). Use with onValueChange. */
    value?: string;
    /** The number at first (uncontrolled), in E.164. */
    defaultValue?: string;
    /** Called with the E.164 number ("" when empty) as people type, paste or change the country. */
    onValueChange?: (value: string, details: PhoneValueDetails) => void;
    /** The picked country, an ISO code such as "ID" (controlled). Use with onCountryChange. */
    country?: string;
    /** The country at first (uncontrolled). Default: the locale's region when it's known, else "US". */
    defaultCountry?: string;
    /** Called with the ISO code when the country changes, from the menu or a pasted "+…" number. */
    onCountryChange?: (country: string) => void;
    /** The countries in the menu, as ISO codes; the menu sorts them by name. Default: every country PhoneInput knows. */
    countries?: string[];
    /** The country menu's name. Default: "Country". */
    countryLabel?: string;
    /** Submits the E.164 number under this name in a hidden input. */
    name?: string;
}
/** A phone number field: a country menu and a tel field that groups the number as people type, reporting E.164 ("+6281234567890"). */
declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<HTMLInputElement>>;

/** One country PhoneInput knows: its ISO 3166 code, calling code, trunk prefix, grouping and national lengths. */
interface PhoneCountry {
    /** ISO 3166-1 alpha-2, such as "ID". */
    code: string;
    /** The calling code without "+", such as "62". */
    dial: string;
    /** The prefix dialled at home and dropped after the calling code ("0" in most places, "8" in Russia, "" where there is none). */
    trunk: string;
    /** The grouping, with # for a digit, such as "###-####-####". Digits past the last # follow it without a space. */
    pattern: string;
    /** The shortest and longest national number, without the trunk prefix. */
    min: number;
    max: number;
}
/** The result of reading an international number. */
interface ParsedPhone {
    country: PhoneCountry;
    /** The national number, digits only, without the trunk prefix. */
    national: string;
}
/** Reads "+62 812-3456-7890" (or "0062…"): the country from its calling code (preferring `prefer` when it shares one) and the national digits. Undefined when no known calling code matches. */
declare function parsePhone(value: string, prefer?: string): ParsedPhone | undefined;
/** Formats an E.164 number for reading: "+6281234567890" is "+62 812-3456-7890". A number with no known calling code comes back as it was. */
declare function formatPhone(e164: string, prefer?: string): string;

interface PopoverProps {
    /** The element that opens it: one element that can take focus, such as a Button. It gets aria-expanded and aria-controls. */
    trigger: React.ReactElement;
    /** What's inside: text, a form, links, buttons. A function gets close(), for a Cancel or Done button. */
    children: React.ReactNode | ((close: () => void) => React.ReactNode);
    /** A heading at the top that names the popover. */
    title?: React.ReactNode;
    /** Where it goes: 'bottom' (default), 'top', 'left', 'right', with '-start' or '-end'. It flips when there's no room. */
    placement?: Placement;
    /** Open it yourself (controlled), with onOpenChange. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Its name for screen readers when it has no title. */
    "aria-label"?: string;
    /** Where focus goes when it opens: 'first' (default: the first control inside, or the panel) or 'panel'. */
    initialFocus?: 'first' | 'panel';
    className?: string;
    style?: React.CSSProperties;
}
/** A small non-modal dialog next to its trigger, for interactive content: a form, filters, details. */
declare const Popover: ((props: PopoverProps) => React.ReactElement) & {
    displayName: string;
};

interface CopyButtonProps extends Omit<ButtonAsButtonProps, 'value' | 'onCopy' | 'icon' | 'leftIcon' | 'rightIcon' | 'loading' | 'loadingText'> {
    /** What to copy: the text, or a function that returns it (or a promise of it) when the button is pressed. */
    value: string | (() => string | Promise<string>);
    /** The button's text. Default: "Copy" (labels.copy). */
    children?: React.ReactNode;
    /** What it shows and announces once it has copied. Default: "Copied" (labels.copied). */
    copiedLabel?: string;
    /** Shows only the icon, named by children (or "Copy") as its aria-label and tooltip. Default: false. */
    iconOnly?: boolean;
    /** How long it shows "Copied", in ms. Default: 2000. */
    timeout?: number;
    /** Called with the text once it's on the clipboard. */
    onCopy?: (text: string) => void;
    /** Called when the browser refuses (no permission, an insecure page). The button also announces labels.copyFailed. */
    onCopyError?: (error: unknown) => void;
}
/** A button that copies text to the clipboard, then shows "Copied" with a check and says so to screen readers. */
declare const CopyButton: React.ForwardRefExoticComponent<CopyButtonProps & React.RefAttributes<HTMLButtonElement>>;

type MeterState = 'optimum' | 'suboptimal' | 'poor' | 'none';
interface MeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The measured value, between min and max. */
    value: number;
    /** The lowest possible value. Default: 0. */
    min?: number;
    /** The highest possible value. Default: 100. */
    max?: number;
    /** Values under this are low. With high, it sets the zones that color the bar. */
    low?: number;
    /** Values over this are high. */
    high?: number;
    /** The best value. Under low: low values are good (a fill rate). Over high: high values are good (a battery). In
        between, or left out: the middle zone is good and both ends are less good (a temperature). */
    optimum?: number;
    /** The bar's thickness: 'sm' 4px, 'md' 8px (default), 'lg' 12px. */
    size?: 'sm' | 'md' | 'lg';
    /** A visible name above the bar, which also names it. Without one, give it an aria-label. */
    label?: React.ReactNode;
    /** Shows the value at the end of the label row. Default: false. */
    showValue?: boolean;
    /** Turns the value into words, shown and read out: (value, min, max) => "7.2 of 10 GB". Default: the share as the
        locale writes a percentage ("72%"). Say what a colored zone means here too, such as "92%, almost full". */
    formatValue?: (value: number, min: number, max: number) => string;
}
/** Which zone value is in, as HTML's <meter> works it out: optimum (success), suboptimal (warning) or poor (danger);
    'none' when there's no low or high, so no zones. */
declare function meterState(value: number, min: number, max: number, low?: number, high?: number, optimum?: number): MeterState;
/** A measurement within a known range (storage used, strength, a level): a bar with role="meter", colored by the low, high and optimum zones. */
declare const Meter: React.ForwardRefExoticComponent<MeterProps & React.RefAttributes<HTMLDivElement>>;

type ProgressTone = 'primary' | 'success' | 'warning' | 'danger';
interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** How far along, from 0 to max. Leave it out (or null) when you can't tell: the bar then shows an animated segment. */
    value?: number | null;
    /** The value that means done. Default: 100. */
    max?: number;
    /** 'bar' (default): a horizontal bar, full width. 'circle': a ring. */
    variant?: 'bar' | 'circle';
    /** The bar's thickness: 'sm' 4px, 'md' 8px (default), 'lg' 12px. The ring: 24, 40 or 64px. */
    size?: 'sm' | 'md' | 'lg';
    /** The fill color: 'primary' (default), 'success', 'warning' or 'danger'. */
    tone?: ProgressTone;
    /** A visible name above the bar (bar only), which also names it. Without one, give it an aria-label. */
    label?: React.ReactNode;
    /** Shows the value: at the end of the label row, or inside the ring (md and lg). Default: false. */
    showValue?: boolean;
    /** Turns the value into words, shown and read out. Default: the percentage as the locale writes it: "45%", "%45" in
        Turkish, "45 %" in French, "٤٥٪" in Egyptian Arabic. */
    formatValue?: (value: number, max: number) => string;
}
/** How far along a task is: a bar or a ring with role="progressbar"; leave value out when you can't tell. */
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

interface RelativeTimeProps extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, 'children' | 'dateTime'> {
    /** The moment: a Date, a timestamp in ms, or a string Date can read ("2026-10-24T09:30:00Z"). */
    date: Date | number | string;
    /** 'long' ("3 minutes ago", default), 'short' ("3 min. ago") or 'narrow' ("3m ago"), as Intl.RelativeTimeFormat writes them. */
    format?: 'long' | 'short' | 'narrow';
    /** 'auto' (default): "yesterday", "now", "next week" where the language has a word. 'always': "1 day ago". */
    numeric?: 'auto' | 'always';
    /** How the exact date in the tooltip (title) is written. Default: { dateStyle: "long", timeStyle: "short" }. false: no tooltip. */
    titleFormat?: Intl.DateTimeFormatOptions | false;
    /** A locale for this one; otherwise the SerupaProvider's, else the browser's. */
    locale?: string;
}
/** The words for a moment relative to now, as RelativeTime writes them: "3 minutes ago", "in 2 days", "now". */
declare function relativeTime(date: Date | number | string, now: number, locale?: string, options?: {
    format?: 'long' | 'short' | 'narrow';
    numeric?: 'auto' | 'always';
}): string;
/** How long ago a moment was, in words ("3 minutes ago"), kept up to date; the exact date in its tooltip. */
declare const RelativeTime: React.ForwardRefExoticComponent<RelativeTimeProps & React.RefAttributes<HTMLTimeElement>>;

/** V is the radios' value type: string (or number) as you use them, inferred from value or onChange. */
interface RadioGroupProps<V extends string | number = string | number> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** The radios' name; a generated one by default. */
    name?: string;
    /** The picked value (controlled); null or undefined for none. Use with onChange. */
    value?: V | null;
    /** The value picked at first (uncontrolled). */
    defaultValue?: V;
    /** Called with the picked radio's value and the change event. */
    onChange?: (value: V, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** 'vertical' (stacked, default) or 'horizontal' (a wrapping row). */
    orientation?: 'vertical' | 'horizontal';
    /** The radios' size, unless a Radio sets its own. */
    size?: 'sm' | 'md' | 'lg';
    /** A danger border on every unchecked radio, and aria-invalid on the group. Field sets it from its error. */
    invalid?: boolean;
    /** Disables every radio. */
    disabled?: boolean;
    /** Marks the choice required (aria-required, and required on the radios). */
    required?: boolean;
    /** The Radio elements, at any depth. */
    children?: React.ReactNode;
}
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /** 'sm' (14px circle, text-xs), 'md' (16px, text-sm, default) or 'lg' (20px, text-base). In a RadioGroup, the group's size by default. */
    size?: 'sm' | 'md' | 'lg';
    /** The label, next to the circle; a click on it picks the radio. Without one, give the radio an aria-label. */
    children?: React.ReactNode;
    /** A second, muted line under the label, linked to the radio with aria-describedby. */
    description?: React.ReactNode;
    /** A danger border (while unchecked) and focus ring, and aria-invalid. In a group, set invalid on the RadioGroup. */
    invalid?: boolean;
}
/** One choice from a set of Radios: a <div role="radiogroup"> that names them, holds the value and passes size, invalid, disabled and required down. Label it with Field group, aria-label or aria-labelledby. */
declare const RadioGroup: (<V extends string | number = string | number>(props: RadioGroupProps<V> & React.RefAttributes<HTMLDivElement>) => React.ReactElement | null) & {
    displayName?: string;
};
/** A native radio with its label (ref, value and every input attribute go to the <input>); className and style go to the <label> around it. In a RadioGroup, the group sets name and checked. */
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;

interface SearchInputProps extends Omit<InputProps, "type" | "leftIcon" | "rightIcon"> {
    /** Called with the text when Enter is pressed. */
    onSearch?: (value: string) => void;
    /** Called after the field is cleared, by the × or Escape. The field's onChange also gets an empty value. */
    onClear?: () => void;
    /** The clear button's name. Default: "Clear search". */
    clearLabel?: string;
    /** Shows a small loader in place of the search icon while results load. Default: false. */
    loading?: boolean;
    /** The loader's name, announced when it appears. Default: "Searching". */
    loadingLabel?: string;
}
/** A search field: a search icon, a clear button once something is typed, Escape to clear and Enter to search. */
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;

interface SegmentedControlOption {
    value: string;
    /** The segment's text. With only an icon, pass aria-label instead. */
    label?: React.ReactNode;
    /** An icon name or element before the label. */
    icon?: IconSource;
    /** The segment's name when it shows only an icon. */
    "aria-label"?: string;
    disabled?: boolean;
}
interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** The segments, in order: 2 to about 5. */
    options: SegmentedControlOption[];
    /** The selected value (controlled). Use with onValueChange. */
    value?: string;
    /** The value selected at first (uncontrolled). Default: the first segment that isn't disabled. */
    defaultValue?: string;
    /** Called with the new value when a segment is chosen. */
    onValueChange?: (value: string) => void;
    /** 'sm' (24px) or 'md' (32px, default): the control heights. */
    size?: 'sm' | 'md';
    /** Stretches to its container, with equal segments. Default: false. */
    fullWidth?: boolean;
    disabled?: boolean;
    /** Submits the value with a form, in a hidden input. */
    name?: string;
    /** A danger outline, and aria-invalid on the group. Say what's wrong in text next to it (Field's error does). */
    invalid?: boolean;
    /** Sets aria-required on the group. */
    required?: boolean;
    /** Focusable and read out, and arrows move focus, but nothing changes the selection; the value is still submitted. */
    readOnly?: boolean;
}
/** Picks one of a few options shown side by side: a radio group drawn as segments. */
declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;

type SelectOption = string | number | {
    value: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
};
interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
    disabled?: boolean;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
    /** 'sm' (24px, text-xs), 'md' (32px, text-sm, default) or 'lg' (44px, text-base): the control heights, like Input. */
    size?: 'sm' | 'md' | 'lg';
    /** A danger border and focus ring, and aria-invalid. */
    invalid?: boolean;
    /** A decorative icon before the text: an icon name or an element. */
    leftIcon?: IconSource;
    /** A first, empty option shown in the placeholder color until something is picked (it can't be picked back). An uncontrolled Select starts on it. */
    placeholder?: string;
    /** The options: strings, { value, label, disabled }, or groups { label, options }. Or pass <option> and <optgroup> children (after these). */
    options?: Array<SelectOption | SelectOptionGroup>;
}
/** A native <select> styled like Input (ref, value, onChange and every select attribute go to it), with a chevron; className and style go to the box. Label it with <label htmlFor>, aria-label or Field. multiple isn't supported. */
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    /** SidebarSections, or SidebarItems directly. */
    children?: React.ReactNode;
    /** Above the items: a logo, a workspace switcher. */
    header?: React.ReactNode;
    /** Pinned to the bottom: settings, the signed-in user. */
    footer?: React.ReactNode;
    /** Narrows it to icons only (64px). Labels show as tooltips, and groups open their items in a menu. Default: false. */
    collapsed?: boolean;
    /** The nav's accessible name. Default: "Main". */
    "aria-label"?: string;
}
interface SidebarSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** A small heading over the section's items. Hidden when the sidebar is collapsed. */
    title?: React.ReactNode;
    /** SidebarItems. */
    children?: React.ReactNode;
}
interface SidebarItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
    /** The item's text. */
    label: React.ReactNode;
    /** An icon before the label: a Material Symbols or custom name, or an element. Top-level items need one to show when collapsed. */
    icon?: IconSource;
    /** The current page: shaded, with aria-current="page". Default: false. */
    active?: boolean;
    /** Something at the end, such as a count Badge. Hidden when collapsed. */
    badge?: React.ReactNode;
    /** Nested SidebarItems: the item becomes a button that shows and hides them. */
    children?: React.ReactNode;
    /** With children: open at first. Default: open when one of them is active. */
    defaultOpen?: boolean;
    /** What renders the link: 'a' (default), or your router's link component. */
    as?: React.ElementType;
}
/** A vertical nav for an app's pages: sections of items with icons, badges and nested groups; collapses to an icon rail. */
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
/** A group of items in a Sidebar, with an optional small heading. */
declare const SidebarSection: React.ForwardRefExoticComponent<SidebarSectionProps & React.RefAttributes<HTMLDivElement>>;
/** An item in a Sidebar: a link, or a group of nested items. */
declare const SidebarItem: React.ForwardRefExoticComponent<SidebarItemProps & React.RefAttributes<HTMLAnchorElement>>;

type SliderValue = number | [number, number];
/** V is a number for one thumb or [low, high] for a range, inferred from value, defaultValue or the callbacks. */
interface SliderProps<V extends SliderValue = SliderValue> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** The value (controlled): a number, or [low, high] for a range with two thumbs. Use with onValueChange. */
    value?: V;
    /** The value at first (uncontrolled). Default: min. */
    defaultValue?: V;
    /** Called with the new value as it moves (dragging, keys). */
    onValueChange?: (value: V) => void;
    /** Called once when a drag or key press ends: for saving or fetching. */
    onValueCommit?: (value: V) => void;
    /** Default: 0. */
    min?: number;
    /** Default: 100. */
    max?: number;
    /** The smallest change. Default: 1. */
    step?: number;
    /** How many steps PageUp, PageDown and Shift with an arrow move. Default: 10. */
    largeStep?: number;
    /** 'sm' (4px track, 16px thumb) or 'md' (6px, 20px, default). */
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** Turns a value into the words read out (aria-valuetext), such as "$40". Default: the number. */
    formatValue?: (value: number) => string;
    /** A range's thumb names. Default: ["Minimum", "Maximum"]. A single thumb is named by aria-label or aria-labelledby. */
    thumbLabels?: [string, string];
    /** Submits the value with a form: one hidden input, or two with the same name for a range. */
    name?: string;
    /** A danger fill and thumb ring, and aria-invalid on the thumbs. Say what's wrong in text next to it (Field's error does). */
    invalid?: boolean;
    /** Focusable and read out, but keys and presses don't change it; the value is still submitted. */
    readOnly?: boolean;
    /** Accepted so Field's required doesn't reach the DOM. A slider always has a value, so it has no effect. */
    required?: boolean;
}
/** Picks a number, or a range with two thumbs, on a track. */
declare const Slider: (<V extends SliderValue = SliderValue>(props: SliderProps<V> & React.RefAttributes<HTMLDivElement>) => React.ReactElement | null) & {
    displayName?: string;
};

interface SortableListProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children' | 'onChange'> {
    /** The items, in order. Controlled: pass the new order back from onReorder. */
    items: readonly T[];
    /** A stable key for each item (its id), so focus and React state follow it as it moves. */
    getKey: (item: T) => string | number;
    /** The item's name in words ("Apollo"): on its handle ("Reorder Apollo") and in what's announced as it moves. */
    getLabel: (item: T) => string;
    /** What each row shows, after its handle. dragging is true for the item being moved. */
    renderItem: (item: T, state: {
        index: number;
        dragging: boolean;
    }) => React.ReactNode;
    /** Called with the new order when an item is dropped somewhere new, and which positions it moved between (from 0). */
    onReorder: (items: T[], move: {
        from: number;
        to: number;
    }) => void;
    /** Shows the items without handles. */
    disabled?: boolean;
    /** The word before an item's name on its handle. Default: "Reorder" (from SerupaProvider labels). */
    reorderLabel?: string;
}
/** A list people reorder by dragging a handle or with the keyboard, with every move announced. */
declare const SortableList: <T>(props: SortableListProps<T> & {
    ref?: React.Ref<HTMLUListElement>;
}) => React.ReactElement;

interface StackProps extends React.HTMLAttributes<HTMLElement> {
    /** 'column' (default): items one under another. 'row': side by side. */
    direction?: 'column' | 'row';
    /** The space between items, a step of the spacing scale (4 → 16px). Default: 4. */
    gap?: Space;
    /** Cross-axis alignment: 'stretch' (default for columns), 'start', 'center' (default for rows), 'end' or 'baseline'. */
    align?: 'stretch' | 'start' | 'center' | 'end' | 'baseline';
    /** Main-axis distribution: 'start' (default), 'center', 'end' or 'between'. */
    justify?: 'start' | 'center' | 'end' | 'between';
    /** Lets a row wrap onto more lines. Default: false. */
    wrap?: boolean;
    /** The element. Default: 'div'. */
    as?: 'div' | 'section' | 'ul' | 'ol' | 'nav' | 'header' | 'footer' | 'form' | 'fieldset' | 'span';
}
/** Lays children out in a column or a row, with even space from the spacing scale between them. */
declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLElement>>;

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
    /** Shows it while it (or something in it) has keyboard focus: for a "Skip to content" link. Default: false. */
    focusable?: boolean;
    /** The element. Default: 'span'. */
    as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'legend';
}
/** Content for screen readers only: hidden on screen, still announced. focusable shows it on keyboard focus. */
declare const VisuallyHidden: React.ForwardRefExoticComponent<VisuallyHiddenProps & React.RefAttributes<HTMLElement>>;

interface StepperStep {
    title: React.ReactNode;
    /** A muted line under the title. */
    description?: React.ReactNode;
    /** Shows "Optional" under the title. */
    optional?: boolean;
    /** 'error': marks the step in danger, such as a step with a problem to fix. */
    status?: 'error';
}
interface StepperProps extends React.HTMLAttributes<HTMLElement> {
    /** The steps, in order. */
    steps: StepperStep[];
    /** The current step's index, from 0. Steps before it are complete; steps.length marks them all complete. */
    current: number;
    /** 'horizontal' (default): side by side, joined by lines. 'vertical': stacked, for narrow spaces or long descriptions. */
    orientation?: 'horizontal' | 'vertical';
    /** 'sm' (24px circles, text-xs) or 'md' (32px, text-sm, default). */
    size?: 'sm' | 'md';
    /** Makes completed steps buttons that go back to them. */
    onStepClick?: (index: number) => void;
    /** Words read out or shown: { completed: 'completed', error: 'has an error', optional: 'Optional', stepOf: (step, total) => `Step ${step} of ${total}` }. */
    labels?: {
        completed?: string;
        error?: string;
        optional?: string;
        stepOf?: (step: number, total: number) => string;
    };
}
/** Where people are in a task split into steps: numbered circles joined by lines. */
declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLElement>>;

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'role'> {
    /** 'sm' (28 by 16px track, text-xs), 'md' (36 by 20px, text-sm, default) or 'lg' (44 by 24px, text-base). */
    size?: 'sm' | 'md' | 'lg';
    /** The label; a click on it flips the switch. Without one, give the switch an aria-label. */
    children?: React.ReactNode;
    /** A second, muted line under the label, linked to the switch with aria-describedby. */
    description?: React.ReactNode;
    /** 'end' (the label after the track, default) or 'start' (the label first, as in a settings list). */
    labelPosition?: 'start' | 'end';
    /** A danger track (while off) and focus ring, and aria-invalid. */
    invalid?: boolean;
    /** Focusable and read out (aria-readonly), but a click or Space doesn't flip it; an on switch is still submitted. */
    readOnly?: boolean;
}
/** An on/off setting that applies at once: a native checkbox with role="switch" (ref, checked, onChange and every input attribute go to it), drawn as a track and thumb; className and style go to the <label> around it. */
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    /** 'md' (default): 12px cell padding. 'sm': 8px top and bottom, for dense data. */
    size?: 'sm' | 'md';
    /** Shades every other body row. Rows then don't change on hover. Default: false. */
    striped?: boolean;
    /** Keeps the header row in view while the table scrolls inside a container with a height. Default: false. */
    stickyHeader?: boolean;
    /** A title for the table, rendered as its <caption> (announced with it, and names the scroll area). */
    caption?: React.ReactNode;
    /** Hides the caption on screen; screen readers still announce it. Default: false. */
    captionHidden?: boolean;
    /** Props for the scrolling frame around the table (style with a maxHeight for stickyHeader). */
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /** Marks a row as selected: a shaded background and a primary bar at its start. Screen readers can't tell from
        the shading (and ignore aria-selected in a table), so give the row a TableSelectCell, whose checkbox says it. */
    selected?: boolean;
}
interface TableSelectCellProps extends Omit<CheckboxProps, 'children' | 'description' | 'size'> {
    /** The checkbox's name for screen readers, such as "Select Alpha", or "Select all rows" in the header. */
    label: string;
    /** In the header row: renders a <th>, for a select-all checkbox (with indeterminate while some rows are). Default: false. */
    header?: boolean;
    /** Props for the cell around the checkbox. */
    cellProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
}
type SortDirection = 'ascending' | 'descending' | 'none';
interface TableHeaderCellProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** Lines the text up: 'start' (default), 'center' or 'end' (numbers). */
    align?: 'start' | 'center' | 'end';
    /** Makes the column sortable: the header becomes a button, and this is the current order. */
    sort?: SortDirection;
    /** Called when the sort button is pressed (decide the next order yourself). */
    onSort?: () => void;
}
interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** Lines the text up: 'start' (default), 'center' or 'end' (numbers, which also get tabular digits). */
    align?: 'start' | 'center' | 'end';
}
/** A data table: native table markup in a scrolling frame, with sizes, stripes, a sticky header and sortable columns. */
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
/** The header rows (<thead>). */
declare const TableHead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** The body rows (<tbody>). */
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** Footer rows such as totals (<tfoot>). */
declare const TableFoot: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/** A row (<tr>). selected shades it, with a bar at its start; a TableSelectCell in it says so to screen readers. */
declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
/** A cell with a checkbox for selecting its row (or, with header, every row); the checkbox carries the selected state for screen readers. */
declare const TableSelectCell: React.ForwardRefExoticComponent<TableSelectCellProps & React.RefAttributes<HTMLInputElement>>;
/** A header cell (<th>, scope="col" unless you say otherwise). With sort, its text is a button and aria-sort says the order. */
declare const TableHeaderCell: React.ForwardRefExoticComponent<TableHeaderCellProps & React.RefAttributes<HTMLTableCellElement>>;
/** A data cell (<td>). align="end" for numbers. */
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;

type TabsVariant = 'line' | 'pill';
interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    /** The selected tab's value (controlled). Use with onValueChange. */
    value?: string;
    /** The tab selected at first (uncontrolled). Default: the first tab that isn't disabled. */
    defaultValue?: string;
    /** Called with the new value when a tab is chosen. */
    onValueChange?: (value: string) => void;
    /** 'line' (default): a line under the selected tab. 'pill': the selected tab filled in primary. */
    variant?: TabsVariant;
    /** 'sm' (32px tabs) or 'md' (36px, default). */
    size?: 'sm' | 'md';
    /** 'auto' (default): arrow keys move and select at once. 'manual': arrow keys move, Enter or Space selects (for panels that are slow to show). */
    activation?: 'auto' | 'manual';
}
/** Switches between panels in one place: Tabs > TabList > Tab, and a TabPanel for each tab. */
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
/** The row of tabs. Give it an aria-label when the page doesn't already say what the tabs are for. */
declare const TabList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    /** Ties the tab to the TabPanel with the same value. */
    value: string;
    /** An icon before the label: an icon name or any element. */
    icon?: IconSource;
}
/** One tab: a button that selects its panel. */
declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The value of the Tab that shows this panel. */
    value: string;
    /** Keeps the panel in the page while hidden (the default: hidden panels keep their state). false renders it only while selected. */
    keepMounted?: boolean;
}
/** The content for one tab, shown while its tab is selected. */
declare const TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type TextTone = 'default' | 'muted' | 'primary' | 'danger';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
interface TextProps extends React.HTMLAttributes<HTMLElement> {
    /** The element: 'p' (default), 'span', 'div', 'label', 'strong', 'em', 'small', 'li' or 'figcaption'. */
    as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'small' | 'li' | 'figcaption';
    /** From the type scale, with its line height. Default: inherited from the parent. */
    size?: TextSize;
    /** 'default' (text), 'muted' (secondary), 'primary' or 'danger'. Each keeps 4.5:1 on surface. Default: inherited. */
    tone?: TextTone;
    /** Default: inherited. */
    weight?: TextWeight;
    /** Keeps it on one line, cut with an ellipsis. Give it a width (it's a block). */
    truncate?: boolean;
    /** For a label: the id of the control it names. */
    htmlFor?: string;
}
/** Body text in the system's type: size, tone and weight, each inherited when unset. */
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
    /** 'sm' (text-xs), 'md' (text-sm, default) or 'lg' (text-base): Input's text sizes and side padding. */
    size?: 'sm' | 'md' | 'lg';
    /** Visible lines of text: the starting height, and the smallest one with autoResize. Default: 3. */
    rows?: number;
    /** Grows with the text, from rows up to maxRows, and scrolls past that. Turns off the resize handle. Default: false. */
    autoResize?: boolean;
    /** With autoResize: the most lines it grows to before it scrolls. Unset: no limit. */
    maxRows?: number;
    /** 'vertical' (default): a handle to drag the height. 'none': a fixed height. Read-only, disabled and autoResize textareas have none. */
    resize?: 'vertical' | 'none';
    /** A danger border and focus ring, and aria-invalid. Say what's wrong in text next to it, linked with aria-describedby. */
    invalid?: boolean;
    /** A character count under the text, "12 / 200" with maxLength (text-colored once it's reached). Linked to the field with aria-describedby. Default: false. */
    showCount?: boolean;
}
/** A multi-line text field: a native <textarea> (ref, value, onChange and every textarea attribute go to it) in a box that holds the count; className and style go to the box. Label it with <label htmlFor> or aria-label. */
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max' | 'step'> {
    /** The chosen time as "HH:mm" (24-hour, controlled), or null. Use with onValueChange. */
    value?: string | null;
    /** The chosen time at first (uncontrolled). */
    defaultValue?: string | null;
    /** Called with the new time as "HH:mm", or null when the field is cleared. */
    onValueChange?: (value: string | null) => void;
    /** The earliest and latest times, as "HH:mm". */
    min?: string;
    max?: string;
    /** Minutes between the times in the list. Default: 30. Typed times don't have to fall on a step. */
    step?: number;
    /** A BCP 47 locale for how times are written. Default: the nearest SerupaProvider's locale, else the browser's. */
    locale?: string;
    /** 12-hour (AM/PM) or 24-hour. Default: the locale's. */
    hour12?: boolean;
    /** 'sm', 'md' (default) or 'lg', like Input. */
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    /** The list's name, and the button's. Default: "Choose a time". */
    listLabel?: string;
}
/** A time field: type a time or pick one from a list. Values are "HH:mm". */
declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLInputElement>>;

type ToastTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
type ToasterPosition = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
interface ToastOptions {
    /** The main line. */
    title: React.ReactNode;
    /** A muted line under it. */
    description?: React.ReactNode;
    /** 'neutral' (default, no icon), 'info', 'success', 'warning' or 'danger': an icon in the tone's color. */
    tone?: ToastTone;
    /** One button in the toast, such as Undo. Choosing it also closes the toast. */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Milliseconds before it goes. Default: 5000, or 0 with an action, so there's time to reach it; 0 keeps it until it's closed. The time stops while it's hovered or focused, or the window is in the background. */
    duration?: number;
    /** What screen readers announce. Default: the title and description, when they're text. */
    announcement?: string;
    /** Reuse an id to replace a toast that's showing (say, "Saving…" → "Saved"). */
    id?: string;
}
/** Shows a toast in the page's <Toaster> and returns its id. */
declare function show(options: ToastOptions | string): string;
/** Closes one toast, or every toast with no id. */
declare function dismiss(id?: string): void;
/** Shows a toast in the page's <Toaster> and returns its id; toast.dismiss(id) closes it. */
declare const toast: typeof show & {
    dismiss: typeof dismiss;
};
interface ToasterProps extends React.HTMLAttributes<HTMLElement> {
    /** Where toasts appear: 'bottom-end' (default), 'bottom-start', 'bottom-center', 'top-start', 'top-center' or 'top-end'. Start and end follow the text direction. */
    position?: ToasterPosition;
    /** The region's name for screen readers. Default: 'Notifications'. */
    label?: string;
    /** The close button's name. Default: 'Dismiss'. */
    dismissLabel?: string;
    /** The most toasts shown at once; the newest show, and older ones wait under a "+2 more" line until there's room. Default: 3. */
    limit?: number;
}
/** The place toast() messages appear: render one, once, near the root of the app. */
declare const Toaster: ((props: ToasterProps) => React.ReactElement) & {
    displayName: string;
};

interface ToggleButtonProps extends Omit<ButtonAsButtonProps, "variant" | "destructive" | "loading" | "loadingText"> {
    /** Whether it's on (controlled). Use with onPressedChange. */
    pressed?: boolean;
    /** Whether it starts on (uncontrolled). Default: false. */
    defaultPressed?: boolean;
    /** Called with the new state when it's pressed. */
    onPressedChange?: (pressed: boolean) => void;
    /** 'outline' (default) or 'ghost' (for toolbars). */
    variant?: 'outline' | 'ghost';
}
/** A Button that turns something on and off, with aria-pressed: bold, mute, show grid. */
declare const ToggleButton: React.ForwardRefExoticComponent<ToggleButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface TooltipProps {
    /** What the tooltip says: a short line of text. Keep links and buttons out (people can't reach them). */
    content: React.ReactNode;
    /** One element that can take focus (a Button, a link, an IconButton). The tooltip describes it. */
    children: React.ReactElement;
    /** 'top' (default), 'bottom', 'left', 'right', or with '-start' / '-end' ('bottom-start'). It flips when there's no room. */
    placement?: Placement;
    /** Milliseconds the pointer rests before it shows. Default: 400. Keyboard focus shows it at once. */
    delay?: number;
    /** 'description' (default): adds to the element's name (aria-describedby). 'label': is its name (aria-labelledby), for an icon-only button with no other label. */
    role?: 'description' | 'label';
    /** Open it yourself (controlled); with onOpenChange. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Never shows it, for example while the element is disabled. */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/** A short hint about one element, shown on hover and keyboard focus. */
declare const Tooltip: ((props: TooltipProps) => React.ReactElement) & {
    displayName: string;
};

interface SerupaConfig {
    /** Renders a Button with href, such as a router's Link (Next.js: Link; React Router: a component that maps href to to). Receives href, className, ref, event handlers and children. Default: 'a'. */
    link?: React.ElementType;
}
/** Set once at startup; returns the current settings. */
declare function configure(opts?: SerupaConfig): Required<SerupaConfig>;

/** The words the components say or show on their own: button names, region names, empty and loading text.
    <SerupaProvider labels> changes them for a subtree; a component's own prop (closeLabel, dismissLabel, …)
    still wins for that one instance. */
interface SerupaLabels {
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
    /** CopyButton: its label, what it says once it has copied, and when copying fails. */
    copy: string;
    copied: string;
    copyFailed: string;
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
    /** Carousel: each slide's name, and its dot's ("2 of 5"). */
    slideOf: (slide: number, total: number) => string;
    /** NumberInput step buttons. */
    decrease: string;
    increase: string;
    /** InlineEdit: after the text in its button's name ("Project name: Apollo, Edit"). */
    edit: string;
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
    /** Stepper, when the steps don't fit side by side and it shows only the current step's title: "Step 2 of 4". */
    stepOf: (step: number, total: number) => string;
    /** Toaster region. */
    notifications: string;
    /** Toaster: said once, after the first toast with an action, so keyboard and screen reader users know how to reach it. */
    toastShortcut: (key: string) => string;
    /** Toaster: the line for toasts waiting past the limit. */
    moreToasts: (count: number) => string;
    /** Sidebar and Navbar nav, and the Navbar menu button. */
    mainNavigation: string;
    menu: string;
    /** SortableList: before an item's name on its handle ("Reorder Apollo"), the handle's instructions, and what it
        says as an item is picked up, moved, dropped or put back ("Apollo, position 2 of 5"). */
    reorder: string;
    reorderInstructions: string;
    reorderGrabbed: (item: string, position: number, total: number) => string;
    reorderMoved: (item: string, position: number, total: number) => string;
    reorderDropped: (item: string, position: number, total: number) => string;
    reorderCancelled: (item: string, position: number, total: number) => string;
    /** FileUpload. */
    dragFiles: string;
    dragFile: string;
    chooseFiles: string;
    chooseFile: string;
    chosenFiles: string;
    chosenFile: string;
    /** FileUpload: read out with the choose button when the upload is required (a button can't carry aria-required). */
    required: string;
    /** PhoneInput's country menu. */
    country: string;
    /** PasswordInput show/hide button. */
    showPassword: string;
    /** ColorPicker: the native picker's name, the hex field's name, and the contrast line under them. */
    customColor: string;
    hexCode: string;
    contrast: (ratio: string) => string;
    lowContrast: (minimum: string) => string;
    /** Table's scroll region when it has no caption. */
    table: string;
}
/** The English words (the default). */
declare const DEFAULT_LABELS: SerupaLabels;
/** The same words in Indonesian: `<SerupaProvider locale="id-ID" labels={idLabels}>`. */
declare const idLabels: SerupaLabels;

interface SerupaProviderProps {
    /** A BCP 47 locale (such as "id-ID") for Calendar, DatePicker, DateRangePicker, TimePicker and NumberInput: how dates, times and numbers
     *  are written and typed, month and weekday names, and the first day of the week. Default: the browser's. */
    locale?: string;
    /** Replaces some or all of the words the components say on their own, such as { close: "Tutup" }, or a whole
     *  set (idLabels). Keys left out keep the outer provider's words, else English. */
    labels?: Partial<SerupaLabels>;
    /** Icons that work by name inside this provider, in the shape registerIcons takes: one icon, or a module of them. */
    icons?: Array<IconData | Readonly<Record<string, IconData>>> | IconData | Readonly<Record<string, IconData>>;
    children?: React.ReactNode;
}
/** What the components read: the nearest provider's settings, merged with the outer ones. */
interface SerupaSettings {
    locale: string | undefined;
    labels: SerupaLabels;
    icons: ReadonlyMap<string, IconData>;
}
/** Locale, built-in words and extra icons for every component inside it. A component's own prop still wins. */
declare function SerupaProvider(props: SerupaProviderProps): React.ReactElement;
declare namespace SerupaProvider {
    var displayName: string;
}
/** The nearest SerupaProvider's settings, or the defaults (browser locale, English words) without one. */
declare function useSerupa(): SerupaSettings;

/** The system's version, e.g. "4.8.0" (semver). */
declare const version: string;
type ThemeApi = SerupaTheme;
declare global {
    interface Window {
        /** The components on plain pages (serupa.iife.js). */
        Serupa: {
            /** The system's version, e.g. "4.8.0" (semver). */ version: string;
            Accordion: typeof Accordion;
            AccordionItem: typeof AccordionItem;
            Alert: typeof Alert;
            Avatar: typeof Avatar;
            AvatarGroup: typeof AvatarGroup;
            Badge: typeof Badge;
            Breadcrumb: typeof Breadcrumb;
            BreadcrumbItem: typeof BreadcrumbItem;
            Button: typeof Button;
            buttonClass: typeof buttonClass;
            ButtonGroup: typeof ButtonGroup;
            Card: typeof Card;
            CardBody: typeof CardBody;
            CardFooter: typeof CardFooter;
            CardHeader: typeof CardHeader;
            Calendar: typeof Calendar;
            Carousel: typeof Carousel;
            Checkbox: typeof Checkbox;
            ColorPicker: typeof ColorPicker;
            Combobox: typeof Combobox;
            configure: typeof configure;
            Container: typeof Container;
            CopyButton: typeof CopyButton;
            customIcons: typeof customIcons;
            registerIcons: typeof registerIcons;
            getIcon: typeof getIcon;
            DatePicker: typeof DatePicker;
            DateRangePicker: typeof DateRangePicker;
            Dialog: typeof Dialog;
            Divider: typeof Divider;
            Drawer: typeof Drawer;
            EmptyState: typeof EmptyState;
            enLabels: typeof DEFAULT_LABELS;
            idLabels: typeof idLabels;
            Fab: typeof Fab;
            Field: typeof Field;
            FileUpload: typeof FileUpload;
            formatFileSize: typeof formatFileSize;
            FormattedNumber: typeof FormattedNumber;
            formatNumber: typeof formatNumber;
            Grid: typeof Grid;
            Heading: typeof Heading;
            Icon: typeof Icon;
            IconButton: typeof IconButton;
            Image: typeof Image;
            initials: typeof initials;
            InlineEdit: typeof InlineEdit;
            Input: typeof Input;
            Kbd: typeof Kbd;
            Link: typeof Link;
            List: typeof List;
            ListItem: typeof ListItem;
            Loader: typeof Loader;
            Menu: typeof Menu;
            MenuGroup: typeof MenuGroup;
            MenuItem: typeof MenuItem;
            MenuSeparator: typeof MenuSeparator;
            Meter: typeof Meter;
            meterState: typeof meterState;
            Navbar: typeof Navbar;
            NavbarLink: typeof NavbarLink;
            NumberInput: typeof NumberInput;
            Pagination: typeof Pagination;
            paginationRange: typeof paginationRange;
            PasswordInput: typeof PasswordInput;
            PhoneInput: typeof PhoneInput;
            formatPhone: typeof formatPhone;
            parsePhone: typeof parsePhone;
            Popover: typeof Popover;
            Progress: typeof Progress;
            Radio: typeof Radio;
            RadioGroup: typeof RadioGroup;
            RelativeTime: typeof RelativeTime;
            relativeTime: typeof relativeTime;
            SearchInput: typeof SearchInput;
            SegmentedControl: typeof SegmentedControl;
            Select: typeof Select;
            SerupaProvider: typeof SerupaProvider;
            useSerupa: typeof useSerupa;
            Sidebar: typeof Sidebar;
            SidebarItem: typeof SidebarItem;
            SidebarSection: typeof SidebarSection;
            Slider: typeof Slider;
            SortableList: typeof SortableList;
            Stack: typeof Stack;
            Stepper: typeof Stepper;
            Switch: typeof Switch;
            Tab: typeof Tab;
            Table: typeof Table;
            TableBody: typeof TableBody;
            TableCell: typeof TableCell;
            TableFoot: typeof TableFoot;
            TableHead: typeof TableHead;
            TableHeaderCell: typeof TableHeaderCell;
            TableRow: typeof TableRow;
            TableSelectCell: typeof TableSelectCell;
            TabList: typeof TabList;
            TabPanel: typeof TabPanel;
            Tabs: typeof Tabs;
            Text: typeof Text;
            Textarea: typeof Textarea;
            TimePicker: typeof TimePicker;
            toast: typeof toast;
            Toaster: typeof Toaster;
            ToggleButton: typeof ToggleButton;
            Tooltip: typeof Tooltip;
            VisuallyHidden: typeof VisuallyHidden;
            /** Present when theme.js is loaded. */ theme?: ThemeApi;
        };
    }
}

export { Accordion, AccordionItem, Alert, Avatar, AvatarGroup, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Calendar, Card, CardBody, CardFooter, CardHeader, Carousel, Checkbox, ColorPicker, Combobox, Container, CopyButton, DatePicker, DateRangePicker, Dialog, Divider, Drawer, EmptyState, Fab, Field, FileUpload, FormattedNumber, Grid, Heading, Icon, IconButton, IconData, Image, InlineEdit, Input, Kbd, Link, List, ListItem, Loader, MaterialIconName, Menu, MenuGroup, MenuItem, MenuSeparator, Meter, Navbar, NavbarLink, NumberInput, Pagination, PasswordInput, PhoneInput, Popover, Progress, Radio, RadioGroup, RelativeTime, SearchInput, SegmentedControl, Select, SerupaProvider, Sidebar, SidebarItem, SidebarSection, Slider, SortableList, Stack, Stepper, Switch, Tab, TabList, TabPanel, Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow, TableSelectCell, Tabs, Text, Textarea, TimePicker, Toaster, ToggleButton, Tooltip, VisuallyHidden, buttonClass, configure, customIcons, DEFAULT_LABELS as enLabels, formatFileSize, formatNumber, formatPhone, getIcon, idLabels, initials, meterState, paginationRange, parsePhone, registerIcons, relativeTime, toast, useSerupa, version };
export type { AccordionItemProps, AccordionProps, AlertProps, AlertTone, AvatarGroupProps, AvatarProps, AvatarSize, AvatarStatus, BadgeProps, BadgeTone, BadgeVariant, BreadcrumbItemProps, BreadcrumbProps, ButtonAsButtonProps, ButtonAsLinkProps, ButtonGroupProps, ButtonProps, ButtonSize, ButtonVariant, CalendarProps, CardBodyProps, CardFooterProps, CardHeaderProps, CardPadding, CardProps, CardVariant, CarouselProps, CheckboxProps, ColorPickerProps, ColorSwatch, ComboboxOption, ComboboxProps, ContainerProps, ContainerSize, CopyButtonProps, CustomIconName, DatePickerProps, DateRange, DateRangePickerProps, DialogProps, DividerProps, DrawerProps, EmptyStateProps, FabPosition, FabProps, FieldProps, FileRejection, FileUploadProps, FormatNumberOptions, FormattedNumberProps, GridProps, HeadingLevel, HeadingProps, HeadingSize, IconButtonProps, IconName, IconProps, IconSource, ImageProps, ImageRatio, InlineEditProps, InputProps, KbdProps, LinkProps, ListItemProps, ListProps, LoaderPattern, LoaderProps, LoaderShape, LoaderTone, LoaderVariant, MenuGroupProps, MenuItemProps, MenuProps, MeterProps, MeterState, NavbarLinkProps, NavbarProps, NumberFormat, NumberInputProps, PaginationProps, ParsedPhone, PasswordInputProps, PhoneCountry, PhoneInputProps, PhoneValueDetails, Placement, PopoverProps, ProgressProps, ProgressTone, RadioGroupProps, RadioProps, RelativeTimeProps, SearchInputProps, SegmentedControlOption, SegmentedControlProps, SelectOption, SelectOptionGroup, SelectProps, SerupaConfig, SerupaLabels, SerupaProviderProps, SerupaSettings, SerupaTheme, SidebarItemProps, SidebarProps, SidebarSectionProps, SliderProps, SliderValue, SortDirection, SortableListProps, Space, StackProps, StepperProps, StepperStep, SwitchProps, TabPanelProps, TabProps, TableCellProps, TableHeaderCellProps, TableProps, TableRowProps, TableSelectCellProps, TabsProps, TabsVariant, TextProps, TextSize, TextTone, TextWeight, TextareaProps, ThemeBrand, ThemeInfo, ThemeMode, TimePickerProps, ToastOptions, ToastTone, ToasterPosition, ToasterProps, ToggleButtonProps, TooltipProps, VisuallyHiddenProps };
