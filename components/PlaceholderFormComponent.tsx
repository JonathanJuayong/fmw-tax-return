import FormNavigation from "@/components/FormNavigation";

interface PlaceholderFormComponentProps {
  name: string
}

export default function PlaceholderFormComponent({name}: PlaceholderFormComponentProps) {
  return (
    <>
      <h1>{name}</h1>
      <p>This form is not yet implemented</p>
      <FormNavigation/>
    </>
  )
}
