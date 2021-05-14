import React,{Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import  {actionCreators} from './store';
import {actionCreators as loginActionCreators} from '../../pages/login/store';
import { Link } from 'react-router-dom';
import {
    HeaderWrapper, Logo, Nav, 
    NavItem,NavSearch,SearchInfo,SearchInfoItem, 
    SearchInfoTitle,SearchInfoSwitch,SearchInfoList,
    Addition,Button, SearchWrapper
} from './style';
import {GlobalStyle} from '../../statics/iconfont/iconfont';
import {ResetStyle} from '../../style';

class Header extends Component{
    getListArea(){
        const { focused, list, page, mouseIn, totalPage,
            handleMouseEnter,handleMouseLeave,handleChangePage } 
            = this.props;
        const newList = list.toJS();
        const pageList=[];

        if (newList.length){
            for (let i=(page-1)*10; i<page*10; i++){
                if(newList[i]){
                    pageList.push(
                        <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                    )
                }else{
                    continue
                }
                
            }
        }
        
        if(focused || mouseIn){
            return(
                <SearchInfo 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                > 
                        <SearchInfoTitle>
                            热门搜索
                            <SearchInfoSwitch 
                            onClick={()=>handleChangePage(page,totalPage, this.spinIcon)}
                            > 
                                <i ref={(icon)=>{this.spinIcon=icon}} className="iconfont spin">&#xe851;</i>
                                换一批</SearchInfoSwitch>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {pageList}
                        </SearchInfoList>
                    </SearchInfo>
            )
        }else{
            return null;
        }
    }
    render(){
        const {focused, handleInputFocus, handleInputBlur, list, login, logout} = this.props;
        return(
            <HeaderWrapper>
                <ResetStyle/>
                    <Link to = '/'>
                        <Logo/>
                    </Link>
                    <GlobalStyle/>
                <Nav>
                <Link to = '/'>
                    <NavItem className='left active'>首页</NavItem>
                </Link>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        login ? <NavItem onClick = {logout} className='right'>退出</NavItem> : 
                        <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                    }
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                    <CSSTransition
                    in={focused}
                    timeout={200}
                    classNames="slide">
                    <NavSearch
                        className={focused ? 'focused':''}
                        onFocus={() => handleInputFocus(list)}
                        onBlur={handleInputBlur}
                    ></NavSearch>
                    </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom':'iconfont zoom'}>
                            &#xe604;</i>
                            {this.getListArea()}
                    </SearchWrapper>
                    <Addition>
                        <Link to='/write'>
                            <Button className='writing'>
                                <i className="iconfont">&#xe67e;</i>
                            写文章
                            </Button>
                        </Link>
                        <Button className='reg'>注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
            );
    }
}

//getIn得到header下面的focused的值
const mapStateToProps=(state)=>{
    return{
        focused:state.getIn(['header','focused']),
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        mouseIn:state.getIn(['header','mouseIn']),
        totalPage:state.getIn(['header','totalPage']),
        login: state.getIn(['login','login'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleInputFocus(list) { 
            console.log(list);
            (list.size === 0) && dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            //为了取字符串中的数字
            let originAngle=spin.style.transform.replace(/[^0-9]/ig,'');
            if (originAngle) {
                originAngle = parseInt(originAngle,10);
            }else{
                originAngle=0;
            }
            spin.style.transform= 'rotate(' + (originAngle + 360) +'deg)';
            if (page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);