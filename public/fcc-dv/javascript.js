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
    constructor(){
        super();

        this.state = {
            markDown: ""
        }
    }

    _logit(event){ 
        console.log(event.target.value);
        event.preventDefault();
        this.setState({markDown: event.target.value});
    }

    render(){ 
        return (
        <div id="bigBox" className="container-fluid"> 
            <div className="row">
                <div className=" col-xs-6 col-md-6" id="editor-pane-container">
                    <div className="heading-class-3"> Markdown Editor </div>
                    <div className="well">
                        <textarea className="editor-input form-control" onChange={ this._logit.bind(this) } ></textarea>
                    </div>
                </div>
                <div className=" col-xs-6 col-md-6 " id="preview-pane-container">
                    <PreviewPane myData={this.state.markDown} />
                </div>
            </div>
        </div>
        )
    }
}

class PreviewPane extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return (
        <div className="previewPane">
            <div className="heading-class-3"> Markdown Preview </div>
            <div className="well">
                <div className="editor-preview" >
                    { this._getMarkdown() }
                </div>
            </div>
        </div>
        )
    }

    _getMarkdown(text = (this.props.myData || "") ){
        return  ( <div dangerouslySetInnerHTML={{__html: marked( text )}} /> 
        );
    }
}

/*
ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
);
*/

ReactDOM.render (
    <BigBox />, document.getElementById("bigbox-mount-point")
);