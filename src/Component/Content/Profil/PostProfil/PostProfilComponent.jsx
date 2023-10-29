

import Post from './Post/Post';
import Comments from './Comments/Comments';

import './PostProfilComponent.scss'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendValueCommentDataProfil, sendValueCommentDataSucess, setCurrentInputProfilBool, setInputCommentProfil, updateValueCommentProfiltData } from '../../../../Action/user';
import pusher from '../../../../Pusher/Pusher';


const PostProfilComponent  = ( { dataCommentUser} ) => {

        const dispatch = useDispatch();

        const refMessage = useRef([]);                                        // ==== element node du post principal
        const refMessageReponse = useRef([]);                                 // ==== element node de chaque bloque de message reponse au post


        const { id } = useSelector((state) => state.User.currentUserProfil);
        const { inputProfilForumValue } = useSelector((state) => state.User);         // === recuperation de la valeur de l'input
        
        const [ currentClickpost, setCurrentClickPost ] = useState([]);       // === current message clicker

        const [ countComments, setCountComments ] = useState(0);

        const [showSuccessCommentNotification, setShowSuccessCommentNotification] = useState(false);
        const [showEmptyCommentNotification, setShowEmptyCommentNotification] = useState(false);

        const clearTimeoutIds = useRef({});


        // ====== PUSHER REQUEST

          useEffect(() => {

            const channel = pusher.subscribe('my-channel');

            channel.bind('comment', function (data) {

              const newComment = data;

              dispatch(sendValueCommentDataSucess(newComment.message.original));
            });


            return () => {
              channel.unbind('comment');
              pusher.unsubscribe('my-channel');
            };

          }, []);

        // =============== COMMENT

         const handleChangeInputComment = ( value, name ) => {
                 dispatch(setInputCommentProfil(value, name));
         }


        // =======

         useEffect(() => {                                                                           // ===== Filtre le nombre de commentaire sans prendre en compte le nombre de button
    
                const MessageCounts = dataCommentUser.map((post) => {
                    return post.commentaires.length;
                })
              
                setCountComments(MessageCounts);
            }, [dataCommentUser]);

        // =======

            const handleSubmitComment = (event, index, postID) => {                                 // ==== Envoie des données formulaire lors du commentaire
      
                const { [`inputcommentProfil_${index}`] : value } = inputProfilForumValue;                       // ==== Check du name de l'index pour connaitre lequelle est submit
     
                const trimmedComment = value ? value.trim() : '';
                const emptyOrNot = trimmedComment.length === 0 || !trimmedComment;
                const pressEnter = event.key === 'Enter' ;
                const isBtn = event.currentTarget.classList.contains('Profil--Message-wrappermessage-input-btn');
          
                  if (!pressEnter && !isBtn){
                    return;
                  }
          
                  const currentInput = refMessageReponse.current.map((_, i) => i === index);             // ===== créer un tableau boolean et retourne true si le retour de lindex au moment de lenvoie correspond
            
                  dispatch(setCurrentInputProfilBool(currentInput, index))
          
                    const data = {
                      user_id: id,
                      content: value,
                      post_id: postID,
                    }

          
                  if (!emptyOrNot) {
          
                    dispatch(updateValueCommentProfiltData(data, index));                       // ==== Recuperation de la data mise a jour avec user id et category
          
                    dispatch(sendValueCommentDataProfil());                                     // ==== Appel de l'action request pour post comment
          
                    setShowEmptyCommentNotification(false);
                    setShowSuccessCommentNotification(true);
          
                    clearTimeoutIds.current[index] = setTimeout(() => {
                          setShowSuccessCommentNotification(false); 
                      }, 2000);
                } else {
                    setShowEmptyCommentNotification(true);
          
                    if (clearTimeoutIds.current[index]) {
                      clearTimeout(clearTimeoutIds.current[index]);
                    }
          
                      clearTimeoutIds.current[index] = setTimeout(() => {
                          setShowEmptyCommentNotification(false);
                      }, 2000);
                }
             };

        // =======

        const handleClickOpenMessage = (_, index) => {
                const newClickpost = [...currentClickpost]; 
                newClickpost[index] = !newClickpost[index]; 
                setCurrentClickPost(newClickpost); 
              };
          
      // ====== 


    return (
        
            <div className="posts-content">
                            
                    <div className="details">
                            
                            <div className='post--wrapper'>
                            { dataCommentUser.map((comment, index) => (
                                <Post 
                                {...comment} 
                                key={comment.post.id}
                                index={index}
                                refMessage={refMessage}
                                count={countComments[index]}
                                currentClickpost={currentClickpost}
                                handleClickOpenMessage={handleClickOpenMessage}
                                handleChangeInputComment={handleChangeInputComment}
                                handleSubmitComment={handleSubmitComment}
                                value={inputProfilForumValue}
                                showSuccessCommentNotification={showSuccessCommentNotification}
                                showEmptyCommentNotification={showEmptyCommentNotification}
                                >
                                  
                                      <Comments 
                                      {...comment}
                                      index={index}
                                      currentClickpost={currentClickpost}
                                      refMessageReponse={refMessageReponse}
                                      countComments={countComments}
                                      />
                        
                                </Post>
                            ))}
                            </div>        

                    </div>
            </div>
    )
}

export default PostProfilComponent;

