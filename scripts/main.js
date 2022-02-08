const form = document.getElementsByTagName("form")[0];
const afm = document.getElementById("afm");
const afmError = document.querySelector("#afm + span");
const submitBtn = document.getElementById("submit-btn");
const inputs = document.getElementsByTagName("input");

function checkAFM(afm) {
  if (afm.length !== 9) return false;
  else {
    afm = afm.split("").reverse().join("");
    let Num1 = 0;
    for (let iDigit = 1; iDigit <= 8; iDigit++) {
      Num1 += afm.charAt(iDigit) << iDigit;
    }
    return (Num1 % 11) % 10 == afm.charAt(0);
  }
}


// function showError() {
//   if(this.validity.valueMissing) {
//     this.nextSibling.textContent = 'Το πεδίο πρέπει να έιναι συμπληρωμένο';
//     this.nextSibling.className = "error";
//     evt.preventDefault();
//   }
//   if(this.id === "afm" && !this.validity.valueMissing) {
//     if(checkAFM(afm.value)) {
//       this.nextSibling.textContent = 'Μη έγκυρο ΑΦΜ';
//       this.nextSibling.className = "error";
//       evt.preventDefault();
//     }
//   }
// }

[...inputs].forEach((input) =>
  input.addEventListener("input", () => {
    const id = input.id;
    if (id === "afm") {
      if (input.validity.valueMissing) {
        afmError.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
        afmError.className = "error";
      } else if (checkAFM(input.value)) {
        afmError.className = "check";
        afmError.innerHTML = "&#10003;";
      } else {
        afmError.textContent = "Μη έγκυρο ΑΦΜ";
        afmError.className = "error";
      }
    } else if (id === "age") {
      if (input.validity.valueMissing) {
        input.nextSibling.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
        input.nextSibling.className = "error";
      } else if (input.validity.patternMismatch) {
        input.nextSibling.textContent =
          "Η ηλικία πρέπει να είναι αριθμός μεταξύ 1-150";
        input.nextSibling.className = "error";
      } else {
        input.nextSibling.className = "check";
        input.nextSibling.innerHTML = "&#10003;";
      }
    } else {
      if (input.validity.valueMissing) {
        input.nextSibling.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
        input.nextSibling.className = "error";
      } else {
        input.nextSibling.className = "check";
        input.nextSibling.innerHTML = "&#10003;";
      }
    }
  })
);

// form.addEventListener('input', (ev) => {
//   const id=ev.target.id;
//   if(id==="name")
// })

form.addEventListener("submit", function (evt) {
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.validity.valueMissing) {
      input.nextSibling.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
      input.nextSibling.className = "error";
      evt.preventDefault();
    } else if (input.id === "afm") {
      if (!checkAFM(input.value)) {
        input.nextSibling.textContent = "Μη έγκυρο ΑΦΜ";
        input.nextSibling.className = "error";
        evt.preventDefault();
      }
    } else if (input.id === "age") {
      if(input.validity.patternMismatch) {
        input.nextSibling.textContent =
          "Η ηλικία πρέπει να είναι αριθμός μεταξύ 1-150";
        input.nextSibling.className = "error";
        evt.preventDefault();
      }
    }
  }
});
