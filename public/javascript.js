

class TestComponent extends React.Component {
    constructor(){
        super();
        this.state = ({
            rows: 10,
            cellHeight: 10,
            columns: 10,
            cellWidth: 10,
            viewPortCSS: {
                "background-color":"blue"
            }

        })
    }
    render(){
        return (
    <div id="body-container">
        <h1> React is Go! </h1>
        <svg    width={this.state.cellWidth * this.state.columns}
                height={this.state.cellHeight * this.state.rows}  
                style={this.state.viewPortCSS}
                >
                
                <Cell   cellHeight={this.state.cellHeight} 
                        cellWidth= {this.state.cellWidth} 
                        x={ (this.state.columns -1)* this.state.cellHeight * (Math.random()) } 
                        y={ (this.state.rows    -1)* this.state.cellHeight * (Math.random()) } />
        </svg>
    </div>
        );
    }
}

class Cell extends React.Component{
    constructor(){
        super();
    
    }

    render(){
        return(
            <rect   x={this.props.x} 
                    y={this.props.y} 
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
