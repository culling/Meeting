$(document).ready(function(){
    console.log("Loaded JS");
});

class TestComponent extends React.Component {
    render(){
        return (
        <h1> React is Go! </h1>
        );
    }
}

class BigBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            test: 'my Test',
            editPaneDisplay: "visible"
        }
    };

    

    render() {
        
        return (
            <div className = "big-box flex container">
                <h3> Big Box </h3>
                <div className="row"> 
                    <div className={"col-md-6 first ".concat( this.state.editPaneDisplay )} >
                        First
                        {this.state.test}
                    </div>
                    <div className="second">
                        Second
                        <button className="btn btn-default" onClick={this._onClick.bind(this)} >Edit</button>
                    </div>
                </div>

            </div>
        )
    }

  _onClick(){
      console.log('clicked');
      console.log( this.state.editPaneDisplay );
        
        this.setState({editPaneDisplay: ((this.state.editPaneDisplay === "visible") ?  "collapse" : "visible"  ) });
        
  }

}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)

ReactDOM.render (
    <BigBox />, document.getElementById('big-box')
)
