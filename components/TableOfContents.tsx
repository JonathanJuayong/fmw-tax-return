"use client"

import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Checkbox} from "@/components/ui/checkbox";
import Inline from "@/components/layout/Inline";
import {Button} from "@/components/ui/button";
import {ErrorMessage} from "@hookform/error-message";

const incomeForms = [
  {
    value: "salaryWages",
    label: "Salary and Wages"
  },
  {
    value: "allowance",
    label: "Allowance"
  },
  {
    value: "trustDistribution",
    label: "Trust Distribution"
  },
  {
    value: "capitalGain",
    label: "Capital Gain"
  },
  {
    value: "bankInterest",
    label: "Bank Interest"
  },
  {
    value: "dividends",
    label: "Dividends"
  },
  {
    value: "rentalProperty",
    label: "Rental Property"
  }
]

const deductionForms = [
  {
    value: "motorVehicle",
    label: "Motor Vehicle"
  },
  {
    value: "workRelatedTravel",
    label: "Work Related Travel"
  },
  {
    value: "interestDeduction",
    label: "Interest Deduction"
  },
  {
    value: "dividendDeduction",
    label: "Dividend Deduction"
  },
  {
    value: "otherDeductions",
    label: "Other Deductions"
  }
]

const tableOfContentsSchema = z.object({
  forms: z.array(z.string()).nonempty("Must tick at least one category.")
})

export default function TableOfContents() {
  const form = useForm<z.infer<typeof tableOfContentsSchema>>({
    resolver: zodResolver(tableOfContentsSchema),
    defaultValues: {
      forms: []
    }
  })

  return (
    <>
      <h1 className="mb-6">Table of Contents</h1>
      <Form {...form}>
        <Stack gap="md" asChild>
          <form>
            <Stack className="sm:flex-row sm:justify-around sm:gap-10">
              <Stack>
                <h2>Income:</h2>
                <FormField
                  control={form.control}
                  name="forms"
                  render={({field}) => (
                    <>{incomeForms.map((item) => (
                      <FormItem
                        key={item.value}
                      >
                        <Inline justifyContent="start">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(
                                    field.value?.filter(
                                      (v) => v !== item.value
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel>{item.label}</FormLabel>
                        </Inline>
                      </FormItem>
                    ))}</>
                  )}
                />
              </Stack>
              <Stack>
                <h2>Deductions:</h2>
                <FormField
                  control={form.control}
                  name="forms"
                  render={({field}) => (
                    <>{deductionForms.map((item) => (
                      <FormItem
                        key={item.value}
                      >
                        <Inline justifyContent="start">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(
                                    field.value?.filter(
                                      (v) => v !== item.value
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel>{item.label}</FormLabel>
                        </Inline>
                      </FormItem>
                    ))}</>
                  )}
                />
              </Stack>
            </Stack>
            <ErrorMessage
              name="forms"
              errors={form.formState.errors}
            />
            <Button type="button" onClick={form.handleSubmit(value => console.log(value))}>Submit</Button>
          </form>
        </Stack>
      </Form>
    </>
  )
}
