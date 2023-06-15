import {ReactElement} from "react";

export type JustifyOptions = "start"
  | "center"
  | "end"
  | "normal"
  | "between"
  | "around"
  | "evenly"
  | "stretch"

export type AlignOptions = "start"
  | "end"
  | "center"
  | "baseline"
  | "stretch"

export type SpacingOptions = "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"

export type IncomeFormComponentsMap = {
  salaryWages: ReactElement,
  allowance: ReactElement,
  trustDistribution: ReactElement,
  capitalGain: ReactElement,
  bankInterest: ReactElement,
  dividends: ReactElement,
  rentalProperty: ReactElement,
}

export type DeductionFormComponentsMap = {
  motorVehicle: ReactElement
  workRelatedTravel: ReactElement
  interestDeduction: ReactElement
  dividendDeduction: ReactElement
  otherDeductions: ReactElement
}
