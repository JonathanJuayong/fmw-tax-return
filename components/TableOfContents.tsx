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
import {useMainFormContext} from "@/components/FormContextProvider";
import {useEffect} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {DeductionFormComponentsMap, IncomeFormComponentsMap} from "@/utils/types";

const incomeForms: Array<{value: keyof IncomeFormComponentsMap, label: string}> = [
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

const deductionForms: Array<{value: keyof DeductionFormComponentsMap, label: string}> = [
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
  forms: z.object({
    income: z.array(z.string()),
    deductions: z.array(z.string())
  })
})

export default function TableOfContents() {
  const {formStateSetter, formState} = useMainFormContext()
  const form = useForm<z.infer<typeof tableOfContentsSchema>>({
    resolver: zodResolver(tableOfContentsSchema),
    defaultValues: {
      forms: {
        income: [],
        deductions: []
      }
    }
  })

  useEffect(() => {
    form.reset(formState)
  }, [formState])

  useEffect(() => {
    const subscription = form.watch(({forms}) => {
      formStateSetter(prev => ({
        ...prev,
        forms:{
          income: forms?.income as unknown as (Array<keyof IncomeFormComponentsMap>) ?? [],
          deductions: forms?.deductions as unknown as (Array<keyof DeductionFormComponentsMap>) ?? []
        }
      }))
    })
    return () => {subscription.unsubscribe()}
  }, [formState, form.watch]);

  return (
    <>
      <h1 className="mb-6">Table of Contents</h1>
      <Form {...form}>
        <Stack gap="md" asChild>
          <form>
            <Card>
              <Stack asChild alignItems="center" gap="md" className="sm:flex-row sm:justify-evenly sm:items-start sm:gap-10 p-6">
                <CardContent>
                  <Stack>
                    <h2>Income:</h2>
                    <FormField
                      control={form.control}
                      name="forms.income"
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
                      name="forms.deductions"
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
                </CardContent>
              </Stack>
            </Card>
            <ErrorMessage
              name="forms"
              errors={form.formState.errors}
            />
            <Button type="button" onClick={onSubmitHandler}>Submit</Button>
          </form>
        </Stack>
      </Form>
    </>
  )
}
