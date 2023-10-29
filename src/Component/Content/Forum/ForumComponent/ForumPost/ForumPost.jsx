
import { Check, MoreHorizontal, Send } from 'react-feather';
import './ForumPost.scss'
import Notification from '../../../../Notification/Notification';


const ForumPost = ( { onChange, onSubmit, value, showEmptyMessageNotification, showSuccessMessageNotification }) => {

   const { 'text-area-post' : textAreaPost , 'title-post': titlePost } = value;

    return (
        <div className='widgetMessage--content-wrapperform'>

            <div className='widgetMessage--content-wrapperform-utils'>
                <button> <MoreHorizontal /> </button>
            </div>
       
            <div className='widgetMessage--content-wrapperform-form'>
            
                
                <form onSubmit={onSubmit} onKeyDown={onSubmit}>

                {showEmptyMessageNotification && <Notification notif='Champ incomplet !' delay={1000} showEmptyMessageNotification={showEmptyMessageNotification}/>}

                {showSuccessMessageNotification && (
                        <div className='SuccessMessage'> 
                           <span><Check /></span> 
                        </div>
                )}
                    
                    <label htmlFor='title-post' id="label-title"> 

                    <input id="title-post" type='text' name='title-post' placeholder='Title'
                        value={titlePost}
                        onChange={(e) => {
                            const { value, name } = e.target;
                            onChange(value, name)
                        }}
                        />
                    </label>

                    <label htmlFor='text-area-post'></label>
                    <textarea id="text-area-post" name="text-area-post" placeholder='Post your message...' 
                        value={textAreaPost}
                        onChange={(e) => {
                            const { value, name } = e.target;
                            onChange(value, name)
                    }}
                    />
                    <button className='btnMessage' type='submit'> <Send /> </button>
                </form>
            </div>

        </div>
    )
}

export default ForumPost;

{/* <span>Send</span> */}