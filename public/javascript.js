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
                minWidth:   3,
                minHeight:  3
            },

            tiles:{
                wall:{
                    name: "wall",
                    space: "solid",
                    health: 9999,
                    destructable: false
                },
                floor: {
                    name:  "floor",
                    space: "open",
                    health: 9999,
                    destructable: false
                },
                door:{
                    name: "door",
                    space: "open",
                    health: 1,
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
        this._generateRandomRooms(10);

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

        for(let x = 0; x < this.state.columns; x++){
            for(let y=0; y < this.state.rows; y++){

                let currentTile = Object.assign({},  this.state.tiles.floor);
                
                if((x==0 ) || (x== this.state.columns -1) ||
                    (y== 0) || (y == this.state.rows -1)){

                        currentTile = Object.assign({}, this.state.tiles.wall);

                }
            
                currentTile.column = x;
                currentTile.row    = y;

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
        

        let minRoomHeight = 4;
        let minRoomWidth  = 4;
        let maxRoomHeight = 8;
        let maxRoomWidth  = 8;

        for (let roomCounter = 0; roomCounter < roomsCount; roomCounter++  ){ 

            let randomRow    = minRow    + (Math.floor (rangeRow    * Math.random()) );
            let randomColumn = minColumn + (Math.floor (rangeColumn * Math.random()) );
            let roomHeight    = minRoomHeight + (Math.floor((maxRoomHeight - minRoomHeight)*Math.random() ));
            let roomWidth     = minRoomWidth  + (Math.floor((maxRoomWidth  - minRoomWidth )*Math.random() ));

            let doorPosition ={
                height: 1 + (Math.floor((roomHeight -2)*Math.random() )),
                width: 1 +  (Math.floor((roomWidth -2)*Math.random() ))
            }

            console.log(roomWidth);
            console.log(roomHeight);
            
            for (let x = 0; x < roomWidth; x++){
                for(let y = 0; y <  roomHeight; y++){
                    let currentTile = Object.assign({}, this.state.tiles.wall); 

                    if( (x==0 ) || (x == roomWidth  -1 ) ||
                        (y== 0) || (y == roomHeight -1 )){
                        //let currentTile = Object.assign({}, this.state.tiles.wall); 
                        currentTile.row    = randomRow + y;
                        currentTile.column = randomColumn + x ;

                        if( (x == doorPosition.height ) || (y == doorPosition.width ) ){
                            currentTile = Object.assign({}, this.state.tiles.door);
                            //currentGameBoard[ currentTile.row  + ((this.state.columns) * currentTile.column) ] = currentTile;
                            console.log(currentTile);
                        }
                        currentGameBoard[ currentTile.row  + ((this.state.columns) * currentTile.column) ] = currentTile;
                    }
                }
            }
        }
        //[(row * this.state.columns) + column ]
        //console.log(path)
        this.setState({gameBoard: currentGameBoard});
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
            return "enemy"
        }
    }

    render(){
        return(
            <rect   x={ this.props.tileWidth  * this.props.column} 
                    y={ this.props.tileHeight * this.props.row} 
                    height={this.props.tileHeight} 
                    width={this.props.tileWidth} 
                    stroke="white"
                    className={this._getRectStyle()}
                    />
        )
    }


}



ReactDOM.render (
    <GameOfLifeComponent />, document.getElementById('mount-point')
)
