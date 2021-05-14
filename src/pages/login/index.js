import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { actionCreators } from './store';
import { LoginWrapper ,LoginBox, Input, Button } from './style';



//dangerouslySetInnerHTML 防止代码被转义
class Login extends PureComponent{
    render(){
        const { loginStatus } = this.props;
        if (!loginStatus) {
            return(
                <LoginWrapper>
                    <LoginBox>
                        <form>
                         <Input placeholder = 'account' ref={(input) => {this.account = input}}/>
                         <Input placeholder = 'password' type='password' ref = {(input) => {this.password = input}}/>
                         <Button onClick={() => {this.props.login(this.account,this.password)} }>login</Button>
                         </form>
                     </LoginBox>
                 </LoginWrapper>
                 
             )}else {
                return <Redirect to='/' />
             }
        
    }
}


const mapState = (state) => ({
    loginStatus: state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
    login(accountEle, passwordEle){
          dispatch(actionCreators.login(accountEle.value, passwordEle.value))
        
    }
})

export default connect(mapState, mapDispatch)(Login);