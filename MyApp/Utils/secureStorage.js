import React from 'react';
import * as Keychain from 'react-native-keychain';

async function setToken(value) {
  try {
    await Keychain.setGenericPassword('access_token', value, {
      service: 'authentication',
    });
  } catch (error) {
    console.error(`Error storing item `, error);
  }
}

async function getToken() {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'authentication',
    });
    if (credentials) {
      const storedKey = credentials.username;
      const value = credentials.password;

      if (storedKey === 'access_token') {
        console.log(`Item  retrieved:`, value);
        return value;
      } else {
        console.log(`No item found  in the keychain.`);
        return null;
      }
    } else {
      console.log(`No items found in the keychain.`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving item :`, error);
    return null;
  }
}

async function removeToken() {
  try {
    await Keychain.resetGenericPassword({service: 'authentication'});
    console.log(`Item  removed successfully.`);
  } catch (error) {
    console.error(`Error removing item :`, error);
  }
}

export {setToken, getToken, removeToken};
