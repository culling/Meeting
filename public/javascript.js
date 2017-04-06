

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
        <button onClick={this._makeRandomCell.bind(this) } > Make Random Cell </button>
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

                {/*<Cell   cellHeight={this.state.cellHeight} 
                        cellWidth= {this.state.cellWidth} 
                        column={ ( Math.floor((this.state.columns -1)*(Math.random())) ) } 
                        row=   { ( Math.floor((this.state.rows    -1)*(Math.random())) ) }/>
                        */}
        </svg>
    </div>
        );
    }

    _makeRandomCell(){
        let cell = Object.assign({},this.state.blankCell);
        console.log(this.state.cellsArray);
        
        let localCellsArray = this.state.cellsArray.map(element => element );
                
        cell.column = ( Math.floor((this.state.columns -1)*(Math.random())) );
        cell.row    = ( Math.floor((this.state.rows    -1)*(Math.random())) );
        cell.filled = true;
        localCellsArray.push(cell);
        this.setState({cellsArray: localCellsArray})
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
