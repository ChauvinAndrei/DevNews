
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'react-feather';
import { addLikeApi, removeLikeApi } from '../../Action/user';

import './LikeButton.scss';
import { useState } from 'react';

const LikeButton = ({ isLiked }) => { 

  const dispatch = useDispatch();

  const { currentCountLike } = useSelector((state) => state.User);   // === recuperation du nombre de like et mise a jour du nombre like si like activer

  const [isAnimating, setIsAnimating] = useState(false);


  const handleAddLike = (e) => {                      // ===== Appelle de l'action de requete vers l'api et increment le like
    dispatch(addLikeApi());
    setIsAnimating(true);
  };

  const handleRemoveLike = (e) => { 
    dispatch(removeLikeApi())
    setIsAnimating(true);
  };
 

  return (

    <div className='content--article-wrapper-contenu-img-likebox'>

        {isLiked !== null && !isLiked && (

        <button className={`content--article-wrapper-contenu-img-likebox-btn ${isAnimating ? 'animate' : ''}`} onClick={handleAddLike} > 
            <span className="content--article-wrapper-contenu-img-likebox-like"> <Heart /> { currentCountLike }  </span> 
        </button>

        )}
        
        {isLiked !== null && isLiked && (
          <button className={`content--article-wrapper-contenu-img-likebox-btn ${isAnimating ? 'animate' : ''}`} onClick={handleRemoveLike}> 
            <span className="content--article-wrapper-contenu-img-likebox-like"> <Heart fill='#62CDFF'/> { currentCountLike }  </span> 
          </button>

        )}         

    </div>

  );
};

export default LikeButton;
