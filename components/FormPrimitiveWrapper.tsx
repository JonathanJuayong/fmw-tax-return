import {HTMLAttributes, ReactNode} from "react";
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/Form";
import Inline from "@/components/layout/Inline";
import {HelpCircle} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface FormPrimitiveWrapperProps extends HTMLAttributes<HTMLDivElement>{
  children: ReactNode
  label: string
  description: string
}

export default function FormPrimitiveWrapper(
  {
    children,
    label,
    description,
    ...props
  }: FormPrimitiveWrapperProps
) {
  return (
    <FormItem {...props}>
      <Inline justifyContent="start" gap="xxs" className="mb-2">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger><HelpCircle className="h-4 w-4"/></PopoverTrigger>
          <PopoverContent>
            <p>{description}</p>
          </PopoverContent>
        </Popover>
      </Inline>
      <FormControl>
        {children}
      </FormControl>
      <FormMessage/>
    </FormItem>
  )
}
