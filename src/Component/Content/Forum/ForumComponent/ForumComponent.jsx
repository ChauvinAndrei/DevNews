import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ForumMessage from './ForumMessage/ForumMessage';
import ForumResponse from './ForumResponse/ForumResponse';

import { filteredByLatestCreate } from '../../../selector/selectorArticles';
import { SetNewCountPostDisplay } from '../../../../Action/postsForum';




// import './ForumComponent.scss'

const ForumComponent = ( { handleClickOpenMessage , refMessage , refMessageReponse , posts, currentClickpost, handleChangeInputComment, inputCommentValue, handleSubmitComment, showSuccessCommentNotification, showEmptyCommentNotification }) => {

    
    const dispatch = useDispatch();

    const [ countComments, setCountComments ] = useState(0);
    const [ countTotalPost, setCountTotalPost ] = useState(0);
    const [ isNotMore, setIsNotMore ] = useState(false);
    const { moreCount, isLoading } = useSelector((state) => state.forum);


    // =======
    
    useEffect(() => {                                                                           // ===== Filtre le nombre de commentaire sans prendre en compte le nombre de button
    
        const MessageCounts = posts.map((post) => {
            return post.commentaires.length;
        })
      
        setCountComments(MessageCounts);
    }, [posts]);


    // ======= 

    useEffect(() => {
         setCountTotalPost(posts.length);                                                          // ====== Set le nombre de post au total ( permet ensuite de retourner , une nouvel state isNotMore pour savoir si il faut toujours incrementer ou non )
    }, [posts])
    
    const handleClickBtnMorePost = () => {
        moreCount <= countTotalPost && dispatch(SetNewCountPostDisplay())
    }   


    return (

        <div className={`wrapper--forum ${!isLoading && 'active'}`}>
            
                {posts.map((post, index) => (
                    index < moreCount && (
                        <ForumMessage 
                        key={post.post.id}
                        {...post}
                        value={inputCommentValue}
                        refMessage={refMessage}
                        index={index}
                        count={countComments[index]}
                        currentClickpost={currentClickpost}
                        handleClickOpenMessage={handleClickOpenMessage}
                        handleChangeInputComment={handleChangeInputComment}
                        handleSubmitComment={handleSubmitComment}
                        showEmptyCommentNotification={showEmptyCommentNotification}
                        showSuccessCommentNotification={showSuccessCommentNotification}
                        > 
                            <ForumResponse 
                            commentaires={filteredByLatestCreate(post.commentaires)}
                            index={index}
                            countComments={countComments}
                            refMessageReponse={refMessageReponse}
                            currentClickpost={currentClickpost}
                            />
                        </ForumMessage>
                    )
                 
                ))}

                {moreCount <= countTotalPost &&

                    <button className='wrapper--forum-btn_more-post'
                     onClick={handleClickBtnMorePost}
                    > Voir plus
                    </button>
                }

        </div>

    )
}

export default ForumComponent;    

