import {useForm} from "react-hook-form";
import {z} from "zod";
import {motorVehicleSchema} from "@/utils/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Column from "@/components/layout/Column";
import Inline from "@/components/layout/Inline";
import {Checkbox} from "@/components/ui/checkbox";
import {useMainFormContext} from "@/components/FormContextProvider";
import {useEffect} from "react";
import FormNavigation from "@/components/FormNavigation";

const schema = z.object({
  motorVehicle: motorVehicleSchema
})

const defaultValues: z.infer<typeof schema> = {
  motorVehicle: {
    make: "",
    model: "",
    registrationNumber: "",
    dateOfPurchase: "",
    costOfCar: 0,
    tradeAmount: 0,
    reasonForClaim: "",
    withLogbook: false,
    businessUsePercent: 0,
    fuelExpense: 0,
    repairAndMaintenanceExpense: 0,
    registrationExpense: 0,
    insuranceExpense: 0,
    leaseExpense: 0,
    carWashExpense: 0,
    interestExpense: 0,
    kmTravelled: 0,
  }
}

export default function MotorVehicle() {
  const {formState, formStateSetter} = useMainFormContext()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues
  })

  const name = "motorVehicle" as const

  const handleFormSubmit = form.handleSubmit(data => {
    formStateSetter(prev => ({
      ...prev,
      data: {
        ...prev.data,
        deductions: {
          ...prev.data.deductions,
          motorVehicle: data.motorVehicle
        }
      }
    }))
  })

  useEffect(() => {
    form.reset({motorVehicle: formState.data.deductions.motorVehicle})
  }, [formState])

  return (
    <Form {...form}>
      <Stack gap="md" asChild>
        <form>
          <h1>Motor Vehicle</h1>
          <Card
            className="relative"
          >
            <CardHeader>
              <CardTitle>Motor Vehicle Deductions</CardTitle>
            </CardHeader>
            <Stack asChild gap="sm">
              <CardContent>
                <Column cols={2}>
                  <FormField
                    control={form.control}
                    name={`${name}.model`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Model" description="Model">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.make`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Make" description="Make">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                </Column>
                <FormField
                  control={form.control}
                  name={`${name}.registrationNumber`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Registration Number" description="Registration Number">
                      <Input {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`${name}.dateOfPurchase`}
                  render={({field}) => (
                    <FormPrimitiveWrapper label="Date of Purchase" description="Date of Purchase">
                      <Input type="date" {...field}/>
                    </FormPrimitiveWrapper>
                  )}
                />

                <Column cols={2}>
                  <FormField
                    control={form.control}
                    name={`${name}.costOfCar`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Cost of Car" description="Cost of Car">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.tradeAmount`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Trade-in Value" description="Trade-in Value">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                </Column>
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
                  name={`${name}.withLogbook`}
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
                          <FormLabel>Did you keep a logbook for the year?</FormLabel>
                        </Inline>
                        <FormMessage/>
                      </FormItem>
                    </Stack>
                  )}
                />
                {form.getValues(`${name}.withLogbook`) && (
                  <>
                    <FormField
                      control={form.control}
                      name={`${name}.businessUsePercent`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Business use %" description="Business use %">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.fuelExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Fuel" description="Fuel">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.repairAndMaintenanceExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Repairs & Maintenance" description="Repairs & Maintenance">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.registrationExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Registration" description="Registration">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.insuranceExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Insurance" description="Insurance">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.leaseExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Lease/Hire purchase" description="Lease/Hire purchase">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.carWashExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Car Wash" description="Car Wash">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.interestExpense`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="Interest on Loan" description="Interest on Loan">
                          <Input type="number" {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                  </>
                )}
                {!form.getValues(`${name}.withLogbook`) && (
                  <FormField
                    control={form.control}
                    name={`${name}.kmTravelled`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="KM Travelled" description="KM Travelled">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                )}
              </CardContent>
            </Stack>
          </Card>
          <FormNavigation onNavigationClickHandler={handleFormSubmit}/>
        </form>
      </Stack>
    </Form>
  )
}
