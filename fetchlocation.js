//add {location} in header
//add <span id="location"></span> in body where to place 

const apiKey="AIzaSyCVztCcC_Bb0lHUVhOXFl-0B8WB4v4avNg";function updateMeta(t){console.log("Updating meta with city:",t);let e=document.title,o=e.replace("{location}",t);document.title=o;let i=document.querySelector('meta[name="description"]');if(i){let n=i.getAttribute("content"),r=n.replace("{location}",t);i.setAttribute("content",r)}let a=document.querySelector('meta[name="keywords"]');if(a){let s=a.getAttribute("content"),l=s.replace("{location}",t);a.setAttribute("content",l)}let c=document.getElementById("location");c&&(c.innerHTML=t)}function getCityFromCoordinates(t,e){let o=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${t},${e}&key=AIzaSyCVztCcC_Bb0lHUVhOXFl-0B8WB4v4avNg`;fetch(o).then(t=>{if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{if(t.results&&t.results.length>0){let e=t.results[0].address_components,o=e.find(t=>t.types.includes("locality")),i=o?o.long_name:"India";updateMeta(i)}else console.error("No results found in the response. Using default city."),updateMeta("India")}).catch(t=>{console.error("Error fetching city data:",t),updateMeta("India")})}function getCityFromIP(){console.log("Fetching city from IP address"),fetch("https://ipinfo.io/json?token=12078219f8bd1b").then(t=>t.json()).then(t=>{t.city?(console.log("City found from IP address:",t.city),updateMeta(t.city)):(console.error("City not found in the response from IP. Using default city."),updateMeta("India"))}).catch(t=>{console.error("Error fetching city data from IP:",t),updateMeta("India")})}function getCity(){navigator.geolocation?(console.log("Attempting to fetch city using geolocation"),navigator.geolocation.getCurrentPosition(t=>{let e=t.coords.latitude,o=t.coords.longitude;getCityFromCoordinates(e,o)},t=>{console.error("Error getting geolocation:",t),getCityFromIP()})):(console.log("Geolocation is not supported by this browser. Using IP-based city lookup."),getCityFromIP())}getCity();