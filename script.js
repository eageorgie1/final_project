const mapElement = document.querySelector("#map");

// статус и координати
const statusText = document.querySelector("#status");
const coordinatesText = document.querySelector("#coordinates");

const updateStatus = (message) => {
  statusText.textContent = `Status: ${message}`;
};

// градове
const cities = [
  { name: "Sofia", longitude: 23.3219, latitude: 42.6977, zoom: 13 },
  { name: "Plovdiv", longitude: 24.7453, latitude: 42.1354, zoom: 13 },
  { name: "Varna", longitude: 27.9147, latitude: 43.2141, zoom: 13 },
  { name: "Burgas", longitude: 27.4678, latitude: 42.5048, zoom: 13 },
  { name: "Ruse", longitude: 25.9547, latitude: 43.8356, zoom: 13 }
];

// функция за местене
const goToCity = async (city) => {
  await mapElement.goTo({
    center: [city.longitude, city.latitude],
    zoom: city.zoom
  });

  updateStatus(`Moved to ${city.name}`);
};

// бутони
document.querySelector("#sofiaBtn").addEventListener("click", () => goToCity(cities[0]));
document.querySelector("#plovdivBtn").addEventListener("click", () => goToCity(cities[1]));
document.querySelector("#varnaBtn").addEventListener("click", () => goToCity(cities[2]));

document.querySelector("#resetBtn").addEventListener("click", () => {
  mapElement.goTo({
    center: [25.4858, 42.7339],
    zoom: 7
  });

  updateStatus("View reset");
});

// zoom
document.querySelector("#zoomInBtn").addEventListener("click", () => {
  mapElement.zoom++;
  updateStatus("Zoomed in");
});

document.querySelector("#zoomOutBtn").addEventListener("click", () => {
  mapElement.zoom--;
  updateStatus("Zoomed out");
});

// basemap
document.querySelector("#basemapSelect").addEventListener("change", (event) => {
  mapElement.basemap = event.target.value;
  updateStatus("Basemap changed");
});

// координати при клик
mapElement.addEventListener("arcgisViewClick", (event) => {
  const mapPoint = event.detail.mapPoint;

  const lon = mapPoint.longitude.toFixed(4);
  const lat = mapPoint.latitude.toFixed(4);

  coordinatesText.textContent = `Longitude: ${lon}, Latitude: ${lat}`;
  updateStatus("Coordinates selected");
});

// 🔥 ТЪРСЕНЕ (кирилица + латиница)
document.querySelector("#searchBtn").addEventListener("click", () => {
  const input = document.querySelector("#cityInput").value.trim().toLowerCase();

  const cityNames = {
    "sofia": "Sofia",
    "софия": "Sofia",

    "plovdiv": "Plovdiv",
    "пловдив": "Plovdiv",

    "varna": "Varna",
    "варна": "Varna",

    "burgas": "Burgas",
    "бургас": "Burgas",

    "ruse": "Ruse",
    "русе": "Ruse"
  };

  const cityName = cityNames[input];

  const foundCity = cities.find(city => city.name === cityName);

  if (foundCity) {
    goToCity(foundCity);
  } else {
    updateStatus("City not found");
    alert("City not found");
  }
});
