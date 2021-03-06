import { gql } from '@apollo/client';
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($setBornTo: Int!, $name: String!) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      name
      born
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
    }
  }
`;
