
import { 
  POST_USER_ADD_DATA, 
  POST_LOGIN_DATA_USER,
  setLoggedIn,
  postLoginDataSuccess,
  postUserDataSuccess, 
  UPDATE_USER, 
  updateUserSuccess,
  GET_PREFERENCES_FROM_API,
  getPreferencesFromApiSuccess,
  setIsUpdated,
  ADD_LIKE_TO_API,
  incrementLike,
  CHECK_IF_LIKED,
  checkIfLikedSuccess,
  removeLike,
  MAKE_NOTIF_TO_ZERO_IN_DB,
  updateNotifToZero,
  REMOVE_LIKE_TO_API,
  GET_COMMENT_FROM_API,
  setCommentFromApiSuccess,
  SEND_VALUE_COMMENT_DATA_PROFIL,
  startSendValuePostData,
  setErrorSendValuePostData,
  resetValueInputComment,
  completeSendValuePostData,
} from "../Action/user";


import axios from 'axios';


const User = (store) => (next) => async (action) => {
        
        switch(action.type) {
          
          case POST_LOGIN_DATA_USER: 

                  try {
                    const dataInputLogin = store.getState().User.inputLogin;
                      axios.defaults.withCredentials = true;
                      axios.defaults.baseURL = 'https://devweaversync.fr/';

                      const tokenResponse = await axios.get('api/takeToken');
                      const token = tokenResponse.data.tokenData;
                      // console.log(token)
                      const headers = {
                          'Authorization': token,
                      };

                      const postLoginResponse = await axios.post(
                          'api/connexion/login',
                           dataInputLogin,
                          { headers: headers }
                      );

                      const postLoginData = postLoginResponse.data;

                      store.dispatch(postLoginDataSuccess(postLoginData));
                      store.dispatch({ type: 'POST_LOGIN_DATA_SUCCESS', });
                      store.dispatch(setLoggedIn());

                  }
                  catch (error) {
                    console.error("Erreur lors de la connexion:", error);
                    store.dispatch({ type: 'POST_LOGIN_DATA_FAILURE' });
                    
                  }
            break;

        case POST_USER_ADD_DATA:

            try {
                const formInscription = store.getState().User.usersInputs;
                axios.defaults.withCredentials = true;
                axios.defaults.baseURL = 'https://devweaversync.fr/';

                const getToken = await axios.get('api/takeToken').then(async response => {
                    const token = response.data.tokenData;

                    const headers = {
                        'Authorization': token,
                    };


                    await axios.post(
                        'api/add_user',
                        formInscription,
                        { headers: headers }
                    ).then(async response => {
                        // console.log(response.data);
                        // console.log([response.data, formInscription]);
                    });
                });


                store.dispatch(postUserDataSuccess());
                store.dispatch({ type: 'POST_USER_DATA_SUCCESS' });
              } catch (error) {
                store.dispatch({ type: 'POST_USER_DATA_FAILURE' });
              }
              break;
        
       case UPDATE_USER:
              store.dispatch(setIsUpdated(true));

             try {
                const { firstname, lastname, username, email, grade_id, tag_id, id } = store.getState().User.currentUserProfil;
                const editedDataProfil = store.getState().User.editedUsersProfilInputs;
                const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;

                axios.defaults.baseURL = 'https://devweaversync.fr/';
            

                const headers = {
                  'User-Token': getCookieToken,
                };

                const currentDataProfil = {
                      firstname,
                      lastname,
                      username,
                      email,
                      grade_id,
                      tag_id,
                }
              
                const mergedDataProfil = {
                  ...currentDataProfil, // == La data actuel de l'utilisateur 
                  ...editedDataProfil,  // == Les nouvelles informations a envoyer
                  CdpSNbOrS: id,
              };  

 
                const response = await axios.put(
                  '/api/edit-user', 
                   mergedDataProfil,
                  { headers: headers }
                );
                    
                store.dispatch(updateUserSuccess(mergedDataProfil));
                store.dispatch(setIsUpdated(false));
            }  
            catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
            }

          break;


        case GET_PREFERENCES_FROM_API:
              try {
                axios.defaults.baseURL = 'https://devweaversync.fr/';
                const requestPreferences = await axios.get('api/techno');

                const techno_grades = requestPreferences.data;

                store.dispatch(getPreferencesFromApiSuccess(techno_grades));
              } catch (error) {
                console.log(error, "request preference failed");
              }

          break;


        case GET_COMMENT_FROM_API:
                  const id = store.getState().User.currentUserProfil.id;

                  const dataID = {
                    user_id: id,
                  }

              try{
                axios.defaults.baseURL = 'https://devweaversync.fr/';
                const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;


                const headers = {
                  'User-Token': getCookieToken,
                };

                const requestCommentUser = await axios.post(
                  'api/post-for-user',
                     dataID,
                   {headers : headers}
                );

                  store.dispatch(setCommentFromApiSuccess(requestCommentUser.data));
              } catch (error) {
                console.log(error, "erreur lors de la recuperation des commentaires de l'utilisateur");
              }

          break;


        case ADD_LIKE_TO_API:{
              const likedData = store.getState().User.currentLikeByUser;

            try {
              axios.defaults.baseURL = 'https://devweaversync.fr/';
              const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;

              const headers = {
                'User-Token': getCookieToken,
              };
              
              const requestLikes = await axios.post(
                'api/like', 
                 likedData, 
                { headers: headers }
                );

              const status = requestLikes.data.status;
              store.dispatch(incrementLike(status));
              
            } catch (error) {

              console.log(error, "erreur lors de l'envoie like");
              
            }
          }

          break; 
          
        case CHECK_IF_LIKED:{
             const likedData = store.getState().User.currentLikeByUser;
            
          try {
              axios.defaults.baseURL = 'https://devweaversync.fr/';
              const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;
              

              const headers = {
                'User-Token': getCookieToken,
              };

              
              const requestCheckLiked = await axios.post(

                `api/likedArticle`,
                likedData,
                { headers: headers }
              );


              store.dispatch(checkIfLikedSuccess(requestCheckLiked.data));
              
            } catch (error) {
              console.log("Erreur capturée : ", error);
              console.log(error, "erreur lors de la vérification du like");
            }
          }
            break;


            case REMOVE_LIKE_TO_API:{
              const likedData = store.getState().User.currentLikeByUser;

            try {
              axios.defaults.baseURL = 'https://devweaversync.fr/';
              const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;

              const headers = {
                'User-Token': getCookieToken,
              };
              
              const requestLikes = await axios.post(
                'api/unlike', 
                 likedData, 
                { headers: headers }
                );
              const status = requestLikes.data.status;

              store.dispatch(removeLike(status));
              
            } catch (error) {

              console.log(error, "erreur lors de l'envoie like");
              
            }
          }

          break;

            case MAKE_NOTIF_TO_ZERO_IN_DB: {
                const user_id = store.getState().User.currentUserProfil.id;

                try {
                    axios.defaults.baseURL = 'https://devweaversync.fr/';
                    const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;
                    const headers = {
                        'User-Token': getCookieToken,
                    };

                    const requestNotifToZero = await axios.post(
                        'api/user/unnotif',
                        {user_id},
                        {headers: headers}
                    );

                    store.dispatch(updateNotifToZero());

                } catch (error) {
                    console.log(error, "erreur lors de la mise à jour des notifs");
                }

            }

            break;

            // ===== POST IN PROFIL 

            case SEND_VALUE_COMMENT_DATA_PROFIL: 

            if (store.getState().User.isSending) {
                return;
            }

            store.dispatch(startSendValuePostData());

            const dataComment = store.getState().User.commentData;
 
            try {

                const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;
                axios.defaults.baseURL = 'https://devweaversync.fr/';

                const headers = {
                  'User-Token': getCookieToken,
                };
                
                const response = await axios.post(
                    'api/add_edit_com_post', 
                     dataComment,
                    { headers: headers }
                );
                
                store.dispatch(resetValueInputComment());

                store.dispatch(completeSendValuePostData());
            }catch (error) {
                console.log(error, "erreur lors de la recuperation du commentaire au post");
                store.dispatch(setErrorSendValuePostData(error.message));
            }

    } 

    next(action);
}


export default User;

// bouclierman@herocorp.io
// autoroute@hotmail.fr
// A14autoroutes
//http://localhost:3000/connexion
//http://localhost:3000/account