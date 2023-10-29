import { User } from "react-feather";

import {getCleanHtml} from "../../../../../../utils";



const Comment = ( { username, tag, time, content } ) => {

    const formatedContent = getCleanHtml(content);

        return (

            <div className='Profil--Message-wrapperResponse'> 


                <div className='Profil--Message-boxmessage'>

                    <span className='Profil--Message-boxmessage-info'>
                        <span className='Profil--Message-boxmessage-username'> { username }  </span>
                        <span className='Profil--Message-boxmessage-hastag'>  - { tag } </span>
                        <span className='Profil--Message-userinfo-hour'> { time } </span>
                    </span>

                    <div className='Profil--Message-userinfo'>
                        <span className='Profil--Message-userinfo-username'> <User/> </span>
                        <p className='Profil--Message-boxmessage-text' dangerouslySetInnerHTML={formatedContent}/>
                    </div>

                </div>

                 <hr className='ligne-separate-comment'/>

            </div>
        )
}


export default Comment;