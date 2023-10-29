
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pusher from "../../../Pusher/Pusher";

import { getPostFromApi, handleOpenMessage, resetOpenedMessageBox, sendValueCommentData, sendValueCommentDataSucess, sendValuePostData, sendValuePostDataSucess, setCurrentInputBool, setInputValueMessage, setInputValuePost, updateValueCommenttData, updateValuePostData } from "../../../Action/postsForum";

import withPageWrapper from "../PageWrapper";
import SousMenus from "../../Menu/SousMenus/SousMenus";
import ForumComponent from "./ForumComponent/ForumComponent";
import { WidgetMessage } from "../../Widget/Widget";
import ForumPost from "./ForumComponent/ForumPost/ForumPost";

import { filteredByLatestCreateForum } from "../../selector/selectorArticles";

import './Forum.scss';

const Forum = ( { isActive, positionTitle, label, isMobile } ) => {

    const dispatch = useDispatch();

    const refMessage = useRef([]);                                        // ==== element node du post principal
    const refMessageReponse = useRef([]);                                 // ==== element node de chaque bloque de message reponse au post

    const { posts } = useSelector((state) => state.forum);                // === recuperation de la data mise a jour apres requete des posts et commentaires


    const { id } = useSelector((state) => state.User.currentUserProfil);  // === recuperation de l'id de l'utilisateur 
    const { inputMessage, inputCommentValue } = useSelector((state) => state.forum);         // === recuperation de la valeur de l'input

    const [ currentClickpost, setCurrentClickPost ] = useState([]);       // === current message clicker

    const [showEmptyCommentNotification, setShowEmptyCommentNotification] = useState(false);
    const [showEmptyMessageNotification, setShowEmptyMessageNotification] = useState(false);
    const [showSuccessCommentNotification, setShowSuccessCommentNotification] = useState(false);
    const [showSuccessMessageNotification, setShowSuccessMessageNotification] = useState(false);

    const clearTimeoutIds = useRef({});
    const clearTimeoutMessage = useRef({});
    // ===============

    useEffect(() => {
      posts.length > 0 ? null : dispatch(getPostFromApi());
      
      return () => {
        dispatch(resetOpenedMessageBox());
      }

    }, [])
    

    // ===============

    const handleClickOpenMessage = (_, index) => {
      const newClickpost = [...currentClickpost]; 
      newClickpost[index] = !newClickpost[index]; 
      setCurrentClickPost(newClickpost); 
    };

    // =============== POST

    const handleChangeInputMessage = (value, name) => {                 // ==== dispatch des données inputs
        dispatch(setInputValueMessage(value, name));
    };  

    const handleSubmitMessage = (e) => {                                 // ==== Envoie des données formulaire lors du post 

      //  e.preventDefault();

       setShowEmptyMessageNotification(false);

      const { 'text-area-post' : textAreaPost , 'title-post': titlePost } = inputMessage;

      const trimmedComment = textAreaPost || titlePost ? textAreaPost.trim() && titlePost.trim() : '';
      const emptyOrNot = trimmedComment.length === 0 || !trimmedComment;

      const pressEnter = e.key === 'Enter' ;
      const nextLine = pressEnter && !e.shiftKey;
      const isSubmit = e.type === 'submit';

      if (!isSubmit && !nextLine){
        return;
      }else{
        e.preventDefault();
      }

          if (emptyOrNot){

            if (clearTimeoutMessage) {
              clearTimeout(clearTimeoutMessage.current);
            }

            setShowEmptyMessageNotification(true);

            clearTimeoutMessage.current = setTimeout(() => {
              setShowEmptyMessageNotification(false);
          }, 2000);

            return;

          }else {

            if (clearTimeoutMessage) {
              clearTimeout(clearTimeoutMessage.current);
            }

            setShowSuccessMessageNotification(true);

            clearTimeoutMessage.current = setTimeout(() => {
              setShowSuccessMessageNotification(false); 
              }, 2000);
          }

            const data = {
              user_id: id,
              title: titlePost,
              content: textAreaPost,
              category_id: 1,
            }
            
            dispatch(updateValuePostData(data));                              // ==== Recuperation de la data mise a jour avec user id et category

            dispatch(sendValuePostData());                                    // ==== Appel de l'action request pour post message
    };

     // =============== COMMENT

     const handleChangeInputComment = (value, name) => {
      dispatch(setInputValuePost(value, name));
    }
    
    
     // ====


     const handleSubmitComment = (event, index, postID) => {                                 // ==== Envoie des données formulaire lors du commentaire
        

      const { [`inputcomment_${index}`] : value } = inputCommentValue;                       // ==== Check du name de l'index pour connaitre lequelle est submit

      const trimmedComment = value ? value.trim() : '';
      const emptyOrNot = trimmedComment.length === 0 || !trimmedComment;

        const pressEnter = event.key === 'Enter' ;
        const shiftKey = pressEnter && event.shiftKey;

        const isBtn = event.currentTarget.classList.contains('forum--Message-wrappermessage-input-btn');

        if ((!pressEnter && !isBtn) || shiftKey){
          return;
        }


        event.preventDefault();

        const currentInput = refMessageReponse.current.map((_, i) => i === index);             // ===== créer un tableau boolean et retourne true si le retour de lindex au moment de lenvoie correspond


        dispatch(setCurrentInputBool(currentInput, index))
        
          const data = {
            user_id: id,
            content: value,
            post_id: postID,
          }


        if (!emptyOrNot) {

          dispatch(updateValueCommenttData(data, index));                       // ==== Recuperation de la data mise a jour avec user id et category

          dispatch(sendValueCommentData());                                     // ==== Appel de l'action request pour post comment

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


   // ====== PUSHER REQUEST

      useEffect(() => {

        const channel = pusher.subscribe('my-channel');

        channel.bind('my-event', function (data) {
          
          const newPost = data; 

          dispatch(sendValuePostDataSucess(newPost.message.original));
        });

        channel.bind('comment', function (data) {

          const newComment = data;

          dispatch(sendValueCommentDataSucess(newComment.message.original));
        });


        return () => {
          channel.unbind('my-event');
          channel.unbind('comment');
          pusher.unsubscribe('my-channel');
        };

      }, []);


  // =======
      
      const [ isOpenMessageMobile , setisOpenMessageMobile] = useState(false);

      const { iOpenedMessageBox } = useSelector((state) => state.forum);

      const [ isMessageMobile, setIsMessageMobile ] = useState(window.innerWidth < 824);


      useEffect(() => {

        const handleResize = () => {
          setIsMessageMobile(window.innerWidth < 824);
        }
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);       //- == Reset de l'écoute d'évenement
        
    }, [])

  // ======

      useEffect(() => {

           if (isOpenMessageMobile && !iOpenedMessageBox || iOpenedMessageBox) {
              dispatch(handleOpenMessage());
            }

      }, [isOpenMessageMobile, isMessageMobile])

  //======                                                                    
      
      useEffect(() => {
          if (isMessageMobile){
            setisOpenMessageMobile(false)
          }
      }, [isMessageMobile])
  
  // =======

    return (

      <>

          <aside id="WidgetMessage" className={`widget-message grid-content ${isOpenMessageMobile && isMessageMobile ? 'open': 'close'}`}>
          
              {isOpenMessageMobile ? (
                  <button type="button" className="btn-Message-mobile-close" onClick={() => 
                    setisOpenMessageMobile(!isOpenMessageMobile)
                  }>
                    <span className="btn-Message-mobile-close-cross"></span>
                  </button>
              ) : 
              (
                <div className="btn-Message-mobile-wrapper">
                <button className="btn-Message-mobile close" onClick={() => 
                  setisOpenMessageMobile(!isOpenMessageMobile)
               }>
                </button>
                </div>
              )}

             <WidgetMessage>
                <ForumPost 
                onChange={handleChangeInputMessage}
                onSubmit={handleSubmitMessage}
                value={inputMessage}
                showEmptyMessageNotification={showEmptyMessageNotification}
                showSuccessMessageNotification={showSuccessMessageNotification}
                />
             </WidgetMessage>

          </aside>

            <div id="main-content" className="main-content grid-content">

              <h2 
              className={`menu--title${isActive ? ' active': ''}`}
              style={positionTitle}
              >
                { label }
              </h2>

                <div className="duContenu">

                   {isMobile && <SousMenus />}

                    <ForumComponent 
                    handleClickOpenMessage={handleClickOpenMessage} 
                    handleChangeInputComment={handleChangeInputComment}
                    handleSubmitComment={handleSubmitComment}
                    refMessage={refMessage}
                    refMessageReponse={refMessageReponse}
                    currentClickpost={currentClickpost}
                    inputCommentValue={inputCommentValue}
                    posts={ filteredByLatestCreateForum(posts) } 
                    showEmptyCommentNotification={showEmptyCommentNotification}
                    showSuccessCommentNotification={showSuccessCommentNotification}
                    />

                </div>

            </div>
        </>
    )
}

const WrapperAbout = withPageWrapper(Forum);
export default WrapperAbout;

