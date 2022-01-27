$(document).ready(()=>{
 const api_key = "750495c7010f1899c1029baddb73e3ea";
 const x = $("#temperature-degree");
 const desp = $("#temperature-depscription")
 const contr = $("#country")
 const test = $("#testing")
 let tempUnit = 'celcius';
 
 const TempSign = {
				 	kelvin: "°k",
				 	celcius: "°c",
				 	ferenheit: "°f",
				 	 }
				 	 
const Temp = {
				 	kelvin: (t)=>{return t + TempSign[tempUnit]},
				 	celcius: (t)=>{return (t - 273).toFixed(1) + TempSign[tempUnit]},
				 	ferenheit: (t)=>{return (((t - 273) * 1.8) + 32).toFixed(1) + TempSign[tempUnit]},
				 	 }
				 	 
 
 test.hide()

 
function getLocation() {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(showPosition, Error);
  } else {
    x.text("Geolocation is not supported by this browser.");
  }
}

function Error(error) {
				test.text(error.message);
				test.show()
				
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  

	 getWeatherDetails(lon,lat);

  }
  
function getWeatherDetails(lon,lat) {
				 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
				 .then(response=>{
				 				return response.json();
				 })
				 .then(data=>{
				 		   setFrontEnd(data)
				 		
				 })
				 .catch(function(error){
				      test.text(error);
				      test.show()
				      })
				
}


function setFrontEnd(data){
		const country = data.sys.country;
		const state = data.name;
		const countryCode = `${country}/${state}`;
		
				 	 
		 const description  = data.weather[0].description;
		 
		 
		 
	 contr.text(countryCode);
	 x.text(Temp[tempUnit](data.main.temp));
	 desp.text(description)
	 var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
				 		 				
		$('#wicon').attr('src', iconurl);
				 		 				
		$("#temp-min").text(Temp[tempUnit](data.main.temp_min));
		$("#temp-max").text(Temp[tempUnit](data.main.temp_max));
		$("#temp").text(Temp[tempUnit](data.main.temp))
		
		$("#model-country").text(data.sys.country);
		$("#state").text(data.name);
		$("#datetime").text(data.dt);
		$("#description").text(data.weather[0].main)
		
		
		$("#pressure").text(data.main.pressure + "hPa")
		$("#humidity").text(data.main.humidity + "%")
		
		
		$("#speed").text(data.wind.speed);
		$("#deg").text(data.wind.deg);
		$("#gust").text(data.wind.gust);
		
		$("#summary").modal("show");
}

getLocation();


function autocomplete(){
const list = [ 

                "One", 

                "two", 

                "Three", 

                "Four", 

            ]; 



$("input").autocomplete(
				{
								source:list,
				}
)

$("input").autocomplete("enable")
}
autocomplete();


const gear_icon = $(".bi-gear");

$(".bi-sliders").click(()=>{
 gearAnimate();
  
})

function gearAnimate(){
	 gear_icon.addClass("rotate");
  gsap.to(".bi-gear img",{
  				rotate:360,
  				duration:10,
  },()=>{
  				gearAnimate()
  })
}

$("#sett-sub").click(()=>{
				const newTempUnit = $("#temp-opt").val();
				
				tempUnit = newTempUnit;
 })
 
$(".research").click(()=>{
				getLocation();
})

})
