let timerValue = 30;
let scoreValue = 0;
let hitsValue = 0;
let timeInterval;

const createBubble = () => {
  let contentbox = '';
  for (let i = 1; i <= 207; i++) {
    contentbox += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
  }
  const content = document.querySelector('.content');
  content.innerHTML = contentbox;

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((bubble, index) => {
    bubble.style.animationDelay = `${index * 0.005}s`;
  });
};

const setTiming = () => {
  const timerNode = document.querySelector('.timer');
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    if (timerValue > 0) {
      timerValue--;
      timerNode.textContent = timerValue;
    } else {
      clearInterval(timeInterval);
      document.querySelector('.content').innerHTML = `
        <h1 class="gameOver">
          Game Over <br>
          <button onclick="restartGame()">Restart</button>
        </h1>`;
      document.getElementById('startBtn').disabled = false;
    }
  }, 1000);
};

const hitsGenerate = () => {
  hitsValue = Math.floor(Math.random() * 10);
  document.querySelector('.hitsvalue').textContent = hitsValue;
};

const score = () => {
  scoreValue += 10;
  document.querySelector('.scoreValue').textContent = scoreValue;
};

const restartGame = () => {
  scoreValue = 0;
  timerValue = 30;
  document.querySelector('.scoreValue').textContent = scoreValue;
  document.querySelector('.timer').textContent = timerValue;
  createBubble();
  setTiming();
  hitsGenerate();
};

const Startingfun = () => {
  const startBtn = document.getElementById('startBtn');
  startBtn.disabled = true; 
  createBubble();
  setTiming();
  hitsGenerate();
};

document.querySelector('.content').addEventListener('click', (e) => {
  if (e.target.classList.contains('bubble')) {
    const num = Number(e.target.textContent);
    if (num === hitsValue) {
      const popSound = document.getElementById('popSound');
      popSound.currentTime = 0;
      popSound.play();

      e.target.classList.add('pop');
      setTimeout(() => {
        score();
        createBubble();
        hitsGenerate();
      }, 200);
    }
  }
});
