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
            childVisible: true
        }
    };

    render() {
        return (
            <div className = "big-box flex container">
                <h3> Big Box </h3>
                <div className="row"> 
                    <div className="col-md-6 first" onClick={this._onClick.bind(this)} >
                        First
                        {this.state.test}
                    </div>
                    <div className="second">
                        Second
                    </div>
                </div>

            </div>
        )
    }

  _onClick(){
      console.log('clicked');
      console.log( this.state.childVisible );
        this.setState({childVisible: !this.state.childVisible});
  }

}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)

ReactDOM.render (
    <BigBox />, document.getElementById('big-box')
)
