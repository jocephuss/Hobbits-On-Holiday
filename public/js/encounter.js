document.querySelectorAll("#encounter").forEach((button) => {
  button.addEventListener("click", async function () {
    console.log("Encounter form submitted");

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const possibleBaddies = [
      "animated-armor",
      "brass-dragon-wyrmling",
      "brown-bear",
      "bugbear",
      "copper-dragon-wyrmling",
      "death-dog",
      "dire-wolf",
      "dryad",
      "duergar",
      "giant-hyena",
      "giant-octopus",
      "giant-spider",
      "giant-toad",
      "giant-vulture",
      "harpy",
      "hippogriff",
      "imp",
      "lion",
      "quasit",
      "specter",
      "spy",
      "tiger",
    ];

    const thisBaddie =
      possibleBaddies[Math.floor(Math.random() * possibleBaddies.length)];

    // Fetch data for the randomly selected baddie
    fetch(`https://www.dnd5eapi.co/api/monsters/${thisBaddie}`, requestOptions)
      .then(function (response) {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // Parse the response as JSON
        return response.json();
      })
      .then(function (data) {
        console.log(data.index);
        const characterCard = button.closest(".character-card"); // Find the closest character card
        renderEncounter(characterCard, data); // Render the encounter data to the card
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});

function renderEncounter(characterCard, data) {
  const baddieStats = {
    name: data.name,
    size: data.size,
    type: data.type,
    alignment: data.alignment,
    // ac: data.armor_class, //kept getting [object Object] instead of the actual number
    hitPoints: data.hit_points,
    hitDice: data.hit_dice,
    speed: data.speed,
    strength: data.strength,
    abilities: data.abilities,
    proficiencies: data.proficiencies,
    challengeRating: data.challenge_rating,
    baddieUrl: data.image,
  };

  console.log(baddieStats);

  // Create HTML content for the baddie details
  const encounterHtml = `
    <div class="baddie-details">
      <h4>Encounter: ${baddieStats.name}</h4>
      <img src="https://www.dnd5eapi.co${baddieStats.baddieUrl}" alt="${
    baddieStats.name
  }" />
      <p>Type: ${baddieStats.type}</p>
      
      <p>HP: ${baddieStats.hitPoints}</p>
      <p>Speed: ${baddieStats.speed.walk || baddieStats.speed}</p>
      <p>Challenge Rating: ${baddieStats.challengeRating}</p>
    </div>
  `;
  //  <p>AC: ${baddieStats.ac}</p> //kept getting [object Object] instead of the actual number
  // Append the encounter HTML to the character card
  if (characterCard) {
    characterCard.innerHTML += encounterHtml;
  }
}
