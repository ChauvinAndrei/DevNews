// == COMPONENT
import { NavLinks } from "../Component/Menu/MenuDispatch";

// == ACTION 
import { UPDATE_CURRENT_PAGE, SET_ACTIVE_MENU_ITEM, SET_CURRENT_THEMES, SET_IS_LOADING, UPDATE_CURRENT_THEME_PAGE } from "../Action/page";

const InitialState = {
    NavLinks,
    themes: [],
    PageTheme: [],
    activeMenuItemIndex: -1,
    isLoading: true,
};

const pageReducer = ( state = InitialState, action = {} ) => {

    switch (action.type) {

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
        };

        case SET_CURRENT_THEMES:
            const themesObject = action.themes;
            return {
                ...state,
                themes: themesObject,
        };

        case UPDATE_CURRENT_PAGE: 
            const arrayLinks = action.arrayLinks;
            return {
                ...state,
                NavLinks: arrayLinks,
            }
        
        case UPDATE_CURRENT_THEME_PAGE:
            return {
                ...state,
                PageTheme: action.pageTheme,
            }

        case SET_ACTIVE_MENU_ITEM:
 
            return {
                ...state,
                activeMenuItemIndex: action.currentPage,
            };
            
            

        default: 
          return state;
    }
};


export default pageReducer;