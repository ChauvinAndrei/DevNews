

import BubbleMessage from '../../../../../Assets/booble+3point-message.svg';
import { Check, ChevronDown, Heart, Send } from 'react-feather';

import {getCleanHtml} from "../../../../../utils";


import './Post.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notification from '../../../../Notification/Notification';

const Post = ( props ) => {

    // const { post, time } = props.props;
    
    const { count, refMessage, index, handleClickOpenMessage, currentClickpost, value, post, time, handleChangeInputComment, handleSubmitComment, showEmptyCommentNotification, showSuccessCommentNotification } = props;

    const { currentInputSend } = useSelector((state) => state.User);
    const [isNewMessage, setIsNewMessage] = useState(false);   

    const formatedTitle = getCleanHtml(post.title);
    const formatedContent = getCleanHtml(post.content);

// console.log(content)
    useEffect(() => {
        if (showSuccessCommentNotification && currentInputSend[index]) {
          setIsNewMessage(true);
    
          setTimeout(() => {
            setIsNewMessage(false);
          }, 200);
        }
      }, [showSuccessCommentNotification, currentInputSend, index]);

    return (
    <>
        <div  className={`Profil--Message ${isNewMessage ? 'new-message' : ''}`}>

                <div className='wrapper-box-shadow'>

                    <div className='Profil--Message-wrappermessage'>
                        <div className='Profil--Message-wrappermessage-content'>

                            <span className='Profil--Message-wrappermessage-content-info_user_post'>
                                <h3 className='Profil--Message-wrappermessage-content-title' dangerouslySetInnerHTML={formatedTitle}/>
                                <span className='Profil--Message-wrappermessage-content-hour'> {time} </span>
                            </span>
                            
                            {/* <p> {post.content} </p> */}
                            <p dangerouslySetInnerHTML={formatedContent}/>

                        </div>      

                        <div className={`Profil--Message-wrappermessage-information ${currentClickpost[index] ? 'active' : ''} ${count <= 0 ? 'noComment' : ''}`} 
                        onClick={(e) => handleClickOpenMessage(e,index)} 
                        ref={ (el) => (refMessage.current[index] = el)}
                        >

                            { count > 0  &&
                                <>
                                    <button> <ChevronDown /> </button>
                                    <span className="Profil--Message-wrappermessage-information-countmessage"> <img src={BubbleMessage} alt="" /> {count} </span>
                                </>
                            }
                            {/* <span className="Profil--Message-wrappermessage-information-like" 
                              onMouseEnter={handleLikeHover} 
                              onMouseLeave={handleLikeLeave} 
                             > <Heart /> 5  
                           </span> */}
                           
                        </div>
                    </div>

                    {props.children}
                    
                    <div className='Profil--Message-wrappermessage-input'>
                        

                    {showEmptyCommentNotification && currentInputSend[index] ? (
                                    <Notification notif='Pourquoi envoyez un message vide ?!' delay={1000} showEmptyCommentNotification={showEmptyCommentNotification}/>
                                ) : showSuccessCommentNotification && currentInputSend[index] ? (
                                    <div className='SuccessMessage'> 
                                      <span><Check /></span> 
                                    </div>
                                ) : null}

                        <button className="Profil--Message-wrappermessage-input-btn" type='submit' 
                         onClick={(e) => handleSubmitComment(e, index, post.id)}
                         > 
                         <Send width={20} height={20} />
                        </button>

                        <label htmlFor={`inputcommentProfil_${index}`}></label>
                        <input 
                        type='text' 
                        id={`inputcommentProfil_${index}`}
                        name={`inputcommentProfil_${index}`} 
                        className='input-send_comment' 
                        placeholder='Comment...'
                        value={value[`inputcommentProfil_${index}`] || ''}
                        onChange={(e) => {
                            const { value, name } = e.target;
                            handleChangeInputComment(value, name)
                        }}
                        onKeyDown={(e) => handleSubmitComment(e, index, post.id)}
                        />

                    </div>

                </div>

        </div>

        <hr className='line-separate-post'/>

</>   
    )
}

export default Post;
