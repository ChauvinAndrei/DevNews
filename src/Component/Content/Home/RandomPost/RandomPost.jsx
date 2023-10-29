import RandomPostCard from "./RandomPostCard";
import {Link} from "react-router-dom";


const RandomPost = ( { randomPost } ) => {

    return (



            <div className='randomPost--container'>
                <div className="randomPost--scroll-container">

                    <div className='randomPost--wrapper'>
                        {randomPost.map((post, index) => (
                            <RandomPostCard key={index} post={post}/>))}

                    </div>
                    
                </div>        
                
                    <div className={"toForum"}>
                        <Link to={'/forum'}>Voir plus</Link>
                    </div>
            </div>

    )
}

export default RandomPost;