import {createContext, ReactElement, useContext, useState} from "react";
import useComponentTransition from "@/utils/hooks/useComponentTransition";

type FormContextType = {
  formState?: any,
  formStateSetter?: () => void,
  showNextElement?: () => void,
  showPreviousElement?: () => void,
  jumpTo?: (index: number) => void
}

export const FormContext = createContext<FormContextType>({})

export function useFormContext() {
  const {
    formState,
    formStateSetter,
    showPreviousElement,
    showNextElement,
    jumpTo
  } = useContext(FormContext);

  return {
    formState: formState!,
    formStateSetter: formStateSetter!,
    showPreviousElement: showPreviousElement!,
    showNextElement: showNextElement!,
    jumpTo: jumpTo!
  }
}

interface FormContextProviderProps {
  components: ReactElement[]
}

export function FormContextProvider({components}: FormContextProviderProps) {
  const [formState, setFormState] = useState({});

  const formStateSetter = () => {

  }

  const {
    currentElement,
    showPreviousElement,
    showNextElement,
    jumpTo
  } = useComponentTransition(components)

  return (
    <FormContext.Provider value={{
      formState,
      formStateSetter,
      showPreviousElement,
      showNextElement,
      jumpTo
    }}>
      {currentElement}
    </FormContext.Provider>
  )
}
