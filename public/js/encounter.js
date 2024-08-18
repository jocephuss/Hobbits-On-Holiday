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
      possibleBaddies[Math.floor(Math.random() * possibleBaddies.length + 1)];

    fetch("https://www.dnd5eapi.co/api/monsters/dryad", requestOptions)
      .then(function (response) {
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        // Parse the response as JSON
        return response.json();
      })
      .then(function (data) {
        console.log(data.index);
        filterData(data);
      })
      .catch(function (error) {
        // add this to the dom somewhere
        console.error(error);
      });
  });
});

function filterData(data) {
  const name = data.name;
  const size = data.size;
  const type = data.type;
  const alignment = data.alignment;
  const ac = data.ac;
  const hitPoints = data.hit_points;
  const hitDice = data.hit_dice;
  const speed = data.speed;
  const strength = data.strength;
  const abilities = data.abilities;
  const proficiencies = data.proficiencies;
  const challengeRating = data.challenge_rating;
  const baddieUrl = data.image;
  const baddieStats = [
    name,
    size,
    type,
    alignment,
    ac,
    hitPoints,
    hitDice,
    speed,
    strength,
    abilities,
    proficiencies,
    challengeRating,
    baddieUrl,
  ];
  console.log(baddieStats);
  document
    .getElementById("baddieImage")
    .addEventListener("DOMContentLoaded", async function () {
      const baddieImage = document.getElementById("#baddie-image");
      const baddieUrl = baddieStats.pop();
      baddieImage.img((src = `https://www.dnd5eapi.co${baddieUrl}`));
    });

  document
    .getElementById("dice-button")
    .addEventListener("click", async function () {
      console.log("You roll");
      const d20 = [];
      for (let i = 0; i < 20; i++) {
        d20[i] = i + 1;
      }
      const d20roll = d20[Math.floor(Math.random() * 20)];
      console.log(d20roll);
      // const d20RollElement = document.querySelectorAll("#d20-roll");
      // d20RollElement.textContent(d20roll);

      // const response = await fetch("/api/encounter", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     baddieStats: baddieStats,
      //     // position: marker.getLatLng(), // Ensure this sends {lat: x, lng: y}
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // });
      document.location.replace("/character"); // Redirect to character creation page
      return baddieStats, d20roll;
    });
}
