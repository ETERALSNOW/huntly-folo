import React from 'react';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock ESM-only packages that CRA's Jest cannot transform by default.
jest.mock('react-markdown', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({children}: {children?: React.ReactNode}) =>
      React.createElement('div', {'data-testid': 'react-markdown'}, children),
  };
});

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => null,
}));
