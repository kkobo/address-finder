export async function getCoords(loc) {
try {
const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json',
{
  params: {
  address: loc , 
  key: 'AIzaSyAJx2YoU7kJgWzz6vzxeN_Prj_tIBZKb2Q'
}
});

if (response.data.status === 'ZERO_RESULTS') {
  return null;
  } else {
  const coords = response.data.results[0].geometry.location;
  
  return coords;
} 

}
catch(e) {
 console.log(e)
}
}
