class Player{
    constructor(){
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.rank = null;
        this.place = 0;

    }

    getCount(){

        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function(data){
            playerCount = data.val();
        })
    }

    updateCount(count){

        database.ref("/").update({
            playerCount: count
                });
    }

    update(){
        var playerIndex = "players/player" + this.index;
          database.ref(playerIndex).set({
              name:this.name,
              distance :this.distance,
              place:this.place
          })

    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", (data)=>{
            allPlayers = data.val();

        });
    }

    getCarsAtEnd(){
        database.ref('carsAtEnd').on("value",(data)=>{
            this.rank = data.val();
            finishedPlayers = data.val();
        })
    }

    static updateCarsAtEnd(rank){
        database.ref('/').update({
            carsAtEnd : rank
        })
        this.place = this.place+1;
    }


}