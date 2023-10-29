
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Comment from './Comment/Comment';
import Notification from '../../../Notification/Notification';

import { Check, Send } from 'react-feather';

import TextareaAutosize from 'react-textarea-autosize';
import LoadingComment from '../../../Loading/LoadingComment';
import './Comment.scss';
 

const Comments = ( { comments, onChange, onSubmit, value, refCommentSticky , refBoxMessage, showEmptyCommentNotification, showSuccessCommentNotification, refTextarea } ) => {


    const { isLoading } = useSelector((state) => state.articlesReducer);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
      const delay = 500;
    
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, delay);
    
      return () => {
        clearTimeout(timer);
      };
    }, []);
    
    // ===== 

    return (
                <>
                    {/* COMMENT */}
                <div className='content--comment-sticky' ref={refCommentSticky}>

                        <div className='content--comment'>

                            <div className='content--comment-wrapper-sticky-comment'><span className='content--comment-article'> Commentaire: </span></div>
                  
                            <div className={`content--comment-post-wrapper`} ref={refBoxMessage} style={{opacity: !isLoading ? 1 : 0}}>
                                

                                {isLoading && showLoader ? (
                                    <LoadingComment isLoading={isLoading}/>
                                    ) : comments && comments.length > 0 ? (
                                    comments.map((comment) => <Comment key={comment.id} {...comment}/>)
                                    ) : (
                                    comments && comments.length === 0 && <p>No comments</p>
                                )}

                            </div>
                       
                        
                        </div>

                        <div className='content--comment-wrapper_input'>

                            {showEmptyCommentNotification ? (
                                    <Notification notif='Pourquoi envoyez un message vide ?!' delay={3000} />
                                ) : showSuccessCommentNotification ? (
                                    <div className='SuccessMessage'> 
                                      <span><Check /></span> 
                                    </div>
                                ) : null}
        

                            <button className="content--comment-wrapper_input-btn" type='submit' onClick={onSubmit} > <Send width={20} height={20} /></button>
                            <TextareaAutosize 
                            minRows={1} 
                            maxRows={5} 
                            className='input-send_comment' 
                            placeholder='Send your message...' 
                            value={value} 
                            ref={refTextarea}
                            onChange={onChange} 
                            onKeyDown={onSubmit}
                            />
                           

                        </div>

                </div>
                </>
    )
}


export default Comments;