

document
    .querySelectorAll('#encounter').forEach((button) => {
        button.addEventListener('click', async function () {
            console.log('Encounter form submitted')
            const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};


fetch("https://www.dnd5eapi.co/api/monsters/animated-armor", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const result = data;
    console.log(result);
    console.log(result.url);
})

  .catch((error) => console.error(error));
    })
});
    
  
