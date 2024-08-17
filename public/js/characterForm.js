document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  let map = L.map("map", {
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
    minZoom: 1.5,
    maxZoom: 4,
    zoomSnap: 0.1,
  }); // Create a simple map centered at 0,0, with a maximum zoom level of 4

  let w = 3700,
    h = 2200; // Set the dimensions of the map image

  let southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  let northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  let bounds = new L.LatLngBounds(southWest, northEast); // Create a bounding box for the map image

  L.imageOverlay(
    "https://th.bing.com/th/id/R.ccccafc47d41cd7bfd18be4aa785a610?rik=cEtkH%2blT97GXIg&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f5d3f5ab4e0b0f80001519db3%2f5da64563e5f12b771ef050bf%2f60f9e7709e2b4e2d0498ff9e%2f1626990468176%2fCFC24B4A-AB8B-49A6-A53A-EC69C297D9DE.jpeg%3fformat%3d1500w&ehk=RMTy5DPoAsHh7tu89iAtom%2bmYHbg61DVZrwoSuUNVcM%3d&risl=&pid=ImgRaw&r=0",
    bounds
  ).addTo(map); // Add the map image to the map

  map.fitBounds(bounds); // Fit the map to the map image bounds

  // Handle character creation
  document
    .getElementById("character-form") // Get the character form
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent form submission

      let characterName = document // Get character name and type from the form
        .getElementById("character-name")
        .value.trim();
      let characterType = document // Get character type from the form
        .getElementById("character-type")
        .value.trim();

      const response = await fetch("/api/character", {
        // Send POST request to create a new character
        method: "POST",
        headers: {
          // Set request headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Send JSON object with character name and type
          name: characterName,
          type: characterType,
          position: {x:0, y:0}
        }),
      });
 
      if (response.ok) {
        const newCharacter = await response.json(); // Get the new character from the response

        // Append new character to the existing characters section
        const existingCharacters = document.getElementById(
          "existing-characters"
        ); // Get the existing characters section
        const characterDiv = document.createElement("div");
        characterDiv.className = "character-card";
        characterDiv.id = `character-${newCharacter.id}`;
        characterDiv.innerHTML = `
          <p>Name: ${newCharacter.name}</p>
          <p>Type: ${newCharacter.type}</p>
          <button class="place-character" data-id="${newCharacter.id}">Place on Map</button>
          <button class="delete-character" data-id="${newCharacter.id}">Delete</button>
        `;
        existingCharacters.appendChild(characterDiv); // Append the new character to the existing characters section

        // Add event listeners to the newly created buttons
        characterDiv
          .querySelector(".place-character")
          .addEventListener("click", function () {
            let marker = L.marker(map.getCenter(), {
              draggable: true,
            }).addTo(map); // Create a draggable marker at the center of the map

            marker
              .bindPopup(`<b>${newCharacter.name}</b><br>${newCharacter.type}`)
              .openPopup();
            // Add event listener to the marker's dragend event to update the character's position

            fetch(`/api/character/${newCharacter.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              }, // Set request headers
              body: JSON.stringify({
                position: marker.getLatLng(),
              }),
            }); // Send PUT request to update the character's position

            document.getElementById("map").style.display = "block";
          });

        characterDiv // Get the delete button for the new character
          .querySelector(".delete-character")
          .addEventListener("click", async function () {
            const characterId = newCharacter.id; // Get the character ID from the button

            const confirmDelete = confirm(
              "Are you sure you want to delete this character?"
            ); // Confirm deletion
            if (!confirmDelete) return;

            const deleteResponse = await fetch(
              `/api/character/${characterId}`,
              {
                method: "DELETE",
              }
            ); // Send DELETE request to delete the character

            if (deleteResponse.ok) {
              characterDiv.remove();
              alert("Character deleted successfully!");
            } else {
              alert("Failed to delete character.");
            }
          }); // Add event listener to the delete button for the new character
      } else {
        alert("Failed to save character.");
      }
    });

  // Handle placing existing characters on the map
  document.querySelectorAll(".place-character").forEach((button) => {
    button.addEventListener("click", async function () {
      const characterId = this.getAttribute("data-id");
      const response = await fetch(`/api/character/${characterId}`);

      if (response.ok) {
        // Get the character from the response
        const character = await response.json();

        let marker = L.marker(map.getCenter(), {
          draggable: true,
        }).addTo(map); // Create a draggable marker at the center of the map

        marker
          .bindPopup(`<b>${character.name}</b><br>${character.type}`)
          .openPopup(); // Add event listener to the marker's dragend event to update the character's position

        fetch(`/api/character/${character.id}`, {
          method: "PUT",
          headers: {
            // Set request headers
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position: marker.getLatLng(),
          }),
        }); // Send PUT request to update the character's position

        document.getElementById("map").style.display = "block";
      }
    });
  }); // Add event listeners to the place buttons for existing characters

  // Handle deleting characters
  document.querySelectorAll(".delete-character").forEach((button) => {
    button.addEventListener("click", async function () {
      const characterId = this.getAttribute("data-id"); // Get the character ID from the button

      const confirmDelete = confirm(
        "Are you sure you want to delete this character?"
      );
      if (!confirmDelete) return; // Confirm deletion

      const response = await fetch(`/api/character/${characterId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const characterElement = document.getElementById(
          `character-${characterId}`
        );
        if (characterElement) {
          characterElement.remove();
          alert("Character deleted successfully!");
        } else {
          alert("Character element not found.");
        }
      } else {
        alert("Failed to delete character.");
      }
    });
  });
});
// the prupose of this files is to handle the front-end logic for the character creation, placement, and deletion features of the Hobbits on Holiday app.
// It communicates with the server using AJAX requests to perform CRUD operations on the characters.
