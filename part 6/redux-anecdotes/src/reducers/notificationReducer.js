const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message;
    case 'HIDE':
      return null;
    default:
      return state;
  }
};
export const createNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(showNotification(content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export const showNotification = (content) => {
  return {
    type: 'MESSAGE',
    message: content,
  };
};

export const hideNotification = () => {
  return {
    type: 'HIDE',
  };
};

export default notificationReducer;
