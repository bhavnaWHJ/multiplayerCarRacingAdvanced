class Game{
    constructor(){

    }
   // listening to the node gameState of database and reading the values everytime and updating the gameState in the project .
    getState(){

        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    //whenever gameState changes in the project , write the value into the database in node gameState

    update(state){

        database.ref('/').update({
            gameState: state
        });

    }

    async start(){

        if(gameState === 0){

            form = new Form();
            form.display();
          
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
        }
            

            car1 = createSprite(100,200);
            car1.addImage(carImg1);
            car2 = createSprite(300,200);
            car2.addImage(carImg2);
            car3 = createSprite(500,200);
            car3.addImage(carImg3);
            car4 = createSprite(700,200);
            car4.addImage(carImg4);
            cars = [car1,car2,car3,car4];

            
        
    }

    play(){
        form.hide();
       // textSize(30);
       // text("GAME START", 120,100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined){
            background("brown");
            image(track,0, -windowHeight*3, windowWidth, windowHeight*5);
            //var displayPosition = 130;

            //x & y positions of the car
            var x = 225;
            var y;
            var index = 0;
            for(var plr in allPlayers){

                //position the cars a little away from each other in x direction
                x = x + 300;
                index = index +1;

                //Use data from the database to display the cars in y direction
                y = windowHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
              

                if(index === player.index){
                    fill("red");
                    ellipse(x,y,60,60);

                    //cars[index-1].shapeColor = "red";
                    camera.position.x = windowWidth/2;
                    camera.position.y = cars[index-1].y;
                   
                }
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);

            //displayPosition = displayPosition + 20;
            //textSize(20);
            //text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, displayPosition);                
            }
        }

        if(keyIsDown(UP_ARROW)&& player.index!== null&& gameState ===1){

            player.distance = player.distance +10;
            player.update();

        }

        if(player.distance > 3300 && player.distance<=3310){
            gameState = 2;
            player.rank = player.rank + 1;
            Player.updateCarsAtEnd(player.rank);
            player.place = finishedPlayers
        }

        drawSprites();


    }
    displayRanks(){
        //display the medals
        camera.position.y = 0;
        camera.position.x = 0;
        background("yellow");

        imageMode(CENTER);

        Player.getPlayerInfo();

        image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
        image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
        image(gold_img, 0, -100, 250, 300);

        textAlign(CENTER);
        textSize(50);
        for(var plr in allPlayers){
            if(allPlayers[plr].place=== 1){
                text("1st: " + allPlayers[plr].name, 0, 85);
            }else if(allPlayers[plr].place === 2){
                text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
            }else if(allPlayers[plr].place === 3){
                text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
            }else{
                textSize(30);
                text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
            }
        }
    }

    end(){
        console.log("Game Ended!!");
        console.log(player.rank);
    }
}