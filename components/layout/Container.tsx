import {HTMLAttributes} from "react";
import {Slot} from "@radix-ui/react-slot";
import {cn} from "@/lib/utils";

type Breakpoints = "sm" | "md" | "lg" | "xl" | "xxl"

const maxWidths: { [key in Breakpoints]: string } = {
  sm: "md:max-w-2xl",
  md: "lg:max-w-3xl",
  lg: "lg:max-w-4xl",
  xl: "2xl:max-w-5xl",
  xxl: "2xl:max-w-6xl"
}

interface ContainerProps<T extends HTMLDivElement> extends HTMLAttributes<T> {
  asChild?: boolean
  clampWidth?: Breakpoints
}

export default function Container<T extends HTMLDivElement>(
  {
    asChild = false,
    clampWidth = "sm",
    children,
    ...props
  }: ContainerProps<T>
) {
  const Component = asChild ? Slot : "div"

  return (
    <Component
      {...props}
      className={cn(
        props.className,
        "max-w-[90%] mx-auto",
        maxWidths[clampWidth]
      )}
    >
      {children}
    </Component>
  )
}
