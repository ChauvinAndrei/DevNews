import axios from 'axios';

import { GET_POST_FROM_API, getPostFromApiSuccess, SEND_VALUE_POST_DATA, sendValuePostDataSucess, SEND_VALUE_COMMENT_DATA, sendValueCommentDataSucess, resetValueInputPost, resetValueInputComment, setErrorSendValuePostData, completeSendValuePostData, startSendValuePostData, setIsLoading } from "../Action/postsForum";

import { getData } from "../utils";

const ForumMiddleWare = (store) => (next) => async (action) => {
        
    switch(action.type) {
        
        
        case GET_POST_FROM_API:   
                store.dispatch(setIsLoading(true));
            try {
                const data = await getData('https://devweaversync.fr/api/posts');
   
                store.dispatch(getPostFromApiSuccess(data));
                store.dispatch(setIsLoading(false));
            } catch (error) {
                console.log(error, "erreur lors de la recuperation des posts forum")
            }

        break;

        case SEND_VALUE_POST_DATA: 

            if (store.getState().forum.isSending) {
                return;
            }

            store.dispatch(startSendValuePostData());

            const dataPost = store.getState().forum.messageData;
            
        try {

            const getCookieToken = JSON.parse(localStorage.getItem('_token')).token;

            axios.defaults.baseURL = 'https://devweaversync.fr/';

            const headers = {
              'User-Token': getCookieToken,
            };

            const response = await axios.post(
                'api/add_edit_post', 
                 dataPost,
                { headers: headers }
            );

            store.dispatch(resetValueInputPost());

            store.dispatch(completeSendValuePostData());
        } catch (error) {
            console.log(error, "erreur lors de la recuperation des reponses post forum");
            store.dispatch(setErrorSendValuePostData(error.message));
        }

        break;


        case SEND_VALUE_COMMENT_DATA: 

            if (store.getState().forum.isSending) {
                return;
            }

            store.dispatch(startSendValuePostData());

            const dataComment = store.getState().forum.commentData;
 
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
        

        break;

    } 

    next(action);
}


export default ForumMiddleWare;