import { Save } from 'react-feather';
import Pencil from '../../../../../Assets/edit-pencil.svg';

import { capitalizeFirstLetter } from '../../../../../utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoaderEditProfil from '../../../../Loading/LoaderEditProfil';
/**
 *  
 * @returns Creation des inputs avec les paramêtres passer lors de l'appel du composant (créer input ou select en fonction de la props "type")
 */
const InputsEdition = ({   
        name, 
        type, 
        value, 
        index, 
        onChange, 
        onKeyDown,
        handleBtnClick,
        inputRef,
        handleSelectItem, 
        handleValidationClick,
        isEditing, 
        currentIndex,
        tags,
        grades,
    } ) => {

    const labelName = `${capitalizeFirstLetter(name)}:`;
    

    // ======
    
    useEffect(() => {
        const focusedElement = inputRef.current[index];

        if (isEditing && focusedElement && typeof focusedElement.focus === 'function') {            // === focus et unfocus en fonction du bool isEditing
            focusedElement.focus();
        }else{
            focusedElement.blur();
        }
     
        if (focusedElement instanceof HTMLSelectElement) {                                          // === return true si inputRef contient des selects
            const selectedOption = focusedElement;
            if (selectedOption && selectedOption.options) {
                const longestOption = [...selectedOption.options].reduce((longest, option) => {    // === on réadapte la size de l'input en fonction du nombre de caractère
                    return option.text.length > longest ? option.text.length : longest;
                }, 0);
    
                selectedOption.style.width = `${longestOption + 2}ch`;
            }
        }
    }, [isEditing, index, type, tags, grades]);

    // ======

    const TechnoLabel = name == 'tag_id' && 'Tag:' ;
    const ExperienceLabel = name == 'grade_id' && 'Experience:';
    
    const { tag_id, grade_id } = useSelector((state) => state.User.editedUsersProfilInputs);
    const { isUpdated } = useSelector((state) => state.User);

    return (
        <>
            <div className={`input-group ${isEditing ? 'edit' : 'notEdit'}`}>

                <label htmlFor={ name }> { TechnoLabel || ExperienceLabel ? TechnoLabel || ExperienceLabel : labelName } </label>
                {type !== "select" ? 
                    (
                    <>  
                    <div className='wrapper-loadingInput'>
                            <input 
                            id={ name } 
                            name={ name } 
                            type={type}
                            // value={value}
                            placeholder={ value }
                            ref={ (el) => inputRef.current[index] = el}
                            onChange={ onChange }
                            onKeyDown={onKeyDown}
                            />

                            { isUpdated && !isEditing && index === currentIndex && <LoaderEditProfil /> }
                    </div>

                            {isEditing ? (
                                <button type="submit" className='btn-edit save' onClick={handleValidationClick}>
                                    <Save width={24}/>
                                </button>
                            ) : (
                                <button className='btn-edit' onClick={(e) => handleBtnClick(e, index)}>
                                    <img className="" src={Pencil} alt="Edit"/>
                                </button>
                            )}
                        

                    </> 

                    ) : (

                    <>

                    <div className='wrapper-loadingInput'>
                            { name === 'tag_id' && 
                                <select 
                                    id={ name } 
                                    name={ name } 
                                    type={type}
                                    ref={ (el) => inputRef.current[index] = el}
                                    onChange={ onChange }
                                    onKeyDown={onKeyDown}
                                    value={tag_id || value}
                                    >
                                    
                                {tags.map((category) => (
                                    <option key={`${category.name}_${category.id}`} value={category.id}>
                                            {/* {value === category.id ? category.name : category.name} */}
                                            {category.name}
                                    </option>
                                ))}
                        
                                </select>   
                            }

                            { name === 'grade_id' && 
                                <select 
                                    id={ name } 
                                    name={ name } 
                                    type={type}
                                    ref={ (el) => inputRef.current[index] = el}
                                    onChange={ onChange }
                                    onKeyDown={onKeyDown}
                                    value={grade_id || value}
                                    >
                                
                                {grades.map((grade) => (
                                    <option key={grade.year} value={grade.id} >
                                            {/* {value === grade.id ? grade.year : grade.year} */}
                                        {grade.year}
                                    </option>
                                ))}

                                </select>  
                            }
                            
                            { isUpdated && !isEditing && index === currentIndex && <LoaderEditProfil /> }
                    </div>
                    
                    
                        {isEditing ? (
                            <button 
                            className='btn-edit save' 
                            onClick={handleValidationClick}
                            >
                                <Save width={24}/>
                            </button>
                        ) : (
                            <button 
                            className='btn-edit' 
                            onClick={(e) => handleBtnClick(e, index)}
                            >
                                <img className="" src={Pencil} alt="Edit"/>
                            </button>
                        )}

                    </> 
                    )

                    
                }

            </div>
        </>
    )
}


export default InputsEdition;



