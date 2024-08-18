

    

document
    .querySelectorAll('#encounter').forEach((button) => {
        button.addEventListener('click', async function () {
            console.log('Encounter form submitted')
            const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
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
 ]
const thisBaddie = possibleBaddies[Math.floor(Math.random() * possibleBaddies.length)];

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

  // Fetch the baddie data from the API and save it to the database for later
try {
  const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${thisBaddie}`, requestOptions);
  const data = await response.json();

  const baddieImage = data.image;
  const baddieName = data.name;
  const baddieHitPoints = data.hit_points;

  // Create a new baddie instance and save it to the database
  const baddie = {
    name: baddieName,
    image: baddieImage,
    hitPoints: baddieHitPoints,
    
  };
  console.log(`Baddie fetched: ${baddie.name}`);
  const postRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      baddie
    })
  };
  const postResponse = await fetch('/api/encounter', postRequestOptions);
  const postData = await postResponse.json();
  console.log(`Encounter saved: ${baddieName}, Response: ${JSON.stringify(postData)}`);
} catch (error) {
  console.error('Error fetching baddie data:', error);
}
  });
   
    });
