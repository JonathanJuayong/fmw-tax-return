"use client"

import {Form, FormField} from "@/components/ui/Form";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {personalInfoSchema} from "@/utils/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Combobox from "@/components/ui/combobox";
import Stack from "@/components/layout/Stack";
import Column from "@/components/layout/Column";
import {useMainFormContext} from "@/components/FormContextProvider";
import {useEffect} from "react";
import FormNavigation from "@/components/FormNavigation";

const defaultValues: z.infer<typeof personalInfoSchema> = {
  title: "",
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  mobile: "",
  address: "",
  dateOfBirth: "",
  taxFileNumber: "",
  bankDetails: {
    bsb: "",
    accountNumber: ""
  }
}

const titleOptions = [
  {label: "Mr.", value: "mr"},
  {label: "Mrs.", value: "mrs"},
  {label: "Ms.", value: "ms"},
  {label: "Dr.", value: "dr"},
  {label: "Atty.", value: "atty"},
]

export default function PersonalInfoForm() {
  const {formState, formStateSetter} = useMainFormContext()
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    mode: "all",
    defaultValues
  })

  const handleFormSubmit = form.handleSubmit(data => {
    formStateSetter(prev => ({
      ...prev,
      data: {
        ...prev.data,
        personalInfo: {
          ...data,
        }
      }
    }))
  })

  useEffect(() => {
    form.reset(formState.data.personalInfo)
  }, [formState])

  return (
    <Form {...form}>
      <Stack gap="lg" asChild>
        <form>
          <Stack>
            <Column cols={5}>
              <Column.Item asChild>
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormPrimitiveWrapper
                      label="Title"
                      description="This is a test"
                    >
                      <Combobox
                        defaultTriggerLabel="Please select a title"
                        value={field.value}
                        placeholder="Please enter a title"
                        options={titleOptions}
                        onValueChange={(value) => {
                          form.setValue("title", value)
                        }}
                      />
                    </FormPrimitiveWrapper>
                  )}
                />
              </Column.Item>
              <FormField
                control={form.control}
                name="firstName"
                render={({field}) => (
                  <Column.Item asChild span={2}>
                    <FormPrimitiveWrapper
                      className="flex-1"
                      label="First Name"
                      description="First name"
                    >
                      <Input {...field}/>
                    </FormPrimitiveWrapper>
                  </Column.Item>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({field}) => (
                  <Column.Item asChild span={2}>
                    <FormPrimitiveWrapper
                      className="flex-1"
                      label="Last Name"
                      description="Last name"
                    >
                      <Input {...field}/>
                    </FormPrimitiveWrapper>
                  </Column.Item>
                )}
              />
            </Column>
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({field}) => (
                <FormPrimitiveWrapper
                  label="Date of Birth"
                  description="date of birth"
                >
                  <Input type="date" {...field}/>
                </FormPrimitiveWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({field}) => (
                <FormPrimitiveWrapper
                  label="Mobile #"
                  description="Mobile #"
                >
                  <Input type="tel" {...field}/>
                </FormPrimitiveWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormPrimitiveWrapper
                  label="Email"
                  description="email"
                >
                  <Input type="email" {...field}/>
                </FormPrimitiveWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({field}) => (
                <FormPrimitiveWrapper
                  label="Address"
                  description="address"
                >
                  <Input {...field}/>
                </FormPrimitiveWrapper>
              )}
            />
          </Stack>
          <Stack>
            <FormField
              control={form.control}
              name="taxFileNumber"
              render={({field}) => (
                <FormPrimitiveWrapper
                  label="Tax File Number"
                  description="tax file number"
                >
                  <Input {...field}/>
                </FormPrimitiveWrapper>
              )}
            />
            <Column cols={4}>
              <FormField
                control={form.control}
                name="bankDetails.bsb"
                render={({field}) => (
                  <FormPrimitiveWrapper
                    label="BSB"
                    description="BSB"
                  >
                    <Input {...field}/>
                  </FormPrimitiveWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="bankDetails.accountNumber"
                render={({field}) => (
                  <Column.Item asChild span={3}>
                    <FormPrimitiveWrapper
                      label="Account Number"
                      description="bank account number"
                    >
                      <Input {...field}/>
                    </FormPrimitiveWrapper>
                  </Column.Item>
                )}
              />
            </Column>
          </Stack>
          <FormNavigation
            onNavigationClickHandler={handleFormSubmit}
            showPrevious={false}
          />
        </form>
      </Stack>
    </Form>
  )
}
