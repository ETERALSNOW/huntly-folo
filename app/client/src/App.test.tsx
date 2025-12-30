import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

jest.mock('./components/Layout', () => () => <div data-testid="layout-shell">Layout Shell</div>);
jest.mock('./pages/Index', () => () => <div>Index Page</div>);
jest.mock('./pages/MyList', () => () => <div>My List</div>);
jest.mock('./pages/Starred', () => () => <div>Starred</div>);
jest.mock('./pages/ReadLater', () => () => <div>Read Later</div>);
jest.mock('./pages/Archive', () => () => <div>Archive</div>);
jest.mock('./pages/Page', () => () => <div>Page Detail</div>);
jest.mock('./pages/ConnectorList', () => () => <div>Connector List</div>);
jest.mock('./pages/FolderList', () => () => <div>Folder List</div>);
jest.mock('./pages/AllFeeds', () => () => <div>All Feeds</div>);
jest.mock('./pages/Search', () => () => <div>Search Page</div>);
jest.mock('./pages/Twitter', () => () => <div>Twitter Page</div>);
jest.mock('./pages/Highlights', () => () => <div>Highlights</div>);
jest.mock('./pages/SignIn', () => () => <div>Sign In</div>);

jest.mock('./api', () => ({
  AuthControllerApiFactory: () => ({
    loginUserInfoUsingGET: () => Promise.resolve({data: {username: 'test-user'}}),
  }),
  SettingControllerApiFactory: () => ({
    getGlobalSettingUsingGET: () => Promise.resolve({data: {markReadOnScroll: false}}),
  }),
}));

describe('App routing shell', () => {
  test('renders layout shell for root route', async () => {
    render(<App />);
    expect(await screen.findByTestId('layout-shell')).toBeInTheDocument();
  });
});
