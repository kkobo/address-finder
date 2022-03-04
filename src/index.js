export const addressExists = document.getElementsByClassName("addressExists")[0];

export async function printCoords(loc) {
try {
const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json',
{
  params: {
  address: loc , 
  key: 'AIzaSyAJx2YoU7kJgWzz6vzxeN_Prj_tIBZKb2Q'
}
});

if (response.data.status === 'ZERO_RESULTS') {
  addressExists.textContent = 'Δεν βρέθηκε η διεύθυνση';
  return null;
  } else {
  const coords = response.data.results[0].geometry.location;
  addressExists.innerHTML = `<p>Η διεύθυνσή σας έχει συντεταγμένες (${coords.lat}, ${coords.lng} )</p>`;
  return coords;
} 

}
catch(e) {
 console.log(e)
}
}

// async function initMap() {
//   // The location of Uluru { lat: -25.344, lng: 131.036 };
//  const coords = { lat: -25.344, lng: 131.036 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 14,
//     center: coords,
//   });
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: coords,
//     map: map,
//   });
// }

// initMap()






























