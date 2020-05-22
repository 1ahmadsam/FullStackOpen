import React from 'react';
import '../index.css';
const Notification = ({ message, messageGood }) => {
  if (message === null) {
    return null;
  }

  return messageGood ? (
    <div className='success'>{message}</div>
  ) : (
    <div className='error'>{message}</div>
  );
};

export default Notification;
