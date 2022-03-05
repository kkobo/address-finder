import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  query,
  equalTo,
  orderByChild,
  get,
} from "firebase/database";

require('../styles/reset.css');
require('../styles/style.css');

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
const db = getDatabase(app);

const searchForm = document.querySelector(".searchForm");
const searchResults = document.getElementById("searchResults");


searchForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const searchField = document.getElementById("searchField");

  const searchChoice = document.querySelector(
    'input[name="searchChoice"]:checked'
  ).value;

  const personQuery = query(
    ref(db, "users"),
    orderByChild(`${searchChoice}`),
    equalTo(`${searchField.value}`)
  );

 get(personQuery).then((snapshot) => {
	 const personsObj = snapshot.val();

  searchResults.innerHTML = "";
	for(let personKey in personsObj) {
    const {name, surname, afm, street, number, area, age} = personsObj[personKey];

	searchResults.innerHTML += `<li > Όνομα: ${name}, &nbsp; Επώνυμο: ${surname}, &nbsp; ΑΦΜ: ${afm} <br> 
	Διεύθυνση: ${street} ${number}, ${area}, &nbsp; Ηλικία: ${age}</li>`
	}
})
  evt.target.reset();
});