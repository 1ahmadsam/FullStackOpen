import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm/>', () => {
  test('BlogForm updates and calls event handler', () => {
    const createBlog = jest.fn();
    const component = render(
      <BlogForm
        createBlog={createBlog}
        setErrorMessage={jest.fn()}
        setSuccessMessage={jest.fn()}
      />
    );
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');
    const author = component.container.querySelector('#author');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'Blazing Speed Vehicles' },
    });
    fireEvent.change(author, {
      target: { value: 'Johnny Test' },
    });
    fireEvent.change(url, {
      target: { value: 'www.cars.com' },
    });

    fireEvent.submit(form);

    expect(createBlog.mock.calls[0][0].title).toBe('Blazing Speed Vehicles');
    expect(createBlog.mock.calls[0][0].author).toBe('Johnny Test');
    expect(createBlog.mock.calls[0][0].url).toBe('www.cars.com');
    expect(createBlog.mock.calls).toHaveLength(1);
  });
});
