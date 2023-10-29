
import Comment from './Comment/Comment';

import { useDispatch, useSelector } from 'react-redux';


import { SetNewCountCommentDisplay } from '../../../../../Action/postsForum';

import './ForumResponse.scss';


const ForumResponse = ( { commentaires , refMessageReponse, index, isOpened, currentClickpost, countComments }) => {

        const dispatch = useDispatch();

        const moreCommentCount = useSelector((state) => state.forum.commentMoreCounts[index] || 5);
    

        // ======= 
    
            const handleClickMoreComment = (e, index) => {                                                     // ===== handleclick du button more pour chaque button
                e.preventDefault();

                dispatch(SetNewCountCommentDisplay(index));                                 // ===== dispatch pour incrementer le compteur autrement isnotmore return true et on arrete
            }

        // =======
  
    return (
        <div className={`forum--Message-wrapperResponse-contain ${currentClickpost[index] ? 'active' : ''}`} ref={ (el)  => refMessageReponse.current[index] = el}>

            {commentaires.map((comment, index) => (
              index < moreCommentCount && (
                <Comment 
                key={comment.id}
                {...comment}
                />
              )     
            ))}

            {moreCommentCount < countComments[index] && 
                <button className='forum--Message-wrapperResponse-contain-btnMore_comment' 
                    onClick={ (e) => handleClickMoreComment(e, index)}> 
                    Voir plus 
                </button>
            }

        </div>
    )
}

export default ForumResponse;