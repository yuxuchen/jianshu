import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


//dangerouslySetInnerHTML 防止代码被转义
class Write extends PureComponent{
    render(){
        const { loginStatus } = this.props;
        if (loginStatus) {
            return(
                 <div>write article</div>
             )}else {
                return <Redirect to='/login' />
             }
        
    }
}


const mapState = (state) => ({
    loginStatus: state.getIn(['login','login'])
})


export default connect(mapState, null)(Write);