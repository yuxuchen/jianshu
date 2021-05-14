import {fromJS} from 'immutable';
import * as constants from './constants';

//state的状态是不可以被改变的，为了避免他被改变
//在初始化state的时候就把它创建为immutable的对象
const defaultState=fromJS({
    topicList:[],
    articleList:[],
    recommendList:[],
    articlePage: 1,
    showScroll: false
});

const changeHomeData = (state, action) =>{
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList:fromJS(action.articleList),
        recommendList:fromJS(action.recommendList)
    })
}

const addArticleList = ( state, action ) => {
    return state.merge ({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage':action.nextPage
    })
}

 const reducer = (state=defaultState,action)=>{
    switch(action.type){
        case constants.CHANGE_HOME_DATA:
            return changeHomeData(state, action);
        case constants.ADD_ARTICLE_LIST: 
            return addArticleList( state, action);
            case constants.TOGGLE_SCROLL_SHOW:
                return state.set('showScroll', action.show);
        default:
            return state;
    }
}

export default reducer;
