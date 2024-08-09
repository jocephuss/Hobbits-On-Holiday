document.getElementById('character-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const characterClass = document.getElementById('class').value;
  
    const characterElement = document.createElement('div');
    characterElement.className = 'character';
    characterElement.innerText = `${name} the ${characterClass}`;
    
    document.getElementById('map').appendChild(characterElement);
  
    // Make the character draggable
    characterElement.draggable = true;
    characterElement.addEventListener('dragstart', dragStart);
    characterElement.style.top = '50px'; // Default position
    characterElement.style.left = '50px'; // Default position
  });
  
  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  document.getElementById('map').addEventListener('dragover', function(event) {
    event.preventDefault();
  });
  
  document.getElementById('map').addEventListener('drop', function(event) {
    event.preventDefault();
    
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const offsetX = event.clientX - draggableElement.offsetWidth / 2;
    const offsetY = event.clientY - draggableElement.offsetHeight / 2;
    
    draggableElement.style.left = `${offsetX}px`;
    draggableElement.style.top = `${offsetY}px`;
  });