import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {Check} from "lucide-react";
import Inline from "@/components/layout/Inline";
import {cn} from "@/lib/utils";

interface ComboboxProps {
  defaultTriggerLabel: string
  value: string | undefined
  placeholder: string
  options: {label: string, value: string}[]
  onValueChange: (value: string) => void
}

export default function Combobox(
  {
    defaultTriggerLabel,
    value,
    placeholder,
    options,
    onValueChange
  }: ComboboxProps
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onValueChange(searchValue.toLowerCase())
  }, [searchValue])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="w-full"
          variant="outline"
        >
          {value ?? defaultTriggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(search) => setSearchValue(search)}
            placeholder={placeholder}
          />
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={onValueChange}
              >
                <Inline>
                  <Check
                    className={cn(
                      "w-4 h-4",
                      option.value === value ? "opacity-1" : "opacity-0"
                    )}
                  />
                  {option.label}
                </Inline>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
