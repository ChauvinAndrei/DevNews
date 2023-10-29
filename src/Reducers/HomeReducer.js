import { SET_INPUT_SEARCH_VALUE,
    RESET_INPUT_SEARCH_VALUE,
    GET_SEARCH_REQUEST,
    RESET_SEARCH_DATA,
    GET_RANDOM_POST_SUCESS,
} from "../Action/home";

const initialState = {

  searchValue: '',
  searchRequest: [],

  randomPost: [],

};

const HomeReducer = ( state = initialState, action = {} ) => {

    switch (action.type) {

        case SET_INPUT_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.value,
            }

        }

        case RESET_INPUT_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: '',
            }
        }

        case GET_SEARCH_REQUEST: {
            console.log('REDUCER = ', action.searchData)
            return {
                ...state,
                searchRequest: action.searchData,
            }
        }

        case RESET_SEARCH_DATA: {
            return {
                ...state,
                searchRequest: [],
            }
        }

        case GET_RANDOM_POST_SUCESS: {
            return {
                ...state,
                randomPost: action.randomPost,
            }
        }

        default:
            return state;

    }

};

export default HomeReducer;