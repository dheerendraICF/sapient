import React from 'react';
import { render } from '@testing-library/react';
import Templates from './Templates';

test('renders learn react link', () => {
  const { getByText } = render(<Templates />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
