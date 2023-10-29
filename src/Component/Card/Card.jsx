import { Link } from 'react-router-dom';
import ImageWithLoader from '../Loading/ImageWithLoader';

import { getCurrentTime } from '../../utils';

import BubbleMessage from '../../Assets/booble+3point-message.svg';
import { Heart } from 'react-feather';


import './Card.scss'


const Card = ( { 
    contentType, 
    id, 
    title, 
    resume, 
    content, 
    user_id, 
    picture_url, 
    likes, 
    created_at,
    category,
    slug,
    categoryTopLike,
    comment
    } ) => {


    const currentArticleData = getCurrentTime(created_at);
       
    return (
        <div className='Card--Actualités-wrapper'>
             <Link to={`/actualités/${slug}/${id}`} key={id} className="anchorTag--absolute" ></Link>

            <div className='Card--Actualités-image'>

                {/* <img src={picture_url} alt="actualité images" className='Card--Actualités-image-img'/> */}
                <ImageWithLoader src={picture_url} alt="actualité images" className='Card--Actualités-image-img' />

                    <div className='Card--Actualités-image-categorie'>
                            <span className='Card--Actualités-image-categorie-item'> { category && category.name || categoryTopLike} </span>
                            {/* <span className='Card--Actualités-image-categorie-item'> Back </span> */}
                    </div>

            </div>

            <div className='Card--Actualités-image-likeComment'>
                        <span className='Card--Actualités-image-date'> {currentArticleData }</span>
                        <span className="Card--Actualités-image-comment"> <img src={BubbleMessage} alt="" /> {comment} </span>

                        <span className="Card--Actualités-image-like"> <Heart /> { likes } </span>
            </div>
            
            <div className='Card--Actualités-info'>
                <h3 className='Card--Actualités-info-titre'> { title } </h3>
                <p className='Card--Actualités-info-text'> { resume } </p>
            </div>
            
        </div>
    )
}

export default Card;