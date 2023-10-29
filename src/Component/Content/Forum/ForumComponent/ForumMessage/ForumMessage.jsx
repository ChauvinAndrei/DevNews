
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import Notification from '../../../../Notification/Notification';
import { getCleanHtml } from '../../../../../utils';

import { Heart, Send, ChevronDown, User, Check } from 'react-feather';
import BubbleMessage from '../../../../../Assets/booble+3point-message.svg';
import './ForumMessage.scss';


const ForumMessage = ( props ) => {

    const { count, refMessage, index, handleClickOpenMessage, currentClickpost, post, user, time, category, 
            handleChangeInputComment, value,  handleSubmitComment,  showEmptyCommentNotification, showSuccessCommentNotification } = props;

    const { currentInputSend } = useSelector((state) => state.forum);
    const [isNewMessage, setIsNewMessage] = useState(false);

    const formatedContent = getCleanHtml(post.content);
    const formatedTitle = getCleanHtml(post.title);

    const [ isOverflow, setIsOverflow ] = useState(true);
    const refContentPost = useRef(null);


    const [likeHovered, setLikeHovered] = useState(false);

    const handleLikeHover = () => {
      setLikeHovered(true);
    };
  
    const handleLikeLeave = () => {
      setLikeHovered(false);
    };
    

    useEffect(() => {
        if (showSuccessCommentNotification && currentInputSend[index]) {
          setIsNewMessage(true);
    
          setTimeout(() => {
            setIsNewMessage(false);
          }, 200);
        }
      }, [showSuccessCommentNotification, currentInputSend, index]);




      const handleCheckOverflow = () => {                                       //- ==== Vérifie si des contenues dépasse un certain seuil fixé en css et applique la classe text-hidden si le contenu est overflow.
        const currentContents = refContentPost.current;
      
        if (currentContents.scrollHeight > currentContents.clientHeight) {
          setIsOverflow(true);
        } else {
          setIsOverflow(false);
        }
      };

        useEffect(() => {     
          handleCheckOverflow();
          window.addEventListener('load', handleCheckOverflow);
          window.addEventListener('resize', handleCheckOverflow);
        
          return () => {
            window.removeEventListener('load', handleCheckOverflow);
            window.removeEventListener('resize', handleCheckOverflow);
          };
        }, [post.content]);


      const [ isClickMoreContent , setIsMoreContentClicked ] = useState(false);   //- === remove au click de la class hidden du texte

      const handleClickMoreContent = () => {
         setIsMoreContentClicked(!isClickMoreContent);
      };

    return (
<>
        <div  className={`forum--Message ${isNewMessage ? 'new-message' : ''}`}>

                <div className="forum--Message-wrappertitle">
                    <span className='forum--Message-wrappertitle-usericon'> <User /> </span>
                    <span className='forum--Message-wrappertitle-username'> {user.username} </span>
                    <span className='forum--Message-wrappertitle-hastag'> - {user.tag} </span>
                </div>

                <div className='wrapper-box-shadow'>

                    <div className='forum--Message-wrappermessage'>
                        <div className='forum--Message-wrappermessage-content'>

                            <span className='forum--Message-wrappermessage-content-info_user_post'>
                                <h3 className='forum--Message-wrappermessage-content-title' dangerouslySetInnerHTML={formatedTitle}/>
                                <span className='forum--Message-wrappermessage-content-hour'> {time} </span>
                            </span>
                            

                            <div className='forum--Message-wrappermessage-content-texte'>

                               <p className={`${isOverflow && !isClickMoreContent ? 'text-hidden' : 'text-visible'}`} dangerouslySetInnerHTML={formatedContent}  
                               ref={ el => refContentPost.current = el }
                                />

                                {isOverflow && !isClickMoreContent &&
                                   <button className='btnMoreRead' onClick={handleClickMoreContent}> 
                                      <span>Lire la suite</span> <ChevronDown /> 
                                    </button>
                                }
                                
                            </div>

                        </div>      

                        <div className={`forum--Message-wrappermessage-information ${currentClickpost[index] ? 'active' : ''} ${count <= 0 ? 'noComment' : ''}`} 
                        onClick={(e) => handleClickOpenMessage(e,index)} 
                        ref={ (el) => (refMessage.current[index] = el)}
                        style={{
                            pointerEvents: count <= 0 || likeHovered ? 'none' : '',
                            backgroundColor: likeHovered ? 'transparent' : '',
                        }}>

                            { count > 0  &&
                                <>
                                    <button> <ChevronDown /> </button>
                                    <span className="forum--Message-wrappermessage-information-countmessage"> <img src={BubbleMessage} alt="" /> {count} </span>
                                </>
                            }
                            <span className="forum--Message-wrappermessage-information-like" 
                              onMouseEnter={handleLikeHover} 
                              onMouseLeave={handleLikeLeave} 
                             > <Heart /> 5  
                           </span>
                           
                        </div>
                    </div>

                    {props.children}
                    
                    <div className='forum--Message-wrappermessage-input'>
                        

                    {showEmptyCommentNotification && currentInputSend[index] ? (
                                    <Notification notif='Pourquoi envoyez un message vide ?!' delay={1000} showEmptyCommentNotification={showEmptyCommentNotification}/>
                                ) : showSuccessCommentNotification && currentInputSend[index] ? (
                                    <div className='SuccessMessage'> 
                                      <span><Check /></span> 
                                    </div>
                                ) : null}

                          <button className="forum--Message-wrappermessage-input-btn" type='submit' 
                          onClick={(e) => handleSubmitComment(e, index, post.id)}
                          > 
                          <Send width={20} height={20} />
                          </button>


                        <div className='wrapper-text-areaResponse'>
                          <label htmlFor={`inputcomment_${index}`}></label>
                          <TextareaAutosize 
                          className="input-send_comment" 
                          minRows={1} 
                          maxRows={7}
                          id={`inputcomment_${index}`}
                          name={`inputcomment_${index}`} 
                            placeholder='Comment...'
                            value={value[`inputcomment_${index}`] || ''}
                            onChange={(e) => {
                                const { value, name } = e.target;
                                handleChangeInputComment(value, name)
                            }}
                            onKeyDown={(e) => 
                              handleSubmitComment(e, index, post.id)}
                          />

                          </div>

                    </div>

                </div>

        </div>

        <hr className='line-separate-post'/>

</>

    )
}

export default ForumMessage;