import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import Column from "@/components/layout/Column";
import {Button} from "@/components/ui/button";
import {PlusCircle, X} from "lucide-react";
import {dividendsSchema} from "@/utils/formSchema";
import {useMainFormContext} from "@/components/FormContextProvider";
import {useEffect} from "react";
import FormNavigation from "@/components/FormNavigation";

const schema = z.object({
  dividends: z.array(dividendsSchema)
})

const defaultValues: z.infer<typeof schema> = {
  dividends: [
    {
      companyName: "",
      datePaid: "",
      frankedAmount: 0,
      unfrankedAmount: 0,
      srnOrHin: "",
      imputationCredit: 0
    }
  ]
}

export default function Dividends() {
  const {formState, formStateSetter} = useMainFormContext()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues
  })

  const name = "dividends" as const

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name
  })

  const handleFormSubmit = form.handleSubmit(data => {
    formStateSetter(prev => ({
      ...prev,
      data: {
        ...prev.data,
        income: {
          ...prev.data.income,
          dividends: data.dividends
        }
      }
    }))
  })

  useEffect(() => {
    form.reset({dividends: formState.data.income.dividends})
  }, [formState])

  const handleDeleteItem = (index: number) => () => remove(index)

  const handleAddItem = () => append({
    companyName: "",
    datePaid: "",
    frankedAmount: 0,
    unfrankedAmount: 0,
    srnOrHin: "",
    imputationCredit: 0
  })

  return (
    <Form {...form}>
      <Stack gap="md" asChild>
        <form>
          <h1>Dividends</h1>
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className="relative"
            >
              <CardHeader>
                <CardTitle>Dividend {index + 1}</CardTitle>
              </CardHeader>
              <Stack asChild gap="sm">
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.companyName`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Company Name" description="Company Name">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.datePaid`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Date Paid" description="Date Paid">
                        <Input type="date" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <Column cols={2}>
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.frankedAmount`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Franked Amount" description="Franked Amount">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.unfrankedAmount`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Unfranked Amount" description="Unfranked Amount">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                  </Column>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.srnOrHin`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="SRN/HIN" description="SRN/HIN">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.imputationCredit`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Imputation Credit" description="Imputation Credit">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />

                  {index !== 0 && (
                    <Button
                      className="absolute top-4 right-2"
                      type="button"
                      onClick={handleDeleteItem(index)}
                      variant="ghost"
                    >
                      <X className="h-4 w-4"/>
                    </Button>
                  )}
                </CardContent>
              </Stack>
            </Card>
          ))}
          <Button
            type="button"
            onClick={handleAddItem}
            variant="ghost"
          >
            <PlusCircle/>
          </Button>
          <FormNavigation onNavigationClickHandler={handleFormSubmit}/>
        </form>
      </Stack>
    </Form>
  )
}
