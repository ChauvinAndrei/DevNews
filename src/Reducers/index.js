import { combineReducers } from "redux";

import pageReducer from "./pageReducer";
import UserReducer from "./UserReducer";
import ArticleReducer from "./ArticleReducer";
import TopLikeReducer from "./TopLikeReducer";
import ForumReducer from "./ForumReducer";
import HomeReducer from "./HomeReducer";


const rootReducer = combineReducers({
    page: pageReducer,
    User: UserReducer,
    articlesReducer: ArticleReducer,
    toplikeReducer: TopLikeReducer,
    forum: ForumReducer,
    home: HomeReducer,
});

export default rootReducer;