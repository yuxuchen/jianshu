import React,{Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import  {actionCreators} from './store';
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
            handleMouseEnter,handleMouseLeave,handleChangePage} 
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
        const {focused, handleInputFocus, handleInputBlur, list} = this.props;
        return(
            <HeaderWrapper>
                <ResetStyle/>
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
}

//getIn得到header下面的focused的值
const mapStateToProps=(state)=>{
    return{
        focused:state.getIn(['header','focused']),
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        mouseIn:state.getIn(['header','mouseIn']),
        totalPage:state.getIn(['header','totalPage'])
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
            
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);