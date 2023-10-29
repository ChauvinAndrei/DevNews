import withPageWrapper from "../PageWrapper";
import SousMenus from "../../Menu/SousMenus/SousMenus";
import ActuComponent from "./ActuComponent/ActuComponent";

import { getDataArticleFromApi } from "../../../Action/article";
import { filteredArticles } from "../../selector/selectorArticles";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { filteredByLatestCreate } from "../../selector/selectorArticles";

import './Actualités.scss';

import { WidgetPopulaire } from "../../Widget/Widget";

const Actualités = ( { isActive, positionTitle, label, isMobile} ) => {


    const dispatch = useDispatch();

    const ArticlesDatas = useSelector((state) => state.articlesReducer.articles);
    const { PageTheme } = useSelector((state) => state.page)

    const { theme } = useParams();

    useEffect (() => {
        ArticlesDatas.length <= 0 && dispatch(getDataArticleFromApi());
    }, [])

    const CurrentFilterArticles = theme ? filteredArticles(ArticlesDatas, PageTheme, theme) : ArticlesDatas;
// console.log(CurrentFilterArticles)
    return (
        <>  
{/* 
            <aside id="WidgetPopulaire" className="widget-populaire grid-content">
            <WidgetPopulaire />
            </aside> */}

            <div id="main-content" className="main-content grid-content">

                <h2 
                className={`menu--title${isActive ? ' active': ''}`}
                style={positionTitle}
                >
                   { label }
                </h2>

                <div className="duContenu">
                    <div className="wrappers--actualité">
                        {isMobile && <SousMenus />}
                        <ActuComponent articles={ filteredByLatestCreate(CurrentFilterArticles) } label={label} theme={theme}/>
                    </div>


                </div>
                
            </div>
        </>
    )
}

const WrapperWallet = withPageWrapper(Actualités);

export default WrapperWallet;

