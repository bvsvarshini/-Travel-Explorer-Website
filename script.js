const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const imageGallery = document.getElementById("imageGallery");
const weatherInfo = document.getElementById("weatherInfo");

const UNSPLASH_ACCESS_KEY = "7O0N4Z8iLKLbV-n43pCHTFRL_9aR8IC9dPr_RAczKjk";
const WEATHER_API_KEY = "0390703eae05d34570d77d55a1e46db8";

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
    fetchWeather(query);
  } else {
    alert("Please enter a destination!");
  }
});

async function fetchImages(query) {
  imageGallery.innerHTML = "<p style='text-align:center;'>Loading images...</p>";
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=6&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    imageGallery.innerHTML = "";
    if (data.results.length === 0) {
      imageGallery.innerHTML = "<p style='text-align:center;'>No images found.</p>";
      return;
    }
    data.results.forEach(img => {
      const imageElement = document.createElement("img");
      imageElement.src = img.urls.regular;
      imageElement.alt = query;
      imageGallery.appendChild(imageElement);
    });
  } catch (err) {
    imageGallery.innerHTML = "<p style='text-align:center;'>Error fetching images.</p>";
  }
}

async function fetchWeather(city) {
  weatherInfo.innerHTML = "<p>Loading weather...</p>";
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    if (data.cod !== 200) {
      weatherInfo.innerHTML = `<p>Weather not found for "${city}".</p>`;
      return;
    }

    weatherInfo.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌤️ ${data.weather[0].description}</p>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    weatherInfo.innerHTML = "<p>Error fetching weather info.</p>";
  }
}
