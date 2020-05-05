import React from 'react';
import '../index.css';
const Notification = ({ message, messageGood }) => {
  if (message === '') {
    return null;
  }
  console.log(messageGood);

  return messageGood ? (
    <div className='success'>{message}</div>
  ) : (
    <div className='error'>{message}</div>
  );
};

export default Notification;
