export const GET_DATA_TOP_LIKE = 'GET_DATA_TOP_LIKE';
export const GET_DATA_TOP_LIKE_SUCESS = 'GET_DATA_TOP_LIKE_SUCESS';

// ========================= SEARCH
export const SET_INPUT_SEARCH_VALUE = 'SET_INPUT_SEARCH_VALUE';
export const RESET_INPUT_SEARCH_VALUE = 'RESET_INPUT_SEARCH_VALUE';
export const SEARCH_ACTUALITE = 'SEARCH_ACTUALITE';
export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST';
export const RESET_SEARCH_DATA = 'RESET_SEARCH_DATA';

// ========================= RANDOM POST
export const GET_RANDOM_POST = 'GET_RANDOM_POST';
export const GET_RANDOM_POST_SUCESS = 'GET_RANDOM_POST_SUCESS';



export const getDataTopLike = () => ({
    type: GET_DATA_TOP_LIKE,
})

export const getDataTopLikeSucess = ( toplikes ) => ({
    type: GET_DATA_TOP_LIKE_SUCESS,
    toplikes,
})

// ========================= SEARCH

export const setInputSearchValue = ( value, name ) => ({
    type: SET_INPUT_SEARCH_VALUE,
    value,
    name,
});

export const resetInputSearchValue = () => ({
    type: RESET_INPUT_SEARCH_VALUE,
})

export const searchActualite = ( searchValue ) => ({
    type: SEARCH_ACTUALITE,
    searchValue,
});

export const getSearchRequest = ( searchData ) => ({
    type: GET_SEARCH_REQUEST,
    searchData,
});

export const resetSearchData = () => ({
    type: RESET_SEARCH_DATA,
});

// ========================= RANDOM POST

export const getRandomPost = () => ({
    type: GET_RANDOM_POST,
})

export const getRandomPostSucess = ( randomPost ) => ({
    type: GET_RANDOM_POST_SUCESS,
    randomPost,
})

