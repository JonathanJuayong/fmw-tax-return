import {HTMLAttributes, ReactNode} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cn} from "@/lib/utils";
import {SpacingOptions} from "@/utils/types";

const columns = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

export const gapMap: { [key in SpacingOptions]: string } = {
  xxs: "gap-3",
  xs: "gap-4",
  sm: "gap-5",
  md: "gap-10",
  lg: "gap-20",
  xl: "gap-40",
  xxl: "gap-60",
}

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  cols: keyof typeof columns
  gap?: SpacingOptions
  children: ReactNode
}

export default function Column(
  {
    asChild = false,
    children,
    cols,
    gap = "sm",
    ...props
  }: ColumnProps
) {
  const Component = asChild ? Slot : "div"
  const gridCols = columns[cols]
  const gutter = gapMap[gap]
  return (
    <Component
      {...props}
      className={cn(
        props.className,
        "grid",
        gutter,
        gridCols
      )}
    >
      {children}
    </Component>
  )
}

const colSpan = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
}

interface ColumnItemProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  children: ReactNode
  span?: keyof typeof colSpan
}

function ColumnItem(
  {
    asChild = false,
    children,
    span = 1,
    ...props
  }: ColumnItemProps
) {
  const Component = asChild ? Slot : "div"
  return (
    <Component
      {...props}
      className={cn(
        props.className,
        colSpan[span]
      )}
    >
      {children}
    </Component>
  )
}

Column.Item = ColumnItem
