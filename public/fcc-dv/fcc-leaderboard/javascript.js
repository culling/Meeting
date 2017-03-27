$(document).ready(function(){
    console.log("Loaded JS");

    //https://fcctop100.herokuapp.com/api/fccusers/top/recent
    //https://fcctop100.herokuapp.com/api/fccusers/top/alltime
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
        this.state={
            usersRecent: []
        }
    }

    componentWillMount(){
        this._orderByRecent();
    }

    render(){
        return (
            <div className="main-body">
                <table className="table table-striped" >
                <thead className="userHeader">
                    <tr>
                        <td>         </td>
                        <td > Username   </td>
                        <td ><a href="#" onClick={ this._orderByAlltime.bind(this) }  > Alltime    </a></td>
                        <td ><a href="#" onClick={ this._orderByRecent.bind(this) } > Recent     </a></td>
                    </tr>
                </thead>
                <tbody>
                    { this.state.usersRecent.map( user => <User key={user.username} user={user} /> ) }
                </tbody>
                </table> 
            </div>
        )
    }

    _test(){
        console.log("Test");
    }

    _orderByAlltime(event){
    //https://fcctop100.herokuapp.com/api/fccusers/top/alltime

        jQuery.ajax({
            method: 'GET',
            url:"https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
            success: (usersRecent)=>{
                this.setState({ usersRecent })
            }
        });


        this.setState({ usersRecent:
             this.state.usersRecent.sort(
                 function ( user, lastuser) {
                     return  user.alltime - lastuser.alltime
                    }).reverse()
            })
    }

    _orderByRecent(){
        
        jQuery.ajax({
            method: 'GET',
            url:"https://fcctop100.herokuapp.com/api/fccusers/top/recent",
            success: (usersRecent)=>{
                this.setState({ usersRecent })
            }
        });

        this.setState ({ 
            usersRecent: this.state.usersRecent.sort(
                function ( user, lastuser) {
                    return  user.recent - lastuser.recent
                }).reverse() 
            })
    }




}

class User extends React.Component{
    render(){
        return (
            <tr>
                <td> </td>
                <td><img src={ this.props.user.img } className="profilePic" ></img> { this.props.user.username}</td>
                <td>{ this.props.user.alltime }</td>
                <td>{ this.props.user.recent}  </td>
            </tr>
        )
    }
}

ReactDOM.render (
    <TestComponent />, document.getElementById('mount-point')
)

ReactDOM.render(
    <BigBox />, document.getElementById('big-box')
)