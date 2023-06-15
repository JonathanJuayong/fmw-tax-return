import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {workRelatedTravelSchema} from "@/utils/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Inline from "@/components/layout/Inline";
import {Button} from "@/components/ui/button";
import {PlusCircle, X} from "lucide-react";
import {useMainFormContext} from "@/components/FormContextProvider";
import {useEffect} from "react";
import FormNavigation from "@/components/FormNavigation";

const schema = z.object({
  workRelatedTravel: workRelatedTravelSchema
})

const defaultValues: z.infer<typeof schema> = {
  workRelatedTravel: {
    reasonForClaim: "",
    taxiExpense: 0,
    tollExpense: 0,
    parkingExpense: 0,
    otherExpenses: []
  }
}

export default function WorkRelatedTravel() {
  const {formState, formStateSetter} = useMainFormContext()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues
  })

  const name = "workRelatedTravel" as const

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: `${name}.otherExpenses` as const
  })

  const handleDeleteItem = (index: number) => () => remove(index)

  const handleAddItem = () => append({
    name: "",
    amount: 0
  })

  const handleFormSubmit = form.handleSubmit(data => {
    formStateSetter(prev => ({
      ...prev,
      data: {
        ...prev.data,
        deductions: {
          ...prev.data.deductions,
          workRelatedTravel: data.workRelatedTravel
        }
      }
    }))
  })

  useEffect(() => {
    form.reset({workRelatedTravel: formState.data.deductions.workRelatedTravel})
  }, [formState])

  return (
    <Form {...form}>
      <Stack gap="md" asChild>
        <form>
          <h1>Work Related Travel</h1>
          <Card
            className="relative"
          >
            <CardHeader>
              <CardTitle>Work Related Travel Deductions</CardTitle>
            </CardHeader>
            <Stack asChild gap="sm">
              <CardContent>
                <FormField
                  control={form.control}
                  name={`${name}.reasonForClaim`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Reason for Claim" description="Reason for Claim">
                      <Input {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${name}.taxiExpense`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Taxi" description="Taxi">
                      <Input type="number" {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${name}.tollExpense`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Toll" description="Toll">
                      <Input type="number" {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${name}.parkingExpense`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Parking" description="Parking">
                      <Input type="number" {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />
                <p className="mt-10">Other Expenses (Click the plus icon to add an item):</p>
                {fields.map((field, index) => (
                  <Inline
                    key={field.id}
                    alignItems="end"
                  >
                    <FormField
                      control={form.control}
                      name={`${name}.otherExpenses.${index}.name`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Name" description="Name">
                          <Input {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.otherExpenses.${index}.amount`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Amount" description="Amount">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleDeleteItem(index)}
                    >
                      <X className="h-4 w-4"/>
                    </Button>
                  </Inline>
                ))}
                <Button
                  type="button"
                  onClick={handleAddItem}
                  variant="ghost"
                >
                  <PlusCircle/>
                </Button>
              </CardContent>
            </Stack>
          </Card>
          <FormNavigation onNavigationClickHandler={handleFormSubmit}/>
        </form>
      </Stack>
    </Form>
  )
}
