import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';


//创建对象形式的actionCreator
//尽量将代码中的字符串写为常量，这样出错了可以直观的看出来
//所以创建constants
const changeHomeData = (result) =>({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
})

const addHomeList = (list, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})

//函数形式的actionCreator
export const getHomeInfo = () =>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const result = res.data.data;
            dispatch(changeHomeData(result));
        })
    }
}

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then((res) => {
            const result = res.data.data;
            dispatch(addHomeList(result,page + 1));
        });
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_SCROLL_SHOW,
    show
})