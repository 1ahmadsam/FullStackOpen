import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import People from './components/People';
import Notification from './components/Notification';
import personService from './services/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setFilter] = useState('');
  const [statusMessage, setStatusMessage] = useState([
    { message: '', messageGood: true },
  ]);

  //get data from db
  useEffect(() => {
    personService.getAll().then((allPeople) => {
      setPersons(allPeople);
    });
  }, []);

  const handleNameChange = (event, setVal) => {
    setVal(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={statusMessage[0].message}
        messageGood={statusMessage[0].messageGood}
      />
      <div>
        filter shown with
        <input
          value={newFilter}
          onChange={(e) => handleNameChange(e, setFilter)}
        />
      </div>

      <h2>add a new</h2>
      <Form
        persons={persons}
        setPersons={setPersons}
        handleNameChange={handleNameChange}
        setStatusMessage={setStatusMessage}
      />
      <h2>Numbers</h2>
      <People
        newFilter={newFilter}
        persons={persons}
        setPersons={setPersons}
        setStatusMessage={setStatusMessage}
      />
    </div>
  );
};

export default App;
