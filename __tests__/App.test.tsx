/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: ({children}: {children?: React.ReactNode}) => <View>{children}</View>,
    Marker: ({children}: {children?: React.ReactNode}) => <View>{children}</View>,
    PROVIDER_GOOGLE: 'google',
  };
});

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(() => {
    renderer?.unmount();
  });
});
