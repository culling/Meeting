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

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)