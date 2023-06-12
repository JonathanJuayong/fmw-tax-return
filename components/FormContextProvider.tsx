import {createContext, useContext, useState} from "react";
import useComponentTransition from "@/utils/hooks/useComponentTransition";
import {z} from "zod";
import {mainSchema} from "@/utils/formSchema";
import BankInterest from "@/components/income/BankInterest";
import Dividends from "@/components/income/Dividends";
import RentalProperty from "@/components/income/RentalProperty";
import {DeductionFormComponentsMap, IncomeFormComponentsMap} from "@/utils/types";
import WorkRelatedTravel from "@/components/deductions/WorkRelatedTravel";
import MotorVehicle from "@/components/deductions/MotorVehicle";
import TableOfContents from "@/components/TableOfContents";
import Inline from "@/components/layout/Inline";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Stack from "@/components/layout/Stack";
import PersonalInfoForm from "@/components/PersonalInfoForm";

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

type DefaultMainFormStateType = {
  data: typeof defaultFormState,
  forms: {
    income: Array<keyof IncomeFormComponentsMap>,
    deductions: Array<keyof DeductionFormComponentsMap>
  }
}

const defaultMainFormState: DefaultMainFormStateType = {
  data: defaultFormState,
  forms: {
    income: [],
    deductions: []
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

const incomeFormComponentsMap: IncomeFormComponentsMap = {
  salaryWages: <BankInterest/>,
  allowance: <BankInterest/>,
  trustDistribution: <BankInterest/>,
  capitalGain: <BankInterest/>,
  bankInterest: <BankInterest/>,
  dividends: <Dividends/>,
  rentalProperty: <RentalProperty/>,
}

const deductionFormComponentsMap: DeductionFormComponentsMap = {
  motorVehicle: <MotorVehicle/>,
  workRelatedTravel: <WorkRelatedTravel/>,
  interestDeduction: <WorkRelatedTravel/>,
  dividendDeduction: <WorkRelatedTravel/>,
  otherDeductions: <WorkRelatedTravel/>,
}

export function FormContextProvider() {
  const [formState, setFormState] = useState<MainFormState>(defaultMainFormState);

  const formStateUpdateHandler = (stateSetter: (formState: MainFormState) => MainFormState) => {
    setFormState(prev => stateSetter(prev))
  }

  const incomeComponents = formState.forms.income.map(name => incomeFormComponentsMap[name])
  const deductionComponents = formState.forms.deductions.map(name => deductionFormComponentsMap[name])
  const components = [
    <PersonalInfoForm key={0}/>,
    <TableOfContents key={1}/>,
    ...incomeComponents,
    ...deductionComponents
  ]

  // revert to original default state if form is not shown. TODO: Find a better way to do this!
  useEffect(() => {
    const newIncomeState = Object.keys(defaultFormState.income).reduce((acc, cur) => {

      // if key is not in forms array, revert to default values
      if (!formState.forms.income.includes(cur as keyof IncomeFormComponentsMap)) {
        return {
          ...formState.data.income,
          ...acc,
          // figure out how to fix type error
          // @ts-ignore
          [cur]: defaultFormState.income[cur] ?? {}
        }
      }
      return {
        ...formState.data.income,
        ...acc,
      }
    }, {})
    const newDeductionsState = Object.keys(defaultFormState.deductions).reduce((acc, cur) => {
      if (!formState.forms.deductions.includes(cur as keyof DeductionFormComponentsMap)) {
        return {
          ...formState.data.deductions,
          ...acc,
          // figure out how to fix type error
          // @ts-ignore
          [cur]: defaultFormState.deductions[cur] ?? {}
        }
      }
      return {
        ...formState.data.deductions,
        ...acc,
      }
    }, {})

    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        income: {
          ...prev.data.income,
          ...newIncomeState
        },
        deductions: {
          ...prev.data.deductions,
          ...newDeductionsState
        }
      }
    }))
  }, [formState.forms])

  const {
    currentElement,
    showPreviousElement,
    showNextElement,
    jumpTo
  } = useComponentTransition([
    ...components
  ])

  return (
    <FormContext.Provider value={{
      formState,
      formStateUpdateHandler: formStateUpdateHandler,
      showPreviousElement,
      showNextElement,
      jumpTo
    }}>
      <Stack>
        {currentElement}
        <Inline>
          <Button type="button" onClick={showPreviousElement}><ChevronLeft className="h-4 w-4"/></Button>
          <Button type="button" onClick={showNextElement}><ChevronRight className="h-4 w-4"/></Button>
        </Inline>
      </Stack>
    </FormContext.Provider>
  )
}
