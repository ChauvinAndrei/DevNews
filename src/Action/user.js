
// ====== LOGIN
export const SET_INPUT_LOGIN_VALUE = 'SET_INPUT_LOGIN_VALUE';
export const POST_LOGIN_DATA_USER = 'POST_LOGIN_DATA_USER';
export const POST_LOGIN_DATA_SUCESS = 'POST_LOGIN_DATA_SUCESS';
export const POST_LOGIN_DATA_FAILURE = 'POST_LOGIN_DATA_FAILURE';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';

// ==== INSCRIPTION 
export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';     // ======== SET INPUT INSCRIPTION
export const POST_USER_ADD_DATA = "POST_USER_DATA";
export const POST_USER_DATA_SUCCESS = "POST_USER_DATA_SUCCESS";
export const POST_USER_DATA_FAILURE = 'POST_USER_DATA_FAILURE';

// ==== EDIT USER PROFIL
export const IS_UPDATED_PROFIL = 'IS_UPDATED_PROFIL';
export const SET_CURRENT_INPUT_PROFIL = 'SET_CURRENT_INPUT_PROFIL';   // ======== SET INPUT EDITON CURRENT DATA USER BEFORE EDITING
export const SET_INPUT_CHANGE_PROFIL = ' SET_INPUT_CHANGE_PROFIL';    // ======== SET INPUT INSCRIPTION WHEN EDITING

export const IS_EDITING_PROFIL = 'IS_EDITING_PROFIL';
export const SET_EDITING_FALSE = 'SET_EDITING_FALSE';

export const UPDATE_USER = 'UPDATE_USER';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

// =========================  RESET MESSAGE
export const RESET_SUCCESS_MESSAGE ='RESET_SUCCESS_MESSAGE';
export const RESET_FAILURE_MESSAGE ='RESET_FAILURE_MESSAGE';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

// =========================  PREFERENCES
export const GET_PREFERENCES_FROM_API = 'GET_PREFERENCES_FROM_API';
export const GET_PREFERENCES_FROM_API_SUCCESS = 'GET_PREFERENCES_FROM_API_SUCCESS';

// =========================  PREFERENCES
export const GET_COMMENT_FROM_API = 'GET_COMMENT_FROM_API';
export const SET_COMMENT_FROM_API_SUCCESS = 'SET_COMMENT_FROM_API_SUCCESS';

// ========================= LIKES
export const SET_CURRENT_COUNT_LIKE = 'SET_CURRENT_COUNT_LIKE';
export const ADD_LIKE_TO_API = 'ADD_LIKE_TO_API';
export const REMOVE_LIKE_TO_API = 'REMOVE_LIKE_TO_API';
export const  SET_LIKE_DATA = 'SET_LIKE_DATA';

export const INCREMENT_LIKE = 'INCREMENT_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const CHECK_IF_LIKED ='CHECK_IF_LIKED';
export const CHECK_IF_LIKED_SUCCESS = 'CHECK_IF_LIKED_SUCCESS'
export const RESET_LIKE_STATUS = 'RESET_LIKE_STATUS';


// ========================= NOTIFICATION
export const UPDATE_NOTIF_TO_ZERO = 'UPDATE_NOTIF_TO_ZERO';
export const MAKE_NOTIF_TO_ZERO_IN_DB = 'MAKE_NOTIF_TO_ZERO_IN_DB';
export const ADD_ONE_NOTIF = 'ADD_ONE_NOTIF';


// ================ PROFIL POST 
export const SET_INPUT_COMMENT_PROFIL = 'SET_INPUT_COMMENT_PROFIL';
export const SET_CURRENT_INPUT_PROFIL_BOOL = 'SET_CURRENT_INPUT_PROFIL_BOOL';
export const UPDATE_VALUE_COMMENT_PROFIL_DATA = 'UPDATE_VALUE_COMMENT_PROFIL_DATA';
export const SEND_VALUE_COMMENT_DATA_PROFIL = 'SEND_VALUE_COMMENT_DATA_PROFIL'
export const SET_NEW_COUNT_POST_DISPLAY = 'SET_NEW_COUNT_POST_DISPLAY';
export const SET_NEW_COUNT_COMMENT_DISPLAY = 'SET_NEW_COUNT_COMMENT_DISPLAY';
export const START_SEND_VALUE_POST_DATA = 'START_SEND_VALUE_POST_DATA';

//= SUCCCES ERROR
export const COMPLETE_SEND_VALUE_POST_DATA = 'COMPLETE_SEND_VALUE_POST_DATA';
export const SET_ERROR_SEND_VALUE_POST_DATA = 'SET_ERROR_SEND_VALUE_POST_DATA';
export const RESET_VALUE_INPUT_COMMENT = 'RESET_VALUE_INPUT_COMMENT';
export const SEND_VALUE_COMMENT_DATA_SUCCESS = 'SEND_VALUE_COMMENT_DATA_SUCCESS';



// ================== INSCRIPTION

export const setInputValue = ( value, name ) => ({   // => Mise a jour des input avec champs contrôlés
  type: SET_INPUT_VALUE,
  value,
  name,
})

export const postUserData = () => ({
  type: POST_USER_ADD_DATA,
});

export const postUserDataSuccess = () => ({
  type: POST_USER_DATA_SUCCESS,
});

export const postUserDataFailure = () => ({
  type: POST_USER_DATA_FAILURE,
})

// ================== EDIT

export const setIsUpdated = ( isUpdated ) => ({
  type: IS_UPDATED_PROFIL,
  isUpdated,
})

export const updateUser = (userData) => ({
  type: UPDATE_USER,
  payload: userData,
});

export const updateUserSuccess = ( mergedUpdateProfil ) => ({
  type: UPDATE_USER_SUCCESS,
  mergedUpdateProfil,
});
export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
});

export const setInputProfil = ( value, name ) => ({
  type: SET_CURRENT_INPUT_PROFIL,
  value,
  name,
})
 
export const setInputChangeProfil = ( value, name ) => ({
  type: SET_INPUT_CHANGE_PROFIL,
  value,
  name,
})

export const isEditionProfil = ( isEditing, currentIndex ) => ({
  type: IS_EDITING_PROFIL,
  isEditing,
  currentIndex,
})

export const setEditingFalse = () => ({
  type: SET_EDITING_FALSE,
});


// ============  LOGIN

export const setInputLoginValue = ( value, name ) => ({
  type: SET_INPUT_LOGIN_VALUE,
  value,
  name,
})

export const postLoginDataUser = () => ({
  type: POST_LOGIN_DATA_USER,
})

export const postLoginDataSuccess = ( data ) => ({
  type: POST_LOGIN_DATA_SUCESS,
  data,
})

export const postLoginDataFailure = () => ({
  type: POST_LOGIN_DATA_FAILURE,
})

export const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
});

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
});

// ========================= RESET MESSAGE

export const resetSuccessMessage = () => ({
  type: RESET_SUCCESS_MESSAGE,
});

export const resetFailureMessage = () => ({
  type: RESET_FAILURE_MESSAGE,
});


// ========================= REQUEST Categorie

export const getPreferencesFromApi = () => ({
  type: GET_PREFERENCES_FROM_API,
});

export const getPreferencesFromApiSuccess = ( techno_grades ) => ({
  type:  GET_PREFERENCES_FROM_API_SUCCESS,
  techno_grades,
})

// ========================= REQUEST COMMENTAIRE USER

export const getCommentFromApi = () => ({
  type: GET_COMMENT_FROM_API,
});

export const setCommentFromApiSuccess = ( dataCommentUser ) => ({
  type: SET_COMMENT_FROM_API_SUCCESS,
  dataCommentUser,
});

// ========================= Action LIKE & REQUEST

export const setCurrentCountLike = ( likes ) => ({
  type: SET_CURRENT_COUNT_LIKE,
  likes,
})

export const setLikeData = ( currentLikeByUser ) => ({
  type: SET_LIKE_DATA,
  currentLikeByUser,
})

export const addLikeApi = () => ({
  type: ADD_LIKE_TO_API,
})

export const removeLikeApi = () => ({
  type: REMOVE_LIKE_TO_API,
})

export const incrementLike = ( status ) => ({
  type: INCREMENT_LIKE,
  status,
})

export const removeLike = (status) => ({
  type: REMOVE_LIKE,
  status,
})

export const resetLikeStatus = () => ({
  type: RESET_LIKE_STATUS,
});

export const checkIfLiked = () => ({
  type: CHECK_IF_LIKED,
});

export const checkIfLikedSuccess = (isLiked) => ({
  type: CHECK_IF_LIKED_SUCCESS,
  isLiked,
});

// ========================= Notification Comment User Posts

export const sendValurNotifToZero = () => ({
  type: MAKE_NOTIF_TO_ZERO_IN_DB,
});

export const updateNotifToZero = ( notifToZero ) => ({
  type: UPDATE_NOTIF_TO_ZERO,
  notifToZero,
});

export const addOneNotif = ( addOnenotif ) => ({
  type: ADD_ONE_NOTIF,
  addOnenotif,
});

// =================== setInputCommentProfil

export const SetNewCountPostDisplay = () => ({
  type: SET_NEW_COUNT_POST_DISPLAY,
})

export const SetNewCountCommentDisplay = ( index ) => ({
  type: SET_NEW_COUNT_COMMENT_DISPLAY,
  commentID: index,
})

export const setInputCommentProfil = ( value , name ) => ({
  type: SET_INPUT_COMMENT_PROFIL,
  value,
  name,
})

export const setCurrentInputProfilBool = ( arrayBool ) => ({
  type: SET_CURRENT_INPUT_PROFIL_BOOL,
  arrayBool,
})

export const updateValueCommentProfiltData = ( data, index ) => ({
  type: UPDATE_VALUE_COMMENT_PROFIL_DATA,
  data,
  index,
})

export const sendValueCommentDataProfil = () => ({
  type: SEND_VALUE_COMMENT_DATA_PROFIL,
})

export const  resetValueInputComment = () => ({
  type:  RESET_VALUE_INPUT_COMMENT,
});

export const sendValueCommentDataSucess = ( newComment ) => ({
  type: SEND_VALUE_COMMENT_DATA_SUCCESS,
  newComment,
})

////=====
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
