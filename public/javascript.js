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
    render(){
        return (
            <div className = "big-box container">
                <h3> Big Box </h3>
            </div>
        )
    }
}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)

ReactDOM.render (
    <BigBox />, document.getElementById('big-box')
)
