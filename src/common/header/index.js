import React from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {
    HeaderWrapper, Logo, Nav, 
    NavItem,NavSearch,Addition,
    Button, SearchWrapper
} from './style';
import {GlobalStyle} from '../../statics/iconfont/iconfont'

const Header = (props)=> {
    return(
    <HeaderWrapper>
        <Logo/>
        <GlobalStyle/>
        <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载App</NavItem>
            <NavItem className='right'>登陆</NavItem>
            <NavItem className='right'>
                <i className="iconfont">&#xe636;</i>
            </NavItem>
            <SearchWrapper>
            <CSSTransition
            in={props.focused}
            timeout={200}
            classNames="slide">
            <NavSearch
                className={props.focused ? 'focused':''}
                onFocus={props.handleInputFocus}
                onBlur={props.handleInputBlur}
            ></NavSearch>
            </CSSTransition>
                <i className={props.focused ? 'focused iconfont':'iconfont'}>
                    &#xe604;</i>
            </SearchWrapper>
            <Addition>
                <Button className='writing'>
                <i className="iconfont">&#xe67e;</i>
                    写文章
                    </Button>
                <Button className='reg'>注册</Button>
            </Addition>
        </Nav>
    </HeaderWrapper>
    );
}


const mapStateToProps=(state)=>{
    return{
        focused:state.focused
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleInputFocus() { 
            const action={
                type:'search_focus'
            };
            dispatch(action);
        },
        handleInputBlur() {
            const action={
                type:'search_blur'
            };
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);