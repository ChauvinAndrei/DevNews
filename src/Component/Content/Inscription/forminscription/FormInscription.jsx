import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUserData, resetSuccessMessage, resetFailureMessage, setInputValue } from '../../../../Action/user';
import { useNavigate } from 'react-router-dom';


import './FormInscription.scss';


const FormInscription = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
  
    const { email , password, username, firstname, lastname} = useSelector((state) => state.User.usersInputs)

    const { sucessMessage , errorMessage } = useSelector((state) => state.User);
    const [showMessage, setShowMessage] = useState(false);

    const [errorMessageInput, setErrorMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);


     // ======

      const onChange = (e) => {
        const inputName = e.target.name;
        dispatch(setInputValue(e.target.value, inputName))
      }



     // ====== 


      const isPasswordValid = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
      };

  

     // =====                       // Gestionnaire de soumission du formulaire
   

      const handleSubmit = (e) => {
        e.preventDefault();
        
        
        
        if (!isPasswordValid(password)) {
          setShowNotification(true);
          setErrorMessage('Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.');

            const timer = setTimeout(() => {
    
              setShowNotification(false);
          }, 5000); 

          return;
        }

        const data = {
          firstname,
          lastname,
          username,
          email,
          password,
        };

        dispatch(postUserData(data));
        setErrorMessage('');

    };

  

     // ===== 
      
     useEffect(() => {

      setShowMessage(true);

      if (sucessMessage || errorMessage) {
        setShowNotification(true);

        const timer = setTimeout(() => {

            setShowNotification(false);
            dispatch(resetFailureMessage());
            dispatch(resetSuccessMessage());
        }, 5000); 

    }   

      const navigateToConnexion = () => {
        
        
          return setTimeout(() => {
            
            navigate('/connexion');
          }, 2000);
      }

      sucessMessage && showMessage && navigateToConnexion();

      return () => {
        setShowMessage(false);
      }
     }, [sucessMessage, errorMessage])




      return (

        <div className='form--wrapper'>
          <form action="" method="post" className="form--login" onSubmit={handleSubmit}>

          <div>

            {showNotification && errorMessageInput && <p className="error-message"> {errorMessageInput} </p>} 
                     
            {showNotification && sucessMessage || errorMessage && (
                <div className={`notification ${sucessMessage ? 'success' : ''} ${errorMessage ? 'error' : ''}`}>
                    {sucessMessage || errorMessage}
                </div>
            )}       
          </div>


            <div className="form--login-field">
              <label htmlFor="firstname">Firstname: </label>
              <input type="text" id="firstname" value={ firstname } name="firstname" placeholder="Firstname..." onChange={onChange} required />
            </div>


            <div className="form--login-field">
              <label htmlFor="lastname">Lastname: </label>
              <input type="text" id="lastname" value={ lastname } name="lastname" placeholder="Lastname..." onChange={onChange} required />
            </div>


            <div className="form--login-field">
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" value={ username } name="username" placeholder="Username..." onChange={onChange} required />
            </div>
            


            <div className="form--login-field">
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" value={ email} name="email" placeholder="Email..." onChange={onChange} required />
            </div>
            


            <div className="form--login-field">
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" value={ password } name="password" placeholder="Password..." onChange={onChange} required />
            </div>        


            <div className="form-controls">
              <button type='submit'>Inscription</button>
            </div>
          </form>

    
  
        </div>
        
      );

};

export default FormInscription;
