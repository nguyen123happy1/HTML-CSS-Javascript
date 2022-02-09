const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

// let background = new Image();
// background.src =
//   'https://cdn.glitch.com/15416f45-3c2a-4cd3-81d9-bbd5a79b3b0b%2Ftelescope.jpg?v=1619935677886';

// // Make sure the image is loaded first otherwise nothing will draw.
// background.onload = function () {
//   ctx.drawImage(background, 0, 0, background.width * 2, background.height * 2);
// };

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('click', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 20; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 20; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    //this.x = Math.random() * canvas.width;
    //this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.05;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[j].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // if (distance < 500){
      //   ctx.beginPath();
      //   ctx.strokeStyle = particlesArray[i].color;
      //   ctx.lineWidth = particlesArray[i].size/10;
      //   ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
      //   ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
      //   ctx.stroke();
      // }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.02)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 0.5;
  requestAnimationFrame(animate);
}
animate();

// function clear() {
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
// }
// setInterval(clear, 20000);
