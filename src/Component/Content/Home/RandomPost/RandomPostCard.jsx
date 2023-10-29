import './RandomPost.scss';
import { getCleanHtml } from "../../../../utils";

const RandomPostCard = ({ post }) => {

    const Title = getCleanHtml(post.title);
    const Content = getCleanHtml(post.content);

    return (
        <>
        <div className='randomPost--content'>
            
            <div className={"randomPost--info"}>
                <h4 dangerouslySetInnerHTML={Title}/>
                <span>{ post.time }</span>

                <div className="randomPost--user">
                    <span>{ post.user.username }</span>
                    <span className={"tag"}> - { post.user.tag }</span>
                </div>
            </div>

            <div className='randomPost--texte'>
                 <p dangerouslySetInnerHTML={Content}/>
            </div>

        </div>
        </>
    )

}

export default RandomPostCard;