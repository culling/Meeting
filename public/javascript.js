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
                <div className="box-heading-1"> Big Box </div>
                <div className="row"> 
                    <div className={"col-md-6 first ".concat( this.state.editPaneDisplay )} >
                        <div className="box-heading-1">Edit</div>
                        <br />
                        <textarea className="editPanelTextArea"></textarea>
                    </div>
                    <div className="second">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box-heading-1">Recipie Name <button className="btn btn-default edit-button" onClick={this._onClick.bind(this)} >Edit</button></div>
                            </div>
                        </div>
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
