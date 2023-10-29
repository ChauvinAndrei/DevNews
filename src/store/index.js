import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import UserMiddleware from "../middleware/UserMiddleware";
import ArticleMiddleWare from "../middleware/ArticleMiddleWare";
import HomeMiddleWare from '../middleware/HomeMiddleWare';
import ForumMiddleWare from "../middleware/ForumMiddleWare";

import rootReducer from "../Reducers";

const middleWare = [UserMiddleware, HomeMiddleWare, ArticleMiddleWare, ForumMiddleWare];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;