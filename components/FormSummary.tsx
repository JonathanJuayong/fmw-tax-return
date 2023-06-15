import {useMainFormContext} from "@/components/FormContextProvider";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Stack from "@/components/layout/Stack";
import {Button} from "@/components/ui/button";
import {Edit} from "lucide-react";
import {ReactNode} from "react";
import {DeductionFormComponentsMap, IncomeFormComponentsMap} from "@/utils/types";
import Inline from "@/components/layout/Inline";

function FormSectionHeader({label}: { label: string }) {
  return <h4 className="text-xs font-bold text-stone-400">{label}</h4>
}

function FormSection(
  {
    label,
    value
  }: {
    label: string,
    value: string
  }
) {
  return <section>
    <FormSectionHeader label={label}/>
    <p>{value}</p>
  </section>
}

function SummaryCard(
  {
    children,
    title,
    onClickHandler
  }: {
    children: ReactNode,
    title: string,
    onClickHandler: () => void
  }
) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <Button
        type="button"
        variant="ghost"
        className="absolute top-4 right-3"
        onClick={onClickHandler}
      >
        <Inline className="gap-2">
          <Edit/>
          Edit
        </Inline>
      </Button>
    </Card>
  )
}

const getIndex = <T, >(
  array: Array<T>,
  item: T,
  offset: number = 0
) => {
  const index = array.findIndex(value => value === item)
  if (index === -1) return -1
  return index + offset
}

const INCOME_INDEX_OFFSET = 2

export default function FormSummary() {
  const {formState, jumpTo} = useMainFormContext()
  const {
    data: {
      personalInfo,
      income,
      deductions
    },
    forms
  } = formState

  const deductionsIndexOffset = forms.income.length + INCOME_INDEX_OFFSET

  const findIncomeSectionIndex = (sectionName: keyof IncomeFormComponentsMap) => getIndex<keyof IncomeFormComponentsMap>(
    forms.income,
    sectionName,
    INCOME_INDEX_OFFSET
  )

  const findDeductionsSectionIndex = (sectionName: keyof DeductionFormComponentsMap) => getIndex<keyof DeductionFormComponentsMap>(
    forms.deductions,
    sectionName,
    deductionsIndexOffset
  )

  const handleJumpTo = (index: number) => () => jumpTo(index)

  return (
    <Stack>
      <h1>Form Summary:</h1>
      <SummaryCard title="Personal Information" onClickHandler={handleJumpTo(0)}>
        <Stack asChild>
          <ul>
            <li><FormSection label="Title" value={personalInfo.title}/></li>
            <li><FormSection label="Last Name" value={personalInfo.lastName}/></li>
            <li><FormSection label="First Name" value={personalInfo.firstName}/></li>
            <li><FormSection label="Middle Name" value={personalInfo.middleName}/></li>
            <li><FormSection label="Date of Birth" value={personalInfo.dateOfBirth}/></li>
            <li><FormSection label="Email" value={personalInfo.email}/></li>
            <li><FormSection label="Mobile #" value={personalInfo.mobile}/></li>
            <li><FormSection label="Address" value={personalInfo.address}/></li>
            <li><FormSection label="Tax File Number" value={personalInfo.taxFileNumber}/></li>
            <li><FormSection label="BSB" value={personalInfo.bankDetails.bsb}/></li>
            <li><FormSection label="Account Number" value={personalInfo.bankDetails.accountNumber}/></li>
          </ul>
        </Stack>
      </SummaryCard>
      {findIncomeSectionIndex("rentalProperty") !== -1 && (
        <SummaryCard title="Rental Income" onClickHandler={handleJumpTo(findIncomeSectionIndex("rentalProperty"))}>
          <Stack gap="lg">
            {income.rentalProperty.map((item, index) => (
              <Stack key={index}>
                <h4>Rental Property #{index + 1}</h4>
                <FormSection label="Address" value={item.address}/>
                <FormSection label="Cost of Property" value={item.cost.toString()}/>
                <FormSection label="Date of Purchase" value={item.dateOfPurchase}/>
                <FormSection label="Year Property Built" value={item.yearBuilt.toString()}/>
                <FormSection label="Percentage Owned" value={item.percentageOwned.toString()}/>
                <FormSection label="Registered for Land Tax" value={item.isRegisteredForLandTax.toString()}/>
                <FormSection label="Estimated Market Value" value={item.estimatedMarketValue.toString()}/>
                <FormSection label="Outstanding Loan Amount" value={item.outstandingLoanAmount.toString()}/>
              </Stack>
            ))}
          </Stack>
        </SummaryCard>
      )}
      {findIncomeSectionIndex("bankInterest") !== -1 && (
        <SummaryCard title="Bank Interest" onClickHandler={handleJumpTo(findIncomeSectionIndex("bankInterest"))}>
          <Stack gap="lg">
            {income.bankInterest.map((item, index) => (
              <Stack key={index}>
                <h4>Bank Interest #{index + 1}</h4>
                <FormSection label="Bank Name" value={item.bankName}/>
                <FormSection label="BSB" value={item.bsb}/>
                <FormSection label="Account Number" value={item.accountNumber}/>
                <FormSection label="Interest Amount" value={item.interestAmount.toString()}/>
                <FormSection label="Joint Account?" value={item.isJointAccount.toString()}/>
              </Stack>
            ))}
          </Stack>
        </SummaryCard>
      )}
      {findIncomeSectionIndex("dividends") !== -1 && (
        <SummaryCard title="Dividends" onClickHandler={handleJumpTo(findIncomeSectionIndex("dividends"))}>
          <Stack gap="lg">
            {income.dividends.map((item, index) => (
              <Stack key={index}>
                <h4>Dividend #{index + 1}</h4>
                <FormSection label="Company Name" value={item.companyName}/>
                <FormSection label="Date Paid" value={item.datePaid}/>
                <FormSection label="SRN/HIN" value={item.srnOrHin}/>
                <FormSection label="Franked Amount" value={item.frankedAmount.toString()}/>
                <FormSection label="Unfranked Amount" value={item.unfrankedAmount.toString()}/>
                <FormSection label="Imputation Credit" value={item.imputationCredit.toString()}/>
              </Stack>
            ))}
          </Stack>
        </SummaryCard>
      )}
      {findDeductionsSectionIndex("motorVehicle") !== -1 && (
        <SummaryCard title="Motor Vehicle Deductions" onClickHandler={handleJumpTo(findDeductionsSectionIndex("motorVehicle"))}>
          <Stack>
            <FormSection label="Make" value={deductions.motorVehicle.make}/>
            <FormSection label="Model" value={deductions.motorVehicle.model}/>
            <FormSection label="Date of Purchase" value={deductions.motorVehicle.dateOfPurchase}/>
            <FormSection label="Cost of Car" value={deductions.motorVehicle.costOfCar.toString()}/>
            <FormSection label="Trade Amount" value={deductions.motorVehicle.tradeAmount.toString()}/>
            <FormSection label="Reason for Claim" value={deductions.motorVehicle.reasonForClaim}/>
            <FormSection label="With Logbook?" value={deductions.motorVehicle.withLogbook.toString()}/>
            <FormSection label="Business Use Percentage" value={deductions.motorVehicle.businessUsePercent.toString()}/>
            <FormSection label="Fuel Expense" value={deductions.motorVehicle.fuelExpense.toString()}/>
            <FormSection label="Repairs and Maintenance Expense" value={deductions.motorVehicle.repairAndMaintenanceExpense.toString()}/>
            <FormSection label="Registration Expense" value={deductions.motorVehicle.registrationExpense.toString()}/>
            <FormSection label="Insurance Expense" value={deductions.motorVehicle.insuranceExpense.toString()}/>
            <FormSection label="Lease Expense" value={deductions.motorVehicle.leaseExpense.toString()}/>
            <FormSection label="Car Wash Expense" value={deductions.motorVehicle.carWashExpense.toString()}/>
            <FormSection label="Interest Expense" value={deductions.motorVehicle.interestExpense.toString()}/>
            <FormSection label="KM Travelled" value={deductions.motorVehicle.kmTravelled.toString()}/>
          </Stack>
        </SummaryCard>
      )}
      {findDeductionsSectionIndex("workRelatedTravel") !== -1 && (
        <SummaryCard title="Work-Related Travel Deductions" onClickHandler={handleJumpTo(findDeductionsSectionIndex("workRelatedTravel"))}>
          <Stack>
            <FormSection label="Reason For Claim" value={deductions.workRelatedTravel.reasonForClaim}/>
            <FormSection label="Taxi Expense" value={deductions.workRelatedTravel.taxiExpense.toString()}/>
            <FormSection label="Parking Expense" value={deductions.workRelatedTravel.parkingExpense.toString()}/>
            <FormSection label="Toll Expense" value={deductions.workRelatedTravel.tollExpense.toString()}/>
            <Stack>
              <FormSectionHeader label="Other Expenses"/>
              <ul className="ml-5">
                {deductions.workRelatedTravel.otherExpenses.map((item) => (
                  <li key={item.name}>{item.name} - {item.amount}</li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </SummaryCard>
      )}
    </Stack>
  )
}
