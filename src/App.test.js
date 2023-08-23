// import { render, screen } from '@testing-library/react';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

test('landing on a bad page', () => {
    const badRoute = '/some/bad/route';

    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[badRoute]}>
            <App />
        </MemoryRouter>
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/no match/i)).toBeInTheDocument();
});
