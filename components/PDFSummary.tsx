import {Document, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import {z} from "zod";
import {mainSchema} from "@/utils/formSchema";
import {ReactNode} from "react";
import {Style} from "@react-pdf/types";

const styles = StyleSheet.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  container: {
    padding: 20,
    fontSize: 12
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    gap: 14
  },
  textSmall: {
    fontSize: 8
  },
  textMedium: {
    fontSize: 18
  },
  textBig: {
    fontSize: 24
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    // width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  }
})

function PDFTable({headers, data}: { headers: string[], data: string[][] }) {
  const {table, tableRow, tableCol, tableCell} = styles
  const cellWidth = 100 / headers.length + "%"
  return (
    <View style={table}>
      <View style={tableRow}>
        {headers.map(header => (
          <View style={[tableCol, {width: cellWidth}]} key={header}>
            <Text style={[tableCell, {fontWeight: "black"}]}>{header}</Text>
          </View>
        ))}
      </View>
      {data.map((items, index) => (
        <View style={tableRow} key={index}>
          {items.map((item, idx) => (
            <View style={[tableCol, {width: cellWidth}]} key={idx}>
              <Text style={tableCell}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function PDFStack(
  {
    children,
    gap = 8,
    styles = []
  }: {
    children: ReactNode,
    gap?: number,
    styles?: Style[]
  }
) {
  const stackStyle: Style = {
    display: "flex",
    flexDirection: "column",
    gap
  }
  return (
    <View wrap style={[stackStyle, ...styles]}>{children}</View>
  )
}

function PDFInline(
  {
    children,
    gap = 10,
    styles = []
  }: {
    children: ReactNode,
    gap?: number,
    styles?: Style[]
  }
) {
  const inlineStyle: Style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap
  }
  return (
    <View style={[inlineStyle, ...styles]}>{children}</View>
  )
}

function DataText({children, width = 400}: { children: ReactNode, width?: number }) {
  const style: Style = {width}
  return (
    <Text style={style}>{children}</Text>
  )
}

function DataWithLabel({label, value, valueWidth}: { label: string, value: string, valueWidth?: number }) {
  return (
    <PDFInline>
      <Text style={{maxWidth: 140}}>{label}</Text>
      <DataText width={valueWidth}>{value}</DataText>
    </PDFInline>
  )
}

interface PDFSummaryProps {
  data: z.infer<typeof mainSchema>
}

export default function PDFSummary({data}: PDFSummaryProps) {
  const {personalInfo, income, deductions} = data
  const {
    stack,
    textBig,
    textMedium,
    container
  } = styles
  return (
    <Document>
      <Page
        size="A4"
        style={[
          stack,
          container,
          {
            gap: 45
          }
        ]}>
        <PDFStack>
          <Text style={textBig}>FMW ACCOUNTANTS PTY LIMITED</Text>
          <Text>Income Tax Return Data Collection Sheet</Text>
          <Text>Year Ended 30 June 2022</Text>
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Personal Info</Text>
          <DataWithLabel label="Title:" value={personalInfo.title}/>
          <DataWithLabel label="Last Name:" value={personalInfo.lastName}/>
          <DataWithLabel label="First Name:" value={personalInfo.firstName}/>
          <DataWithLabel label="Middle Name:" value={personalInfo.middleName}/>
          <DataWithLabel label="Email" value={personalInfo.email}/>
          <DataWithLabel label="Mobile" value={personalInfo.mobile}/>
          <DataWithLabel label="Address" value={personalInfo.address}/>
          <DataWithLabel label="BSB" value={personalInfo.bankDetails.bsb}/>
          <DataWithLabel label="Account Number" value={personalInfo.bankDetails.accountNumber}/>
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Bank Interest</Text>
          <PDFTable
            headers={[
              "Bank Name",
              "BSB",
              "Account Number",
              "Interest Amount",
              "Is this a joint account"
            ]}
            data={income.bankInterest.map(item => [
              item.bankName,
              item.bsb.toString(),
              item.accountNumber.toString(),
              item.interestAmount.toString(),
              item.isJointAccount ? "Yes" : "No"
            ])}
          />
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Dividends</Text>
          <PDFTable
            headers={[
              "Company Name",
              "SRN/HIN",
              "Date Paid",
              "Franked Amount",
              "Unfranked Amount",
              "Imputation Credit"
            ]}
            data={income.dividends.map(item => [
              item.companyName,
              item.srnOrHin,
              item.datePaid,
              item.frankedAmount.toString(),
              item.unfrankedAmount.toString(),
              item.imputationCredit.toString(),
            ])}
          />
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Rental Property</Text>
          <PDFTable
            headers={[
              "Address",
              "Postcode",
              "Cost",
              "Date of Purchase",
              "Day of First Rent",
              "Year Built",
              "Percentage Owned",
              "Registered for Land Tax",
              "Outstanding Loan Amount",
              "Estimated Market Value",
            ]}
            data={income.rentalProperty.map(item => [
              item.address,
              item.postcode,
              item.cost.toString(),
              item.dateOfPurchase,
              item.firstDateOfRent,
              item.yearBuilt.toString(),
              item.percentageOwned.toString(),
              item.isRegisteredForLandTax ? "Yes" : "No",
              item.outstandingLoanAmount.toString(),
              item.estimatedMarketValue.toString(),
            ])}
          />
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Motor Vehicle Deductions</Text>
          <DataWithLabel label="Make" value={deductions.motorVehicle.make}/>
          <DataWithLabel label="Model" value={deductions.motorVehicle.model}/>
          <DataWithLabel label="Registration Number" value={deductions.motorVehicle.registrationNumber}/>
          <DataWithLabel label="Date of Purchase" value={deductions.motorVehicle.dateOfPurchase}/>
          <DataWithLabel label="Cost" value={deductions.motorVehicle.costOfCar.toString()}/>
          <DataWithLabel label="Trade Value" value={deductions.motorVehicle.tradeAmount.toString()}/>
          <DataWithLabel label="Reason For Claim" value={deductions.motorVehicle.reasonForClaim}/>
          <DataWithLabel label="With Logbook" value={deductions.motorVehicle.withLogbook.toString()}/>
          <DataWithLabel label="Business Use Percent" value={deductions.motorVehicle.businessUsePercent.toString()}/>
          <DataWithLabel label="Fuel Expense" value={deductions.motorVehicle.fuelExpense.toString()}/>
          <DataWithLabel label="Repairs and Maintenance" value={deductions.motorVehicle.repairAndMaintenanceExpense.toString()}/>
          <DataWithLabel label="Registration Expense" value={deductions.motorVehicle.registrationExpense.toString()}/>
          <DataWithLabel label="Insurance Expense" value={deductions.motorVehicle.insuranceExpense.toString()}/>
          <DataWithLabel label="Lease Expense" value={deductions.motorVehicle.leaseExpense.toString()}/>
          <DataWithLabel label="Car Wash Expense" value={deductions.motorVehicle.carWashExpense.toString()}/>
          <DataWithLabel label="Interest Expense" value={deductions.motorVehicle.interestExpense.toString()}/>
          <DataWithLabel label="KM Travelled" value={deductions.motorVehicle.kmTravelled.toString()}/>
        </PDFStack>
        <PDFStack>
          <Text style={textMedium}>Work-Related Travel Deductions</Text>
          <DataWithLabel label="Reason For Claim" value={deductions.workRelatedTravel.reasonForClaim}/>
          <DataWithLabel label="Taxi Expense" value={deductions.workRelatedTravel.taxiExpense.toString()}/>
          <DataWithLabel label="Toll Expense" value={deductions.workRelatedTravel.tollExpense.toString()}/>
          <DataWithLabel label="Parking Expense" value={deductions.workRelatedTravel.parkingExpense.toString()}/>
          <Text>Other Expenses:</Text>
          <PDFTable
            headers={["Name", "Amount"]}
            data={deductions.workRelatedTravel.otherExpenses.map(item => [item.name, item.amount.toString()])}
          />
        </PDFStack>
      </Page>
    </Document>
  )
}
