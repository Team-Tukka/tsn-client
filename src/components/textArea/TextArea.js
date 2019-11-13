import React from 'react';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import './TextArea.css';

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

function TextArea() {
  const { client } = useQuery(ME);

  const Logout = () => {
    localStorage.clear();
    client.resetStore();
    window.location = '/';
  };

  return (
    <Link to="#" onClick={Logout} className="text-dark d-block mb-1">
      Sign Out
    </Link>
    // <h1 id="test">Forside tekst her</h1>;
  );
}

export default TextArea;
