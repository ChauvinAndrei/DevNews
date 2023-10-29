// == COMPONENT
import { MenuDesktop, Menu } from "./Menu";

// == REACT UTILS
import { useEffect, useState, useRef } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { getCurrentThemeInfo } from "../../utils";

// == ACTION
import { updateCurrentPage, setActiveMenuItem , getCurrentThemes, setIsLoading, updateCurrentThemesPage } from '../../Action/page';

// == ICON
import { Power, Home, User, FileText, MessageSquare } from 'react-feather';
import SimpleBar from "simplebar-react";


//==================================================================


const NavLinks = [                                                                //- == Array Route et association icon et label ( tableau mise a jour apres appel de la fonction setMenuItem )
    { to: '/connexion', icon: <Power />, label: 'Connexion',  },
    { to: '/home', icon: <Home />, label: 'Home', themes: [ ]},
    { to: '/account', icon: <User />, label: 'Profil' },
    { to: '/actualités', icon: <FileText />, label: 'Actualités', themes: [  ] },
    { to: '/forum', icon: <MessageSquare />, label: 'Forum',  themes: [ ] },
    { to: '/inscription', label: 'Inscription'},
];


const MenuDispatch = ( { isMobile } ) => {

    const dispatch = useDispatch();

    const { NavLinks, themes } = useSelector((state) => state.page);              //- == recuperation mise a jour du tableau des liens apres premier rendu ou a l'activation d'un index "Link"
    const activeIndex = useSelector((state) => state.page. activeMenuItemIndex);  //- == Retourne l'index "Link"
    const { isLoggedIn } =  useSelector((state) => state.User);
    const [returnToInactive, setReturnToInactive] = useState(false);              //- == Reset false to true a l'activation du lien

    const activeRefs = useRef([]);                                                //- == Retourne tout les élements node "Link"

    /**
     * 
     * @param {number} index - retourne le numero d'index actif
     * Appel de la fonction reset "Link actif"
     */
    const handleMenuItemClick = (index) => {
        dispatch(setActiveMenuItem(index));
    };

    //======

    useEffect(() => {

        let timeoutHidden;

        const setMenuItem = () => {                                           //- == Spread into Array => NavLinks ( isActive, position )
            return NavLinks.map((link, index) => ({
                ...link,
                isActive: activeIndex === index,
                position: activeRefs.current[index]?.offsetLeft,
            }))
        }

        if (returnToInactive) {                                              //- == Reset apres activation du lien de la state "returnToInactive"
            timeoutHidden = setTimeout(() => {
                setReturnToInactive(false);
            }, 800); 
        }
        
        dispatch(updateCurrentPage(setMenuItem()));                          //- == Action to update Array => NavLinks => UPDATE_CURRENT_PAGE
        
        return () => clearTimeout(timeoutHidden);                            //- == Reset timeout returnToInactive

     }, [activeIndex, isMobile]);
    

    //======

    useEffect(() => {                                                        //- == Attente du premier rendu pour obtenir les bonnes positions des élements => Links (évite le NaN)
        const initialActiveIndex = activeRefs.current.findIndex((item) => {
            return item?.classList.contains('active');
        });

        if (initialActiveIndex !== -1) {
            dispatch(setActiveMenuItem(initialActiveIndex));                //- ==  Dispatch action to update active index
        }
        
        dispatch(getCurrentThemes());
    }, []);

    //======
    

    const { currentPageTheme, theme, isThemeExist } = getCurrentThemeInfo(NavLinks, themes, activeIndex);

    useEffect(() => {
      const currentThemePage = () => {
        return theme;
      };

      dispatch(updateCurrentThemesPage(currentThemePage()));
    }, [themes, currentPageTheme]);

    //======

    return (
        <>
            {isMobile ? (
                <Menu
                    handleMenuItemClick={handleMenuItemClick}
                    menuItems={NavLinks}
                    activeRefs={activeRefs}
                    activeIndex={activeIndex}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                /> 
            ) : (
                <MenuDesktop
                    handleMenuItemClick={handleMenuItemClick}
                    menuItems={NavLinks}
                    theme={theme}
                    currentPageTheme={currentPageTheme}
                    activeRefs={activeRefs}
                    activeIndex={activeIndex}
                    isThemeExist={isThemeExist}
                    isLoggedIn={isLoggedIn}
                /> 
            )}
        </>
    );
}

export { NavLinks, MenuDispatch};