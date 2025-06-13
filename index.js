const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});

document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

class Player {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0;
    this.jumpForce = 15; // Fixed naming
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;
  }

  Animate() {
    if (keys["Space"] || keys["KeyW"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys["ShiftLeft"] || keys["KeyS"]) {
      this.h = this.originalHeight / 2;
    } else {
      this.h = this.originalHeight;
    }

    this.y += this.dy;

    if (this.y + this.h < canvas.height) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h;
    }

    this.Draw();
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

class Obstacles {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.dx = -gameSpeed;
  }

  Update() {
    this.x += this.dx;
    this.Draw();
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

class Text {
  constructor(t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

function SpawnObstacle() {
  let size = RandomIntInRange(20, 70);
  let type = RandomIntInRange(0, 1);
  let obstacle = new Obstacles(
    canvas.width + size,
    canvas.height - size,
    size,
    size,
    "yellow"
  );

  if (type == 1) {
    obstacle.y -= player.originalHeight - 10;
  }

  obstacles.push(obstacle);
}

function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";
  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highscore = 0;

  if (localStorage.getItem("highscore")) {
    highscore = parseInt(localStorage.getItem("highscore"));
  }

  player = new Player(25, 0, 50, 50, "white");
  scoreText = new Text("Score:" + score, 25, 25, "left", "yellow", "20");

  highscoreText = new Text(
    "Highscore:" + highscore,
    canvas.width - 25,
    25,
    "right",
    "white",
    "22"
  );
  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    spawnTimer = initialSpawnTimer - gameSpeed * 8;
    if (spawnTimer < 60) spawnTimer = 60;
  }

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.w < 0) {
      obstacles.splice(i, 1);
      i--;
      continue;
    }

    // Fixed collision detection
    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      obstacles = [];
      score = 0;
      spawnTimer = initialSpawnTimer;
      gameSpeed = 3;
      window.localStorage.setItem("highscore", highscore);
    }

    o.Update();
  }

  player.Animate();

  score++;
  scoreText.t = "Score: " + score;
  scoreText.Draw();

  if (score === 250) {
    alert("Congrats, you are at a new level");
  }

  if (score === 600) {
    alert("Congrats, stage 2");
  }

  if (score === 1200) {
    alert("Congrats, stage 3");
  }

  if (score === 2000) {
    alert("Congrats, stage 3");
  }

  if (score === 3500) {
    alert("Congrats, stage 4");
  }

  if (score === 5500) {
    alert("Congrats, stage 5");
  }

  if (score === 8000) {
    alert("Congrats, Nice Nice");
  }

  if (score === 10000) {
    alert("Congrat, legend");
  }

  if (score === 20000) {
    alert("Congrat, legend");
  }

  if (score === 30000) {
    alert("Congrat, legend");
  }

  if (score === 40000) {
    alert("Congrat, legend");
  }

  if (score === 50000) {
    alert("Congrat, legend");
  }

  if (score > highscore) {
    highscore = score;
    highscoreText.t = "Highscore: " + highscore;
    window.localStorage.setItem("highscore", highscore); // Save highscore immediately
  }

  highscoreText.Draw();

  if (highscore === 6000) {
    alert("Congrats, record broken");
  }

  if (highscore === 20000) {
    alert("Congrats, your majesty");
  }

  if (highscore === 30000) {
    alert("Congrats, final");
  }

  gameSpeed += 0.003;
}

Start();
