// == COMPONENT

// == ACTION 
import { 
    GET_POST_FROM_API_SUCESS, 
    SEND_VALUE_POST_DATA_SUCCESS, 
    SET_INPUT_VALUE_MESSAGE, 
    UPDATE_VALUE_POST_DATA,
    UPDATE_VALUE_COMMENT_DATA, 
    SET_INPUT_VALUE_COMMENT,
    SEND_VALUE_COMMENT_DATA_SUCCESS,
    SET_CURRENT_INPUT_BOOL,
    RESET_VALUE_INPUT_POST,
    RESET_VALUE_INPUT_COMMENT,
    SET_NEW_COUNT_POST_DISPLAY,
    SET_NEW_COUNT_COMMENT_DISPLAY,
    START_SEND_VALUE_POST_DATA,
    COMPLETE_SEND_VALUE_POST_DATA,
    SET_ERROR_SEND_VALUE_POST_DATA,
    HANDLE_OPEN_MESSAGE,
    SET_IS_LOADING_COMMENT,
    RESET_OPEN_MESSAGE,
    
} from "../Action/postsForum";

const InitialState = {
    

    isSending: false,
    isLoading: true,

    error: null,

    posts: [],

    responsePost: [],

    inputMessage: {
        'text-area-post': '',
        'title-post': '',
    },

    messageData: {},


    currentInputSend: {},

    inputCommentValue: {
        inputcomment_0: '',
    },

    index: -1,

    commentData: {},

    postSend: false,

    moreCount: 15,

    moreCommentCount: 5,

    commentMoreCounts: {}, 

    iOpenedMessageBox: false,
};

const ForumReducer = ( state = InitialState, action = {} ) => {

    switch (action.type) {


        case SET_IS_LOADING_COMMENT: 
            return {
                ...state,
                isLoading: action.isLoading,
            }

        case HANDLE_OPEN_MESSAGE:
            return {
                ...state,
                iOpenedMessageBox: !state.iOpenedMessageBox,
            }
        
        case RESET_OPEN_MESSAGE:
            return {
                ...state,
                iOpenedMessageBox: false,
            }
        // === POST
        case GET_POST_FROM_API_SUCESS:

            return {
                ...state,
                posts: action.postsData,
        };

        case SET_INPUT_VALUE_MESSAGE: 
    
            return {
                ...state,
                inputMessage: {
                ...state.inputMessage,
                [action.name]: action.value,
            },
        };

        case UPDATE_VALUE_POST_DATA: {
            const data = action.data;
            return{
               ...state,
                messageData:{
               ...state.messageData,
                ...data,
              }
           }
        }
        
        case SEND_VALUE_POST_DATA_SUCCESS: 
            return {
                ...state,
                posts: [...state.posts, action.newPost],
        }
        
        case RESET_VALUE_INPUT_POST : 
            return {
                ...state,
                inputMessage: {
                    ...state.inputMessage,
                    'text-area-post': '',
                    'title-post': '',
                }
        }

        case SET_NEW_COUNT_POST_DISPLAY:
            return {
                ...state,
                moreCount: state.moreCount += 15,
            }

        // === COMMENT

        case SET_CURRENT_INPUT_BOOL: 

        return{
            ...state,
            currentInputSend: {
                ...state.currentInputSend,
                ...action.arrayBool
            }

        }

        case SET_NEW_COUNT_COMMENT_DISPLAY:{
            const { commentID } = action;
            return {
                ...state,
                commentMoreCounts: {
                    ...state.commentMoreCounts,
                    [commentID]: (state.commentMoreCounts[commentID] || 5) + 5,
                },
            }
        }

        case SET_INPUT_VALUE_COMMENT: 
            return {
                ...state,
                inputCommentValue: {
                    ...state.inputCommentValue,
                    [action.name]: action.value,
                }
            }

        case UPDATE_VALUE_COMMENT_DATA: {
            const data = action.data;
            return{
               ...state,
               commentData:{
               ...state.commentData,
                ...data,
              },
              index: action.index,
           }
        } 
        
        case SEND_VALUE_COMMENT_DATA_SUCCESS: 

            const { newComment } = action;
            const toInteger = parseInt(newComment.post_id);
            
            const postIndex = state.posts.findIndex(post => post.post.id === toInteger);
          
            if (postIndex !== -1) {
     
                const updatedPosts = [...state.posts];        
            
                updatedPosts[postIndex] = {
                    ...updatedPosts[postIndex],
                    commentaires: [...updatedPosts[postIndex].commentaires, newComment],
                };

            return {
                    ...state,
                    posts: updatedPosts,
                    inputCommentValue: {
                        ...state.inputCommentValue,
                        [`inputcomment_${state.index}`]: '', 
                    },
                };
            }
        
        case RESET_VALUE_INPUT_COMMENT: 
            return {
                ...state,
                inputCommentValue: {
                    ...state.inputCommentValue,
                    [`inputcomment_${state.index}`]: '', 
                },
            };

        case START_SEND_VALUE_POST_DATA:
            return { ...state, isSending: true, error: null };

        case COMPLETE_SEND_VALUE_POST_DATA:
            return { ...state, isSending: false, error: null };

        case SET_ERROR_SEND_VALUE_POST_DATA:
            return { ...state, isSending: false, error: action.payload };   

        default: 
          return state;
    }
    
};


export default ForumReducer;
