

// == COMPONENT
import { WidgetPopulaire } from "../../Widget/Widget";
import Slider from "../../Slider/Slider";
import withPageWrapper from "../PageWrapper";
import ActuMain from "./ActuMain/ActuMain";
import ActuComponent from "../Actualités/ActuComponent/ActuComponent";
import SousMenus from "../../Menu/SousMenus/SousMenus";
import RandomPost from "./RandomPost/RandomPost";

import {useEffect, useState} from "react";
import { getDataTopLike } from "../../../Action/home";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// == ACTION 
import { getDataArticleFromApi, getRandomArticle } from "../../../Action/article";
import {getRandomPost} from "../../../Action/home";

// == UTILS/ SELECTOR
import { filteredArticles, filteredTopLikes } from "../../selector/selectorArticles";

const Home = ( { isActive, label, isMobile,} ) => {

    const dispatch = useDispatch();
    const TopLikes = useSelector((state) => state.toplikeReducer.TopLikes);
    const ArticlesDatas = useSelector((state) => state.articlesReducer.articles);
    const { PageTheme } = useSelector((state) => state.page)
    const { theme } = useParams();
    const { randomArticle } = useSelector((state) => state.articlesReducer);
    const { randomPost } = useSelector((state) => state.home);

    useEffect (() => {
        TopLikes <= 0 && dispatch(getDataTopLike())
        ArticlesDatas.length <= 0 && dispatch(getDataArticleFromApi());
    }, []);

    useEffect(() => {
        randomArticle <= 0 && dispatch(getRandomArticle());
    }, []);

    useEffect(() => {
        randomPost <= 0 && dispatch(getRandomPost());
    }, []);

    const CurrentFilterArticles = theme ? filteredArticles(ArticlesDatas, PageTheme, theme, label) : ArticlesDatas;

    return (
        <>
            <section id="sliderHome" className="sliderHome grid-content">
                <Slider randomArticle={randomArticle} />
            </section>

            <aside id="WidgetPopulaire" className="widget-populaire grid-content">
                <WidgetPopulaire>
                    <RandomPost randomPost={randomPost} />
                </WidgetPopulaire>
            </aside>

            <div id="main-content" className="main-content grid-content">

              <h2 className={`menu--title${isActive ? ' active': ''}`} >
              { label }
              </h2>

                <div className="duContenu">
                    
                    {isMobile && <SousMenus />}

                    <div className="wrappers--Home">
                        {theme && theme !== 'top likes' ? 
                        (
                        <ActuComponent articles={ CurrentFilterArticles } label={label} />
                        ) : 
                        (
                        <ActuMain toplikes={ filteredTopLikes(TopLikes) }/>
                        )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}



const WrapperHome = withPageWrapper(Home);

export default WrapperHome;