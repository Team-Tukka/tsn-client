import React from 'react';
import { gql } from 'apollo-boost';
import './LoginForm.css';

// Me query
export const ME = gql`
  {
    me {
      _id
      firstName
      lastName
      mail
    }
  }
`;

// Login mutation
export const LOGIN = gql`
  mutation login($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      _id
      firstName
      lastName
      mail
      token
    }
  }
`;

function LoginForm() {
  return <h1>Login form her</h1>;
}

export default LoginForm;
