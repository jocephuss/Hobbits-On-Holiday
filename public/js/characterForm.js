document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to load before running JavaScript
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
  let bounds = new L.LatLngBounds(southWest, northEast); // Define the map bounds

  L.imageOverlay(
    "https://th.bing.com/th/id/R.ccccafc47d41cd7bfd18be4aa785a610?rik=cEtkH%2blT97GXIg&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f5d3f5ab4e0b0f80001519db3%2f5da64563e5f12b771ef050bf%2f60f9e7709e2b4e2d0498ff9e%2f1626990468176%2fCFC24B4A-AB8B-49A6-A53A-EC69C297D9DE.jpeg%3fformat%3d1500w&ehk=RMTy5DPoAsHh7tu89iAtom%2bmYHbg61DVZrwoSuUNVcM%3d&risl=&pid=ImgRaw&r=0",
    bounds
  ).addTo(map); // Add the map image as an overlay

  map.fitBounds(bounds);

  // Handle character creation
  document
    .getElementById("character-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      // Get the character's name and type from the form inputs and send a POST request to the API endpoint

      let characterName = document
        .getElementById("character-name")
        .value.trim();
      let characterType = document
        .getElementById("character-type")
        .value.trim();
      // Example: fetch("/api/character", { method: "POST",... });

      const response = await fetch("/api/character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, // Add request body for character data
        body: JSON.stringify({
          name: characterName,
          type: characterType,
        }),
      });

      if (response.ok) {
        // Character creation was successful
        const newCharacter = await response.json();

        // Display character details in the div
        document.getElementById("display-name").innerText = newCharacter.name;
        document.getElementById("display-type").innerText = newCharacter.type;

        document.getElementById("character-details").style.display = "block";
        document.getElementById("character-form").style.display = "none";

        // Create a new character div dynamically
        const characterDiv = document.createElement("div");
        characterDiv.className = "character-card";
        characterDiv.id = `character-${newCharacter.id}`;
        characterDiv.innerHTML = `
          <p>Name: ${newCharacter.name}</p>
          <p>Type: ${newCharacter.type}</p>
          <button class="place-character" data-id="${newCharacter.id}">Place on Map</button>
          <button class="delete-character" data-id="${newCharacter.id}">Delete Character</button>
        `;

        // Append the new character div to the existing characters container
        document
          .getElementById("existing-characters")
          .appendChild(characterDiv);

        // Add event listeners for the new buttons
        characterDiv
          .querySelector(".place-character")
          .addEventListener("click", function () {
            // Place character on the map
            let marker = L.marker(map.getCenter(), {
              draggable: true,
            }).addTo(map);

            marker
              .bindPopup(`<b>${newCharacter.name}</b><br>${newCharacter.type}`)
              .openPopup();
            // Update the character's position in the database when the marker is dragged

            fetch(`/api/character/${newCharacter.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                position: marker.getLatLng(),
              }),
            });

            document.getElementById("map").style.display = "block";
          });

        characterDiv
          .querySelector(".delete-character")
          .addEventListener("click", async function () {
            // Delete character from the database and the map
            const characterId = newCharacter.id;

            const confirmDelete = confirm(
              // Confirm deletion
              "Are you sure you want to delete this character?"
            );
            if (!confirmDelete) return;

            const deleteResponse = await fetch(
              `/api/character/${characterId}`,
              {
                // Delete character from the database
                method: "DELETE",
              }
            );

            if (deleteResponse.ok) {
              characterDiv.remove(); // Remove the character div from the DOM
              alert("Character deleted successfully!");
            } else {
              alert("Failed to delete character.");
            }
          });

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
              }, // Send the updated position to the API
              body: JSON.stringify({
                name: characterName,
                type: characterType,
              }),
            });

            document.getElementById("map").style.display = "block";
          });
      } else {
        alert("Failed to save character.");
      }
    });

  // Handle placing existing characters on the map
  document.querySelectorAll(".place-character").forEach((button) => {
    // Add event listener for placing existing characters on the map
    button.addEventListener("click", async function () {
      // Get the character ID from the button data attribute
      const characterId = this.getAttribute("data-id"); // Fetch the character's data from the API using the character ID
      const response = await fetch(`/api/character/${characterId}`); // Check if the response is OK

      if (response.ok) {
        const character = await response.json();

        let marker = L.marker(map.getCenter(), {
          // This line creates a new marker at the center of the map
          draggable: true,
        }).addTo(map);

        marker
          .bindPopup(`<b>${character.name}</b><br>${character.type}`)
          .openPopup(); // Open the popup

        fetch(`/api/character/${character.id}`, {
          // Update character's position in the database
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position: marker.getLatLng(),
          }),
        });
        // Display the map

        document.getElementById("map").style.display = "block";
      }
    });
  });

  // Handle deleting characters
  document.querySelectorAll(".delete-character").forEach((button) => {
    // Add event listener for deleting characters
    button.addEventListener("click", async function () {
      // Get the character ID from the button data attribute
      const characterId = this.getAttribute("data-id");

      const confirmDelete = confirm(
        "Are you sure you want to delete this character?"
      );
      if (!confirmDelete) return;

      const response = await fetch(`/api/character/${characterId}`, {
        method: "DELETE",
      });
      // Check if the character was successfully deleted

      if (response.ok) {
        document.getElementById(`character-${characterId}`).remove(); // Remove the character div from the DOM
        alert("Character deleted successfully!");
      } else {
        alert("Failed to delete character.");
      }
    });
  });
});
