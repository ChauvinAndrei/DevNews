import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import './User.scss';
import Bell from '../../Assets/bell.svg';
import {sendValurNotifToZero, updateNotifToZero} from '../../Action/user';

const NotifUser = () => {

    const dispatch = useDispatch();
    const currentNotif  = useSelector((state) => state.User.currentUserProfil.notif);

    return (
        <>
            <div className={'navDesktop--user-connect notif-user'}>
                <span className={ currentNotif > 0 ? 'notif-bubble' : 'no-notif-bubble'  }></span>
                <img src={Bell} alt='bell' className={'navDesktop--user-connect notif-user-bell'} />
            </div>
        </>
    );

};

export default NotifUser ;

