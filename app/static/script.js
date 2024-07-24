const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const winnerContainer = document.getElementById('winnerContainer');
const winnerName = document.getElementById('winnerName');
const colors = [];
let names = [];

let startAngle = 0;
let arc = 0;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

const button = document.getElementById("getData");

function drawRouletteWheel() {
    arc = Math.PI / (names.length / 2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    for (let i = 0; i < names.length; i++) {
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 200, angle, angle + arc, false);
        ctx.arc(canvas.width / 2, canvas.height / 2, 0, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "#000";
        ctx.translate(canvas.width / 2 + Math.cos(angle + arc / 2) * 150,
                      canvas.height / 2 + Math.sin(angle + arc / 2) * 150);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(names[i], -ctx.measureText(names[i]).width / 2, 0);
        ctx.restore();
    }
}

function getRandomColor() {
    for (let i = 0; i < names.length; i++) {
        colors.push('#' + Math.floor(Math.random()*16777215).toString(16))
    } 
}

button.addEventListener('click', () => {
    getRandomColor();
    drawRouletteWheel();
});

async function getData() {
  const url = "/chat_gippity";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    names = json
    console.log(json)
  } catch (error) {
    console.error(error.message);
  }
}

getData()

function rotateWheel() {
    startAngle += (spinAngleStart * Math.PI / 180);
    drawRouletteWheel();
}

function easeOut(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
}

function spin() {
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    let degrees = startAngle * 180 / Math.PI + 90;
    let arcd = arc * 180 / Math.PI;
    let index = Math.floor((degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    let text = names[index]
    winnerName.innerText = text;
    winnerContainer.style.display = 'block';
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
    ctx.restore();
}

spinButton.addEventListener('click', () => {
    winnerContainer.style.display = 'none';
    spin();
});

