// import react, {Component} from 'react';
//미사용중
import {Component} from 'react';

class reactProxy extends Component {
    componentDidMount = async() => {
        const response = await fetch('/api/apitool');
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