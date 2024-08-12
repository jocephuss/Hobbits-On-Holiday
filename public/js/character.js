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

  let w = 3700,
    h = 2200;

  let southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  let northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  let bounds = new L.LatLngBounds(southWest, northEast);

  L.imageOverlay(
    "https://th.bing.com/th/id/R.ccccafc47d41cd7bfd18be4aa785a610?rik=cEtkH%2blT97GXIg&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f5d3f5ab4e0b0f80001519db3%2f5da64563e5f12b771ef050bf%2f60f9e7709e2b4e2d0498ff9e%2f1626990468176%2fCFC24B4A-AB8B-49A6-A53A-EC69C297D9DE.jpeg%3fformat%3d1500w&ehk=RMTy5DPoAsHh7tu89iAtom%2bmYHbg61DVZrwoSuUNVcM%3d&risl=&pid=ImgRaw&r=0",
    bounds
  ).addTo(map);

  map.fitBounds(bounds);

  // Handle character creation
  document
    .getElementById("character-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      let characterName = document.getElementById("character-name").value;
      let characterType = document.getElementById("character-type").value;

      let marker = L.marker(map.getCenter(), {
        draggable: true,
      }).addTo(map);

      marker
        .bindPopup(`<b>${characterName}</b><br>${characterType}`)
        .openPopup();

      const response = await fetch("/api/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: characterName,
          type: characterType,
          position: marker.getLatLng(), // Ensure this sends {lat: x, lng: y}
        }),
      });

      if (response.ok) {
        const newCharacter = await response.json();
        marker.options.characterId = newCharacter.id; // Set the ID for future updates
      } else {
        alert("Failed to save character.");
      }
    });
});
