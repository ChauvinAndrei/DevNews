
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import withPageWrapper from '../../Content/PageWrapper';
import SousMenus from "../../Menu/SousMenus/SousMenus";
import ActuComponent from "../../Content/Actualités/ActuComponent/ActuComponent";


import { filteredByLatestCreate } from "../../selector/selectorArticles";


import './SearchHeader.scss';


const SearchResponse = ( { label, isMobile} ) => {

    const { searchRequest } = useSelector((state) => state.home);
    const { theme } = useParams();

    const handleDataNull = searchRequest <= 0 ? 'Aucun résultat' : null;
    console.log(searchRequest)

    return (
        <>
                <div id="main-content" className="main-content grid-content">

                    <h2 className='menu--title'>
                        { label }
                    </h2>

                    <div className="duContenu">
                        <div className="wrappers--actualité">
                            {isMobile && <SousMenus />}
                            <ActuComponent articles={ filteredByLatestCreate(searchRequest) } label={label} theme={theme}/>
                        </div>
                        <span>{ handleDataNull }</span>

                    </div>

                </div>

        </>
    );
}

const wrapperSearch = withPageWrapper(SearchResponse);
export default wrapperSearch;