$(document).ready(function() {

    window.onload = async function () {
        try{
            await getData("Baku")
            render()
        }catch(err){
            // console.log(err);
        }
     
      };



    $("input").on("keydown",  function(e){
        try{
            if(e.key=="Enter"){
                getData($("input").val().trim())
                $("input").val("")
             render()
            }
        }catch(err){
            // console.log(err);
        }
            
        })


function convertToUpperCase() {
    $("input").val($("input").val().toUpperCase());
}

    $("input").on('input', convertToUpperCase);


$("img").on("click", async function(){
    try{
        getData($("input").val().trim() )
        $("input").val("")
     await render()
    }catch(err){
        // console.log(err);
    }
    

})

 async function getData(city){
    try{
        let respons=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=addeebf98ad3829186f35c693f6fa4d0&units=metric&lang=en`)
        let data=  respons.json()
        
        // console.log(await data);
        let weather= await data
        // console.log(weather);
        render(weather)
        return   weather

    } catch(error){
// console.log(error);
    }

 }

function render(weather){
    // console.log(weather.cod);
    if(weather.cod=="404"){
        // $("#errorMessage").removeClass("d-none")
      
        // $(".aboutWeather").addClass("d-none")
        $(".aboutWeather").fadeOut("slow");
        setTimeout(function(){
        $("#errorMessage").fadeIn("slow")
         },500)
        return
    }
    setTimeout(function(){
        $(".aboutWeather").fadeIn("slow")
         },500)
    $("#errorMessage").fadeOut("slow")

    // $(".aboutWeather").removeClass("d-none")
    // $("#errorMessage").addClass("d-none")

 const {weather:[{main}],main:{temp,humidity},wind:{speed} ,sys:{country},name } = weather
// console.log(main,description,temp,speed,country,name);
$(".aboutWeather").html(`  <p class=" ">${main}</p>
<p class="">${Math.round(temp)} C°</p>
  <p class="">${name}/${country}</p>

 <div class="d-flex justify-content-between"> 
  <p class="h5">Humidity: ${humidity}%</p>
  <p class="h5"> Wind speed: ${speed}m/s</p>
 </div>`)
$(".content").removeClass("d-none")

}
});