import './Slider.scss'

import { Splide } from '@splidejs/react-splide';
import SliderComponent  from "./SliderComponent";

const Slider = ( { randomArticle } ) => {

    const options = {
        type: 'slide',
        wheel : true,
        //autoplay: true,
        pauseOnHover: true,
        interval: 3500,
        perMove: 1,
        drag   : 'free',
        arrows: true,
        perPage: 3,
        breakpoints: {
          580: {
            perPage: 1,
            padding: { left: '0rem', right: '0rem' },
          },
          900: {
            perPage: 2,
          },
        },
        trimSpace: false,
        // focus  : 'center',
        height: '190px',
        pagination: false,
        snap: true,
        clones: false,
        padding: { left: '0.5rem', right: '0rem' },
        gap: '1rem',
    }

    return (
        <div className="slider--wrapper">
            <Splide 
            aria-label="actualité"
            options={ options }>

                {randomArticle.map((item, index) => (
                    <SliderComponent sliderData={item} key={`${item.title}_${index}`} />
                ))}

            </Splide>

        </div>
    )
}


export default Slider;