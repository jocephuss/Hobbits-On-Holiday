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
    .addEventListener("DOMContentLoaded", function () {
      const baddieImage = document.getElementById("#baddie-image");
      const baddieUrl = baddieStats.pop();
      baddieImage.img((src = "https://www.dnd5eapi.co${baddieUrl}"));
    });

  document.getElementById("dice-button").addEventListener("click", function () {
    const d20roll = dice.roll();
    const d20RollElement = document.getElementById(".d20-roll");
    d20RollElement.textContent = d20roll;
  });

  const response = fetch("/api/encounter", {
    method: "POST",
    body: JSON.stringify({
      baddieStats: baddieStats,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return baddieStats;
}
