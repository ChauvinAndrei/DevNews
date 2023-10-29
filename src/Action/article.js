export const SET_IS_LOADING_COMMENT = 'SET_IS_LOADING_COMMENT';

//- === DISPLAY ARTICLE WITH COMMENT 
export const GET_DATA_ARTICLE_FROM_API = 'GET_DATA_ARTICLE_FROM_API';

export const GET_DATA_ARTICLE_FROM_API_SUCESS = 'GET_DATA_ARTICLE_FROM_API_SUCESS';

export const GET_DATA_COMMENT__FROM_API = 'GET_DATA_COMMENT__FROM_API';

export const COMMENT__FROM_API_SUCCESS = 'COMMENT__FROM_API_SUCCESS';

//- === DISPLAY NEW COMMENT IN ARTICLE

export const SET_VALUE_COMMENT_ARTICLE = 'SET_VALUE_COMMENT_ARTICLE';

export const GET_DATA_COMMENT = 'GET_DATA_COMMENT';

export const SEND_VALUE_COMMENT_API = 'SEND_VALUE_COMMENT_API';

export const SEND_VALUE_COMMENT_SUCESS = 'SEND_VALUE_COMMENT_SUCESS';

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

// ========================= SLIDER RANDOM
export const GET_RANDOM_ARTICLE = 'GET_RANDOM_ARTICLE';
export const GET_RANDOM_ARTICLE_FROM_DB = 'GET_RANDOM_ARTICLE_FROM_DB';

// ========================= REPORT
export const SET_REPORT_COMMENT = 'SET_REPORT_COMMENT';



export const setIsLoading = ( isLoading ) => ({
    type: SET_IS_LOADING_COMMENT,
    isLoading,
});

// DISPLAY ARTICLE WITH COMMENT 
export const getDataArticleFromApi = () => ({
    type: GET_DATA_ARTICLE_FROM_API,
})

export const getDataArticleSucess = ( articles ) => ({
    type: GET_DATA_ARTICLE_FROM_API_SUCESS,
    articles,
});

export const getCommentDataFromApi = ( id ) => ({
    type: GET_DATA_COMMENT__FROM_API,
    id,
})

export const commentDataFromApiSuccess = ( data ) => ({
    type: COMMENT__FROM_API_SUCCESS,
    data,
})

// DISPLAY NEW COMMENT IN ARTICLE

export const setValueCommentArticle = ( value ) => ({   // => Mise a jour de la value input post commentaire de l'article avec champs contrôlés
    type: SET_VALUE_COMMENT_ARTICLE,
    value,
})

export const getDataComment = ( dataComment ) => ({
    type: GET_DATA_COMMENT,
    dataComment,
})

export const sendValueCommentApi = () => ({
    type: SEND_VALUE_COMMENT_API,
})


export const SendValueCommentToApiSuccess = ( commentData ) => ({
    type: SEND_VALUE_COMMENT_SUCESS,
    commentData,
})

export const clearOldComment = () => ({
    type: CLEAR_COMMENTS,
})

// ========================= SLIDER RANDOM

export const getRandomArticle = () => ({
    type: GET_RANDOM_ARTICLE,
});

export const setRandomDataFromDb = ( randomData ) => ({
    type: GET_RANDOM_ARTICLE_FROM_DB,
    randomData,
})

// ========================= REPORT

export const setReportComment = ( commentId ) => ({
    type: SET_REPORT_COMMENT,
    commentId,
})
