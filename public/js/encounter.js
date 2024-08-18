


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
const thisBaddie = possibleBaddies[Math.floor(Math.random() * possibleBaddies.length + 1)];

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://www.dnd5eapi.co/api/monsters/dryad`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const result = data;
    console.log(result);
    const baddieImage = `https://www.dnd5eapi.co${result.image}`;
    const baddieName = result.name;
    const baddieHitPoints = result.hit_points;
    console.log(baddieImage);
    renderTemplate({baddieImage, baddieHitPoints, baddieName }); ;
    


    function renderTemplate(baddieImage, baddieHitPoints, baddieName) {
      console.log('you hit the renderTemplate function');
      const context = { baddieImage, baddieHitPoints, baddieName };
      const template = Handlebars.compile(`
        <img src='{{baddieImage}}' alt='{{baddieName}}'>
        <h2>{{baddieName}}</h2>
        <p>Hit Points: {{baddieHitPoints}}</p>
      `);
      const html = template(context);
      document.getElementById('baddie').innerHTML = html;
        }})

  .catch((error) => console.error(error));
    })
});
    

