


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var music;
var shot;
var chiki;
var win;
var bg;
var text;
var loseText;
var winText;
var shotOne;
var counter = 0;
var mouseTop;
var mouseLeft;
var vodka;
var levelSpeed = 30;

function preload () {
  game.load.image('bg', 'assets/img/bg.jpg');
  game.load.image('vodka', 'assets/img/vodka.png');
  game.load.image('shotIMG', 'assets/img/shot.png');
  game.load.audio("audio", "assets/audio/audio-bg.mp3");
  game.load.audio("shot", "assets/audio/shot.mp3");
  game.load.audio("chiki", "assets/audio/chiki.mp3");
  game.load.audio("win", "assets/audio/win.mp3");
};

function create () {
  
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bg = game.add.sprite(0, 0, 'bg');
  music = game.add.audio("audio");
  shot = game.add.audio("shot");
  chiki = game.add.audio("chiki");
  win = game.add.audio("win");
  music.play();

  vodkas = game.add.group();

  addVodka();
  
  text = game.add.text(180, 14, '', { fill: '#F5F5F5' });

  
};

function addVodka (stop) {
  if(!(stop)) {
    vodkas.enableBody = true;
    for (var i = 0; i < 5; i++) {
      vodka = vodkas.create(i * 170, 0, 'vodka');

      angle = Math.random() * 50;
      if(angle > 25) {
        angle *= -1;
      }

      vodka.angle += angle;
      vodka.body.gravity.y = levelSpeed + Math.random() * 50;
      vodka.inputEnabled = true;
      vodka.events.onInputDown.add(listener, vodka, this);
    }
  };
}

function update () { 

 if (vodkas.bottom >= 600) {
  game.paused = true;
  loseText = game.add.text(220, 204, '', { fill: '#F5F5F5' });
  loseText.text = "Братан, ты проиграл епта!";
  vodkas.destroy();
 }
}


function render() {
  game.debug.soundInfo(music, 20, 32);
}

function listener (vodka) {

  counter++;
  text.text = "Братан, ты расхерачил " + counter + " бутылок!";
  vodka.kill();

  mouseTop = game.input.x,
  mouseLeft = game.input.y 

  shot.play();
  shotOne = game.add.sprite(mouseTop - 50, mouseLeft - 30, 'shotIMG');
  game.time.events.add(Phaser.Timer.SECOND * 0.1, fadePicture, this);
  
  if (counter % 5 == 0 && counter < 25) {
    chiki.play()
    levelSpeed += 20;
    addVodka(); 
  }

  if (counter == 25)  {
    addVodka(stop);
    bg.destroy();
    music.stop();
    win.play();
    winText = game.add.text(110, 300, '', { fill: '#F5F5F5', fontSize: "3rem", });
    winText.text = "Братан, НУ ТЫ ВАЛИШЬ!";
  }
}

function fadePicture () {
  game.add.tween(shotOne).to( { alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
}