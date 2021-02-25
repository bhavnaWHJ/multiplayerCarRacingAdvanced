class Form{
    constructor(){
        this.input = createInput('').attribute('placeholder','name');
        this.button = createButton('PLAY');
        this.greeting = createElement('h1');
        this.title = createElement('h1');
        this.reset = createButton('RESET')


    }

    hide(){
        this.title.hide();
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
        
    }

    display(){

        
        this.title.html("CAR RACING GAME");
        this.title.position(displayWidth/2-60,0);
        this.title.style('color', 'white');
        this.title.style('fontSize',"xxx-large");
        this.title.style('fontStyle','oblique');
        this.reset.position(windowWidth-100,20);
        ;

        
        this.input.position(windowWidth/2-130,windowHeight/2-100);
        this.button.position(windowWidth/2-65,windowHeight/2);
        this.button.style.backroundColor = "red";

       
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount = playerCount +1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            
            this.greeting.html("Hello " + player.name + "!");
            this.greeting.position(840,400);
    
        });

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
            Player.updateCarsAtEnd(0);

            database.ref("/").update({
                players: null,
                
              });
        })
    }


}