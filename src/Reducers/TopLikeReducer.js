// == COMPONENT


// == ACTION 
import { GET_DATA_TOP_LIKE_SUCESS } from "../Action/home";

const InitialState = {
    
    TopLikes: []
};

const TopLikeReducer = ( state = InitialState, action = {} ) => {

    switch (action.type) {

        case GET_DATA_TOP_LIKE_SUCESS: 

            return {
                ...state,
                TopLikes: action.toplikes,
            }

        default: 
          return state;
    }
};


export default TopLikeReducer;