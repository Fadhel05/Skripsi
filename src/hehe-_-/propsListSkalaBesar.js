import React,{Fragment} from 'react';
import ListSkalaBesar from './component/listSkalaBesar';

class PropsListSkalaBesar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page:0
        }
        
    }

    render(){
    return(
        <Fragment>
            <ListSkalaBesar
                data={this}
            ></ListSkalaBesar>
        </Fragment>
    )
    }
}
export default PropsListSkalaBesar;