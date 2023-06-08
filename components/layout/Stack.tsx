import React, {HTMLAttributes} from "react";
import {Slot} from "@radix-ui/react-slot";
import {AlignOptions, SpacingOptions} from "@/utils/types";
import {cn} from "@/lib/utils";

interface StackProps<T extends HTMLDivElement> extends HTMLAttributes<T> {
  alignItems?: AlignOptions
  gap?: SpacingOptions
  asChild?: boolean
}

export const alignMap: { [key in AlignOptions]: string } = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch"
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

export default function Stack<T extends HTMLDivElement>(
  {
    asChild = false,
    alignItems = "stretch",
    gap = "sm",
    children,
    ...props
  }: StackProps<T>
) {
  const Component = asChild ? Slot : "div"
  const align = alignMap[alignItems]
  const gapSize = gapMap[gap]

  return (
    <Component
      {...props}
      className={cn(
        props.className,
        "flex flex-col",
        align,
        gapSize
      )}
    >
      {children}
    </Component>
  )
}
