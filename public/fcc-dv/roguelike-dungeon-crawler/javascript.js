class RougeLikeComponenet extends React.Component {
    constructor(){
        super();
        this.state = ({
            messageLog: "",
            rows: 20,
            tileHeight: 20,
            columns: 20,
            tileWidth: 20,
            autoTick: true,
            gameBoard: [],
            objectStore:[],
            viewPortCSS: {
                "backgroundColor":"blue"
            },
            roomSettings:{
                minWidth:   5,
                minHeight:  5,
                maxHeight: 8,
                maxWidth: 8,
                wallThickness: 1,
                maxDoorsCount: 4,
                roomsCount: 40
            },
            treasureSettings:{
                chance: 5,
                treasureCount: 10,
                healthCount:   10
            },
            enemySettings:{
                chance: 5,
                treasureCount: 10,
                maxEnemyCount: 9,
                bossMinLevel: 5
            },
            enemys:{
                goblin:{
                    type:"enemy",
                    name:"goblin",
                    baseHp: 10,
                    baseAtk: 4,
                    baseDef: 1,
                    baseXp:  40
                },
                demon:{
                    type:"enemy",
                    name:"demon",
                    baseHp: 12,
                    baseAtk: 5,
                    baseDef: 2,
                    baseXp:  50                    
                }
            },
            player:{
                type: "player",
                name: "player",
                level: 1,
                xp: 0,
                baseHp: 120,
                baseAtk: 10,
                baseDef: 10,
                hp:     60,
                vision: 2,
                weapon: {
                    name:   "Stick",
                    dmg:    2,
                },
                levelScale:[
                    {
                        level: 1,
                        xpRequired: 100,
                        baseHp: 120,
                        baseAtk: 10,
                        baseDef: 10,
                        hp:     120,
                    },{
                        level: 2,
                        xpRequired: 250,
                        baseHp: 220,
                        baseAtk: 15,
                        baseDef: 15,
                        hp:     220,
                    },{
                        level: 3,
                        xpRequired: 400,
                        baseHp: 320,
                        baseAtk: 20,
                        baseDef: 20,
                        hp:     320,
                    },{
                        level: 4,
                        xpRequired: 600,
                        baseHp: 420,
                        baseAtk: 22,
                        baseDef: 22,
                        hp:     340,
                    },{
                        level: 5,
                        xpRequired: 1200,
                        baseHp: 440,
                        baseAtk: 24,
                        baseDef: 24,
                        hp:     440,
                    },{
                        level: 6,
                        xpRequired: 99999,
                        baseHp: 450,
                        baseAtk: 26,
                        baseDef: 26,
                        hp:     450,
                    }

                    ]
            },
            weapons:[
                {
                    name:   "Stick",
                    dmg:    2
                },
                {
                    name:   "Crowbar",
                    dmg:    3
                },
                {
                    name:   "Iron Sword",
                    dmg:    5
                },{
                    name:   "Crystal Sword",
                    dmg:    8
                }
            ],
            tiles:{
                wall:{
                    type: "structure",
                    name: "wall",
                    space: "solid",
                    health: 9999,
                    destructable: false,
                    visible: false
                },
                floor: {
                    type: "structure",                    
                    name:  "floor",
                    space: "open",
                    health: 9999,
                    destructable: false,
                    visible: false
                },
                door:{
                    type: "structure",                    
                    name: "door",
                    space: "open",
                    health: 1,
                    destructable: true,
                    visible: false                    
                },
                treasure:{
                    type: "item",                    
                    name: "treasure",
                    space: "open",
                    health: 1,
                    destructable: true,
                    visible: false
                },
                health:{
                    type: "item",                    
                    name: "health",
                    space: "open",
                    health: 1,
                    destructable: true,
                    visible: false
                },
                enemy:{
                    type: "enemy",
                    name: "enemy",
                    space: "solid",
                    destructable: true,
                    visible: false                    
                },
                player:{
                    type: "player",
                    name: "player",
                    space: "solid",
                    destructable: true,
                    visible: true                                        
                }
            },
            gameState:"playing"


        });
        this.focus = this.focus.bind(this);
    };

    focus() {
        // Explicitly focus the text input using the raw DOM API
        //this.randomtiles.focus();
    }

    componentWillMount(){
        this._generateMap();
    }

    componentDidMount(){
        this._generateRandomRooms( this.state.roomSettings.roomsCount );
        
        document.addEventListener('keydown', this._keyboardEvents.bind(this));
        
    }

    render(){
        return (
    <div id="body-container" className="container">
        <h1> Rougelike </h1>

            <div className="row">
                <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6">

                            <button onClick={() => this._showState() }>show state</button>
                            <div className="message-log">

                                <PlayerStats player={this.state.player} />
                            </div>


                            </div>
                            <div className="col-md-6">
                                <GameBoardFunc 
                                    tileWidth = {this.state.tileWidth}
                                    tileHeight = {this.state.tileHeight}
                                    width={this.state.tileWidth * this.state.columns}
                                    height={this.state.tileHeight * this.state.rows}  
                                    style={this.state.viewPortCSS}
                                    objectStore = {this.state.objectStore}
                                    gameBoard = {this.state.gameBoard}
                                    gameState = {this.state.gameState}
                                />
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        );
    };

    _keyboardEvents(event){

        if (this.state.gameState == "lost"){
            return;
        }

        let gameBoard           =  this.state.gameBoard.map(tile => tile);
        let originalObjectStore =  this.state.objectStore.map(object => object) ;
        let player = Object.assign({}, this.state.player);
        let tileNeighbors = {
            currentTile : gameBoard[ ( player.row     * this.state.columns  ) + player.column ],
            northTile   : gameBoard[ ( (player.row-1) * this.state.columns  ) + player.column ],
            southTile   : gameBoard[ ( (player.row+1) * this.state.columns  ) + player.column ],
            westTile    : gameBoard[ ( (player.row  ) * this.state.columns  ) + player.column -1 ],
            eastTile    : gameBoard[ ( (player.row  ) * this.state.columns  ) + player.column +1 ]
        }

        let playerObjectNeighbors = this._getObjectNeighors(player.row, player.column) ;



        if(event.key== "ArrowUp"){
            //console.log("Arrow Up");
            if((tileNeighbors.northTile.name == "floor" )|| (tileNeighbors.northTile.name == "door" ) ){
                //let playerObjectNeighbors = this._getObjectNeighors(player.row -1, player.column) ;
                if((playerObjectNeighbors.north != undefined) && (playerObjectNeighbors.north.type == "enemy")){
                    console.log("Attacked the "+ playerObjectNeighbors.north.name );
                    this._attackEnemy(playerObjectNeighbors.north, player);
                }else{
                    player.row--;
                }
            }
        }

        if(event.key== "ArrowDown"){
            //console.log("Arrow Down");
            if((tileNeighbors.southTile.name == "floor" )|| (tileNeighbors.southTile.name == "door" ) ){
                if((playerObjectNeighbors.south != undefined) && (playerObjectNeighbors.south.type == "enemy")){
                    console.log("Attacked the "+ playerObjectNeighbors.south.name );
                    this._attackEnemy(playerObjectNeighbors.south, player);
                }else{
                    player.row++;
                }
            }
        }

        if(event.key== "ArrowRight"){
            //console.log("Arrow Right");
            if((tileNeighbors.eastTile.name == "floor" )|| (tileNeighbors.eastTile.name == "door" ) ){
                if((playerObjectNeighbors.east != undefined) && (playerObjectNeighbors.east.type == "enemy")){
                    console.log("Attacked the "+ playerObjectNeighbors.east.name );
                    this._attackEnemy(playerObjectNeighbors.east, player);
                }else{
                    player.column++;
                }
            }
        }

        if(event.key== "ArrowLeft"){
            //console.log("Arrow Left");
            if((tileNeighbors.westTile.name == "floor" )|| (tileNeighbors.westTile.name == "door" ) ){
                if((playerObjectNeighbors.west != undefined) && (playerObjectNeighbors.west.type == "enemy")){
                    console.log("Attacked the "+ playerObjectNeighbors.west.name );
                    this._attackEnemy(playerObjectNeighbors.west, player);
                }else{
                    player.column--;
                }
            }
        }



        let currentTreasure = this.state.objectStore.filter( object => {
                if ((object.row === player.row  ) && (object.column === player.column) && object.type === "item" ){
                    return object;
                }
            })[0];
        
        if (currentTreasure){
                console.log("Player found ");
                console.log(currentTreasure);
            if (currentTreasure.name == "treasure"){
                let weaponsArray = this.state.weapons.map(weapon => weapon);


                if ((currentTreasure.treasureQuality) > weaponsArray.length -1 ){
                    currentTreasure.treasureQuality = weaponsArray.length -1
                } 
                let weaponFound = weaponsArray[(currentTreasure.treasureQuality)];
                if (weaponFound.dmg > player.weapon.dmg){
                    player.weapon = weaponFound;
                    console.log("Player equipped " + weaponFound.name);
                }
            }else if(currentTreasure.name == "health"){
                console.log("Heath Restored");
                console.log(player.baseHp);
                player.hp = player.baseHp;
                console.log(player.hp);
            }
            currentTreasure.type = "empty-box";
            currentTreasure.name = "empty-box";
        }

        
        playerObjectNeighbors = this._getObjectNeighors(player.row, player.column) ;

        if (playerObjectNeighbors.north){
            this._attackPlayer(playerObjectNeighbors.north, player);
        }
        if(playerObjectNeighbors.south){
            this._attackPlayer(playerObjectNeighbors.south, player);
        }
        if(playerObjectNeighbors.east){
            this._attackPlayer(playerObjectNeighbors.east, player);
        }
        if(playerObjectNeighbors.west){
            this._attackPlayer(playerObjectNeighbors.west, player);
        }


        let originalGameBoard = this.state.gameBoard.map(tile =>{
            tile.visible = false;
            for (let i = player.vision;i > (player.vision * -1); i--){
            for (let j = player.vision;j > (player.vision * -1); j--){

                if((tile.row == (player.row +i)) && (tile.column == (player.column +j )) ) {
                    tile.visible = true;
                }
            }
            }
            return tile
        } );

        
        let newObjectStore = originalObjectStore.map(object => {
            object.visible = false;
            {if(object.type === "player"){
                object = player
            }}
            for (let i = player.vision;i > (player.vision * -1); i--){
                for (let j = player.vision;j > (player.vision * -1); j--){
                    if((object.row == (player.row +i)) && (object.column == (player.column +j )) ) {
                        object.visible = true;
                    }
                }
            }
            return object;
        });
        
    this.setState({gameBoard:   originalGameBoard})
    this.setState({objectStore: newObjectStore});
    this.setState({player:      player});
    }

    _attackPlayer(enemy, player){
        if (enemy.type != "enemy"){
            return
        }

        let originalObjectStore =  this.state.objectStore.map(object => object) ;

        let message = "";

        let enemyAttack  = Math.round((Math.random() * (enemy.baseAtk+ enemy.enemyLevel)) );
        console.log(enemyAttack);
        let damage = (enemyAttack  );
        
        if (damage > 0 ){
            player.hp = player.hp - ( damage);
            console.log(enemy.name + " attacked the " + player.name + " for " + ( damage ) +" dmg" );
            if (player.hp <= 0){
                console.log("Player Died");
                this._playerDied();
                player.name = "player corpse"
            }
        }
    }

    _playerDied(){
        console.log("Game Over");
        this.setState({gameState: "lost"});
    };

    _playerWon(){
        console.log("You Won!");
        this.setState({gameState: "won"});
    }

    _attackEnemy(enemy, player){
        let originalObjectStore =  this.state.objectStore.map(object => object) ;
        let playerAttack = (Math.round((Math.random() * (player.baseAtk + player.weapon.dmg) ) ) + player.level );


        originalObjectStore.map(object => {
            if((object.row === (enemy.row) ) && (object.column === enemy.column)){

                let damage = (playerAttack - object.enemyDef );
                if (damage > 0 ){
                object.enemyHp = object.enemyHp - (damage );
                console.log("Player attacked the " + object.name + " for " + (damage ) +" dmg" );                
                console.log(object.name + ": " + object.enemyHp);
                    if (object.enemyHp <= 0){
                        console.log("Player Killed " + object.name )
                        
                        object.type = "corpse";
                        object.name = object.name + " corpse";

                        player.xp = player.xp + (enemy.enemyXp);
                        
                        let newLevel = player.levelScale.filter(level => {
                            if(player.xp <= level.xpRequired){
                                return level
                            } 
                        })[0];
                        console.log(newLevel)
                        if (newLevel.level > player.level){
                            console.log("Player leveled up");
                            player.level    = newLevel.level;
                            player.hp       = newLevel.baseHp;
                            player.baseAtk  = newLevel.baseAtk;
                            player.baseDef  = newLevel.baseDef;
                        }
                        if(enemy.boss){
                            this._playerWon();
                        }

                    } else{

                    }
                }
            }
            return object;
        });
    
        this.setState({objectStore: originalObjectStore});
        this.setState({player: player});

    }


    _getObjectNeighors(playerRow, playerColumn){
        let neighbors = {};
        this.state.objectStore.forEach(object => {
            if((object.row === (playerRow +1) ) && (object.column === playerColumn)
             && (object.type !== "player") ){
                neighbors.south = object || {};
            }else if((object.row === (playerRow -1) ) && (object.column === playerColumn)
            && (object.type !== "player") ){
                neighbors.north = object || {};
            }else if((object.row === playerRow   ) && (object.column === (playerColumn +1))
            && (object.type !== "player") ){
                neighbors.east = object || {};
            }else if((object.row === playerRow   ) && (object.column === (playerColumn -1))
            && (object.type !== "player") ){
                neighbors.west = object || {};
            }
        });

        return neighbors;
    }


    _generateMap(){
        let mapArray =  this.state.gameBoard.map(tile => tile);

        for(let row = 0; row < this.state.columns; row++){
            for(let col=0; col < this.state.rows; col++){

                let currentTile = Object.assign({},  this.state.tiles.floor);
                
                if((col==0 ) ||  (col == this.state.columns -1) ||
                    (row== 0) || (row == this.state.rows    -1)){
                        currentTile = Object.assign({}, this.state.tiles.wall);
                }
                currentTile.column = col;
                currentTile.row    = row;
                mapArray.push( currentTile );                
            }
        }
        //console.log(blockArray);
        this.setState({gameBoard: mapArray});
    }


    _generateRandomRooms(roomsCount){
        let currentGameBoard =  this.state.gameBoard.map(tile => tile);

        let minColumn = 1;
        let maxColumn = this.state.columns - 2;
        let rangeColumn = maxColumn - minColumn;
        let minRow = 1;
        let maxRow = this.state.rows -2; 
        let rangeRow = maxRow - minRow; 

        let minRoomHeight = this.state.roomSettings.minHeight;
        let minRoomWidth  = this.state.roomSettings.minWidth;
        let maxRoomHeight = this.state.roomSettings.maxHeight;
        let maxRoomWidth  = this.state.roomSettings.maxWidth;
        let wallThickness = this.state.roomSettings.wallThickness;

        //room creation
        for (let roomCounter = 0; roomCounter < roomsCount; roomCounter++  ){ 

            //room height and width
            let roomHeight    = minRoomHeight + (Math.floor((maxRoomHeight - minRoomHeight)*Math.random() ));
            let roomWidth     = minRoomWidth  + (Math.floor((maxRoomWidth  - minRoomWidth )*Math.random() ));

            //start of room position 
            let randomRow     =  (Math.floor (rangeRow    * Math.random()) ) - minRoomHeight ;
            let randomColumn  =  (Math.floor (rangeColumn * Math.random()) ) - minRoomWidth;

            let doorCounter   =  Math.round((this.state.roomSettings.maxDoorsCount) * Math.random()) ;
            //console.log(doorCounter);
            
            let doorPosition = {
                height: (2* wallThickness) +  (Math.floor((roomHeight -3 )*Math.random() )),
                width:  (2* wallThickness) +  (Math.floor((roomWidth  -3 )*Math.random() ))
            }
            

            //each cell of the room
            for (let col = 0; col <= roomWidth; col++){
                for(let row = 0; row <=  roomHeight; row++){
                    let currentTile = Object.assign({}, this.state.tiles.floor); 
                    let thisCol = col ;
                    let thisRow = row ;
                    currentTile.column  = thisCol;
                    currentTile.row     = thisRow;

                    //create room
                    if( (col== 1 ) || (col == roomWidth  -1 ) ||
                        (row== 1 ) || (row == roomHeight -1 )){
                        currentTile = Object.assign({}, this.state.tiles.wall); 
                        currentTile.column  = thisCol + randomColumn;
                        currentTile.row     = thisRow + randomRow;
                        
                        //add door on wall
                        if(( (  (col) == doorPosition.width  ) ||
                                (row) == doorPosition.height )
                                ){
                            currentTile = Object.assign({}, this.state.tiles.door);
                            currentTile.column  = thisCol + randomColumn;
                            currentTile.row     = thisRow + randomRow;
                            doorCounter--; 
                        }
                    }else if ((col== 1 + wallThickness ) || (col == (roomWidth -1 )-wallThickness ) ||
                        (row== 1 + wallThickness ) || (row == (roomHeight -1) -wallThickness )){
                            currentTile = Object.assign({}, this.state.tiles.floor);
                            currentTile.column  = thisCol + randomColumn;
                            currentTile.row     = thisRow + randomRow;    
                    }

                    //create border around rooms to make the whole thing walkable
                    if(
                        (col== 0 ) || (col == roomWidth   ) ||
                        (row== 0 ) || (row == roomHeight  )){
                        currentTile = Object.assign({}, this.state.tiles.floor); 
                        currentTile.column  = thisCol + randomColumn;
                        currentTile.row     = thisRow + randomRow;
                    }


                    //create walled border around map to prevent trying to walk off the map
                    if( ( currentTile.column    < this.state.columns -1 ) &&
                        ( currentTile.column    > 0 ) &&
                        ( currentTile.row       < this.state.rows -1 ) &&
                        ( currentTile.row       > 0 )  ){
                        currentGameBoard[ ( currentTile.row * this.state.columns  ) + currentTile.column ] = currentTile;
                    }
                }
            }
        }



        //add Objects
        //Add Treasure
        let treasureCounter = this.state.treasureSettings.treasureCount;
        let healthCounter   = this.state.treasureSettings.healthCount;
        //Add Creatures
        let boss = {
            tile: Object.assign({},this.state.enemys.demon ),
            counter: 1
        }
        let enemyCounter = this.state.enemySettings.maxEnemyCount;
        let player = Object.assign({}, this.state.player);
        let playerCounter = 1;
        


        //let currentGameBoardWithTreasure = currentGameBoard.map( tile => {
        let objectStoreUnfiltered = currentGameBoard.map( tile => {
            let newTile             = Object.assign({}, tile);
            let originalTile        = Object.assign({}, tile);    

            let chanceOfTreasure = this.state.treasureSettings.chance;
            let treasureQuality  = Math.ceil(100 * Math.random()) - (100 - chanceOfTreasure);

            let chanceOfEnemy = this.state.enemySettings.chance;
            let enemyLevel  = Math.ceil(100 * Math.random()) - (100 - chanceOfEnemy);
            
            if(tile.name == "floor"){
                if ((treasureQuality <= 0) || (treasureCounter <= 0) || healthCounter <= 0 ) {
                    if ((enemyLevel > 0) && (enemyCounter > 0)) {
                    //console.log("enemy level: "+  enemyLevel);
                    //no treasure
                        let creatureTile = Object.assign({},this.state.enemys.goblin );
                        newTile = creatureTile;
                            newTile.enemyLevel      = enemyLevel;
                            newTile.enemyHp         = enemyLevel * this.state.enemys.goblin.baseHp;
                            newTile.enemyXp         = enemyLevel * this.state.enemys.goblin.baseXp;
                            newTile.enemyDef        = enemyLevel * this.state.enemys.goblin.baseDef;
                            newTile.enemyAtk        = enemyLevel * this.state.enemys.goblin.baseAtk;
                            newTile.boss            = false;
                        enemyCounter--;
                    }else if( (boss.counter > 0)&&( Math.random() > 0.98 )){
                        let creatureTile = boss.tile;
                        newTile = creatureTile;
                            enemyLevel = Math.ceil( this.state.enemySettings.bossMinLevel * Math.random()) + this.state.enemySettings.bossMinLevel ;
                            newTile.enemyLevel      = enemyLevel;
                            newTile.enemyHp         = enemyLevel * boss.tile.baseHp;
                            newTile.enemyXp         = enemyLevel * boss.tile.baseXp;
                            newTile.enemyDef        = enemyLevel * boss.tile.baseDef;
                            newTile.enemyAtk        = enemyLevel * boss.tile.baseAtk;
                            newTile.boss            = true;
                        boss.counter--;
                    }else if ( 
                                ( (playerCounter > 0)&&
                                    ( originalTile.row > (this.state.rows / 2)  &&
                                    ( Math.random() > 0.98 ))) 
                            || 
                                ((playerCounter > 0)&&
                                    ( originalTile.row == (this.state.rows - 2) ))) 
                        {
                        //let playerTile = player.tile;
                        newTile = player;
                        playerCounter--;

                        player.row       = originalTile.row;
                        player.column    = originalTile.column;
                    }else{
                        newTile = originalTile;
                    }


                }else {
                    if (Math.random() >= 0.5){
                        newTile                 = Object.assign({},this.state.tiles.treasure);
                        newTile.treasureQuality = treasureQuality;
                        treasureCounter--;
                    }else{
                        newTile                 = Object.assign({},this.state.tiles.health);
                        //newTile.treasureQuality = treasureQuality;
                        healthCounter--;
                    }
                }
                newTile.row             = originalTile.row;
                newTile.column          = originalTile.column;
                //console.log(currentResults);
                //currentResults.push(newTile);
                //return newTile;
            }
            
            newTile.row             = originalTile.row;
            newTile.column          = originalTile.column;
            return newTile;
            
        });

         let objectStore = objectStoreUnfiltered.filter(tile => 
             {if(tile.type !== "structure"){
                return tile;
             }
             
            }
         )

         //player = Object.assign({}, this.state.player);
        //console.log(player);
        let currentGameBoardVisible = currentGameBoard.map(tile =>{
            tile.visible = false;
            for (let i = player.vision;i > (player.vision * -1); i--){
            for (let j = player.vision;j > (player.vision * -1); j--){

                if((tile.row == (player.row +i)) && (tile.column == (player.column +j )) ) {
                    tile.visible = true;
                }
            }
            }
            return tile
        } );

        
        let newObjectStore = objectStore.map(object => {
            object.visible = false;
            {if(object.type === "player"){
                //object = player
            }}
            for (let i = player.vision;i > (player.vision * -1); i--){
                for (let j = player.vision;j > (player.vision * -1); j--){
                    if((object.row == (player.row +i)) && (object.column == (player.column +j )) ) {
                        object.visible = true;
                    }
                }
            }
            return object;
        });
        //console.log(objectStore);
        this.state.objectStore = newObjectStore;
        this.setState({player: player});
        console.log("Board Set");
        this.setState({gameBoard: currentGameBoardVisible});
    }



    _showState(){
        console.log(this.state)
    }

    _getTile(column, row){
        return this.state.gameBoard[(row* this.state.columns) + column ]
    }



}





class Tile extends React.Component{
    constructor(){
        super();
    }




    _getRectStyle(){
        if (this.props.tileName === "wall"){
            return "wall ".concat(this.props.visible? "visible":"hidden")
        }else if (this.props.tileName === "door"){
            return "door ".concat(this.props.visible? "visible":"hidden")
        } else{
            return "floor ".concat(this.props.visible? "visible":"hidden")
        }

    }

    render(){
        return(
            <rect   x={ this.props.tileWidth  * this.props.column} 
                    y={ this.props.tileHeight * this.props.row} 
                    height={this.props.tileHeight} 
                    width={this.props.tileWidth} 
                    
                    className={this._getRectStyle() +
                     " column " + this.props.column +
                     " row "    + this.props.row
                    
                    }
                    />
        )
    }
}

class ItemTile extends React.Component{
    constructor(){
        super();
    }

    _setClass(){
        let className = (this.props.tileName).concat(this.props.visible?" visible":" hidden") 
        return className 
    }

    _setRadius(){
        if ((this.props.tile.type == "enemy") && (this.props.tile.boss == true) ){
            return ((this.props.tileHeight/ Math.PI ) *1.5 )
        }else{
            return (this.props.tileHeight / Math.PI)
        }

    }

    render(){
        return(
            
            <circle cx={ (this.props.tileWidth  * this.props.column) + (this.props.tileWidth  / 2) } 
                    cy={ this.props.tileHeight * this.props.row      + (this.props.tileHeight / 2)}
                    r= {this._setRadius()}
                    height={this.props.tileHeight} 
                    width={this.props.tileWidth} 
                    stroke="white"                    
                    className={ this._setClass() }
                    />
        )
    }
}

class PlayerStats extends React.Component{
    render(){
        return (<div className="player-stats-container" >
            <h3> Player Stats </h3>
            <p>Player Weapon: {this.props.player.weapon.name}</p>
            <p>Player Health: {this.props.player.hp}</p>
            <p>Player Xp: {this.props.player.xp}</p>
            <p>Player Level: {this.props.player.level}</p>
        </div>)
    }
}


function GameBoardFunc(props){
    let gameState = props.gameState;
    if(gameState == "lost"){
        return (
        <div>
            <h1> You Lost </h1>
        </div>)
    }else if(gameState == "won"){
    return(
            <div>
            <h1> You Won </h1>
            <GameBoard game={props} />
        </div>)
    }else{
        return <GameBoard game={props} />
    }

}

class GameBoard extends React.Component{
    render(){
        return(
                    <svg    
                    width={this.props.game.width}
                    height={this.props.game.height}
                    style={this.props.game.viewPortCSS}
                    >
                    {this.props.game.gameBoard.map((tile, i) => <Tile 
                            key={i}
                            tileHeight = {this.props.game.tileHeight}
                            tileWidth  = {this.props.game.tileWidth}
                            row        = {tile.row}
                            column     = {tile.column}
                            tileName   = {tile.name}
                            visible    = {tile.visible}
                    />)}

                    
                    {this.props.game.objectStore.map((tile, i) => 
                        {
                        return <ItemTile 
                            key={i}
                            tileHeight = {this.props.game.tileHeight}
                            tileWidth  = {this.props.game.tileWidth}
                            row        = {tile.row}
                            column     = {tile.column}
                            tileName   = {tile.name}
                            tile       = {tile}
                            visible    = {tile.visible}
                    />
                    }
                    )}
            </svg>
        )
    }

}

ReactDOM.render (
    <RougeLikeComponenet />, document.getElementById('mount-point')
)
