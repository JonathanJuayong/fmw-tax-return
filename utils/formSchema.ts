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

export const mainSchema = z.object({
  personalInfo: personalInfoSchema
})
