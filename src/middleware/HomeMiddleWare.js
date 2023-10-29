import {
    GET_DATA_TOP_LIKE,
    getDataTopLikeSucess,
    getSearchRequest,
    SEARCH_ACTUALITE,
    resetSearchData,
    GET_RANDOM_POST,
    getRandomPostSucess
} from "../Action/home";

import { GET_CURRENT_THEMES_FROM_API, setCurrentThemes, setIsLoading } from "../Action/page";

import { getData } from "../utils";
import axios from 'axios';

import { resetInputSearchValue } from '../Action/home';

const Home = (store) => (next) => async (action) => {

    switch(action.type) {
        
        case GET_CURRENT_THEMES_FROM_API :

            try {
                const data = await getData('https://devweaversync.fr/api/category');
            
                store.dispatch(setCurrentThemes(data));
                store.dispatch(setIsLoading(false));
            } catch (error) {

            }

            break;

        case GET_DATA_TOP_LIKE : 
          
            try {
                const data = await getData('https://devweaversync.fr/api/top_like');
                store.dispatch(getDataTopLikeSucess(data));
                store.dispatch(setIsLoading(false));
            }
            catch (error) {

            }

            break;

        case SEARCH_ACTUALITE : {

            store.dispatch(resetSearchData());

            const search = action.searchValue;
            axios.defaults.baseURL = 'https://devweaversync.fr/';

            try {

            const searchRequest = await axios.post('api/search',
                {search}
            )

                store.dispatch(resetInputSearchValue());
                store.dispatch(getSearchRequest(searchRequest.data));

            } catch (error) {

            }

        }

        break;

        case GET_RANDOM_POST : {

            axios.defaults.baseURL = 'https://devweaversync.fr/';

            try {
                const randomPost = await axios.get('api/random-post');
                console.log('RANDOM POST = ', randomPost.data)

                store.dispatch(getRandomPostSucess(randomPost.data));
            }
            catch (e) {
                console.log('ERROR = ', e)
            }

        }

    } 

    next(action);
}


export default Home;