
import InputEdition from './InputsEdition/InputsEdition';

import './EditionProfil.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEditionProfil, updateUser, resetSuccessMessage, resetFailureMessage } from '../../../../Action/user';


const EditionProfil = ( {                    
    email,
    firstname,
    lastname,
    username,
    tag_id,
    grade_id,
    handleInputChange,
    handleValidationClick,
    isEditing,
    currentIndex,
    grades,
    tags,
} ) => {

    const dispatch = useDispatch();
    const { sucessMessage, errorMessage } = useSelector((state) => state.User);
    const [showNotification, setShowNotification] = useState(false);
    


    const inputFields = [              
        { name: 'username', placeholder: 'username', type: 'text', value: username },                    // ==== Tableau des inputs a créer pour l'édition
        { name: 'firstname', placeholder: 'firstname', type: 'text', value: firstname },
        { name: 'lastname', placeholder: 'lastname', type: 'text', value: lastname },
        { name: 'email', placeholder: 'email', type: 'email', value: email },
        { name: 'tag_id', type: 'select', value: tag_id },
        { name: 'grade_id', type: 'select', value: grade_id },

    ];

    // ========

    const boxInputRefs = useRef([]);
    const selectRefs = useRef([]);
    const inputRef = useRef([]);

    
    // ========

    
    const handleBtnClick = (_, index) => {                                                                // ==== dispatch un tableau de tout les inputs sous forme de tableau (bool) de la section actuellement edit
    //   setCurrentBoxClickEdit(boxInputRefs.current.children[index]);

      const newEditStates = inputFields.map((_, i) => i === index);
      console.log(index)
         dispatch(isEditionProfil(newEditStates, index))
    };



    // ========    


    useEffect(() => {                                                                                     // ==== recalcule la size de l'input et inject dans l'attribute size le nombre de caractère (sur edition et sur premier rendu du component)
        if (inputRef.current) {
          inputRef.current.forEach((input) => {
            if (input && input.getAttribute('placeholder')) {
              input.setAttribute('size', input.value.length || input.getAttribute('placeholder').length);
            }
          });
        }
      }, [isEditing]);

     
    // ========

    useEffect(() => {                                                                                     // ==== 

        if (sucessMessage || errorMessage) {
            
            setShowNotification(true);

            const timer = setTimeout(() => {

                setShowNotification(false);
                dispatch(resetSuccessMessage());
                dispatch(resetFailureMessage());
            }, 3000); 

            return () => clearTimeout(timer);
        }
     
    }, [sucessMessage, errorMessage, isEditing])

     // ========

    return (

        <div className="profile-content">
            
            {showNotification && (
                <div className={`notification ${showNotification && sucessMessage ? 'success' : ''} ${errorMessage ? 'error' : ''}`}>                  
                    {sucessMessage || errorMessage}
                </div>
            )}

            <div className="details">
                <h2 className='title-username'> { username } </h2>
                    
                    <div className='Inputs--wrapper' ref={boxInputRefs}>

                        {inputFields?.map((field, index) => (
                            <InputEdition
                                key={index}
                                name={field.name}
                                placeholder={field.placeholder}
                                type={field.type}
                                index={index}
                                value={field.value}
                                grades={grades}
                                tags={tags}
                                isEditing={isEditing[index]}
                                currentIndex={currentIndex}
                                boxInputRefs={boxInputRefs}
                                inputRef={inputRef}
                                selectRefs={selectRefs}
                                handleBtnClick={handleBtnClick}
                                handleValidationClick={handleValidationClick}
                                onKeyDown={handleValidationClick}
                                onChange={handleInputChange}
                            />
                        ))}

                    </div>        

            </div>


        </div>
    )
}

export default EditionProfil;
