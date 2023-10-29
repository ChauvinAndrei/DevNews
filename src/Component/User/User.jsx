import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './User.scss';
import { LogOut } from 'react-feather';
import { setLoggedOut } from '../../Action/user';


const UserDisconnect = ( { isMobile } ) => {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.User)
  const [ openDisconnect, setOpenDisconnect ] = useState(false);
  const { currentUserProfil } = useSelector((state) => state.User);
  const { iOpenedMessageBox } = useSelector((state) => state.forum)


  function handleClickBtnDisconnect () {
      dispatch(setLoggedOut());
  }

  useEffect(() => {
    const hasAnimationPlayed = localStorage.getItem('animationDone');
    const prefUserOpen = localStorage.getItem('closedOrNot');

    prefUserOpen === 'false' && setOpenDisconnect(!openDisconnect);
    if (!hasAnimationPlayed && isLoggedIn) {
      setTimeout(() => {
        setOpenDisconnect(true);
        localStorage.setItem('animationDone', 'true');
      }, 2000);
    }
  }, [isLoggedIn]);


    return (
        <div className={isMobile ? "navDesktop--user-connect mobile-fixed" : 'navDesktop--user-connect'} style={{zIndex: iOpenedMessageBox ? '-1' : ''}}> 

         <div className={!openDisconnect && localStorage.getItem('closedOrNot') === 'true' ? 'box--infoMobile open' : 'box--infoMobile'}>  

            <button type="button" className='user--infoMmobile-btn'   onClick={() => {
                    localStorage.setItem('closedOrNot', openDisconnect ? 'true' : 'false');
                     setOpenDisconnect(!openDisconnect);
            }}>
              <span className='user--infoMmobile-btn-cross'></span>
            </button>
              
              <div className='box--infoMobile-info'>
                <span className='Mobile-user-info'>
                  <span>Hi</span>,   

                  <span>{`  ${currentUserProfil.username}`}</span>
                </span>

        
                <button type="button" className="navDesktop--user-connect-button disconnect" onClick={handleClickBtnDisconnect}>
                   <LogOut />
                   <span className="navDesktop--user-connect-button-label">Déconnexion</span>
                </button>
              </div>

            </div>
        </div>
    )

}

export { UserDisconnect };