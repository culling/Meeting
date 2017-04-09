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
                }

            }
        });
        this.focus = this.focus.bind(this);
    };

    focus() {
        // Explicitly focus the text input using the raw DOM API
        //this.randomtiles.focus();
    }

    componentDidMount(){
        this._generateMap();
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
                                {/* this.state.gameBoard.map((tile ,i) => 
                                    <div key = {i}>
                                        <p> Column: {tile.column} </p>
                                        <p> Row: {tile.row}</p>
                                        <p> {i} </p>
                                    </div>  ) */}
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
        let mapArray    = [];

        for(let x = 0; x < this.state.columns; x++){
            for(let y=0; y < this.state.rows; y++){

                let currentTile = Object.assign({},  this.state.tiles.floor);

                if((x==0 ) || (x== this.state.columns -1) ||
                    (y== 0) || (y == this.state.rows -1)){
                        currentTile = Object.assign({}, this.state.tiles.wall);
                }

            
                currentTile.column = x;
                currentTile.row    = y;

                if (x == 1){
                    console.log(currentTile);
                }

                mapArray.push( currentTile );                
            }
        }
        //console.log(blockArray);
        this.setState({gameBoard: mapArray});
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
