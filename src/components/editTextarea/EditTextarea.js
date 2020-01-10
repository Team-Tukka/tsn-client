import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Editor } from '@tinymce/tinymce-react';
import EditTextareaFooter from './EditTextareaFooter';
import './EditTextarea.css';

// EditTextArea komponent
function EditTextarea() {
  // States med React Hooks
  const [text, setText] = useState('');

  // Definér query til at hente textarea
  const GET_TEXTAREA_BY_ID = gql`
    {
      getTextareaById(_id: "5dcbd28e8d50cf53c4f97a58") {
        _id
        text
      }
    }
  `;

  // Definér mutation til at ændre i textarea
  const UPDATE_TEXTAREA_BY_ID = gql`
    mutation {
      updateTextareaById(
        _id: "5dcbd28e8d50cf53c4f97a58"
        input: { text: "${text}" }
      ) {
        _id
        text
      }
    }
  `;

  // Anvend query og mutation
  const { loading, error, data } = useQuery(GET_TEXTAREA_BY_ID);
  const [updateTextareaById] = useMutation(UPDATE_TEXTAREA_BY_ID);

  if (loading) return <p className="text-center m-3">Loading...</p>;
  if (error) return <p className="text-center m-3">Error!</p>;

  const handleEditorChange = e => {
    /* Det indskrevede tekst bliver initialiseret til staten 'text',
       og linjeskift vil blive erstattet med <br /> i databasen vha. regex */
    setText(e.target.getContent().replace(/\r?\n/g, ''));
    updateTextareaById({
      variables: { text: text }
    });
  };

  return (
    <React.Fragment>
      <h3 className="mb-3">Redigér forsidetekst</h3>
      <Editor
        apiKey="u5lbj06anhycskcmb656llf5agkiqro4mornqsh2z9gm4g8b"
        initialValue={data.getTextareaById.text}
        init={{
          height: 470,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic | bullist numlist'
        }}
        onChange={handleEditorChange}
      />
      <EditTextareaFooter />
    </React.Fragment>
  );
}
export default EditTextarea;
