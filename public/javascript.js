

class TestComponent extends React.Component {
    constructor(){
        super();
        this.state = ({
            rows: 10,
            cellHeight: 10,
            columns: 10,
            cellWidth: 10,
            viewPortCSS: {
                "backgroundColor":"blue"
            },
            cellsArray: [],
            blankCell:  {
                column: 0,
                row:    0,
                filled: true
            }

        })
    }
    render(){
        return (
    <div id="body-container">
        <h1> React is Go! </h1>
        <button onClick={(this._makeRandomCell).bind(this) } > Make Random Cell </button>
        <button onClick={() => this._blockOfCells() } > Make Cell Block </button>

        <button onClick={() => (this._initalCell(1, 1) )   }> Make Inital Cell </button>
        <button onClick={() => (this._showState() )   }> Show State </button>
        
        <br />
        <svg    width={this.state.cellWidth * this.state.columns}
                height={this.state.cellHeight * this.state.rows}  
                style={this.state.viewPortCSS}
                >
                {this.state.cellsArray.map((cell, i) => <Cell 
                        key={i}
                        cellHeight={this.state.cellHeight} 
                        cellWidth= {this.state.cellWidth} 
                        column=     {cell.column}
                        row=        {cell.row}
                />)}


        </svg>
    </div>
        );
    }

    _initalCell(column, row){
        let cell = Object.assign({},this.state.blankCell);
        let localCellsArray = this.state.cellsArray.map(element => element );
        cell.column = ( column );
        cell.row    = ( row );
        cell.filled = true;
        localCellsArray.push(cell);
        this.setState({cellsArray: localCellsArray});
        console.log( this._checkNeighborsOfCell(cell.column, cell.row) );
    }
    
    _initalCell2(column, row){
        let cell = Object.assign({},this.state.blankCell);
        let localCellsArray = this.state.cellsArray.map(element => element );
        cell.column = ( column );
        cell.row    = ( row );
        cell.filled = true;
        localCellsArray.push(cell);
        this.setState({cellsArray: localCellsArray});
        console.log( this._checkNeighborsOfCell(cell.column, cell.row) );
    }

    _showState(){
        console.log(this.state)
    }

    _blockOfCells(){
        let localCellsArray = this.state.cellsArray.map(element => element );
        let blockArray = [[0, 0],
        [0, 1],        
        [0, 2],
        [1, 0],
        //[1,1];
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]];


        blockArray.map(e =>{
        let cell = Object.assign({},this.state.blankCell);
        cell.column = ( e[0] );
        cell.row    = ( e[1] );
        cell.filled = true;
        localCellsArray.push(cell);
        });
        this.setState({cellsArray: localCellsArray});

        console.log(this.state.cellsArray);
        //console.log( this._checkNeighborsOfCell(cell.column, cell.row) );
    }


    _checkNeighborsOfCell(column,row){
        let neighbors = 0;
        //console.log(this._checkCell((column -1   ),( row -1)))
        neighbors += this._checkCell((column -1   ),( row -1));
        neighbors += this._checkCell((column      ),( row -1));
        neighbors += this._checkCell((column +1   ),( row -1));
        neighbors += this._checkCell((column -1   ),( row   ));
        //neighbors += this._checkCell((column      ),( row   ));
        neighbors += this._checkCell((column +1   ),( row   ));
        neighbors += this._checkCell((column -1   ),( row +1));
        neighbors += this._checkCell((column      ),( row +1));
        neighbors += this._checkCell((column +1   ),( row +1));

        //console.log(neighbors);
        return neighbors;
    }

    _checkCell(column, row){
        let val = this.state.cellsArray.reduce((acc, element) => {
            //console.log( element );
            if( (element.column === column) && (element.row === row) ){
                //console.log(acc);
                return acc = 1;
            }else{
                return acc + 0;
            }
        }, 0 );
        //console.log(val);
        return val;
    }



    _makeRandomCell(){
        let cell = Object.assign({},this.state.blankCell);        
        let localCellsArray = this.state.cellsArray.map(element => element );
                
        cell.column = ( Math.floor((this.state.columns )*(Math.random())) );
        cell.row    = ( Math.floor((this.state.rows    )*(Math.random())) );
        cell.filled = true;
        localCellsArray.push(cell);
        this.setState({cellsArray: localCellsArray})
        console.log(this._checkNeighborsOfCell(cell.column, cell.row)) ;
    }


}

class Cell extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <rect   x={this.props.column * this.props.cellWidth} 
                    y={this.props.row    * this.props.cellHeight} 
                    height={this.props.cellHeight} 
                    width={this.props.cellWidth} 
                    stroke="white"
                    />
        )
    }
}



ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)
