// == COMPONENT


// == ACTION 
import { 
    GET_DATA_ARTICLE_FROM_API_SUCESS, 
    COMMENT__FROM_API_SUCCESS, 
    SET_VALUE_COMMENT_ARTICLE,
    GET_DATA_COMMENT, 
    SEND_VALUE_COMMENT_SUCESS,
    CLEAR_COMMENTS,
    SET_IS_LOADING_COMMENT,
    GET_RANDOM_ARTICLE_FROM_DB,
    } from "../Action/article";


const InitialState = {
    
    articles: [],
    randomArticle: [],

    comments: [],

    inputComment: {
        comment: '',
    },

    commentData: {},

    isLoading: true,

};

const ArticleReducer = ( state = InitialState, action = {} ) => {

    switch (action.type) {

        
        case SET_IS_LOADING_COMMENT:
            return {
                ...state,
                isLoading: action.isLoading,
        };

        case GET_DATA_ARTICLE_FROM_API_SUCESS: 

            return {
                ...state,
                articles: action.articles,
            }
        
        case COMMENT__FROM_API_SUCCESS : {
            const data = action.data;
            return {
                ...state,
                comments: data,
                }
        }
        
        case CLEAR_COMMENTS: {
            return {
              ...state,
              comments: [],
            };
        }

        case SET_VALUE_COMMENT_ARTICLE: 
            return {
                ...state,
                inputComment: {
                    ...state.inputComment,
                    comment: action.value,
                }
            }
        case GET_DATA_COMMENT:
            return {
                ...state,
                commentData: action.dataComment,
            }
        
        case SEND_VALUE_COMMENT_SUCESS: 
            return {
                ...state,
                comments: [...state.comments, action.commentData],
                inputComment: {
                    ...state.inputComment,
                    comment: '',
                }
            }

        case GET_RANDOM_ARTICLE_FROM_DB: {
            return {
                ...state,
                randomArticle: action.randomData,
            }
        }


        default: 
          return state;
    }
};


export default ArticleReducer;