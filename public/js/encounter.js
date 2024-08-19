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
  console.log(`Baddie URL: ${baddieStats.baddieUrl}`);
  // Create HTML content for the baddie details
  if(!baddieStats.baddieUrl) {
    console.log('this baddie aint gots no url');
    console.log('====================');
    
    baddieStats.baddieUrl = './public/images/Nazgul.jpg'
    console.log(`Replacement URL: ${baddieStats.baddieUrl}`);
} else {
  baddieUrl = `https://www.dnd5eapi.co${baddieStats.baddieUrl}`
return baddieStats.baddieUrl;
};
  const encounterHtml = `
    <div class="baddie-details">
      <h4>Encounter: ${baddieStats.name}</h4>
      <img src= './public/images/Nazgul.jpg', alt=${baddieStats.name}>;
      
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
document.querySelectorAll("#d20").forEach((button) => {
  button.addEventListener("click", async function () {
    console.log("You roll");
    const d20Card = button.closest(".d20-button");
    let d20Value = document.querySelector(".d20-roll");
    const d20 = [];

    for (let i = 0; i < 20; i++) {
      d20[i] = i + 1;
    }

    const d20roll = d20[Math.floor(Math.random() * 20)];
    console.log(d20roll);
    const diceHTML = `
<div class="dice-roll">
  <p class="dice-text">You rolled a ${d20roll}!</p>
  </div>
  `;

    if (d20Value) {
      d20Value.innerHTML = diceHTML;
      // d20Value.innerHTML += diceHTML;
    }
  });
});
