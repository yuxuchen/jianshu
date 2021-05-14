import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actionCreators } from './store';
import { BackTop } from './style';
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight
 } from './style';

//PureComponent 包含shouldComponent， 他只会更新需要更新的组件
//可以优化性能
//尽量在数据immutable的时候使用PureComponent这个组件
class Home extends PureComponent{
    handleScrollTop(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img alt='' className = 'banner-img' src="https://pic3.zhimg.com/100/v2-fd8db99886ef7108f5f658d9f0dbadee_hd.png"/>
                    <Topic/>
                    <List/>
                </HomeLeft>
                    <HomeRight>
                        <Recommend/>
                        <Writer/>
                    </HomeRight>
                    {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>backTop</BackTop>  : null}
            </HomeWrapper>
        )
    }
    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.props.changeScrollTopShow);
    }
    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow);
    }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home','showScroll'])
})

const mapDispatch = (dispatch)=>({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow(){
        if (document.documentElement.scrollTop > 300){
            dispatch(actionCreators.toggleTopShow(true))
        }else{
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
});

export default connect(mapState,mapDispatch)(Home);



