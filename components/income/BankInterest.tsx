import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {bankInterestSchema} from "@/utils/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/Form";
import Stack from "@/components/layout/Stack";
import FormPrimitiveWrapper from "@/components/FormPrimitiveWrapper";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Column from "@/components/layout/Column";
import Inline from "@/components/layout/Inline";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {PlusCircle, X} from "lucide-react";

const schema = z.object({
  bankInterests: z.array(bankInterestSchema)
})

const defaultValues: z.infer<typeof schema> = {
  bankInterests: [
    {
      bsb: "",
      bankName: "",
      interestAmount: 0,
      accountNumber: "",
      isJointAccount: false
    }
  ]
}

export default function BankInterest() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues
  })

  const name = "bankInterests" as const

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name
  })

  const handleDeleteItem = (index: number) => () => remove(index)

  const handleAddItem = () => append({
    bsb: "",
    bankName: "",
    interestAmount: 0,
    accountNumber: "",
    isJointAccount: false
  })

  return (
    <Form {...form}>
      <Stack gap="md" asChild>
        <form>
          <h1>Bank Interests</h1>
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className="relative"
            >
              <CardHeader>
                <CardTitle>Bank Interest {index + 1}</CardTitle>
              </CardHeader>
              <Stack asChild gap="sm">
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.bankName`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Bank Name" description="Bank Name">
                        <Input {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <Column cols={4}>
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.bsb`}
                      render={({field}) => (
                        <FormPrimitiveWrapper label="BSB" description="BSB">
                          <Input {...field}/>
                        </FormPrimitiveWrapper>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${name}.${index}.accountNumber`}
                      render={({field}) => (
                        <Column.Item asChild span={3}>
                          <FormPrimitiveWrapper label="Account Number" description="Account Number">
                            <Input {...field}/>
                          </FormPrimitiveWrapper>
                        </Column.Item>
                      )}
                    />
                  </Column>
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.interestAmount`}
                    render={({field}) => (
                      <FormPrimitiveWrapper label="Interest Amount" description="Interest Amount">
                        <Input type="number" {...field}/>
                      </FormPrimitiveWrapper>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${name}.${index}.isJointAccount`}
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
                            <FormLabel>Is this a joint account?</FormLabel>
                          </Inline>
                          <FormMessage/>
                        </FormItem>
                      </Stack>
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
          <Button type="button" onClick={form.handleSubmit(data => console.log(data))}>Submit</Button>
        </form>
      </Stack>
    </Form>
  )
}
