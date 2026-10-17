import * as React from "react";
import { cn, oneOf, omit } from "../../internal/cn";
import type { AvatarSize } from "../Avatar/Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The avatars, as <Avatar> elements. */
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

/* AvatarGroup: avatars in a row that overlap, each in a surface ring, with a "+N" avatar for the ones that
   don't fit. size sets every avatar's size (it wins over each avatar's own). The group is role="group"; label
   names it. className and every other prop go to the outer <div>. */
const OWN = { children: 1, max: 1, total: 1, size: 1, moreLabel: 1, label: 1, className: 1 } as const;
const SIZES: readonly AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

/** Avatars in an overlapping row, with "+N" for the rest. */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(props, ref) {
  const rest = omit(props, OWN);
  const size = oneOf(SIZES, props.size, "md");
  const items = React.Children.toArray(props.children).filter(React.isValidElement) as React.ReactElement<{ size?: AvatarSize }>[];
  const max = props.max != null && props.max >= 0 ? Math.floor(props.max) : Infinity;
  const total = Math.max(items.length, props.total != null && props.total > 0 ? Math.floor(props.total) : 0);
  const shown = items.slice(0, max);
  const more = total - shown.length;
  if (props.label) rest["aria-label"] = props.label;
  return (
    <div {...rest} ref={ref} role="group" className={cn("dk-avatar-group", "dk-avatar-group--" + size, props.className)}
      data-component="avatar-group" data-size={size}>
      {shown.map((el) => React.cloneElement(el, { size }))}
      {more > 0 ? (
        <span className={"dk-avatar dk-avatar--" + size + " dk-avatar-group__more"} role="img"
          aria-label={props.moreLabel ? props.moreLabel(more) : more + " more"} data-size={size}>
          <span className="dk-avatar__frame"><span className="dk-avatar__initials" aria-hidden="true">+{more}</span></span>
        </span>
      ) : null}
    </div>
  );
});
AvatarGroup.displayName = "AvatarGroup";
