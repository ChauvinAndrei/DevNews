import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import Logo from '../../Assets/logo.svg';
import SearchHeader from './Search/SearchHeader';

import './HeaderMain.scss';



const HeaderMain = () => {
    

    const { iOpenedMessageBox } = useSelector((state) => state.forum);

    const [isEnoughtSpace, setIsEnoughtSpace] = useState(true);
    
    useEffect(() => {
        const getHeightWindow = () => {
  
          const windowHeight = window.innerHeight;
          setIsEnoughtSpace(windowHeight < 450);
        };
    
        window.addEventListener('resize', getHeightWindow);
        getHeightWindow();
    
        return () => {
          window.removeEventListener('resize', getHeightWindow);
        };
      }, []);


    return (
        <header className={`header--wrapper ${iOpenedMessageBox && isEnoughtSpace ? 'messageactive' : ''}`} >

            <div className="header--wrapper-div">

                <div className='header--logo'>
                    <img src={Logo} alt="DevWeaver sync logo" />
                </div>

                <SearchHeader />
                
            </div>
            
        </header>
    )
}

export default HeaderMain;