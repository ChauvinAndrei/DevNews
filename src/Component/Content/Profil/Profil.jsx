// ==  DEPENDENCIES
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// == ACTION
import { setInputChangeProfil , updateUser, setEditingFalse, getPreferencesFromApi,getCommentFromApi  } from '../../../Action/user';
import {sendValurNotifToZero, updateNotifToZero} from '../../../Action/user'; // notif to zero

// == COMPONENT
import withPageWrapper from "../PageWrapper";
import ProfilEdition from './EditionProfil/EditionProfil';
import PostProfilComponent from './PostProfil/PostProfilComponent';
import {filteredByLatestCreateForum} from "../../selector/selectorArticles";

// == STYLE
import './Profil.scss';

const Profil = ({ isActive, positionTitle, label, icon }) => {


    const dispatch = useDispatch();

    const {  firstname, lastname, username, CdpSNbOrS, email, tag_id, grade_id, notif } = useSelector((state) => state.User.currentUserProfil);        //- == Recuperation des valeurs inputs pour l'Edition

    const { tags, grades, isEditing, currentIndex, dataCommentUser } = useSelector((state) => state.User);

    const [activeSection, setActiveSection] = useState('profil');

    // const {isEditing, currentIndex } = useSelector((state) => state.User);

     //- == Recuperation des datas (preferences & techno utilisateurs )
            useEffect(() => {
                dispatch(getPreferencesFromApi());
                dispatch(getCommentFromApi());
            }, []);

     //- == Recuperation des informations actuel de l'input lors du changement de valeur ( dispatch de la value et du name )

     const handleInputChange = (e) => {
        const inputName = e.target.name;
        let inputValue = e.target.value;
      
        dispatch(setInputChangeProfil(inputValue, inputName));
      };

      

    // console.log(tag_id)
    //- == Recuperation des informations tapez et mise a jour depuis le store depuis la fonction handleInputChange
   
        const handleValidationClick = (event) => {

            const pressEnter = event.key === 'Enter' ;
            const isBtn = event.currentTarget.classList.contains('btn-edit');
     
            if (!pressEnter && !isBtn){
                return;
            }

            const data = {                                          // == Envoie des informations utilisateurs apres validation du formulaire
                firstname,
                lastname,
                username,
                CdpSNbOrS,
                email,
                grade_id,
                tag_id,
            };


            dispatch(updateUser(data));     // == dispatch et demande de requête pour mise a jour des données dans la BDD
            dispatch(setEditingFalse());    // == Reset du status d'édition apres requete 
        };

        useEffect(() => {
            dispatch(setEditingFalse());
        }, [dispatch, activeSection]);

    // ======== NOTIF A ZERO

    function handleMakeNotifTozero () {
        notif > 0 ?  dispatch(sendValurNotifToZero()) : null;
    }


    return (

        <div id="main-content" className="main-content grid-content">

            <h2 className={`menu--title${isActive ? ' active' : ''}`} style={positionTitle}>
                {label}
            </h2>

            <div className="duContenu">

                <div className="profil_utilisateur">

                   <div className="avatar">{icon}</div>

                        <div className="user-links">
                            <button onClick={() => setActiveSection('profil')} className={activeSection === 'profil' ? 'active' : ''}>
                            Profil
                            </button>
                            <button onClick={() => {setActiveSection('post'); handleMakeNotifTozero ()}} className={activeSection === 'post' ? 'active' : ''}> {/* test de notif to zero */}
                            Post
                            </button>
                        </div>


                {activeSection === 'profil' ?
                    (       
                        <ProfilEdition 
                        isEditing={isEditing}
                        email={email}
                        firstname={firstname}
                        lastname={lastname}
                        username={username}
                        tag_id={tag_id}
                        grade_id={grade_id}
                        tags={tags}
                        grades={grades}
                        currentIndex={currentIndex}
                        handleInputChange={ handleInputChange }
                        handleValidationClick= { handleValidationClick }
                        />

                    ) : (
                        <PostProfilComponent
                        dataCommentUser={filteredByLatestCreateForum(dataCommentUser)}
                        />
                    )
                }

                </div>
            </div>
        </div>
        )
};

const WrapperProfil = withPageWrapper(Profil);
export default WrapperProfil;