
var database;
var gameState = 0;
var playerCount;
var allPlayers;
var form, player, game;
var cars, car1,car2,car3,car4;
var track, carImg1,carImg2,carImg3,carImg4;
var backImage;
var bronze_img,gold_img,silver_img;
var finishedPlayers;

function preload(){
    track = loadImage("images/track.jpg");
    carImg1 = loadImage("images/car1.png");
    carImg2 = loadImage("images/car2.png");
    carImg3 = loadImage("images/car3.png");
    carImg4 = loadImage("images/car4.png");
    backImage = loadImage("carRacing.jpg");
    bronze_img = loadImage("bronze.png");
    gold_img = loadImage("gold.png");
    silver_img = loadImage("silver.png");
    
    
}
function setup(){
   
    database = firebase.database();
    createCanvas(windowWidth-40,windowHeight-40);

    game = new Game();
    game.getState();
    game.start();
  
    
}

function draw(){
    background(backImage);
    if(playerCount === 4 ){
        game.update(1);
    }
    if(gameState === 1){
        clear();
        game.play();
    }
    if(finishedPlayers === 4){
        game.update(2)
    }

    if(gameState === 2){
        game.end();
        game.update(2);
    }

    if(gameState ===2 && finishedPlayers === 4 ){
        game.displayRanks();
    }
   

}