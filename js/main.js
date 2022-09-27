//let grossSalary = 100000;
let grossSalaryInput = document.getElementById("grossSalary");
let grossSalary = 0;
let personalRelief = 2400;
var nssfRate = 1080;
let insuranceRelief = 210;
const nhifRate = 1400;
const nhif = nhifRate - insuranceRelief;
let netPay = 0;
let incomeTax = 0;
let taxableAmount = 0;

grossSalaryInput.addEventListener("keyup", (event) => {
  grossSalary = grossSalaryInput.value;
  let net = calculateTax();
  document.getElementById("netPay").innerHTML = net;
  document.getElementById("incomeTax").innerHTML = incomeTax;
  document.getElementById("taxableInc").innerHTML = taxableAmount;
});

// step 1 : taxable income = gross salary - nssf contribution of 1080
function taxablePay(grossSalary) {
  if (grossSalary <= nssfRate) {
    return grossSalary;
  }
  const taxableIncome = parseInt(grossSalary - nssfRate);
  return taxableIncome;
}

function calculateTax() {
  let totalTax = 0;
  const taxableInc = taxablePay(grossSalary);
  taxableAmount = taxableInc;

  if (taxableInc <= 24000) {
    if (taxableInc < 1800) {
      return taxableInc;
    }
    console.log(taxableInc, "taxableIncome, band1");
    console.log(totalTax1(taxableInc), "band1");
    personalRelief = 0;
    insuranceRelief = 0;
    netPay = taxableInc - nhifRate;
    incomeTax = 0;
    return netPay;
  }
  if (taxableInc <= 32333 && taxableInc > 24001) {
    console.log(taxableInc, "taxableIncome, band2");
    totalTax = totalTax + totalTax2(taxableInc) + totalTax1(24000);
    console.log(totalTax, "band2");
  }
  if (taxableInc > 32333) {
    console.log(taxableInc, "taxableIncome, band3");
    totalTax = totalTax3(taxableInc) + totalTax2(32333) + totalTax1(24000);
    console.log(totalTax, "band3");
  }

  incomeTax = totalTax - insuranceRelief - personalRelief;
  console.log(incomeTax, "endTax");
  netPay =
    taxableInc - (totalTax - insuranceRelief - personalRelief) - nhifRate;
  console.log(netPay, "endPay");
  return netPay;
}

function totalTax1(taxableIncome) {
  let tax1;
  if (taxableIncome < 24000) {
    tax1 = (taxableIncome * 10) / 100;
    return parseInt(tax1);
  } else if (taxableIncome == 24000) {
    tax1 = (24000 * 10) / 100;
    return parseInt(tax1);
  }
}

function totalTax2(taxableIncome) {
  let tax2;
  if (taxableIncome < 32333) {
    let band2Tax = taxableIncome - 24000;
    tax2 = (band2Tax * 25) / 100;
    return parseInt(tax2);
  } else if (taxableIncome == 32333) {
    tax2 = (8233 * 25) / 100;
    return parseInt(tax2);
  }
}

function totalTax3(taxableIncome) {
  let tax3;
  let band3Tax = taxableIncome - 32333;
  tax3 = (band3Tax * 30) / 100;
  return parseInt(tax3);
}
