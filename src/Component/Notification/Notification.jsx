import { useState, useEffect } from 'react';
import './Notification.scss';

const Notification = ({ notif, delay, showEmptyCommentNotification, showEmptyMessageNotification }) => {
  const [showNotif, setShowNotif] = useState(true);


  useEffect(() => {
    setShowNotif(true);
  }, [notif, showEmptyCommentNotification, showEmptyMessageNotification]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotif(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);


  useEffect(() => {
    if (!showNotif) {
      const resetTimeoutId = setTimeout(() => {
        setShowNotif(true);
      }, 1000); 
      return () => {
        clearTimeout(resetTimeoutId);
      };
    }
  }, [showNotif]);

  const baseClass = 'bubble-message';
  const classNames = `${baseClass} ${showNotif ? 'fadeIn' : 'fadeOut'}`;

  return (
    <div className={classNames}>
      <span className="bubble-message-content">{notif}</span>
    </div>
  );
};

export default Notification;



