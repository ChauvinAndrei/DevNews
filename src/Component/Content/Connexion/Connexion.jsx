import FormConnexion from "./form/form";
import withPageWrapper from "../PageWrapper";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Connexion = ( { isActive, positionTitle, label } ) => {

    const navigate = useNavigate();
    
    const { sucessMessage , errorMessage, isLoggedIn} = useSelector((state) => state.User);

    const [showMessage, setShowMessage] = useState(false);
    

    useEffect(() => {
    
    setShowMessage(true);
    
    const navigateTohome = () => {
        return setTimeout(() => {
          navigate('/home');
        }, 1000);
    }

    sucessMessage && showMessage && navigateTohome();

    return () => {
      setShowMessage(false);
    }

   }, [isLoggedIn])

    return (
            <div id="main-content" className="main-content grid-content">

              <h2 
              className={`menu--title${isActive ? ' active': ''}`} 
              style={positionTitle}
              >
                  { label }
              </h2>

                <div className="duContenu">
                    <FormConnexion />
                </div>
            </div>
    )
}

const WrapperConnexion = withPageWrapper(Connexion);

export default WrapperConnexion;