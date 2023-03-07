// import react, {Component} from 'react';
import {Component} from 'react';

class reactProxy extends Component {
    componentDidMount = async() => {
        const response = await fetch('/api/dbconn');
        const body = await response.json();
        console.log("body.message : " + body.message);
    }
    render(){
        return(
            <><h1>[Proxy] Call Node Api Get</h1></>
        )
    }
}

export default reactProxy;