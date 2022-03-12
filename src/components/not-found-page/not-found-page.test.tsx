import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('renders page title and home link', () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)

    expect(screen.getByText(/page not found/i)).toBeVisible();
    expect(screen.getByTestId('home-link').getAttribute('href')).toBe("/")
  })
})