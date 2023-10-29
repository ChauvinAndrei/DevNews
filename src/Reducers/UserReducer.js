
import { 
    SET_INPUT_VALUE, 
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE, 
    SET_CURRENT_INPUT_PROFIL, 
    SET_INPUT_CHANGE_PROFIL,
    IS_EDITING_PROFIL,
    SET_EDITING_FALSE,
    POST_USER_ADD_DATA,
    POST_USER_DATA_SUCCESS,
    POST_USER_DATA_FAILURE,
    SET_INPUT_LOGIN_VALUE,
    POST_LOGIN_DATA_SUCESS,
    POST_LOGIN_DATA_FAILURE,
    SET_LOGGED_IN,
    SET_LOGGED_OUT,
    RESET_SUCCESS_MESSAGE,
    RESET_FAILURE_MESSAGE,
    GET_PREFERENCES_FROM_API_SUCCESS,
    REMOVE_LIKE,
    IS_UPDATED_PROFIL,
    SET_CURRENT_COUNT_LIKE,
    SET_LIKE_DATA,
    INCREMENT_LIKE,
    CHECK_IF_LIKED_SUCCESS,
    UPDATE_NOTIF_TO_ZERO,
    ADD_ONE_NOTIF,
    SET_COMMENT_FROM_API_SUCCESS,
    RESET_LIKE_STATUS,
    SET_INPUT_COMMENT_PROFIL,
    SET_CURRENT_INPUT_PROFIL_BOOL,
    UPDATE_VALUE_COMMENT_PROFIL_DATA,
    START_SEND_VALUE_POST_DATA,
    COMPLETE_SEND_VALUE_POST_DATA,
    SET_ERROR_SEND_VALUE_POST_DATA,
    SEND_VALUE_COMMENT_DATA_SUCCESS,
    RESET_VALUE_INPUT_COMMENT,
    SET_NEW_COUNT_COMMENT_DISPLAY,
    SET_NEW_COUNT_POST_DISPLAY,

    } from "../Action/user";

const Initialstate = {

    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
 
    inputLogin: {
        email: '',
        password: '',
    },

    usersInputs: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    },

    currentUserProfil: 
        JSON.parse(localStorage.getItem('currentUserProfil')) || 
    {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        CdpSNbOrS: '',
        tag_id: '',
        grade_id: '',
        notif: ''
    },
    
    editedUsersProfilInputs: { },

    isEditing: [],
    currentIndex: -1,

    sucessMessage: '',
    errorMessage: '',

    
    tags: [],
    grades: [],

    
    articles: [],
    
    dataCommentUser: [],

    isUpdated: false,

    currentLikeByUser: {},
    currentCountLike: '0',
    likes: [],  
    likeStatus: '',
    isLiked: null,

    commentData: {},

    isSending: false,

    inputProfilForumValue: {
        inputcommentProfil_0: '',
    },


    moreCount: 15,

    moreCommentCount: 5,
    commentMoreCounts: {},
    
    currentInputSend: {},
}


const UserReducer = ( state = Initialstate, action={}) => {



    switch (action.type) {

        // ==== INSCRIPTION
        case  SET_INPUT_VALUE: 
            return{
                ...state,
                usersInputs: {
                ...state.usersInputs,
                [action.name]: action.value,
            },
        }

        case POST_USER_DATA_SUCCESS:
            return{
                ...state,
                usersInputs: {...state.usersInputs, email: '', password: '', username: '', firstname: '', lastname: ''},
                sucessMessage: 'Inscription réussie !',
            }

        case POST_USER_DATA_FAILURE:
            return{
                ...state,
                errorMessage: 'Inscription échouée !',
        }

        // ==== EDIT

        case IS_UPDATED_PROFIL: 
            return {
                ...state,
                isUpdated: action.isUpdated,
            }

        case  SET_CURRENT_INPUT_PROFIL: 
            return{
                currentUserProfil: {
                ...state.currentUserProfil,
                [action.name]: action.value,
            },
        }

        case SET_INPUT_CHANGE_PROFIL:
            return {
                ...state,
                editedUsersProfilInputs: {
                    ...state.editedUsersProfilInputs,
                    [action.name]: action.value,
            },
        }

        case IS_EDITING_PROFIL:
            return {
                ...state,
                isEditing: action.isEditing,
                currentIndex: action.currentIndex,
            }

        case SET_EDITING_FALSE:
            return {
                ...state,
                isEditing: [],
        };

        case UPDATE_USER_SUCCESS:
            const mergedProfileUpdates = {
                ...state.currentUserProfil,
                ...action.mergedUpdateProfil,
            };

            let currentStorageUserData = localStorage.getItem('currentUserProfil');
                currentStorageUserData = localStorage.setItem('currentUserProfil', JSON.stringify(mergedProfileUpdates))

            return {
                ...state,
                currentUserProfil: {
                    ...mergedProfileUpdates,
                },
                sucessMessage: 'Mise à jour réussie !'
            }

        case UPDATE_USER_FAILURE:
            return {
                ...state,
                errorMessage: 'La mise à jour a échouée.'
            };


        // ======= LOGIN

        case SET_INPUT_LOGIN_VALUE:
            return {
                ...state,
                inputLogin: {
                    ...state.inputLogin,
                    [action.name]: action.value,
                }
            }

        case POST_LOGIN_DATA_SUCESS:
            const {user, token, notif} = action.data

            return {
                ...state,
                currentUserProfil: {
                    ...state.currentUserProfil,
                    ...user,
                    ...notif
                },
                token: {
                    ...state.token,
                    token
                },
            }

        // === NOTIF

        case UPDATE_NOTIF_TO_ZERO : {
            let currentStorageUserData = JSON.parse(localStorage.getItem('currentUserProfil'));
            currentStorageUserData.notif = '0';
            localStorage.setItem('currentUserProfil', JSON.stringify(currentStorageUserData))

            return {
                ...state,
                currentUserProfil: {
                    ...state.currentUserProfil,
                    notif: '0',
                }
            }
        }

        case ADD_ONE_NOTIF : {
            let currentStorageUserData = JSON.parse(localStorage.getItem('currentUserProfil'));
            currentStorageUserData.notif++;
            localStorage.setItem('currentUserProfil', JSON.stringify(currentStorageUserData))

            return {
                ...state,
                currentUserProfil: {
                    ...state.currentUserProfil,
                    notif: currentStorageUserData.notif,
                }
            }

        }


        case POST_LOGIN_DATA_FAILURE:
            return{
                ...state,
                errorMessage: 'Connexion échouée !',
        }

        case SET_LOGGED_IN:

            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('currentUserProfil', JSON.stringify(state.currentUserProfil));
            localStorage.setItem('_token', JSON.stringify(state.token));

            return {
                ...state,
                isLoggedIn: true,
                
            }
            
        case SET_LOGGED_OUT:

            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserProfil');
            localStorage.removeItem('_token');

            return {
                ...state,
                isLoggedIn: false,
            }


        case RESET_SUCCESS_MESSAGE:
            return {
                ...state,
                sucessMessage: ''
            };

        case RESET_FAILURE_MESSAGE:
            return {
                ...state,
                errorMessage: ''
            };
        
        case GET_PREFERENCES_FROM_API_SUCCESS:
           const dataCategory = action.techno_grades;
        
            return {
                ...state,
                tags: dataCategory.tag,
                grades: dataCategory.grade,
            }
        

        // === LIKE

        case SET_CURRENT_COUNT_LIKE:{
            const currentCountLike = action.likes;
            return {
                ...state,
                currentCountLike: currentCountLike,
            };
        }
          
        case SET_LIKE_DATA: {
           const likedData = action.currentLikeByUser;
            return {
                ...state,
                currentLikeByUser: {
                    ...state.currentLikeByUser,
                    ...likedData,
                }
            }
        }

        case INCREMENT_LIKE:
            const incrementCount = parseFloat(state.currentCountLike) + 1;
            const countString = incrementCount.toString();

            return {
                ...state,
                currentCountLike: countString,
                isLiked: action.status,
            };

        case REMOVE_LIKE: {
             const decrementCount = parseFloat(state.currentCountLike) - 1;
             const countString = decrementCount.toString();
            
            return {
                ...state,
                 currentCountLike: countString, 
                  isLiked: action.status,
            };
            
        }

        case RESET_LIKE_STATUS:
            return {
              ...state,
              isLiked: null,
        };



        case CHECK_IF_LIKED_SUCCESS: 
            return {
                ...state,
                isLiked: action.isLiked,

            };

        // ==== DATA COMMENT USER
        case SET_COMMENT_FROM_API_SUCCESS:
            return {
                ...state,
                dataCommentUser: action.dataCommentUser,

            }

        // ===== POST PROFIL

        case SET_INPUT_COMMENT_PROFIL: 
        return {
            ...state,
            inputProfilForumValue: {
                ...state.inputProfilForumValue,
                [action.name]: action.value,
            }
        }

        case SET_CURRENT_INPUT_PROFIL_BOOL: 

        return{
            ...state,
            currentInputSend: {
                ...state.currentInputSend,
                ...action.arrayBool
            }

        }

        case UPDATE_VALUE_COMMENT_PROFIL_DATA: {
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
            
            const postIndex = state.dataCommentUser.findIndex(post => post.post.id === toInteger);
            console.log(state.dataCommentUser)
            if (postIndex !== -1) {
     
                const updatedPosts = [...state.dataCommentUser];        
            
                updatedPosts[postIndex] = {
                    ...updatedPosts[postIndex],
                    commentaires: [...updatedPosts[postIndex].commentaires, newComment],
                };

            return {
                    ...state,
                    dataCommentUser: updatedPosts,
                    inputCommentValue: {
                        ...state.inputCommentValue,
                        [`inputcommentProfil_${state.index}`]: '', 
                    },
                };
            }
        
        case RESET_VALUE_INPUT_COMMENT: 
            return {
                ...state,
                inputProfilForumValue: {
                    ...state.inputProfilForumValue,
                    [`inputcommentProfil_${state.index}`]: '', 
                },
            };
        
        
        case SET_NEW_COUNT_POST_DISPLAY:
                return {
                    ...state,
                moreCount: state.moreCount += 15,
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

        case START_SEND_VALUE_POST_DATA:
            return { ...state, isSending: true, error: null };

        case COMPLETE_SEND_VALUE_POST_DATA:
            return { ...state, isSending: false, error: null };

        case SET_ERROR_SEND_VALUE_POST_DATA:
            return { ...state, isSending: false, error: action.payload };   


        default:
           return state;
    }
}

export default UserReducer;
