import { getCoords } from "./index.js";
require('../styles/reset.css');
require('../styles/style.css');

const searchResults = document.getElementById("searchResults")

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


searchResults.addEventListener('click', function(evt) {

  // Get the modal
const modal = document.getElementById("myModal")

// Open the modal
modal.style.display = "flex";
modal.style.flexDirection = "column";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
const modalText = [...modal.getElementsByTagName("p")];
modalText.forEach(paragraph => paragraph.remove());

const person = evt.target;
if(person.tagName === "LI"){
const address = person.innerText.match(/Διεύθυνση:(.*),/)[1].trim();
const name = person.innerText.match(/Όνομα: (.*?),/)[1].trim();
const surname = person.innerText.match(/Επώνυμο: (.*?),/)[1].trim();
const afm = person.innerText.match(/ΑΦΜ: (.*?)$/m)[1].trim();
const age= person.innerText.match(/Ηλικία: (.*?)$/)[1].trim();


const map = document.getElementById("map");

map.insertAdjacentHTML('beforebegin',`<p>Όνομα: ${name}</p><p>Επώνυμο: ${surname}</p><p>Διεύθυνση: ${address}</p><p>ΑΦΜ: ${afm}</p><p>Ηλικία: ${age}</p>`);

(async function () {
    
    const coords = await getCoords(address) || { lat: 0, lng: 0 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: coords,
    });
    
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
    });
  })();
}})


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  document.getElementById("myModal").style.display = "none";
  }
  
//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target !== modal) {
//       modal.style.display = "none";
//     }
//   }



