import { 
    getDataArticleFromApi, 
    getCommentDataFromApi, 
    setValueCommentArticle, 
    getDataComment, 
    sendValueCommentApi, 
    clearOldComment,
    } from '../../../Action/article';

import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ArrowLeftCircle } from 'react-feather';

import './SingleArticle.scss'
import Comments from './Comments/Comments';
import Article from './Article/Article';

import { handleLastObjectIntoView } from '../../../utils';
import { setActiveMenuItem } from '../../../Action/page';

const SingleArticle = (  ) => {

    const { articleTitle } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const articles = useSelector((state) => state.articlesReducer.articles);

    const comments = useSelector((state) => state.articlesReducer.comments)
    
    const decodedTitle = decodeURIComponent(articleTitle);

    const article = articles.find((article) => article.slug === decodedTitle);

    const [commentsLoaded, setCommentsLoaded] = useState(false);

    useEffect (() => {                                                                      // ==== recuperation des données de l'article si larticle nexiste pas au préalable
        !article && dispatch(getDataArticleFromApi());
    }, [articles])
    
    // =======

    useEffect(() => {                                                                       // ==== recuperation des données commentaire relié a l'article si pas déja chargez au préalable et clear des anciens commentaire lié a l'article lorsque l'on switch et que l'ont ouvre un nouvelle article.

        dispatch(clearOldComment());

        if (article) {
          dispatch(getCommentDataFromApi(article.id))
            .then(() => setCommentsLoaded(true)); 
        }
      }, [article]);

    // =========


    const handleChangeInputComment = (e) => {
        const { value } = e.currentTarget;
        dispatch(setValueCommentArticle(value));                                             // ===== dispatch des values de l'input commentaire
    }

    // =========

    const { comment } = useSelector((state) => state.articlesReducer.inputComment);
    const refCommentSticky = useRef(null);
    const refBoxMessage = useRef(null);

    const [showEmptyCommentNotification, setShowEmptyCommentNotification] = useState(false);
    const [showSuccessCommentNotification, setShowSuccessCommentNotification] = useState(false);

    
    const handleSubmitComment = (event) => {                                                            // ===== gerer le submit du block commentaire 
        
        const pressEnter = event.key === 'Enter' ;
        const shiftKey = pressEnter && event.shiftKey;

        const isBtn = event.currentTarget.classList.contains('content--comment-wrapper_input-btn');
 
        if ((!pressEnter && !isBtn) || shiftKey){
            return;
          }

        event.preventDefault();

        setShowEmptyCommentNotification(true);
    
        const trimmedComment = comment.trim();
        const emptyOrNot = trimmedComment.length === 0;
    
        const ID = article ? article.id : null;
        const { id } = JSON.parse(localStorage.getItem('currentUserProfil'));                           // ===== recuperation de l'id de l'utilisateur
    
        const dataComment = {                                                                           // ===== création du tableau avec les informations ID user , ID de l'article actuel ou l'on envoie le message, et le commentaire tapez dans le textearea.
            content: trimmedComment,
            user_id: id,
            article_id: ID,
        };
    
        if (!emptyOrNot) {
            dispatch(getDataComment(dataComment));
            dispatch(sendValueCommentApi());
            setShowEmptyCommentNotification(false);
            setShowSuccessCommentNotification(true);
            setTimeout(() => {
                setShowSuccessCommentNotification(false); 
            }, 3000);
        } else {
            setShowEmptyCommentNotification(true);
        
            setTimeout(() => {
                setShowEmptyCommentNotification(false);
            }, 3000);
        }
    };

    // =======


        useEffect(() => {                                                                                   // ==== repositionne le block commentaire ou le nouveau message a la fin du scrolling

            const commentSticky = refCommentSticky && refCommentSticky.current;
            const boxMessage = refBoxMessage && refBoxMessage.current;
            const refScroller= refBoxMessage.current;
 
            commentSticky?.addEventListener('scroll', handleLastObjectIntoView(refScroller, boxMessage));
        
            return () => {
              commentSticky?.removeEventListener('scroll', handleLastObjectIntoView(refScroller, boxMessage));
            };

        }, [comments]);
    
    
    // =======

                                                                                         //- ==== retourne le bon index si on click sur un lien d'article unique pour la navigation acutellement activé
        useEffect(() => {
  
            const isDirectAccess = typeof articleTitle === 'string' && articleTitle.trim() !== '';
        
            if (isDirectAccess) {
              const actualitesIndex = 3;
              
              dispatch(setActiveMenuItem(actualitesIndex));
            }
        }, [dispatch]);


    // =======
      const refTextarea = useRef(null);
      const [maxHeight, setMaxHeight] = useState('27px');

    useEffect(() => {                                                                   // ===== calcule de la hauteur input textarea pour recalculer la max height du conteneur commentaire scrollable

        const textarea = refTextarea.current;
        const heightArea = textarea ? textarea.style.height : '';
        setMaxHeight(heightArea);
        document.documentElement.style.setProperty('--heightInputArea', heightArea);
      }, [comment]);
    

   // =======

    return (

        <main className='main--wrapper'>
            <div className='main--wrapper--div'>

            {article ? (

                <div className='wrapper--single_article'>

                    <div className='wrapper-btn'>
                        <button 
                        className='btn-return' 
                        type='button'
                        onClick={() => navigate(-1)} 
                        > 
                           <ArrowLeftCircle /> 
                        </button>
                    </div>

    
                    <div className='wrapper--content-article_comment'>


                        <Article {...article}/>
                    

                        <Comments 
                        comments={comments} 
                        onChange={handleChangeInputComment} 
                        onSubmit={handleSubmitComment} 
                        value={comment}
                        commentsLoaded={commentsLoaded}
                        refCommentSticky={refCommentSticky}
                        refBoxMessage={refBoxMessage}
                        refTextarea={refTextarea}
                        showSuccessCommentNotification={showSuccessCommentNotification}
                        showEmptyCommentNotification={showEmptyCommentNotification}
                        />

                </div>
        

            </div>
            
            ) : (
                <div>Article not found</div>
            )}

            </div>
        </main>
        );
};

export default SingleArticle;
