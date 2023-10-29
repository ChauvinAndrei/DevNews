import './form.scss';

import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenuItem } from '../../../../Action/page';
import { setInputLoginValue, postLoginDataUser, resetFailureMessage, resetSuccessMessage } from '../../../../Action/user';
import React, { useEffect, useState } from 'react';


const FormConnexion = ( ) => {

    const dispatch = useDispatch();
    const {  errorMessage } = useSelector((state) => state.User);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {

        if ( errorMessage) {

          setShowNotification(true);

          const timer = setTimeout(() => {

            setShowNotification(false);
            dispatch(resetFailureMessage());
          }, 5000); 
    
          return () => clearTimeout(timer); 

        }

      }, [ errorMessage]);

      

    const menuItems = useSelector((state) => state.page.NavLinks);

    const handleInscriptionClick = () => {
        const inscriptionIndex = menuItems.findIndex(item => item.label.toLowerCase() === 'inscription');
        if (inscriptionIndex !== -1) {
            dispatch(setActiveMenuItem(inscriptionIndex));
        }
    };

    const handleChangeInputLogin = ( value , name) => {
        dispatch(setInputLoginValue(value, name));
    }
    // console.log(true, 'submitlogin')
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(postLoginDataUser());
        
    }

    return (
        <div className='form--wrapper'>

            <form action="" method="get" className="form--login" onSubmit={handleSubmitLogin}>
            {showNotification && (
          <div className={`notification  ${errorMessage ? 'error' : ''}`}>
            { errorMessage}
          </div>
        )}

                <div className="form--login-user">
                    <label htmlFor="email">Adresse email: </label>
                    <input type="text" name="email" id="email" placeholder="Adresse email"  onChange={(e) => {
                        const { value, name } = e.target;
                        handleChangeInputLogin(value, name);
                    }} required />
                </div>

                <div className="form--login-password">
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" name="password" id="password" placeholder="Mot de passe"  onChange={(e) => {
                         const { value, name } = e.target;
                         handleChangeInputLogin(value, name);
                    }} 
                    required />
                </div>

                <div className="form-controls">

                 <button type='submit'>
                      Connexion
                 </button>

                {menuItems.map((menuItem, index) => (

                    menuItem.label.toLowerCase() == 'inscription' && 
                    <NavLink 
                    to={menuItem.to} 
                    key={menuItem.label}
                    onClick={handleInscriptionClick}
                    className={({ isActive }) => `menu--link${isActive ? " active" : ""}`}
                    >
                            Pas encore inscrit? Inscrivez-vous.
                    </NavLink>

                ))}

                </div>

            </form>
        </div>
    )
}


export default FormConnexion;
