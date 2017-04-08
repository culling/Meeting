class GameOfLifeComponent extends React.Component {
    constructor(){
        super();
        this.state = ({
            rows: 20,
            cellHeight: 10,
            columns: 80,
            cellWidth: 10,
            viewPortCSS: {
                "backgroundColor":"blue"
            },
            cellsArray: [],
            blankCell:  {
                column: 0,
                row:    0,
                state:  "empty",
                generation: 0
            },
            possibleState:["empty", "filled"],
            generation: 0
        });
        this.focus = this.focus.bind(this);

    };

    focus() {
        // Explicitly focus the text input using the raw DOM API
        this.randomCells.focus();
    }


    render(){
        return (
    <div id="body-container" className="container">
        <h1> React is Go! </h1>
        <div className="controls">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                    <input  defaultValue="100" ref={(input)=> this.randomCells = input}></input>
                    <button onClick={() => this._makeRandomCells( this.randomCells.value ) } > Make Random Cells </button>

                    <button onClick={() => this._runStepAllCells(this.state.columns, this.state.rows) }>
                        Run Step All Cells
                    </button>
                    <button onClick={() => this._newGlider(0,0) }>New Glider</button>

                    <button onClick={() => this._clearAllCells( this.state.columns, this.state.rows)    }> Clear All Cells </button>
                    <button onClick={() => (this._showState() )   }> Show State </button>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <svg    width={this.state.cellWidth * this.state.columns}
                height={this.state.cellHeight * this.state.rows}  
                style={this.state.viewPortCSS}
                onClick={this._clickedBoard.bind(this) }
                >
                {this.state.cellsArray.map((cell, i) => <Cell 
                        key={i}
                        cellHeight={this.state.cellHeight} 
                        cellWidth= {this.state.cellWidth} 
                        column=     {cell.column}
                        row=        {cell.row}
                        state=      {cell.state}
                />)}
        </svg>
    </div>
        );
    };

    _showState(){
        console.log(this.state)
    }

    _clickedBoard(event){
        /*
        console.log("Board Clicked!");
        console.log(event.nativeEvent);
        console.log("x:" + event.nativeEvent.offsetX);
        console.log("y:" + event.nativeEvent.offsetY);
        */
        let boardPositionX = Math.floor((event.nativeEvent.offsetX)/this.state.cellWidth)
        let boardPositionY = Math.floor((event.nativeEvent.offsetY)/this.state.cellHeight)
        
        this._singleCell(boardPositionX, boardPositionY);
    }

    _newGlider(column, row){
        let localCellsArray = this.state.cellsArray.map(element => element );
        let blockArray =    [                         [(column +1), (row + 0)],                         
                                                                               [(column +2), (row + 1)],
                             [(column +0), (row + 2)],[(column +1), (row + 2)],[(column +2), (row + 2)]];
        blockArray.map(e =>{
            let cell = Object.assign({},this.state.blankCell);
            cell.column = ( e[0] );
            cell.row    = ( e[1] );
            cell.state  = "filled";
            cell.generation = this.state.generation;
            localCellsArray.push(cell);
        });
        this.setState({cellsArray: localCellsArray});
    }

    _clearOldCells( filterArray ){
        let resultArray = filterArray.filter(cell => {
            if (cell.generation >= ( this.state.generation ) ){
                return (cell);
            }
        });
        return resultArray;
    }


    _runStepAllCells(columns, rows){
        let localCellsArray = this.state.cellsArray.map(element => element );
        
        let currentGeneration = this.state.generation +1 ;
        this.setState({generation: currentGeneration});
        
        let blockArray = [];
        for (let i = 0; i < columns; i++){
            for(let j = 0; j < rows; j++){
                 blockArray.push([i,j]);
            }
        }
        blockArray.map(e =>{
            let column      = ( e[0] );
            let row         = ( e[1] );
            localCellsArray.push(this._runStep(column, row));
        });
        localCellsArray = this._clearOldCells(localCellsArray);
        
        this.setState({cellsArray: localCellsArray});
    };


    _runStep(column, row){
        let neighbors       = this._checkNeighborsOfCell(column, row);
        let cell            = Object.assign({},this.state.blankCell);
            cell.column         = ( column );
            cell.row            = ( row );
            cell.generation     = this.state.generation +1 ;
            cell.neighbors      = this._checkNeighborsOfCell(column, row);

        if(neighbors < 2){
            if(cell.state === "filled"){
                console.log("cell dies - underpopulation");
                cell.state  = "empty";
            }
        }else if(neighbors === 2){
            if ((this._checkCell(column, row)) === 1){
                //console.log(this._checkCell(column, row));
                cell.state = "filled";
                console.log(cell);
            }

        }else if(neighbors === 3){
                console.log("a new cell is born");
                cell.state  = "filled";
                //console.log(cell);                
        }else if(neighbors >= 4 ){
            console.log("cell dies - overpolulation")
            cell.state  = "empty";
        }
        return cell;
    };

   

    _clearAllCells(columns, rows){
        let blockArray = [];
        let localCellsArray = [];
        for (let i = 0; i < columns; i++){
            for(let j = 0; j < rows; j++){
                 blockArray.push([i,j]);
            }
        }
        blockArray.map(e =>{
            let cell = Object.assign({},this.state.blankCell);
            cell.column = ( e[0] );
            cell.row    = ( e[1] );
            cell.state  = "empty";
            cell.generation = this.state.generation;
            localCellsArray.push(cell);
        });
        this.setState({cellsArray: localCellsArray});
        console.log(this.state.cellsArray);
    };


    _checkNeighborsOfCell(column,row){
        let neighbors = 0;
        neighbors += this._checkCell((column -1   ),( row -1));
        neighbors += this._checkCell((column      ),( row -1));
        neighbors += this._checkCell((column +1   ),( row -1));
        neighbors += this._checkCell((column -1   ),( row   ));
        //neighbors += this._checkCell((column      ),( row   ));
        neighbors += this._checkCell((column +1   ),( row   ));
        neighbors += this._checkCell((column -1   ),( row +1));
        neighbors += this._checkCell((column      ),( row +1));
        neighbors += this._checkCell((column +1   ),( row +1));

        return neighbors;
    }


    _checkCell(column, row){
        let val = this.state.cellsArray.reduce((acc, element) => {
            if( (element.column === column) && (element.row === row) && (element.state === "filled" )
                && (element.generation >= this.state.generation  ) ){
                console.log(element);
                return acc = 1;
            }else{
                return acc + 0;
            }
        }, 0 );
        return val;
    }


    _makeRandomCells(count){
        let localCellsArray = this.state.cellsArray.map(element => element );                
        let blankArray = [];
        for(let i = 0; i < count; i++){
            let cell = Object.assign({},this.state.blankCell);        
            cell.column = ( Math.floor((this.state.columns )*(Math.random())) );
            cell.row    = ( Math.floor((this.state.rows    )*(Math.random())) );
            cell.state  = "filled";
            cell.generation = this.state.generation;
            localCellsArray.push(cell);
        }
        this.setState({cellsArray: localCellsArray})
    }


    _singleCell(column, row){
        let cell = Object.assign({},this.state.blankCell);
        let localCellsArray = this.state.cellsArray.map(element => element );
            cell.column = ( column );
            cell.row    = ( row );
            cell.state  = "filled";
            cell.generation = this.state.generation;
            localCellsArray.push(cell);
            this.setState({cellsArray: localCellsArray});
        console.log( this._checkNeighborsOfCell(cell.column, cell.row) );
    }


    _blockOfCells(){
        let localCellsArray = this.state.cellsArray.map(element => element );
        let blockArray =    [[0, 0],[0, 1],[0, 2],
                             [1, 0],       [1, 2],
                             [2, 0],[2, 1],[2, 2]];
        blockArray.map(e =>{
            let cell = Object.assign({},this.state.blankCell);
            cell.column = ( e[0] );
            cell.row    = ( e[1] );
            cell.state  = "filled";
            cell.generation = this.state.generation;
            localCellsArray.push(cell);
        });
        this.setState({cellsArray: localCellsArray});
    }


}

class Cell extends React.Component{
    constructor(){
        super();
    }

    _getFillColor(){
        if(this.props.state === "empty"){
            return "grey"
        }else if (this.props.state === "filled"){
            return "red"
        }
    }

    render(){
        return(
            <rect   x={this.props.column * this.props.cellWidth} 
                    y={this.props.row    * this.props.cellHeight} 
                    height={this.props.cellHeight} 
                    width={this.props.cellWidth} 
                    stroke="white"
                    fill  = {this._getFillColor()}
                    />
        )
    }


}



ReactDOM.render (
    <GameOfLifeComponent />, document.getElementById('mount-point')
)
