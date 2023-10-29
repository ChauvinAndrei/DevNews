import ImageWithLoader from '../../../Loading/ImageWithLoader';

import { getCurrentTime } from '../../../../utils';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
 import { useSelector } from 'react-redux';


import './Article.scss';
import LikeButton from '../../../LikeButton/LikeButton';
import { useEffect } from 'react';
import {  checkIfLiked, resetLikeStatus, setCurrentCountLike, setLikeData } from '../../../../Action/user';
import { useDispatch } from 'react-redux';


const Article = ( { title, picture_url, content, created_at, user, category, likes, id }) => {

    const dispatch = useDispatch();

    const userID = useSelector((state) => state.User.currentUserProfil.id);

    const UserRealName =  `${user.firstname} ${user.lastname}` ;               // ===== Concatenation du prénom et du nom de l'utilisateur 
    
    const currentPublication = getCurrentTime(created_at);                     // ===== Modification de created_at en valeur réel de la date du post


    const preprocessContent = (content) => {                                   // ==== preformatage du contenu de l'article ( verifie si le contenu contien des triple backticks ``` )
        const codeBlockRegex = /```([\s\S]*?)```/g;
        const formattedContent = content.replace(codeBlockRegex, "```\n$1\n```");
        return formattedContent;
      };
      const formattedContent = preprocessContent(content);

      const { isLiked } = useSelector((state) => state.User)
     
    // ======

      useEffect(() => {

        const likedData = {
            article_id: id,
            user_id: userID,
        }
        console.log(id, userID)

        dispatch(setLikeData(likedData));      // ==== Dispatch de la data contenant le numero de l'article et le user_id et mise a jour apres action de la state currentLikeByUser dans le store

  
        dispatch(resetLikeStatus());
        dispatch(checkIfLiked());
        dispatch(setCurrentCountLike(likes));  // ==== mise a jour du store avec le nombre de like de l'article

        return () => {
            const likedData = {};
        }

      }, []);

    // ===== 

    return (

            <div className='content--article'>

                <div className='content--article-wrapper-contenu-user'>
                    <span className='content--article-wrapper-info'>
                        <span className='content--article-wrapper-info-username' > {UserRealName} </span>  
                        <span className='content--article-wrapper-info-date' >  {currentPublication} </span>
                    </span>

                    <span className='content--article-wrapper-user'>
                        <h1 className='content--article-wrapper-user-title' > {title} </h1>
                        <span className='content--article-wrapper-user-category'> {category.name} </span>
                    </span>
                </div>

                <div className='content--article-wrapper-contenu-article' >
                    <div className='content--article-wrapper-contenu-img'>

                        {isLiked !== null && <LikeButton article_id={id} likes={likes} isLiked={isLiked} /> }

                        <ImageWithLoader src={picture_url} alt={title} />
                    </div>
                    
                    <div className="content--article-wrapper-contenu-info_content">
                        <ReactMarkdown children={formattedContent} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}/>
                    </div>
                </div>

            </div>
    )
}

export default Article;
