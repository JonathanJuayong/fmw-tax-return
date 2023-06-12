import {z} from "zod";
import {rentalPropertySchema} from "@/utils/formSchema";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import Column from "@/components/layout/Column";
import Inline from "@/components/layout/Inline";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {PlusCircle, X} from "lucide-react";
import {useMainFormContext} from "@/components/FormContextProvider";
import FormNavigation from "@/components/FormNavigation";
import {useEffect} from "react";

const schema = z.object({
  rentalProperty: z.array(rentalPropertySchema)
})

const defaultValues: z.infer<typeof schema> = {
  rentalProperty: [
    {
      address: "",
      postcode: "",
      cost: 0,
      dateOfPurchase: "",
      firstDateOfRent: "",
      yearBuilt: 1900,
      percentageOwned: 0,
      isRegisteredForLandTax: false,
      outstandingLoanAmount: 0,
      estimatedMarketValue: 0
    }
  ]
}

export default function RentalProperty() {
  const {formState, formStateSetter} = useMainFormContext()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues
  })

  const name = "rentalProperty" as const

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name
  })

  const handleDeleteItem = (index: number) => () => remove(index)

  const handleAddItem = () => append({
    address: "",
    postcode: "",
    cost: 0,
    dateOfPurchase: "",
    firstDateOfRent: "",
    yearBuilt: 1900,
    percentageOwned: 0,
    isRegisteredForLandTax: false,
    outstandingLoanAmount: 0,
    estimatedMarketValue: 0
  })

  const handleFormSubmit = form.handleSubmit(data => {
    formStateSetter(prev => ({
      ...prev,
      data: {
        ...prev.data,
        income: {
          ...prev.data.income,
          rentalProperty: data.rentalProperty
        }
      }
    }))
  })

  useEffect(() => {
    form.reset({rentalProperty: formState.data.income.rentalProperty})
  }, [formState])

  return (
    <Form {...form}>
      <Stack gap="md" asChild>
        <form>
          <h1>Rental Property</h1>
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className="relative"
            >
              <CardHeader>
                <CardTitle>Rental Property {index + 1}</CardTitle>
              </CardHeader>
              <Stack asChild gap="sm">
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.address`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Address" description="Address">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.postcode`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Postcode" description="Postcode" className="self-start">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <Column cols={3}>
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.dateOfPurchase`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Date of Purchase" description="Date of Purchase">
                          <Input type="date" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.firstDateOfRent`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Date of First Rent" description="Date of First Rent">
                          <Input type="date" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.yearBuilt`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Year Property Built" description="Year Property Built">
                          <Input type="number" min={1900} max={new Date().getFullYear()} {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                  </Column>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.percentageOwned`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Percentage Owned" description="Percentage Owned">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.isRegisteredForLandTax`}
                    render={({field}) => (
                      <Stack asChild>
                        <FormItem>
                          <Inline justifyContent="start" gap="xxs">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Is this property registered for Land Tax?</FormLabel>
                          </Inline>
                          <FormMessage/>
                        </FormItem>
                      </Stack>
                    )}
                  />
                  {/*TODO: Should unset values if checkbox is unticked*/}
                  {form.getValues(`${name}.${index}.isRegisteredForLandTax`) && (
                    <>
                      <FormField
                        control={form.control}
                        name={`${name}.${index}.outstandingLoanAmount`}
                        render={({field}) => (
                          <FormPrimitiveWrapper label="Outstanding Loan Amount" description="Outstanding Loan Amount">
                            <Input type="number" {...field}/>
                          </FormPrimitiveWrapper>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${name}.${index}.estimatedMarketValue`}
                        render={({field}) => (
                          <FormPrimitiveWrapper label="Estimated Market Value" description="Estimated Market Value">
                            <Input type="number" {...field}/>
                          </FormPrimitiveWrapper>
                        )}
                      />
                    </>
                  )}

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
