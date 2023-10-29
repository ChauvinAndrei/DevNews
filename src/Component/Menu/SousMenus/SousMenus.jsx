import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../../utils';

import './SousMenus.scss';

const SousMenus = () => {

    const { NavLinks, themes } = useSelector((state) => state.page); 
    const currentIndex = useSelector((state) => state.page.activeMenuItemIndex)

    const currentPageTheme = NavLinks[currentIndex];
    const theme = currentPageTheme ? themes[currentPageTheme.label.toLowerCase()] : null;

    return (

        <div className='navFilter--mobile-wrapper'>
            <ul className='navFilter--mobile-list'>

                    {theme?.map((theme, index) => {
                        const themeName = theme && theme.name; 

                        return (
                            <li
                            className='navFilter--mobile-list-menu-item'
                            key={`${currentPageTheme.label}_${index}_${themeName}`}
                            style={{
                            transitionDelay: `${index * 100}ms`,
                            opacity: currentPageTheme.isActive ? 1 : 0,
                            }}
                            >

                            <NavLink
                                to={`/${currentPageTheme.to.replace('/', '')}/${themeName}`}
                                // className={({ isActive }) => `menu--link${isActive ? " active" : ""}`}
                                className={({ isActive }) => `menu--link${isActive || themeName === 'top likes' && location.pathname === '/home' ? " active" : ""}`}
                                >
                                            {capitalizeFirstLetter(themeName)}
                            </NavLink>

                            </li>
                        );
                    })}
            
            </ul>

        </div>
    )
}

export default SousMenus;