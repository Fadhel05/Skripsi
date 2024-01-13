import React from 'react';
import Login from './component/login';



class Logins extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:""
        }
    }
    render() {
        return (
            <Login
                data={this}
            >

            </Login>
        );
    }


}


export default Logins;