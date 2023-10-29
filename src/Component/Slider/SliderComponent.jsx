import './Slider.scss'

import { SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';

import ImageWithLoader from '../Loading/ImageWithLoader';

const SliderComponent = ( { sliderData } ) => {

    const { picture_url, id, slug, title, resume, category } = sliderData;

    return (
        <SplideSlide>
            <ImageWithLoader src={picture_url} alt='' className=''/>
            <Link to={`/actualités/${slug}/${id}`} key={id} className="anchorTag--absolute" >

                            <span className='title--slider'>
                          <h3>{title}</h3>

                          <div className='wrapper-slider-content'>

                            <span className='slider-content'>
                                {resume}
                            </span>

                            <span className='slider-content-hastag'> {category} </span>
                            <span className='slider-content-more'> - voir plus </span>
                          </div>

                        </span>
            </Link>
        </SplideSlide>
    )
}

export default SliderComponent;