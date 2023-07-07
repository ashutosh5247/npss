import React from 'react';
import {removeData} from './CommonFunctions';
import Constants from './Constants';
import Toast from 'react-native-toast-message';

const executeGetRequest = async (requestName, requestHeader = null) => {
  let url = Constants.baseUrl + requestName;
  let header = {
    'Content-Type': 'application/json',
  };
  if (requestHeader) {
    header = {...header, ...requestHeader};
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  console.log('url- ', url);
  console.log('header- ', header);

  try {
    // const isConnected = await NetworkUtils.isNetworkAvailable();
    // if (isConnected) {
    let response = await fetch(url, {
      method: 'GET',
      headers: header,
      signal: controller.signal,
    });
    clearTimeout(id);

    console.log('response - ', response);

    let responseJson = await processResponse(response);
    console.log('response in json format - ', responseJson);
    return responseJson;
  } catch (e) {
    console.log('error caught - ', e);
  }
};

const executePostRequest = async (
  requestName,
  requestHeader = null,
  body = {},
) => {
  let url = Constants.baseUrl + requestName;
  console.log('url- ', url);
  let header = {
    'Content-Type': 'application/json',
  };
  if (requestHeader) {
    header = {...header, ...requestHeader};
  }
  console.log('header- ', header);
  console.log('body- ', body);

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(id);

    console.log('response - ', response);
    let responseJson = await processResponse(response);
    console.log('response in json format - ', responseJson);

    return responseJson;
  } catch (e) {
    console.log('error caught - ', e);
  }
};

const executePostRequestWithUpload = async (
  requestName,
  requestHeader,
  uploadFormData,
) => {
  let url = Constants.baseUrl + requestName;
  let header = {
    'Content-Type': 'multipart/form-data',
  };
  if (requestHeader) {
    header = {...header, ...requestHeader};
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: header,
      body: uploadFormData,
      signal: controller.signal,
    });
    clearTimeout(id);

    console.log('response - ', response);
    let responseJson = await processResponse(response);
    console.log('response in json format - ', responseJson);

    return responseJson;
  } catch (e) {
    console.log('error caught - ', e.TypeError);
  }
};

export async function processResponse(response) {
  const responseCode = response.status;

  let responseJson = null;
  if (responseCode == 200) {
    responseJson = response.json();
  } else if (responseCode == 403) {
    await removeData('userData');
    responseJson = {
      err: 'Token is expired',
    };
  }

  return Promise.all([responseCode, responseJson]).then(res => ({
    responseCode: res[0],
    responseJson: res[1],
  }));
}

const showToast = (title, message, type = 0) => {
  console.log('inside Toast function');
  Toast.show({
    type: type == 0 ? 'success' : 'error',
    text1: title,
    text2: message,
  });
};

export {
  executeGetRequest,
  executePostRequest,
  executePostRequestWithUpload,
  showToast,
};
