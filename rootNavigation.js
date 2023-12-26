import * as React from 'react';
import {StackActions} from '@react-navigation/native';

// Create refs to hold navigation state
export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();
export const routeNameRef = React.createRef();

// Navigate to a screen
export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// Replace the current screen with a new screen
export function replace(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// Reset the navigation stack to a specific screen
export function reset(name) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{name: name}],
    });
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
