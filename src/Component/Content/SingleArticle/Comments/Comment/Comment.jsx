import { getCurrentTime } from '../../../../../utils';
import { Flag } from 'react-feather';
import { getCleanHtml } from '../../../../../utils';
import { useDispatch } from "react-redux";

import { setReportComment } from '../../../../../Action/article';


const Comment = ( { username, content, created_at, id, report }) => {

    const dispatch = useDispatch();
    const currentPostedTime = getCurrentTime(created_at);

    const formatedContent = getCleanHtml(content);

    let isActive = false;

    function handleReportComment(e) {
       dispatch(setReportComment(id));
       const svg = e.target.closest('svg');
       const flag = e.target.closest('span');
        svg.style.display = 'none';
        flag.classList.add('asReport');
        setTimeout(() => {
            flag.classList.remove('asReport');
        }, 3000);
    }

    return (

        <div className='content--comment-post-wrapper-inner'>

            <div id="line-for-autor_post" className='content--comment-post'> 
                <span className='content--comment-post-author'> { username } -</span>
                <span className='content--comment-post-date_publication'> { currentPostedTime } </span>
                {/*<span className="content--comment-post-img-like"> 2 <Heart />  </span>*/}
                <span className={`content--comment-post-img-flag`} onClick={handleReportComment}> <Flag /> </span>
            </div>

            <p className='content--comment-post-contenu_texte' dangerouslySetInnerHTML={formatedContent}/>

        </div>

    )
}

export default Comment;