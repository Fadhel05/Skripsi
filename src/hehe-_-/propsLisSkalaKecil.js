import React,{Fragment} from 'react';
import ListSkalaKecil from './component/listSkalaKecil';

class PropsListSkalaKecil extends React.Component{
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
            <ListSkalaKecil
                data={this}
            ></ListSkalaKecil>
            
        </Fragment>
    )
    }
}
export default PropsListSkalaKecil;