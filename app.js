const apiKey = "06b1087899594d50d1320bad71701432";

//dom
const btn = document.getElementById("btn");
const userInput = document.getElementById("userInput");
const icon = document.getElementById("img");
const cityName = document.getElementById("city");
const currentTemp = document.getElementById("curTemp");
const feels = document.getElementById("feels");
const max = document.getElementById("max");
const min = document.getElementById("min");
const weatherType = document.getElementById("weatherType");

const card = document.getElementById("card");

btn.addEventListener("click", async function (e) {
  //if(in)
  if (userInput.value != "") {
    e.preventDefault();
    try {
      const input = userInput.value.trim();

      const config = { params: { q: input, appid: apiKey, units: "metric" } };

      const weatherRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        config
      );
      const Data = weatherRes.data;

      card.classList.remove("d-none");
      cityName.innerText = `${Data.name}, ${Data.sys.country}`;
      let Temp = Data.main;
      currentTemp.innerText = Temp.temp;
      feels.innerText = Temp.feels_like;
      max.innerText = Temp.temp_max;
      min.innerText = Temp.temp_min;
      weatherType.innerText = Data.weather[0].description;
      icon.src = ` http://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png`;
    } catch (err) {
      document.querySelector("body").firstElementChild.classList.add("d-none");
      const errCnt = document.getElementById("errCnt");
      const h2 = document.getElementById("errorMsg");
      console.dir(h2);
      errCnt.classList.remove("d-none");
      errCnt.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );
      h2.innerText = `${err.response.statusText}! ${err.response.status}`;
      h2.classList.add("text-danger");
      console.log(err);
      console.log(errCnt);
    }
  } else {
    alert("please enter city name".toUpperCase());
  }
});
