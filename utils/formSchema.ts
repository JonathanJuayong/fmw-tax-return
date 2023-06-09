import {z} from "zod";

export const personalInfoSchema = z.object({
  title: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  dateOfBirth: z.string(),
  taxFileNumber: z.string(),
  address: z.string(),
  mobile: z.string(),
  email: z.string(),
  bankDetails: z.object({
    bsb: z.string(),
    accountNumber: z.string()
  })
})

export const bankInterestSchema = z.object({
  bankName: z.string(),
  bsb: z.string(),
  accountNumber: z.string(),
  interestAmount: z.coerce.number(),
  isJointAccount: z.boolean()
})

export const dividendsSchema = z.object({
  companyName: z.string(),
  srnOrHin: z.string(),
  datePaid: z.string(),
  unfrankedAmount: z.coerce.number(),
  frankedAmount: z.coerce.number(),
  imputationCredit: z.coerce.number()
})

export const rentalPropertySchema = z.object({
  address: z.string(),
  postcode: z.string(),
  cost: z.coerce.number(),
  dateOfPurchase: z.string(),
  firstDateOfRent: z.string(),
  yearBuilt: z.coerce.number()
    .min(1900, "Year cannot be earlier than 1900")
    .max(new Date().getFullYear(), "Year cannot be later than current year"),
  percentageOwned: z.coerce.number(),
  isRegisteredForLandTax: z.boolean(),
  outstandingLoanAmount: z.coerce.number(),
  estimatedMarketValue: z.coerce.number()
})

export const motorVehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  registrationNumber: z.string(),
  costOfCar: z.coerce.number(),
  dateOfPurchase: z.string(),
  tradeAmount: z.coerce.number(),
  reasonForClaim: z.string(),
  withLogbook: z.boolean(),
  businessUsePercent: z.coerce.number(),
  fuelExpense: z.coerce.number(),
  repairAndMaintenanceExpense: z.coerce.number(),
  registrationExpense: z.coerce.number(),
  insuranceExpense: z.coerce.number(),
  leaseExpense: z.coerce.number(),
  carWashExpense: z.coerce.number(),
  interestExpense: z.coerce.number(),
  kmTravelled: z.coerce.number()
})

export const incomeSchema = z.object({
  bankInterest: z.array(bankInterestSchema),
  dividends: z.array(dividendsSchema),
  rentalProperty: z.array(rentalPropertySchema),
})

export const deductionsSchema = z.object({
  motorVehicle: z.object({}),
  workRelatedTravel: z.object({}),
  otherDeductions: z.object({}),
})

export const mainSchema = z.object({
  personalInfo: personalInfoSchema,
  income: incomeSchema,
  deductions: deductionsSchema
})
