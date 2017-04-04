
class TestComponent extends React.Component {
    constructor(){
        super();
        this.state=({})    
    }
    
    render(){
        
        return (
    <div> 
        <h3>React is Go!</h3> 

        <div className="container">
        </div>
    </div>
        );
    }


}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)
