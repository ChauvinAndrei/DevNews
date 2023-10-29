// == LOADING
export const SET_IS_LOADING_COMMENT = 'SET_IS_LOADING_COMMENT';

export const  HANDLE_OPEN_MESSAGE = ' HANDLE_OPEN_MESSAGE';
export const RESET_OPEN_MESSAGE = 'RESET_OPEN_MESSAGE';

export const GET_POST_FROM_API = 'GET_POST_FROM_API';
export const GET_POST_FROM_API_SUCESS = 'GET_POST_FROM_API_SUCESS';
export const SET_NEW_COUNT_POST_DISPLAY = 'SET_NEW_COUNT_POST_DISPLAY';
export const SET_NEW_COUNT_COMMENT_DISPLAY = 'SET_NEW_COUNT_COMMENT_DISPLAY';

//== POST
export const SET_INPUT_VALUE_MESSAGE = 'SET_INPUT_VALUE_MESSAGE';
export const RESET_VALUE_INPUT_POST = 'RESET_VALUE_INPUT_POST';
export const UPDATE_VALUE_POST_DATA = 'UPDATE_VALUE_POST_DATA';
export const SEND_VALUE_POST_DATA = 'SEND_VALUE_POST_DATA';
export const SEND_VALUE_POST_DATA_SUCCESS = 'SEND_VALUE_POST_DATA_SUCCESS';

//== COMMENT
export const SET_CURRENT_INPUT_BOOL = 'SET_CURRENT_INPUT_BOOL';
export const SET_INPUT_VALUE_COMMENT = 'SET_INPUT_VALUE_COMMENT';
export const  RESET_VALUE_INPUT_COMMENT = ' RESET_VALUE_INPUT_COMMENT';
export const UPDATE_VALUE_COMMENT_DATA = 'UPDATE_VALUE_COMMENT_DATA';
export const SEND_VALUE_COMMENT_DATA = 'SEND_VALUE_COMMENT_DATA';
export const SEND_VALUE_COMMENT_DATA_SUCCESS = 'SEND_VALUE_COMMENT_DATA_SUCCESS';

//= SUCCCES ERROR
export const START_SEND_VALUE_POST_DATA = 'TART_SEND_VALUE_POST_DATA';
export const COMPLETE_SEND_VALUE_POST_DATA = 'COMPLETE_SEND_VALUE_POST_DATA';
export const SET_ERROR_SEND_VALUE_POST_DATA = 'SET_ERROR_SEND_VALUE_POST_DATA';


//=================

export const setIsLoading = ( isLoading ) => ({
    type: SET_IS_LOADING_COMMENT,
    isLoading,
});

export const handleOpenMessage = () => ({
    type: HANDLE_OPEN_MESSAGE,
})

export const resetOpenedMessageBox = () => ({
    type: RESET_OPEN_MESSAGE,
});

export const getPostFromApi = () => ({
    type: GET_POST_FROM_API,
})

export const getPostFromApiSuccess = ( postsData ) => ({
    type: GET_POST_FROM_API_SUCESS,
    postsData,
})

export const SetNewCountPostDisplay = () => ({
    type: SET_NEW_COUNT_POST_DISPLAY,
})

export const SetNewCountCommentDisplay = ( index ) => ({
    type: SET_NEW_COUNT_COMMENT_DISPLAY,
    commentID: index,
})

// ===  POST 
export const setInputValueMessage = (value, name) => ({
    type: SET_INPUT_VALUE_MESSAGE,
    value,
    name,
})

export const updateValuePostData = ( data ) => ({
    type: UPDATE_VALUE_POST_DATA,
    data,
})

export const resetValueInputPost = () => ({
    type: RESET_VALUE_INPUT_POST,
})

export const sendValuePostData = () => ({
    type: SEND_VALUE_POST_DATA,
})

export const sendValuePostDataSucess = ( newPost ) => ({
    type: SEND_VALUE_POST_DATA_SUCCESS,
    newPost,
})

// === COMMENT
export const setCurrentInputBool = ( arrayBool ) => ({
    type: SET_CURRENT_INPUT_BOOL,
    arrayBool,
})

export const setInputValuePost = (value, name) => ({
    type: SET_INPUT_VALUE_COMMENT,
    value,
    name,
})

export const  resetValueInputComment = () => ({
    type:  RESET_VALUE_INPUT_COMMENT,
});

export const updateValueCommenttData = ( data, index ) => ({
    type: UPDATE_VALUE_COMMENT_DATA,
    data,
    index,
})

export const sendValueCommentData = () => ({
    type: SEND_VALUE_COMMENT_DATA,
})

export const sendValueCommentDataSucess = ( newComment ) => ({
    type: SEND_VALUE_COMMENT_DATA_SUCCESS,
    newComment,
})


export const startSendValuePostData = () => ({
    type: START_SEND_VALUE_POST_DATA,
});
  
export const completeSendValuePostData = () => ({
    type: COMPLETE_SEND_VALUE_POST_DATA,
});
  
export const setErrorSendValuePostData = (error) => ({
    type: SET_ERROR_SEND_VALUE_POST_DATA,
    payload: error,
});
