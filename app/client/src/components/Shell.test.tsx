import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout';

// Avoid networked hooks inside Sidebar and SearchBox while asserting shell structure.
jest.mock('./Sidebar/Sidebar', () => () => <aside data-testid="sidebar">Sidebar</aside>);
jest.mock('./SearchBox', () => () => <input aria-label="Search" placeholder="Search" />);
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

describe('Folo shell layout', () => {
  test('renders header, sidebar, and outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Home content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Huntly/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText(/Home content/i)).toBeInTheDocument();
  });
});
