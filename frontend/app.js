let elements = [];
let elementId = 0;

function addClass() {
  const diagram = document.getElementById('diagram');
  const newElement = document.createElement('div');
  newElement.className = 'class-box';
  newElement.id = 'element-' + elementId;
  newElement.innerHTML = `Class ${elementId}`;
  newElement.style.left = '10px';
  newElement.style.top = '10px';
  newElement.draggable = true;
  newElement.ondragstart = (event) => drag(event);
  diagram.appendChild(newElement);
  elements.push({ id: elementId, type: 'class', name: `Class ${elementId}` });
  elementId++;
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const element = document.getElementById(id);
  element.style.left = event.clientX - 50 + 'px';
  element.style.top = event.clientY - 20 + 'px';
}

function allowDrop(event) {
  event.preventDefault();
}

document.getElementById('diagram').ondrop = (event) => drop(event);
document.getElementById('diagram').ondragover = (event) => allowDrop(event);

async function saveDiagram() {
  const response = await fetch('http://127.0.0.1:5000/api/diagrams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(elements)
  });
  const result = await response.json();
  console.log(result);
}

document.getElementById('save').addEventListener('click', saveDiagram);
