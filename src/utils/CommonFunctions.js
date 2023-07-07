import AsyncStorage from '@react-native-async-storage/async-storage';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {
//   AccessToken,
//   LoginManager,
//   Profile,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk-next';
import Moment from 'moment';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

export const setValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.warn('bbbbb --- ', JSON.parse(value));
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    return false;
  }
};

export const getValue = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.warn('bbbbb --- ', value);
      return value;
    }
    return null;
  } catch (e) {
    return false;
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return null;
  } catch (e) {
    return false;
  }
};

export function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}

export function hasWhiteSpace(s) {
  let m = s.trim();
  return m.indexOf(' ') >= 0;
}

export function getStringInitials(text) {
  let generatedInitials = '';

  if (text) {
    if (hasWhiteSpace(text)) {
      let textArr = text.split(' ');
      for (let textItem of textArr) {
        generatedInitials += textItem[0];
      }
    } else {
      if (text.length >= 2) {
        generatedInitials = text[0] + text[1];
      } else generatedInitials = text[0];
    }
  }
  return generatedInitials.toUpperCase().toString();
}

export const getMonthName = monthNumber => {
  console.log('month coming to format - ', monthNumber);
  const date = new Date();
  date.setMonth(monthNumber - 1);

  let monthName = date.toLocaleString('en-US', {month: 'long'});
  console.log('month after format - ', monthName);

  return monthName;
};

export const getWeekDayName = date => {
  let dayname = date.toLocaleString('en-US', {month: 'long'});
  dayname = dayname.substring(0, 3);

  return dayname;
};

export const formatDate = date => {
  // if (date == Date()) {
  //   let day = 'Today';
  //   return day;
  // }
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  date = getWeekDayName(date) + ' ' + dd;
  return date;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const dobCalculation = string => {
  return Moment(string).fromNow().slice(0, -3);
};

// Google signIn
// export const signInWithGoogle = async () => {
//   try {
//     await signOut();
//     let hasService = await GoogleSignin.hasPlayServices();
//     console.log('hasService - ', hasService);
//     // const {accessToken, idToken} = await GoogleSignin.signIn();
//     const userInfo = await GoogleSignin.signIn();
//     console.log('userInfos-->', userInfo);

//     return userInfo;
//   } catch (error) {
//     console.log('error - ', error);
//     var error_message;
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       error_message = 'Signin cancelled';
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       error_message = 'Google account is in progress';
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       error_message = 'Play services are not available on this device';
//     } else {
//       error_message = 'Something went wrong, try again';
//     }
//     Alert.alert('Error', error_message);
//     return {err: error_message};
//   }
// };

// const signOut = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//     // setloggedIn(false);
//     // setuserInfo([]);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const loginWithFacebook = async callback => {
//   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
//     function (result) {
//       if (result.isCancelled) {
//         console.log('Login cancelled');
//       } else {
//         console.log(
//           'Login success with permissions: ' +
//             result.grantedPermissions.toString(),
//         );

//         //Create response callback.
//         AccessToken.getCurrentAccessToken().then(data => {
//           let accessToken = data.accessToken;
//           console.log(accessToken.toString());
//           // Create a graph request asking for user information with a callback to handle the response.
//           const infoRequest = new GraphRequest(
//             '/me',
//             {
//               accessToken: accessToken,
//               parameters: {
//                 fields: {
//                   string: 'email,name,first_name,middle_name,last_name,id',
//                 },
//               },
//             },
//             callback,
//           );
//           // Start the graph request.
//           new GraphRequestManager().addRequest(infoRequest).start();
//         });
//       }
//     },
//     function (error) {
//       console.log('Login fail with error: ' + error);
//     },
//   );
// };
