// == TYPE ACTION
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const GET_CURRENT_THEMES_FROM_API = 'GET_CURRENT_THEMES_FROM_API';
export const SET_CURRENT_THEMES = 'SET_CURRENT_THEMES';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const UPDATE_CURRENT_THEME_PAGE = 'UPDATE_CURRENT_THEME_PAGE';
export const SET_ACTIVE_MENU_ITEM = "SET_ACTIVE_MENU_ITEM";

export const setIsLoading = ( isLoading ) => ({
    type: SET_IS_LOADING,
    isLoading,
});

export const updateCurrentPage = ( arrayLinks ) => ({
    type: UPDATE_CURRENT_PAGE,
    arrayLinks,
});

export const setActiveMenuItem = (index) => ({
    type: SET_ACTIVE_MENU_ITEM,
    currentPage: index,
});

export const getCurrentThemes = () => ({
    type: GET_CURRENT_THEMES_FROM_API,
});

export const setCurrentThemes = ( themes ) => ({
    type: SET_CURRENT_THEMES,
    themes, 
})

export const updateCurrentThemesPage = ( pageTheme ) => ({
    type: UPDATE_CURRENT_THEME_PAGE,
    pageTheme,
})