import {HTMLAttributes} from "react";
import {AlignOptions, JustifyOptions, SpacingOptions} from "@/utils/types";
import {Slot} from "@radix-ui/react-slot";
import {cn} from "@/lib/utils";

interface InlineProps<T extends HTMLDivElement> extends HTMLAttributes<T> {
  asChild?: boolean
  justifyContent?: JustifyOptions
  alignItems?: AlignOptions
  gap?: SpacingOptions
}

const justifyMap: { [key in JustifyOptions]: string } = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  evenly: "justify-evenly",
  stretch: "justify-stretch",
  around: "justify-around",
  normal: "justify-normal"
}

const alignMap: { [key in AlignOptions]: string } = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch"
}

const gapMap: { [key in SpacingOptions]: string } = {
  xxs: "gap-3",
  xs: "gap-4",
  sm: "gap-5",
  md: "gap-10",
  lg: "gap-20",
  xl: "gap-40",
  xxl: "gap-60",
}

export default function Inline<T extends HTMLDivElement>(
  {
    asChild = false,
    justifyContent = "between",
    alignItems = "center",
    gap = "sm",
    children,
    ...props
  }: InlineProps<T>
) {
  const Component = asChild ? Slot : "div"
  const justify = justifyMap[justifyContent]
  const align = alignMap[alignItems]
  const gutter = gapMap[gap]

  return (
    <Component
      {...props}
      className={cn(
        "flex",
        justify,
        align,
        gutter,
        props.className
      )}
    >
      {children}
    </Component>
  )
}
