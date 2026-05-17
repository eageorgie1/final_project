const mapElement = document.querySelector("#map");

// статус и координати
const statusText = document.querySelector("#status");
const coordinatesText = document.querySelector("#coordinates");

const updateStatus = (message) => {
  statusText.textContent = `Status: ${message}`;
};

// градове (масив от обекти)
const cities = [
  { name: "Sofia", longitude: 23.3219, latitude: 42.6977, zoom: 12 },
  { name: "Plovdiv", longitude: 24.7453, latitude: 42.1354, zoom: 12 },
  { name: "Varna", longitude: 27.9147, latitude: 43.2141, zoom: 12 },
  { name: "Burgas", longitude: 27.4678, latitude: 42.5048, zoom: 12 },
  { name: "Ruse", longitude: 25.9547, latitude: 43.8356, zoom: 12 }
];

// функция за местене към град
const goToCity = (city) => {
  mapElement.goTo({
    center: [city.longitude, city.latitude],
    zoom: city.zoom
  });

  updateStatus(`Moved to ${city.name}`);
};

// бутони
document.querySelector("#sofiaBtn").addEventListener("click", () => {
  goToCity(cities[0]);
});

document.querySelector("#plovdivBtn").addEventListener("click", () => {
  goToCity(cities[1]);
});

document.querySelector("#varnaBtn").addEventListener("click", () => {
  goToCity(cities[2]);
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  mapElement.goTo({
    center: [25.4858, 42.7339],
    zoom: 7
  });

  updateStatus("View reset");
});

// zoom
document.querySelector("#zoomInBtn").addEventListener("click", () => {
  mapElement.zoom = mapElement.zoom + 1;
  updateStatus("Zoomed in");
});

document.querySelector("#zoomOutBtn").addEventListener("click", () => {
  mapElement.zoom = mapElement.zoom - 1;
  updateStatus("Zoomed out");
});

// смяна на basemap
document.querySelector("#basemapSelect").addEventListener("change", (event) => {
  if (event.target.value === "osm") {
    mapElement.basemap = "osm";
  } else {
    mapElement.basemap = "topo";
  }

  updateStatus("Basemap changed");
});

// click координати
mapElement.addEventListener("arcgisViewClick", (event) => {
  const mapPoint = event.detail.mapPoint;

  const lon = mapPoint.longitude.toFixed(4);
  const lat = mapPoint.latitude.toFixed(4);

  coordinatesText.textContent = `Longitude: ${lon}, Latitude: ${lat}`;
  updateStatus("Coordinates selected");
});

// търсене на град
document.querySelector("#searchBtn").addEventListener("click", () => {
  const input = document.querySelector("#cityInput").value.trim().toLowerCase();

  const foundCity = cities.find(
    city => city.name.toLowerCase() === input
  );

  if (foundCity) {
    goToCity(foundCity);
  } else {
    updateStatus("City not found");
    alert("City not found");
  }
});