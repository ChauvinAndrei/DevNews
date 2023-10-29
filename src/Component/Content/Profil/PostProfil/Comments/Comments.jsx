
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment/Comment';

import './Comments.scss';
import { SetNewCountCommentDisplay } from '../../../../../Action/user';


const Comments = ( { commentaires,  refMessageReponse, index, currentClickpost, countComments } ) => {

    const dispatch = useDispatch();
    const moreCommentCount = useSelector((state) => state.User.commentMoreCounts[index] || 5);


        // ======= 
    
            const handleClickMoreComment = (e, index) => {                                                     // ===== handleclick du button more pour chaque button
                e.preventDefault();

                dispatch(SetNewCountCommentDisplay(index));                                 // ===== dispatch pour incrementer le compteur autrement isnotmore return true et on arrete
            }

        // =======

    return (
        <div className={`Profil--Message-wrapperResponse-contain ${currentClickpost[index] ? 'active' : ''}`} ref={ (el)  => refMessageReponse.current[index] = el}>
            
            { commentaires.map((comment, index) => (
                 index < moreCommentCount && (
                <Comment {...comment} key={ comment.id } />
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

export default Comments;
