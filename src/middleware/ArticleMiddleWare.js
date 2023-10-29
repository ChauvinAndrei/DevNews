
import axios from "axios";
import { 
    GET_DATA_ARTICLE_FROM_API, 
    getDataArticleSucess, 
    GET_DATA_COMMENT__FROM_API, 
    commentDataFromApiSuccess, 
    SEND_VALUE_COMMENT_API,
    SendValueCommentToApiSuccess,
    setIsLoading,
    GET_RANDOM_ARTICLE,
    setRandomDataFromDb,
    SET_REPORT_COMMENT
    } from "../Action/article";


import { getData } from "../utils";

const Articles = (store) => (next) => async (action) => {
        
    switch(action.type) {
        
        case GET_DATA_ARTICLE_FROM_API :   
            try {
                const data = await getData('https://devweaversync.fr/api/articles');
                store.dispatch(getDataArticleSucess(data));
                console.log(data)
            } catch (error) {
                console.log(error, "ARTICLE ERROR");
            }
            
            break;

        case GET_DATA_COMMENT__FROM_API : 
                const currentIDArticle = action.id;
                store.dispatch(setIsLoading(true));
            try {
       
                const dataComment = currentIDArticle && await getData(`https://devweaversync.fr/api/article/${currentIDArticle}/com`);

                store.dispatch(commentDataFromApiSuccess(dataComment));   
                store.dispatch(setIsLoading(false));
            } catch (error) {
                console.log(error, "COMMENT ERROR");
            }
            break;

        case SEND_VALUE_COMMENT_API: 
            const { commentData } = store.getState().articlesReducer;
            const { token } = JSON.parse(localStorage.getItem('_token'));
        
            const header = {
                'User-Token': token,
            }
            console.log(token)
            try {

                const requestWidthToken = await axios.post('https://devweaversync.fr/api/add_edit_com_article',
                    commentData,
                    {headers: header}
                );
                // console.log(requestWidthToken)
                store.dispatch(SendValueCommentToApiSuccess(requestWidthToken.data));
            } catch (error){
                console.log(error, "erreur lors de l'envoie du commentaire");
            }
            
            break;

        case GET_RANDOM_ARTICLE: {

            axios.defaults.baseURL = 'https://devweaversync.fr/';

            try {
                const randomRequest = await axios.get('api/random-article');
                store.dispatch(setRandomDataFromDb(randomRequest.data));

            } catch (error) {
                console.log(error);
            }
        }

            break;

        case SET_REPORT_COMMENT: {
            const com_id = action.commentId;
            axios.defaults.baseURL = 'https://devweaversync.fr/';

            try {
                const reportCom = await axios.post('api/report-article-com',
                    {com_id}
                );

                console.log(reportCom)

            } catch (error) {
                console.log(error);
            }

        }

        break;

    } 

    next(action);
}


export default Articles;