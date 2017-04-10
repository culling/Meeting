class GameOfLifeComponent extends React.Component {
    constructor(){
        super();
        this.state = ({
            rows: 20,
            tileHeight: 20,
            columns: 20,
            tileWidth: 20,
            autoTick: true,
            gameBoard: [],
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
                treasureCount: 10
            },
            enemySettings:{
                chance: 5,
                treasureCount: 10,
                maxEnemyCount: 9
            },
            enemys:{
                goblin:{
                    type:"enemy",
                    name:"goblin",
                    baseHp: 10,
                    baseAtk: 4,
                    baseDef: 4,
                    baseXp:  40
                },
                troll:{
                    type:"enemy",
                    name:"troll",
                    baseHp: 12,
                    baseAtk: 5,
                    baseDef: 5,
                    baseXp:  50                    
                }
            },

            tiles:{
                wall:{
                    type: "structure",
                    name: "wall",
                    space: "solid",
                    health: 9999,
                    destructable: false
                },
                floor: {
                    type: "structure",                    
                    name:  "floor",
                    space: "open",
                    health: 9999,
                    destructable: false
                },
                door:{
                    type: "structure",                    
                    name: "door",
                    space: "open",
                    health: 1,
                    destructable: true                    
                },
                treasure:{
                    type: "item",                    
                    name: "treasure",
                    space: "open",
                    health: 1,
                    destructable: true
                },
                enemy:{
                    type: "enemy",                    
                    name: "enemy",
                    space: "solid",
                    destructable: true                    
                },
                player:{
                    type: "player",
                    name: "player",
                    space: "solid",
                    destructable: true                                        
                }
            }


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

                            </div>
                            <div className="col-md-6">

                            <svg    width={this.state.tileWidth * this.state.columns}
                                    height={this.state.tileHeight * this.state.rows}  
                                    style={this.state.viewPortCSS}
                                    >
                                    {this.state.gameBoard.map((tile, i) => <Tile 
                                            key={i}
                                            tileHeight = {this.state.tileHeight}
                                            tileWidth  = {this.state.tileWidth}
                                            row        = {tile.row}
                                            column     = {tile.column}
                                            tileName   = {tile.name}

                                    />)}


                                    {this.state.gameBoard.map((tile, i) => 
                                        {if( (tile.name !== "floor") &&
                                             (tile.name !== "wall")  &&
                                             (tile.name !== "door")
                                             )
                                        return <ItemTile 
                                            key={i}
                                            tileHeight = {this.state.tileHeight}
                                            tileWidth  = {this.state.tileWidth}
                                            row        = {tile.row}
                                            column     = {tile.column}
                                            tileName   = {tile.name}
                                            tile       = {tile}
                                    />
                                    }
                                    )}


                            </svg>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

        );
    };

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
            console.log(doorCounter);
            
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


        //Add Treasure
        let treasureCounter = this.state.treasureSettings.treasureCount;
       
        let currentGameBoardWithTreasure = currentGameBoard.map( tile => {
            let newTile = Object.assign({}, tile);
            let chanceOfTreasure = this.state.treasureSettings.chance;
            let treasureQuality  = Math.ceil(100 * Math.random()) - (100 - chanceOfTreasure);
            
            if ((treasureQuality <= 0) || (treasureCounter <= 0) ) {
                //no treasure
            }else if (tile.name == "floor") {
                let originalTile = Object.assign({}, tile);    
                newTile        = Object.assign({},this.state.tiles.treasure);
                newTile.row    = originalTile.row;
                newTile.column          = originalTile.column;
                newTile.treasureQuality = treasureQuality;
                treasureCounter--
            }
            return newTile;
        });

        //Add Enemys
        let enemyCounter = this.state.enemySettings.maxEnemyCount;
        let currentGameBoardWithTreasure = currentGameBoard.map( tile => {
            let newTile = Object.assign({}, tile);
            let chanceOfEnemy = this.state.enemySettings.chance;
            let enemyLevel  = Math.ceil(100 * Math.random()) - (100 - chanceOfEnemy);
            
            if ((enemyLevel <= 0) || (enemyCounter <= 0) ) {
                //no treasure
            }else if (tile.name == "floor") {
                let originalTile        = Object.assign({}, tile);    
                newTile                 = Object.assign({},this.state.enemys.goblin );
                newTile.row             = originalTile.row;
                newTile.column          = originalTile.column;
                newTile.enemyLevel      = enemyLevel;
                
                enemyCounter--
            }
            return newTile;
        });

        this.setState({gameBoard: currentGameBoardWithTreasure});
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
        if(this.props.tileName === "floor"){
            return "floor"
        }else if (this.props.tileName === "wall"){
            return "wall"
        }else if (this.props.tileName === "enemy"){
            return "floor"
        }else if (this.props.tileName === "door"){
            return "door"
        }else if (this.props.tileName === "treasure"){
            return "floor"
        }
    }

    render(){
        return(
            <rect   x={ this.props.tileWidth  * this.props.column} 
                    y={ this.props.tileHeight * this.props.row} 
                    height={this.props.tileHeight} 
                    width={this.props.tileWidth} 
                    stroke="white"
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

    _getCircleStyle(){
        if (this.props.tileName === "enemy"){
            return "enemy"
        }else if (this.props.tileName === "treasure"){
            return "treasure"
        }else if (this.props.tileName === "player"){
            return "player"
        }

    }

    render(){
        return(
            
            <circle cx={ (this.props.tileWidth  * this.props.column) + (this.props.tileWidth  / 2) } 
                    cy={ this.props.tileHeight * this.props.row      + (this.props.tileHeight / 2)}
                    r={this.props.tileHeight / Math.PI}
                    height={this.props.tileHeight} 
                    width={this.props.tileWidth} 
                    stroke="white"
                    className={this._getCircleStyle() +
                     " column " + this.props.column +
                     " row "    + this.props.row
                    
                    }
                    />
        )
    }
}

ReactDOM.render (
    <GameOfLifeComponent />, document.getElementById('mount-point')
)
