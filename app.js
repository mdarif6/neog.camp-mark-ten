let billAmount = document.querySelector(".billamount");
let paidAmount = document.querySelector(".paidamount");
let changeButton = document.querySelector(".button");
let outputChange = document.querySelector(".output");
let tableShow = document.querySelector(".tbody");
let headTable = document.querySelector(".heading");

headTable.style.display = "none";
function cashRegister(paidAmount, billAmount) {
  const currency = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1]; //Why not consoled inside

  let currencyObject = {};

  let backAmount = paidAmount - billAmount;
  for (let i = 0; i < currency.length; i++) {
    if (backAmount < currency[i]) {
      currencyObject[currency[i]] = 0;
    } else {
      let remainder = backAmount % currency[i];
      let quotient = (backAmount - remainder) / currency[i];
      currencyObject[currency[i]] = quotient;
      backAmount = remainder;
    }
  }
  return currencyObject;
}

function clickHandler() {
  tableShow.innerHTML = "";
  outputChange.textContent = "";
  let billInput = billAmount.value;
  let paidInput = paidAmount.value;
  console.log(billInput, paidInput);
  console.log("clicked");
  if (billInput === "" || paidInput === "") {
    headTable.style.display = "none";
    return;
  }
  if (billInput > paidInput) {
    outputChange.textContent = "your paid amount is wrong";
    headTable.style.display = "none";
  } else {
    headTable.style.display = "";
    let returnedAmount = cashRegister(paidInput, billInput);
    let currencyKyes = Object.keys(returnedAmount);
    console.log(currencyKyes);

    for (let i = 0; i < currencyKyes.length; i++) {
      let row = document.createElement("tr");
      let firsttd = document.createElement("td");
      let secondtd = document.createElement("td");

      firsttd.textContent = currencyKyes[i];
      secondtd.textContent = returnedAmount[currencyKyes[i]];
      row.appendChild(firsttd);
      row.appendChild(secondtd);
      tableShow.appendChild(row);
    }
  }

  billAmount.value = "";
  paidAmount.value = "";
}

changeButton.addEventListener("click", clickHandler);
