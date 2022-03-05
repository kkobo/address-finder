import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, push } from "firebase/database";
import { getCoords } from ".";

require('../styles/reset.css');
require('../styles/style.css');

const addressExists = document.getElementsByClassName("addressExists")[0];


const firebaseConfig = {
  apiKey: "AIzaSyAJx2YoU7kJgWzz6vzxeN_Prj_tIBZKb2Q",
  authDomain: "geocoding-340713.firebaseapp.com",
  databaseURL:
    "https://geocoding-340713-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "geocoding-340713",
  storageBucket: "geocoding-340713.appspot.com",
  messagingSenderId: "319831745765",
  appId: "1:319831745765:web:857cab84c0c97f0d5ba00c",
};

const app = initializeApp(firebaseConfig);
const usersRef = ref(getDatabase(app), "users");

const inputForm = document.getElementsByTagName("form")[0];

const afmError = document.querySelector("#afm + span");
const submitBtn = document.getElementById("submit-btn");
const inputs = document.querySelectorAll(".input input");

//AFM validation
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

//Send data to firebase
function savePerson(name, surname, afm, street, number, area, age) {
  const newUserRef = push(usersRef);
  set(newUserRef, {
    name: name,
    surname: surname,
    afm: afm,
    street: street,
    number: number,
    area: area,
    age: age,
  });
}

//Event Listeners

[...inputs].forEach((input) =>
  input.addEventListener("input", () => {
    addressExists.textContent= "";
    const id = input.id;

    if (id === "afm") {
      if (checkAFM(input.value)) {
        afmError.className = "check";
        afmError.innerHTML = "&#10003;";
      } else {
        afmError.textContent = "Μη έγκυρο ΑΦΜ";
        afmError.className = "error";
      }
    } else if (id === "age") {
      if (input.validity.patternMismatch) {
        input.nextSibling.textContent =
          "Η ηλικία πρέπει να είναι αριθμός μεταξύ 1-150";
        input.nextSibling.className = "error";
      } else {
        input.nextSibling.className = "check";
        input.nextSibling.innerHTML = "&#10003;";
      }
    } else if (id === "number") {
      if (input.validity.patternMismatch) {
        input.nextSibling.textContent = "Παρακαλώ δώστε αριθμό";
        input.nextSibling.className = "error";
      } else {
        input.nextSibling.className = "check";
        input.nextSibling.innerHTML = "&#10003;";
      }
    } else {
      input.nextSibling.className = "check";
      input.nextSibling.innerHTML = "&#10003;";
    }
    if (input.validity.valueMissing) {
      input.nextSibling.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
      input.nextSibling.className = "error";
    }
  })
);

inputForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let personData = {};
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.validity.valueMissing) {
      input.nextSibling.textContent = "Το πεδίο πρέπει να έιναι συμπληρωμένο";
      input.nextSibling.className = "error";
    } else if (input.id === "afm") {
      if (!checkAFM(input.value)) {
        input.nextSibling.textContent = "Μη έγκυρο ΑΦΜ";
        input.nextSibling.className = "error";
      }
    } else if (input.id === "age") {
      if (input.validity.patternMismatch) {
        input.nextSibling.textContent =
          "Η ηλικία πρέπει να είναι αριθμός μεταξύ 1-150";
        input.nextSibling.className = "error";
      }
    } else if (input.id === "number") {
      if (input.validity.patternMismatch) {
        input.nextSibling.textContent = "Παρακαλώ δώστε αριθμό";
        input.nextSibling.className = "error";
      }
    }
    personData[input.name] = input.value;
  }

  const spans = document.querySelectorAll(".check");
  if (spans.length < 7) return;
  else {
    //Form elements values
    const afm = document.getElementById("afm").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const area = document.getElementById("area").value;
    const age = document.getElementById("age").value;
    const address = `${street} ${number}, ${area}`;

    savePerson(name, surname, afm, street, number, area, age);    
    
    (async function printCoords() {
      try{
      const coords = await getCoords(address);
    if(coords) {
    addressExists.innerHTML = `<p>Η διεύθυνσή σας έχει συντεταγμένες (${coords.lat}, ${coords.lng} )</p>`;
    }
    else {
      addressExists.innerHTML =`<p>Η διεύθυνση δεν βρέθηκε</p>`
    }
  }
  catch(e) {
   console.log(e);
  }
  })();

    for (let i = 0; i < spans.length; i++) {
      spans[i].innerHTML = "";
    }
    evt.target.reset();
  }
});
