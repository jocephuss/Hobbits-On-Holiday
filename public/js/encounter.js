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
        renderBaddie(characterCard, data); // Render the encounter data to the card
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});

function renderBaddie(characterCard, data) {
  const baddieImage = data.image;

  if (!baddieImage) {
    baddieURL = "../images/nazgul.jpg";
  } else {
    baddieURL = `https://www.dnd5eapi.co${baddieImage}`;
  }
  const baddieStats = {
    baddieName: data.name,
    baddieIndex: data.index,
    baddieURL: baddieURL,
    baddieHP: data.hit_points,
    speed: { walk: data.speed.walk || data.speed },
    challengeRating: data.challenge_rating,
    position: { x: 0, y: 0 },
  };
  const baddieName = baddieStats.baddieName;

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
    <div class="baddie-details" id="baddie-details">
      <h4>Encounter: </h4><h4 id="baddieName">${baddieStats.baddieName}</h4>
      <img src="${baddieStats.baddieURL}" alt="${baddieStats.baddieName}" height ="100px" width="100px"/>
      
      <p>HP: </p><p id="baddie-hp">${baddieStats.baddieHP}</p>
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
    //lower baddie hp by d20roll
    let baddieHP = document.getElementById("baddie-hp").textContent;
    baddieHP = String(baddieHP);
    baddieHP = parseInt(baddieHP);
    baddieHP = baddieHP - d20roll;
    console.log(typeof baddieHP);
    console.log(baddieHP);
    document.getElementById("baddie-hp").innerHTML = `${baddieHP}`;
    if (baddieHP <= 0) {
      let baddieName = document.getElementById("baddieName").textContent;
      baddieName = String(baddieName);
      console.log(`${baddieName} Defeated!`);
      document.getElementById(
        "baddie-details"
      ).innerHTML = `<h3>${baddieName} is defeated!</h3>`;
    }
  });
});
