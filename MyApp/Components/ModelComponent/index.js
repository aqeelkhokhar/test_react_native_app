import Toast from 'react-native-toast-message';

const showToast = message => {
  Toast.show({
    type: 'success',
    text1: message,
    topOffset: 70,
  });
};

export default showToast;
