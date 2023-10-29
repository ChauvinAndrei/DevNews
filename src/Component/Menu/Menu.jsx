// == COMPONENT
import { UserDisconnect } from '../User/User';
import NotifUser from "../User/notifUser";
// == ROUTER UTILS
import { NavLink } from 'react-router-dom';
import { capitalizeFirstLetter, getCurrentThemeInfo } from '../../utils';
// == ICON
import { LogOut, User, Power } from 'react-feather';

import './Menu.scss';


const Menu = ({ handleMenuItemClick, menuItems, activeRefs, activeIndex, isMobile, isLoggedIn } ) => {


     return (
        <>
         { isLoggedIn && <UserDisconnect isMobile={isMobile} /> }

            <div className='wrapper--menu'>
                    <nav className="menu">
                        
                            <ul className="menu--list">  
                                {menuItems.map((menuItem, index) => (
                                 (isLoggedIn && menuItem.label.toLowerCase() == 'connexion') || 
                                 (!isLoggedIn && menuItem.label.toLowerCase() == 'profil') ||
                                 menuItem.label.toLowerCase() === 'inscription' ? null : ( 

                                    <li
                                            className={"menu--list-children" + (menuItem.isActive ? " active" : "")}
                                            style={{
                                                "--newPosition":
                                                    menuItem.isActive
                                                        ? `translateX(0)`
                                                        : `translateX(${menuItems[activeIndex]?.position - menuItem.position }px)`,
                                            }}
                                            key={menuItem.label}
                                        >
                                            <NavLink
                                                to={menuItem.to}
                                                className={({isActive}) => "menu--link" + (isActive ? " active" : "")} 
                                                onClick={() => handleMenuItemClick(index)}
                                                ref={(el) => (activeRefs.current[index] = el)}
                                                
                                            >
                                                {menuItem.icon}
                                                <span key={menuItem.label} > {menuItem.label} </span>
                                            </NavLink>

                                        </li> 
                                )
                                ))}
                            </ul>
                    
                    </nav>
            </div>
        </>
    )
}; 


const MenuDesktop = ( { handleMenuItemClick, menuItems, activeRefs, activeIndex, theme, currentPageTheme, isThemeExist, isLoggedIn } ) => {
    

    return (
        <div className="navDesktop--wrapper">
            <div>
                <div className='navDesktop--user'>

                    {isLoggedIn && <div className='navDesktop--user-icon'>

                                    <NotifUser />

                                    <User />
                                    
                        {menuItems.map((menuItem, index) => (

                            menuItem.label.toLowerCase() === 'profil' && 
                                    <NavLink 
                                    to={menuItem.to}
                                    className={({ isActive }) => `menu--link anchorTag--absolute ${isActive ? "active" : ""}`}
                                    onClick={() => handleMenuItemClick(index)}
                                    ref={(el) => (activeRefs.current[index] = el)}
                                    key={menuItem.label}>

                                    </NavLink>
                        ))}
                                    <span>Profil</span>
                            </div>
                    }

                        <div className='navDesktop--user-connect'>

                    {isLoggedIn ? (
                           isLoggedIn && <UserDisconnect /> 
                        ) : (
                        menuItems.map((menuItem, index) => (

                        index < 1 && <NavLink to={menuItem.to}
                                            className={({ isActive }) => `menu--link${isActive ? " active" : ""}`}
                                            onClick={() => handleMenuItemClick(index)}
                                            ref={(el) => (activeRefs.current[index] = el)}
                                            key={menuItem.label}
                                        >
                                            <button type="button" className="navDesktop--user-connect-button connect">
                                            {menuItem.icon}
                                            <span className='navDesktop--user-connect-button-label'>Connexion</span>
                                            </button>
                                        </NavLink>
                            
                        ))                        
                        )}

                        </div>
                </div>

                <nav className="navDesktop--nav">
                    <ul className="navDesktop--nav--list">

                        <li className='navDesktop--nav--list-title'>
                            <h2>Pages</h2>
                            <ul className='navDesktop--nav--list-menu'>
                                {menuItems.map((menuItem, index) => (
                            
                    menuItem.label.toLowerCase() !== 'profil' && 
                    menuItem.label.toLowerCase() !== 'connexion' && 
                    menuItem.label.toLowerCase() !== 'inscription' &&
                        <li className={'navDesktop--nav--list-menu-item' + (menuItem.isActive ? " active" : "")} 
                                    style={{
                                        "--newPosition":
                                            menuItem.isActive
                                                ? `translateY(0)`
                                                : `translateY(${menuItems[activeIndex]?.position - menuItem.position }px)`,
                                    }}
                                    key={menuItem.label}>

                                        <NavLink
                                            to={menuItem.to}
                                            className={({ isActive }) => `menu--link${isActive ? " active" : ""}`}
                                            onClick={() => handleMenuItemClick(index)}
                                            ref={(el) => (activeRefs.current[index] = el)}
                                        >
                                            <span key={menuItem.label} > {menuItem.label} </span>
                                        </NavLink>

                                    </li>
                                ))}
                            </ul>
                        </li>

                    { isThemeExist && theme &&  ( <li className={`navDesktop--nav--list-title ${theme ? 'themes' : ''}`}>
                            <h2>Thèmes</h2>
                            <ul className='navDesktop--nav--list-menu'>

                            {theme.map((theme, index) => {
                                const themeName = theme && theme.name; 
                                return (
                                    <li
                                        className='navDesktop--nav--list-menu-item'
                                        key={`${currentPageTheme.label}_${index}_${themeName}`}
                                        style={{
                                            transitionDelay: `${index * 100}ms`,
                                            opacity: currentPageTheme.isActive ? 1 : 0,
                                        }}
                                    >
                                        <NavLink
                                            to={`${currentPageTheme.to.replace('/', '')}/${themeName}`}
                                            // className={({ isActive }) => `menu--link${isActive ? " active" : ""}`}
                                            className={`menu--link${(location.pathname === '/home' && themeName === 'top likes') ? ' active' : ''}`}
                                        >
                                            {capitalizeFirstLetter(themeName)}
                                        </NavLink>
                                    </li>
                                );
                            })}
                           
                            </ul>
                            
                        </li>
                        )}
                    </ul>
                
                </nav>
            </div>
        </div>
    )
}


export { Menu , MenuDesktop};


