document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  let map = L.map("map", {
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
    minZoom: 1.5,
    maxZoom: 4,
    zoomSnap: 0.1,
  });

  // Dimensions of the image
  let w = 3000,
    h = 2000;

  // Calculate bounds
  let southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  let northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  let bounds = new L.LatLngBounds(southWest, northEast);

  // Add image overlay to the map
  L.imageOverlay(
    "https://th.bing.com/th/id/R.ccccafc47d41cd7bfd18be4aa785a610?rik=cEtkH%2blT97GXIg&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f5d3f5ab4e0b0f80001519db3%2f5da64563e5f12b771ef050bf%2f60f9e7709e2b4e2d0498ff9e%2f1626990468176%2fCFC24B4A-AB8B-49A6-A53A-EC69C297D9DE.jpeg%3fformat%3d1500w&ehk=RMTy5DPoAsHh7tu89iAtom%2bmYHbg61DVZrwoSuUNVcM%3d&risl=&pid=ImgRaw&r=0",
    bounds
  ).addTo(map);

  // Fit map to the image bounds
  map.fitBounds(bounds);

  // Add a marker when a character is created
  document
    .getElementById("character-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      let characterName = document.getElementById("character-name").value;
      let characterType = document.getElementById("character-type").value;

      let marker = L.marker(map.getCenter(), {
        draggable: true,
      }).addTo(map);

      marker
        .bindPopup(`<b>${characterName}</b><br>${characterType}`)
        .openPopup();
    });
});
