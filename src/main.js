let agentsData = [];

async function fetchAgents() {
  try {
    const response = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
    const data = await response.json();

    agentsData = data.data.map(agent => ({
      name: agent.displayName,
      portrait: agent.displayIcon
    }));
  } 
  catch (error) {
    console.error('Error fetching agents:', error);
  }
}

await fetchAgents();

const startBtn = document.getElementById("start-btn");
const container = document.querySelector(".container");

let agentIndex = 0;
const tick = new Audio("./src/tick.mp3");
const tock = new Audio("./src/tock.mp3");

startBtn.addEventListener("click", function() {
  startBtn.setAttribute("disabled", "disabled");

  const min = 2;
  const max = 3;

  let randomTime = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(randomTime);
  
  let intervalTime = 120;

  let cycle = setInterval(function() {

    container.innerHTML = `<img src="${agentsData[agentIndex].portrait}" alt="">`;
    tick.currentTime = 0;
    tick.play();
    agentIndex++;

    if(agentIndex >= agentsData.length) {
      agentIndex = 0;
    }
  }, intervalTime);

  setTimeout(function() {

    clearInterval(cycle);

    let agentName = agentsData[agentIndex].name;

    container.innerHTML = `<img src="${agentsData[agentIndex].portrait}" alt="">`;
    container.innerHTML += `<p class="agent-name">${agentName}</p>`;
    
    tock.play();
    tick.currentTime = 0;
    tick.pause();

    startBtn.removeAttribute("disabled");

  }, randomTime * 1000);

});