import {createContext, ReactElement, useContext, useState} from "react";
import useComponentTransition from "@/utils/hooks/useComponentTransition";
import {z} from "zod";
import {mainSchema} from "@/utils/formSchema";

const defaultFormState: z.infer<typeof mainSchema> = {
  personalInfo: {
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
  },
  income: {
    bankInterest: [
      {
        bsb: "",
        bankName: "",
        interestAmount: 0,
        accountNumber: "",
        isJointAccount: false
      }
    ],
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
    ],
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
  },
  deductions: {
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
    },
    workRelatedTravel: {
      reasonForClaim: "",
      taxiExpense: 0,
      tollExpense: 0,
      parkingExpense: 0,
      otherExpenses: []
    },
  }
}

const defaultMainFormState = {
  data: defaultFormState,
  forms: {
    income: [""],
    deductions: [""]
  }
}

type MainFormState = typeof defaultMainFormState

type FormContextType = {
  formState?: MainFormState,
  formStateUpdateHandler?: (stateSetter: (formState: MainFormState) => MainFormState) => void,
  showNextElement?: () => void,
  showPreviousElement?: () => void,
  jumpTo?: (index: number) => void
}

export const FormContext = createContext<FormContextType>({})

export function useMainFormContext() {
  const {
    formState,
    formStateUpdateHandler,
    showPreviousElement,
    showNextElement,
    jumpTo
  } = useContext(FormContext);

  return {
    formState: formState!,
    formStateSetter: formStateUpdateHandler!,
    showPreviousElement: showPreviousElement!,
    showNextElement: showNextElement!,
    jumpTo: jumpTo!
  }
}

interface FormContextProviderProps {
  components: ReactElement[]
}

export function FormContextProvider({components}: FormContextProviderProps) {
  const [formState, setFormState] = useState<MainFormState>(defaultMainFormState);

  const formStateUpdateHandler = (stateSetter: (formState: MainFormState) => MainFormState) => {
    setFormState(prev => stateSetter(prev))
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
      formStateUpdateHandler: formStateUpdateHandler,
      showPreviousElement,
      showNextElement,
      jumpTo
    }}>
      {currentElement}
    </FormContext.Provider>
  )
}
