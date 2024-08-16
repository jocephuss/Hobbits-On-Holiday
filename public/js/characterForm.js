document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map (but keep it hidden initially)
  let map = L.map("map", {
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
    minZoom: 1.5,
    maxZoom: 4,
    zoomSnap: 0.1,
  });
  // Set up the image overlay with the provided image URL and bounds

  let w = 3700,
    h = 2200;
  // Convert pixel coordinates to map coordinates using the unproject method of the map object.

  let southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  let northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  let bounds = new L.LatLngBounds(southWest, northEast);
  // Create the image overlay with the provided image URL and bounds

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
      // Validate the character name and type before submitting the form

      let characterName = document
        .getElementById("character-name")
        .value.trim();
      let characterType = document
        .getElementById("character-type")
        .value.trim();
      // Check if the character name and type are not empty

      const response = await fetch("/api/character", {
        // POST request to create a new character
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content-Type header for JSON data
        },
        body: JSON.stringify({
          name: characterName,
          type: characterType,
          position: {x:0, y:0}
        }),
      });
      // If the POST request is successful, display the character details and enable placing on the map

      if (response.ok) {
        const newCharacter = await response.json();

        // Display character details in the div
        //document.getElementById("display-name").innerText = newCharacter.name;
        //document.getElementById("display-type").innerText = newCharacter.type;

        document.getElementById("character-details").style.display = "block";
        document.getElementById("character-form").style.display = "none";

        // Add event listener for placing the character on the map
        document
          .getElementById("generate-token")
          .addEventListener("click", function () {
            let marker = L.marker(map.getCenter(), {
              draggable: true,
            }).addTo(map);

            marker
              .bindPopup(`<b>${newCharacter.name}</b><br>${newCharacter.type}`)
              .openPopup();

            // Update character's position in the database
            fetch(`/api/character/${newCharacter.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: characterName,
                type: characterType,
                // position: marker.getLatLng(), // Ensure this sends {lat: x, lng: y}
              }),
            });

            // Show the map
            document.getElementById("map").style.display = "block";
          });
      } else {
        alert("Failed to save character.");
      }
    });

  // Handle placing existing characters on the map
  document.querySelectorAll(".place-character").forEach((button) => {
    button.addEventListener("click", async function () {
      const characterId = this.getAttribute("data-id");
      const response = await fetch(`/api/character/${characterId}`);
      // If the GET request is successful, display the character details and enable placing on the map

      if (response.ok) {
        const character = await response.json();

        let marker = L.marker(map.getCenter(), {
          draggable: true,
        }).addTo(map);

        marker
          .bindPopup(`<b>${character.name}</b><br>${character.type}`)
          .openPopup();

        // Update character's position in the database
        fetch(`/api/character/${character.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position: marker.getLatLng(), // Ensure this sends {lat: x, lng: y}
          }),
        });

        // Show the map
        document.getElementById("map").style.display = "block";
      }
    });
  });
});
