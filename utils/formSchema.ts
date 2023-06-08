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

const bankInterestSchema = z.object({
  bankName: z.string(),
  bsb: z.string(),
  accountNumber: z.string(),
  interestAmount: z.number(),
  isJointAccount: z.boolean()
})

const dividendsSchema = z.object({
  companyName: z.string(),
  srcOrHrn: z.string(),
  datePaid: z.string(),
  unfrankedAmount: z.number(),
  frankedAmount: z.number(),
  imputationCredit: z.string()
})

const rentalPropertySchema = z.object({
  address: z.string(),
  postcode: z.string(),
  cost: z.number(),
  dateOfPurchase: z.string(),
  firstDateOfRent: z.string(),
  yearBuilt: z.string(),
  percentageOwned: z.number(),
  isRegisteredForLandTax: z.boolean(),
  outstandingLoanAmount: z.number(),
  estimatedMarketValue: z.number()
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
