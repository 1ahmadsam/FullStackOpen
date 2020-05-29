import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
describe('<Blog/>', () => {
  test('renders blog without url and likes', () => {
    const blog = {
      title: 'advanced guide to linting in visual studio code',
      author: 'Matthew Gretzky',
      url: 'www.example.com',
    };

    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent(
      'advanced guide to linting in visual studio code Matthew Gretzky'
    );

    const div = component.container.querySelector('.blogFullInfo');
    expect(div).not.toBeVisible();
  });

  test('renders url and likes when button click', () => {
    const blog = {
      title: 'advanced guide to linting in visual studio code',
      author: 'Matthew Gretzky',
      url: 'www.example.com',
    };

    const component = render(<Blog blog={blog} />);

    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.blogFullInfo');
    expect(div).toBeVisible();
  });

  test('like button click twice', () => {
    const blog = {
      title: 'advanced guide to linting in visual studio code',
      author: 'Matthew Gretzky',
      url: 'www.example.com',
    };
    const mockHandler = jest.fn();

    const component = render(<Blog blog={blog} updateLikes={mockHandler} />);

    const button = component.getByText('like');
    //click button twice
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
