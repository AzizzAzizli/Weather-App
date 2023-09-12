



function convertToUpperCase() {
    $("input").val($("input").val().toUpperCase());
}
$("button").on("click", async function(){
    getData($("input").val()  )
    $("input").val("")
    await render()
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

    }

 }

function render(weather){
 const {weather:[{main,description}],main:{temp},wind:{speed} ,sys:{country},name } = weather
console.log(main,description,temp,speed,country,name);
$(".content").html(`<p class="h1 fw-bold">${name}/${country}</p>
<p class="h1 fw-medium">${temp} C°</p>
<p class="h2 ">${main}</p>
<p class="h5 "> Wind speed: ${speed} m/s</p>`)
$(".content").removeClass("d-none")

}
