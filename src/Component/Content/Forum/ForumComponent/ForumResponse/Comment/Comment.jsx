

import { User } from 'react-feather';
import { getCleanHtml } from '../../../../../../utils';

const Comment = ( { content, tag, username, time } ) => {

    const formatedCommentContent = getCleanHtml(content);

    return (
        <div className='forum--Message-wrapperResponse'> 


            <div className='forum--Message-boxmessage'>

                <span className='forum--Message-boxmessage-info'>
                    <span className='forum--Message-boxmessage-username'> { username } </span>
                    <span className='forum--Message-boxmessage-hastag'> - { tag } </span>
                    <span className='forum--Message-userinfo-hour'> { time } </span>
                </span>

                <div className='forum--Message-userinfo'>
                    <span className='forum--Message-userinfo-username'> <User/> </span>
                    <p className='forum--Message-boxmessage-text' dangerouslySetInnerHTML={formatedCommentContent}/>
                 </div>

            </div>
            <hr className='ligne-separate-comment'/>
        </div>
    )
}

export default Comment;