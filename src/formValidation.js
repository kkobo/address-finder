import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { getCoords } from ".";

require('../styles/reset.css');
require('../styles/style.css');

const addressExists = document.getElementsByClassName("addressExists")[0];
const inputForm = document.getElementsByTagName("form")[0];
const inputs = document.querySelectorAll(".input input");

//Firebase configuration
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

//Function for saving data to firebase
function savePerson({name, surname, afm, street, number, area, age}) {
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
        input.nextSibling.className = "check";
        input.nextSibling.innerHTML = "&#10003;";
      } else {
        input.nextSibling.textContent = "Μη έγκυρο ΑΦΜ";
        input.nextSibling.className = "error";
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
    personData[input.name] = input.value.trim();
  }

  const spans = document.querySelectorAll(".check");
  
  if (spans.length < 7) return; //Check if all fields are valid by counting the green ticks
  else {
    const address = `${personData.street} ${personData.number}, ${personData.area}`;

    savePerson(personData);    
    
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

  //Empty the form 
  for (let i = 0; i < spans.length; i++) {
      spans[i].innerHTML = "";
    }
    evt.target.reset();
  }
});
